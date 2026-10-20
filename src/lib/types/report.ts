import type { FirestoreDataConverter } from 'firebase/firestore';

/** Motifs proposés lors d'un signalement. */
export type ReportReason =
  | 'illegal'
  | 'hateful'
  | 'prohibited_media'
  | 'discrimination'
  | 'harassment'
  | 'other';

export type ReportAttachment = {
  /** Adresse du fichier envoyé (stockage privé Backblaze B2). */
  url: string;
  /** Type MIME d'origine : image/… ou video/…. */
  contentType: string;
  /** Nom d'origine du fichier. */
  name: string;
};

export type Report = {
  id: string;
  /** Publication signalée. */
  tweetId: string;
  /** Auteur de la publication signalée. */
  tweetAuthorId: string;
  /** Nom d'utilisateur de l'auteur de la publication signalée. */
  tweetAuthorUsername: string;
  /** Compte à l'origine du signalement. */
  createdBy: string;
  /** Motif choisi par la personne qui signale. */
  reason: ReportReason;
  /** Description libre ; obligatoire pour le motif « Autre ». */
  details: string;
  /** Pièces jointes (image ou vidéo). */
  attachments: ReportAttachment[];
  /** Date de création (millisecondes). */
  createdAt: number;
  /** Suite donnée par l'équipe de modération. */
  status: 'pending' | 'reviewed' | 'dismissed';
};

export const reportConverter: FirestoreDataConverter<Report> = {
  toFirestore(report) {
    return { ...report };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return { id, ...data } as Report;
  }
};
