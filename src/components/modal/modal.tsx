import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import cn from 'clsx';
import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  DragControls,
  DragElastic,
  PanInfo,
  Variants
} from 'framer-motion';

type ModalProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
  modalAnimation?: Variants;
  modalClassName?: string;
  closePanelOnClick?: boolean;
  drag?: boolean | 'x' | 'y';
  dragControls?: DragControls;
  dragListener?: boolean;
  /**
   * Distance (en pixels) pendant laquelle la fenêtre peut être tirée vers le
   * haut. Par défaut (0), une fenêtre tirée verticalement ne peut pas monter :
   * elle ne descend que pour se fermer.
   */
  dragUp?: number;
  dragConstraints?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  dragElastic?: DragElastic;
  dragMomentum?: boolean;
  dragSnapToOrigin?: boolean;
  onDragEnd?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  onDrag?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  /** Ferme la fenêtre quand on clique sur le fond, et non sur le contenu. */
  closeOnBackdropClick?: boolean;
  closeModal: () => void;
};

const variants: Variants[] = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', duration: 0.5, bounce: 0.4 }
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } }
  }
];

export const [backdrop, modal] = variants;

type ScrollSnapshot = {
  htmlOverflow: string;
  htmlPaddingRight: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
};

/* La bibliothèque qui verrouille la page pose son verrou sur l'élément
   <html> et mémorise la valeur qu'elle trouve. Quand deux fenêtres
   s'enchaînent (le menu « Plus » puis la fenêtre Apparence), la seconde
   mémorise le verrou de la première et le restitue à sa fermeture : la page
   reste alors bloquée, sans aucun défilement possible.

   On garde donc l'état réel du défilement — capturé AVANT l'ouverture, sinon
   le verrou est déjà posé — et on le restaure à la fermeture de la dernière
   fenêtre. */
let openModalCount = 0;
let pageScrollSnapshot: ScrollSnapshot | null = null;

/* Délai après la fermeture avant de restaurer le défilement : laisse le
   temps à la bibliothèque de rendre la main et à l'animation de sortie de se
   terminer. */
const SCROLL_RELEASE_DELAY = 300;

function captureScrollState(): ScrollSnapshot {
  if (typeof document === 'undefined')
    return {
      htmlOverflow: '',
      htmlPaddingRight: '',
      bodyOverflow: '',
      bodyPaddingRight: ''
    };

  return {
    htmlOverflow: document.documentElement.style.overflow,
    htmlPaddingRight: document.documentElement.style.paddingRight,
    bodyOverflow: document.body.style.overflow,
    bodyPaddingRight: document.body.style.paddingRight
  };
}

/* Une fenêtre native du navigateur (le sélecteur d'emoji) est ouverte
   par-dessus la fenêtre courante. */
function hasOpenNativePopover(): boolean {
  try {
    return Boolean(document.querySelector('[popover]:popover-open'));
  } catch {
    return false;
  }
}

function restoreScrollState(snapshot: ScrollSnapshot | null): void {
  if (typeof document === 'undefined') return;

  const state = snapshot ?? {
    htmlOverflow: '',
    htmlPaddingRight: '',
    bodyOverflow: '',
    bodyPaddingRight: ''
  };

  document.documentElement.style.overflow = state.htmlOverflow;
  document.documentElement.style.paddingRight = state.htmlPaddingRight;
  document.body.style.overflow = state.bodyOverflow;
  document.body.style.paddingRight = state.bodyPaddingRight;
}

export function Modal({
  open,
  children,
  className,
  modalAnimation,
  modalClassName,
  closePanelOnClick,
  drag,
  dragControls,
  dragListener,
  dragUp,
  dragConstraints,
  dragElastic,
  dragMomentum,
  dragSnapToOrigin,
  onDragEnd,
  onDrag,
  closeOnBackdropClick,
  closeModal
}: ModalProps): JSX.Element {
  const panelRef = useRef<HTMLDivElement>(null);

  /* L'état du défilement est capturé pendant le rendu, donc AVANT que la
     bibliothèque ne pose son verrou (les effets ne tournent qu'ensuite). */
  if (open && !pageScrollSnapshot && typeof document !== 'undefined')
    pageScrollSnapshot = captureScrollState();

  useEffect(() => {
    if (!open) {
      /* La fenêtre vient d'être fermée : une fois l'animation de sortie
         terminée, on rend le défilement à la page — sauf si une autre
         fenêtre est encore ouverte. */
      const timeout = setTimeout(() => {
        if (openModalCount > 0) return;

        restoreScrollState(pageScrollSnapshot);
        pageScrollSnapshot = null;
      }, SCROLL_RELEASE_DELAY);

      return () => clearTimeout(timeout);
    }

    openModalCount += 1;

    return () => {
      openModalCount = Math.max(0, openModalCount - 1);

      // Sécurité : si la fenêtre est démontée alors qu'elle était ouverte, on
      // restaure tout de suite le défilement de la page.
      if (openModalCount === 0) {
        restoreScrollState(pageScrollSnapshot);
        pageScrollSnapshot = null;
      }
    };
  }, [open]);

  /* Demande de fermeture du navigateur (clic dehors, touche Échap). Si une
     fenêtre native est ouverte par-dessus — le sélecteur d'emoji —, on
     l'ignore : le clic qui referme cette fenêtre viserait la page en
     dessous, et fermerait cette fenêtre-ci par la même occasion. */
  const handleCloseRequest = (): void => {
    if (hasOpenNativePopover()) return;

    closeModal();
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          className='relative z-50'
          open={open}
          onClose={handleCloseRequest}
          initialFocus={panelRef}
          /* `static` empêche HeadlessUI de fermer au clic sur le fond ou à
             la touche Échap. On ne le garde que pour les fenêtres qui doivent
             rester ouvertes (sélecteur d'emoji). */
          static={!closeOnBackdropClick}
        >
          <motion.div
            className='hover-animation fixed inset-0 bg-black/40 dark:bg-[#5B7083]/40'
            aria-hidden='true'
            {...backdrop}
            /* Le clic sur le fond ferme la fenêtre lorsqu'elle le demande
               (sélecteur d'emoji) ; sinon il reste sans effet, comme avant. */
            onClick={(event) => {
              if (!closeOnBackdropClick) {
                event.stopPropagation();
                return;
              }

              event.stopPropagation();
              closeModal();
            }}
          />
          <div
            className={cn(
              'fixed inset-0 overflow-y-auto',
              className ?? 'flex items-center justify-center p-4'
            )}
            /* Les événements React remontent l'arbre des composants, même à
               travers le portail : sans cela, le clic qui ferme la fenêtre
               atteindrait aussi la publication située derrière et l'ouvrirait.
               On laisse quand même remonter le clic pour les fenêtres qui se
               ferment au clic dehors. */
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Dialog.Panel
              ref={panelRef}
              className={modalClassName}
              tabIndex={-1}
              as={motion.div}
              drag={drag}
              dragControls={dragControls}
              dragListener={dragListener}
              dragConstraints={
                /* Vers le haut, la fenêtre est libre de monter sur la distance
                   indiquée ; vers le bas, elle n'a pas de limite (c'est elle
                   qui permet de fermer la fenêtre en la tirant vers le bas). */
                drag === 'y' ? { top: -(dragUp ?? 0) } : dragConstraints
              }
              dragElastic={
                drag === 'y'
                  ? { top: dragUp ? 0.2 : 0, bottom: 0.5 }
                  : dragElastic
              }
              dragMomentum={dragMomentum}
              dragSnapToOrigin={dragSnapToOrigin ?? Boolean(drag)}
              onDragEnd={onDragEnd}
              onDrag={onDrag}
              {...(modalAnimation ?? modal)}
              onClick={closePanelOnClick ? closeModal : undefined}
              /* Échap ne ferme que la fenêtre du dessus : sans cela, il
                 fermerait aussi la fenêtre qui l'a ouverte (la feuille de
                 publication, par exemple). */
              onKeyDown={(event) => {
                if (event.key === 'Escape') event.stopPropagation();
              }}
            >
              {children}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
