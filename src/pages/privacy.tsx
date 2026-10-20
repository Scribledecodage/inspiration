import { useRouter } from 'next/router';
import { ContactLink } from '@components/common/contact-link';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { LegalLayout } from '@components/layout/legal-layout';
import type { ReactElement, ReactNode } from 'react';

export default function PrivacyPage(): JSX.Element {
  const { back } = useRouter();

  return (
    <MainContainer>
      <SEO
        title='Politique de confidentialité / Inspiration'
        description='Quelles données Inspiration collecte, pourquoi, où elles sont hébergées et comment exercer vos droits.'
      />
      <MainHeader
        useActionButton
        useMobileSidebar
        title='Politique de confidentialité'
        action={back}
      />
      <article className='flex flex-col gap-8 px-4 py-6 text-[15px] leading-7 sm:px-6'>
        <header className='border-b border-light-border pb-6 dark:border-dark-border'>
          <h1 className='font-title text-2xl font-bold text-main-accent sm:text-3xl'>
            Politique de confidentialité
          </h1>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            En vigueur en 2026 · vos données, vos choix
          </p>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            Dernière mise à jour :{' '}
            <time dateTime='2026-10-17'>17 octobre 2026</time>
          </p>
        </header>

        <p className='text-light-secondary dark:text-dark-secondary'>
          Cette politique explique quelles données sont collectées lorsque vous
          utilisez Inspiration, dans quel but elles le sont, où elles sont
          hébergées et comment vous pouvez exercer vos droits.
        </p>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            1. Responsable du traitement
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Le responsable du traitement des données décrites ci-dessous est{' '}
            <strong className='text-light-primary dark:text-dark-primary'>
              Inspiration Inc
            </strong>
            , éditeur du réseau social Inspiration
            (https://inspiration-reseau-social.vercel.app).
          </p>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Pour toute question ou pour exercer vos droits : <ContactLink />.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            2. Données que nous collectons
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Données de compte :
              </strong>{' '}
              adresse e-mail ou compte Google utilisé pour la connexion,
              identifiant technique du compte (UID), nom affiché, nom
              d’utilisateur, date de création du compte. Les mots de passe sont
              gérés de façon chiffrée par Firebase Authentication et ne sont
              jamais visibles par l’Éditeur.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Profil (renseigné par vous, facultatif) :
              </strong>{' '}
              biographie, photo de profil, bannière, site web, numéro de
              téléphone, ville ou lieu, date de naissance, sexe (homme, femme,
              autre), pronoms, statut, emoji de statut et préférences
              d’affichage (thème, couleur d’accent, police, forme et cadre de
              l’avatar).
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Activité sur la Plateforme :
              </strong>{' '}
              publications et réponses, « j’aime », signets, abonnements et
              abonnés, republications, messages privés échangés dans les
              conversations, notifications et interactions avec les contenus.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Médias :
              </strong>{' '}
              images que vous téléversez (photo de profil, bannière, photos
              jointes aux publications) et GIFs que vous sélectionnez.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Données techniques :
              </strong>{' '}
              adresse IP, type de navigateur et informations de journal
              nécessaires à la sécurité, au diagnostic des pannes et à la
              prévention des abus. Ces journaux sont produits par nos
              prestataires d’hébergement et d’authentification.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Position :
              </strong>{' '}
              uniquement si vous cliquez volontairement sur le bouton « Utiliser
              ma position » lors de la modification de votre profil. Les
              coordonnées sont alors transmises à des services de géocodage pour
              être converties en nom de ville. Seul le nom de la ville que vous
              choisissez d’enregistrer est conservé dans votre profil : la
              Plateforme ne stocke pas vos coordonnées GPS et ne suit pas vos
              déplacements.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            3. Pourquoi ces données sont utilisées
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Fournir le service
              </strong>{' '}
              (exécution du contrat) : créer et sécuriser votre compte, afficher
              votre profil, publier vos contenus, gérer vos abonnements, vos
              signets et vos messages privés.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Sécurité et intégrité
              </strong>{' '}
              (intérêt légitime) : prévenir les accès non autorisés, la
              usurpation d’identité, le spam et les usages abusifs.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Améliorer la Plateforme
              </strong>{' '}
              (intérêt légitime) : corriger les anomalies et comprendre les
              usages de manière agrégée, sans profilage publicitaire.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Position
              </strong>{' '}
              (consentement) : préremplir votre lieu de résidence lorsque vous
              le demandez explicitement.
            </li>
          </ul>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Nous n’utilisons pas vos données pour de la publicité ciblée et nous
            ne les vendons ni ne les louons à des courtiers en données.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            4. Hébergement et prestataires utilisés
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Le service repose sur les prestataires suivants. Chacun ne traite
            que les données nécessaires à sa fonction :
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Vercel Inc.
              </strong>{' '}
              — hébergement du site et exécution du service. Vercel traite
              notamment les adresses IP et les journaux techniques.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Google Firebase
              </strong>{' '}
              (Google Ireland Limited / Google LLC) — authentification des
              comptes (Firebase Authentication) et stockage de la base de
              données du réseau social (Cloud Firestore) : profils,
              publications, likes, signets, abonnements, messages privés et
              notifications.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Backblaze Inc.
              </strong>{' '}
              — stockage des images et médias téléversés, dans un espace privé
              (bucket B2). Les médias sont servis aux utilisateurs autorisés par
              l’intermédiaire de la Plateforme.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                GIPHY
              </strong>{' '}
              — recherche et affichage des GIFs animés. Lorsque vous ouvrez le
              sélecteur de GIF ou consultez une publication contenant un GIF,
              votre navigateur contacte directement les serveurs de GIPHY, qui
              peuvent voir votre adresse IP.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Google Fonts
              </strong>{' '}
              — chargement des polices d’écriture (Inter, Manrope, Outfit, Plus
              Jakarta Sans). Le navigateur contacte les serveurs de Google, qui
              peuvent voir votre adresse IP.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Photon (Komoot) et Nominatim (OpenStreetMap)
              </strong>{' '}
              — conversion d’une recherche ou d’une position en nom de ville,
              uniquement lorsque vous utilisez la recherche de lieu.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                API X (Twitter)
              </strong>{' '}
              — récupération de tendances publiques. Aucune donnée personnelle
              vous concernant n’est transmise à ce service.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            5. Transferts hors de l’Union européenne
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Certains prestataires (Vercel, Google, Backblaze, GIPHY) sont
            établis aux États-Unis et peuvent traiter des données en dehors de
            l’Union européenne. Ces transferts s’appuient sur les garanties
            prévues par ces fournisseurs (clauses contractuelles types de la
            Commission européenne et, le cas échéant, mécanismes de conformité
            équivalents).
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            6. Durée de conservation
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              Données de compte et de profil : conservées tant que votre compte
              existe.
            </li>
            <li>
              Publications, messages privés et médias : conservés jusqu’à leur
              suppression par vous ou jusqu’à la suppression de votre compte.
            </li>
            <li>
              Journaux techniques : conservés pendant une durée limitée par nos
              prestataires, pour des finalités de sécurité et de diagnostic.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            7. Vos droits
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Conformément à la réglementation applicable en matière de protection
            des données (notamment le RGPD), vous disposez des droits suivants :
            accès à vos données, rectification, effacement, limitation du
            traitement, opposition, portabilité et retrait de votre consentement
            à tout moment.
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              Les informations de votre profil (nom, biographie, photo, lieu,
              date de naissance, site web, téléphone) peuvent être modifiées
              directement depuis la page de modification de votre profil.
            </li>
            <li>
              La suppression d’un contenu ou d’un signet est possible depuis la
              Plateforme.
            </li>
            <li>
              Pour l’accès à vos données, leur portabilité ou la suppression
              complète de votre compte et des données associées, écrivez-nous à
              l’adresse de contact ci-dessus : nous répondons dans les meilleurs
              délais.
            </li>
            <li>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez
              introduire une réclamation auprès de votre autorité de contrôle
              (en France, la CNIL).
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            8. Sécurité
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Les échanges avec la Plateforme sont chiffrés (HTTPS / TLS). Les
            comptes sont protégés par Firebase Authentication, l’accès à la base
            de données est encadré par des règles de sécurité Firestore, et les
            médias sont conservés dans un espace de stockage privé. Aucun
            système n’étant infaillible, nous vous recommandons d’utiliser un mot
            de passe unique et robuste.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            9. Mineurs
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Inspiration n’est pas destiné aux enfants de moins de 15 ans. Si
            vous avez moins de 15 ans, l’accord d’une personne titulaire de
            l’autorité parentale est nécessaire. Si nous apprenons qu’un compte a
            été créé par un enfant sans cet accord, nous procéderons à sa
            suppression.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            10. Modifications de cette politique
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Cette politique peut être mise à jour pour refléter une évolution du
            service ou de la réglementation. La date de dernière mise à jour
            figure en haut de cette page. En cas de changement important, nous
            nous efforcerons d’en informer les utilisateurs sur la Plateforme.
          </p>
        </section>
      </article>
    </MainContainer>
  );
}

PrivacyPage.getLayout = (page: ReactElement): ReactNode => (
  <LegalLayout>{page}</LegalLayout>
);
