import { useModal } from '@lib/hooks/useModal';
import { Button } from '@components/ui/button';
import { Modal } from '@components/modal/modal';
import { ImageModal } from '@components/modal/image-modal';
import type { ImageData } from '@lib/types/file';
import { getBannerSrc } from '@lib/media';

type UserHomeCoverProps = {
  coverData?: ImageData | null;
};

export function UserHomeCover({ coverData }: UserHomeCoverProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();
  const bannerSrc = getBannerSrc(coverData?.src);
  const bannerData = coverData ?? {
    src: bannerSrc,
    alt: 'Bannière Inspiration'
  };

  return (
    <div className='mt-0.5 h-36 xs:h-48 sm:h-52'>
      <Modal open={open} closeModal={closeModal}>
        <ImageModal imageData={bannerData} previewCount={1} />
      </Modal>
      <Button
        className='accent-tab relative h-full w-full rounded-none p-0 transition hover:brightness-75'
        onClick={openModal}
        aria-label='Afficher la bannière'
      >
        <img
          className='block h-full w-full object-cover'
          src={bannerSrc}
          /* Idem avatar : jamais de texte (nom) à la place d'une image
             indisponible, on garde la bannière par défaut. */
          alt=''
          onError={(event) => {
            const image = event.currentTarget;
            if (image.dataset.fallback) return;
            image.dataset.fallback = 'true';
            image.src = '/Banniere.png';
          }}
        />
      </Button>
    </div>
  );
}
