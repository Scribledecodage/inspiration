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

/* ------------------------------------------------------------------ */
/* Les URL d'images                                                   */
/* ------------------------------------------------------------------ */

/**
 * Rend absolue une URL d'image du site.
 *
 * Le site stocke les images avec une URL relative (« /api/image/… »), qui ne
 * veut rien dire dans la fenêtre de bureau : elle pointe sur la fenêtre
 * elle-même et ne renvoie jamais rien.
 */
function rewriteUrl(url: string): string {
  return url && url.startsWith('/api/') ? absolute(url) : url;
}

/**
 * Idem pour une liste d'URL (« srcset »), qui peut contenir plusieurs
 * candidats séparés par des virgules, chacun suivi de son descripteur.
 */
function rewriteSrcset(value: string): string {
  if (!value || !value.includes('/api/')) return value;

  return value
    .split(',')
    .map((candidate) => {
      const trimmed = candidate.trim();
      const separator = trimmed.search(/\s/);
      const url = separator === -1 ? trimmed : trimmed.slice(0, separator);
      const descriptor = separator === -1 ? '' : trimmed.slice(separator);

      return `${rewriteUrl(url)}${descriptor}`;
    })
    .join(', ');
}

/**
 * Intercepte l'affectation d'une source d'image.
 *
 * La correction se fait sur la propriété elle-même, et pas seulement sur les
 * images déjà présentes dans la page : le site précharge certaines images
 * avec `new Image()` (hors du DOM) pour savoir quand elles sont prêtes, et
 * c'est précisément ce préchargement qui bloquait l'ouverture des images en
 * grand (le modal restait bloqué sur son indicateur de chargement).
 */
function patchSourceProperty(
  prototype: object,
  property: 'src' | 'srcSet',
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
  patchSourceProperty(HTMLImageElement.prototype, 'src', rewriteUrl);
  patchSourceProperty(HTMLImageElement.prototype, 'srcSet', rewriteSrcset);
  patchSourceProperty(HTMLMediaElement.prototype, 'src', rewriteUrl);
  patchSourceProperty(HTMLMediaElement.prototype, 'srcSet', rewriteSrcset);
  patchSourceProperty(HTMLSourceElement.prototype, 'src', rewriteUrl);
  patchSourceProperty(HTMLSourceElement.prototype, 'srcSet', rewriteSrcset);

  /* React écrit les sources avec `setAttribute` et non avec la propriété :
     il faut donc aussi intercepter les attributs. */
  const originalSetAttribute = Element.prototype.setAttribute;

  Element.prototype.setAttribute = function (
    name: string,
    value: string
  ): void {
    if (typeof value === 'string') {
      const attribute = name.toLowerCase();

      if (attribute === 'src') {
        originalSetAttribute.call(this, name, rewriteUrl(value));
        return;
      }

      if (attribute === 'srcset') {
        originalSetAttribute.call(this, name, rewriteSrcset(value));
        return;
      }
    }

    originalSetAttribute.call(this, name, value);
  };
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
  const elements = root.querySelectorAll?.('img, source, video');

  if (!elements) return;

  elements.forEach((element) => {
    const source = element.getAttribute('src');

    if (source && source.startsWith('/api/'))
      element.setAttribute('src', absolute(source));

    const sourceSet = element.getAttribute('srcset');

    if (sourceSet) element.setAttribute('srcset', rewriteSrcset(sourceSet));

    if (element.getAttribute('loading') === 'lazy')
      element.setAttribute('loading', 'eager');
  });
}

export function installSiteBridge(): void {
  /* Les URL d'images sont corrigées à la source : les images créées hors du
     DOM (préchargement du site) sont corrigées elles aussi. */
  installSourceRewrite();

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

  /* Les images déjà dans la page. */
  const observer = new MutationObserver(() => rewriteImages(document));

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'srcset', 'loading']
  });

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', () =>
      rewriteImages(document)
    );
  else rewriteImages(document);
}
