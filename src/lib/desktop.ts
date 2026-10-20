/**
 * Lien avec l'application de bureau.
 *
 * Le site et l'application de bureau partagent le même code. Quelques
 * fonctions n'existent que dans l'application (fenêtre native, transparence
 * du fond…) : l'application les publie ici, et le site les utilise seulement
 * s'il les trouve.
 */

type DesktopApi = {
  /**
   * Rend le fond de la fenêtre transparent et flouté (Windows).
   *
   * `color` est la couleur de fond de l'application, au format « R G B » :
   * Windows s'en sert pour teinter le flou, comme la barre des tâches.
   */
  setTransparentWindow?: (enabled: boolean, color?: string) => void;
};

declare global {
  interface Window {
    __INSPIRATION_DESKTOP__?: DesktopApi;
  }
}

/** L'application de bureau est-elle en cours d'exécution ? */
export function isDesktopApp(): boolean {
  return (
    typeof window !== 'undefined' && Boolean(window.__INSPIRATION_DESKTOP__)
  );
}

/** Le système est-il Windows ? */
export function isWindows(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /win/i.test(navigator.userAgent) &&
    !/darwin/i.test(navigator.userAgent)
  );
}

/**
 * Le fond de la fenêtre peut-il être transparent ?
 *
 * Cette transparence passe par Windows lui-même (le même flou que la barre
 * des tâches) : elle n'existe que dans l'application de bureau, sous
 * Windows.
 */
export function canUseTransparentWindow(): boolean {
  return isDesktopApp() && isWindows();
}

/** Demande à l'application de rendre (ou non) le fond de la fenêtre flouté. */
export function setDesktopTransparency(enabled: boolean, color?: string): void {
  window.__INSPIRATION_DESKTOP__?.setTransparentWindow?.(enabled, color);
}
