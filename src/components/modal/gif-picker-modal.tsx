import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { Modal } from '@components/modal/modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { useWindow } from '@lib/context/window-context';
import { useDragControls } from 'framer-motion';
import type { ImagesPreview } from '@lib/types/file';

type GifPickerModalProps = {
  open: boolean;
  closeModal: () => void;
  onSelect: (gif: ImagesPreview[number]) => void;
};

type GifOption = ImagesPreview[number];

type GifCategory = {
  id: string;
  label: string;
};

const categories: readonly GifCategory[] = [
  { id: 'trending', label: 'Tendances' },
  { id: 'reaction', label: 'Réactions' },
  { id: 'happy', label: 'Joie' },
  { id: 'love', label: 'Amour' },
  { id: 'laugh', label: 'Rire' },
  { id: 'dance', label: 'Danse' },
  { id: 'animals', label: 'Animaux' }
];

export function GifPickerModal({
  open,
  closeModal,
  onSelect
}: GifPickerModalProps): JSX.Element {
  const { width } = useWindow();
  const dragControls = useDragControls();

  /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */
  const isSheet = width < 1024;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('trending');
  const [gifs, setGifs] = useState<GifOption[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);

  const loadGifs = async (
    nextOffset: number,
    replace: boolean
  ): Promise<void> => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams({
        category,
        offset: String(nextOffset),
        limit: '24'
      });

      if (query.trim()) params.set('query', query.trim());

      const response = await fetch(`/api/gifs?${params.toString()}`);
      const payload = (await response.json()) as {
        gifs?: GifOption[];
        hasMore?: boolean;
      };

      if (!response.ok || !payload.gifs) throw new Error('GIF request failed');

      setGifs((current) =>
        replace ? payload.gifs ?? [] : [...current, ...(payload.gifs ?? [])]
      );
      setOffset(nextOffset);
      setHasMore(!!payload.hasMore);
    } catch {
      setError(true);
      if (replace) setGifs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    void loadGifs(0, true);
    // Reload only when the modal, category, or submitted search changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, category, query]);

  useEffect(() => {
    const grid = gridRef.current;
    const sentinel = loadMoreRef.current;

    if (!open || !hasMore || loading || !grid || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMoreRef.current) {
          loadingMoreRef.current = true;
          void loadGifs(offset + 24, false).finally(() => {
            loadingMoreRef.current = false;
          });
        }
      },
      { root: grid, rootMargin: '0px 0px 160px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
    // loadGifs uses the current category and query from this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hasMore, loading, offset, category, query]);

  const handleSelect = (gif: GifOption): void => {
    onSelect(gif);
    setQuery('');
    closeModal();
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    void loadGifs(0, true);
  };

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      className='flex items-end justify-center p-0 lg:items-center lg:p-4'
      drag={isSheet ? 'y' : undefined}
      dragControls={dragControls}
      dragListener={false}
      onDragEnd={(_, info) => {
        if (isSheet && info.offset.y > 80) closeModal();
      }}
      modalClassName={
        isSheet
          ? 'w-full overflow-hidden rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] dark:border-dark-border'
          : 'w-full max-w-2xl overflow-hidden rounded-lg bg-main-background shadow-xl'
      }
      modalAnimation={
        isSheet
          ? {
              initial: { opacity: 0, y: '100%' },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: '100%' }
            }
          : undefined
      }
    >
      {/* Barre fine : elle sert de poignée pour faire glisser la feuille vers
          le bas et la refermer. */}
      {isSheet && (
        <button
          aria-label='Faire glisser pour fermer le sélecteur de GIF'
          className='flex w-full touch-none justify-center py-3'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}

      <div className='flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border'>
        <h2 className={cn('font-bold', isSheet ? 'text-lg' : 'text-xl')}>
          Choisir un GIF
        </h2>
        <Button
          className='accent-tab rounded-full p-2 hover:bg-main-accent/10'
          onClick={closeModal}
          aria-label='Fermer le sélecteur de GIF'
        >
          <MaterialIcon className='h-5 w-5' iconName='close' />
        </Button>
      </div>
      <div className='p-4'>
        <form className='relative block' onSubmit={handleSearchSubmit}>
          <MaterialIcon
            className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-secondary dark:text-dark-secondary'
            iconName='search'
          />
          <input
            className='w-full rounded-full bg-light-secondary/10 py-2 pl-10 pr-4 outline-none ring-main-accent focus:ring-2 dark:bg-dark-secondary/10'
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
            placeholder='Rechercher parmi des milliers de GIFs...'
            aria-label='Rechercher un GIF'
            autoFocus
          />
        </form>
        <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
          {categories.map(({ id, label }) => (
            <button
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold transition ${
                category === id
                  ? 'bg-main-accent text-white'
                  : 'bg-light-secondary/10 text-light-secondary hover:bg-main-accent/10 dark:bg-dark-secondary/10 dark:text-dark-secondary'
              }`}
              type='button'
              onClick={() => setCategory(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className={cn(
            'mt-4 grid grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-4',
            isSheet ? 'max-h-[50vh]' : 'max-h-[55vh]'
          )}
          ref={gridRef}
        >
          {gifs.map((gif) => (
            <button
              className='group relative aspect-square overflow-hidden rounded-xl bg-light-secondary/10 ring-main-accent transition hover:ring-2 focus:outline-none focus:ring-2'
              type='button'
              onClick={() => handleSelect(gif)}
              key={gif.id}
            >
              <img
                className='h-full w-full object-cover transition group-hover:scale-105'
                src={gif.src}
                alt={gif.alt}
                loading='lazy'
              />
            </button>
          ))}
          {hasMore && (
            <div
              aria-hidden='true'
              className='col-span-full h-1'
              ref={loadMoreRef}
            />
          )}
        </div>
        {loading && (
          <p className='py-5 text-center text-light-secondary dark:text-dark-secondary'>
            Chargement des GIFs...
          </p>
        )}
        {!loading && !gifs.length && (
          <p className='py-8 text-center text-light-secondary dark:text-dark-secondary'>
            {error
              ? 'Les GIFs sont temporairement indisponibles.'
              : 'Aucun GIF trouvé.'}
          </p>
        )}
        <a
          className='mt-4 flex items-center justify-center gap-2 text-xs font-medium text-light-secondary transition hover:text-main-accent dark:text-dark-secondary'
          href='https://giphy.com/'
          target='_blank'
          rel='noreferrer'
        >
          <img
            className='h-5 w-5 rounded-sm object-contain'
            src='https://giphy.com/static/img/favicon.png'
            alt='GIPHY'
          />
          <span>GIFs animés par GIPHY</span>
        </a>
      </div>
    </Modal>
  );
}
