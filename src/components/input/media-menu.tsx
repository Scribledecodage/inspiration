import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { useDragControls } from 'framer-motion';
import { Modal } from '@components/modal/modal';
import { CameraModal } from '@components/modal/camera-modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import type { ChangeEvent } from 'react';
import type { PanInfo } from 'framer-motion';
import type { FileSystemFileHandleLike } from '@lib/types/file-system';

type MediaMenuProps = {
  open: boolean;
  closeModal: () => void;
  /** Les fichiers choisis (photos, vidéos) sont renvoyés ici. */
  onSelect: (files: File[]) => void;
  /** Les vidéos sont-elles acceptées (comme dans le composeur) ? */
  allowVideos?: boolean;
};

type GalleryItem = {
  id: string;
  name: string;
  file: File;
  src: string;
  isVideo: boolean;
};

/* Nombre maximal de fichiers listés dans la galerie : au-delà, la liste
   devient inutilisable et l'appareil peine à tout lire. */
const MAX_GALLERY_ITEMS = 300;

/**
 * Menu des médias : il remplace le sélecteur du système, qui s'ouvre
 * directement au clic sur l'icône.
 *
 * Trois entrées :
 *  - la caméra, pour prendre une photo ;
 *  - le sélecteur du système, qui marche partout (et permet déjà de choisir
 *    plusieurs fichiers sur téléphone) ;
 *  - la galerie du site, uniquement là où le navigateur donne accès aux
 *    fichiers (Chrome, Edge) : l'utilisateur choisit un dossier, ses images
 *    et ses vidéos s'affichent en vignettes et il en sélectionne plusieurs.
 */
export function MediaMenu({
  open,
  closeModal,
  onSelect,
  allowVideos = false
}: MediaMenuProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  const [view, setView] = useState<'menu' | 'gallery'>('menu');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [browsing, setBrowsing] = useState(false);

  /* Le dossier n'est proposé que là où l'API existe (Chrome, Edge). */
  const canBrowseFolder =
    typeof window !== 'undefined' &&
    typeof window.showDirectoryPicker === 'function';

  /* Les vignettes sont des liens temporaires : ils sont libérés à la
     fermeture du menu. */
  useEffect(
    () => () => {
      gallery.forEach(({ src }) => {
        if (src) URL.revokeObjectURL(src);
      });
    },
    [gallery]
  );

  const reset = (): void => {
    setView('menu');
    setFolderName('');
    setGallery([]);
    setSelectedIds([]);
    setBrowsing(false);
  };

  const close = (): void => {
    reset();
    closeModal();
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';

    if (!files.length) return;

    onSelect(files);
    close();
  };

  /* Ouverture du dossier choisi par l'utilisateur : ses images sont listées
     et affichées en vignettes. */
  const browseFolder = async (): Promise<void> => {
    if (!window.showDirectoryPicker) return;

    setBrowsing(true);

    try {
      const directory = await window.showDirectoryPicker({ mode: 'read' });
      const items: GalleryItem[] = [];

      for await (const handle of directory.values()) {
        if (items.length >= MAX_GALLERY_ITEMS) break;
        if (handle.kind !== 'file') continue;

        const file = await (handle as FileSystemFileHandleLike).getFile();
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        /* Seules les images et les vidéos sont exploitables par le site ;
           les autres fichiers du dossier sont ignorés. */
        if (!isImage && !isVideo) continue;

        items.push({
          id: `${handle.name}-${items.length}`,
          name: file.name,
          file,
          src: isImage ? URL.createObjectURL(file) : '',
          isVideo
        });
      }

      setFolderName(directory.name);
      setGallery(items);
      setSelectedIds([]);
      setView('gallery');
    } catch {
      /* L'utilisateur a fermé la fenêtre de choix de dossier : on reste
         sur le menu. */
    } finally {
      setBrowsing(false);
    }
  };

  const toggleItem = (id: string): void => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const selectedFiles = gallery
    .filter(({ id }) => selectedIds.includes(id))
    .map(({ file }) => file);

  return (
    <>
      <Modal
        className='flex items-end justify-center p-0 lg:items-center lg:p-4'
        modalClassName={`flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-lg border-t border-light-border bg-main-background shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border lg:static lg:max-h-[80vh] lg:max-w-md lg:rounded-lg lg:border ${
          view === 'gallery'
            ? 'h-[100dvh] max-h-[100dvh] rounded-none lg:h-auto lg:max-h-[80vh]'
            : ''
        }`}
        drag='y'
        dragControls={dragControls}
        dragListener={false}
        dragSnapToOrigin
        dragUp={160}
        onDragEnd={(
          _: MouseEvent | TouchEvent | PointerEvent,
          info: PanInfo
        ): void => {
          if (info.offset.y > 100 || info.velocity.y > 700) close();
        }}
        open={open}
        closeModal={close}
        closeOnBackdropClick
      >
        {view === 'menu' ? (
          <>
            <button
              aria-label='Faire glisser la fenêtre vers le bas ou vers le haut'
              className='flex w-full touch-none justify-center py-3 lg:hidden'
              onPointerDown={(event) => dragControls.start(event.nativeEvent)}
              type='button'
            >
              <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
            </button>

            <div className='flex flex-col gap-2 p-4'>
              <div className='flex items-center justify-between gap-3'>
                <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
                  Médias
                </h2>
                <button
                  aria-label='Fermer'
                  className='-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10'
                  onClick={close}
                  type='button'
                >
                  <MaterialIcon className='h-5 w-5' iconName='close' />
                </button>
              </div>

              <button
                className='flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                onClick={(): void => setCameraOpen(true)}
                type='button'
              >
                <span className='bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent'>
                  <MaterialIcon className='h-6 w-6' iconName='photo_camera' />
                </span>
                <span className='min-w-0'>
                  <span className='block font-bold text-light-primary dark:text-dark-primary'>
                    Prendre une photo
                  </span>
                  <span className='block text-sm text-light-secondary dark:text-dark-secondary'>
                    Utilisez la caméra de l’appareil
                  </span>
                </span>
              </button>

              <button
                className='flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                onClick={(): void => fileInputRef.current?.click()}
                type='button'
              >
                <span className='bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent'>
                  <MaterialIcon className='h-6 w-6' iconName='upload' />
                </span>
                <span className='min-w-0'>
                  <span className='block font-bold text-light-primary dark:text-dark-primary'>
                    Choisir un fichier
                  </span>
                  <span className='block text-sm text-light-secondary dark:text-dark-secondary'>
                    {allowVideos
                      ? 'Images, vidéos ou autres fichiers de l’appareil'
                      : 'Images ou autres fichiers de l’appareil'}
                  </span>
                </span>
              </button>

              {canBrowseFolder && (
                <button
                  className='flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                  disabled={browsing}
                  onClick={(): void => void browseFolder()}
                  type='button'
                >
                  <span className='bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent'>
                    <MaterialIcon className='h-6 w-6' iconName='description' />
                  </span>
                  <span className='min-w-0'>
                    <span className='block font-bold text-light-primary dark:text-dark-primary'>
                      Parcourir mes fichiers
                    </span>
                    <span className='block text-sm text-light-secondary dark:text-dark-secondary'>
                      {browsing
                        ? 'Ouverture du dossier…'
                        : 'Choisissez un dossier, ses images et vidéos s’affichent ici'}
                    </span>
                  </span>
                </button>
              )}

              <input
                accept={allowVideos ? 'image/*,video/*' : 'image/*'}
                className='hidden'
                multiple
                onChange={handleFiles}
                ref={fileInputRef}
                type='file'
              />
            </div>
          </>
        ) : (
          <>
            <div className='flex items-center gap-3 border-b border-light-border/60 px-4 py-3 dark:border-dark-border/60'>
              <button
                aria-label='Revenir au menu des médias'
                className='-ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
                onClick={(): void => setView('menu')}
                type='button'
              >
                <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
              </button>

              <div className='min-w-0 flex-1'>
                <h2 className='truncate text-base font-bold text-light-primary dark:text-dark-primary'>
                  {folderName || 'Mes fichiers'}
                </h2>
                <p className='truncate text-xs text-light-secondary dark:text-dark-secondary'>
                  {selectedIds.length
                    ? `${selectedIds.length} fichier${
                        selectedIds.length > 1 ? 's' : ''
                      } sélectionné${selectedIds.length > 1 ? 's' : ''}`
                    : `${gallery.length} fichier${
                        gallery.length > 1 ? 's' : ''
                      }`}
                </p>
              </div>

              <button
                aria-label='Fermer'
                className='-mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10'
                onClick={close}
                type='button'
              >
                <MaterialIcon className='h-5 w-5' iconName='close' />
              </button>
            </div>

            {gallery.length === 0 ? (
              <p className='px-6 py-12 text-center text-sm text-light-secondary dark:text-dark-secondary'>
                Aucun fichier image ou vidéo dans ce dossier.
              </p>
            ) : (
              <div className='grid min-h-0 flex-1 grid-cols-3 gap-1 overflow-y-auto overscroll-contain p-1 xs:grid-cols-4'>
                {gallery.map((item) => {
                  const selected = selectedIds.includes(item.id);

                  return (
                    <button
                      aria-pressed={selected}
                      className={cn(
                        'group relative aspect-square overflow-hidden rounded-md border-2 transition',
                        selected
                          ? 'border-main-accent'
                          : 'border-transparent hover:border-light-line-reply dark:hover:border-dark-border'
                      )}
                      key={item.id}
                      onClick={(): void => toggleItem(item.id)}
                      title={item.name}
                      type='button'
                    >
                      {item.isVideo ? (
                        /* Une vidéo n'a pas de vignette : on montre l'icône
                           de lecture, sur un fond sombre. */
                        <span className='flex h-full w-full items-center justify-center bg-black/70 text-white'>
                          <MaterialIcon
                            className='h-7 w-7'
                            iconName='play_arrow'
                            solid
                          />
                        </span>
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          alt={item.name}
                          className='h-full w-full object-cover'
                          loading='lazy'
                          src={item.src}
                        />
                      )}

                      {selected && (
                        <span className='absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-main-accent text-white'>
                          <MaterialIcon
                            className='h-3 w-3'
                            iconName='check'
                            solid
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className='border-t border-light-border/60 p-3 dark:border-dark-border/60'>
              <Button
                className='w-full rounded-full bg-main-accent py-2 font-bold text-white enabled:hover:brightness-90'
                disabled={!selectedIds.length}
                onClick={(): void => {
                  onSelect(selectedFiles);
                  close();
                }}
              >
                {selectedIds.length
                  ? `Ajouter ${selectedIds.length} fichier${
                      selectedIds.length > 1 ? 's' : ''
                    }`
                  : 'Sélectionnez des fichiers'}
              </Button>
            </div>
          </>
        )}
      </Modal>

      <CameraModal
        open={cameraOpen}
        onClose={(): void => setCameraOpen(false)}
        onCapture={(file): void => {
          setCameraOpen(false);
          onSelect([file]);
          close();
        }}
      />
    </>
  );
}
