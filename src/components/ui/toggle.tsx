import cn from 'clsx';

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
};

/**
 * Interrupteur à deux états.
 *
 * Il est piloté par un bouton (et non une case à cocher) : il se manipule
 * au doigt, et le tactile reste lisible au premier regard.
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled,
  className
}: ToggleProps): JSX.Element {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={cn(
        'relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200',
        checked ? 'bg-main-accent' : 'bg-light-border dark:bg-dark-border',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      onClick={(): void => onChange(!checked)}
      role='switch'
      type='button'
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200',
          checked ? 'translate-x-[1.125rem]' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}
