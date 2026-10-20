import { ContactLink } from '@components/common/contact-link';
import {
  SettingsCard,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';

export default function SettingsAiPage(): JSX.Element {
  return (
    <SettingsShell
      description='Le cadre prévu pour les fonctionnalités d’intelligence artificielle, les données concernées et vos droits.'
      seoTitle='Intelligence artificielle / Réglages / Inspiration'
      title='Intelligence artificielle'
    >
      <SettingsCard
        description='Ces fonctionnalités ne sont pas encore disponibles. Cette page présente les règles qui s’appliqueront.'
        title='Fonctionnalités d’intelligence artificielle'
      >
        <article className='flex flex-col gap-3 rounded-lg border border-light-border bg-main-search-background/30 p-4 text-sm font-normal leading-6 text-light-secondary dark:border-dark-border dark:bg-dark-primary/[0.04] dark:text-dark-secondary'>
          <p>
            À la date du 19 octobre 2026, Inspiration ne propose aucune
            fonctionnalité d’intelligence artificielle active. Les éléments
            décrits ci-dessous définissent le cadre prévu pour les outils
            d’assistance qui pourront être ajoutés ultérieurement, ainsi que les
            garanties applicables à vos données.
          </p>
          <p>
            Les fonctionnalités envisagées ont pour objet d’aider à la
            rédaction, à la reformulation, à la traduction, au résumé de
            contenus publics et à l’amélioration de la recherche. Elles
            produiront uniquement des suggestions : aucune publication ne sera
            envoyée, modifiée ou supprimée sans une action explicite de votre
            part. Aucune décision automatisée produisant des effets juridiques à
            votre encontre ne sera prise sur cette base.
          </p>
          <p>
            Seuls les contenus que vous choisissez de soumettre seront traités.
            Les messages privés ne seront utilisés que si vous demandez
            expressément une assistance sur une conversation. Vos contenus
            privés ne serviront pas à entraîner des modèles d’intelligence
            artificielle et ne seront ni vendus ni cédés à des fins
            publicitaires.
          </p>
          <p>
            Le traitement pourra être réalisé par des prestataires techniques
            agissant pour notre compte, dans le cadre de contrats de
            confidentialité et de protection des données. Ces prestataires
            n’auront pas le droit de réutiliser vos contenus pour leurs propres
            modèles ni de les conserver au-delà de la durée nécessaire au
            service demandé.
          </p>
          <p>
            Les contenus générés seront conservés le temps nécessaire à leur
            affichage et à leur suppression par vos soins. Les journaux
            techniques seront limités à ce qui est utile au fonctionnement, à la
            sécurité et à la correction des erreurs. Vous pourrez demander
            l’accès, la rectification ou l’effacement des données associées dans
            les conditions prévues par notre politique de confidentialité.
          </p>
          <p>
            Un système d’intelligence artificielle peut produire des
            informations inexactes, incomplètes ou biaisées. Les résultats
            devront toujours être vérifiés avant utilisation et ne constitueront
            pas un conseil médical, juridique ou financier. Les décisions de
            modération assistées par un outil automatique feront l’objet d’un
            réexamen humain lorsqu’elles auront un impact significatif sur un
            compte.
          </p>
          <p>
            Vous pourrez vous opposer à l’utilisation de vos contenus pour une
            fonctionnalité donnée, retirer votre consentement lorsqu’il
            constitue la base du traitement et exercer vos droits d’accès, de
            rectification, d’effacement et de limitation. Pour toute question ou
            réclamation, utilisez le contact ci-dessous : <ContactLink />.
          </p>
          <p>
            Cette page sera mise à jour avant la mise en service de toute
            fonctionnalité d’intelligence artificielle afin de préciser les
            outils concernés, les données réellement utilisées, les prestataires
            et les modalités d’exercice de vos droits. La version en vigueur est
            datée du 19 octobre 2026.
          </p>
        </article>
      </SettingsCard>
    </SettingsShell>
  );
}

SettingsAiPage.getLayout = settingsPageLayout;
