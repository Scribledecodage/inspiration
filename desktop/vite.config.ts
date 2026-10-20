import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { SITE_URL } from './src/site-url';
import type { Plugin } from 'vite';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');

/* Tailwind analyse les fichiers avec des globs : sur Windows, les chemins
   doivent Ãªtre sÃ©parÃ©s par des slashs, sinon aucun fichier n'est trouvÃ©. */
const glob = (...parts: string[]): string =>
  resolve(...parts).replace(/\\/g, '/');

/**
 * Charge immÃ©diatement toutes les images.
 *
 * Le site demande un chargement paresseux (Â« loading="lazy" Â»), ce qui est
 * adaptÃ© Ã  une page qui dÃ©file. Dans une fenÃªtre de bureau, Chrome remplace
 * les images par des rectangles gris et ne les charge jamais : les photos de
 * profil, les banniÃ¨res et les piÃ¨ces jointes restent invisibles.
 *
 * L'attribut est retirÃ© Ã  la compilation : le corriger aprÃ¨s coup (une fois
 * l'image dans la page) arrive trop tard, Chrome a dÃ©jÃ  mis l'image de cÃ´tÃ©.
 */
function eagerImages(): Plugin {
  return {
    name: 'inspiration-eager-images',
    enforce: 'post',
    apply: 'build',
    /* Le remplacement se fait sur le fichier final : le code du site vit
       en dehors du dossier de l'application, il n'est donc pas forcÃ©ment
       transformÃ© par le crochet habituel. */
    renderChunk(code: string) {
      /* Le code arrive avant la minification : l'attribut s'écrit
         « loading: "lazy" » (avec une espace). */
      if (!/loading:\s*"lazy"/.test(code)) return null;

      return {
        code: code.replace(/loading:\s*"lazy"/g, 'loading: "eager"'),
        map: null
      };
    }
  };
}

/**
 * L'application de bureau compile **le code du site**.
 *
 * Les composants, les pages, les contextes et la feuille de style sont
 * ceux du projet web : l'interface est donc rigoureusement la mÃªme, sans
 * duplication. Seuls les quatre modules Next.js utilisÃ©s par le site
 * (`link`, `image`, `router`, `head`) sont remplacÃ©s par des
 * Ã©quivalents locaux, Ã©crits pour l'application de bureau.
 */
export default defineConfig({
  plugins: [react(), eagerImages()],

  resolve: {
    alias: [
      // Les quatre dÃ©pendances Next.js, remplacÃ©es.
      { find: 'next/link', replacement: resolve(here, 'src/shims/link.tsx') },
      { find: 'next/image', replacement: resolve(here, 'src/shims/image.tsx') },
      {
        find: 'next/router',
        replacement: resolve(here, 'src/shims/router.tsx')
      },
      { find: 'next/head', replacement: resolve(here, 'src/shims/head.tsx') },

      // Le code du site.
      { find: '@site', replacement: resolve(site, 'src') },
      { find: '@components', replacement: resolve(site, 'src/components') },
      { find: '@lib', replacement: resolve(site, 'src/lib') },
      { find: '@styles', replacement: resolve(site, 'src/styles') }
    ],
    dedupe: [
      // Le code du site est compilÃ© ici : sans cela, ses imports
      // (Â« firebase/firestore Â»â€¦) seraient rÃ©solus depuis ses propres
      // node_modules, et l'application aurait deux copies du SDK Firebase
      // (les instanceof Ã©chouent, l'Ã©cran reste blanc).
      'react',
      'react-dom',
      'firebase',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/storage',
      'firebase/functions',
      'framer-motion',
      '@headlessui/react',
      'react-hot-toast',
      'clsx',
      'swr',
      'react-markdown',
      'react-textarea-autosize',
      'react-phone-number-input',
      'rehype-highlight',
      'rehype-katex',
      'remark-gfm',
      'remark-math',
      'katex',
      '@supabase/supabase-js',
      '@material-symbols/svg-400'
    ]
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV ?? 'production'
    ),
    'process.env.NEXT_PUBLIC_URL': JSON.stringify(SITE_URL),
    'process.env.NEXT_PUBLIC_USE_EMULATOR': JSON.stringify('false'),
    // Configuration publique du projet Firebase (identique Ã  celle du
    // site) : l'application de bureau parle au mÃªme projet.
    'process.env.NEXT_PUBLIC_API_KEY': JSON.stringify(
      'AIzaSyD7ybB8jjqNyV4SQ38hEVK71AuJUuf1h8E'
    ),
    'process.env.NEXT_PUBLIC_AUTH_DOMAIN': JSON.stringify(
      'mont2-tweet.firebaseapp.com'
    ),
    'process.env.NEXT_PUBLIC_PROJECT_ID': JSON.stringify('mont2-tweet'),
    'process.env.NEXT_PUBLIC_STORAGE_BUCKET': JSON.stringify(
      'mont2-tweet.firebasestorage.app'
    ),
    'process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID':
      JSON.stringify('261870386503'),
    'process.env.NEXT_PUBLIC_APP_ID': JSON.stringify(
      '1:261870386503:web:63092e30b24fb6b88b6062'
    ),
    'process.env.NEXT_PUBLIC_MEASUREMENT_ID': JSON.stringify('G-23TKH2B6S8')
  },

  css: {
    preprocessorOptions: {
      scss: {}
    },
    /* La configuration PostCSS est fournie ici, et non dans un fichier :
       Vite donnerait sinon la prioritÃ© Ã  celle du site parent (dont les
       chemins sont relatifs Ã  son dossier, et ne trouveraient rien).

       La configuration Tailwind de l'application de bureau reprend celle du
       site et dÃ©signe les fichiers Ã  analyser (chemins absolus : Tailwind
       les rÃ©sout depuis le dossier courant, qui n'est pas celui du site). */
    postcss: {
      plugins: [
        tailwindcss({ config: resolve(here, 'tailwind.config.cjs') }),
        autoprefixer()
      ]
    }
  },

  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // Le dossier Rust est surveillÃ© par cargo, pas par Vite.
      ignored: ['**/src-tauri/**']
    }
  },

  build: {
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 2500
  }
});
