import { useEffect, useMemo, useState } from 'react';
import { AppHead } from '@components/common/app-head';
import { AuthContextProvider } from '@lib/context/auth-context';
import { ThemeContextProvider } from '@lib/context/theme-context';
import { ScheduledPublisher } from '@components/scheduled/scheduled-publisher';
import { useRouter } from './shims/router';
import { matchRoute, ROUTES } from './routes';
import { useNativeBridge } from './native';
import { ThemeSync } from './theme-sync';
import {
  checkForUpdates,
  currentVersion,
  installUpdate,
  onUpdateState,
  type UpdateState
} from './updater';
import './update-banner.css';
import type { ComponentType, ReactElement, ReactNode } from 'react';

type PageComponent = ComponentType<Record<string, never>> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/**
 * Coquille de l'application de bureau.
 *
 * Elle reproduit exactement ce que fait `pages/_app.tsx` sur le site : les
 * memes fournisseurs de contexte, la meme tete de page, et la mise en page
 * de chaque page (via son `getLayout`). Seule la resolution de l'URL est
 * locale.
 *
 * S'y ajoute ce que seul le bureau sait faire : le bandeau de mise a jour
 * et la version de l'application.
 */
export function App() {
  const { pathname } = useRouter();

  const match = useMemo(() => matchRoute(pathname), [pathname]);

  /* Les capacites natives : mise a jour automatique, notifications
     Windows. */
  useNativeBridge();

  const [update, setUpdate] = useState<UpdateState>({ status: 'idle' });
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => onUpdateState(setUpdate), []);
  useEffect(() => {
    void currentVersion().then(setVersion);
  }, []);

  const Page = (match?.route.component ??
    ROUTES[0]!.component) as PageComponent;

  const getLayout = Page.getLayout ?? ((page: ReactElement): ReactNode => page);

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <AppHead />
        <ScheduledPublisher />
        <ThemeSync />
        {getLayout(<Page />)}

        {/* Mise a jour disponible : le bandeau est pose par-dessus la
            page, quelle que soit la page affichee. */}
        {update.info && update.status === 'idle' && (
          <div className='update-banner'>
            <span>La version {update.info.version} est disponible.</span>
            <span className='spacer' />
            <button
              className='button'
              onClick={() => void installUpdate()}
              type='button'
            >
              Installer
            </button>
            <button
              className='icon-button'
              onClick={() => setUpdate({ status: 'idle' })}
              type='button'
            >
              ✕
            </button>
          </div>
        )}

        {update.status === 'downloading' && (
          <div className='update-banner'>
            <span>
              Téléchargement de la mise a jour… {update.progress ?? 0} %
            </span>
            <span className='spacer' />
            <span className='progress'>
              <i style={{ width: `${update.progress ?? 0}%` }} />
            </span>
          </div>
        )}

        {update.status === 'error' && update.error && (
          <div className='update-banner'>
            <span>{update.error}</span>
            <span className='spacer' />
            <button
              className='icon-button'
              onClick={() => setUpdate({ status: 'idle' })}
              type='button'
            >
              ✕
            </button>
          </div>
        )}

        {/* Version de l'application : un clic relance la verification. */}
        <button
          className='version-pill'
          onClick={() => void checkForUpdates(true)}
          title='Rechercher des mises a jour'
          type='button'
        >
          v{version ?? '…'}
        </button>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
