'use strict';

/*
 * Automatic migration of user-uploaded images:
 *   OLD Supabase project  ->  NEW Supabase project (bucket "Infini")
 *   + rewrite of the image URLs stored in Firestore.
 *
 * Why: the images are stored in Supabase Storage and the public URLs are
 * persisted in Firestore (user.photoURL / user.coverPhotoURL / tweet.images[].src).
 * Switching Supabase projects therefore requires copying the objects AND
 * updating the database.
 *
 * Authentication:
 *   - Firestore: reuses the refresh token created by `firebase login`
 *     (~/.config/configstore/firebase-tools.json). No service account needed.
 *   - New Supabase: uses SUPABASE_SECRET_KEY (server-side key) for uploads.
 *   - Old Supabase: downloads via the public object URLs (no key needed).
 *
 * Usage:
 *   node functions/scripts/migrate-supabase-images.cjs --check   # report only (default)
 *   node functions/scripts/migrate-supabase-images.cjs --files   # copy objects old -> new
 *   node functions/scripts/migrate-supabase-images.cjs --db      # rewrite Firestore URLs
 *   node functions/scripts/migrate-supabase-images.cjs --all     # files then db
 *
 * Optional env overrides:
 *   OLD_SUPABASE_HOST, NEW_SUPABASE_HOST, NEW_BUCKET,
 *   SUPABASE_SECRET_KEY, FIREBASE_PROJECT_ID
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    )
      value = value.slice(1, -1);
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(ROOT, '.env.production.local'));
loadEnvFile(path.join(ROOT, '.env.local'));

const OLD_HOST =
  process.env.OLD_SUPABASE_HOST || 'hccwigqgvegvtujedbie.supabase.co';
const NEW_HOST =
  process.env.NEW_SUPABASE_HOST || 'xgvxjgkxdmpwdwoxicqs.supabase.co';
const NEW_BUCKET = process.env.NEW_BUCKET || 'Infini';
const SECRET = process.env.SUPABASE_SECRET_KEY;
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'mont2-tweet';

const args = process.argv.slice(2);
const mode = args.includes('--all')
  ? 'all'
  : args.includes('--files')
  ? 'files'
  : args.includes('--db')
  ? 'db'
  : 'check';

const FIREBASE_CLIENT_ID =
  '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
const FIREBASE_CLIENT_SECRET = 'j9iVZfS8kkCEFUPaAeJV0sAi';

const FIRESTORE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
const OLD_PUBLIC_PREFIX = `https://${OLD_HOST}/storage/v1/object/public/`;
const NEW_PUBLIC_PREFIX = `https://${NEW_HOST}/storage/v1/object/public/${NEW_BUCKET}/`;
const OLD_PREFIX_RE = new RegExp(
  `https://${OLD_HOST.replace(/\./g, '\\.')}/storage/v1/object/public/[^/]+/`,
  'g'
);

async function getAccessToken() {
  const cfgFile = path.join(
    os.homedir(),
    '.config',
    'configstore',
    'firebase-tools.json'
  );
  const cfg = JSON.parse(fs.readFileSync(cfgFile, 'utf8'));
  const tokens = cfg.tokens || {};
  if (
    tokens.access_token &&
    tokens.expires_at &&
    Number(tokens.expires_at) - Date.now() > 60_000
  )
    return tokens.access_token;
  if (!tokens.refresh_token)
    throw new Error('No Firebase refresh token. Run `firebase login` first.');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh_token,
    client_id: FIREBASE_CLIENT_ID,
    client_secret: FIREBASE_CLIENT_SECRET
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  if (!res.ok)
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function listAllDocs(token, collection) {
  let pageToken;
  const docs = [];
  do {
    const url = new URL(`${FIRESTORE}/${collection}`);
    url.searchParams.set('pageSize', '300');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok)
      throw new Error(
        `Firestore ${collection} ${res.status}: ${await res.text()}`
      );
    const json = await res.json();
    for (const d of json.documents || []) docs.push(d);
    pageToken = json.nextPageToken;
  } while (pageToken);
  return docs;
}

function collectOldUrls(fields, out) {
  function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (
      typeof node.stringValue === 'string' &&
      node.stringValue.includes(OLD_HOST)
    )
      out.add(node.stringValue);
    if (node.arrayValue && Array.isArray(node.arrayValue.values))
      for (const v of node.arrayValue.values) walk(v);
    if (node.mapValue && node.mapValue.fields)
      for (const v of Object.values(node.mapValue.fields)) walk(v);
  }
  for (const v of Object.values(fields || {})) walk(v);
}

function rewriteFields(fields) {
  function walk(node) {
    let changed = false;
    if (!node || typeof node !== 'object') return false;
    if (
      typeof node.stringValue === 'string' &&
      node.stringValue.includes(OLD_HOST)
    ) {
      node.stringValue = node.stringValue.replace(
        OLD_PREFIX_RE,
        NEW_PUBLIC_PREFIX
      );
      changed = true;
    }
    if (node.arrayValue && Array.isArray(node.arrayValue.values))
      for (const v of node.arrayValue.values) changed = walk(v) || changed;
    if (node.mapValue && node.mapValue.fields)
      for (const v of Object.values(node.mapValue.fields))
        changed = walk(v) || changed;
    return changed;
  }
  let changed = false;
  for (const v of Object.values(fields || {})) changed = walk(v) || changed;
  return changed;
}

async function copyFiles(oldUrls) {
  if (!SECRET)
    throw new Error('SUPABASE_SECRET_KEY is required to copy files.');
  const unique = [...new Set(oldUrls)];
  let ok = 0;
  const failures = [];
  let aborted = false;

  for (const oldUrl of unique) {
    const m = oldUrl.match(
      /\/storage\/v1\/object\/public\/[^/]+\/(.+?)(?:\?.*)?$/
    );
    if (!m) {
      failures.push([oldUrl, 'could not parse object key']);
      continue;
    }
    const key = m[1];

    const dl = await fetch(oldUrl);
    if (!dl.ok) {
      const body = await dl.text().catch(() => '');
      failures.push([oldUrl, `download ${dl.status} ${body.slice(0, 140)}`]);
      if (dl.status === 402 || dl.status === 403) {
        aborted = true;
        console.error(
          '\n!! ABORT: the OLD Supabase project is restricted/unreachable.'
        );
        console.error(
          '   Restore it first (upgrade plan or remove the spend cap), then re-run.\n'
        );
        break;
      }
      continue;
    }

    const bytes = Buffer.from(await dl.arrayBuffer());
    const contentType =
      dl.headers.get('content-type') || 'application/octet-stream';
    const up = await fetch(
      `https://${NEW_HOST}/storage/v1/object/${NEW_BUCKET}/${key}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SECRET}`,
          apikey: SECRET,
          'Content-Type': contentType,
          'x-upsert': 'true'
        },
        body: bytes
      }
    );
    if (!up.ok) {
      const body = await up.text().catch(() => '');
      failures.push([oldUrl, `upload ${up.status} ${body.slice(0, 140)}`]);
      continue;
    }
    ok++;
    process.stdout.write('.');
  }

  console.log(`\nFiles copied: ${ok}/${unique.length}`);
  for (const [u, msg] of failures) console.log(`  FAIL ${msg}\n       ${u}`);
  return !aborted && failures.length === 0;
}

async function rewriteDatabase(token, docs) {
  let updated = 0;
  for (const doc of docs) {
    if (!rewriteFields(doc.fields)) continue;
    const res = await fetch(`https://firestore.googleapis.com/v1/${doc.name}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: doc.fields })
    });
    if (!res.ok) {
      console.log(`  DB FAIL ${res.status} ${doc.name}: ${await res.text()}`);
      continue;
    }
    updated++;
    process.stdout.write('*');
  }
  console.log(`\nFirestore documents updated: ${updated}`);
  return updated;
}

(async () => {
  console.log(`Mode: ${mode}`);
  console.log(`Old project: https://${OLD_HOST}`);
  console.log(`New project: https://${NEW_HOST} (bucket: ${NEW_BUCKET})\n`);

  const token = await getAccessToken();

  const docs = [];
  for (const collection of ['users', 'tweets']) {
    const list = await listAllDocs(token, collection);
    console.log(`Firestore "${collection}": ${list.length} documents`);
    for (const d of list) docs.push(d);
  }

  const oldUrls = new Set();
  for (const doc of docs) collectOldUrls(doc.fields, oldUrls);
  console.log(`\nOld image URLs found: ${oldUrls.size}\n`);
  for (const u of oldUrls) console.log('   ' + u);

  if (mode === 'check') {
    console.log('\n(check mode: nothing was written)');
    return;
  }

  let filesOk = true;
  if (mode === 'files' || mode === 'all') {
    console.log('\n--- Copying files ---');
    filesOk = await copyFiles(oldUrls);
  }

  if (mode === 'db' || mode === 'all') {
    if (mode === 'all' && !filesOk) {
      console.log(
        '\nSkipping Firestore rewrite because the file copy did not fully succeed.'
      );
      process.exitCode = 1;
      return;
    }
    console.log('\n--- Rewriting Firestore URLs ---');
    await rewriteDatabase(token, docs);
  }
})().catch((err) => {
  console.error('\nMIGRATION ERROR:', err.message);
  process.exitCode = 1;
});
