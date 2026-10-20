import Link from 'next/link';
import Image from 'next/image';
import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { getAvatarSrc } from '@lib/media';
import { MaterialIcon } from '@components/ui/material-icon';
import { getAvatarShapeClass, getAvatarFrameDecoration } from '@lib/avatar-shape';
import type { MobileNavLink } from '@components/modal/mobile-sidebar-modal';
import type { AvatarShape, AvatarFrame } from '@lib/types/theme';

type MobileSidebarLinkProps = MobileNavLink & {
  bottom?: boolean;
  closeMenu?: () => void;
  avatarSrc?: string;
  gender?: 'homme' | 'femme' | 'autre';
  shape?: AvatarShape;
  frame?: AvatarFrame;
};

export function MobileSidebarLink({
  href,
  bottom,
  linkName,
  iconName,
  iconSrc,
  disabled,
  closeMenu,
  avatarSrc,
  gender,
  shape,
  frame
}: MobileSidebarLinkProps): JSX.Element {
  const frameDecoration = getAvatarFrameDecoration(frame);

  return (
    <Link href={href} key={href}>
      <a
        className={cn(
          `custom-button accent-tab accent-bg-tab flex items-center rounded-md font-bold 
           transition hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c]
           dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white`,
          bottom ? 'gap-2 p-1.5 text-base' : 'gap-4 p-2 text-xl',
          disabled && 'cursor-not-allowed'
        )}
        onClick={disabled ? preventBubbling() : closeMenu}
      >
        {avatarSrc !== undefined ? (
          <span className='relative flex shrink-0 items-center justify-center'>
            {/* Même structure que `UserAvatar` : la forme est portée par le
               conteneur (le masque y découpe aussi la photo). Le cadre, lui,
               est posé autour de la photo : il ne doit pas être découpé par
               la forme. */}
            <span
              className={cn(
                'relative block overflow-hidden bg-main-search-background',
                bottom ? 'h-5 w-5' : 'h-8 w-8',
                getAvatarShapeClass(shape ?? 'circle')
              )}
              style={{
                backgroundImage: `url("${getAvatarSrc('', gender)}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <Image
                className='block h-full w-full object-cover'
                src={getAvatarSrc(avatarSrc, gender)}
                alt=''
                width={bottom ? 20 : 32}
                height={bottom ? 20 : 32}
                aria-hidden='true'
              />
            </span>
            {frameDecoration && (
              <img
                alt=''
                className='pointer-events-none absolute inset-0 h-full w-full object-contain'
                draggable={false}
                height={bottom ? 20 : 32}
                src={frameDecoration}
                width={bottom ? 20 : 32}
              />
            )}
          </span>
        ) : iconSrc ? (
          <Image
            className={cn(
              bottom ? 'h-5 w-5' : 'h-7 w-7',
              'object-contain dark:invert'
            )}
            src={iconSrc}
            alt=''
            width={bottom ? 20 : 28}
            height={bottom ? 20 : 28}
            aria-hidden='true'
          />
        ) : (
          <MaterialIcon
            className={bottom ? 'h-5 w-5' : 'h-7 w-7'}
            iconName={iconName}
          />
        )}
        {linkName}
      </a>
    </Link>
  );
}
