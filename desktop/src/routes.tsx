import type { ComponentType } from 'react';

/**
 * Les pages de l'application de bureau.
 *
 * Ce sont **les pages du site**, importées telles quelles : la même
 * interface, la même logique, le même rendu. Seule la résolution de
 * l'URL change (aucun serveur de routage).
 */
export type Route = {
  /* Le chemin, avec les segments dynamiques entre crochets. */
  path: string;
  component: ComponentType<Record<string, never>>;
};

import Login from '@site/pages/index';
import Home from '@site/pages/home';
import TweetPage from '@site/pages/tweet/[id]';
import UserTweets from '@site/pages/user/[id]/index';
import UserLikes from '@site/pages/user/[id]/likes';
import UserMedia from '@site/pages/user/[id]/media';
import UserWithReplies from '@site/pages/user/[id]/with_replies';
import UserFollowers from '@site/pages/user/[id]/followers';
import UserFollowing from '@site/pages/user/[id]/following';
import Notifications from '@site/pages/notifications';
import NotificationPage from '@site/pages/notification/[id]';
import Messages from '@site/pages/messages';
import Trends from '@site/pages/trends';
import Bookmarks from '@site/pages/bookmarks';
import People from '@site/pages/people';
import Settings from '@site/pages/settings';
import SettingsAccessibility from '@site/pages/settings/accessibility';
import SettingsNotifications from '@site/pages/settings/notifications';
import SettingsPersonalization from '@site/pages/settings/personalization';
import SettingsPrivacy from '@site/pages/settings/privacy';
import SettingsSecurity from '@site/pages/settings/security';
import SettingsUsername from '@site/pages/settings/username';
import SettingsHelp from '@site/pages/settings/help';
import Terms from '@site/pages/terms';
import Privacy from '@site/pages/privacy';
import Cookies from '@site/pages/cookies';
import Accessibility from '@site/pages/accessibility';
import NotFound from '@site/pages/404';

export const ROUTES: Route[] = [
  { path: '/', component: Login as Route['component'] },
  { path: '/home', component: Home as Route['component'] },
  { path: '/tweet/[id]', component: TweetPage as Route['component'] },
  { path: '/user/[id]', component: UserTweets as Route['component'] },
  { path: '/user/[id]/likes', component: UserLikes as Route['component'] },
  { path: '/user/[id]/media', component: UserMedia as Route['component'] },
  {
    path: '/user/[id]/with_replies',
    component: UserWithReplies as Route['component']
  },
  {
    path: '/user/[id]/followers',
    component: UserFollowers as Route['component']
  },
  {
    path: '/user/[id]/following',
    component: UserFollowing as Route['component']
  },
  { path: '/notifications', component: Notifications as Route['component'] },
  {
    path: '/notification/[id]',
    component: NotificationPage as Route['component']
  },
  { path: '/messages', component: Messages as Route['component'] },
  { path: '/trends', component: Trends as Route['component'] },
  { path: '/bookmarks', component: Bookmarks as Route['component'] },
  { path: '/people', component: People as Route['component'] },
  { path: '/search', component: People as Route['component'] },
  { path: '/settings', component: Settings as Route['component'] },
  {
    path: '/settings/accessibility',
    component: SettingsAccessibility as Route['component']
  },
  {
    path: '/settings/notifications',
    component: SettingsNotifications as Route['component']
  },
  {
    path: '/settings/personalization',
    component: SettingsPersonalization as Route['component']
  },
  { path: '/settings/privacy', component: SettingsPrivacy as Route['component'] },
  {
    path: '/settings/security',
    component: SettingsSecurity as Route['component']
  },
  {
    path: '/settings/username',
    component: SettingsUsername as Route['component']
  },
  { path: '/settings/help', component: SettingsHelp as Route['component'] },
  { path: '/terms', component: Terms as Route['component'] },
  { path: '/privacy', component: Privacy as Route['component'] },
  { path: '/cookies', component: Cookies as Route['component'] },
  { path: '/accessibility', component: Accessibility as Route['component'] },
  { path: '/404', component: NotFound as Route['component'] }
];

/**
 * Résolution des paramètres dynamiques d'un chemin.
 */
export function resolveParams(pathname: string): Record<string, string> {
  return matchRoute(pathname)?.params ?? {};
}

/**
 * Retrouve la page correspondant à un chemin et en extrait les paramètres
 * dynamiques (`/tweet/abc` → `{ id: 'abc' }`).
 */
export function matchRoute(pathname: string): {
  route: Route;
  params: Record<string, string>;
} | null {
  const pathParts = pathname.split('/').filter(Boolean);

  for (const route of ROUTES) {
    const routeParts = route.path.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) continue;

    const params: Record<string, string> = {};
    let matched = true;

    for (let index = 0; index < routeParts.length; index += 1) {
      const part = routeParts[index] as string;
      const value = pathParts[index] as string;

      if (part.startsWith('[') && part.endsWith(']')) {
        params[part.slice(1, -1)] = decodeURIComponent(value);
        continue;
      }

      if (part !== value) {
        matched = false;
        break;
      }
    }

    if (matched) return { route, params };
  }

  return null;
}
