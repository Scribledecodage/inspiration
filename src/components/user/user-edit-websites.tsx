import cn from 'clsx';
import { MAX_PROFILE_ENTRIES } from '@lib/profile-fields';
import { MaterialIcon } from '@components/ui/material-icon';

type UserEditWebsitesProps = {
  websites: string[];
  onChange: (websites: string[]) => void;
  errorMessage?: string;
};

/* Site web : une ou plusieurs cases (elles s'affichent toutes, les unes sous
   les autres, sur la page de profil). Les propositions automatiques du
   navigateur sont désactivées : plus de « https://google.com » qui traîne. */
export function UserEditWebsites({
  websites,
  onChange,
  errorMessage
}: UserEditWebsitesProps): JSX.Element {
  const rows = websites.length > 0 ? websites : [''];

  const updateRow = (index: number, value: string): void =>
    onChange(rows.map((row, rowIndex) => (rowIndex === index ? value : row)));

  const removeRow = (index: number): void => {
    const nextRows = rows.filter((_, rowIndex) => rowIndex !== index);
    onChange(nextRows.length > 0 ? nextRows : ['']);
  };

  const addRow = (): void => {
    if (rows.length >= MAX_PROFILE_ENTRIES) return;
    onChange([...rows, '']);
  };

  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-sm font-semibold text-light-secondary dark:text-dark-secondary'>
        Site web
      </span>

      {rows.map((row, index) => (
        <div key={index} className='relative flex items-center'>
          <span className='pointer-events-none absolute left-3 flex items-center text-light-secondary/70 dark:text-dark-secondary/70'>
            <MaterialIcon iconName='link' className='h-4 w-4' />
          </span>

          <input
            type='text'
            inputMode='url'
            spellCheck={false}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            maxLength={100}
            placeholder={
              index === 0 ? 'https://exemple.com' : 'https://autre-site.com'
            }
            value={row}
            onChange={(e): void => updateRow(index, e.target.value)}
            aria-label={
              index === 0 ? 'Site web' : `Site web numéro ${index + 1}`
            }
            className={cn(
              'w-full rounded-xl border bg-main-background py-2.5 pr-11 pl-9 text-sm outline-none transition focus:border-main-accent',
              errorMessage
                ? 'border-accent-red'
                : 'border-light-line-reply dark:border-dark-border'
            )}
          />

          {(row.trim().length > 0 || rows.length > 1) && (
            <button
              type='button'
              onClick={(): void => removeRow(index)}
              title='Retirer ce site'
              aria-label='Retirer ce site'
              className='absolute right-2 rounded-full p-1.5 text-light-secondary transition hover:bg-accent-red/10 hover:text-accent-red dark:text-dark-secondary'
            >
              <MaterialIcon iconName='close' className='h-4 w-4' />
            </button>
          )}
        </div>
      ))}

      <div className='flex items-center justify-between pt-0.5'>
        <button
          type='button'
          onClick={addRow}
          disabled={rows.length >= MAX_PROFILE_ENTRIES}
          className={cn(
            'inline-flex items-center gap-1 text-xs font-medium text-main-accent transition hover:underline',
            rows.length >= MAX_PROFILE_ENTRIES &&
              'cursor-not-allowed opacity-50'
          )}
        >
          <MaterialIcon iconName='add' className='h-3.5 w-3.5' />
          <span>Ajouter un site web</span>
        </button>

        {rows.length >= MAX_PROFILE_ENTRIES && (
          <span className='text-[11px] text-light-secondary dark:text-dark-secondary'>
            {MAX_PROFILE_ENTRIES} sites maximum
          </span>
        )}
      </div>

      {errorMessage && (
        <p className='text-sm text-accent-red'>{errorMessage}</p>
      )}
    </div>
  );
}
