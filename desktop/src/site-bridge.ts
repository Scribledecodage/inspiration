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
 * Rend absolues les URL d'images relatives du site.
 */
function rewriteImages(root: ParentNode): void {
  const images = root.querySelectorAll?.('img[src^="/api/"]');

  if (!images) return;

  images.forEach((image) => {
    const source = image.getAttribute('src');

    if (source) image.setAttribute('src', absolute(source));
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
    attributeFilter: ['src']
  });

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', () => rewriteImages(document));
  else rewriteImages(document);
}
