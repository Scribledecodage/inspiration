import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import { MainLayout } from '@components/layout/main-layout';
import { HomeLayout } from '@components/layout/common-layout';
import { SiteLogo } from '@components/common/site-logo';
import { LoginFooter } from '@components/login/login-footer';
import { MaterialIcon } from '@components/ui/material-icon';
import { Button } from '@components/ui/button';
import type { ReactNode } from 'react';

type LegalLayoutProps = {
  children: ReactNode;
};

export function LegalLayout({ children }: LegalLayoutProps): JSX.Element {
  const { user, loading } = useAuth();
  const { back } = useRouter();

  if (user) {
    return (
      <MainLayout>
        <HomeLayout>{children}</HomeLayout>
      </MainLayout>
    );
  }

  return (
    <div className='flex min-h-[100dvh] flex-col justify-between bg-main-background text-light-primary dark:text-dark-primary'>
      <header className='glass-header sticky top-0 z-30 flex items-center justify-between border-b border-light-border/60 px-4 py-3 dark:border-dark-border/60 sm:px-8'>
        <div className='flex items-center gap-4'>
          <Button
            className='dark-bg-tab p-2 hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
            onClick={() => back()}
            aria-label='Retour'
          >
            <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
          </Button>
          <Link href='/'>
            <a className='flex items-center gap-3'>
              <SiteLogo size={28} />
              <span className='font-title text-xl font-bold tracking-tight'>Inspiration</span>
            </a>
          </Link>
        </div>
        <Link href='/'>
          <a className='rounded-full bg-main-accent px-4 py-1.5 text-sm font-bold text-white transition hover:bg-main-accent/90 active:scale-95'>
            Se connecter
          </a>
        </Link>
      </header>

      <main className='mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6'>
        {children}
      </main>

      <LoginFooter />
    </div>
  );
}
