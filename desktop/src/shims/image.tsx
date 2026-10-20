import { useEffect, useRef } from 'react';
import type { CSSProperties, ImgHTMLAttributes } from 'react';

/**
 * Remplace `next/image`.
 *
 * Next.js optimise et redimensionne les images via un serveur. Dans
 * l'application de bureau, il n'y a pas de serveur : l'image est simply
 * chargée par le WebView, qui la met en cache. Le composant garde
 * exactement les mêmes propriétés que celles de Next.js, pour que les
 * fichiers du site fonctionnent sans modification.
 */
type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string | { src: string };
  alt?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  layout?: 'fill' | 'intrinsic' | 'fixed' | 'responsive';
  objectFit?: CSSProperties['objectFit'];
  objectPosition?: CSSProperties['objectPosition'];
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  loader?: unknown;
  onLoadingComplete?: () => void;
};

export type { ImageProps };

export default function Image({
  src,
  alt = '',
  width,
  height,
  fill,
  layout,
  objectFit,
  objectPosition,
  priority,
  quality,
  sizes,
  unoptimized,
  placeholder,
  blurDataURL,
  loader,
  onLoadingComplete,
  onLoad,
  style,
  ...rest
}: ImageProps) {
  const source = typeof src === 'string' ? src : src.src;
  const isFill = Boolean(fill) || layout === 'fill';

  const imageRef = useRef<HTMLImageElement>(null);

  /* Une image déjà en cache peut avoir fini de charger AVANT que le
     gestionnaire ne soit accroché : l'événement « load » est alors passé,
     et l'image resterait masquée pour toujours. On rattrape ce cas. */
  useEffect(() => {
    if (imageRef.current?.complete) onLoadingComplete?.();
  }, [source, onLoadingComplete]);

  return (
    <img
      alt={alt}
      className={rest.className}
      decoding='async'
      height={isFill ? undefined : height}
      /* Le chargement paresseux n'apporte rien dans une fenêtre fixe, et
         Chrome ne chargeait jamais les images situées hors du champ de
         vision initial. */
      loading='eager'
      onLoad={(event) => {
        onLoad?.(event);
        /* Le site garde l'image masquee (opacite 0) jusqu'a ce signal :
           sans lui, les photos de profil et les bannieres restent
           invisibles. */
        onLoadingComplete?.();
      }}
      ref={imageRef}
      sizes={sizes}
      src={source}
      style={
        isFill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit,
              objectPosition,
              ...style
            }
          : { objectFit, objectPosition, ...style }
      }
      width={isFill ? undefined : width}
      {...rest}
    />
  );
}
