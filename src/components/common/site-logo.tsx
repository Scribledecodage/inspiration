import cn from 'clsx';
import { NextImage } from '@components/ui/next-image';

type SiteLogoProps = {
  size?: number;
  className?: string;
  imgClassName?: string;
};

export function SiteLogo({
  size = 48,
  className,
  imgClassName
}: SiteLogoProps): JSX.Element {
  return (
    <NextImage
      src='/LogoSite.png'
      alt='Inspiration'
      width={size}
      height={size}
      className={className}
      imgClassName={cn('object-contain', imgClassName)}
    />
  );
}
