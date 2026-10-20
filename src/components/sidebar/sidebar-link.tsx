import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { getAvatarSrc } from '@lib/media';
import { MaterialIcon } from '@components/ui/material-icon';
import type { NavLink } from './sidebar';

type SidebarLinkProps = NavLink & {
  username?: string;
  avatarSrc?: string;
  gender?: 'homme' | 'femme' | 'autre';
  badge?: number;
};

export function SidebarLink({
  href,
  username,
  iconName,
  iconSrc,
  linkName,
  disabled,
  canBeHidden,
  avatarSrc,
  gender,
  badge
}: SidebarLinkProps): JSX.Element {
  const { asPath } = useRouter();
  const isActive = username ? asPath.includes(username) : asPath === href;

  return (
    <Link href={href}>
      <a
        className={cn(
          'group py-1 outline-none xl:w-full',
          canBeHidden ? 'hidden xs:flex' : 'flex',
          disabled && 'cursor-not-allowed'
        )}
        onClick={disabled ? preventBubbling() : undefined}
      >
        <div
          className={cn(
            `custom-button flex items-center justify-center gap-4 self-start p-2 text-xl transition 
             duration-200 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
             group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
             dark:group-focus-visible:ring-white xs:p-3 xl:w-full xl:justify-start xl:pl-3 xl:pr-5`,
            isActive && 'font-bold text-main-accent'
          )}
        >
          <span className='relative inline-flex'>
            {avatarSrc !== undefined ? (
              <Image
                className='h-7 w-7 rounded-full object-cover'
                src={getAvatarSrc(avatarSrc, gender)}
                alt=''
                width={28}
                height={28}
                aria-hidden='true'
              />
            ) : iconSrc ? (
              <Image
                className='h-7 w-7 object-contain dark:invert'
                src={iconSrc}
                alt=''
                width={28}
                height={28}
                aria-hidden='true'
                style={
                  isActive
                    ? {
                        filter:
                          'brightness(0) saturate(100%) invert(48%) sepia(88%) saturate(1890%) hue-rotate(177deg) brightness(98%) contrast(101%)'
                      }
                    : undefined
                }
              />
            ) : (
              <MaterialIcon
                className={cn('h-7 w-7', isActive && 'text-main-accent')}
                iconName={iconName}
                solid={isActive}
              />
            )}
            {typeof badge === 'number' && badge > 0 && (
              <span className='absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white'>
                {badge > 9 ? '9+' : badge}
              </span>
            )}
          </span>
          <p className='hidden xl:block'>{linkName}</p>
        </div>
      </a>
    </Link>
  );
}
