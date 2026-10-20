import { useRef, useState } from 'react';
import cn from 'clsx';
import { useDragControls } from 'framer-motion';
import { getAvatarSrc, getBannerSrc } from '@lib/media';
import {
  getAvatarShapeClass,
  isMaskedAvatarShape
} from '@lib/avatar-shape';
import { MainHeader } from '@components/home/main-header';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { NextImage } from '@components/ui/next-image';
import { AvatarDecoration } from '@components/user/avatar-frame';
import { ToolTip } from '@components/ui/tooltip';
import { Modal } from './modal';
import { ImageModal } from './image-modal';
import type { ReactNode, ChangeEvent } from 'react';
import type { User } from '@lib/types/user';
import type { ImageData } from '@lib/types/file';
import type { DragControls, Variants } from 'framer-motion';

const profileMenuAnimation: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } }
};

import type { AvatarShape, AvatarFrame } from '@lib/types/theme';

type EditProfileModalProps = Pick<
  User,
  'name' | 'photoURL' | 'coverPhotoURL'
> & {
  gender?: User['gender'];
  avatarShape?: AvatarShape;
  avatarFrame?: AvatarFrame;
  dragControls: DragControls;
  loading: boolean;
  children: ReactNode;
  inputNameError: string;
  editImage: (
    type: 'cover' | 'profile'
  ) => ({ target: { files } }: ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  updateData: () => Promise<void>;
  removeCoverImage: () => void;
  removeProfileImage: () => void;
  pageMode?: boolean;
};

export function EditProfileModal({
  name,
  gender,
  avatarShape = 'circle',
  avatarFrame = 'none',
  pageMode,
  dragControls,
  loading,
  photoURL,
  children,
  coverPhotoURL,
  inputNameError,
  editImage,
  closeModal,
  updateData,
  removeCoverImage,
  removeProfileImage
}: EditProfileModalProps): JSX.Element {
  const shapeClass = getAvatarShapeClass(avatarShape);
  const coverInputFileRef = useRef<HTMLInputElement>(null);
  const profileInputFileRef = useRef<HTMLInputElement>(null);
  const profileMenuDragControls = useDragControls();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePreviewOpen, setProfilePreviewOpen] = useState(false);
  const [bannerPreviewOpen, setBannerPreviewOpen] = useState(false);
  const avatarSrc = getAvatarSrc(photoURL, gender);
  const hasCustomAvatar = Boolean(
    photoURL && avatarSrc !== getAvatarSrc(null, gender)
  );

  const handleClick = (type: 'cover' | 'profile') => (): void => {
    if (type === 'cover') coverInputFileRef.current?.click();
    else profileInputFileRef.current?.click();
  };

  return (
    <>
      {!pageMode && (
        <button
          aria-label='Faire glisser pour agrandir ou fermer la modification du profil'
          className='absolute left-0 top-0 z-20 flex w-full touch-none justify-center py-3 xs:hidden'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}
      <MainHeader
        useActionButton
        disableSticky={!pageMode}
        iconName={pageMode ? 'arrow_back' : 'close'}
        tip={pageMode ? 'Retour aux paramètres' : 'Fermer'}
        className={
          pageMode
            ? 'flex items-center gap-6'
            : 'absolute flex w-full items-center gap-6 rounded-tl-md'
        }
        title={pageMode ? 'Personnalisation' : 'Modifier'}
        action={closeModal}
      >
        <div className='ml-auto flex items-center gap-3'>
          <Button
            className='bg-main-accent px-4 py-2 font-bold text-white focus-visible:bg-main-accent/90
                       enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/80 disabled:brightness-75'
            onClick={updateData}
            disabled={!!inputNameError}
            loading={loading}
          >
            Enregistrer
          </Button>
        </div>
      </MainHeader>
      <section
        className={cn(
          'transition-opacity',
          !pageMode && 'min-h-0 flex-1 overflow-y-auto',
          loading && 'pointer-events-none opacity-50'
        )}
      >
        <Modal
          open={profilePreviewOpen}
          closeModal={() => setProfilePreviewOpen(false)}
        >
          <ImageModal
            imageData={{ src: avatarSrc, alt: name } as ImageData}
            previewCount={1}
          />
        </Modal>
        <Modal
          open={bannerPreviewOpen}
          closeModal={() => setBannerPreviewOpen(false)}
        >
          <ImageModal
            imageData={{ src: getBannerSrc(coverPhotoURL), alt: name }}
            previewCount={1}
          />
        </Modal>
        <Modal
          open={profileMenuOpen}
          closeModal={() => setProfileMenuOpen(false)}
          className='flex items-end justify-center p-0 xs:items-center xs:p-4'
          modalAnimation={profileMenuAnimation}
          modalClassName='fixed inset-x-0 bottom-0 max-h-[75dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl dark:border-dark-border xs:static xs:max-h-[90vh] xs:max-w-sm xs:rounded-lg xs:border xs:p-6'
          drag='y'
          dragControls={profileMenuDragControls}
          dragListener={false}
          dragElastic={0.5}
          dragMomentum={true}
          dragSnapToOrigin={false}
          dragConstraints={{ top: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 200 || info.velocity.y > 1000)
              setProfileMenuOpen(false);
          }}
        >
          <button
            aria-label='Faire glisser pour fermer le menu des photos'
            className='mb-2 flex w-full touch-none justify-center py-2 xs:hidden'
            onPointerDown={(event) =>
              profileMenuDragControls.start(event.nativeEvent)
            }
            type='button'
          >
            <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
          </button>
          <div className='mb-4 flex items-start justify-between gap-4'>
            <div>
              <h2 className='text-lg font-bold'>Photo de profil</h2>
              <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>Choisissez une action.</p>
            </div>
            <Button
              className='-mr-2 -mt-2 p-2'
              onClick={() => setProfileMenuOpen(false)}
              aria-label='Fermer le menu de la photo de profil'
            >
              <MaterialIcon className='h-5 w-5' iconName='close' />
            </Button>
          </div>
          <div className='space-y-1'>
            <Button
              className='accent-tab flex min-h-12 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] hover:bg-light-primary/5 dark:hover:bg-dark-primary/10'
              onClick={() => {
                setProfileMenuOpen(false);
                setProfilePreviewOpen(true);
              }}
            >
              <MaterialIcon className='h-5 w-5 shrink-0' iconName='visibility' />
              Voir votre photo de profil
            </Button>
            <Button
              className='accent-tab flex min-h-12 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] hover:bg-light-primary/5 dark:hover:bg-dark-primary/10'
              onClick={() => {
                setProfileMenuOpen(false);
                handleClick('profile')();
              }}
            >
              <MaterialIcon className='h-5 w-5 shrink-0' iconName='photo_camera' />
              Changer la photo de profil
            </Button>
            {hasCustomAvatar && (
              <Button
                className='accent-tab flex min-h-12 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] text-red-600 hover:bg-red-500/5 dark:hover:bg-red-500/10'
                onClick={() => {
                  setProfileMenuOpen(false);
                  removeProfileImage();
                }}
              >
                <MaterialIcon className='h-5 w-5 shrink-0' iconName='close' />
                Supprimer l’image de profil
              </Button>
            )}
          </div>
        </Modal>
        <div
          className={cn(
            'group relative h-36 xs:h-44 sm:h-48',
            !pageMode && 'mt-[52px]'
          )}
        >
          <input
            className='hidden'
            type='file'
            accept='image/*'
            ref={coverInputFileRef}
            onChange={editImage('cover')}
          />
          <NextImage
            useSkeleton
            className='relative h-full w-full'
            imgClassName='object-cover transition group-hover:brightness-75 duration-200
                          group-focus-within:brightness-75'
            src={getBannerSrc(coverPhotoURL)}
            alt={name}
            layout='fill'
          />
          <div className='absolute left-1/2 top-1/2 flex -translate-y-1/2 -translate-x-1/2 gap-3'>
            <Button
              className='group/inner relative flex h-10 w-10 items-center justify-center rounded-full bg-light-primary/60 p-0 hover:bg-image-preview-hover/70 focus-visible:bg-image-preview-hover/70'
              onClick={() => setBannerPreviewOpen(true)}
              aria-label='Voir la bannière'
            >
              <MaterialIcon
                className='hover-animation h-5 w-5 text-dark-primary group-hover:text-white'
                iconName='visibility'
              />
              <ToolTip groupInner tip='Voir la bannière' />
            </Button>
            <Button
              className='group/inner relative flex h-10 w-10 items-center justify-center rounded-full bg-light-primary/60 p-0 hover:bg-image-preview-hover/70
                         focus-visible:bg-image-preview-hover/70'
              onClick={handleClick('cover')}
              aria-label='Changer la bannière'
            >
              <MaterialIcon
                className='hover-animation h-5 w-5 text-dark-primary group-hover:text-white'
                iconName='photo_camera'
              />
              <ToolTip groupInner tip='Ajouter une photo' />
            </Button>
            {coverPhotoURL && getBannerSrc(coverPhotoURL) !== '/Banniere.png' && (
              <Button
                className='group/inner relative flex h-10 w-10 items-center justify-center rounded-full bg-light-primary/60 p-0 hover:bg-image-preview-hover/70
                           focus-visible:bg-image-preview-hover/70'
                onClick={removeCoverImage}
                aria-label='Supprimer la bannière'
              >
                <MaterialIcon
                  className='hover-animation h-5 w-5 text-dark-primary group-hover:text-white'
                  iconName='close'
                />
                <ToolTip groupInner tip='Supprimer la photo' />
              </Button>
            )}
          </div>
        </div>
        <div className='relative flex flex-col gap-6 px-4 py-3'>
          <div className='mb-8 xs:mb-12 sm:mb-14'>
            <input
              className='hidden'
              type='file'
              accept='image/*'
              ref={profileInputFileRef}
              onChange={editImage('profile')}
            />
            {/* La forme est portée par le conteneur (le masque y découpe
                aussi la photo). Le cadre, lui, est posé autour : la
                décoration est plus grande que la photo, la marge donnée ici
                lui évite d'être rognée par le haut du modal. */}
            <div className='absolute z-10 -translate-y-1/2 p-6 xs:p-8 sm:p-9'>
              {/* La pastille de l'appareil photo est posée à côté du bouton, et
                  non dedans : elle serait rognée par la forme choisie (le cœur
                  notamment, dont l'encoche coupe le haut de la pastille). */}
              <div className='group relative'>
                <Button
                  className={cn(
                    'main-tab relative aspect-square w-24 overflow-hidden bg-white !p-0 focus-visible:ring-2 focus-visible:ring-main-accent xs:w-32 sm:w-36',
                    shapeClass,
                    !isMaskedAvatarShape(avatarShape) &&
                      'border-4 border-white dark:border-dark-background'
                  )}
                  onClick={() => setProfileMenuOpen(true)}
                  aria-label='Ouvrir les options de la photo de profil'
                >
                  <NextImage
                    useSkeleton
                    className='h-full w-full'
                    imgClassName='!h-full !w-full object-cover transition group-hover:brightness-75'
                    src={avatarSrc}
                    alt={name}
                    layout='fill'
                  />
                </Button>
                <AvatarDecoration frame={avatarFrame} />
                <span className='pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-md'>
                  <MaterialIcon className='h-6 w-6' iconName='photo_camera' />
                </span>
              </div>
            </div>
          </div>
          {children}
        </div>
      </section>
    </>
  );
}
