import { useRouter } from 'next/router';
import { ContactLink } from '@components/common/contact-link';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { LegalLayout } from '@components/layout/legal-layout';
import type { ReactElement, ReactNode } from 'react';

export default function TermsPage(): JSX.Element {
  const { back } = useRouter();

  return (
    <MainContainer>
      <SEO
        title='Conditions d’utilisation / Inspiration'
        description='Conditions générales d’utilisation d’Inspiration, réseau social édité par Inspiration Inc.'
      />
      <MainHeader
        useActionButton
        useMobileSidebar
        title='Conditions d’utilisation'
        action={back}
      />
      <article className='flex flex-col gap-8 px-4 py-6 text-[15px] leading-7 sm:px-6'>
        <header className='border-b border-light-border pb-6 dark:border-dark-border'>
          <h1 className='font-title text-2xl font-bold text-main-accent sm:text-3xl'>
            Conditions générales d’utilisation
          </h1>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            En vigueur en 2026 · des règles claires pour la communauté
          </p>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            Dernière mise à jour :{' '}
            <time dateTime='2026-10-17'>17 octobre 2026</time>
          </p>
        </header>

        <p className='text-light-secondary dark:text-dark-secondary'>
          Les présentes conditions encadrent l’accès à Inspiration, l’utilisation
          de votre compte et les contenus publiés sur la plateforme. Elles
          indiquent également qui édite le service et quels prestataires
          techniques sont utilisés pour le faire fonctionner.
        </p>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            1. Éditeur du service
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Le réseau social Inspiration (ci-après « la Plateforme ») est édité,
            développé et exploité par{' '}
            <strong className='text-light-primary dark:text-dark-primary'>
              Inspiration Inc
            </strong>{' '}
            (ci-après « nous » ou « l’Éditeur »). Le service est accessible à
            l’adresse suivante :
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Adresse du service :
              </strong>{' '}
              https://inspiration-reseau-social.vercel.app
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Contact :
              </strong>{' '}
              <ContactLink />
            </li>
          </ul>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Inspiration est un service indépendant. Il n’est ni affilié, ni
            associé, ni approuvé par X Corp. (anciennement Twitter), Google,
            Meta ou l’une de leurs filiales. Les noms et marques cités
            appartiennent à leurs propriétaires respectifs.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            2. Acceptation des conditions
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            En créant un compte ou en utilisant Inspiration, vous acceptez les
            présentes Conditions d’utilisation ainsi que notre Politique de
            confidentialité et notre Politique relative aux cookies. Si vous
            n’acceptez pas ces conditions, nous vous invitons à ne pas utiliser
            le service.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            3. Compte et sécurité
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            L’ouverture d’un compte est gratuite. Vous pouvez vous inscrire avec
            une adresse e-mail et un mot de passe, ou en utilisant votre compte
            Google. La création et l’authentification des comptes sont assurées
            par le service Firebase Authentication, fourni par Google.
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              Vous devez avoir au moins 15 ans pour créer un compte. Si vous avez
              moins de 15 ans, l’accord d’une personne titulaire de l’autorité
              parentale est nécessaire.
            </li>
            <li>
              Vous vous engagez à fournir des informations exactes et à les
              maintenir à jour depuis votre profil.
            </li>
            <li>
              Vous êtes responsable de la confidentialité de votre mot de passe
              et de toute activité effectuée depuis votre compte. Les mots de
              passe ne sont jamais lisibles par l’Éditeur : ils sont gérés de
              manière chiffrée par Firebase Authentication.
            </li>
            <li>
              Prévenez-nous sans délai à l’adresse de contact ci-dessus si vous
              soupçonnez une utilisation non autorisée de votre compte.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            4. Contenus publiés
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Vous conservez l’ensemble de vos droits sur les textes, images,
            GIFs, vidéos et autres créations que vous publiez sur Inspiration.
            Pour permettre au service de fonctionner, vous nous accordez une
            licence mondiale, non exclusive et gratuite, limitée à l’hébergement,
            à l’affichage et à la distribution de vos contenus auprès des
            personnes qui y ont accès. Cette licence prend fin lorsque vous
            supprimez le contenu concerné ou votre compte.
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Stockage des médias :
              </strong>{' '}
              les images que vous téléversez (photo de profil, bannière, photos
              des publications) sont conservées sur le service de stockage
              Backblaze B2, dans un espace privé, puis servies aux personnes
              autorisées par l’intermédiaire de la Plateforme.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                GIFs :
              </strong>{' '}
              la recherche de GIFs animés est fournie par GIPHY. En choisissant
              un GIF, vous vous engagez à respecter les conditions d’utilisation
              de GIPHY.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Actualités et tendances :
              </strong>{' '}
              certaines informations publiques (tendances) proviennent de l’API
              de X (Twitter). Elles ne comprennent aucune donnée personnelle
              vous concernant.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            5. Règles de conduite
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Pour que la Plateforme reste un espace accueillant, il est interdit
            de publier ou de partager des contenus illégaux, violents,
            haineux, harcelants, diffamatoires, trompeurs, à caractère sexuel
            explicite, ou portant atteinte aux droits de propriété
            intellectuelle d’autrui. Il est également interdit de :
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>usurper l’identité d’une personne ou d’une organisation ;</li>
            <li>
              se faire passer pour Inspiration Inc ou pour un membre de son
              équipe ;
            </li>
            <li>
              diffuser des messages non sollicités (spam, chaînes, contenus
              répétitifs) ou tenter de manipuler l’audience ;
            </li>
            <li>
              collecter les données d’autres personnes sans leur accord,
              automatiser la création de comptes ou l’envoi de publications ;
            </li>
            <li>
              contourner les mesures de sécurité, sonder ou perturber
              l’infrastructure de la Plateforme et de ses prestataires.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            6. Propriété intellectuelle
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Le nom Inspiration, l’interface, le code source, les éléments
            graphiques et les contenus créés par l’Éditeur sont la propriété
            d’Inspiration Inc ou sont utilisés avec l’autorisation de leurs
            titulaires. Aucune disposition des présentes conditions ne vous
            transfère ces droits. Les bibliothèques logicielles et les polices
            utilisées restent soumises à leurs licences respectives.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            7. Modération et résiliation
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Nous pouvons masquer ou supprimer un contenu contraire aux présentes
            conditions, et suspendre ou fermer un compte en cas de manquement
            grave ou répété. Vous pouvez quant à vous cesser d’utiliser le
            service à tout moment et demander la suppression de votre compte à
            l’adresse de contact indiquée à l’article 1.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            8. Disponibilité et responsabilité
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Inspiration est un service fourni « en l’état ». Il repose sur des
            prestataires techniques tiers (Vercel pour l’hébergement, Google
            Firebase pour l’authentification et la base de données, Backblaze
            pour le stockage des images, GIPHY pour les GIFs). Une interruption
            ou une indisponibilité de ces services peut entraîner une
            interruption temporaire de la Plateforme, sans que la
            responsabilité de l’Éditeur puisse être engagée.
          </p>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Dans les limites prévues par la loi, l’Éditeur ne peut être tenu
            responsable des contenus publiés par les utilisateurs ni des
            dommages indirects résultant de l’utilisation du service.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            9. Modification des conditions
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Nous pouvons mettre à jour ces conditions pour tenir compte des
            évolutions légales, techniques ou fonctionnelles du service. La date
            de dernière mise à jour est indiquée en haut de cette page. En
            continuant d’utiliser Inspiration après une modification, vous
            acceptez la nouvelle version des conditions.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            10. Droit applicable et contact
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Les présentes conditions sont régies par le droit applicable au lieu
            d’établissement d’Inspiration Inc. En cas de difficulté, nous vous
            invitons à nous contacter d’abord : nous ferons notre possible pour
            trouver une solution amiable.
          </p>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Pour toute question relative à ces conditions : <ContactLink />.
          </p>
        </section>
      </article>
    </MainContainer>
  );
}

TermsPage.getLayout = (page: ReactElement): ReactNode => (
  <LegalLayout>{page}</LegalLayout>
);
