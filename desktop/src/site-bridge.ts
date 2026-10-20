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
 *
 * Le site stocke les images avec une URL relative (« /api/image/… »), qui
 * ne veut rien dire dans la fenêtre de bureau : il faut la faire pointer
 * vers le site déployé.
 *
 * La correction se fait sur la propriété `src` elle-même, et non sur les
 * images déjà présentes dans la page : le site précharge certaines images
 * avec `new Image()` (hors du DOM) pour savoir quand elles sont prêtes,
 * et c'est précisément ce préchargement qui bloquait l'ouverture des
 * images en grand.
 */
function patchSourceProperty(
  prototype: object,
  property: 'src' | 'srcSet' | 'srcset',
  rewrite: (value: string) => string
): void {
  const descriptor = Object.getOwnPropertyDescriptor(prototype, property);

  if (!descriptor?.get || !descriptor.set) return;

  Object.defineProperty(prototype, property, {
    configurable: true,
    enumerable: descriptor.enumerable,
    get: descriptor.get,
    set(this: unknown, value: string) {
      descriptor.set!.call(this, rewrite(value));
    }
  });
}

function installSourceRewrite(): void {
  const rewrite = (value: string): string =>
    value && value.startsWith('/api/') ? absolute(value) : value;

  patchSourceProperty(HTMLImageElement.prototype, 'src', rewrite);
  patchSourceProperty(HTMLVideoElement.prototype, 'src', rewrite);
  patchSourceProperty(HTMLSourceElement.prototype, 'src', rewrite);
  patchSourceProperty(HTMLMediaElement.prototype, 'src', rewrite);
  patchSourceProperty(HTMLElement.prototype, 'srcset', rewrite);
}

/**
 * Charge immédiatement toutes les images.
 *
 * Le site demande un chargement paresseux (« loading="lazy" »), ce qui est
 * adapté à une page qui défile. Dans une fenêtre de bureau, Chrome remplace
 * les images par des rectangles gris et ne les charge jamais : les photos de
 * profil, les bannières et les pièces jointes restent invisibles.
 *
 * L'attribut est retiré à la compilation : le corriger après coup (une fois
 * l'image dans la page) arrive trop tard, Chrome a déjà mis l'image de côté.
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

  /* Les URL d'images sont corrigées à la source : les images créées hors du
     DOM (préchargement du site) sont corrigées elles aussi. */
  installSourceRewrite();

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
