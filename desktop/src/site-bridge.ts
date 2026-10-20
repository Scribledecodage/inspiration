import { fetch as nativeFetch } from '@tauri-apps/plugin-http';
import { SITE_URL } from './site-url';

/**
 * Pont vers le site.
 *
 * L'application de bureau n'a pas de serveur : les quelques requêtes que
 * le site adresse à son propre serveur (téléversement d'images, d'avatars
 * et de bannières, GIF, tendances, assistant) sont donc dirigées vers le
 * site déployé.
 *
 * Ces requêtes passent par la couche native (Rust) : elles ne sont donc pas
 * soumises aux règles CORS du navigateur, qui refuseraient les requêtes
 * faites depuis l'application vers un autre domaine.
 *
 * Les images des publications sont stockées avec une URL relative
 * (« /api/image/… ») : on la rend absolue au passage.
 */

function isApiPath(url: string): boolean {
  return url.startsWith('/api/') || url.startsWith('api/');
}

function absolute(url: string): string {
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * Rend absolues les URL d'images relatives du site, et charge immédiatement
 * les images.
 *
 * Deux adjustments sont nécessaires dans une fenêtre de bureau :
 *
 *  - les images du site sont stockées avec une URL relative
 *    (« /api/image/… ») : il faut la rendre absolue, sinon elle pointe
 *    sur la fenêtre elle-même et ne renvoie rien ;
 *  - le site demande un chargement paresseux (« loading="lazy" »). Sur une
 *    page qui défile, c'est utile ; dans une fenêtre fixe, Chrome remplace
 *    les images par des rectangles gris et ne les charge jamais. On les
 *    charge donc immédiatement.
 */
function rewriteImages(root: ParentNode): void {
  const images = root.querySelectorAll?.('img');

  if (!images) return;

  images.forEach((image) => {
    const source = image.getAttribute('src');

    if (source && source.startsWith('/api/'))
      image.setAttribute('src', absolute(source));

    if (image.getAttribute('loading') === 'lazy')
      image.setAttribute('loading', 'eager');
  });
}

export function installSiteBridge(): void {
  /* Les appels à l'API du site, passés par la couche native. */
  const originalFetch = window.fetch.bind(window);

  window.fetch = (async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    if (typeof input === 'string' && isApiPath(input))
      return nativeFetch(absolute(input), init);

    if (input instanceof Request && isApiPath(input.url))
      return nativeFetch(absolute(input.url), init);

    return originalFetch(input, init);
  }) as typeof window.fetch;

  /* Les images publications. */
  const observer = new MutationObserver(() => rewriteImages(document));

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'loading']
  });

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', () =>
      rewriteImages(document)
    );
  else rewriteImages(document);
}
