import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { SEO } from '@components/common/seo';
import { MaterialIcon } from '@components/ui/material-icon';
import { MainLayout } from '@components/layout/main-layout';
import { ProtectedLayout } from '@components/layout/common-layout';
import { SettingsFrame } from './settings-frame';
import type { ReactElement, ReactNode } from 'react';
import type { IconName } from '@components/ui/material-icon';

type SettingsShellProps = {
  title: string;
  seoTitle: string;
  description?: string;
  children: ReactNode;
};

/**
 * Contenu d'une rubrique des paramètres. La navigation reste fournie par
 * `SettingsFrame`, ce qui permet de garder les catégories visibles à gauche.
 */
export function SettingsShell({
  title,
  seoTitle,
  description,
  children
}: SettingsShellProps): JSX.Element {
  const { asPath, push } = useRouter();

  const handleBack = (): void => {
    void push('/settings');
  };

  return (
    <>
      <SEO title={seoTitle} />
      <div className='flex flex-col'>
        <header className='border-b border-light-border/70 px-4 py-5 dark:border-dark-border/70 xs:px-6'>
          <div className='flex items-start gap-3'>
            {asPath !== '/settings' && (
              <button
                aria-label='Retour aux réglages'
                className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-secondary transition-colors hover:bg-main-search-background hover:text-light-primary dark:text-dark-secondary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary'
                onClick={handleBack}
                title='Retour aux paramètres'
                type='button'
              >
                <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
              </button>
            )}
            <div className='min-w-0'>
              <h1 className='text-[1.25rem] leading-tight text-light-primary dark:text-dark-primary'>
                {title}
              </h1>
              {description && (
                <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
                  {description}
                </p>
              )}
            </div>
          </div>
        </header>
        <div className='flex flex-col gap-5 p-4 xs:p-6'>{children}</div>
      </div>
    </>
  );
}

type SettingsCardProps = {
  title?: string;
  description?: string;
  iconName?: IconName;
  danger?: boolean;
  className?: string;
  children: ReactNode;
};

export function SettingsCard({
  title,
  description,
  iconName,
  danger,
  className,
  children
}: SettingsCardProps): JSX.Element {
  return (
    <section
      className={cn(
        'flex flex-col gap-4 rounded-xl border bg-main-background p-4 transition-colors dark:bg-main-background xs:p-5',
        danger
          ? 'border-accent-red/40'
          : 'border-light-border dark:border-dark-border',
        className
      )}
    >
      {(title || iconName) && (
        <div className='flex items-start gap-3'>
          {iconName && (
            <span
              className={cn(
                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                danger
                  ? 'bg-accent-red/10 text-accent-red'
                  : 'bg-main-search-background text-light-secondary dark:text-dark-secondary'
              )}
            >
              <MaterialIcon className='h-5 w-5' iconName={iconName} />
            </span>
          )}
          <div className='flex flex-col gap-1'>
            {title && (
              <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
                {title}
              </h2>
            )}
            {description && (
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}

type SettingsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingsSection({
  title,
  description,
  children
}: SettingsSectionProps): JSX.Element {
  return (
    <section className='flex flex-col gap-2'>
      <div className='px-1'>
        <h2 className='text-base font-bold text-light-primary dark:text-dark-primary'>
          {title}
        </h2>
        {description && (
          <p className='mt-0.5 text-sm text-light-secondary dark:text-dark-secondary'>
            {description}
          </p>
        )}
      </div>
      <div className='overflow-hidden rounded-xl border border-light-border bg-main-background dark:border-dark-border'>
        <div className='divide-y divide-light-border dark:divide-dark-border'>
          {children}
        </div>
      </div>
    </section>
  );
}

type SettingsRowProps = {
  iconName: IconName;
  label: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  value?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
};

export function SettingsRow({
  iconName,
  label,
  description,
  href,
  onClick,
  value,
  disabled,
  danger,
  className
}: SettingsRowProps): JSX.Element {
  const interactive =
    !disabled && (href !== undefined || onClick !== undefined);

  const rowClassName = cn(
    'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors',
    interactive &&
      'cursor-pointer hover:bg-main-search-background/60 focus-visible:bg-main-search-background/60 focus-visible:outline-none dark:hover:bg-dark-primary/10 dark:focus-visible:bg-dark-primary/10',
    disabled && 'cursor-not-allowed opacity-60',
    className
  );

  const content = (
    <>
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          danger
            ? 'bg-accent-red/10 text-accent-red'
            : 'bg-main-search-background text-light-secondary dark:text-dark-secondary'
        )}
      >
        <MaterialIcon className='h-5 w-5' iconName={iconName} />
      </span>
      <span className='flex min-w-0 flex-1 flex-col'>
        <span
          className={cn(
            'text-sm font-semibold',
            danger
              ? 'text-accent-red'
              : 'text-light-primary dark:text-dark-primary'
          )}
        >
          {label}
        </span>
        {description && (
          <span className='mt-0.5 text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
            {description}
          </span>
        )}
      </span>
      {value !== undefined ? (
        <span className='max-w-[45%] truncate text-right text-sm font-semibold text-light-secondary dark:text-dark-secondary'>
          {value}
        </span>
      ) : disabled ? (
        <span className='shrink-0 rounded-full bg-main-search-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
          Bientôt
        </span>
      ) : interactive ? (
        <MaterialIcon
          className='h-5 w-5 shrink-0 text-light-secondary dark:text-dark-secondary'
          iconName='chevron_right'
        />
      ) : null}
    </>
  );

  if (href && !disabled)
    return (
      <Link href={href}>
        <a className={rowClassName}>{content}</a>
      </Link>
    );

  if (onClick && !disabled)
    return (
      <button className={rowClassName} onClick={onClick} type='button'>
        {content}
      </button>
    );

  return <div className={rowClassName}>{content}</div>;
}

export function settingsPageLayout(page: ReactElement): ReactNode {
  return (
    <ProtectedLayout>
      <MainLayout>
        <SettingsFrame>{page}</SettingsFrame>
      </MainLayout>
    </ProtectedLayout>
  );
}
