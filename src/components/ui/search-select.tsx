import { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';

export type SearchSelectOption = {
  value: string;
  label: string;
  /** Information courte affichée à droite (prix, taille…). */
  hint?: string;
  /** Étiquette mise en avant (« gratuit », « nouveau »). */
  badge?: string;
  /** Le modèle est-il gratuit ? */
  free?: boolean;
};

type SearchSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SearchSelectOption[];
  /** Texte affiché quand rien n'est choisi. */
  placeholder?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  /* Autorise à retenir une valeur absente de la liste (identifiant tapé). */
  allowCustom?: boolean;
};

/**
 * Liste déroulante avec recherche.
 *
 * Elle remplace le `<select>` du navigateur : celui-ci ne se style pas, ne
 * se cherche pas, et ne permet pas de montrer des informations sur chaque
 * entrée (prix, fraîcheur…).
 */
export function SearchSelect({
  value,
  onChange,
  options,
  placeholder = 'Choisir',
  searchPlaceholder = 'Rechercher…',
  emptyLabel = 'Aucun résultat',
  disabled,
  loading,
  className,
  allowCustom
}: SearchSelectProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((option) => option.value === value);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) return options;

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(needle) ||
        option.value.toLowerCase().includes(needle)
    );
  }, [options, query]);

  /* Quand la recherche ne tombe sur rien, on propose de retenir la valeur
     tapée : c'est utile pour un modèle qui vient d'arriver et n'est pas
     encore dans la liste. */
  const customValue = query.trim();
  const canUseCustom =
    allowCustom &&
    customValue.length > 1 &&
    !options.some(
      (option) => option.value.toLowerCase() === customValue.toLowerCase()
    );

  /* La liste se referme dès qu'on clique ailleurs. */
  useEffect(() => {
    if (!open) return;

    const handleOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;

      if (!target?.closest('[data-search-select]')) setOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);

    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }

    searchRef.current?.focus();
  }, [open]);

  return (
    <div className={cn('relative', className)} data-search-select>
      <button
        aria-expanded={open}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-left text-sm outline-none transition',
          'focus:border-main-accent focus:ring-2 focus:ring-main-accent/20',
          'dark:border-dark-line-reply dark:text-dark-primary',
          disabled && 'cursor-not-allowed opacity-60'
        )}
        disabled={disabled}
        onClick={(): void => setOpen((current) => !current)}
        type='button'
      >
        <span className='min-w-0 flex-1 truncate'>
          {selected ? (
            <span className='flex items-center gap-2'>
              <span className='truncate'>{selected.label}</span>
              {selected.badge && (
                <span className='shrink-0 rounded-full bg-main-accent/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-main-accent'>
                  {selected.badge}
                </span>
              )}
            </span>
          ) : (
            <span className='text-light-secondary dark:text-dark-secondary'>
              {placeholder}
            </span>
          )}
        </span>
        {loading ? (
          <CustomIcon
            className='h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary'
            iconName='SpinnerIcon'
          />
        ) : (
          <MaterialIcon
            className='h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary'
            iconName='keyboard_arrow_down'
          />
        )}
      </button>

      {open && (
        <div className='absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-light-border bg-main-background shadow-xl dark:border-dark-border'>
          <div className='border-b border-light-border p-2 dark:border-dark-border'>
            <input
              className='w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply dark:text-dark-primary'
              onChange={(event): void => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              ref={searchRef}
              type='text'
              value={query}
            />
          </div>

          <div className='max-h-64 overflow-y-auto overscroll-contain p-1'>
            {filtered.length || canUseCustom ? (
              <>
                {canUseCustom && (
                  <button
                    className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-light-primary transition hover:bg-main-search-background dark:text-dark-primary dark:hover:bg-dark-primary/10'
                    onClick={(): void => {
                      onChange(customValue);
                      setOpen(false);
                    }}
                    type='button'
                  >
                    <span className='min-w-0 flex-1 truncate'>
                      Utiliser « {customValue} »
                    </span>
                  </button>
                )}
                {filtered.map((option) => (
                  <button
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition',
                      option.value === value
                        ? 'bg-main-accent/10 font-semibold text-main-accent'
                        : 'text-light-primary hover:bg-main-search-background dark:text-dark-primary dark:hover:bg-dark-primary/10'
                    )}
                    key={option.value}
                    onClick={(): void => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    type='button'
                  >
                    <span className='min-w-0 flex-1 truncate'>{option.label}</span>
                    {option.free && (
                      <span className='shrink-0 rounded-full bg-main-accent/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-main-accent'>
                        Gratuit
                      </span>
                    )}
                    {option.badge && !option.free && (
                      <span className='shrink-0 rounded-full bg-main-search-background px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-light-secondary dark:bg-dark-primary/10 dark:text-dark-secondary'>
                        {option.badge}
                      </span>
                    )}
                    {option.hint && (
                      <span className='shrink-0 text-xs text-light-secondary dark:text-dark-secondary'>
                        {option.hint}
                      </span>
                    )}
                  </button>
                ))}
              </>
            ) : (
              <p className='px-3 py-4 text-center text-sm text-light-secondary dark:text-dark-secondary'>
                {emptyLabel}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
