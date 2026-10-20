import { useEffect, useRef, useState } from 'react';
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

type SuggestionItem = {
  label: string;
  city?: string;
  country?: string;
};

type LocationModalProps = {
  open: boolean;
  closeModal: () => void;
  onSelect: (location: string) => void;
  current?: string | null;
  onClear?: () => void;
};

/* Fenêtre de choix d'un lieu : recherche de vraies villes (Photon) et bouton
   « Ma position » (géolocalisation du navigateur). Sur mobile elle s'ouvre
   comme un menu collé au bas de l'écran. */
export function LocationModal({
  open,
  closeModal,
  onSelect,
  current,
  onClear
}: LocationModalProps): JSX.Element {
  const { width } = useWindow();
  const dragControls = useDragControls();

  /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */
  const isSheet = width < 1024;

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Recherche différée des villes.
  useEffect(() => {
    if (!open) return;

    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      void (async (): Promise<void> => {
        setIsSearching(true);
        try {
          const res = await fetch(
            `/api/location/suggest?q=${encodeURIComponent(trimmed)}`
          );
          if (res.ok) {
            const data = (await res.json()) as {
              suggestions?: SuggestionItem[];
            };
            setSuggestions(data.suggestions ?? []);
          }
        } catch {
          // Pas de réseau : la saisie libre reste possible.
        } finally {
          setIsSearching(false);
        }
      })();
    }, 280);

    return () => clearTimeout(timer);
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setSuggestions([]);
      setMessage(null);
    }
  }, [open]);

  const choose = (label: string): void => {
    const value = label.trim();
    if (!value) return;
    onSelect(value);
    closeModal();
  };

  const useMyPosition = (): void => {
    if (!('geolocation' in navigator)) {
      setMessage('La géolocalisation n’est pas disponible.');
      return;
    }

    setLocating(true);
    setMessage(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `/api/location/suggest?lat=${coords.latitude}&lon=${coords.longitude}`
          );
          const data = (await res.json()) as { location?: string | null };
          if (data.location) choose(data.location);
          else setMessage('Impossible de trouver ta position.');
        } catch {
          setMessage('Impossible de trouver ta position.');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setMessage('Accès à la position refusé.');
      },
      { timeout: 10000 }
    );
  };

  const showFreeText = query.trim().length >= 2;

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      className='flex items-end justify-center p-0 lg:items-center lg:p-4'
      modalAnimation={isSheet ? sheetAnimation : undefined}
      modalClassName={
        isSheet
          ? 'w-full overflow-hidden rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] dark:border-dark-border'
          : 'w-full max-w-md overflow-hidden rounded-lg bg-main-background shadow-xl'
      }
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
          aria-label='Faire glisser pour fermer la fenêtre des lieux'
          className='flex w-full touch-none justify-center py-3'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}

      <div ref={containerRef}>
        <div className='flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border'>
          <h2 className={cn('font-bold', isSheet ? 'text-lg' : 'text-xl')}>
            Ajouter un lieu
          </h2>
          <Button
            className='accent-tab rounded-full p-2 hover:bg-main-accent/10'
            onClick={closeModal}
            aria-label='Fermer'
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </Button>
        </div>

        <div className='flex flex-col gap-3 p-4'>
          <div className='relative flex items-center'>
            <span className='pointer-events-none absolute left-3 flex items-center text-light-secondary/70 dark:text-dark-secondary/70'>
              <MaterialIcon iconName='location_on' className='h-4 w-4' />
            </span>
            <input
              type='text'
              autoComplete='off'
              autoFocus
              placeholder='Chercher une ville…'
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && query.trim()) choose(query);
              }}
              className='w-full rounded-xl border border-light-line-reply bg-main-background py-2.5 pr-16 pl-9 text-sm outline-none transition focus:border-main-accent dark:border-dark-border'
            />
            {isSearching && (
              <span className='absolute right-3 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-main-accent border-t-transparent' />
            )}
          </div>

          <button
            type='button'
            onClick={useMyPosition}
            disabled={locating}
            className='inline-flex items-center gap-2 self-start text-sm font-bold text-main-accent transition hover:underline disabled:opacity-50'
          >
            <MaterialIcon iconName='location_on' className='h-4 w-4' />
            {locating ? 'Recherche…' : 'Utiliser ma position'}
          </button>

          {message && <p className='text-xs text-accent-red'>{message}</p>}

          <ul className='max-h-[40vh] overflow-y-auto'>
            {suggestions.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <button
                  type='button'
                  onClick={() => choose(item.label)}
                  className='flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left text-sm transition hover:bg-main-accent/10'
                >
                  <MaterialIcon
                    iconName='location_on'
                    className='h-4 w-4 shrink-0 text-light-secondary'
                  />
                  <span className='min-w-0 flex-1 truncate font-medium'>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
            {showFreeText && suggestions.length === 0 && (
              <li>
                <button
                  type='button'
                  onClick={() => choose(query)}
                  className='flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left text-sm transition hover:bg-main-accent/10'
                >
                  <MaterialIcon
                    iconName='location_on'
                    className='h-4 w-4 shrink-0 text-light-secondary'
                  />
                  <span className='min-w-0 flex-1 truncate font-medium'>
                    Utiliser «&nbsp;{query.trim()}&nbsp;»
                  </span>
                </button>
              </li>
            )}
          </ul>

          {current && onClear && (
            <button
              type='button'
              onClick={() => {
                onClear();
                closeModal();
              }}
              className='mt-1 inline-flex items-center gap-2 self-start text-sm font-bold text-accent-red transition hover:underline'
            >
              <MaterialIcon iconName='close' className='h-4 w-4' />
              Retirer le lieu
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
