import { useRouter } from 'next/router';
import Head from 'next/head';
import { siteURL } from '@lib/env';

type MainLayoutProps = {
  title: string;
  image?: string;
  description?: string;
};

export function SEO({
  title,
  image,
  description
}: MainLayoutProps): JSX.Element {
  const { asPath } = useRouter();
  const pageDescription =
    description ??
    'Découvrez Inspiration : partagez vos idées, échangez autour de vos centres d’intérêt et rapprochez-vous des autres.';
  const pageImage = image ?? '/Discussion.jpg';
  const siteOrigin = (siteURL || '').replace(/\/+$/, '');
  const absoluteImage = pageImage.startsWith('http')
    ? pageImage
    : `${siteOrigin}${pageImage.startsWith('/') ? pageImage : `/${pageImage}`}`;
  const pageURL = `${siteOrigin}${asPath === '/' ? '/' : asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={pageDescription} key='description' />
      <meta property='og:type' content='website' key='og:type' />
      <meta property='og:site_name' content='Inspiration' key='og:site_name' />
      <meta property='og:title' content={title} key='og:title' />
      <meta
        property='og:description'
        content={pageDescription}
        key='og:description'
      />
      <meta property='og:url' content={pageURL} key='og:url' />
      <meta property='og:image' content={absoluteImage} key='og:image' />
      <meta property='og:image:width' content='612' key='og:image:width' />
      <meta property='og:image:height' content='436' key='og:image:height' />
      <meta
        property='og:image:alt'
        content='Illustration de personnes qui échangent sur Inspiration'
        key='og:image:alt'
      />
      <meta
        name='twitter:card'
        content='summary_large_image'
        key='twitter:card'
      />
      <meta name='twitter:title' content={title} key='twitter:title' />
      <meta
        name='twitter:description'
        content={pageDescription}
        key='twitter:description'
      />
      <meta name='twitter:image' content={absoluteImage} key='twitter:image' />
      <meta
        name='twitter:image:alt'
        content='Illustration de personnes qui échangent sur Inspiration'
        key='twitter:image:alt'
      />
      <link rel='canonical' href={pageURL} key='canonical' />
    </Head>
  );
}
