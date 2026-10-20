import Link from 'next/link';
import cn from 'clsx';
import { getAvatarSrc } from '@lib/media';
import { getAvatarShapeClass, getAvatarFrameDecoration } from '@lib/avatar-shape';
import { useAuth } from '@lib/context/auth-context';
import { useTheme } from '@lib/context/theme-context';
import type { AvatarShape, AvatarFrame } from '@lib/types/theme';

type UserAvatarProps = {
  src: string;
  alt: string;
  size?: number;
  username?: string;
  className?: string;
  gender?: 'homme' | 'femme' | 'autre';
  shape?: AvatarShape;
  frame?: AvatarFrame;
  statusEmoji?: string | null;
};

export function UserAvatar({
  src,
  alt,
  size,
  username,
  className,
  gender,
  shape,
  frame,
  statusEmoji
}: UserAvatarProps): JSX.Element {
  const { user: currentUser } = useAuth();
  const { avatarShape: globalShape } = useTheme();
  const pictureSize = size ?? 48;
  const avatarSrc = getAvatarSrc(src, gender);

  /* La forme et la bordure choisies dans « Personnalisation » sont
     personnelles : elles ne s'appliquent qu'à notre propre avatar. Les
     autres utilisateurs gardent leur forme (ou un cercle par défaut), même
     si nous avons choisi « ovale avec anneau ». */
  const isOwnAvatar = Boolean(username && currentUser?.username === username);

  const selectedShape =
    shape ?? (isOwnAvatar ? globalShape : undefined) ?? 'circle';

  const shapeClass = getAvatarShapeClass(selectedShape);
  const frameDecoration = getAvatarFrameDecoration(frame);

  const getDefaultAvatar = (): string => {
    if (gender === 'femme') return '/Avatar femme.png';
    if (gender === 'homme') return '/Avatar homme.png';
    return '/Avatar homme.png';
  };

  const fallbackAvatar = getDefaultAvatar();

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    const image = event.currentTarget;
    if (image.dataset.fallback) return;
    image.dataset.fallback = 'true';
    image.src = fallbackAvatar;
  };

  return (
    <Link href={username ? `/user/${username}` : '#'}>
      <a
        aria-label={alt}
        className={cn(
          'blur-picture relative flex self-start transition-transform duration-200 active:scale-95',
          !username && 'pointer-events-none',
          className
        )}
        tabIndex={username ? 0 : -1}
      >
        {/* La forme est portée par le conteneur (masque de la bibliothèque ou
            rond) : la photo est découpée dans cette forme. */}
        <span
          className={cn(
            'relative block overflow-hidden bg-main-search-background',
            shapeClass
          )}
          style={{
            width: pictureSize,
            height: pictureSize,
            // Always show the default avatar behind the picture, so a person
            // without a photo (or with a broken one) never gets an empty box.
            backgroundImage: `url("${fallbackAvatar}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <img
            className='user-avatar-img block h-full w-full object-cover'
            src={avatarSrc}
            /* `alt` reste vide : une image cassée (anciennes photos stockées
               sur un hébergeur indisponible) ne doit jamais afficher le nom
               ou sa première lettre à la place de la photo. Le nom reste
               annoncé aux lecteurs d'écran via l'`aria-label` du lien. */
            alt=''
            width={pictureSize}
            height={pictureSize}
            onError={handleImageError}
          />
          {frameDecoration && (
            <img
              className='absolute inset-0 h-full w-full object-cover pointer-events-none'
              src={frameDecoration}
              alt=''
              width={pictureSize}
              height={pictureSize}
            />
          )}
        </span>
        {statusEmoji && (
          <span
            className='absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-light-border bg-main-background text-[11px] shadow-sm dark:border-dark-border'
            title='Statut'
          >
            {statusEmoji}
          </span>
        )}
      </a>
    </Link>
  );
}
