import type { FirestoreDataConverter } from 'firebase/firestore';

export type Notification = {
  id: string;
  /** Titre court (ex. « Bienvenue sur Inspiration »). */
  title: string;
  /** Corps du message (peut contenir du texte simple). */
  body: string;
  /** Type pour le style/icône. */
  type?: 'welcome' | 'info' | 'system' | 'announcement';
  /** Date de création (millisecondes). */
  createdAt: number;
  /** Lu ou non. */
  read?: boolean;
};

export const notificationConverter: FirestoreDataConverter<Notification> = {
  toFirestore(notification) {
    return { ...notification };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return { id, ...data } as Notification;
  }
};
