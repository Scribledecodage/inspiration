import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useModal } from '@lib/hooks/useModal';
import { preventBubbling } from '@lib/utils';
import { ImageModal } from '@components/modal/image-modal';
import { Modal } from '@components/modal/modal';
import { NextImage } from '@components/ui/next-image';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { ToolTip } from '@components/ui/tooltip';
import type { MotionProps } from 'framer-motion';
import type { ImagesPreview, ImageData } from '@lib/types/file';

type ImagePreviewProps = {
  tweet?: boolean;
  viewTweet?: boolean;
  previewCount: number;
  imagesPreview: ImagesPreview;
  removeImage?: (targetId: string) => () => void;
};

const variants: MotionProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, scale: 0.5 },
  transition: { type: 'spring', duration: 0.5 }
};

/* Dans le fil, la média n'est plus animée : elle grandissait depuis la
   moitié de sa taille (0.5) à chaque publication qui arrivait au
   défilement. Sous les yeux du lecteur, l'image semblait donc sauter, et
   tout ce qui suivait glissait avec elle. */
const tweetVariants: MotionProps = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

type PostImageBorderRadius = Record<number, string[]>;

const postImageBorderRadius: Readonly<PostImageBorderRadius> = {
  1: ['rounded-2xl'],
  2: ['rounded-tl-2xl rounded-bl-2xl', 'rounded-tr-2xl rounded-br-2xl'],
  3: ['rounded-tl-2xl rounded-bl-2xl', 'rounded-tr-2xl', 'rounded-br-2xl'],
  4: ['rounded-tl-2xl', 'rounded-tr-2xl', 'rounded-bl-2xl', 'rounded-br-2xl']
};

export function ImagePreview({
  tweet,
  viewTweet,
  previewCount,
  imagesPreview,
  removeImage
}: ImagePreviewProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    const imageData = imagesPreview[selectedIndex];
    setSelectedImage(imageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const handleVideoStop = (): void => {
    if (videoRef.current) videoRef.current.pause();
  };

  const handleSelectedImage = (index: number, isVideo?: boolean) => () => {
    if (isVideo) handleVideoStop();

    setSelectedIndex(index);
    openModal();
  };

  const handleNextIndex = (type: 'prev' | 'next') => () => {
    const nextIndex =
      type === 'prev'
        ? selectedIndex === 0
          ? previewCount - 1
          : selectedIndex - 1
        : selectedIndex === previewCount - 1
        ? 0
        : selectedIndex + 1;

    setSelectedIndex(nextIndex);
  };

  const isTweet = tweet ?? viewTweet;

  /* Une publication qui ne contient qu'une vidéo ne doit pas utiliser la
     grille d'images (hauteur fixe) : le lecteur garde son format d'origine,
     est centré et simplement limité en hauteur — la vidéo n'est donc jamais
     coupée, et la publication reste compacte. */
  const singleVideo =
    previewCount === 1 && Boolean(imagesPreview[0]?.type?.includes('video'));

  /* Un GIF seul est affiché plus petit, sans recadrage, comme une vidéo :
     il garde son format d'origine et la publication reste compacte. */
  const singleGif =
    previewCount === 1 &&
    Boolean(imagesPreview[0]?.type?.toLowerCase().includes('gif'));

  const singleCompact = singleVideo || singleGif;

  /* Une seule image : elle n'utilise pas la grille (qui impose une hauteur
     fixe et rogne les images). Elle est placée dans un cadre dont le ratio
     est celui de l'image quand on le connaît : la place est donc réservée
     AVANT le chargement, et rien ne bouge quand l'image arrive. */
  const singleImage = previewCount === 1 && !singleCompact;

  const singleImageRatio =
    singleImage && imagesPreview[0]?.width && imagesPreview[0]?.height
      ? `${imagesPreview[0].width} / ${imagesPreview[0].height}`
      : undefined;

  return (
    <div
      className={cn(
        singleCompact
          ? 'flex justify-center'
          : singleImage
            ? 'relative aspect-[4/3] w-full max-h-[420px] overflow-hidden rounded-2xl bg-light-secondary/30 dark:bg-dark-secondary/30 md:aspect-[16/10]'
            : cn(
                'grid grid-cols-2 grid-rows-2 rounded-2xl',
                viewTweet
                  ? 'h-[35vw] xs:h-[30vw] md:h-[220px]'
                  : 'h-[30vw] xs:h-[25vw] md:h-[200px]',
                isTweet ? 'gap-0.5' : 'gap-3'
              ),
        isTweet && 'mt-2'
      )}
      style={singleImageRatio ? { aspectRatio: singleImageRatio } : undefined}
    >
      <Modal
        modalClassName={cn(
          'flex justify-center w-full items-center relative',
          isTweet && 'h-full'
        )}
        open={open}
        closeModal={closeModal}
        closePanelOnClick
      >
        <ImageModal
          tweet={isTweet}
          imageData={selectedImage as ImageData}
          previewCount={previewCount}
          selectedIndex={selectedIndex}
          handleNextIndex={handleNextIndex}
        />
      </Modal>
      <AnimatePresence mode='popLayout'>
        {imagesPreview.map(({ id, src, alt }, index) => {
          const isVideo = imagesPreview[index].type?.includes('video');

          return (
            <motion.div
              className={cn(
                'accent-tab group relative transition-shadow',
                isTweet
                  ? postImageBorderRadius[previewCount][index]
                  : 'rounded-2xl',
                singleImage
                  ? 'h-full w-full'
                  : {
                      'col-span-2 row-span-2': previewCount === 1,
                      'row-span-2':
                        previewCount === 2 || (index === 0 && previewCount === 3)
                    }
              )}
              {...(isTweet ? tweetVariants : variants)}
              layout={!isTweet ? true : false}
              key={`${id || src}-${index}`}
            >
              {singleCompact ? (
                 singleVideo ? (
                /* Vidéo seule : lecteur compact, format respecté, jamais coupé. */
                <div className='relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5'>
                  <video
                    ref={videoRef}
                    className={cn(
                      'block max-h-[45vh] w-auto max-w-full cursor-pointer object-contain',
                      viewTweet ? 'md:max-h-[320px]' : 'md:max-h-[220px]'
                    )}
                    src={src}
                    controls
                    playsInline
                    preload='metadata'
                  />
                  <button
                    aria-label='Agrandir la vidéo'
                    className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full
                               bg-light-primary/75 text-dark-primary opacity-0 backdrop-blur-sm transition
                               hover:bg-image-preview-hover/75 focus-visible:opacity-100 group-hover:opacity-100'
                    onClick={preventBubbling(handleSelectedImage(index, isVideo))}
                    type='button'
                  >
                    <MaterialIcon className='h-4 w-4' iconName='north_east' />
                  </button>
                </div>
                 ) : (
                   /* GIF seul : affiché un peu plus petit, sans recadrage. */
                   <div className='relative overflow-hidden rounded-md bg-light-secondary/10 dark:bg-dark-secondary/10'>
                     <img
                       className={cn(
                         'block max-h-[30vh] w-auto max-w-full cursor-pointer object-contain',
                         viewTweet ? 'md:max-h-[200px]' : 'md:max-h-[180px]'
                       )}
                       src={src}
                       alt={alt}
                       onClick={preventBubbling(handleSelectedImage(index, isVideo))}
                     />
                     <button
                       aria-label='Agrandir le GIF'
                       className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full
                                  bg-light-primary/75 text-dark-primary opacity-0 backdrop-blur-sm transition
                                  hover:bg-image-preview-hover/75 focus-visible:opacity-100 group-hover:opacity-100'
                       onClick={preventBubbling(handleSelectedImage(index, isVideo))}
                       type='button'
                     >
                       <MaterialIcon className='h-4 w-4' iconName='north_east' />
                     </button>
                   </div>
                 )
               ) : (
              <button
                type='button'
                className='absolute inset-0 w-full h-full'
                onClick={preventBubbling(handleSelectedImage(index, isVideo))}
              >
                {isVideo ? (
                  <>
                    <Button
                      className='visible absolute top-0 right-0 z-10 -translate-x-1 translate-y-1 
                                 bg-light-primary/75 p-1 opacity-0 backdrop-blur-sm transition
                                 hover:bg-image-preview-hover/75 group-hover:opacity-100 xs:invisible'
                    >
                      <MaterialIcon className='h-5 w-5' iconName='north_east' />
                    </Button>
                    <video
                      ref={videoRef}
                      className={cn(
                        `relative h-full w-full cursor-pointer transition 
                         hover:brightness-75 hover:duration-200`,
                        isTweet
                          ? postImageBorderRadius[previewCount][index]
                          : 'rounded-2xl'
                      )}
                      src={src}
                      controls
                      muted
                    />
                  </>
                ) : (
                  <NextImage
                    className='relative h-full w-full cursor-pointer transition 
                               hover:brightness-75 hover:duration-200'
                    imgClassName={cn(
                      isTweet
                        ? postImageBorderRadius[previewCount][index]
                        : 'rounded-2xl'
                    )}
                    previewCount={previewCount}
                    layout='fill'
                    src={src}
                    alt={alt}
                    useSkeleton={isTweet}
                  />
                )}
                </button>
              )}
              {removeImage && (
                <Button
                  className='group absolute top-0 left-0 translate-x-1 translate-y-1
                           bg-light-primary/75 p-1 backdrop-blur-sm 
                           hover:bg-image-preview-hover/75'
                  onClick={preventBubbling(removeImage(id))}
                >
                  <MaterialIcon
                    className='h-5 w-5 text-white'
                    iconName='close'
                  />
                  <ToolTip className='translate-y-2' tip='Supprimer' />
                </Button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
