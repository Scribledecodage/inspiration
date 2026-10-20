import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';
import type { ReactNode } from 'react';
import type { IconName } from '@components/ui/material-icon';

/* Action d'une fenêtre de choix : une case large avec une icône (ou un petit
   aperçu), son libellé, et ce qu'elle déclenche. Elle est affichée au-dessus
   des choix, comme un menu d'actions. */
export type AvatarPickerAction = {
  /* Identifiant de l'action (sert de clé d'affichage). */
  key: string;
  label: string;
  /* Précision affichée sous le libellé. */
  description?: string;
  iconName?: IconName;
  /* Petit aperçu affiché à la place de l'icône. */
  preview?: ReactNode;
  /* Case mise en couleur : l'action principale de la fenêtre. */
  accent?: boolean;
  /* Case cochée (elle correspond au choix affiché aujourd'hui). */
  selected?: boolean;
  onSelect: () => void;
};

type AvatarPickerModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  /* [clé, nom affiché] pour chaque choix. */
  options: ReadonlyArray<[string, string]>;
  value: string;
  gridClass?: string;
  /* Cases d'action affichées au-dessus des choix (facultatif). */
  actions?: ReadonlyArray<AvatarPickerAction>;
  /* Titre de la liste des choix (facultatif). */
  optionsTitle?: string;
  onClose: () => void;
  onSelect: (key: string) => void;
  /* Aperçu de chaque choix (la photo découpée dans la forme, la décoration
     posée autour, …). */
  renderPreview: (key: string) => ReactNode;
};

/* Choix de l'avatar (forme, cadre ou photo) : une fenêtre centrée sur
   ordinateur, un menu qui remonte du bas sur téléphone. Le contenu est affiché
   dans le corps de la page (portail), pour ne jamais être rogné par la fenêtre
   de modification du profil dans laquelle il est ouvert. */
export function AvatarPickerModal({
  open,
  title,
  subtitle,
  options,
  value,
  gridClass,
  actions,
  optionsTitle,
  onClose,
  onSelect,
  renderPreview
}: AvatarPickerModalProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  useEffect((): void => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[70] flex items-end justify-center xs:items-center xs:p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          role='presentation'
        >
          <div
            className='absolute inset-0 bg-black/40 dark:bg-[#5B7083]/40'
            aria-hidden='true'
          />

          <motion.div
            className='relative flex max-h-[88dvh] w-full max-w-md flex-col overflow-y-auto overscroll-contain
                       rounded-t-2xl border-t border-light-border bg-main-background p-5
                       pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl
                       dark:border-dark-border xs:max-h-[80vh] xs:rounded-md xs:border xs:pb-5'
            initial={{ y: 40, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            onClick={(event): void => event.stopPropagation()}
            role='dialog'
            aria-label={title}
          >
            <span
              className='mx-auto mb-3 h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50 xs:hidden'
              aria-hidden='true'
            />

            <header className='mb-4 flex items-start justify-between gap-4'>
              <div className='flex flex-col'>
                <h2 className='text-base font-bold text-light-primary dark:text-dark-primary'>
                  {title}
                </h2>
                {subtitle && (
                  <p className='mt-0.5 text-sm text-light-secondary dark:text-dark-secondary'>
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                type='button'
                onClick={onClose}
                aria-label='Fermer'
                className='-mr-2 -mt-2 rounded-full p-2 text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
              >
                <MaterialIcon className='h-5 w-5' iconName='close' />
              </button>
            </header>

            {actions && actions.length > 0 && (
              <div className='mb-4 flex flex-col gap-2'>
                {actions.map((action) => (
                  <button
                    key={action.key}
                    type='button'
                    aria-pressed={action.selected}
                    onClick={action.onSelect}
                    className={cn(
                      'group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition',
                      action.accent
                        ? 'border-main-accent/40 bg-main-accent/[0.07] hover:border-main-accent/70 hover:bg-main-accent/[0.14]'
                        : 'border-light-border hover:border-light-line-reply hover:bg-light-primary/[0.03] dark:border-dark-border dark:hover:border-dark-line-reply dark:hover:bg-dark-primary/[0.04]'
                    )}
                  >
                    <span
                      className={cn(
                        'relative flex h-11 w-11 shrink-0 items-center justify-center',
                        action.accent
                          ? 'text-main-accent'
                          : 'rounded-full bg-light-primary/[0.06] text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                      )}
                    >
                      {action.preview ??
                        (action.iconName && (
                          <MaterialIcon
                            className='h-5 w-5'
                            iconName={action.iconName}
                          />
                        ))}
                    </span>

                    <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
                      <span className='truncate text-sm font-bold text-light-primary dark:text-dark-primary'>
                        {action.label}
                      </span>
                      {action.description && (
                        <span className='truncate text-xs text-light-secondary dark:text-dark-secondary'>
                          {action.description}
                        </span>
                      )}
                    </span>

                    {action.selected ? (
                      <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-main-accent text-white'>
                        <MaterialIcon className='h-3 w-3' iconName='check' />
                      </span>
                    ) : (
                      <MaterialIcon
                        className='h-4 w-4 shrink-0 text-light-secondary transition group-hover:translate-x-0.5 dark:text-dark-secondary'
                        iconName='chevron_right'
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {optionsTitle && options.length > 0 && (
              <p className='mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
                {optionsTitle}
              </p>
            )}

            <div
              className={cn(
                'grid gap-3',
                gridClass ?? 'grid-cols-2 xs:grid-cols-3'
              )}
            >
              {options.map(([key, label]) => {
                const isSelected = value === key;

                return (
                  <button
                    key={key}
                    type='button'
                    aria-pressed={isSelected}
                    onClick={(): void => onSelect(key)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-md border px-2 py-4 text-center text-[11px] leading-none transition-colors duration-150',
                      isSelected
                        ? 'border-main-accent bg-main-accent/10 font-bold text-main-accent'
                        : 'border-light-border text-light-secondary hover:bg-light-primary/5 hover:text-light-primary dark:border-dark-border dark:text-dark-secondary dark:hover:bg-dark-primary/5 dark:hover:text-dark-primary'
                    )}
                  >
                    <span className='relative flex h-12 items-center justify-center'>
                      {renderPreview(key)}

                      {isSelected && (
                        <span className='absolute -right-1.5 -top-0.5 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-main-accent text-white ring-2 ring-main-background'>
                          <MaterialIcon
                            className='h-2.5 w-2.5'
                            iconName='check'
                          />
                        </span>
                      )}
                    </span>

                    <span className='max-w-full truncate'>{label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
