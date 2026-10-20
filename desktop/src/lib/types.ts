import type { Timestamp } from 'firebase/firestore';

export type AppUser = {
  id: string;
  name: string;
  username: string;
  photoURL?: string | null;
  verified?: boolean;
  bio?: string | null;
  following?: string[];
  followers?: string[];
  totalTweets?: number;
  totalPhotos?: number;
  gender?: 'homme' | 'femme' | 'autre';
  avatarShape?: string | null;
  avatarFrame?: string | null;
  createdAt?: Timestamp;
};

export type TweetParent = {
  id: string;
  username: string;
};

export type Tweet = {
  id: string;
  text?: string | null;
  parent?: TweetParent | null;
  images?: string[] | null;
  poll?: {
    options: string[];
    votes?: Record<string, number>;
    multiple?: boolean;
  } | null;
  location?: string | null;
  linkPreview?: {
    title?: string | null;
    description?: string | null;
    image?: string | null;
    url?: string | null;
  } | null;
  userLikes?: string[];
  userRetweets?: string[];
  userReplies?: number;
  views?: number;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp | null;
};

export type AppNotification = {
  id: string;
  type?: string;
  body?: string;
  createdBy?: string;
  read?: boolean;
  createdAt: Timestamp;
};
