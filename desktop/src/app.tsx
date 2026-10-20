import { useEffect, useMemo } from 'react';
import { AppHead } from '@components/common/app-head';
import { AuthContextProvider } from '@lib/context/auth-context';
import { ThemeContextProvider } from '@lib/context/theme-context';
import { ScheduledPublisher } from '@components/scheduled/scheduled-publisher';
import { useRouter } from './shims/router';
import { matchRoute, ROUTES } from './routes';
import { useNativeBridge } from './native';
import { ThemeSync } from './theme-sync';
import type { ComponentType, ReactElement, ReactNode } from 'react';

type PageComponent = ComponentType<Record<string, never>> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/**
 * Coquille de l'application de bureau.
 *
 * Elle reproduit exactement ce que fait `pages/_app.tsx` sur le site :
 * les mêmes fournisseurs de contexte, la même tête de page, et la mise en
 * page de chaque page (via son `getLayout`). Seule la résolution de
 * l'URL est locale.
 */
export function App() {
  const { pathname } = useRouter();

  const match = useMemo(() => matchRoute(pathname), [pathname]);

  /* Les capacités natives : mise à jour automatique, notifications
     Windows. */
  useNativeBridge();

  const Page = (match?.route.component ?? ROUTES[0]!.component) as PageComponent;

  const getLayout = Page.getLayout ?? ((page: ReactElement): ReactNode => page);

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <AppHead />
        <ScheduledPublisher />
        <ThemeSync />
        {getLayout(<Page />)}
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
