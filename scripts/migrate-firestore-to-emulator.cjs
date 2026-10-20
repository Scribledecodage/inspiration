/**
 * Copie TOUTES les données Firestore du projet de production (mont2-tweet)
 * vers l'émulateur Firestore local — sans rien perdre (IDs, sous-collections,
 * timestamps, etc. sont conservés à l'identique).
 *
 * Prérequis :
 *   1. Être connecté à la CLI Firebase : `firebase login`
 *   2. L'émulateur Firestore tourner : `npm run emulators` (port 8080)
 *   3. Du quota de lecture Firestore disponible sur la prod
 *      (sinon erreur 429 « Quota exceeded » : réessayer après minuit PT)
 *
 * Usage :
 *   node scripts/migrate-firestore-to-emulator.cjs
 *   node scripts/migrate-firestore-to-emulator.cjs --dry-run   (lecture seule)
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const PROJECT = process.env.FIREBASE_PROJECT || 'mont2-tweet';
const EMULATOR_URL =
  process.env.FIRESTORE_EMULATOR_URL || 'http://127.0.0.1:8080';
const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 200;

const CONFIGSTORE = path.join(
  os.homedir(),
  '.config',
  'configstore',
  'firebase-tools.json'
);

// Identifiants OAuth publics de la CLI Firebase.
const CLIENT_ID =
  '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
const CLIENT_SECRET = 'j9iVZfS8kkCEFUPaAeJV0sAi';

const PROD = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const EMU = `${EMULATOR_URL}/v1/projects/${PROJECT}/databases/(default)/documents`;

async function getAccessToken() {
  const cfg = JSON.parse(fs.readFileSync(CONFIGSTORE, 'utf8'));
  const { refresh_token, access_token, expires_at } = cfg.tokens || {};

  if (access_token && expires_at && Date.now() < expires_at - 60000)
    return access_token;

  if (!refresh_token)
    throw new Error('Aucun refresh_token. Lance `firebase login`.');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token,
      grant_type: 'refresh_token'
    })
  });
  const data = await res.json();
  if (!res.ok || !data.access_token)
    throw new Error('Refresh token échoué: ' + JSON.stringify(data));
  return data.access_token;
}

async function listCollectionIds(token, parentPath) {
  const url =
    parentPath === ''
      ? `${PROD}:listCollectionIds`
      : `${PROD}/${parentPath}:listCollectionIds`;

  const ids = [];
  let pageToken;
  do {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pageSize: 1000, pageToken })
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        `listCollectionIds(${parentPath}) ${JSON.stringify(data)}`
      );
    ids.push(...(data.collectionIds || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return ids;
}

async function listDocuments(token, collectionPath) {
  const docs = [];
  let pageToken;
  do {
    const qs = new URLSearchParams({ pageSize: '300' });
    if (pageToken) qs.set('pageToken', pageToken);
    const res = await fetch(`${PROD}/${collectionPath}?${qs}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        `listDocuments(${collectionPath}) ${JSON.stringify(data)}`
      );
    docs.push(...(data.documents || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return docs;
}

const docPath = (name) => name.split('/documents/')[1];

async function flushWrites(queue, stats) {
  if (!queue.length) return;
  if (DRY_RUN) {
    stats.docs += queue.length;
    queue.length = 0;
    return;
  }
  const res = await fetch(`${EMU}:commit`, {
    method: 'POST',
    // `owner` = token administrateur : contourne les règles de sécurité,
    // comme sur la vraie base.
    headers: {
      Authorization: 'Bearer owner',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ writes: queue })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`commit() ${JSON.stringify(data)}`);
  stats.docs += queue.length;
  process.stdout.write(`\récrits: ${stats.docs} docs   `);
  queue.length = 0;
}

async function main() {
  console.log(`Projet        : ${PROJECT}`);
  console.log(
    `Cible         : ${DRY_RUN ? '(dry-run : aucune écriture)' : EMULATOR_URL}`
  );
  console.log('---');

  const token = await getAccessToken();

  const stats = { docs: 0, collections: 0 };
  const queue = [];
  let pending = 0;

  // Parcours en largeur de l'arbre de collections (racine + sous-collections).
  async function walk(parentPath) {
    const collectionIds = await listCollectionIds(token, parentPath);
    for (const collectionId of collectionIds) {
      const collectionPath = parentPath
        ? `${parentPath}/${collectionId}`
        : collectionId;
      stats.collections++;
      console.log(`collection: ${collectionPath}`);
      const docs = await listDocuments(token, collectionPath);
      for (const doc of docs) {
        const p = docPath(doc.name);
        queue.push({
          update: {
            name: `projects/${PROJECT}/databases/(default)/documents/${p}`,
            fields: doc.fields || {}
          }
        });
        if (queue.length >= BATCH_SIZE) await flushWrites(queue, stats);
      }
      await flushWrites(queue, stats);
      // Sous-collections de chaque document.
      for (const doc of docs) await walk(docPath(doc.name));
    }
  }

  await walk('');
  await flushWrites(queue, stats);

  console.log('\n---');
  console.log(
    `Terminé : ${stats.docs} documents dans ${stats.collections} collections.`
  );
}

main().catch((err) => {
  console.error('\nERREUR :', err.message);
  if (/RESOURCE_EXHAUSTED|Quota exceeded/.test(err.message))
    console.error(
      '→ Quota Firestore prod épuisé. Réessaie après la réinitialisation (minuit heure du Pacifique) ou passe en plan Blaze.'
    );
  process.exit(1);
});
