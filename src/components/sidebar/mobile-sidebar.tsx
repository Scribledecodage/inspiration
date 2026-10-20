import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { useState } from 'react';
import { DisplayModal } from '@components/modal/display-modal';
import { Button } from '@components/ui/button';
import { Modal } from '@components/modal/modal';
import { MobileSidebarModal } from '@components/modal/mobile-sidebar-modal';
import { StatusActivity } from '@components/status/status-activity';
import { MaterialIcon } from '@components/ui/material-icon';
import type { Variants, PanInfo } from 'framer-motion';
import { motion, useDragControls } from 'framer-motion';
import type { User } from '@lib/types/user';

const variant: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } }
};

type MobileSidebarProps = {
  hideTrigger?: boolean;
  bottomTrigger?: boolean;
};

export function MobileSidebar({
  hideTrigger,
  bottomTrigger
}: MobileSidebarProps): JSX.Element {
  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();
  const {
    open: displayOpen,
    openModal: openDisplayModal,
    closeModal: closeDisplayModal
  } = useModal();
  const {
    open: statusOpen,
    openModal: openStatusModal,
    closeModal: closeStatusModal
  } = useModal();
  const dragControls = useDragControls();
  const displayDragControls = useDragControls();
  const statusDragControls = useDragControls();
  const [expanded, setExpanded] = useState(false);
  const [displayExpanded, setDisplayExpanded] = useState(false);
  const [statusExpanded, setStatusExpanded] = useState(false);

  /* La barre fine en haut du menu permet de le faire glisser : vers le bas
     pour le refermer, vers le haut pour l'étirer sur toute la hauteur de
     l'écran. */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y < -60) {
      setExpanded(true);
      return;
    }

    if (info.offset.y > 200 || info.velocity.y > 900) {
      closeModal();
      return;
    }

    if (expanded && info.offset.y > 60) {
      setExpanded(false);
      return;
    }

    if (info.offset.y > 100) closeModal();
  };

  /* Même geste pour la fenêtre des statuts. */
  const handleStatusDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y < -60) {
      setStatusExpanded(true);
      return;
    }

    if (info.offset.y > 200 || info.velocity.y > 900) {
      closeStatusModal();
      return;
    }

    if (statusExpanded && info.offset.y > 60) {
      setStatusExpanded(false);
      return;
    }

    if (info.offset.y > 100) closeStatusModal();
  };

  const openDisplay = (): void => {
    closeModal();
    setDisplayExpanded(false);
    openDisplayModal();
  };

  /* Les statuts des personnes que l'on suit : accessibles depuis le menu
     « Plus », là où l'activité des abonnements n'a pas de place. */
  const openStatuses = (): void => {
    closeModal();
    setStatusExpanded(false);
    openStatusModal();
  };

  /* Comme pour la feuille de publication, la feuille Apparence se referme
     quand on la tire vers le bas et s'étend quand on la tire vers le haut. */
  const handleDisplayDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y < -60) {
      setDisplayExpanded(true);
      return;
    }

    if (info.offset.y > 200 || info.velocity.y > 900) {
      setDisplayExpanded(false);
      closeDisplayModal();
      return;
    }

    /* Étirée, la feuille se replie d'abord sur elle-même avant de se fermer. */
    if (displayExpanded && info.offset.y > 60) {
      setDisplayExpanded(false);
      return;
    }

    if (info.offset.y > 70) {
      setDisplayExpanded(false);
      closeDisplayModal();
    }
  };

  if (hideTrigger) return <></>;

  return (
    <>
      <Modal
        className='flex items-end justify-center p-0 xs:items-center xs:p-4'
        modalAnimation={variant}
        modalClassName={`fixed inset-x-0 bottom-0 flex w-full max-w-lg flex-col overflow-hidden border-t border-light-border bg-main-background shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:max-h-[90vh] xs:rounded-2xl xs:border ${
          expanded
            ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]'
            : 'max-h-[88dvh] rounded-t-3xl'
        }`}
        drag='y'
        dragControls={dragControls}
        dragListener={false}
        dragElastic={0.5}
        dragMomentum={true}
        dragSnapToOrigin
        dragUp={160}
        onDragEnd={handleDragEnd}
        open={open}
        closeModal={closeModal}
      >
        <MobileSidebarModal
          {...(user as User)}
          closeModal={closeModal}
          openDisplay={openDisplay}
          openStatuses={openStatuses}
          dragControls={dragControls}
        />
      </Modal>
      <Modal
        className='flex items-end justify-center p-0 xs:items-center xs:p-4'
        modalClassName={`flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl
                       border-t border-light-border bg-main-background shadow-2xl
                       transition-[height,max-height,border-radius] duration-300 ease-out
                       dark:border-dark-border xs:static xs:max-h-[88vh] xs:rounded-xl xs:border ${
                         statusExpanded
                           ? 'h-[100dvh] max-h-[100dvh] rounded-none'
                           : ''
                       }`}
        drag='y'
        dragControls={statusDragControls}
        dragListener={false}
        dragMomentum={true}
        dragSnapToOrigin
        dragUp={160}
        onDragEnd={handleStatusDragEnd}
        open={statusOpen}
        closeModal={closeStatusModal}
      >
        <button
          aria-label='Faire glisser pour fermer la fenêtre Statuts'
          className='flex w-full touch-none justify-center py-3 xs:hidden'
          onPointerDown={(event) => statusDragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
        <div
          className='flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain
                        px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] xs:p-6'
        >
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-[1.25rem] leading-tight text-light-primary dark:text-dark-primary'>
              Statuts de vos abonnements
            </h2>
            <Button
              aria-label='Fermer'
              className='-mr-2 shrink-0 p-2'
              onClick={closeStatusModal}
            >
              <MaterialIcon className='h-5 w-5' iconName='close' />
            </Button>
          </div>
          <StatusActivity />
        </div>
      </Modal>
      <Modal
        className='flex items-end justify-center !overflow-hidden p-0 xs:items-start xs:justify-center xs:p-4'
        modalAnimation={variant}
        modalClassName={`fixed inset-x-0 bottom-0 max-h-[calc(100dvh_-_2rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-lg border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:my-auto xs:rounded-lg xs:border xs:p-8 ${
          displayExpanded
            ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]'
            : ''
        }`}
        drag='y'
        dragControls={displayDragControls}
        dragListener={false}
        dragElastic={0.5}
        dragMomentum={true}
        dragSnapToOrigin
        dragUp={160}
        onDragEnd={handleDisplayDragEnd}
        open={displayOpen}
        closeModal={closeDisplayModal}
      >
        <button
          aria-label='Faire glisser pour fermer la fenêtre Apparence'
          className='-mt-5 flex w-full touch-none justify-center py-3 xs:hidden'
          onPointerDown={(event) =>
            displayDragControls.start(event.nativeEvent)
          }
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
        <DisplayModal closeModal={closeDisplayModal} />
      </Modal>
      {!hideTrigger && (
        <Button
          className={
            bottomTrigger
              ? 'accent-tab flex h-14 w-full min-w-0 flex-col items-center justify-center gap-0.5 whitespace-nowrap rounded-full px-0.5 py-1.5 text-[11px] leading-tight text-light-secondary transition-colors active:bg-light-primary/10 dark:text-dark-secondary dark:active:bg-dark-primary/20 xs:hidden'
              : 'accent-tab p-0 xs:hidden'
          }
          aria-label='Ouvrir le menu'
          onClick={() => {
            setExpanded(false);
            openModal();
          }}
        >
          <motion.span
            className='relative inline-flex'
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            whileTap={{ scale: 0.93 }}
          >
            <MaterialIcon
              className={bottomTrigger ? 'h-6 w-6' : 'h-6 w-6'}
              iconName={bottomTrigger ? 'pending' : 'menu'}
            />
          </motion.span>
          {bottomTrigger && <span>Plus</span>}
        </Button>
      )}
    </>
  );
}
