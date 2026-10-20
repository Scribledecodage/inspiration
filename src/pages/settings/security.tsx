import { useAuth } from '@lib/context/auth-context';
import { auth } from '@lib/firebase/app';
import { ChangePassword } from '@components/settings/change-password';
import { DeviceCodeCard } from '@components/settings/device-code-card';
import { DangerZone } from '@components/settings/danger-zone';
import {
  SettingsCard,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';
import type { ReactNode } from 'react';

type InfoRowProps = {
  label: string;
  value: ReactNode;
};

function InfoRow({ label, value }: InfoRowProps): JSX.Element {
  return (
    <div className='flex flex-col gap-1 border-b border-light-border/60 pb-3 last:border-b-0 last:pb-0 dark:border-dark-border/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
      <dt className='text-light-secondary dark:text-dark-secondary'>{label}</dt>
      <dd className='font-semibold'>{value}</dd>
    </div>
  );
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function getProviderLabel(providerId: string): string {
  if (providerId === 'password') return 'E-mail et mot de passe';
  if (providerId === 'google.com') return 'Google';

  return providerId;
}

export default function SettingsSecurityPage(): JSX.Element {
  const { user } = useAuth();

  if (!user) return <></>;

  const authUser = auth.currentUser;
  const providers = authUser?.providerData.length
    ? authUser.providerData
        .map(({ providerId }) => getProviderLabel(providerId))
        .join(', ')
    : '—';

  return (
    <SettingsShell
      description='Protégez l’accès à votre compte et vérifiez les informations de connexion.'
      seoTitle='Mot de passe et sécurité / Réglages / Inspiration'
      title='Mot de passe et sécurité'
    >
      <ChangePassword user={user} />

      <DeviceCodeCard userId={user.id} />

      <SettingsCard
        description='Ce que nous savons de votre connexion. Ces informations viennent du service d’authentification.'
        iconName='verified_user'
        title='Informations de connexion'
      >
        <dl className='flex flex-col gap-3 text-sm'>
          <InfoRow label='Adresse e-mail' value={authUser?.email ?? '—'} />
          <InfoRow label='Méthode de connexion' value={providers} />
          <InfoRow
            label='Dernière connexion'
            value={formatDateTime(authUser?.metadata.lastSignInTime)}
          />
          <InfoRow
            label='Compte créé le'
            value={formatDateTime(authUser?.metadata.creationTime)}
          />
        </dl>
        <p className='text-xs text-light-secondary dark:text-dark-secondary'>
          Nous ne voyons jamais votre mot de passe : il est chiffré par le
          service d’authentification et personne ne peut le lire. Nous
          n’affichons aucune donnée sensible sur cette page.
        </p>
      </SettingsCard>

      <DangerZone user={user} />
    </SettingsShell>
  );
}

SettingsSecurityPage.getLayout = settingsPageLayout;
