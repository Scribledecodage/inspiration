import { doc, setDoc } from 'firebase/firestore';
import { userNotificationsCollection } from '@lib/firebase/collections';
import { AI_USER_ID } from '@lib/mentions';

export type NotificationKind = 'reply' | 'mention' | 'message';

/**
 * Prévient une personne qu'on a répondu à sa publication, qu'on l'a
 * mentionnée, ou qu'on lui a écrit.
 *
 * L'aperçu du message est repris dans le corps de la notification : on sait
 * donc de quoi il s'agit sans ouvrir l'application.
 */
export async function notifyUser(
  userId: string | null | undefined,
  kind: NotificationKind,
  title: string,
  body: string
): Promise<void> {
  /* L'assistant ne reçoit pas de notification : il ne peut ni les lire, ni
     y répondre. */
  if (!userId || userId === AI_USER_ID) return;

  const id = `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    await setDoc(doc(userNotificationsCollection(userId), id), {
      id,
      title,
      body,
      type: kind,
      createdAt: Date.now(),
      read: false
    });
  } catch {
    /* Une notification qui n'arrive pas ne doit jamais empêcher la
       publication ou le message de partir. */
  }
}

/** Un aperçu court d'un texte, pour la notification. */
export function preview(text: string | null | undefined, length = 120): string {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim();

  if (!clean) return 'Pièce jointe';

  return clean.length > length ? `${clean.slice(0, length)}…` : clean;
}
