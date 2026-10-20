import { CONTACT_EMAIL } from '@components/common/contact-link';
import {
  SettingsRow,
  SettingsSection,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';

export default function SettingsHelpPage(): JSX.Element {
  return (
    <SettingsShell
      description='Retrouvez les informations utiles sur Inspiration et ses règles de fonctionnement.'
      seoTitle='Centre d’aide / Réglages / Inspiration'
      title='Centre d’aide'
    >
      <SettingsSection
        description='Les documents qui expliquent le service et vos droits.'
        title='Informations et règles'
      >
        <SettingsRow
          description='Les mesures mises en place pour un service accessible'
          href='/accessibility'
          iconName='accessibility'
          label='Accessibilité numérique'
        />
        <SettingsRow
          description='Quelles données sont collectées et comment exercer vos droits'
          href='/privacy'
          iconName='lock'
          label='Politique de confidentialité'
        />
        <SettingsRow
          description='Les règles d’utilisation du réseau Inspiration'
          href='/terms'
          iconName='description'
          label='Conditions d’utilisation'
        />
        <SettingsRow
          description='Ce qui est stocké dans votre navigateur'
          href='/cookies'
          iconName='public'
          label='Cookies et stockage local'
        />
      </SettingsSection>

      <SettingsSection
        description='Installer l’application et la mettre à jour.'
        title='Application de bureau'
      >
        <SettingsRow
          description='Télécharger la dernière version pour votre ordinateur'
          href='/settings/app'
          iconName='download'
          label='Télécharger l’application'
        />
      </SettingsSection>

      <SettingsSection
        description='Les outils d’assistance et la manière de les piloter.'
        title='Intelligence artificielle'
      >
        <SettingsRow
          description='L’assistant de la messagerie et la traduction'
          href='/settings/ai'
          iconName='auto_awesome_mosaic'
          label='Réglages de l’intelligence artificielle'
        />
        <SettingsRow
          description='Ouvrir la conversation dédiée à l’assistant'
          href='/messages'
          iconName='chat_bubble'
          label='Discuter avec l’assistant'
        />
      </SettingsSection>

      <SettingsSection
        description='Une question ou un problème sur votre compte ?'
        title='Nous contacter'
      >
        <SettingsRow
          description='Écrire à l’équipe Inspiration'
          iconName='mail'
          label='Contacter le support'
          onClick={(): void => {
            window.location.href = `mailto:${CONTACT_EMAIL}`;
          }}
        />
      </SettingsSection>
    </SettingsShell>
  );
}

SettingsHelpPage.getLayout = settingsPageLayout;
