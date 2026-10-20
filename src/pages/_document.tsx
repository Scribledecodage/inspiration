import { Html, Head, Main, NextScript } from 'next/document';
import { DEFAULT_FONT, fontStacks } from '@lib/fonts';

/* Les piles de polices sont injectées telles quelles dans le script ci-dessous
   pour que le premier rendu utilise déjà la bonne typographie (aucun
   clignotement au chargement). */
const serializedFontStacks = JSON.stringify(fontStacks);

export default function Document(): JSX.Element {
  return (
    <Html lang='fr'>
      <Head>
        <link rel='icon' type='image/png' href='/LogoSite.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
          rel='stylesheet'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              var theme = localStorage.getItem('theme') || 'auto';
              if (theme !== 'auto' && theme !== 'light' && theme !== 'dim' && theme !== 'dark') theme = 'auto';
              var palette = theme === 'auto'
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dim' : 'light')
                : theme;
              var root = document.documentElement;
              var isDark = palette === 'dim' || palette === 'dark';
              root.setAttribute('data-theme', palette);
              root.style.colorScheme = isDark ? 'dark' : 'light';
              root.classList.toggle('dark', isDark);
              root.style.setProperty('--main-background', 'var(--' + palette + '-background)');
              root.style.setProperty('--main-search-background', 'var(--' + palette + '-search-background)');
              root.style.setProperty('--main-sidebar-background', 'var(--' + palette + '-sidebar-background)');
              var accent = localStorage.getItem('accent') || 'blue';
              if (accent === 'yellow' || accent === 'cyan') accent = 'indigo';
              if (accent === 'orange') accent = 'red';
              root.style.setProperty('--main-accent', 'var(--accent-' + accent + ')');
              var fontStacks = ${serializedFontStacks};
              var font = localStorage.getItem('font') || '${DEFAULT_FONT}';
              if (font === 'outfit') font = 'manrope';
              if (font === 'chirp' || !fontStacks[font]) font = '${DEFAULT_FONT}';
              root.style.setProperty('--font-main', fontStacks[font]);
              root.style.setProperty('--font-title', fontStacks[font]);
              var shape = localStorage.getItem('avatarShape') || 'circle';
              root.setAttribute('data-avatar-shape', shape);
              var frame = localStorage.getItem('avatarFrame') || 'none';
              root.setAttribute('data-avatar-frame', frame);
            } catch (e) {}`
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
