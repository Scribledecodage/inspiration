/* Script d'envoi d'une notification a tous les utilisateurs existants.
   Usage : node scripts/send-notification.cjs [fichier.json]
   Le fichier JSON contient { id, title, body, type }.
   Par defaut : notifications/announcement.json
   Identifiants : scripts/serviceAccountKey.json (compte de service Firebase)
*/
const admin = require('C:/Users/Administrateur/Downloads/twitter-clone-main/twitter-clone-main/functions/node_modules/firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const fileArg = process.argv[2] || '../notifications/announcement.json';
const filePath = path.resolve(__dirname, fileArg);
const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));

(async () => {
  try {
    const usersSnap = await db.collection('users').get();
    const users = usersSnap.docs.map((d) => d.id);
    console.log('Utilisateurs trouves :', users.length);

    let done = 0;
    for (const uid of users) {
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
            read: false
          });
        done += 1;
        if (done % 10 === 0)
          console.log('  ' + done + '/' + users.length + ' envoyes...');
      } catch (err) {
        console.error('  Echec pour ' + uid + ':', err && err.message);
      }
    }

    console.log(
      'Termine : ' + done + '/' + users.length + ' notifications envoyees.'
    );
    process.exit(0);
  } catch (err) {
    console.error('Erreur :', err);
    process.exit(1);
  }
})();
