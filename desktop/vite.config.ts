import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Le port 1420 est celui qu'attend la configuration Tauri (devUrl).
export default defineConfig({
  plugins: [preact()],
  clearScreen: false,
  css: {
    // L'application de bureau a sa propre feuille de style : on ignore
    // la configuration PostCSS/Tailwind du site parent (sinon Vite la
    // remonte depuis le dossier parent et casse le build).
    postcss: {
      plugins: []
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
    // Une seule cible : le code produit reste lisible et compact.
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 800
  }
});
