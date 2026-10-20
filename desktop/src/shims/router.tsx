import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import type { ReactNode } from 'react';

/**
 * Routeur de l'application de bureau.
 *
 * Remplace `next/router` : le site n'utilise que `asPath`, `pathname`,
 * `query`, `push`, `replace` et `back`. Le routeur fonctionne sur
 * l'historique du navigateur (History API), comme Next.js, mais sans le
 * serveur : tout est calculé dans la fenêtre.
 */
export type RouterValue = {
  asPath: string;
  pathname: string;
  query: Record<string, string | string[]>;
  push: (url: string, _as?: string, options?: { scroll?: boolean }) => void;
  replace: (
    url: string,
    _as?: string,
    options?: { shallow?: boolean; scroll?: boolean }
  ) => void;
  back: () => void;
  forward: () => void;
  reload: () => void;
  prefetch: () => void;
  beforePopState: () => void;
  events: {
    on: () => void;
    off: () => void;
    emit: () => void;
  };
  isFallback: boolean;
};

const RouterContext = createContext<RouterValue | null>(null);

type Location = {
  pathname: string;
  search: string;
  hash: string;
};

function readLocation(): Location {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  };
}

type RouterProviderProps = {
  children: ReactNode;
  /* Résolution des paramètres dynamiques de la route courante
     ({ id: '…' } pour /tweet/abc). */
  resolveParams?: (pathname: string) => Record<string, string>;
};

export function RouterProvider({
  children,
  resolveParams
}: RouterProviderProps) {
  const [location, setLocation] = useState<Location>(readLocation);

  useEffect(() => {
    const onPopState = (): void => setLocation(readLocation());

    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (url: string, replaceMode: boolean, scroll: boolean): void => {
      if (replaceMode) window.history.replaceState({}, '', url);
      else window.history.pushState({}, '', url);

      setLocation(readLocation());

      /* Le défilement vers le haut est immédiat : une animation ferait
         « glisser » la page à chaque changement d'onglet. */
      if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
    },
    []
  );

  const value = useMemo<RouterValue>(() => {
    const query: Record<string, string | string[]> = {
      ...(resolveParams ? resolveParams(location.pathname) : {})
    };

    new URLSearchParams(location.search).forEach((value, key) => {
      query[key] = value;
    });

    return {
      asPath: `${location.pathname}${location.search}${location.hash}`,
      pathname: location.pathname,
      query,
      push: (url, _as, options) =>
        navigate(url, false, options?.scroll !== false),
      replace: (url, _as, options) =>
        navigate(url, true, options?.scroll !== false),
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      reload: () => window.location.reload(),
      prefetch: () => undefined,
      beforePopState: () => undefined,
      events: {
        on: () => undefined,
        off: () => undefined,
        emit: () => undefined
      },
      isFallback: false
    };
  }, [location, resolveParams, navigate]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useRouter(): RouterValue {
  const context = useContext(RouterContext);

  if (!context)
    throw new Error(
      'useRouter doit être utilisé à l’intérieur de RouterProvider'
    );

  return context;
}

export default useRouter;
