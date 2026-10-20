import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  where,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { statusesCollection } from './collections';
import type { WithFieldValue } from 'firebase/firestore';
import type { Status, StatusKind, StatusMedia } from '@lib/types/status';

/** Durée de vie d'un statut : 24 h. */
export const STATUS_TTL_MS = 24 * 60 * 60 * 1000;

/** Couleur de fond par défaut : noir. */
export const DEFAULT_STATUS_BACKGROUND = '#000000';

/** Couleur de la barre (trait) par défaut. */
export const DEFAULT_STATUS_BAR = '#1d9bf0';

/** Couleur du texte par défaut : blanc. */
export const DEFAULT_STATUS_TEXT_COLOR = '#ffffff';

/** Durée d'affichage par défaut d'un statut (7 s). */
export const DEFAULT_STATUS_DURATION = 7000;

export type StatusColorOption = {
  name: string;
  value: string;
};

/** Fonds proposés pour un statut (texte comme média). */
export const STATUS_BACKGROUNDS: Readonly<StatusColorOption[]> = [
  { name: 'Noir', value: '#000000' },
  { name: 'Encre', value: '#15202b' },
  { name: 'Bleu', value: '#1d9bf0' },
  { name: 'Violet', value: '#7856ff' },
  { name: 'Rose', value: '#f91880' },
  { name: 'Rouge', value: '#f4212e' },
  { name: 'Orange', value: '#ff7a00' },
  { name: 'Vert', value: '#00ba7c' },
  { name: 'Gris', value: '#536471' },
  { name: 'Blanc', value: '#ffffff' }
];

/** Couleurs proposées pour la barre de progression du statut. */
export const STATUS_BARS: Readonly<StatusColorOption[]> = [
  { name: 'Bleu', value: '#1d9bf0' },
  { name: 'Vert', value: '#00ba7c' },
  { name: 'Jaune', value: '#ffd400' },
  { name: 'Orange', value: '#ff7a00' },
  { name: 'Rouge', value: '#f4212e' },
  { name: 'Rose', value: '#f91880' },
  { name: 'Violet', value: '#7856ff' },
  { name: 'Blanc', value: '#ffffff' }
];

/** Couleurs proposées pour le texte du statut. */
export const STATUS_TEXT_COLORS: Readonly<StatusColorOption[]> = [
  { name: 'Blanc', value: '#ffffff' },
  { name: 'Noir', value: '#000000' },
  { name: 'Encre', value: '#15202b' },
  { name: 'Bleu', value: '#1d9bf0' },
  { name: 'Violet', value: '#7856ff' },
  { name: 'Rose', value: '#f91880' },
  { name: 'Rouge', value: '#f4212e' },
  { name: 'Orange', value: '#ff7a00' },
  { name: 'Vert', value: '#00ba7c' },
  { name: 'Jaune', value: '#ffd400' }
];

/** Durées d'affichage proposées pour un statut. */
export const STATUS_DURATIONS: Readonly<StatusColorOption[]> = [
  { name: '3 secondes', value: '3000' },
  { name: '5 secondes', value: '5000' },
  { name: '7 secondes', value: '7000' },
  { name: '10 secondes', value: '10000' },
  { name: '15 secondes', value: '15000' }
];

export type NewStatusData = {
  kind: StatusKind;
  media: StatusMedia[];
  text: string | null;
  link: string | null;
  backgroundColor: string;
  barColor: string;
  textColor?: string;
  duration?: number;
  /** Date d'envoi programmée ; absent = publication immédiate. */
  scheduledFor?: Date | null;
};

export async function createStatus(
  userId: string,
  {
    kind,
    media,
    text,
    link,
    backgroundColor,
    barColor,
    textColor,
    duration,
    scheduledFor
  }: NewStatusData
): Promise<string> {
  const statusData: WithFieldValue<Omit<Status, 'id'>> = {
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: null,
    kind,
    media,
    text,
    link,
    backgroundColor: backgroundColor || DEFAULT_STATUS_BACKGROUND,
    barColor: barColor || DEFAULT_STATUS_BAR,
    textColor: textColor || DEFAULT_STATUS_TEXT_COLOR,
    duration: duration || DEFAULT_STATUS_DURATION,
    // Un statut programmé reste masqué jusqu'à l'heure choisie.
    scheduledFor: scheduledFor ? Timestamp.fromDate(scheduledFor) : null,
    // L'auteur est considéré comme ayant vu son propre statut.
    viewedBy: [userId],
    // Un statut programmé expire 24 h après sa publication, pas après sa
    // création.
    expiresAt: Timestamp.fromMillis(
      (scheduledFor ? scheduledFor.getTime() : Date.now()) + STATUS_TTL_MS
    )
  };

  const { id } = await addDoc(statusesCollection, statusData);

  return id;
}

/* Statuts programmés dont l'heure est arrivée : ils sont « activés » (date de
   publication mise à jour, programmation effacée) pour apparaître dans le
   fil. */
export async function publishDueScheduledStatuses(
  userId: string
): Promise<number> {
  if (!userId) return 0;

  const snapshot = await getDocs(
    query(statusesCollection, where('createdBy', '==', userId), limit(50))
  );

  const now = Date.now();
  let published = 0;

  for (const docSnapshot of snapshot.docs) {
    const data = docSnapshot.data();
    const scheduledFor = data.scheduledFor?.toMillis?.() ?? null;

    if (!scheduledFor || scheduledFor > now) continue;

    await updateDoc(docSnapshot.ref, {
      scheduledFor: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    published += 1;
  }

  return published;
}

export async function deleteStatus(statusId: string): Promise<void> {
  await deleteDoc(doc(statusesCollection, statusId));
}

/* Statuts déjà marqués comme vus pendant cette session : évite une écriture
   Firestore à chaque changement de diapositive (comme pour les vues de
   publications). */
const locallyViewedStatuses = new Set<string>();

export async function registerStatusView(
  statusId: string,
  userId: string
): Promise<void> {
  if (!statusId || locallyViewedStatuses.has(statusId)) return;

  locallyViewedStatuses.add(statusId);

  try {
    await updateDoc(doc(statusesCollection, statusId), {
      viewedBy: arrayUnion(userId),
      updatedAt: serverTimestamp()
    });
  } catch {
    // Le comptage de vue ne doit jamais empêcher la lecture du statut.
  }
}
