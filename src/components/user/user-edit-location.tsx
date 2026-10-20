import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { MAX_PROFILE_ENTRIES } from '@lib/profile-fields';
import { MaterialIcon } from '@components/ui/material-icon';

type SuggestionItem = {
  label: string;
  city?: string;
  country?: string;
};

type UserEditLocationProps = {
  locations: string[];
  onChange: (locations: string[]) => void;
};

/* Lieu de résidence : une ou plusieurs cases, chacune avec la recherche de
   vraies villes. Le bouton « Ma position » et le « Tout supprimer » ont été
   retirés : chaque case se retire toute seule avec sa petite croix. */
export function UserEditLocation({
  locations,
  onChange
}: UserEditLocationProps): JSX.Element {
  const rows = locations.length > 0 ? locations : [''];
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeValue = openIndex === null ? '' : rows[openIndex] ?? '';

  // Un clic à l'extérieur referme la liste de villes.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setOpenIndex(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recherche (différée) des villes réelles pour la case sélectionnée.
  useEffect(() => {
    const query = activeValue.trim();

    if (openIndex === null || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      void (async (): Promise<void> => {
        setIsSearching(true);
        try {
          const res = await fetch(
            `/api/location/suggest?q=${encodeURIComponent(query)}`
          );
          if (res.ok) {
            const data = (await res.json()) as {
              suggestions?: SuggestionItem[];
            };
            setSuggestions(data.suggestions ?? []);
          }
        } catch {
          // Pas de réseau : la saisie libre reste possible.
        } finally {
          setIsSearching(false);
        }
      })();
    }, 280);

    return () => clearTimeout(timer);
  }, [activeValue, openIndex]);

  const updateRow = (index: number, value: string): void =>
    onChange(rows.map((row, rowIndex) => (rowIndex === index ? value : row)));

  const removeRow = (index: number): void => {
    const nextRows = rows.filter((_, rowIndex) => rowIndex !== index);
    onChange(nextRows.length > 0 ? nextRows : ['']);
    setSuggestions([]);
    setOpenIndex(null);
  };

  const addRow = (): void => {
    if (rows.length >= MAX_PROFILE_ENTRIES) return;
    onChange([...rows, '']);
    setOpenIndex(rows.length);
  };

  const handleSelect = (index: number, value: string): void => {
    updateRow(index, value);
    setSuggestions([]);
    setOpenIndex(null);
  };

  return (
    <div ref={containerRef} className='flex flex-col gap-1.5'>
      <span className='text-sm font-semibold text-light-secondary dark:text-dark-secondary'>
        Lieu de résidence
      </span>

      {rows.map((row, index) => (
        <div key={index} className='relative flex items-center'>
          <span className='pointer-events-none absolute left-3 flex items-center text-light-secondary/70 dark:text-dark-secondary/70'>
            <MaterialIcon iconName='location_on' className='h-4 w-4' />
          </span>

          <input
            type='text'
            maxLength={60}
            autoComplete='off'
            placeholder={index === 0 ? 'Ex. Paris, France' : 'Autre lieu…'}
            value={row}
            onChange={(e): void => updateRow(index, e.target.value)}
            onFocus={(): void => setOpenIndex(index)}
            aria-label={
              index === 0
                ? 'Lieu de résidence'
                : `Lieu de résidence ${index + 1}`
            }
            className='w-full rounded-xl border border-light-line-reply bg-main-background py-2.5 pr-16 pl-9 text-sm outline-none transition focus:border-main-accent dark:border-dark-border'
          />

          <div className='absolute right-2 flex items-center gap-0.5'>
            {isSearching && openIndex === index && (
              <span className='inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-main-accent border-t-transparent' />
            )}

            {(row.trim().length > 0 || rows.length > 1) && (
              <button
                type='button'
                onClick={(): void => removeRow(index)}
                title='Retirer ce lieu'
                aria-label='Retirer ce lieu'
                className='rounded-full p-1.5 text-light-secondary transition hover:bg-accent-red/10 hover:text-accent-red dark:text-dark-secondary'
              >
                <MaterialIcon iconName='close' className='h-4 w-4' />
              </button>
            )}
          </div>

          {openIndex === index && suggestions.length > 0 && (
            <div className='absolute top-full left-0 z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-light-border bg-main-background shadow-xl dark:border-dark-border'>
              <ul className='divide-y divide-light-border dark:divide-dark-border'>
                {suggestions.map((item, itemIndex) => (
                  <li key={`${item.label}-${itemIndex}`}>
                    <button
                      type='button'
                      onClick={(): void => handleSelect(index, item.label)}
                      className='flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-main-accent/10'
                    >
                      <MaterialIcon
                        iconName='location_on'
                        className='h-4 w-4 shrink-0 text-light-secondary'
                      />
                      <span className='min-w-0 flex-1 truncate font-medium text-light-primary dark:text-dark-primary'>
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
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
            rows.length >= MAX_PROFILE_ENTRIES && 'cursor-not-allowed opacity-50'
          )}
        >
          <MaterialIcon iconName='add' className='h-3.5 w-3.5' />
          <span>Ajouter un lieu</span>
        </button>

        {rows.length >= MAX_PROFILE_ENTRIES && (
          <span className='text-[11px] text-light-secondary dark:text-dark-secondary'>
            {MAX_PROFILE_ENTRIES} lieux maximum
          </span>
        )}
      </div>
    </div>
  );
}
