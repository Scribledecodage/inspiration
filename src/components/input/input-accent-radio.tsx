import cn from 'clsx';
import { useTheme } from '@lib/context/theme-context';
import { MaterialIcon } from '@components/ui/material-icon';
import type { Accent } from '@lib/types/theme';

type InputAccentRadioProps = {
  type: Accent;
  label: string;
};

type InputAccentData = Record<Accent, string>;

const inputColors: Readonly<InputAccentData> = {
  blue: 'bg-accent-blue',
  indigo: 'bg-accent-indigo',
  pink: 'bg-accent-pink',
  purple: 'bg-accent-purple',
  red: 'bg-accent-red',
  green: 'bg-accent-green'
};

export function InputAccentRadio({
  type,
  label
}: InputAccentRadioProps): JSX.Element {
  const { accent, changeAccent } = useTheme();

  const isChecked = type === accent;

  return (
    <label
      htmlFor={type}
      className={cn(
        `group flex h-[52px] cursor-pointer items-center gap-3 rounded-xl border px-3
         transition-all duration-200 focus-within:ring-2 focus-within:ring-main-accent/40`,
        isChecked
          ? 'border-main-accent bg-main-accent/10'
          : 'border-light-border bg-light-primary/[0.02] hover:border-light-secondary/40 hover:bg-light-primary/[0.05] dark:border-dark-border dark:bg-dark-primary/[0.02] dark:hover:border-dark-secondary/60 dark:hover:bg-dark-primary/[0.05]'
      )}
    >
      <input
        className='sr-only'
        id={type}
        type='radio'
        name='accent'
        value={type}
        checked={isChecked}
        onChange={changeAccent}
      />
      <span
        aria-hidden='true'
        className={cn(
          `flex h-7 w-7 shrink-0 items-center justify-center rounded-full
           transition-transform duration-200 group-hover:scale-105`,
          inputColors[type],
          isChecked
            ? 'ring-2 ring-main-accent ring-offset-2 ring-offset-main-background'
            : 'ring-1 ring-inset ring-black/10 dark:ring-white/25'
        )}
      >
        {isChecked && (
          <MaterialIcon className='h-4 w-4 text-white' iconName='check' />
        )}
      </span>
      <span
        className={cn(
          'truncate text-[13px] font-medium',
          isChecked
            ? 'text-main-accent'
            : 'text-light-primary dark:text-dark-primary'
        )}
      >
        {label}
      </span>
    </label>
  );
}
