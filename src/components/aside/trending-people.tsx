import { useMemo, useState } from 'react';
import Link from 'next/link';
import { limit, orderBy, query, documentId } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { UserCard } from '@components/user/user-card';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { MaterialIcon } from '@components/ui/material-icon';
import { variants } from './aside-trends';
import { AnimatePresence, motion } from 'framer-motion';
import type { User } from '@lib/types/user';

const CANDIDATE_LIMIT = 100;
const DISPLAY_LIMIT = 100;

type RankedUser = User & { rank: number };

function rankUsers(users: User[], currentUserId?: string): RankedUser[] {
  return users
    .filter(({ id }) => id !== currentUserId)
    .sort((first, second) => {
      const followerDifference =
        (second.followers?.length ?? 0) - (first.followers?.length ?? 0);
      if (followerDifference) return followerDifference;

      const tweetDifference =
        (second.totalTweets ?? 0) - (first.totalTweets ?? 0);
      if (tweetDifference) return tweetDifference;

      return (second.totalPhotos ?? 0) - (first.totalPhotos ?? 0);
    })
    .slice(0, DISPLAY_LIMIT)
    .map((user, index) => ({ ...user, rank: index + 1 }));
}

export function TrendingPeople(): JSX.Element {
  const { user } = useAuth();
  const [showUsers, setShowUsers] = useState(true);
  const { data, loading } = useCollection(
    query(usersCollection, orderBy(documentId()), limit(CANDIDATE_LIMIT)),
    { allowNull: true }
  );

  const allRankedUsers = useMemo(
    () => rankUsers(data ?? [], user?.id),
    [data, user?.id]
  );
  const rankedUsers = useMemo(
    () => allRankedUsers.slice(0, 3),
    [allRankedUsers]
  );

  return (
    <section className='mt-3 overflow-hidden rounded-xl bg-main-sidebar-background'>
      {loading ? (
        <Loading className='flex h-40 items-center justify-center p-4' />
      ) : data ? (
        <motion.div {...variants}>
          <div
            className={`flex items-center justify-between gap-2 pb-1 pl-4 pr-1.5 pt-2 ${
              showUsers ? '' : 'pb-2'
            }`}
          >
            <h2 className='text-xl font-bold'>Utilisateurs sur le site</h2>
            <button
              className='accent-tab shrink-0 rounded-full p-2 text-light-secondary transition
                         hover:bg-light-secondary/10 hover:text-light-primary
                         active:bg-light-secondary/20 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-main-accent
                         dark:text-dark-secondary dark:hover:bg-dark-secondary/10
                         dark:hover:text-dark-primary dark:active:bg-dark-secondary/20'
              type='button'
              aria-expanded={showUsers}
              aria-label={
                showUsers
                  ? 'Masquer les utilisateurs sur le site'
                  : 'Afficher les utilisateurs sur le site'
              }
              onClick={(): void => setShowUsers((value) => !value)}
            >
              <MaterialIcon
                className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
                  showUsers ? '' : 'rotate-180'
                }`}
                iconName='keyboard_arrow_up'
              />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {showUsers && (
              <motion.div
                animate={{ height: 'auto', opacity: 1 }}
                className='overflow-hidden'
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              >
                <p className='px-4 pb-3 text-sm text-light-secondary dark:text-dark-secondary'>
                  Explorez les profils des membres actifs de notre communauté.
                </p>
                {rankedUsers.map((userData) => (
                  <div key={userData.id}>
                    <UserCard {...userData} />
                  </div>
                ))}
                {allRankedUsers.length > 3 && (
                  <Link href='/people'>
                    <a
                      className='block w-full border-t border-light-border py-2.5 text-center text-sm text-main-accent transition hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5'
                    >
                      Voir tout
                    </a>
                  </Link>
                )}
                {!rankedUsers.length && (
                  <p className='px-4 pb-4 pt-2 text-xs text-light-secondary dark:text-dark-secondary'>
                    Pas d’autres utilisateurs
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
