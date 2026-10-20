import { deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
import {
  tweetsCollection,
  usersCollection,
  userBookmarksCollection,
  userContactsCollection,
  userStatsCollection
} from './collections';

/**
 * Supprime les données de la personne dans Firestore : ses publications,
 * ses signets, ses contacts, ses statistiques et son document de profil.
 *
 * Le compte Firebase Authentication doit être supprimé séparément, côté
 * client, avec `deleteUser` (l'opération exige une connexion récente).
 */
export async function deleteAccountData(userId: string): Promise<void> {
  const [tweets, bookmarks, contacts] = await Promise.all([
    getDocs(query(tweetsCollection, where('createdBy', '==', userId))),
    getDocs(userBookmarksCollection(userId)),
    getDocs(userContactsCollection(userId))
  ]);

  const deletions: Array<() => Promise<void>> = [
    ...tweets.docs.map(
      ({ ref }) =>
        (): Promise<void> =>
          deleteDoc(ref)
    ),
    ...bookmarks.docs.map(
      ({ ref }) =>
        (): Promise<void> =>
          deleteDoc(ref)
    ),
    ...contacts.docs.map(
      ({ ref }) =>
        (): Promise<void> =>
          deleteDoc(ref)
    ),
    (): Promise<void> => deleteDoc(doc(usersCollection, userId)),
    (): Promise<void> => deleteDoc(doc(userStatsCollection(userId), 'stats'))
  ];

  // Firestore supporte mal les rafales d'écritures : on supprime par paquets.
  const chunkSize = 10;

  for (let index = 0; index < deletions.length; index += chunkSize)
    await Promise.all(
      deletions
        .slice(index, index + chunkSize)
        .map((deleteDocument) => deleteDocument())
    );
}
