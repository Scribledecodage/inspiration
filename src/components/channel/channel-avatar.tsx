import cn from 'clsx';
import { getAvatarShapeClass } from '@lib/avatar-shape';
import { MaterialIcon } from '@components/ui/material-icon';
import type { AvatarShape } from '@lib/types/theme';

type ChannelAvatarProps = {
  photoURL?: string | null;
  name: string;
  size?: number;
  /** Forme choisie pour la chaîne (rond par défaut). */
  shape?: AvatarShape;
  className?: string;
};

/**
 * Avatar d'une chaîne : la photo de la chaîne, découpée dans la forme
 * choisie à sa création. Sans photo, l'icône d'information remplace l'emoji
 * micro : elle indique que la chaîne n'a pas encore d'image.
 */
export function ChannelAvatar({
  photoURL,
  name,
  size = 48,
  shape = 'circle',
  className
}: ChannelAvatarProps): JSX.Element {
  const shapeClass = getAvatarShapeClass(shape);
  const boxStyle = { width: size, height: size };

  if (photoURL) {
    return (
      <span
        className={cn(
          'block shrink-0 overflow-hidden bg-main-search-background',
          shapeClass,
          className
        )}
        style={boxStyle}
      >
        <img
          alt={name}
          className='block h-full w-full object-cover'
          height={size}
          src={photoURL}
          width={size}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center bg-main-accent/10 text-main-accent',
        shapeClass,
        className
      )}
      style={boxStyle}
    >
      <MaterialIcon className='h-1/2 w-1/2' iconName='info' />
    </span>
  );
}
