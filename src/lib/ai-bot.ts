import { doc, setDoc } from 'firebase/firestore';
import {
  conversationMessagesCollection,
  userConversationsCollection
} from './firebase/collections';
import type { Timestamp } from 'firebase/firestore';
import type { ChatMessage, Conversation } from '@lib/types/message';
import type { User } from '@lib/types/user';

/** Identifiant du participant « intelligence artificielle ». */
export const AI_BOT_ID = 'inspiration-ai';

/**
 * Identifiant de la conversation avec l'assistant.
 *
 * La conversation est rangée dans la boîte de la personne qui l'utilise :
 * `users/{uid}/conversations/ai`. Aucun tri entre participants n'est donc
 * nécessaire, et elle n'apparaît chez personne d'autre.
 */
export const AI_CONVERSATION_ID = 'ai';

/** Nom affiché de l'assistant. */
export const AI_BOT_NAME = 'Assistant IA';

/** Description affichée sous le nom de l'assistant. */
export const AI_BOT_DESCRIPTION =
  'Posez une question, demandez une traduction ou une réécriture.';

/** Profil de l'assistant, utilisé pour son avatar et son nom. */
export const aiBotUser: User = {
  id: AI_BOT_ID,
  bio: AI_BOT_DESCRIPTION,
  name: AI_BOT_NAME,
  theme: null,
  accent: null,
  website: null,
  phoneNumber: null,
  location: null,
  birthDate: null,
  username: 'assistant_ia',
  photoURL: '',
  verified: true,
  following: [],
  followers: [],
  createdAt: null as unknown as Timestamp,
  updatedAt: null,
  totalTweets: 0,
  totalPhotos: 0,
  pinnedTweet: null,
  coverPhotoURL: null,
  gender: 'autre'
};

/** La conversation est-elle celle de l'assistant ? */
export function isAiConversation(conversation?: Conversation | null): boolean {
  return conversation?.type === 'ai';
}

/**
 * Crée (ou remet à jour) la conversation avec l'assistant.
 *
 * Elle est rangée dans la boîte de réception de la personne : elle apparaît
 * donc en haut de la liste, et les messages sont stockés chez elle.
 */
export async function ensureAiConversation(
  userId: string
): Promise<Conversation> {
  const now = Date.now();

  const conversation: Conversation = {
    id: AI_CONVERSATION_ID,
    participants: [userId],
    updatedAt: now,
    lastMessage: null,
    type: 'ai',
    name: AI_BOT_NAME,
    photoURL: null,
    description: AI_BOT_DESCRIPTION,
    createdBy: userId
  };

  /* Fusion et non remplacement : l'aperçu du dernier message ne doit pas
     disparaître à chaque ouverture. */
  await setDoc(
    doc(userConversationsCollection(userId), AI_CONVERSATION_ID),
    {
      id: AI_CONVERSATION_ID,
      participants: [userId],
      type: 'ai',
      name: AI_BOT_NAME,
      photoURL: null,
      description: AI_BOT_DESCRIPTION,
      createdBy: userId
    },
    { merge: true }
  );

  return conversation;
}

/** Ajoute un message envoyé par l'assistant. */
export async function appendAiMessage(
  userId: string,
  text: string
): Promise<void> {
  const now = Date.now();

  /* L'identifiant est celui du document : sans lui, le message arriverait
     sans clé et ne serait jamais reconnu dans la liste. */
  const messageRef = doc(
    conversationMessagesCollection(userId, AI_CONVERSATION_ID)
  );

  const message: ChatMessage = {
    id: messageRef.id,
    text,
    audioURL: null,
    audioDuration: null,
    imageURL: null,
    poll: null,
    pollVotes: null,
    location: null,
    linkPreview: null,
    createdBy: AI_BOT_ID,
    createdAt: now,
    fromAI: true
  };

  await setDoc(messageRef, message);

  await setDoc(
    doc(userConversationsCollection(userId), AI_CONVERSATION_ID),
    {
      updatedAt: now,
      lastMessage: {
        text,
        hasAudio: false,
        createdBy: AI_BOT_ID,
        createdAt: now
      }
    },
    { merge: true }
  );
}

/** Met à jour le résumé de la conversation après un message de la personne. */
export async function touchAiConversation(
  userId: string,
  text: string | null
): Promise<void> {
  const now = Date.now();

  await setDoc(
    doc(userConversationsCollection(userId), AI_CONVERSATION_ID),
    {
      updatedAt: now,
      lastMessage: {
        text,
        hasAudio: false,
        createdBy: userId,
        createdAt: now
      }
    },
    { merge: true }
  );
}
