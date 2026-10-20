import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('root');

if (container)
  createRoot(container).render(
    <RouterProvider resolveParams={resolveParams}>
      <App />
    </RouterProvider>
  );
