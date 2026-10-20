import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { Loading } from '@components/ui/loading';
import { variants } from '@components/user/user-header';
import { UserCard } from './user-card';
import type { User } from '@lib/types/user';
import type { StatsType } from '@components/view/view-tweet-stats';
import type { StatsEmptyProps } from '@components/tweet/stats-empty';

type FollowType = 'following' | 'followers';

type CombinedTypes = StatsType | FollowType;

type UserCardsProps = {
  data: User[] | null;
  type: CombinedTypes;
  follow?: boolean;
  loading: boolean;
};

type NoStatsData = Record<CombinedTypes, StatsEmptyProps>;

const allNoStatsData: Readonly<NoStatsData> = {
  retweets: {
    title: 'Partagez les publications que vous aimez',
    imageData: { src: '/assets/no-retweets.png', alt: 'Aucun repost' },
    description:
      'Partagez la publication de quelqu’un d’autre sur votre fil en la repostant. Elle apparaîtra ensuite ici.'
  },
  likes: {
    title: 'Aucun J’aime pour le moment',
    imageData: { src: '/assets/no-likes.png', alt: 'Aucun J’aime' },
    description: 'Les publications que vous aimez apparaîtront ici.'
  },
  following: {
    title: 'Restez informé',
    description:
      'Suivre des comptes est un moyen simple de personnaliser votre fil et de rester informé des sujets et des personnes qui vous intéressent.'
  },
  followers: {
    title: 'Vous cherchez des abonnés ?',
    imageData: { src: '/assets/no-followers.png', alt: 'Aucun abonné' },
    description:
      'Les personnes qui suivent ce compte apparaîtront ici. Publier et interagir avec les autres vous aidera à gagner des abonnés.'
  }
};

export function UserCards({
  data,
  type,
  follow,
  loading
}: UserCardsProps): JSX.Element {
  const noStatsData = allNoStatsData[type];
  const modal = ['retweets', 'likes'].includes(type);

  return (
    <section
      className={cn(
        modal && 'h-full overflow-y-auto [&>div:first-child>a]:mt-[52px]',
        loading && 'flex items-center justify-center'
      )}
    >
      {loading ? (
        <Loading className={modal ? 'mt-[52px]' : 'mt-5'} />
      ) : (
        <AnimatePresence initial={false}>
          {data?.length ? (
            data.map((userData) => (
              <motion.div layout='position' key={userData.id} {...variants}>
                <UserCard {...userData} follow={follow} modal={modal} />
              </motion.div>
            ))
          ) : (
            <StatsEmpty {...noStatsData} modal={modal} />
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
