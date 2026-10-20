import { useState } from 'react';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';

type WebsiteFaviconProps = {
  href: string;
  className?: string;
};

export function WebsiteFavicon({
  href,
  className
}: WebsiteFaviconProps): JSX.Element {
  const [hasError, setHasError] = useState(false);

  let faviconURL: string | null = null;

  try {
    faviconURL = `${new URL(href).origin}/favicon.ico`;
  } catch {
    faviconURL = null;
  }

  if (!faviconURL || hasError)
    return (
      <MaterialIcon
        className={cn('h-4 w-4 shrink-0', className)}
        iconName='link'
      />
    );

  return (
    <img
      className={cn('h-4 w-4 shrink-0 rounded-sm object-contain', className)}
      src={faviconURL}
      alt=''
      loading='lazy'
      referrerPolicy='no-referrer'
      onError={(): void => setHasError(true)}
    />
  );
}
