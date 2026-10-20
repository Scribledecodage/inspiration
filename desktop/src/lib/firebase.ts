import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore';

/* Configuration publique du projet Firebase (identique à celle du site).
   Ces clés ne sont pas des secrets : elles sont déjà présentes dans le
   JavaScript servi par le site. */
const config = {
  apiKey: 'AIzaSyD7ybB8jjqNyV4SQ38hEVK71AuJUuf1h8E',
  authDomain: 'mont2-tweet.firebaseapp.com',
  projectId: 'mont2-tweet',
  storageBucket: 'mont2-tweet.firebasestorage.app',
  messagingSenderId: '261870386503',
  appId: '1:261870386503:web:63092e30b24fb6b88b6062',
  measurementId: 'G-23TKH2B6S8'
};

export const app = getApps()[0] ?? initializeApp(config);

export const auth = getAuth(app);

/* Le cache local persistant : l'application s'ouvre instantanément (le
   fil s'affiche depuis le disque), fonctionne hors connexion, et ne
   retélécharge que ce qui a changé. C'est ce qui permet à l'app de
   consommer très peu de données. */
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});
