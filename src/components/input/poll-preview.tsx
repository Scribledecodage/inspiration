import { motion } from 'framer-motion';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import type { TweetPoll } from '@lib/types/tweet';

type PollPreviewProps = {
  poll: TweetPoll;
  /** Ouvre la fenêtre pour modifier le sondage. */
  onEdit?: () => void;
  /** Retire le sondage de la publication. */
  onRemove?: () => void;
};

/* Aperçu du sondage dans la zone de rédaction : on voit la question et les
   choix avant de publier, comme pour un aperçu d'image. */
export function PollPreview({
  poll,
  onEdit,
  onRemove
}: PollPreviewProps): JSX.Element {
  return (
    <motion.div
      className='relative rounded-2xl border border-light-line-reply p-3 dark:border-dark-border'
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <div className='flex flex-col gap-2'>
        {poll.question && <p className='font-bold'>{poll.question}</p>}
        {poll.options.map(({ id, text }) => (
          <p
            className='rounded-lg border border-light-line-reply px-3 py-2 text-sm dark:border-dark-border'
            key={id}
          >
            {text}
          </p>
        ))}
      </div>
      <div className='mt-3 flex items-center justify-between gap-2'>
        <p className='text-xs text-light-secondary dark:text-dark-secondary'>
          {poll.multiple ? 'Plusieurs réponses' : 'Une seule réponse'} ·{' '}
          {poll.options.length} choix
        </p>
        {onEdit && (
          <Button
            className='rounded-full px-3 py-1 text-sm font-bold text-main-accent hover:bg-main-accent/10'
            onClick={onEdit}
          >
            Modifier
          </Button>
        )}
      </div>
      {onRemove && (
        <Button
          className='accent-tab absolute right-1 top-1 rounded-full bg-light-primary/75 p-1
                     text-white backdrop-blur-sm hover:bg-image-preview-hover/75'
          onClick={onRemove}
          aria-label='Retirer le sondage'
        >
          <MaterialIcon className='h-4 w-4' iconName='close' />
        </Button>
      )}
    </motion.div>
  );
}
