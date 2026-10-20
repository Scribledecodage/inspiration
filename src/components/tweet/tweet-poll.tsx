import { useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { tweetsCollection } from '@lib/firebase/collections';
import { clearPollVote, setPollVote } from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { MaterialIcon } from '@components/ui/material-icon';
import { VoterStack } from '@components/common/voter-stack';
import type { PollVote, TweetPoll } from '@lib/types/tweet';
import type { User } from '@lib/types/user';

type TweetPollProps = {
  tweetId: string;
  poll: TweetPoll;
  /** Votes déjà connus au premier affichage ; le reste arrive en temps réel. */
  pollVotes?: Record<string, PollVote> | null;
};

const barSpring = { type: 'spring', stiffness: 170, damping: 22 } as const;
const percentSpring = { type: 'spring', stiffness: 140, damping: 20 } as const;

/** Les votes de quelqu'un, avec l'essentiel de son profil pour l'avatar. */
function buildVote(user: User, choices: string[]): PollVote {
  return {
    choices,
    name: user.name,
    username: user.username,
    photoURL: user.photoURL,
    ...(user.gender ? { gender: user.gender } : {}),
    ...(user.avatarShape ? { avatarShape: user.avatarShape } : {}),
    ...(user.avatarFrame ? { avatarFrame: user.avatarFrame } : {})
  };
}

export function TweetPoll({
  tweetId,
  poll,
  pollVotes
}: TweetPollProps): JSX.Element {
  const { user } = useAuth();

  const userId = user?.id ?? '';

  const [votes, setVotes] = useState<Record<string, PollVote>>(pollVotes ?? {});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setVotes(pollVotes ?? {});
  }, [pollVotes]);

  /* Temps réel : chaque modification du document (le vote de quelqu'un
     d'autre, par exemple) met les compteurs et les avatars à jour. */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(tweetsCollection, tweetId),
      (snapshot) => {
        const data = snapshot.data();
        setVotes(data?.pollVotes ?? {});
      },
      () => undefined
    );

    return unsubscribe;
  }, [tweetId]);

  const voteList = useMemo(() => Object.values(votes ?? {}), [votes]);

  /* Ici, un « vote » est une personne : les pourcentages se calculent donc sur
     le nombre de votants, ce qui reste lisible même en choix multiple. */
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

  const myChoices = (userId ? votes[userId]?.choices : undefined) ?? [];

  const handleVote = (optionId: string) => (): void => {
    if (!user || pending) return;

    const current = votes[userId];
    let choices: string[];

    if (!current) choices = [optionId];
    /* Choix multiple : on coche ou décoche le choix. */ else if (poll.multiple)
      choices = current.choices.includes(optionId)
        ? current.choices.filter((choice) => choice !== optionId)
        : [...current.choices, optionId];
    /* Choix unique : recliquer sur son choix le retire, cliquer ailleurs
       déplace le vote. */ else
      choices = current.choices.includes(optionId) ? [] : [optionId];

    const nextVotes = { ...votes };

    setPending(true);

    if (!choices.length) {
      delete nextVotes[userId];
      setVotes(nextVotes);
      void clearPollVote(tweetId, userId).finally(() => setPending(false));
      return;
    }

    const vote = buildVote(user, choices);
    nextVotes[userId] = vote;
    setVotes(nextVotes);
    void setPollVote(tweetId, userId, vote).finally(() => setPending(false));
  };

  return (
    <div className='flex flex-col gap-2'>
      {poll.question && (
        <p className='whitespace-pre-wrap break-words font-bold'>
          {poll.question}
        </p>
      )}
      <div className='flex flex-col gap-1.5'>
        {poll.options.map(({ id, text }) => {
          const count = counts[id] ?? 0;
          const percent = totalVoters
            ? Math.round((count / totalVoters) * 100)
            : 0;
          const isChosen = myChoices.includes(id);
          const voters = votersByOption[id] ?? [];

          return (
            <motion.button
              type='button'
              className={cn(
                'group relative flex min-h-[2.75rem] w-full items-center gap-2 overflow-hidden rounded-lg border px-3 py-2 text-left transition-colors',
                isChosen
                  ? 'border-main-accent'
                  : 'border-light-line-reply hover:border-main-accent/60 dark:border-dark-border'
              )}
              onClick={handleVote(id)}
              aria-pressed={isChosen}
              aria-label={`${text} : ${percent} %`}
              key={id}
            >
              {/* Barre de remplissage animée : sa largeur suit le score avec un
                  effet ressort — elle se remplit ou se déremplit à chaque vote,
                  qu'il vienne de vous ou d'un autre votant (temps réel). */}
              <motion.span
                aria-hidden='true'
                className={cn(
                  'absolute inset-y-0 left-0',
                  isChosen ? 'bg-main-accent/25' : 'bg-main-accent/10'
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
              {voters.length > 0 && <VoterStack voters={voters} />}
              <span
                className={cn(
                  'relative z-10 flex shrink-0 items-center gap-1 text-sm tabular-nums',
                  isChosen
                    ? 'text-main-accent'
                    : 'text-light-secondary dark:text-dark-secondary'
                )}
              >
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
                >
                  {percent}%
                </motion.span>
              </span>
            </motion.button>
          );
        })}
      </div>
      <div className='flex min-h-[1.5rem] flex-wrap items-center gap-x-2 text-sm text-light-secondary dark:text-dark-secondary'>
        <span>
          {totalVoters} vote{totalVoters > 1 ? 's' : ''}
        </span>
        <span aria-hidden='true'>·</span>
        <span>
          {poll.multiple ? 'Plusieurs réponses' : 'Une seule réponse'}
        </span>
      </div>
    </div>
  );
}
