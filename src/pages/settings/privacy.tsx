import {
  SettingsRow,
  SettingsSection,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';

export default function SettingsPrivacyPage(): JSX.Element {
  return (
    <SettingsShell
      description='Gérez les informations que vous voyez, partagez et recevez sur Inspiration.'
      seoTitle='Confidentialité et sécurité / Réglages / Inspiration'
      title='Confidentialité et sécurité'
    >
      <p className='rounded-xl border border-light-border bg-main-search-background/40 px-4 py-3 text-sm text-light-secondary dark:border-dark-border dark:text-dark-secondary'>
        Certaines options de cette rubrique seront disponibles dans une
        prochaine mise à jour. Les réglages déjà actifs restent accessibles
        depuis votre compte.
      </p>

      <SettingsSection
        description='Contrôlez ce que les autres voient et la façon dont ils interagissent avec vous.'
        title='Votre activité sur Inspiration'
      >
        <SettingsRow
          description='Choisir qui peut voir vos publications et vous mentionner'
          disabled
          iconName='visibility'
          label='Audience et mention'
        />
        <SettingsRow
          description='Archiver, épingler ou limiter la visibilité de vos publications'
          disabled
          iconName='description'
          label='Vos publications'
        />
        <SettingsRow
          description='Filtrer le contenu sensible et les mots que vous ne voulez pas voir'
          disabled
          iconName='visibility_off'
          label='Contenu que vous voyez'
        />
        <SettingsRow
          description='Gérer les comptes que vous avez bloqués ou masqués'
          disabled
          iconName='block'
          label='Masquer et bloquer'
        />
        <SettingsRow
          description='Choisir qui peut vous envoyer des messages privés'
          disabled
          iconName='mail'
          label='Messages privés'
        />
        <SettingsRow
          description='Gérer les Spaces que vous créez ou rejoignez'
          disabled
          iconName='group'
          label='Spaces'
        />
        <SettingsRow
          description='Décider comment les autres personnes peuvent vous trouver'
          disabled
          iconName='person_remove'
          label='Détectabilité et contacts'
        />
      </SettingsSection>

      <SettingsSection
        description='Choisissez comment vos données peuvent être utilisées.'
        title='Partage des données et personnalisation'
      >
        <SettingsRow
          description='Préférences relatives aux publicités affichées sur Inspiration'
          disabled
          iconName='campaign'
          label='Publicités'
        />
        <SettingsRow
          description='Gérer les données partagées avec nos partenaires'
          disabled
          iconName='ads_click'
          label='Données partagées avec des partenaires'
        />
        <SettingsRow
          description='Adapter votre expérience à partir de votre activité'
          disabled
          iconName='settings'
          label='Personnalisation'
        />
      </SettingsSection>
    </SettingsShell>
  );
}

SettingsPrivacyPage.getLayout = settingsPageLayout;
