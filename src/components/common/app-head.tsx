import Head from 'next/head';
import { siteURL } from '@lib/env';

const shareTitle = 'Inspiration — Des idées et des rencontres qui rapprochent';
const shareDescription =
  'Découvrez Inspiration : partagez vos idées, échangez autour de vos centres d’intérêt et rapprochez-vous des autres.';
const siteOrigin = (siteURL || '').replace(/\/+$/, '');
const shareImage = `${siteOrigin}/Discussion.jpg`;

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>{shareTitle}</title>
      {/* Balise de fenêtre explicite : sans `initial-scale` ni `shrink-to-fit=no`,
          iOS et Android peuvent recalculer l'échelle de la page quand un contenu
          déborde horizontalement (cas du glissement entre sections) et donc
          rétrécir toute l'interface — barre du bas comprise — le temps du geste. */}
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
      <meta name='description' content={shareDescription} key='description' />
      <meta property='og:type' content='website' key='og:type' />
      <meta property='og:site_name' content='Inspiration' key='og:site_name' />
      <meta property='og:title' content={shareTitle} key='og:title' />
      <meta
        property='og:description'
        content={shareDescription}
        key='og:description'
      />
      <meta property='og:image' content={shareImage} key='og:image' />
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
      <meta name='twitter:title' content={shareTitle} key='twitter:title' />
      <meta
        name='twitter:description'
        content={shareDescription}
        key='twitter:description'
      />
      <meta name='twitter:image' content={shareImage} key='twitter:image' />
      <meta
        name='twitter:image:alt'
        content='Illustration de personnes qui échangent sur Inspiration'
        key='twitter:image:alt'
      />
      <link rel='icon' type='image/png' href='/LogoSite.png' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
    </Head>
  );
}
