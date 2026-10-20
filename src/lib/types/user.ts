import type {
  Theme,
  Accent,
  FontType,
  AvatarShape,
  AvatarFrame
} from './theme';
import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { AiSettings } from './ai';

export type User = {
  id: string;
  bio: string | null;
  name: string;
  theme: Theme | null;
  accent: Accent | null;
  website: string | null;
  phoneNumber: string | null;
  location: string | null;
  birthDate?: string | null;
  username: string;
  photoURL: string;
  verified: boolean;
  following: string[];
  followers: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  totalTweets: number;
  totalPhotos: number;
  pinnedTweet: string | null;
  coverPhotoURL: string | null;
  gender?: 'homme' | 'femme' | 'autre';
  avatarShape?: AvatarShape;
  avatarFrame?: AvatarFrame;
  userStatus?: string | null;
  statusEmoji?: string | null;
  pronouns?: string | null;
  customBadge?: string | null;
  customFont?: FontType;
  /** Réglages des fonctions d'intelligence artificielle. */
  aiSettings?: AiSettings | null;
};

export type EditableData = Extract<
  keyof User,
  | 'bio'
  | 'name'
  | 'website'
  | 'phoneNumber'
  | 'birthDate'
  | 'photoURL'
  | 'location'
  | 'coverPhotoURL'
  | 'avatarShape'
  | 'avatarFrame'
  | 'userStatus'
  | 'statusEmoji'
  | 'pronouns'
  | 'customBadge'
  | 'customFont'
>;

export type EditableUserData = Pick<User, EditableData>;

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as User;
  }
};
