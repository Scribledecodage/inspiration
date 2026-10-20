import { collection } from 'firebase/firestore';
import { userConverter } from '@lib/types/user';
import { tweetConverter, scheduledTweetConverter } from '@lib/types/tweet';
import { bookmarkConverter } from '@lib/types/bookmark';
import { contactConverter } from '@lib/types/contact';
import { statsConverter } from '@lib/types/stats';
import {
  chatMessageConverter,
  conversationConverter
} from '@lib/types/message';
import { notificationConverter } from '@lib/types/notification';
import { reportConverter } from '@lib/types/report';
import type { Notification } from '@lib/types/notification';
import type { Report } from '@lib/types/report';
import { statusConverter } from '@lib/types/status';
import { channelConverter } from '@lib/types/channel';
import { db } from './app';
import type { CollectionReference } from 'firebase/firestore';
import type { Bookmark } from '@lib/types/bookmark';
import type { InboxContact } from '@lib/types/contact';
import type { Stats } from '@lib/types/stats';
import type { ChatMessage, Conversation } from '@lib/types/message';
import type { ScheduledTweet } from '@lib/types/tweet';
export const usersCollection = collection(db, 'users').withConverter(
  userConverter
);

export const tweetsCollection = collection(db, 'tweets').withConverter(
  tweetConverter
);

export const statusesCollection = collection(db, 'statuses').withConverter(
  statusConverter
);

export const channelsCollection = collection(db, 'channels').withConverter(
  channelConverter
);

/* Signalements de contenu : rangés dans l'espace privé de la personne qui
   signale. Rien n'est transmis à la personne signalée et aucune mesure n'est
   appliquée automatiquement : la décision reste humaine. */
export function userReportsCollection(id: string): CollectionReference<Report> {
  return collection(db, `users/${id}/reports`).withConverter(reportConverter);
}

export function userBookmarksCollection(
  id: string
): CollectionReference<Bookmark> {
  return collection(db, `users/${id}/bookmarks`).withConverter(
    bookmarkConverter
  );
}

export function userScheduledTweetsCollection(
  id: string
): CollectionReference<ScheduledTweet> {
  return collection(db, `users/${id}/scheduledTweets`).withConverter(
    scheduledTweetConverter
  );
}

export function userNotificationsCollection(
  id: string
): CollectionReference<Notification> {
  return collection(db, `users/${id}/notifications`).withConverter(
    notificationConverter
  );
}

export function userContactsCollection(
  id: string
): CollectionReference<InboxContact> {
  return collection(db, `users/${id}/contacts`).withConverter(contactConverter);
}

export function userStatsCollection(id: string): CollectionReference<Stats> {
  return collection(db, `users/${id}/stats`).withConverter(statsConverter);
}

export function userConversationsCollection(
  userId: string
): CollectionReference<Conversation> {
  return collection(db, `users/${userId}/conversations`).withConverter(
    conversationConverter
  );
}

export function conversationMessagesCollection(
  userId: string,
  conversationId: string
): CollectionReference<ChatMessage> {
  return collection(
    db,
    `users/${userId}/conversations/${conversationId}/messages`
  ).withConverter(chatMessageConverter);
}
