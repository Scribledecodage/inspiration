import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { tweetsCollection, usersCollection } from '@lib/firebase/collections';
import { AI_NAME, AI_USER_ID, AI_USERNAME, mentionsAi } from '@lib/mentions';
import type { ImagesPreview } from '@lib/types/file';
import type { WithFieldValue } from 'firebase/firestore';
import type { Tweet } from '@lib/types/tweet';

export type AiReplyResult = {
  ok: boolean;
  error?: string;
};

/**
 * Demande à l'assistant de répondre à une publication.
 *
 * La réponse est écrite par la personne qui a publié : elle apparaît donc
 * dans la discussion comme sa propre réponse, sous son pseudo. L'assistant
 * n'écrit jamais de publication à son propre nom.
 */
export async function askAiToReply(
  tweetId: string,
  userId: string,
  parentUsername: string | null,
  text: string | null,
  images: ImagesPreview | null
): Promise<AiReplyResult> {
  if (!mentionsAi(text)) return { ok: true };

  /* Le compte de l'assistant doit exister : sans lui, la publication
     n'afficherait pas d'auteur. */
  await ensureAiAccount();

  /* L'URL de l'image est relative (« /api/image/… ») : le modèle doit pouvoir
     la chercher, il lui faut une adresse absolue.

     C'est l'adresse publique du site qu'on utilise : dans l'application de
     bureau, l'origine de la fenêtre n'est pas celle du site, et le modèle ne
     pourrait pas y aller. */
  const site = (process.env.NEXT_PUBLIC_URL ?? '').replace(/\/+$/, '');

  /* Seule une vraie image est envoyée : ni GIF, ni vidéo — le modèle ne
     sait pas regarder cela. */
  const image = images?.find(
    (item) =>
      item.src && !item.type?.includes('video') && !item.type?.includes('gif')
  );

  const imageUrl = image?.src ? `${site}${image.src}` : undefined;

  try {
    const response = await fetch('/api/ai/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageType: image?.type,
        imageUrl,
        text
      })
    });

    const data = (await response.json().catch(() => ({}))) as {
      reply?: string;
      error?: string;
    };

    if (!response.ok)
      return { ok: false, error: data.error ?? 'L’assistant n’a pas répondu.' };

    if (!data.reply) return { ok: true };

    const reply: WithFieldValue<Omit<Tweet, 'id'>> = {
      text: data.reply,
      images: null,
      parent: { id: tweetId, username: parentUsername ?? AI_USERNAME },
      userLikes: [],
      /* La réponse est publiée sous le pseudo de la personne qui a
         mentionné l'assistant. */
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: null,
      userReplies: 0,
      userRetweets: [],
      poll: null,
      pollVotes: null,
      views: 0,
      location: null,
      audioURL: null,
      audioDuration: null,
      linkPreview: null
    };

    await addDoc(tweetsCollection, reply);

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        (error as Error)?.message ??
        'L’assistant n’a pas pu répondre à cette publication.'
    };
  }
}

/**
 * Crée le compte de l'assistant s'il n'existe pas encore.
 *
 * Il s'agit d'un compte comme un autre : c'est lui qui donne son nom et son
 * avatar aux publications qu'il rédige.
 */
export async function ensureAiAccount(): Promise<void> {
  const reference = doc(usersCollection, AI_USER_ID);
  const snapshot = await getDoc(reference).catch(() => null);

  if (snapshot?.exists) return;

  await setDoc(reference, {
    id: AI_USER_ID,
    bio: 'L’assistant d’Inspiration. Mentionnez-moi avec @ia.',
    name: AI_NAME,
    theme: null,
    accent: null,
    website: null,
    phoneNumber: null,
    location: null,
    birthDate: null,
    username: AI_USERNAME,
    photoURL: '',
    verified: true,
    following: [],
    followers: [],
    createdAt: serverTimestamp(),
    updatedAt: null,
    totalTweets: 0,
    totalPhotos: 0,
    pinnedTweet: null,
    coverPhotoURL: null,
    gender: 'autre'
  });
}
