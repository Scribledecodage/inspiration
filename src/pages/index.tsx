import { AuthLayout } from '@components/layout/auth-layout';
import { SEO } from '@components/common/seo';
import { LoginMain } from '@components/login/login-main';
import { LoginFooter } from '@components/login/login-footer';
import type { ReactElement, ReactNode } from 'react';

export default function Login(): JSX.Element {
  return (
    <div className='grid min-h-screen grid-rows-[minmax(0,1fr),auto] bg-white text-light-primary lg:h-screen lg:min-h-0 lg:overflow-hidden'>
      <SEO
        title='Inspiration — Des idées et des rencontres qui rapprochent'
        description='Découvrez Inspiration : partagez vos idées, échangez autour de vos centres d’intérêt et rapprochez-vous des autres.'
        image='/Discussion.jpg'
      />
      <LoginMain />
      <LoginFooter />
    </div>
  );
}

Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);
