import { useEffect, useState } from 'react';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import {
  SettingsCard,
  SettingsSection,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';

type ReleaseInfo = {
  version: string;
  fileName: string;
  size: number;
  publishedAt: string | null;
  notes: string;
  releasesUrl: string;
};

/** Taille lisible : « 5,6 Mo ». */
function formatSize(bytes: number): string {
  if (!bytes) return '';

  const mo = bytes / (1024 * 1024);

  if (mo < 1) return `${Math.round(bytes / 1024)} Ko`;

  return `${mo.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mo`;
}

export default function SettingsAppPage(): JSX.Element {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Les informations sur la dernière version sont demandées au serveur : la
     page n'a pas à interroger GitHub depuis le navigateur. */
  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      try {
        const response = await fetch('/api/download/desktop?info=1');
        const data = (await response.json()) as ReleaseInfo & {
          error?: string;
        };

        if (cancelled) return;

        if (!response.ok) throw new Error(data.error ?? 'Version introuvable.');

        setRelease(data);
      } catch (loadError) {
        if (cancelled) return;

        setError(
          (loadError as Error)?.message ??
            'Impossible de joindre GitHub pour le moment.'
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SettingsShell
      description='Installez Inspiration sur votre ordinateur : publications, messagerie et notifications, sans quitter votre navigateur.'
      seoTitle='Télécharger l’application / Réglages / Inspiration'
      title='Télécharger l’application'
    >
      <SettingsCard
        description='L’application reprend tout le site et se met à jour toute seule.'
        iconName='download'
        title='Application de bureau'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex flex-wrap items-center gap-3'>
            {/* Le téléchargement est servi par le site : la personne ne
                quitte pas Inspiration, le fichier arrive dans ses
                téléchargements. */}
            <a
              className='flex items-center gap-2 rounded-full bg-main-accent px-4 py-2 text-sm font-bold text-white transition hover:brightness-90'
              download
              href='/api/download/desktop'
            >
              <MaterialIcon className='h-4 w-4' iconName='download' />
              Télécharger pour Windows
            </a>

            {loading && (
              <span className='flex items-center gap-2 text-sm text-light-secondary dark:text-dark-secondary'>
                <CustomIcon className='h-4 w-4' iconName='SpinnerIcon' />
                Recherche de la dernière version…
              </span>
            )}

            {!loading && release && (
              <span className='text-sm text-light-secondary dark:text-dark-secondary'>
                Version {release.version}
                {release.size ? ` · ${formatSize(release.size)}` : ''}
                {release.publishedAt
                  ? ` · publiée le ${new Date(
                      release.publishedAt
                    ).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}`
                  : ''}
              </span>
            )}
          </div>

          {!loading && error && (
            <p className='text-sm text-light-secondary dark:text-dark-secondary'>
              {error} Vous pouvez consulter{' '}
              <a
                className='text-main-accent underline underline-offset-2'
                href='https://github.com/Scribledecodage/inspiration/releases'
                rel='noopener noreferrer'
                target='_blank'
              >
                les versions publiées
              </a>
              .
            </p>
          )}

          {release?.notes && (
            <p className='whitespace-pre-wrap text-sm leading-6 text-light-secondary dark:text-dark-secondary'>
              {release.notes}
            </p>
          )}

          <p className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
            L’installateur est signé par l’équipe Inspiration. Si Windows
            demande l’autorisation, autorisez simplement le programme à
            s’exécuter : il n’ installe rien d’autre.
          </p>
        </div>
      </SettingsCard>

      <SettingsSection
        description='L’installateur est signé, et l’application refuse toute mise à jour non signée.'
        title='Sécurité'
      >
        <div className='px-4 py-3.5 text-sm leading-6 text-light-secondary dark:text-dark-secondary'>
          <p>
            Chaque version publiée est accompagnée de sa signature : au
            démarrage, l’application vérifie que le paquet correspond bien à
            celui qu’a signé l’équipe. Une mise à jour Surgeon, ou signée avec
            une autre clé, est refusée.
          </p>
        </div>
      </SettingsSection>
    </SettingsShell>
  );
}

SettingsAppPage.getLayout = settingsPageLayout;
