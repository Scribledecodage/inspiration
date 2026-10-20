import cn from 'clsx';
import Link from 'next/link';
import { MaterialIcon } from '@components/ui/material-icon';

type UserNameProps = {
  tag?: keyof JSX.IntrinsicElements;
  name: string;
  verified: boolean;
  username?: string;
  className?: string;
  iconClassName?: string;
};

export function UserName({
  tag,
  name,
  verified,
  username,
  className,
  iconClassName
}: UserNameProps): JSX.Element {
  const CustomTag = tag ? tag : 'p';

  return (
    <Link href={username ? `/user/${username}` : '#'}>
      <a
        className={cn(
          'flex min-w-0 items-center gap-1 truncate font-bold',
          username ? 'custom-underline' : 'pointer-events-none',
          className
        )}
        tabIndex={username ? 0 : -1}
      >
        {/* `min-w-0` : sans lui, le nom refuse de rétrécir dans une
            colonne étroite, déborde, et chevauche le pseudo. */}
        <CustomTag className='min-w-0 truncate'>{name}</CustomTag>
        {verified && (
          <i>
            <MaterialIcon
              className={cn('text-main-accent', iconClassName ?? 'h-5 w-5')}
              iconName='verified'
              solid
            />
          </i>
        )}
      </a>
    </Link>
  );
}
