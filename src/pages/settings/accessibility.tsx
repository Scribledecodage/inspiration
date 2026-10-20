import Link from 'next/link';
import { MaterialIcon } from '@components/ui/material-icon';
import {
  SettingsCard,
  SettingsRow,
  SettingsSection,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';

export default function SettingsAccessibilityPage(): JSX.Element {
  return (
    <SettingsShell
      description='Adaptez l’affichage, la langue et les options d’accessibilité de votre compte.'
      seoTitle='Accessibilité, affichage et langues / Réglages / Inspiration'
      title='Accessibilité, affichage et langues'
    >
      <SettingsSection
        description='Réglez la façon dont Inspiration s’affiche pour vous.'
        title='Affichage'
      >
        <SettingsRow
          description='Thème clair, sombre ou automatique et couleur d’accent'
          href='/settings/personalization'
          iconName='palette'
          label='Apparence'
        />
        <SettingsRow
          description='Taille du texte et densité des publications'
          disabled
          iconName='accessibility'
          label='Taille du texte'
        />
        <SettingsRow
          description='Réduire les animations et les effets visuels'
          disabled
          iconName='visibility_off'
          label='Mouvement réduit'
        />
      </SettingsSection>

      <SettingsSection
        description='Choisissez la langue de l’interface.'
        title='Langues'
      >
        <SettingsRow
          description='Français (France)'
          disabled
          iconName='public'
          label='Langue d’affichage'
          value='Français'
        />
      </SettingsSection>

      <SettingsSection
        description='En savoir plus sur nos engagements.'
        title='Accessibilité'
      >
        <SettingsRow
          description='Consulter la déclaration d’accessibilité numérique'
          href='/accessibility'
          iconName='accessibility'
          label='Déclaration d’accessibilité'
        />
      </SettingsSection>
    </SettingsShell>
  );
}

SettingsAccessibilityPage.getLayout = settingsPageLayout;
