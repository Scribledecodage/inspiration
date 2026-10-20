import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { ImagesPreview } from './file';
import type { LinkPreviewData } from '../link-preview';
import type { User } from './user';
import type { AvatarShape, AvatarFrame } from './theme';

/** Un choix proposé dans un sondage. */
export type PollOption = {
  id: string;
  text: string;
};

/* Le vote d'une personne. On recopie à ce moment-là l'essentiel de son profil
   (nom, photo, forme et cadre d'avatar) : le sondage peut ainsi afficher les
   avatars des votants en temps réel sans relire chaque profil. */
export type PollVote = {
  /** Identifiants des choix cochés (un seul si le sondage est à choix unique). */
  choices: string[];
  name: string;
  username: string;
  photoURL: string;
  gender?: 'homme' | 'femme' | 'autre';
  avatarShape?: AvatarShape;
  avatarFrame?: AvatarFrame;
};

export type TweetPoll = {
  /** Question facultative affichée au-dessus des choix. */
  question: string | null;
  options: PollOption[];
  /** `true` : plusieurs choix possibles, `false` : un seul. */
  multiple: boolean;
};

export type Tweet = {
  id: string;
  text: string | null;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userReplies: number;
  userRetweets: string[];
  /** Sondage attaché à la publication, s'il y en a un. */
  poll?: TweetPoll | null;
  /** Votes du sondage, rangés par identifiant d'utilisateur. */
  pollVotes?: Record<string, PollVote> | null;
  /** Nombre total de vues de la publication. */
  views?: number;
  /** Lieu associé à la publication (ex. « Paris, France »). */
  location?: string | null;
  /** Message vocal joint à la publication. */
  audioURL?: string | null;
  /** Durée du message vocal, en secondes. */
  audioDuration?: number | null;
  /** Aperçu du lien partagé, figé au moment de la publication. */
  linkPreview?: LinkPreviewData | null;
  /** Vues par jour (`AAAA-MM-JJ` → nombre), pour le graphique des statistiques. */
  viewsByDay?: Record<string, number>;
};

export type TweetWithUser = Tweet & { user: User };

/** État d'une publication programmée. */
export type ScheduledTweetStatus = 'pending' | 'sent' | 'error';

/* Une publication programmée : elle est enregistrée dans la collection
   `scheduledTweets` puis convertie en vraie publication à l'heure prévue. */
export type ScheduledTweet = {
  id: string;
  text: string | null;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  poll: TweetPoll | null;
  createdBy: string;
  /** Date et heure d'envoi. */
  scheduledAt: Timestamp;
  status: ScheduledTweetStatus;
  createdAt: Timestamp;
  /** Lieu associé à la publication programmée. */
  location?: string | null;
};

export const scheduledTweetConverter: FirestoreDataConverter<ScheduledTweet> = {
  toFirestore(scheduledTweet) {
    return { ...scheduledTweet };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    return { id, ...snapshot.data(options) } as ScheduledTweet;
  }
};

export const tweetConverter: FirestoreDataConverter<Tweet> = {
  toFirestore(tweet) {
    return { ...tweet };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Tweet;
  }
};
