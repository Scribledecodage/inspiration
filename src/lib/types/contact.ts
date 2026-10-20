import type { FirestoreDataConverter } from 'firebase/firestore';

export type InboxContact = {
  id: string;
  addedAt: number;
  lastReadAt?: number;
};

export const contactConverter: FirestoreDataConverter<InboxContact> = {
  toFirestore(contact) {
    return { ...contact };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as InboxContact;
  }
};
