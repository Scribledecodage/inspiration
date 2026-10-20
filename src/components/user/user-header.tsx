import { useRouter } from 'next/router';
import { doc } from 'firebase/firestore';
import { useDocument } from '@lib/hooks/useDocument';
import { useUser } from '@lib/context/user-context';
import { isPlural } from '@lib/utils';
import { userStatsCollection } from '@lib/firebase/collections';
import { UserName } from './user-name';
import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function UserHeader(): JSX.Element {
  const {
    pathname,
    query: { id }
  } = useRouter();

  const { user, loading } = useUser();

  const userId = user ? user.id : null;

  const { data: statsData, loading: statsLoading } = useDocument(
    doc(userStatsCollection(userId ?? 'null'), 'stats'),
    {
      allowNull: true,
      disabled: !userId
    }
  );

  const { tweets, likes } = statsData ?? {};

  const [totalTweets, totalPhotos, totalLikes] = [
    (user?.totalTweets ?? 0) + (tweets?.length ?? 0),
    user?.totalPhotos,
    likes?.length
  ];

  const currentPage = pathname.split('/').pop() ?? '';

  const isInTweetPage = ['[id]', 'with_replies'].includes(currentPage);
  const isInFollowPage = ['following', 'followers'].includes(currentPage);

  if (loading || statsLoading)
    return (
      <div
        className='-mb-1 inner:animate-pulse inner:rounded-lg
                   inner:bg-light-secondary dark:inner:bg-dark-secondary'
      >
        <div className='mb-1 -mt-1 h-5 w-24' />
        <div className='h-4 w-12' />
      </div>
    );

  if (!user)
    return (
      <h2 className='text-xl font-bold'>
        {isInFollowPage ? `@${id as string}` : 'Utilisateur'}
      </h2>
    );

  return (
    <div className='-mb-1 truncate'>
      <UserName
        tag='h2'
        name={user.name}
        className='-mt-1 text-xl'
        iconClassName='w-6 h-6'
        verified={user.verified}
      />
      <p className='text-xs text-light-secondary dark:text-dark-secondary'>
        {isInFollowPage
          ? `@${user.username}`
          : isInTweetPage
          ? totalTweets
            ? `${totalTweets} publication${isPlural(totalTweets) ? 's' : ''}`
            : 'Aucune publication'
          : currentPage === 'media'
          ? totalPhotos
            ? `${totalPhotos} photo${isPlural(totalPhotos) ? 's' : ''} et GIF${
                isPlural(totalPhotos) ? 's' : ''
              }`
            : 'Aucune photo ni GIF'
          : totalLikes
          ? `${totalLikes} J’aime${isPlural(totalLikes) ? 's' : ''}`
          : 'Aucun J’aime'}
      </p>
    </div>
  );
}
