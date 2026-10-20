import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { MaterialIcon } from '@components/ui/material-icon';
import { ToolTip } from '@components/ui/tooltip';
import { NumberStats } from './number-stats';
import type { IconName } from '@components/ui/material-icon';

type TweetOption = {
  tip: string;
  move?: number;
  stats?: number;
  iconName: IconName;
  disabled?: boolean;
  /** Masque le compteur pour les options qui n'en ont pas (ex. Signaler). */
  hideStats?: boolean;
  className: string;
  viewTweet?: boolean;
  iconClassName: string;
  onClick?: (...args: unknown[]) => unknown;
};

export function TweetOption({
  tip,
  move,
  stats,
  disabled,
  iconName,
  hideStats,
  className,
  viewTweet,
  iconClassName,
  onClick
}: TweetOption): JSX.Element {
  return (
    <button
      aria-label={tip}
      className={cn(
        `group flex items-center gap-1.5 p-0 transition-none
         disabled:cursor-not-allowed inner:transition inner:duration-200`,
        disabled && 'cursor-not-allowed',
        className
      )}
      disabled={disabled}
      onClick={preventBubbling(onClick)}
    >
      <i
        className={cn(
          'relative rounded-full p-2 not-italic group-focus-visible:ring-2',
          iconClassName
        )}
      >
        <MaterialIcon
          className={viewTweet ? 'h-6 w-6' : 'h-5 w-5'}
          iconName={iconName}
        />
        <ToolTip tip={tip} />
      </i>
      {!viewTweet && !hideStats && (
        <NumberStats move={move as number} stats={stats as number} />
      )}
    </button>
  );
}
