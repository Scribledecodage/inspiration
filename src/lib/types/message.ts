import type { FirestoreDataConverter } from 'firebase/firestore';
import type { PollVote, TweetPoll } from './tweet';
import type { LinkPreviewData } from '../link-preview';
import type { AvatarShape } from './theme';

export type ChatMessage = {
  id: string;
  text: string | null;
  audioURL: string | null;
  audioDuration: number | null;
  /** Image jointe (GIF inclus), envoyée comme les messages vocaux. */
  imageURL?: string | null;
  /** Sondage joint, au même format que celui des publications. */
  poll?: TweetPoll | null;
  /** Votes du sondage, rangés par identifiant d'utilisateur. */
  pollVotes?: Record<string, PollVote> | null;
  /** Lieu partagé (ville choisie ou position de l'appareil). */
  location?: string | null;
  /** Aperçu du lien partagé, figé au moment de l'envoi. */
  linkPreview?: LinkPreviewData | null;
  createdBy: string;
  createdAt: number;
  /** Message rédigé par l'assistant d'intelligence artificielle. */
  fromAI?: boolean;
};

export const chatMessageConverter: FirestoreDataConverter<ChatMessage> = {
  toFirestore(message) {
    return { ...message };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as ChatMessage;
  }
};

export type Conversation = {
  id: string;
  participants: string[];
  updatedAt: number;
  lastMessage: {
    text: string | null;
    hasAudio: boolean;
    createdBy: string;
    createdAt: number;
  } | null;
  /* Renseigné uniquement pour les conversations de groupe. */
  type?: 'direct' | 'group' | 'channel' | 'ai';
  name?: string | null;
  photoURL?: string | null;
  description?: string | null;
  createdBy?: string | null;
  /** Forme de l'image de la chaîne (rond par défaut). */
  avatarShape?: AvatarShape;
  /** Dernière lecture par utilisateur (id → timestamp ms). */
  lastReadAt?: Record<string, number> | null;
};

export const conversationConverter: FirestoreDataConverter<Conversation> = {
  toFirestore(conversation) {
    return { ...conversation };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as Conversation;
  }
};
