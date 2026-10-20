import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  useRef
} from 'react';
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut as signOutFirebase
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { auth } from '@lib/firebase/app';
import {
  usersCollection,
  userStatsCollection,
  userBookmarksCollection,
  userNotificationsCollection
} from '@lib/firebase/collections';
import { getRandomId, getRandomInt } from '@lib/random';
import { checkUsernameAvailability } from '@lib/firebase/utils';
import { getAvatarSrc, getBannerSrc } from '@lib/media';
import type { ReactNode } from 'react';
import type { User as AuthUser } from 'firebase/auth';
import type { WithFieldValue } from 'firebase/firestore';
import type { User } from '@lib/types/user';
import type { Bookmark } from '@lib/types/bookmark';
import type { Stats } from '@lib/types/stats';

type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed: string;
  userBookmarks: Bookmark[] | null;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    name: string,
    username: string,
    gender: 'homme' | 'femme' | 'autre',
    email: string,
    password: string
  ) => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const pendingSignupProfile = useRef<{
    name: string;
    username: string;
    gender: 'homme' | 'femme' | 'autre';
  } | null>(null);

  // Older Firestore profiles may not contain every field introduced later.
  // Normalize them before rendering so mobile-only components cannot crash on
  // missing arrays such as `followers` and `following`.
  const normalizeUser = (data: Partial<User>): User =>
    ({
      ...data,
      id: data.id ?? '',
      name: data.name ?? 'Utilisateur',
      username: data.username ?? 'user',
      bio: data.bio ?? null,
      theme: data.theme ?? null,
      accent: data.accent ?? null,
      website: data.website ?? null,
      phoneNumber: data.phoneNumber ?? null,
      location: data.location ?? null,
      birthDate: data.birthDate ?? null,
      photoURL: getAvatarSrc(data.photoURL, data.gender),
      gender: data.gender ?? 'homme',
      coverPhotoURL: getBannerSrc(data.coverPhotoURL),
      verified: data.verified ?? false,
      following: Array.isArray(data.following) ? data.following : [],
      followers: Array.isArray(data.followers) ? data.followers : [],
      totalTweets: data.totalTweets ?? 0,
      totalPhotos: data.totalPhotos ?? 0,
      pinnedTweet: data.pinnedTweet ?? null,
      createdAt: data.createdAt as User['createdAt'],
      updatedAt: data.updatedAt ?? null
    } as User);

  useEffect(() => {
    let redirectChecked = false;

    const manageUser = async (authUser: AuthUser): Promise<void> => {
      try {
        const { uid, displayName, photoURL } = authUser;
        const userSnapshot = await getDoc(doc(usersCollection, uid));

        if (!userSnapshot.exists()) {
          const signupProfile = pendingSignupProfile.current;
          let available = false;
          let randomUsername = '';
          const normalizeName = (
            displayName ?? authUser.email?.split('@')[0] ?? 'user'
          )
            .replace(/\s/g, '')
            .toLowerCase();

          if (signupProfile) {
            try {
              available = await checkUsernameAvailability(
                signupProfile.username
              );
            } catch {
              pendingSignupProfile.current = null;
              setError(
                new Error('Impossible de vérifier le nom d’utilisateur. Réessayez.')
              );
              // A temporary Firestore error must never delete a valid Firebase
              // account or sign the person out.
              return;
            }

            if (!available) {
              pendingSignupProfile.current = null;
              setError(new Error('Ce nom d’utilisateur est déjà pris.'));
              await deleteUser(authUser);
              return;
            }

            randomUsername = signupProfile.username;
          }
          else
            while (!available) {
              const randomInt = getRandomInt(1, 10_000);
              randomUsername = `${normalizeName}${randomInt}`;
              available = await checkUsernameAvailability(randomUsername);
            }

          const userData: WithFieldValue<User> = {
            id: uid,
            bio: null,
            name:
              signupProfile?.name ??
              displayName ??
              authUser.email?.split('@')[0] ??
              'Utilisateur',
            theme: null,
            accent: null,
            website: null,
            phoneNumber: null,
            location: null,
            birthDate: null,
            photoURL:
              photoURL ??
              (signupProfile?.gender === 'femme'
                ? '/Avatar femme.png'
                : '/Avatar homme.png'),
            gender: signupProfile?.gender ?? 'homme',
            username: randomUsername,
            verified: false,
            following: [],
            followers: [],
            createdAt: serverTimestamp(),
            updatedAt: signupProfile ? serverTimestamp() : null,
            totalTweets: 0,
            totalPhotos: 0,
            pinnedTweet: null,
            coverPhotoURL: null
          };

          const userStatsData: WithFieldValue<Stats> = {
            likes: [],
            tweets: [],
            updatedAt: null
          };

          await Promise.all([
            setDoc(doc(usersCollection, uid), userData),
            setDoc(doc(userStatsCollection(uid), 'stats'), userStatsData)
          ]);

          const newUser = (await getDoc(doc(usersCollection, uid))).data();
          setUser(normalizeUser(newUser as Partial<User>));
          pendingSignupProfile.current = null;
        } else {
          const existingUser = userSnapshot.data();
          setUser(normalizeUser(existingUser as Partial<User>));
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    const handleUserAuth = (authUser: AuthUser | null): void => {
      setLoading(true);

      if (authUser) void manageUser(authUser);
      else if (redirectChecked) {
        setUser(null);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleUserAuth);

    void getRedirectResult(auth)
      .then(() => {
        redirectChecked = true;
        if (!auth.currentUser) setLoading(false);
      })
      .catch((error) => {
        redirectChecked = true;
        setError(error as Error);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    const { id } = user;

    const unsubscribeUser = onSnapshot(doc(usersCollection, id), (doc) => {
      const updatedUser = doc.data() as Partial<User>;
      if (updatedUser) setUser(normalizeUser(updatedUser));
    });

    const unsubscribeBookmarks = onSnapshot(
      userBookmarksCollection(id),
      (snapshot) => {
        const bookmarks = snapshot.docs.map((doc) => doc.data());
        setUserBookmarks(bookmarks);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribeBookmarks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const signInWithGoogle = async (): Promise<void> => {
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setError(error as Error);
    }
  };

  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<void> => {
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error as Error);
    }
  };

  const signUpWithEmail = async (
    name: string,
    username: string,
    gender: 'homme' | 'femme' | 'autre',
    email: string,
    password: string
  ): Promise<void> => {
    setError(null);

    try {
      pendingSignupProfile.current = { name, username, gender };
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credential.user, { displayName: name });
    } catch (error) {
      pendingSignupProfile.current = null;
      setError(error as Error);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await signOutFirebase(auth);
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const { id, createdAt } = user;
    const welcomeId = 'welcome';

    const ensureWelcome = async (): Promise<void> => {
      const ref = doc(userNotificationsCollection(id), welcomeId);
      const snap = await getDoc(ref);
      if (snap.exists()) return;

      const createdMs =
        typeof createdAt === 'number'
          ? createdAt
          : createdAt && typeof (createdAt as { toMillis?: () => number }).toMillis === 'function'
          ? (createdAt as { toMillis: () => number }).toMillis()
          : Date.now();

      await setDoc(ref, {
        id: welcomeId,
        title: 'Bienvenue sur Inspiration',
        body: 'Merci d’avoir créé votre compte sur Inspiration.\n\nInspiration est un réseau social pensé pour partager vos idées, vos passions et vos moments dans un espace simple, rapide et respectueux. Vous pouvez publier du texte, des photos, des GIFs, des sondages et des vidéos, programmer vos publications, ajouter un lieu, et échanger en messages privés ou en groupes.\n\nPour bien démarrer : complétez votre profil (photo, bio, lieu, thème), publiez votre premier message, explorez la page « Découvrir » pour trouver des comptes à suivre, créez un statut éphémère (24 h), lancez une chaîne pour diffuser du contenu dont vous êtes le seul auteur, et personnalisez vos préférences dans les paramètres.\n\nVos données restent les vôtres. Nous ne vendons jamais vos informations personnelles. Vous gardez le contrôle total de votre contenu et de votre expérience.\n\nBesoin d’aide ? Consultez les paramètres ou contactez-nous. Bonne exploration sur Inspiration !',
        type: 'welcome',
        createdAt: createdMs,
        read: false
      });
    };

    void ensureWelcome().catch(() => undefined);
  }, [user?.id]);
  const randomSeed = useMemo(getRandomId, [user?.id]);

  const isAdmin = user ? user.username === 'ccrsxx' : false;

  const value: AuthContext = {
    user,
    error,
    loading,
    isAdmin,
    randomSeed,
    userBookmarks,
    signOut,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within an AuthContextProvider');

  return context;
}
