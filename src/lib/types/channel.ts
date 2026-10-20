import type { FirestoreDataConverter } from 'firebase/firestore';
import type { AvatarShape } from '@lib/types/theme';

/** Audience d'une chaîne : publique (elle apparaît dans « Découvrir ») ou
 *  privée (elle reste dans les chaînes de son auteur). */
export type ChannelVisibility = 'public' | 'private';

export type Channel = {
  id: string;
  name: string;
  description: string | null;
  photoURL: string | null;
  ownerId: string;
  conversationId: string;
  /** Les chaînes créées avant le choix de l'audience restent publiques. */
  visibility?: ChannelVisibility;
  /** Forme de l'image de la chaîne (rond par défaut). */
  avatarShape?: AvatarShape;
  createdAt: number;
};

export const channelConverter: FirestoreDataConverter<Channel> = {
  toFirestore(channel) {
    return { ...channel };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return { id, ...data } as Channel;
  }
};
