/**
 * Adresses de l'application de bureau.
 *
 * À changer en même temps que le déploiement et que le dépôt GitHub.
 */

/**
 * Site déployé : l'application appelle ses API (images, GIF, tendances).
 *
 * On utilise l'alias de production (« <projet>.vercel.app ») et non
 * l'adresse d'un déploiement : l'alias pointe toujours vers la dernière
 * version publiée, alors qu'une adresse de déploiement reste figée.
 */
export const SITE_URL = 'https://inspiration-reseau-social.vercel.app';

/** Dépôt GitHub qui héberge les versions publiées. */
export const REPO = 'Scribledecodage/inspiration';

/** Manifeste des mises à jour : lu par l'application au démarrage. */
export const UPDATE_MANIFEST = `https://github.com/${REPO}/releases/latest/download/latest.json`;
