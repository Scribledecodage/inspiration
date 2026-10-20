import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

/** Nature d'un média de statut. */
export type StatusMediaKind = 'image' | 'video';

/** Un média (photo ou vidéo) qui compose un statut. */
export type StatusMedia = {
  id: string;
  src: string;
  alt: string;
  /** Type MIME (`image/png`, `video/mp4`, …). */
  type: string;
  kind: StatusMediaKind;
};

/** Type de statut : média (photos/vidéos) ou texte. */
export type StatusKind = 'media' | 'text';

export type Status = {
  id: string;
  /** Auteur du statut. */
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  kind: StatusKind;
  /** Diapositives du statut : plusieurs photos/vidéos, ou une pour un texte. */
  media: StatusMedia[];
  /** Légende du bas (statut média) ou contenu du statut (statut texte). */
  text: string | null;
  /** Lien optionnel affiché sous le texte. */
  link: string | null;
  /** Couleur de fond (noir par défaut). */
  backgroundColor: string;
  /** Couleur de la barre de progression (« trait ») du statut. */
  barColor: string;
  /** Couleur du texte du statut. */
  textColor: string;
  /** Durée d'affichage de CE statut, en millisecondes. */
  duration: number;
  /** Publication programmée : date d'envoi. `null` = publié immédiatement. */
  scheduledFor: Timestamp | null;
  /** Identifiants des utilisateurs ayant vu ce statut. */
  viewedBy: string[];
  /** Expiration du statut (24 h après sa création). */
  expiresAt: Timestamp;
};

export function isVideoMedia(media: Pick<StatusMedia, 'kind' | 'type'>): boolean {
  return media.kind === 'video' || media.type?.includes('video') === true;
}

export const statusConverter: FirestoreDataConverter<Status> = {
  toFirestore(status) {
    return { ...status };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Status;
  }
};
