import {
  doc,
  query,
  where,
  limit,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  deleteField,
  increment,
  writeBatch,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  Timestamp,
  getCountFromServer
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from './app';
import {
  usersCollection,
  tweetsCollection,
  userStatsCollection,
  userBookmarksCollection,
  userScheduledTweetsCollection
} from './collections';
import type { WithFieldValue, Query } from 'firebase/firestore';
import type { EditableUserData } from '@lib/types/user';
import type { FilesWithId, ImagesPreview } from '@lib/types/file';
import type { Bookmark } from '@lib/types/bookmark';
import type { PollVote, Tweet, TweetPoll, ScheduledTweet } from '@lib/types/tweet';
import type { Theme, Accent } from '@lib/types/theme';

export async function checkUsernameAvailability(
  username: string
): Promise<boolean> {
  const { empty } = await getDocs(
    query(usersCollection, where('username', '==', username), limit(1))
  );
  return empty;
}

export async function getCollectionCount<T>(
  collection: Query<T>
): Promise<number> {
  const snapshot = await getCountFromServer(collection);
  return snapshot.data().count;
}

import type { FontType, AvatarShape, AvatarFrame } from '@lib/types/theme';

export async function updateUserData(
  userId: string,
  userData: Partial<EditableUserData>
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp()
  });
}

export async function updateUserTheme(
  userId: string,
  themeData: {
    theme?: Theme;
    accent?: Accent;
    customFont?: FontType;
    avatarShape?: AvatarShape;
    avatarFrame?: AvatarFrame;
  }
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, { ...themeData });
}

export async function updateUsername(
  userId: string,
  username?: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    ...(username && { username }),
    updatedAt: serverTimestamp()
  });
}

export async function managePinnedTweet(
  type: 'pin' | 'unpin',
  userId: string,
  tweetId: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    updatedAt: serverTimestamp(),
    pinnedTweet: type === 'pin' ? tweetId : null
  });
}

export async function manageFollow(
  type: 'follow' | 'unfollow',
  userId: string,
  targetUserId: string
): Promise<void> {
  const batch = writeBatch(db);

  const userDocRef = doc(usersCollection, userId);
  const targetUserDocRef = doc(usersCollection, targetUserId);

  if (type === 'follow') {
    batch.update(userDocRef, {
      following: arrayUnion(targetUserId),
      updatedAt: serverTimestamp()
    });
    batch.update(targetUserDocRef, {
      followers: arrayUnion(userId),
      updatedAt: serverTimestamp()
    });
  } else {
    batch.update(userDocRef, {
      following: arrayRemove(targetUserId),
      updatedAt: serverTimestamp()
    });
    batch.update(targetUserDocRef, {
      followers: arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  }

  await batch.commit();
}

export async function removeTweet(tweetId: string): Promise<void> {
  const userRef = doc(tweetsCollection, tweetId);
  await deleteDoc(userRef);
}

/* Publications déjà comptées dans cette session : une vue ne doit être
   enregistrée qu'une seule fois par publication et par visite, sinon chaque
   re-render (ou un simple rafraîchissement de page) gonflerait le compteur. */
const viewedTweetIds = new Set<string>();

const VIEW_STORAGE_PREFIX = 'inspiration:view:';

function hasAlreadyViewed(tweetId: string): boolean {
  if (viewedTweetIds.has(tweetId)) return true;

  try {
    return sessionStorage.getItem(VIEW_STORAGE_PREFIX + tweetId) === '1';
  } catch {
    return false;
  }
}

function markAsViewed(tweetId: string): void {
  viewedTweetIds.add(tweetId);

  try {
    sessionStorage.setItem(VIEW_STORAGE_PREFIX + tweetId, '1');
  } catch {
    // Stockage indisponible (navigation privée) : le Set suffit.
  }
}

export async function registerTweetView(tweetId: string): Promise<void> {
  if (!tweetId || hasAlreadyViewed(tweetId)) return;

  markAsViewed(tweetId);

  const dayKey = new Date().toISOString().slice(0, 10);

  try {
    await updateDoc(doc(tweetsCollection, tweetId), {
      views: increment(1),
      [`viewsByDay.${dayKey}`]: increment(1)
    });
  } catch {
    // Le compteur de vues ne doit jamais empêcher l'affichage du tweet.
  }
}

export async function uploadImages(
  userId: string,
  files: FilesWithId
): Promise<ImagesPreview | null> {
  if (!files.length) return null;

  const imagesPreview = await Promise.all(
    files.map(async (file) => {
      const { id, name: alt, type } = file;

      const storageRef = ref(storage, `images/${userId}/${id}`);

      await uploadBytesResumable(storageRef, file);

      const src = await getDownloadURL(storageRef);

      return { id, src, alt, type };
    })
  );

  return imagesPreview;
}

export async function manageReply(
  type: 'increment' | 'decrement',
  tweetId: string
): Promise<void> {
  const tweetRef = doc(tweetsCollection, tweetId);

  try {
    await updateDoc(tweetRef, {
      userReplies: increment(type === 'increment' ? 1 : -1),
      updatedAt: serverTimestamp()
    });
  } catch {
    // do nothing, because parent tweet was already deleted
  }
}

export async function manageTotalTweets(
  type: 'increment' | 'decrement',
  userId: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    totalTweets: increment(type === 'increment' ? 1 : -1),
    updatedAt: serverTimestamp()
  });
}

export async function manageTotalPhotos(
  type: 'increment' | 'decrement',
  userId: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    totalPhotos: increment(type === 'increment' ? 1 : -1),
    updatedAt: serverTimestamp()
  });
}

export function manageRetweet(
  type: 'retweet' | 'unretweet',
  userId: string,
  tweetId: string
) {
  return async (): Promise<void> => {
    const batch = writeBatch(db);

    const tweetRef = doc(tweetsCollection, tweetId);
    const userStatsRef = doc(userStatsCollection(userId), 'stats');

    if (type === 'retweet') {
      batch.update(tweetRef, {
        userRetweets: arrayUnion(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        tweets: arrayUnion(tweetId),
        updatedAt: serverTimestamp()
      });
    } else {
      batch.update(tweetRef, {
        userRetweets: arrayRemove(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        tweets: arrayRemove(tweetId),
        updatedAt: serverTimestamp()
      });
    }

    await batch.commit();
  };
}

export function manageLike(
  type: 'like' | 'unlike',
  userId: string,
  tweetId: string
) {
  return async (): Promise<void> => {
    const batch = writeBatch(db);

    const userStatsRef = doc(userStatsCollection(userId), 'stats');
    const tweetRef = doc(tweetsCollection, tweetId);

    if (type === 'like') {
      batch.update(tweetRef, {
        userLikes: arrayUnion(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        likes: arrayUnion(tweetId),
        updatedAt: serverTimestamp()
      });
    } else {
      batch.update(tweetRef, {
        userLikes: arrayRemove(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        likes: arrayRemove(tweetId),
        updatedAt: serverTimestamp()
      });
    }

    await batch.commit();
  };
}

export async function manageBookmark(
  type: 'bookmark' | 'unbookmark',
  userId: string,
  tweetId: string
): Promise<void> {
  const bookmarkRef = doc(userBookmarksCollection(userId), tweetId);

  if (type === 'bookmark') {
    const bookmarkData: WithFieldValue<Bookmark> = {
      id: tweetId,
      createdAt: serverTimestamp()
    };
    await setDoc(bookmarkRef, bookmarkData);
  } else await deleteDoc(bookmarkRef);
}

/* --- Sondages ------------------------------------------------------------
   Un vote est rangé directement dans le document de la publication, sous
   `pollVotes.<identifiantUtilisateur>`. Le document étant écouté en temps réel
   par l'affichage du sondage, les votes des autres arrivent tout seuls. */

/** Retire les clés sans valeur : Firestore refuse `undefined`. */
function withoutUndefined<T extends object>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined)
  ) as T;
}

export async function setPollVote(
  tweetId: string,
  userId: string,
  vote: PollVote
): Promise<void> {
  /* La surcharge `updateDoc(ref, chemin, valeur)` accepte un chemin pointé
     (`pollVotes.<id>`) sans exiger le typage des champs imbriqués. */
  await updateDoc(
    doc(tweetsCollection, tweetId),
    `pollVotes.${userId}`,
    withoutUndefined(vote)
  );
}

export async function clearPollVote(
  tweetId: string,
  userId: string
): Promise<void> {
  await updateDoc(doc(tweetsCollection, tweetId), {
    [`pollVotes.${userId}`]: deleteField()
  });
}

export async function clearAllBookmarks(userId: string): Promise<void> {
  const bookmarksRef = userBookmarksCollection(userId);
  const bookmarksSnapshot = await getDocs(bookmarksRef);

  const batch = writeBatch(db);

  bookmarksSnapshot.forEach(({ ref }) => batch.delete(ref));

  await batch.commit();
}

/* --- Publications programmées -------------------------------------------
   Une publication programmée est d'abord rangée dans `scheduledTweets` avec
   la date d'envoi voulue. Un « publieur » global (ScheduledPublisher) la
   transforme en vraie publication dès que l'échéance est atteinte. */

export type NewScheduledTweet = {
  text: string | null;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  poll: TweetPoll | null;
  createdBy: string;
  scheduledAt: Date;
  location?: string | null;
};

export async function scheduleTweet(
  data: NewScheduledTweet
): Promise<string> {
  const scheduledData: WithFieldValue<Omit<ScheduledTweet, 'id'>> = {
    text: data.text,
    images: data.images,
    parent: data.parent,
    poll: data.poll,
    createdBy: data.createdBy,
    scheduledAt: Timestamp.fromDate(data.scheduledAt),
    status: 'pending',
    createdAt: serverTimestamp(),
    location: data.location ?? null
  };

  const ref = await addDoc(
    userScheduledTweetsCollection(data.createdBy),
    scheduledData
  );

  return ref.id;
}

/** Publications programmées encore en attente, pour un utilisateur donné. */
export async function getPendingScheduledTweets(
  userId: string
): Promise<ScheduledTweet[]> {
  const snapshot = await getDocs(userScheduledTweetsCollection(userId));

  return snapshot.docs
    .map((document) => document.data())
    .filter((scheduled) => scheduled.status === 'pending');
}

/** Transforme une publication programmée en vraie publication. */
export async function publishScheduledTweet(
  scheduled: ScheduledTweet
): Promise<void> {
  const { text, images, parent, poll, createdBy } = scheduled;

  const tweetData: WithFieldValue<Omit<Tweet, 'id'>> = {
    text,
    parent,
    images,
    poll: poll ?? null,
    pollVotes: poll ? {} : null,
    location: scheduled.location ?? null,
    userLikes: [],
    createdBy,
    createdAt: serverTimestamp(),
    updatedAt: null,
    userReplies: 0,
    userRetweets: []
  };

  await Promise.all([
    addDoc(tweetsCollection, tweetData),
    manageTotalTweets('increment', createdBy),
    tweetData.images ? manageTotalPhotos('increment', createdBy) : null,
    parent?.id ? manageReply('increment', parent.id) : null
  ]);

  await deleteDoc(
    doc(userScheduledTweetsCollection(createdBy), scheduled.id)
  );
}

/**
 * Publie toutes les publications programmées arrivées à échéance.
 * Renvoie le nombre de publications envoyées.
 */
export async function publishDueScheduledTweets(
  userId: string
): Promise<number> {
  const pending = await getPendingScheduledTweets(userId);
  const now = Date.now();

  const due = pending.filter(({ scheduledAt }) => {
    const date = scheduledAt?.toDate?.() ?? null;
    return date !== null && date.getTime() <= now;
  });

  let published = 0;

  for (const scheduled of due) {
    try {
      await publishScheduledTweet(scheduled);
      published += 1;
    } catch {
      // On laisse la publication « en attente » : nouvel essai plus tard.
    }
  }

  return published;
}

export async function cancelScheduledTweet(
  userId: string,
  id: string
): Promise<void> {
  await deleteDoc(doc(userScheduledTweetsCollection(userId), id));
}
