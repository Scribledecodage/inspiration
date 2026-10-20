import { deleteField, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from './app';
import {
  conversationMessagesCollection,
  userConversationsCollection,
  userContactsCollection
} from './collections';
import type { ChatMessage, Conversation } from '@lib/types/message';
import type { PollVote, TweetPoll } from '@lib/types/tweet';
import type { LinkPreviewData } from '@lib/link-preview';

/**
 * Conversations are stored under a deterministic id built from both user ids
 * so that both participants always point to the same document.
 */
export function getChatId(firstId: string, secondId: string): string {
  return [firstId, secondId].sort().join('_');
}

/**
 * The two users share the same conversation document. It lives in the
 * subtree of the first id (alphabetically) so that no extra Firestore rule
 * is required to let both people read and write it.
 */
export function getChatOwnerId(firstId: string, secondId: string): string {
  return [firstId, secondId].sort()[0];
}

/**
 * Une conversation est non lue quand son dernier message vient de quelqu'un
 * d'autre et qu'il est plus récent que la dernière ouverture de la discussion.
 * C'est la seule règle utilisée pour les badges (barre latérale et liste).
 */
export function isConversationUnread(
  conversation: Conversation,
  userId: string
): boolean {
  const lastMessage = conversation.lastMessage;

  if (!lastMessage || lastMessage.createdBy === userId) return false;

  return lastMessage.createdAt > (conversation.lastReadAt?.[userId] ?? 0);
}

/**
 * Enregistre la dernière lecture d'une conversation.
 *
 * Chaque participant possède sa propre copie de la conversation : la marque
 * doit donc être écrite dans la sienne. L'écrire dans la copie de l'autre
 * personne n'aurait aucun effet sur son badge.
 */
/**
 * Enregistre le vote d'une personne sur un sondage de message.
 *
 * Le message peut être publié par l'un ou l'autre participant : on vise donc
 * toujours le document de messages du propriétaire de la conversation, puis on
 * n'écrit que la clé de ce votant.
 */
export async function voteOnMessagePoll({
  ownerId,
  chatId,
  messageId,
  userId,
  choices,
  voter
}: {
  ownerId: string;
  chatId: string;
  messageId: string;
  userId: string;
  /** Choix cochés ; un tableau vide retire le vote. */
  choices: string[];
  voter: Omit<PollVote, 'choices'>;
}): Promise<void> {
  await updateDoc(
    doc(conversationMessagesCollection(ownerId, chatId), messageId),
    {
      /* Une liste vide supprime la clé du votant : c'est ce qui permet de
         décocher une case, puis de revoter dans une autre. */
      [`pollVotes.${userId}`]: choices.length
        ? { ...voter, choices }
        : deleteField()
    }
  );
}

export async function markConversationAsRead(
  userId: string,
  conversationId: string
): Promise<void> {
  try {
    await updateDoc(doc(userConversationsCollection(userId), conversationId), {
      [`lastReadAt.${userId}`]: Date.now()
    });
  } catch {
    /* La conversation n'existe pas encore dans la boîte de réception :
       il n'y a alors aucun badge à retirer. */
  }
}

type SendMessageData = {
  senderId: string;
  recipientId: string;
  text?: string | null;
  audioURL?: string | null;
  audioDuration?: number | null;
  imageURL?: string | null;
  poll?: TweetPoll | null;
  location?: string | null;
  linkPreview?: LinkPreviewData | null;
};

export async function sendMessage({
  senderId,
  recipientId,
  text,
  audioURL,
  audioDuration,
  imageURL,
  poll,
  location,
  linkPreview
}: SendMessageData): Promise<void> {
  const chatId = getChatId(senderId, recipientId);
  const ownerId = getChatOwnerId(senderId, recipientId);
  const participants = [senderId, recipientId].sort();
  const now = Date.now();

  const messageRef = doc(conversationMessagesCollection(ownerId, chatId));
  const message: ChatMessage = {
    id: messageRef.id,
    text: text ?? null,
    audioURL: audioURL ?? null,
    audioDuration: audioDuration ?? null,
    imageURL: imageURL ?? null,
    poll: poll ?? null,
    /* Le sondage démarre vierge : chaque participant votera de son côté. */
    pollVotes: poll ? {} : null,
    location: location ?? null,
    linkPreview: linkPreview ?? null,
    createdBy: senderId,
    createdAt: now
  };

  const batch = writeBatch(db);

  batch.set(messageRef, message);

  /* La conversation est copiée dans la boîte de réception des deux
     participants : chacun voit donc le dernier message arriver en temps réel,
     sans ouvrir la conversation ni actualiser la page. */
  const conversationData = {
    id: chatId,
    participants,
    updatedAt: now,
    lastMessage: {
      text: text ?? null,
      hasAudio: Boolean(audioURL),
      createdBy: senderId,
      createdAt: now
    }
  };

  const otherId = senderId === ownerId ? recipientId : senderId;

  batch.set(
    doc(userConversationsCollection(ownerId), chatId),
    conversationData,
    { merge: true }
  );

  if (otherId !== ownerId)
    batch.set(
      doc(userConversationsCollection(otherId), chatId),
      conversationData,
      { merge: true }
    );

  // Keep the conversation in both inboxes, most recently active first.
  batch.set(
    doc(userContactsCollection(senderId), recipientId),
    { id: recipientId, addedAt: now },
    { merge: true }
  );
  batch.set(
    doc(userContactsCollection(recipientId), senderId),
    { id: senderId, addedAt: now },
    { merge: true }
  );

  await batch.commit();
}

/**
 * Même logique que pour un duo : le document (et les messages) vivent dans le
 * sous-arbre du premier identifiant par ordre alphabétique, ce qui donne un
 * chemin identique pour tous les membres du groupe.
 */
export function getConversationOwnerId(participants: string[]): string {
  return [...participants].sort()[0];
}

type CreateGroupData = {
  creatorId: string;
  memberIds: string[];
  name: string;
  photoURL?: string | null;
  description?: string | null;
};

/** Crée un groupe et le dépose dans la boîte de réception de chaque membre. */
export async function createGroupConversation({
  creatorId,
  memberIds,
  name,
  photoURL,
  description
}: CreateGroupData): Promise<Conversation> {
  const participants = Array.from(new Set([creatorId, ...memberIds])).sort();

  const conversationRef = doc(userConversationsCollection(creatorId));
  const now = Date.now();

  const conversation: Conversation = {
    id: conversationRef.id,
    participants,
    updatedAt: now,
    lastMessage: null,
    type: 'group',
    name: name.trim(),
    photoURL: photoURL ?? null,
    description: description?.trim() || null,
    createdBy: creatorId
  };

  const batch = writeBatch(db);

  participants.forEach((participantId) => {
    batch.set(
      doc(userConversationsCollection(participantId), conversation.id),
      conversation
    );
  });

  await batch.commit();

  return conversation;
}

type SendGroupMessageData = {
  senderId: string;
  conversation: Conversation;
  text?: string | null;
  audioURL?: string | null;
  audioDuration?: number | null;
  imageURL?: string | null;
  poll?: TweetPoll | null;
  location?: string | null;
  linkPreview?: LinkPreviewData | null;
};

/** Envoie un message dans un groupe (texte, vocal, image, sondage, lieu). */
export async function sendGroupMessage({
  senderId,
  conversation,
  text,
  audioURL,
  audioDuration,
  imageURL,
  poll,
  location,
  linkPreview
}: SendGroupMessageData): Promise<void> {
  const ownerId = getConversationOwnerId(conversation.participants);
  const now = Date.now();

  const messageRef = doc(
    conversationMessagesCollection(ownerId, conversation.id)
  );

  const message: ChatMessage = {
    id: messageRef.id,
    text: text ?? null,
    audioURL: audioURL ?? null,
    audioDuration: audioDuration ?? null,
    imageURL: imageURL ?? null,
    poll: poll ?? null,
    pollVotes: poll ? {} : null,
    location: location ?? null,
    linkPreview: linkPreview ?? null,
    createdBy: senderId,
    createdAt: now
  };

  const batch = writeBatch(db);

  batch.set(messageRef, message);

  // Le groupe reste dans la boîte de réception de chaque membre.
  conversation.participants.forEach((participantId) => {
    /* `lastReadAt` est propre à chaque participant : on ne le recopie pas,
       sinon la marque de lecture d'un membre écraserait celle des autres. */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { lastReadAt, ...sharedConversation } = conversation;

    batch.set(
      doc(userConversationsCollection(participantId), conversation.id),
      {
        ...sharedConversation,
        updatedAt: now,
        lastMessage: {
          text: text ?? null,
          hasAudio: Boolean(audioURL),
          createdBy: senderId,
          createdAt: now
        }
      },
      { merge: true }
    );
  });

  await batch.commit();
}
