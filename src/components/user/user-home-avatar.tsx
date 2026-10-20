import cn from 'clsx';
import { useModal } from '@lib/hooks/useModal';
import { Button } from '@components/ui/button';
import { Modal } from '@components/modal/modal';
import { ImageModal } from '@components/modal/image-modal';
import { useTheme } from '@lib/context/theme-context';
import type { ImageData } from '@lib/types/file';
import type { AvatarShape, AvatarFrame } from '@lib/types/theme';
import { getAvatarSrc } from '@lib/media';
import { getAvatarShapeClass } from '@lib/avatar-shape';
import { AvatarDecoration } from './avatar-frame';

type UserHomeAvatarProps = {
  isOwner?: boolean;
  profileData?:
    | (ImageData & {
        gender?: 'homme' | 'femme' | 'autre';
        avatarShape?: AvatarShape;
        avatarFrame?: AvatarFrame;
      })
    | null;
};

export function UserHomeAvatar({
  profileData,
  isOwner
}: UserHomeAvatarProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();
  const { avatarShape: globalShape, avatarFrame: globalFrame } = useTheme();

  /* La forme / cadre choisi dans « Personnalisation » n'est appliqué qu'à
     notre propre profil : sur le profil de quelqu'un d'autre, on affiche sa
     forme à lui (ou un rond par défaut). */
  const selectedShape =
    profileData?.avatarShape ?? (isOwner ? globalShape : undefined) ?? 'circle';
  const selectedFrame =
    profileData?.avatarFrame ?? (isOwner ? globalFrame : undefined) ?? 'none';

  const shapeClass = getAvatarShapeClass(selectedShape);

  // Avatar par défaut (homme/femme) et repli si la photo choisie est
  // indisponible (anciennes photos hébergées sur un service hors ligne).
  const fallbackAvatar = getAvatarSrc(null, profileData?.gender);
  const avatarSrc = getAvatarSrc(profileData?.src, profileData?.gender);

  return (
    <div className='relative mb-8 xs:mb-14 sm:mb-16'>
      <Modal open={open} closeModal={closeModal}>
        <ImageModal
          imageData={
            { src: profileData?.src, alt: profileData?.alt } as ImageData
          }
          previewCount={1}
        />
      </Modal>
      <div className='absolute -mt-3 -translate-y-1/2'>
        {/* La décoration d'avatar est posée autour de la photo : elle est
            deux fois plus grande, son centre transparent laisse voir
            l'avatar. */}
        <div className='relative'>
          <AvatarDecoration frame={selectedFrame} />
          <Button
            className={cn(
              'accent-tab relative aspect-square w-24 overflow-hidden p-0 disabled:cursor-auto disabled:opacity-100 xs:w-32 sm:w-36',
              shapeClass
            )}
            onClick={openModal}
            disabled={!profileData}
          >
            <img
              className='block h-full w-full bg-main-background object-cover'
              src={avatarSrc}
              /* Jamais de texte (nom) à la place d'une photo indisponible. */
              alt=''
              onError={(event) => {
                const image = event.currentTarget;
                if (image.dataset.fallback) return;
                image.dataset.fallback = 'true';
                image.src = fallbackAvatar;
              }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
