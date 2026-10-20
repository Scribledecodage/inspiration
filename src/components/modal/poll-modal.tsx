import { useEffect, useState } from 'react';
import cn from 'clsx';
import { useWindow } from '@lib/context/window-context';
import { useDragControls } from 'framer-motion';
import { getRandomId } from '@lib/random';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { Modal } from './modal';
import type { ChangeEvent } from 'react';
import type { Variants } from 'framer-motion';
import type { PollOption, TweetPoll } from '@lib/types/tweet';

/* Sur téléphone, le sondage s'ouvre comme un panneau glissant depuis le bas de
   l'écran ; sur ordinateur, c'est une fenêtre centrée. */
const sheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const MAX_QUESTION_LENGTH = 80;
const MAX_OPTION_LENGTH = 25;

type PollModalProps = {
  open: boolean;
  /** Sondage en cours d'édition, `null` pour en créer un nouveau. */
  poll: TweetPoll | null;
  closeModal: () => void;
  /** `null` signifie « retirer le sondage ». */
  onApply: (poll: TweetPoll | null) => void;
};

function createEmptyOptions(count: number): PollOption[] {
  return Array.from({ length: count }, () => ({
    id: getRandomId(),
    text: ''
  }));
}

export function PollModal({
  open,
  poll,
  closeModal,
  onApply
}: PollModalProps): JSX.Element {
  const { width } = useWindow();
  const dragControls = useDragControls();

  /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */
  const isSheet = width < 1024;

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<PollOption[]>(
    createEmptyOptions(MIN_OPTIONS)
  );
  const [multiple, setMultiple] = useState(false);

  /* Chaque ouverture repart du sondage existant (ou d'un formulaire vide). */
  useEffect(() => {
    if (!open) return;

    setQuestion(poll?.question ?? '');
    setMultiple(poll?.multiple ?? false);
    setOptions(
      poll && poll.options.length >= MIN_OPTIONS
        ? poll.options.map(({ id, text }) => ({ id, text }))
        : createEmptyOptions(MIN_OPTIONS)
    );
  }, [open, poll]);

  const filledOptions = options.filter(({ text }) => text.trim().length);
  const canApply = filledOptions.length >= MIN_OPTIONS;

  const handleOptionChange =
    (id: string) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>): void =>
      setOptions((current) =>
        current.map((option) =>
          option.id === id ? { ...option, text: value } : option
        )
      );

  const handleAddOption = (): void =>
    setOptions((current) =>
      current.length >= MAX_OPTIONS
        ? current
        : [...current, { id: getRandomId(), text: '' }]
    );

  const handleRemoveOption = (id: string) => (): void =>
    setOptions((current) =>
      current.length <= MIN_OPTIONS
        ? current
        : current.filter((option) => option.id !== id)
    );

  const handleApply = (): void => {
    if (!canApply) return;

    onApply({
      question: question.trim() || null,
      multiple,
      options: filledOptions.map(({ id, text }) => ({
        id,
        text: text.trim().slice(0, MAX_OPTION_LENGTH)
      }))
    });

    closeModal();
  };

  const handleRemovePoll = (): void => {
    onApply(null);
    closeModal();
  };

  const inputClassName =
    'w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none ' +
    'placeholder:text-light-secondary focus:border-main-accent dark:border-dark-border dark:placeholder:text-dark-secondary';

  return (
    <Modal
      className='flex items-end justify-center p-0 lg:items-center lg:p-4'
      modalAnimation={isSheet ? sheetAnimation : undefined}
      drag={isSheet ? 'y' : undefined}
      dragControls={dragControls}
      dragListener={false}
      onDragEnd={(_, info) => {
        if (isSheet && info.offset.y > 80) closeModal();
      }}
      modalClassName='fixed inset-x-0 bottom-0 max-h-[92dvh] w-full overflow-y-auto
                       overscroll-contain rounded-t-lg border-t border-light-border
                       bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl
                       dark:border-dark-border lg:static lg:max-h-[90vh] lg:max-w-lg lg:rounded-lg lg:border'
      open={open}
      closeModal={closeModal}
    >
      {/* Barre fine : elle sert de poignée pour faire glisser la feuille vers
          le bas et la refermer. */}
      {isSheet && (
        <button
          aria-label='Faire glisser pour fermer la fenêtre du sondage'
          className='flex w-full touch-none justify-center py-3'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}

      <div className='flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border'>
        <h2 className='text-xl font-bold'>
          {poll ? 'Modifier le sondage' : 'Créer un sondage'}
        </h2>
        <Button
          className='accent-tab rounded-full p-2 hover:bg-main-accent/10'
          onClick={closeModal}
          aria-label='Fermer la fenêtre du sondage'
        >
          <MaterialIcon className='h-5 w-5' iconName='close' />
        </Button>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <label className='flex flex-col gap-1'>
          <span className='text-sm font-bold text-light-secondary dark:text-dark-secondary'>
            Question <span className='font-normal'>(facultative)</span>
          </span>
          <input
            className={inputClassName}
            value={question}
            onChange={({ target: { value } }) => setQuestion(value)}
            placeholder='Poser une question'
            maxLength={MAX_QUESTION_LENGTH}
            aria-label='Question du sondage'
            autoFocus
          />
        </label>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-bold text-light-secondary dark:text-dark-secondary'>
            Choix ({MIN_OPTIONS} à {MAX_OPTIONS})
          </span>
          {options.map(({ id, text }, index) => (
            <div className='flex items-center gap-2' key={id}>
              <input
                className={inputClassName}
                value={text}
                onChange={handleOptionChange(id)}
                placeholder={`Choix ${index + 1}`}
                maxLength={MAX_OPTION_LENGTH}
                aria-label={`Choix ${index + 1}`}
              />
              {options.length > MIN_OPTIONS && (
                <Button
                  className='accent-tab shrink-0 rounded-full p-2 text-light-secondary hover:bg-accent-red/10 hover:text-accent-red dark:text-dark-secondary'
                  onClick={handleRemoveOption(id)}
                  aria-label={`Supprimer le choix ${index + 1}`}
                >
                  <MaterialIcon className='h-5 w-5' iconName='close' />
                </Button>
              )}
            </div>
          ))}
          {options.length < MAX_OPTIONS && (
            <Button
              className='flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-main-accent hover:bg-main-accent/10'
              onClick={handleAddOption}
            >
              <MaterialIcon className='h-5 w-5' iconName='add' />
              Ajouter un choix
            </Button>
          )}
        </div>
        <button
          type='button'
          className='flex items-center justify-between gap-4 rounded-lg py-1 text-left'
          onClick={() => setMultiple((current) => !current)}
          aria-pressed={multiple}
        >
          <span className='text-sm'>
            Autoriser plusieurs réponses
            <span className='block text-xs text-light-secondary dark:text-dark-secondary'>
              Sinon, une seule réponse à la fois
            </span>
          </span>
          <span
            className={cn(
              'relative h-6 w-11 shrink-0 rounded-full transition-colors',
              multiple
                ? 'bg-main-accent'
                : 'bg-light-secondary/40 dark:bg-dark-secondary/40'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                multiple ? 'left-[22px]' : 'left-0.5'
              )}
            />
          </span>
        </button>
        <div className='flex items-center justify-between gap-3 border-t border-light-border pt-4 dark:border-dark-border'>
          {poll ? (
            <Button
              className='flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-accent-red hover:bg-accent-red/10'
              onClick={handleRemovePoll}
            >
              <MaterialIcon className='h-5 w-5' iconName='delete' />
              Supprimer
            </Button>
          ) : (
            <span />
          )}
          <div className='flex items-center gap-2'>
            <Button
              className='rounded-full px-4 py-1.5 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
              onClick={closeModal}
            >
              Annuler
            </Button>
            <Button
              className='rounded-full bg-main-accent px-4 py-1.5 font-bold text-white
                         enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75'
              disabled={!canApply}
              onClick={handleApply}
            >
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
