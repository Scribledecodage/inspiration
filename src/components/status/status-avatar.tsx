import cn from 'clsx';
import { getAvatarSrc } from '@lib/media';
import { getAvatarShapeClass } from '@lib/avatar-shape';
import { AvatarDecoration } from '@components/user/avatar-frame';
import type { AvatarFrame } from '@lib/types/theme';
import type { AvatarShape } from '@lib/types/theme';

type Gender = 'homme' | 'femme' | 'autre' | undefined;

/** Couleur de l'anneau lorsqu'il n'y a plus rien à voir. */
const SEEN_COLOR = '#536471';

/**
 * L'avatar seul, avec la forme choisie par la personne (rond, cœur, losange…).
 * La forme est portée par le conteneur, comme dans le reste du site.
 */
export function StatusAvatarImage({
  src,
  size,
  gender,
  shape,
  frame
}: {
  src: string | null;
  size: number;
  gender?: Gender;
  shape?: AvatarShape;
  frame?: AvatarFrame;
}): JSX.Element {
  const fallback =
    gender === 'femme' ? '/Avatar femme.png' : '/Avatar homme.png';

  return (
    <span
      className={cn(
        'relative block overflow-hidden',
        getAvatarShapeClass(shape)
      )}
      style={{
        width: size,
        height: size,
        backgroundImage: `url("${fallback}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <img
        className='block h-full w-full object-cover'
        src={getAvatarSrc(src, gender)}
        alt=''
        width={size}
        height={size}
        draggable={false}
      />
      <AvatarDecoration frame={frame} />
    </span>
  );
}

/** Construit un anneau multicolore : un segment par statut, séparés par un vide. */
function ringBackground(segments: number, color: string): string {
  if (segments <= 1) return color;

  const gap = 3; // espace (en %) entre chaque segment
  const size = 100 / segments;
  const stops: string[] = [];

  for (let index = 0; index < segments; index++) {
    const start = index * size;
    const end = start + size;
    const cut = Math.max(start, end - gap);

    stops.push(`${color} ${start}% ${cut}%`);
    stops.push(`transparent ${cut}% ${end}%`);
  }

  return `conic-gradient(from -90deg, ${stops.join(', ')})`;
}

type StatusRingProps = {
  src: string | null;
  alt: string;
  size?: number;
  gender?: Gender;
  shape?: AvatarShape;
  frame?: AvatarFrame;
  /** Nombre de statuts : découpe le trait en autant de segments. */
  segments?: number;
  /** Couleur du trait (choisie à la publication). */
  color?: string;
  /** Le statut a-t-il déjà été vu ? (trait gris) */
  seen?: boolean;
  /** Dessiner l'anneau. `false` quand la personne n'a aucun statut. */
  ring?: boolean;
  className?: string;
};

/** Avatar entouré d'un anneau de statut (aucun anneau si `ring` est faux). */
export function StatusRing({
  src,
  alt,
  size = 52,
  gender,
  shape,
  frame,
  segments = 1,
  color = '#1d9bf0',
  seen = false,
  ring = true,
  className
}: StatusRingProps): JSX.Element {
  if (!ring)
    return (
      <span className={cn('block shrink-0', className)} title={alt}>
        <StatusAvatarImage
          src={src}
          size={size}
          gender={gender}
          shape={shape}
          frame={frame}
        />
      </span>
    );

  const ringColor = seen ? SEEN_COLOR : color;
  // La photo occupe la place restante : anneau (2 px) + marge intérieure (2 px).
  const avatarSize = Math.max(16, size - 8);

  return (
    <span
      className={cn('block shrink-0 rounded-full', className)}
      style={{ width: size, height: size }}
      title={alt}
    >
      <span
        className='block h-full w-full rounded-full p-[2px]'
        style={{ background: ringBackground(segments, ringColor) }}
      >
        <span className='flex h-full w-full items-center justify-center rounded-full bg-main-background p-[2px]'>
          <StatusAvatarImage
            src={src}
            size={avatarSize}
            gender={gender}
            shape={shape}
            frame={frame}
          />
        </span>
      </span>
    </span>
  );
}
