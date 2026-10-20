import { createContext } from 'preact';
import { useContext, useEffect, useMemo, useState } from 'preact/hooks';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User as AuthUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import type { AppUser } from './types';

type AuthContextValue = {
  user: AppUser | null;
  authUser: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    username: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/* Le profil est créé à la première connexion, comme sur le site : le
   document « users/{id } » porte le nom, le pseudo et l'avatar. */
async function ensureProfile(authUser: AuthUser): Promise<void> {
  const reference = doc(db, 'users', authUser.uid);
  const snapshot = await getDoc(reference);

  if (snapshot.exists()) return;

  const base = (authUser.displayName ?? authUser.email?.split('@')[0] ?? 'user')
    .replace(/\s/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const username = `${base || 'user'}${Math.floor(Math.random() * 10000)}`;

  await setDoc(reference, {
    id: authUser.uid,
    bio: null,
    name: authUser.displayName ?? authUser.email?.split('@')[0] ?? 'Utilisateur',
    theme: null,
    accent: null,
    website: null,
    phoneNumber: null,
    location: null,
    birthDate: null,
    photoURL: authUser.photoURL ?? '/Avatar homme.png',
    gender: 'homme',
    username,
    verified: false,
    following: [],
    followers: [],
    createdAt: serverTimestamp(),
    updatedAt: null,
    totalTweets: 0,
    totalPhotos: 0,
    pinnedTweet: null,
    coverPhotoURL: null
  });
}

export function AuthProvider({ children }: { children: preact.ComponentChildren }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (next) => {
      setAuthUser(next);

      if (!next) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        await ensureProfile(next);
      } catch {
        /* Le profil sera créé à la prochaine connexion. */
      }

      // Le profil est écouté en direct : un changement d'avatar ou de nom
      // s'affiche immédiatement.
      const stop = onSnapshot(
        doc(db, 'users', next.uid),
        (snapshot) => {
          setUser(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as AppUser) : null);
          setLoading(false);
        },
        () => setLoading(false)
      );

      return stop;
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      authUser,
      loading,
      error,
      async signIn(email, password) {
        setError(null);
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch {
          setError('Identifiants incorrects.');
          throw new Error('Identifiants incorrects.');
        }
      },
      async signUp(email, password, name, username) {
        setError(null);
        try {
          const created = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(created.user, { displayName: name });
          await setDoc(doc(db, 'users', created.user.uid), {
            id: created.user.uid,
            bio: null,
            name,
            theme: null,
            accent: null,
            website: null,
            phoneNumber: null,
            location: null,
            birthDate: null,
            photoURL: '/Avatar homme.png',
            gender: 'homme',
            username,
            verified: false,
            following: [],
            followers: [],
            createdAt: serverTimestamp(),
            updatedAt: null,
            totalTweets: 0,
            totalPhotos: 0,
            pinnedTweet: null,
            coverPhotoURL: null
          });
        } catch {
          setError('Impossible de créer le compte.');
          throw new Error('Impossible de créer le compte.');
        }
      },
      async signInWithGoogle() {
        setError(null);
        try {
          await signInWithPopup(auth, new GoogleAuthProvider());
        } catch {
          setError('Connexion Google impossible.');
          throw new Error('Connexion Google impossible.');
        }
      },
      async signOut() {
        await firebaseSignOut(auth);
      }
    }),
    [user, authUser, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider');

  return context;
}
