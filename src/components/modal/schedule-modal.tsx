import { useState } from 'react';
import cn from 'clsx';
import { useWindow } from '@lib/context/window-context';
import { useDragControls } from 'framer-motion';
import { Modal } from './modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import type { Variants } from 'framer-motion';

const sheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

type ScheduleModalProps = {
  open: boolean;
  closeModal: () => void;
  onSchedule: (date: Date) => void;
};

export function ScheduleModal({
  open,
  closeModal,
  onSchedule
}: ScheduleModalProps): JSX.Element {
  const { width } = useWindow();
  const dragControls = useDragControls();

  /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */
  const isSheet = width < 1024;

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSchedule = (): void => {
    if (!selectedDate || !selectedTime) return;

    const scheduledDate = new Date(`${selectedDate}T${selectedTime}`);

    if (
      Number.isNaN(scheduledDate.getTime()) ||
      scheduledDate.getTime() <= Date.now()
    )
      return;

    onSchedule(scheduledDate);
    closeModal();
  };

  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const minTime = now.toTimeString().slice(0, 5);

  return (
    <Modal
      className='flex items-end justify-center p-0 lg:items-center lg:p-4'
      modalAnimation={isSheet ? sheetAnimation : undefined}
      modalClassName='fixed inset-x-0 bottom-0 max-h-[92dvh] w-full overflow-y-auto
                       overscroll-contain rounded-t-lg border-t border-light-border
                       bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl
                       dark:border-dark-border lg:static lg:max-h-[90vh] lg:max-w-md lg:rounded-lg lg:border'
      open={open}
      closeModal={closeModal}
      drag={isSheet ? 'y' : undefined}
      dragControls={dragControls}
      dragListener={false}
      onDragEnd={(_, info) => {
        if (isSheet && info.offset.y > 80) closeModal();
      }}
    >
      {/* Barre fine : elle sert de poignée pour faire glisser la feuille vers
          le bas et la refermer. */}
      {isSheet && (
        <button
          aria-label='Faire glisser pour fermer la programmation'
          className='flex w-full touch-none justify-center py-3'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}

      <div className='flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border'>
        <h2 className='text-xl font-bold'>Programmer la publication</h2>
        <Button
          className='accent-tab rounded-full p-2 hover:bg-main-accent/10'
          onClick={closeModal}
          aria-label='Fermer'
        >
          <MaterialIcon className='h-5 w-5' iconName='close' />
        </Button>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-bold text-light-secondary dark:text-dark-secondary'>
            Date
          </label>
          <input
            type='date'
            className='w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none
                       placeholder:text-light-secondary focus:border-main-accent dark:border-dark-border
                       dark:placeholder:text-dark-secondary'
            value={selectedDate}
            onChange={({ target: { value } }) => setSelectedDate(value)}
            min={minDate}
            aria-label='Date de programmation'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-bold text-light-secondary dark:text-dark-secondary'>
            Heure
          </label>
          <input
            type='time'
            className='w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none
                       placeholder:text-light-secondary focus:border-main-accent dark:border-dark-border
                       dark:placeholder:text-dark-secondary'
            value={selectedTime}
            onChange={({ target: { value } }) => setSelectedTime(value)}
            min={selectedDate === minDate ? minTime : undefined}
            aria-label='Heure de programmation'
          />
        </div>
        <div className='flex items-center justify-between gap-3 border-t border-light-border pt-4 dark:border-dark-border'>
          <Button
            className='rounded-full px-4 py-1.5 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
            onClick={closeModal}
          >
            Annuler
          </Button>
          <Button
            className='rounded-full bg-main-accent px-4 py-1.5 font-bold text-white
                       enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75'
            disabled={!selectedDate || !selectedTime}
            onClick={handleSchedule}
          >
            Programmer
          </Button>
        </div>
      </div>
    </Modal>
  );
}
