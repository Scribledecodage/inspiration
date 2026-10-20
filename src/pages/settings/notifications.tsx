import {
  SettingsRow,
  SettingsSection,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';

export default function SettingsNotificationsPage(): JSX.Element {
  return (
    <SettingsShell
      description='Choisissez les alertes que vous recevez et la façon dont elles vous sont envoyées.'
      seoTitle='Notifications / Réglages / Inspiration'
      title='Notifications'
    >
      <p className='rounded-xl border border-light-border bg-main-search-background/40 px-4 py-3 text-sm text-light-secondary dark:border-dark-border dark:text-dark-secondary'>
        Les préférences de notification seront personnalisables dans une
        prochaine mise à jour.
      </p>

      <SettingsSection
        description='Alertes liées à votre compte et à vos publications.'
        title='Sur Inspiration'
      >
        <SettingsRow
          description='Réponses, mentions et nouvelles publications de vos abonnements'
          disabled
          iconName='notifications'
          label='Alertes générales'
        />
        <SettingsRow
          description='Messages et demandes de conversation'
          disabled
          iconName='mail'
          label='Messages privés'
        />
        <SettingsRow
          description='Nouvelles personnes qui s’abonnent à votre profil'
          disabled
          iconName='person_add'
          label='Nouveaux abonnés'
        />
      </SettingsSection>

      <SettingsSection
        description='Choisissez comment recevoir vos alertes en dehors de l’application.'
        title='Préférences'
      >
        <SettingsRow
          description='Notifications par e-mail'
          disabled
          iconName='alternate_email'
          label='E-mail'
        />
        <SettingsRow
          description='Alertes sur votre téléphone'
          disabled
          iconName='mobile'
          label='Notifications push'
        />
      </SettingsSection>
    </SettingsShell>
  );
}

SettingsNotificationsPage.getLayout = settingsPageLayout;
