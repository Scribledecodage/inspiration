import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';
import { VoterStack } from '@components/common/voter-stack';
import type { PollVote, TweetPoll } from '@lib/types/tweet';

type MessagePollProps = {
  poll: TweetPoll;
  votes: Record<string, PollVote>;
  currentUserId: string;
  /** Message envoyé par la personne qui lit : la bulle est bleue. */
  mine?: boolean;
  onVote: (choices: string[]) => Promise<void>;
};

const barSpring = { type: 'spring', stiffness: 170, damping: 22 } as const;
const percentSpring = { type: 'spring', stiffness: 140, damping: 20 } as const;

/**
 * Sondage de conversation.
 *
 * Chaque participant peut changer d'avis autant de fois qu'il veut : cliquer
 * sur une case la coche, recliquer la décoche, et un choix unique remplace
 * l'éventuelle case cochée précédemment. Les résultats se mettent à jour en
 * direct, car les votes sont écrits dans le document du message.
 *
 * L'affichage reprend celui des sondages de publication : barre de
 * proportion animée derrière le libellé, pourcentage, avatars des votants et
 * coche sur le choix coché. Les couleurs s'adaptent à la bulle (bleue pour un
 * message envoyé, blanche pour un message reçu).
 */
export function MessagePoll({
  poll,
  votes,
  currentUserId,
  mine = false,
  onVote
}: MessagePollProps): JSX.Element {
  const currentChoices = votes[currentUserId]?.choices ?? [];

  const voteList = useMemo(() => Object.values(votes ?? {}), [votes]);

  /* Comme pour les publications, un « vote » est une personne : les
     pourcentages se calculent sur le nombre de votants. */
  const totalVoters = voteList.length;

  const counts = useMemo(() => {
    const result: Record<string, number> = {};

    poll.options.forEach(({ id }) => (result[id] = 0));
    voteList.forEach(({ choices }) =>
      (choices ?? []).forEach((choice) => {
        if (choice in result) result[choice] += 1;
      })
    );

    return result;
  }, [poll.options, voteList]);

  const votersByOption = useMemo(() => {
    const result: Record<string, PollVote[]> = {};

    poll.options.forEach(({ id }) => (result[id] = []));
    voteList.forEach((vote) =>
      (vote.choices ?? []).forEach((choice) => {
        if (result[choice]) result[choice].push(vote);
      })
    );

    return result;
  }, [poll.options, voteList]);

  const toggle = (optionId: string): void => {
    /* Choix unique : on coche la case, ou on la décoche si elle l'est déjà. */
    if (!poll.multiple)
      void onVote(
        currentChoices.length === 1 && currentChoices[0] === optionId
          ? []
          : [optionId]
      );
    /* Choix multiples : on ajoute ou retire la case, dans l'ordre du
         sondage pour que l'affichage reste stable. */ else
      void onVote(
        poll.options
          .map(({ id }) => id)
          .filter((id) =>
            currentChoices.includes(id) ? id !== optionId : id === optionId
          )
      );
  };

  return (
    /* Sur ordinateur, le sondage garde une largeur minimale : les options
       restent lisibles et la bulle ne se réduit pas à la largeur du libellé.
       Sur téléphone, il s'adapte à la largeur de l'écran. */
    <div className='flex w-full min-w-0 max-w-full flex-col gap-2.5 sm:min-w-[20rem]'>
      {poll.question && (
        <p className='whitespace-pre-wrap break-words font-bold leading-snug'>
          {poll.question}
        </p>
      )}

      <div className='flex flex-col gap-1.5'>
        {poll.options.map(({ id, text }) => {
          const count = counts[id] ?? 0;
          const percent = totalVoters
            ? Math.round((count / totalVoters) * 100)
            : 0;
          const isChosen = currentChoices.includes(id);
          const voters = votersByOption[id] ?? [];

          return (
            <motion.button
              type='button'
              className={cn(
                'group relative flex min-h-[2.5rem] w-full min-w-0 items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-2 text-left transition-colors',
                isChosen
                  ? mine
                    ? 'border-white/70'
                    : 'border-main-accent'
                  : mine
                  ? 'border-white/25'
                  : 'border-light-line-reply hover:border-main-accent/60 dark:border-dark-border'
              )}
              onClick={(): void => toggle(id)}
              aria-pressed={isChosen}
              aria-label={`${text} : ${percent} %`}
              key={id}
            >
              {/* Barre de remplissage : sa largeur suit le score avec un effet
                  ressort, comme dans les sondages de publication. Dans la
                  bulle bleue, elle est blanche : une barre à la couleur
                  d'accent y serait invisible. */}
              <motion.span
                aria-hidden='true'
                className={cn(
                  'absolute inset-y-0 left-0',
                  mine
                    ? isChosen
                      ? 'bg-white/30'
                      : 'bg-white/10'
                    : isChosen
                    ? 'bg-main-accent/25'
                    : 'bg-main-accent/10'
                )}
                initial={false}
                animate={{ width: `${percent}%` }}
                transition={barSpring}
              />

              <span
                className={cn(
                  'relative z-10 min-w-0 flex-1 truncate',
                  isChosen && 'font-bold'
                )}
              >
                {text}
              </span>

              {voters.length > 0 && (
                <VoterStack
                  countClassName='opacity-80'
                  size={16}
                  voters={voters}
                />
              )}

              {/* Choix coché et pourcentage : la coche donne l'information
                  d'un coup d'œil, le pourcentage est en pastille pour être lu
                  sans effort. */}
              <span className='relative z-10 flex shrink-0 items-center gap-1.5'>
                <AnimatePresence initial={false} mode='wait'>
                  {isChosen && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 22
                      }}
                      className='flex'
                    >
                      <MaterialIcon
                        className='h-4 w-4'
                        iconName='check_circle'
                        solid
                      />
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.span
                  key={percent}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={percentSpring}
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-bold tabular-nums',
                    mine
                      ? isChosen
                        ? 'bg-white/25'
                        : 'bg-white/10'
                      : isChosen
                      ? 'bg-main-accent/20 text-main-accent'
                      : 'bg-main-search-background/60 text-light-secondary dark:bg-dark-primary/20 dark:text-dark-secondary'
                  )}
                >
                  {percent}%
                </motion.span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className='flex min-h-[1.25rem] flex-wrap items-center gap-x-1.5 text-xs opacity-80'>
        <span className='font-bold'>
          {totalVoters} vote{totalVoters > 1 ? 's' : ''}
        </span>
        <span aria-hidden='true'>·</span>
        <span>
          {poll.multiple ? 'Plusieurs réponses' : 'Une seule réponse'}
        </span>
      </div>

      {/* Le vote reste modifiable : on le dit, sinon on croit le sondage figé. */}
      <p className='text-[11px] opacity-70'>
        {currentChoices.length
          ? 'Cliquez à nouveau pour changer.'
          : 'Cliquez sur une réponse pour voter.'}
      </p>
    </div>
  );
}
