import cn from 'clsx';
import { useTheme } from '@lib/context/theme-context';
import { MaterialIcon } from '@components/ui/material-icon';
import type { Theme } from '@lib/types/theme';

type InputThemeRadioProps = {
  type: Theme;
  label: string;
  description: string;
};

/* Une seule pastille par thème : sa couleur de fond réelle.
   « Automatique » est coupée en deux (clair / bleu nuit). */
const themeSwatches: Readonly<Record<Theme, { color: string; ring: string }>> =
  {
    auto: {
      color: 'linear-gradient(135deg, #FFFFFF 0 50%, #15202B 50% 100%)',
      ring: 'rgba(120, 140, 160, 0.45)'
    },
    light: {
      color: '#FFFFFF',
      ring: 'rgba(15, 20, 25, 0.15)'
    },
    dim: {
      color: '#B6BEC7',
      ring: 'rgba(15, 20, 25, 0.18)'
    },
    dark: {
      color: '#000000',
      ring: 'rgba(255, 255, 255, 0.28)'
    }
  };

export function InputThemeRadio({
  type,
  label,
  description
}: InputThemeRadioProps): JSX.Element {
  const { theme, changeTheme } = useTheme();

  const { color, ring } = themeSwatches[type];
  const isChecked = type === theme;

  return (
    <label
      htmlFor={type}
      className={cn(
        `flex cursor-pointer items-center gap-3 px-3.5 py-3 transition-colors
         duration-200 focus-within:bg-main-accent/[0.06]`,
        isChecked
          ? 'bg-main-accent/[0.08]'
          : 'hover:bg-light-primary/[0.03] dark:hover:bg-dark-primary/[0.04]'
      )}
    >
      <input
        className='sr-only'
        id={type}
        type='radio'
        name='theme'
        value={type}
        checked={isChecked}
        onChange={changeTheme}
      />

      <span
        aria-hidden='true'
        className='h-5 w-5 shrink-0 rounded-full'
        style={{
          background: color,
          boxShadow: `inset 0 0 0 1px ${ring}`
        }}
      />

      <span className='min-w-0 flex-1'>
        <span
          className={cn(
            'block truncate text-sm',
            isChecked
              ? 'font-semibold text-main-accent'
              : 'font-medium text-light-primary dark:text-dark-primary'
          )}
        >
          {label}
        </span>
        <span className='block truncate text-xs text-light-secondary dark:text-dark-secondary'>
          {description}
        </span>
      </span>

      {isChecked && (
        <span
          aria-hidden='true'
          className='flex h-5 w-5 shrink-0 items-center justify-center
                     rounded-full bg-main-accent text-white'
        >
          <MaterialIcon className='h-3.5 w-3.5' iconName='check' />
        </span>
      )}
    </label>
  );
}
