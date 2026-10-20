/* Envoi de l'annonce à tous les comptes.
 *
 * Le quota de LECTURE Firestore est épuisé pour la journée : on ne peut
 * donc plus lister la collection `users`. Les identifiants des personnes
 * sont récupérés auprès de Firebase Auth (qui a son propre quota), et
 * l'annonce est écrite directement dans leur dossier de notifications.
 */
const admin = require('C:/Users/Administrateur/Downloads/twitter-clone-main/twitter-clone-main/functions/node_modules/firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const auth = admin.auth();

const fileArg = process.argv[2] || '../notifications/announcement.json';
const filePath = path.resolve(__dirname, fileArg);
const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));

/* Tous les comptes, page par page. */
async function listAllUsers() {
  const uids = [];
  let page = auth.listUsers(1000);

  while (page) {
    const result = await page;
    result.users.forEach((user) => uids.push(user.uid));
    page = result.pageToken ? auth.listUsers(1000, result.pageToken) : null;
  }

  return uids;
}

(async () => {
  try {
    const uids = await listAllUsers();
    console.log('Comptes trouves :', uids.length);

    if (!uids.length) {
      console.log('Aucun compte : rien a envoyer.');
      process.exit(0);
    }

    let done = 0;
    let failed = 0;

    for (const uid of uids) {
      try {
        await db
          .collection('users')
          .doc(uid)
          .collection('notifications')
          .doc(payload.id)
          .set({
            id: payload.id,
            title: payload.title,
            body: payload.body,
            type: payload.type || 'announcement',
            createdAt: Date.now(),
            read: false,
            link: payload.link || null,
            linkLabel: payload.linkLabel || null
          });
        done += 1;
        if (done % 50 === 0) console.log('  ' + done + '/' + uids.length);
      } catch (err) {
        failed += 1;
        console.error('  Echec pour ' + uid + ' :', err && err.message);
      }
    }

    console.log(
      'Termine : ' +
        done +
        '/' +
        uids.length +
        ' notifications envoyees, ' +
        failed +
        ' echecs.'
    );
    process.exit(0);
  } catch (err) {
    console.error('Erreur :', err && err.message);
    process.exit(1);
  }
})();
