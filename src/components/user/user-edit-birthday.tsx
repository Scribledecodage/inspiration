import { useRef } from 'react';
import cn from 'clsx';
import type { ChangeEvent, KeyboardEvent } from 'react';

export type BirthdayParts = {
  day: string;
  month: string;
  year: string;
};

type UserEditBirthdayProps = {
  birthdayParts: BirthdayParts;
  setBirthdayParts: (parts: BirthdayParts) => void;
  birthdayError?: string;
};

/* Date de naissance : trois cases simples (jour, mois, année), avec
   l'étiquette au-dessus et une saisie qui passe toute seule à la case
   suivante. L'année s'écrit sur 2 ou 4 chiffres (95 → 1995). */
export function UserEditBirthday({
  birthdayParts,
  setBirthdayParts,
  birthdayError
}: UserEditBirthdayProps): JSX.Element {
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setBirthdayParts({ ...birthdayParts, day: raw });
    if (raw.length === 2) monthRef.current?.focus();
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setBirthdayParts({ ...birthdayParts, month: raw });
    if (raw.length === 2) yearRef.current?.focus();
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setBirthdayParts({ ...birthdayParts, year: raw });
  };

  const handleKeyDown =
    (field: 'day' | 'month' | 'year') =>
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Backspace')
        if (field === 'month' && !birthdayParts.month) dayRef.current?.focus();
        else if (field === 'year' && !birthdayParts.year)
          monthRef.current?.focus();
    };

  const inputClass = cn(
    `w-full rounded-xl border bg-main-background px-3 py-2.5 text-center text-[15px]
     font-semibold tabular-nums outline-none transition
     placeholder:font-normal placeholder:text-light-secondary/50
     focus:border-main-accent focus:ring-1 focus:ring-main-accent`,
    birthdayError
      ? 'border-accent-red'
      : 'border-light-line-reply dark:border-dark-border'
  );

  const fields = [
    {
      id: 'birth-day',
      label: 'Jour',
      placeholder: 'JJ',
      value: birthdayParts.day,
      maxLength: 2,
      ref: dayRef,
      onChange: handleDayChange,
      onKeyDown: handleKeyDown('day'),
      ariaLabel: 'Jour de naissance (JJ)'
    },
    {
      id: 'birth-month',
      label: 'Mois',
      placeholder: 'MM',
      value: birthdayParts.month,
      maxLength: 2,
      ref: monthRef,
      onChange: handleMonthChange,
      onKeyDown: handleKeyDown('month'),
      ariaLabel: 'Mois de naissance (MM)'
    },
    {
      id: 'birth-year',
      label: 'Année',
      placeholder: 'AAAA',
      value: birthdayParts.year,
      maxLength: 4,
      ref: yearRef,
      onChange: handleYearChange,
      onKeyDown: handleKeyDown('year'),
      ariaLabel: 'Année de naissance (AA ou AAAA)'
    }
  ] as const;

  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-sm font-semibold text-light-secondary dark:text-dark-secondary'>
        Date de naissance
      </span>

      <div className='grid grid-cols-3 gap-2'>
        {fields.map((field) => (
          <label
            key={field.id}
            htmlFor={field.id}
            className='flex min-w-0 flex-col gap-1'
          >
            <span className='pl-0.5 text-[11px] font-medium text-light-secondary dark:text-dark-secondary'>
              {field.label}
            </span>

            <input
              ref={field.ref}
              id={field.id}
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              autoComplete='off'
              maxLength={field.maxLength}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              onKeyDown={field.onKeyDown}
              aria-label={field.ariaLabel}
              className={inputClass}
            />
          </label>
        ))}
      </div>

      {birthdayError ? (
        <p className='text-xs text-accent-red'>{birthdayError}</p>
      ) : (
        <p className='text-[11px] text-light-secondary dark:text-dark-secondary'>
          L’année peut s’écrire sur 2 ou 4 chiffres (ex. 95 ou 1995).
        </p>
      )}
    </div>
  );
}
