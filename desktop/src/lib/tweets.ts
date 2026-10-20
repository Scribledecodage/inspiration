import { useEffect, useState } from 'preact/hooks';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import type { AppNotification, AppUser, Tweet } from './types';

/* ------------------------------------------------------------------ */
/* Fil d'actualité                                                     */
/* ------------------------------------------------------------------ */

/* Le fil est écouté en direct : une nouvelle publication arrive sans
   rechargement. La requête est limitée à 60 publications : au-delà, le
   navigateur ne(descend) pas plus loin, ce qui évite de consommer des
   données pour rien. */
export function useFeed(enabled = true) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const stop = onSnapshot(
      query(
        collection(db, 'tweets'),
        where('parent', '==', null),
        orderBy('createdAt', 'desc'),
        limit(60)
      ),
      (snapshot) => {
        setTweets(
          snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Tweet)
        );
        setLoading(false);
      },
      () => setLoading(false)
    );

    return stop;
  }, [enabled]);

  return { tweets, loading };
}

/* ------------------------------------------------------------------ */
/* Profils                                                             */
/* ------------------------------------------------------------------ */

/* Les auteurs sont chargés en une ou deux requêtes (Firestore accepte
   30 identifiants par « in »), et non un par publication. */
export function useUsers(ids: string[]) {
  const [users, setUsers] = useState<Record<string, AppUser>>({});
  const signature = ids.join(',');

  useEffect(() => {
    const unique = [...new Set(ids)].filter(Boolean);

    if (!unique.length) return;

    const chunks: string[][] = [];

    for (let index = 0; index < unique.length; index += 30)
      chunks.push(unique.slice(index, index + 30));

    const stops = chunks.map((chunkIds) =>
      onSnapshot(
        query(collection(db, 'users'), where(documentId(), 'in', chunkIds)),
        (snapshot) => {
          setUsers((current) => {
            const next = { ...current };

            snapshot.docs.forEach((item) => {
              next[item.id] = { id: item.id, ...item.data() } as AppUser;
            });

            return next;
          });
        }
      )
    );

    return () => stops.forEach((stop) => stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return users;
}

export function useProfile(username: string | null) {
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setProfile(null);
      setTweets([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const stop = onSnapshot(
      query(collection(db, 'users'), where('username', '==', username)),
      (snapshot) => {
        const first = snapshot.docs[0];

        setProfile(first ? ({ id: first.id, ...first.data() } as AppUser) : null);

        if (!first) {
          setTweets([]);
          setLoading(false);
        }
      }
    );

    return stop;
  }, [username]);

  useEffect(() => {
    if (!profile) return;

    const stop = onSnapshot(
      query(
        collection(db, 'tweets'),
        where('createdBy', '==', profile.id),
        orderBy('createdAt', 'desc'),
        limit(40)
      ),
      (snapshot) => {
        setTweets(
          snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Tweet)
        );
        setLoading(false);
      }
    );

    return stop;
  }, [profile?.id]);

  return { profile, tweets, loading };
}

/* ------------------------------------------------------------------ */
/* Notifications                                                       */
/* ------------------------------------------------------------------ */

export function useNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      return;
    }

    const stop = onSnapshot(
      query(
        collection(db, 'users', userId, 'notifications'),
        orderBy('createdAt', 'desc'),
        limit(40)
      ),
      (snapshot) => {
        setNotifications(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
          })) as AppNotification[]
        );
      }
    );

    return stop;
  }, [userId]);

  return notifications;
}

/* ------------------------------------------------------------------ */
/* Écritures                                                           */
/* ------------------------------------------------------------------ */

export async function publishTweet(
  userId: string,
  text: string,
  parent?: { id: string; username: string } | null
): Promise<string> {
  const reference = await addDoc(collection(db, 'tweets'), {
    text: text.trim() || null,
    parent: parent ?? null,
    images: null,
    poll: null,
    pollVotes: {},
    location: null,
    audioURL: null,
    audioDuration: null,
    linkPreview: null,
    userLikes: [],
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: null,
    userReplies: 0,
    userRetweets: [],
    views: 0
  });

  const batch = writeBatch(db);

  batch.update(doc(db, 'users', userId), {
    totalTweets: increment(1),
    updatedAt: serverTimestamp()
  });

  if (parent) {
    batch.update(doc(db, 'tweets', parent.id), {
      userReplies: increment(1),
      updatedAt: serverTimestamp()
    });
  }

  await batch.commit();

  return reference.id;
}

export async function toggleLike(
  tweet: Tweet,
  userId: string,
  liked: boolean
): Promise<void> {
  const batch = writeBatch(db);

  batch.update(doc(db, 'tweets', tweet.id), {
    userLikes: liked ? arrayRemove(userId) : arrayUnion(userId),
    updatedAt: serverTimestamp()
  });

  batch.set(
    doc(db, 'users', userId, 'stats', 'stats'),
    {
      likes: liked ? arrayRemove(tweet.id) : arrayUnion(tweet.id),
      tweets: undefined,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );

  await batch.commit();
}

export async function toggleRetweet(
  tweet: Tweet,
  userId: string,
  retweeted: boolean
): Promise<void> {
  const batch = writeBatch(db);

  batch.update(doc(db, 'tweets', tweet.id), {
    userRetweets: retweeted ? arrayRemove(userId) : arrayUnion(userId),
    updatedAt: serverTimestamp()
  });

  batch.set(
    doc(db, 'users', userId, 'stats', 'stats'),
    {
      tweets: retweeted ? arrayRemove(tweet.id) : arrayUnion(tweet.id),
      likes: undefined,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );

  await batch.commit();
}

export async function toggleBookmark(
  tweetId: string,
  userId: string,
  bookmarked: boolean
): Promise<void> {
  const reference = doc(db, 'users', userId, 'bookmarks', tweetId);

  if (bookmarked) await deleteDoc(reference);
  else
    await setDoc(reference, {
      id: tweetId,
      tweet: tweetId,
      createdAt: serverTimestamp()
    });
}

export async function deleteTweet(tweetId: string): Promise<void> {
  await deleteDoc(doc(db, 'tweets', tweetId));
}

export async function markNotificationsRead(userId: string): Promise<void> {
  const unread = await getDocs(
    query(
      collection(db, 'users', userId, 'notifications'),
      where('read', '==', false)
    )
  );

  if (unread.empty) return;

  const batch = writeBatch(db);

  unread.forEach((item) => {
    batch.update(doc(db, 'users', userId, 'notifications', item.id), {
      read: true
    });
  });

  await batch.commit();
}
