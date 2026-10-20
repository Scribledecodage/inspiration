import { useState } from 'react';
import Image from 'next/image';
import cn from 'clsx';
import type { ReactNode } from 'react';
import type { ImageProps } from 'next/image';

type NextImageProps = {
  alt: string;
  width?: string | number;
  children?: ReactNode;
  useSkeleton?: boolean;
  imgClassName?: string;
  previewCount?: number;
  blurClassName?: string;
} & ImageProps;

/**
 *
 * @description Must set width and height, if not add layout='fill'
 * @param useSkeleton show a neutral background under the image until it is
 * loaded (don't use it if image is transparent)
 */
export function NextImage({
  src,
  alt,
  width,
  height,
  children,
  className,
  useSkeleton,
  imgClassName,
  previewCount,
  blurClassName,
  ...rest
}: NextImageProps): JSX.Element {
  /* L'image apparaît dans une zone DÈJÀ réservée : elle se fond sur son
     fond, sans jamais changer de taille.

     Avant, la classe de l'image était remplacée au chargement (fond gris
     pulsé → image) : chaque publication qui arrivait au défilement faisait
     clignoter un rectangle clair, puis l'image se recalait à une autre
     taille. C'était le « flash » et le « ça bouge » du fil.

     On retient l'adresse de l'image qui a fini de charger : l'image n'est
     considérée comme prête que si c'est bien celle qui est affichée (sinon
     une image déjà en cache resterait invisible). */
  const [loadedSrc, setLoadedSrc] = useState<ImageProps['src'] | null>(null);

  const loaded = !useSkeleton || loadedSrc === src;

  const handleLoad = (): void => setLoadedSrc(src);

  /* Si l'appelant a déjà prévu une transition, on ne la remplace pas : la
     transition par défaut de Tailwind inclut déjà l'opacité. */
  const hasOwnTransition = imgClassName?.includes('transition') ?? false;

  return (
    <figure
      style={{ width }}
      className={cn(
        className,
        'relative',
        rest.layout === 'fill' && 'h-full w-full'
      )}
    >
      <Image
        className={cn(
          imgClassName,
          /* Le cadrage ne change plus au chargement : une image seule garde
             la taille de la zone réservée (elle n'est ni rognée, ni
             redimensionnée quand elle arrive). */
          previewCount === 1
            ? '!h-full !w-full !object-contain'
            : 'object-cover',
          !hasOwnTransition && 'transition-opacity duration-200 ease-out',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={handleLoad}
        {...rest}
        layout={rest.layout ?? 'responsive'}
      />
      {!loaded && (
        <span
          aria-hidden='true'
          className={cn(
            'pointer-events-none absolute inset-0',
            blurClassName ?? 'bg-light-secondary/40 dark:bg-dark-secondary/40'
          )}
        />
      )}
      {children}
    </figure>
  );
}
