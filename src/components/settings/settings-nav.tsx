import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';
import type { ChangeEvent } from 'react';
import type { IconName } from '@components/ui/material-icon';

type SettingsCategory = {
  key: string;
  label: string;
  iconName: IconName;
  href?: string;
  matches?: string[];
  disabled?: boolean;
  soon?: boolean;
};

type SettingsNavProps = {
  className?: string;
};

const categories: readonly SettingsCategory[] = [
  {
    key: 'account',
    label: 'Votre compte',
    iconName: 'person',
    href: '/settings?view=account',
    matches: ['/settings', '/settings/username', '/settings/personalization']
  },
  {
    key: 'monetization',
    label: 'Monétisation',
    iconName: 'payments',
    disabled: true
  },
  {
    key: 'premium',
    label: 'Premium',
    iconName: 'star',
    disabled: true
  },
  {
    key: 'creators',
    label: 'Abonnements de créateurs',
    iconName: 'subscriptions',
    disabled: true
  },
  {
    key: 'ai',
    label: 'Intelligence artificielle',
    iconName: 'auto_awesome_mosaic',
    href: '/settings/ai',
    matches: ['/settings/ai']
  },
  {
    key: 'security',
    label: 'Sécurité et accès au compte',
    iconName: 'key',
    href: '/settings/security',
    matches: ['/settings/security']
  },
  {
    key: 'privacy',
    label: 'Confidentialité et sécurité',
    iconName: 'lock',
    href: '/settings/privacy',
    matches: ['/settings/privacy']
  },
  {
    key: 'notifications',
    label: 'Notifications',
    iconName: 'notifications',
    href: '/settings/notifications',
    matches: ['/settings/notifications']
  },
  {
    key: 'accessibility',
    label: 'Accessibilité, affichage et langues',
    iconName: 'accessibility',
    href: '/settings/accessibility',
    matches: ['/settings/accessibility']
  },
  {
    key: 'resources',
    label: 'Ressources supplémentaires',
    iconName: 'help',
    disabled: true
  },
  {
    key: 'app',
    label: 'Télécharger l’application',
    iconName: 'download',
    href: '/settings/app',
    matches: ['/settings/app']
  },
  {
    key: 'help',
    label: 'Centre d’aide',
    iconName: 'support_agent',
    href: '/settings/help',
    matches: ['/settings/help']
  }
];

function isCategoryActive(
  category: SettingsCategory,
  pathname: string
): boolean {
  if (category.matches) return category.matches.includes(pathname);
  return Boolean(category.href && category.href.split('?')[0] === pathname);
}

export function SettingsNav({ className }: SettingsNavProps): JSX.Element {
  const { pathname } = useRouter();
  const [query, setQuery] = useState('');

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return categories;

    return categories.filter(({ label }) =>
      label.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <aside
      className={cn(
        'w-full shrink-0 border-b border-light-border/70 bg-main-background dark:border-dark-border/70 lg:sticky lg:top-0 lg:h-[100dvh] lg:w-[340px] lg:overflow-y-auto lg:border-b-0 lg:border-r',
        className
      )}
    >
      <div className='flex flex-col gap-4 px-4 py-5 xs:px-5'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-[1.25rem] leading-tight text-light-primary dark:text-dark-primary'>
            Réglages
          </h1>
          <p className='text-sm text-light-secondary dark:text-dark-secondary'>
            Gérez votre compte et vos préférences.
          </p>
        </div>

        <label className='flex items-center gap-2 rounded-full border border-transparent bg-main-search-background px-4 py-2.5 text-light-secondary transition focus-within:border-main-accent focus-within:ring-2 focus-within:ring-main-accent/20 dark:text-dark-secondary'>
          <MaterialIcon className='h-5 w-5 shrink-0' iconName='search' />
          <input
            aria-label='Rechercher dans les réglages'
            autoComplete='off'
            className='w-full bg-transparent text-sm text-light-primary outline-none placeholder:text-light-secondary dark:text-dark-primary dark:placeholder:text-dark-secondary'
            onChange={handleQueryChange}
            placeholder='Rechercher dans les réglages'
            spellCheck={false}
            type='search'
            value={query}
          />
        </label>
      </div>

      <nav
        aria-label='Catégories des paramètres'
        className='flex flex-col gap-0.5 px-2 pb-4 xs:px-3'
      >
        {visibleCategories.map((category) => {
          const active = isCategoryActive(category, pathname);
          const content = (
            <>
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
                  active
                    ? 'bg-main-accent/10 text-main-accent'
                    : 'bg-main-search-background/60 text-light-secondary dark:text-dark-secondary'
                )}
              >
                <MaterialIcon
                  className='h-5 w-5'
                  iconName={category.iconName}
                />
              </span>
              <span className='min-w-0 flex-1 truncate text-left'>
                {category.label}
              </span>
              {category.soon || category.disabled ? (
                <span className='shrink-0 rounded-full bg-main-search-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
                  Bientôt
                </span>
              ) : active ? (
                <span
                  aria-hidden='true'
                  className='h-2 w-2 shrink-0 rounded-full bg-main-accent'
                />
              ) : (
                <MaterialIcon
                  className='h-4 w-4 shrink-0 text-light-secondary/60 dark:text-dark-secondary/60'
                  iconName='chevron_right'
                />
              )}
            </>
          );

          if (category.disabled || !category.href)
            return (
              <div
                aria-disabled='true'
                className='flex cursor-not-allowed items-center gap-3 rounded-lg px-2.5 py-2 text-[15px] text-light-secondary/60 dark:text-dark-secondary/60'
                key={category.key}
                title='Bientôt disponible'
              >
                {content}
              </div>
            );

          return (
            <Link href={category.href} key={category.key}>
              <a
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-2.5 py-2 text-[15px] transition-colors',
                  active
                    ? 'bg-main-search-background font-semibold text-light-primary dark:text-dark-primary'
                    : 'text-light-primary hover:bg-main-search-background/60 dark:text-dark-primary dark:hover:bg-dark-primary/10'
                )}
              >
                {content}
              </a>
            </Link>
          );
        })}

        {visibleCategories.length === 0 && (
          <p className='px-3 py-6 text-center text-sm text-light-secondary dark:text-dark-secondary'>
            Aucun réglage ne correspond à « {query.trim()} ».
          </p>
        )}
      </nav>
    </aside>
  );
}
