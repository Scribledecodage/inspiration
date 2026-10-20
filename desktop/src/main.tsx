import { createRoot } from 'react-dom/client';
import { invoke } from '@tauri-apps/api/core';
import './fonts/fonts.css';
import './fonds.css';
import '@styles/globals.scss';
import 'katex/dist/katex.min.css';
import 'react-phone-number-input/style.css';
import { RouterProvider } from './shims/router';
import { resolveParams } from './routes';
import { installSiteBridge } from './site-bridge';
import App from './app';

/* Les requêtes adressées au serveur du site (images, GIF, tendances) sont
   dirigées vers le site déployé. */
installSiteBridge();

/* Le site partage son code avec l'application de bureau : les fonctions
   qui n'existent que dans l'application (ici : le fond transparent de la
   fenêtre) sont publiées pour qu'il puisse les utiliser. */
window.__INSPIRATION_DESKTOP__ = {
  setTransparentWindow: (enabled: boolean, color?: string): void => {
    void invoke('set_window_transparency', { enabled, color: color ?? null });
  }
};

const container = document.getElementById('root');

if (container)
  createRoot(container).render(
    <RouterProvider resolveParams={resolveParams}>
      <App />
    </RouterProvider>
  );
