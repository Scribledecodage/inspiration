import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');

/**
 * L'application de bureau compile **le code du site**.
 *
 * Les composants, les pages, les contextes et la feuille de style sont
 * ceux du projet web : l'interface est donc rigoureusement la même, sans
 * duplication. Seuls les quatre modules Next.js utilisés par le site
 * (`link`, `image`, `router`, `head`) sont remplacés par des
 * équivalents locaux, écrits pour l'application de bureau.
 */
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      // Les quatre dépendances Next.js, remplacées.
      { find: 'next/link', replacement: resolve(here, 'src/shims/link.tsx') },
      { find: 'next/image', replacement: resolve(here, 'src/shims/image.tsx') },
      { find: 'next/router', replacement: resolve(here, 'src/shims/router.tsx') },
      { find: 'next/head', replacement: resolve(here, 'src/shims/head.tsx') },

      // Le code du site.
      { find: '@site', replacement: resolve(site, 'src') },
      { find: '@components', replacement: resolve(site, 'src/components') },
      { find: '@lib', replacement: resolve(site, 'src/lib') },
      { find: '@styles', replacement: resolve(site, 'src/styles') }
    ],
    dedupe: ['react', 'react-dom']
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV ?? 'production'
    ),
    'process.env.NEXT_PUBLIC_URL': JSON.stringify('https://u-social.vercel.app'),
    'process.env.NEXT_PUBLIC_USE_EMULATOR': JSON.stringify('false'),
    // Configuration publique du projet Firebase (identique à celle du
    // site) : l'application de bureau parle au même projet.
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
    'process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID': JSON.stringify(
      '261870386503'
    ),
    'process.env.NEXT_PUBLIC_APP_ID': JSON.stringify(
      '1:261870386503:web:63092e30b24fb6b88b6062'
    ),
    'process.env.NEXT_PUBLIC_MEASUREMENT_ID': JSON.stringify('G-23TKH2B6S8')
  },

  css: {
    preprocessorOptions: {
      scss: {}
    },
    postcss: {
      plugins: [
        tailwindcss({
          config: resolve(site, 'tailwind.config.js'),
          content: [
            resolve(site, 'src/pages/**/*.tsx'),
            resolve(site, 'src/components/**/*.tsx'),
            resolve(site, 'src/lib/**/*.ts'),
            resolve(here, 'src/**/*.tsx')
          ]
        }),
        autoprefixer()
      ]
    }
  },

  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // Le dossier Rust est surveillé par cargo, pas par Vite.
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
