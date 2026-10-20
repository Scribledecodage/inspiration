/* Crée (ou met à jour) le compte de l'assistant dans Firestore.
 *
 * L'assistant est un compte comme un autre : c'est lui qui donne son nom et
 * son avatar aux publications qu'il rédige.
 */
const admin = require('C:/Users/Administrateur/Downloads/twitter-clone-main/twitter-clone-main/functions/node_modules/firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const AI_USER_ID = 'inspiration-ai';

(async () => {
  try {
    const reference = db.collection('users').doc(AI_USER_ID);

    /* Aucune lecture : le quota de lecture est épuisé pour la journée, et
       l'écriture suffit (elle fusionne avec l'existant). */
    await reference.set(
      {
        id: AI_USER_ID,
        bio: 'L’assistant d’Inspiration. Mentionnez-moi avec @ia.',
        name: 'Assistant IA',
        theme: null,
        accent: null,
        website: null,
        phoneNumber: null,
        location: null,
        birthDate: null,
        username: 'ia',
        photoURL: '',
        verified: true,
        following: [],
        followers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        totalTweets: 0,
        totalPhotos: 0,
        pinnedTweet: null,
        coverPhotoURL: null,
        gender: 'autre'
      },
      { merge: true }
    );

    console.log('Compte de l’assistant enregistré.');
    process.exit(0);
  } catch (err) {
    console.error('Erreur :', err && err.message);
    process.exit(1);
  }
})();
