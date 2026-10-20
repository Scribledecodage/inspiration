import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  visible: boolean;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  minLength?: number;
  onToggleVisibility: () => void;
  onChange: (value: string) => void;
  onSubmitShortcut?: () => void;
};

export function PasswordField({
  id,
  label,
  value,
  visible,
  autoComplete,
  placeholder,
  hint,
  error,
  minLength,
  onToggleVisibility,
  onChange,
  onSubmitShortcut
}: PasswordFieldProps): JSX.Element {
  return (
    <label className='flex flex-col gap-2 text-sm font-bold' htmlFor={id}>
      {label}
      <div className='relative'>
        <input
          autoComplete={autoComplete}
          className={cn(
            'w-full rounded-lg border bg-transparent px-4 py-3 pr-12 font-normal outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20',
            error
              ? 'border-accent-red'
              : 'border-light-line-reply dark:border-dark-line-reply'
          )}
          id={id}
          minLength={minLength}
          onChange={(event) => onChange(event.target.value)}
          onKeyUp={onSubmitShortcut}
          placeholder={placeholder}
          type={visible ? 'text' : 'password'}
          value={value}
        />
        <button
          aria-label={
            visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
          }
          className='custom-button absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-light-secondary hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10'
          onClick={onToggleVisibility}
          type='button'
        >
          <MaterialIcon
            className='h-5 w-5'
            iconName={visible ? 'visibility_off' : 'visibility'}
          />
        </button>
      </div>
      {hint && (
        <span className='font-normal text-light-secondary dark:text-dark-secondary'>
          {hint}
        </span>
      )}
      {error && (
        <span className='font-normal text-accent-red' role='alert'>
          {error}
        </span>
      )}
    </label>
  );
}
