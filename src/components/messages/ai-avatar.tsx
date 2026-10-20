import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';

type AiAvatarProps = {
  size?: number;
  className?: string;
};

/**
 * Avatar de l'assistant d'intelligence artificielle.
 *
 * L'assistant n'a pas de photo : on lui montre une étiquette, comme pour
 * une chaîne sans image.
 */
export function AiAvatar({ size = 36, className }: AiAvatarProps): JSX.Element {
  return (
    <span
      aria-hidden='true'
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-main-accent/10 text-main-accent',
        className
      )}
      style={{ width: size, height: size }}
    >
      <MaterialIcon className='h-1/2 w-1/2' iconName='smart_toy' />
    </span>
  );
}
