import { useMemo } from 'react';
import cn from 'clsx';
import { doc } from 'firebase/firestore';
import { useDragControls } from 'framer-motion';
import { Modal } from '@components/modal/modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { Loading } from '@components/ui/loading';
import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { useDocument } from '@lib/hooks/useDocument';
import { useArrayDocument } from '@lib/hooks/useArrayDocument';
import { tweetsCollection, usersCollection } from '@lib/firebase/collections';
import type { IconName } from '@components/ui/material-icon';

type TweetStatsPanelProps = {
  tweetId: string;
  open: boolean;
  closeModal: () => void;
};

type DayStat = {
  key: string;
  label: string;
  value: number;
};

/** Dimanche → Samedi (`Date.getDay()` commence le dimanche). */
const WEEK_DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'] as const;

const MAX_LIKED_USERS = 8;

/**
 * Construit les 7 derniers jours de vues à partir de `viewsByDay`.
 * Les clés sont au format UTC, identique à celui utilisé pour l'écriture.
 */
function buildWeekStats(viewsByDay: Record<string, number>): DayStat[] {
  const days: DayStat[] = [];

  for (let offset = 6; offset >= 0; offset--) {
    const date = new Date();
    date.setDate(date.getDate() - offset);

    const key = date.toISOString().slice(0, 10);

    days.push({
      key,
      label: WEEK_DAYS[date.getDay()],
      value: viewsByDay[key] ?? 0
    });
  }

  return days;
}

type MetricProps = {
  iconName: IconName;
  label: string;
  value: number;
  className?: string;
};

function Metric({
  iconName,
  label,
  value,
  className
}: MetricProps): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-1 rounded-2xl border border-light-border p-3 dark:border-dark-border'>
      <MaterialIcon className={cn('h-5 w-5', className)} iconName={iconName} />
      <span className='text-lg font-bold tabular-nums text-light-primary dark:text-dark-primary'>
        {value}
      </span>
      <span className='text-[11px] text-light-secondary dark:text-dark-secondary'>
        {label}
      </span>
    </div>
  );
}

/**
 * Statistiques d'une publication (visible par son auteur) : total de vues,
 * graphique des 7 derniers jours, J'aime / réponses / reposts, et la liste
 * des personnes qui ont aimé. Popup centré sur ordinateur, feuille glissante
 * en bas de l'écran sur téléphone.
 */
export function TweetStatsPanel({
  tweetId,
  open,
  closeModal
}: TweetStatsPanelProps): JSX.Element {
  const dragControls = useDragControls();

  const { data: tweet, loading } = useDocument(doc(tweetsCollection, tweetId), {
    disabled: !open
  });

  const likeIds = useMemo(() => tweet?.userLikes ?? [], [tweet?.userLikes]);

  const { data: likedUsers } = useArrayDocument(likeIds, usersCollection, {
    disabled: !open || !likeIds.length
  });

  const weekStats = useMemo(
    () => buildWeekStats(tweet?.viewsByDay ?? {}),
    [tweet?.viewsByDay]
  );

  const totalViews = tweet?.views ?? 0;
  const totalLikes = likeIds.length;
  const totalReplies = tweet?.userReplies ?? 0;
  const totalRetweets = tweet?.userRetweets?.length ?? 0;

  const weekTotal = weekStats.reduce((total, day) => total + day.value, 0);
  const maxValue = Math.max(1, ...weekStats.map((day) => day.value));

  return (
    <Modal
      className='flex items-end justify-center p-0 xs:items-center xs:p-4'
      modalClassName='fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-3xl border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl dark:border-dark-border xs:static xs:max-h-[85vh] xs:max-w-md xs:rounded-2xl xs:border xs:p-6'
      open={open}
      closeModal={closeModal}
      drag='y'
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0.25}
      dragMomentum={false}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (info.offset.y > 150 || info.velocity.y > 900) closeModal();
      }}
    >
      <button
        aria-label='Faire glisser pour fermer les statistiques'
        className='mx-auto mb-2 flex w-full touch-none justify-center py-2 xs:hidden'
        onPointerDown={(event) => dragControls.start(event.nativeEvent)}
        type='button'
      >
        <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
      </button>

      <header className='flex items-start justify-between gap-4'>
        <div>
          <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
            Statistiques
          </h2>
          <p className='mt-0.5 text-sm text-light-secondary dark:text-dark-secondary'>
            Vues, J’aime et partages de ta publication
          </p>
        </div>
        <Button
          aria-label='Fermer les statistiques'
          className='-mr-2 -mt-2 p-2'
          onClick={closeModal}
        >
          <MaterialIcon className='h-5 w-5' iconName='close' />
        </Button>
      </header>

      {loading ? (
        <Loading className='py-12' iconClassName='h-8 w-8' />
      ) : (
        <div className='mt-5 flex flex-col gap-5'>
          <section className='flex items-center gap-3 rounded-2xl border border-light-border bg-main-search-background/20 p-4 dark:border-dark-border'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-main-accent/10 text-main-accent'>
              <MaterialIcon className='h-6 w-6' iconName='visibility' />
            </span>
            <div>
              <p className='text-2xl font-bold tabular-nums text-light-primary dark:text-dark-primary'>
                {totalViews}
              </p>
              <p className='text-xs text-light-secondary dark:text-dark-secondary'>
                {totalViews > 1
                  ? 'personnes ont vu cette publication'
                  : 'personne a vu cette publication'}
              </p>
            </div>
          </section>

          <section className='flex flex-col gap-3 rounded-2xl border border-light-border p-4 dark:border-dark-border'>
            <div className='flex items-baseline justify-between gap-2'>
              <h3 className='text-sm font-bold text-light-primary dark:text-dark-primary'>
                Vues des 7 derniers jours
              </h3>
              <span className='text-xs text-light-secondary dark:text-dark-secondary'>
                {weekTotal} cette semaine
              </span>
            </div>
            <div className='flex items-end gap-1.5'>
              {weekStats.map(({ key, label, value }) => (
                <div
                  className='flex min-w-0 flex-1 flex-col items-center gap-1'
                  key={key}
                >
                  <span className='text-[10px] font-semibold tabular-nums text-light-secondary dark:text-dark-secondary'>
                    {value}
                  </span>
                  <div className='flex h-20 w-full items-end'>
                    <div
                      className='w-full rounded-t-md bg-main-accent transition-[height] duration-500'
                      style={{
                        height: `${Math.max(
                          value ? (value / maxValue) * 100 : 0,
                          value ? 8 : 2
                        )}%`
                      }}
                      title={`${value} vue(s)`}
                    />
                  </div>
                  <span className='text-[10px] text-light-secondary dark:text-dark-secondary'>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className='grid grid-cols-3 gap-2'>
            <Metric
              className='text-accent-pink'
              iconName='favorite'
              label='J’aime'
              value={totalLikes}
            />
            <Metric
              className='text-main-accent'
              iconName='chat_bubble'
              label='Réponses'
              value={totalReplies}
            />
            <Metric
              className='text-accent-green'
              iconName='repeat'
              label='Reposts'
              value={totalRetweets}
            />
          </section>

          <section className='flex flex-col gap-2'>
            <h3 className='text-sm font-bold text-light-primary dark:text-dark-primary'>
              Personnes qui ont aimé
            </h3>
            {likedUsers?.length ? (
              <div className='flex flex-col'>
                {likedUsers.slice(0, MAX_LIKED_USERS).map((user) => (
                  <div
                    className='flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                    key={user.id}
                  >
                    <UserAvatar
                      alt={user.name}
                      frame={user.avatarFrame}
                      gender={user.gender}
                      shape={user.avatarShape}
                      size={36}
                      src={user.photoURL}
                      username={user.username}
                    />
                    <div className='flex min-w-0 flex-col'>
                      <UserName name={user.name} verified={user.verified} />
                      <UserUsername disableLink username={user.username} />
                    </div>
                    <MaterialIcon
                      className='ml-auto h-4 w-4 shrink-0 text-accent-pink'
                      iconName='favorite'
                    />
                  </div>
                ))}
                {likedUsers.length > MAX_LIKED_USERS && (
                  <p className='px-2 pt-1 text-xs text-light-secondary dark:text-dark-secondary'>
                    et {likedUsers.length - MAX_LIKED_USERS} autre
                    {likedUsers.length - MAX_LIKED_USERS > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ) : (
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                Aucun J’aime pour le moment.
              </p>
            )}
          </section>
        </div>
      )}
    </Modal>
  );
}
