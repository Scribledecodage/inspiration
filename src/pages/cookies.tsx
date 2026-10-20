import { useRouter } from 'next/router';
import { ContactLink } from '@components/common/contact-link';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { LegalLayout } from '@components/layout/legal-layout';
import type { ReactElement, ReactNode } from 'react';

export default function CookiesPage(): JSX.Element {
  const { back } = useRouter();

  return (
    <MainContainer>
      <SEO
        title='Cookies et stockage local / Inspiration'
        description='Aucun cookie publicitaire : découvrez ce qu’Inspiration stocke réellement dans votre navigateur.'
      />
      <MainHeader
        useActionButton
        useMobileSidebar
        title='Cookies et stockage local'
        action={back}
      />
      <article className='flex flex-col gap-8 px-4 py-6 text-[15px] leading-7 sm:px-6'>
        <header className='border-b border-light-border pb-6 dark:border-dark-border'>
          <h1 className='font-title text-2xl font-bold text-main-accent sm:text-3xl'>
            Politique relative aux cookies et au stockage local
          </h1>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            En vigueur en 2026 · Clarté et transparence totale
          </p>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            Dernière mise à jour :{' '}
            <time dateTime='2026-10-17'>17 octobre 2026</time>
          </p>
        </header>

        <p className='text-light-secondary dark:text-dark-secondary'>
          Cette page décrit précisément ce qu’Inspiration enregistre dans votre
          navigateur, à quoi cela sert et comment le supprimer. Elle est éditée
          par Inspiration Inc.
        </p>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            En résumé
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Aucun cookie publicitaire.
              </strong>{' '}
              Inspiration n’affiche pas de publicité et ne dépose aucun traceur
              publicitaire ou de réseaux sociaux.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Aucun outil de mesure d’audience.
              </strong>{' '}
              Aucun service du type Google Analytics n’est activé sur la
              Plateforme.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Aucun cookie écrit par notre code.
              </strong>{' '}
              Les seules informations conservées sur votre appareil le sont dans
              le stockage local du navigateur (localStorage), pour vos
              préférences d’affichage et votre session de connexion.
            </li>
            <li>
              C’est pourquoi vous ne voyez pas de bandeau de consentement : il
              n’y a rien à consentir, puisque aucun cookie non essentiel n’est
              utilisé.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            Ce qui est réellement enregistré sur votre appareil
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Inspiration utilise le stockage local de votre navigateur
            (localStorage), et non des cookies, pour conserver :
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                theme
              </strong>{' '}
              — le thème d’affichage choisi (clair, sombre, dim ou celui de
              votre système), afin d’éviter un « flash » blanc au chargement.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                accent
              </strong>{' '}
              — la couleur d’accent sélectionnée dans le menu Affichage.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                font
              </strong>{' '}
              — la police d’écriture choisie (Inter, Manrope, Plus Jakarta Sans
              ou IBM Plex Sans).
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                avatarShape
              </strong>{' '}
              et{' '}
              <strong className='text-light-primary dark:text-dark-primary'>
                avatarFrame
              </strong>{' '}
              — la forme et le cadre appliqués à votre photo de profil.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Session de connexion
              </strong>{' '}
              — Firebase Authentication (Google) conserve sur votre appareil un
              jeton technique qui vous maintient connecté entre deux visites.
              Sans lui, vous devriez saisir vos identifiants à chaque
              rechargement de page.
            </li>
          </ul>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Ces éléments sont stockés sur votre seul appareil : ils ne sont pas
            transmis à des tiers et ne servent à aucun suivi de votre navigation
            sur d’autres sites.
          </p>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            Durée de conservation
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              Préférences d’affichage : conservées jusqu’à ce que vous les
              modifiiez ou les supprimiez.
            </li>
            <li>
              Session de connexion : conservée jusqu’à votre déconnexion ou la
              suppression des données du site dans votre navigateur.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            Services tiers contactés par votre navigateur
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Bien qu’ils ne déposent pas de cookie d’Inspiration, certains
            contenus sont fournis par des services externes qui prennent
            connaissance de votre adresse IP au moment du chargement :
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Google Fonts
              </strong>{' '}
              — les polices d’écriture sont téléchargées depuis les serveurs de
              Google.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                GIPHY
              </strong>{' '}
              — uniquement lorsque vous ouvrez le sélecteur de GIF ou consultez
              une publication contenant un GIF.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Backblaze B2
              </strong>{' '}
              — le stockage des images est interrogé par nos serveurs, et non
              directement par votre navigateur : les médias vous sont servis
              depuis le domaine d’Inspiration.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            Gérer ou supprimer ces données
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              Modifiez vos préférences à tout moment depuis le menu Affichage
              (thème, couleur d’accent, police, avatar).
            </li>
            <li>
              Déconnectez-vous depuis le menu de votre profil pour mettre fin à
              votre session.
            </li>
            <li>
              Supprimez les données du site dans les paramètres de
              confidentialité de votre navigateur (section « Cookies et données
              de sites » ou équivalent). Cette action réinitialise vos
              préférences et vous déconnecte ; vous pourrez vous reconnecter
              normalement.
            </li>
          </ul>
        </section>

        <section className='space-y-3'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            Mises à jour
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Cette politique sera actualisée si les pratiques de stockage
            évoluent, notamment en cas d’ajout d’un outil de mesure d’audience.
            La date en haut de page indique sa dernière révision. Pour toute
            question : <ContactLink />.
          </p>
        </section>
      </article>
    </MainContainer>
  );
}

CookiesPage.getLayout = (page: ReactElement): ReactNode => (
  <LegalLayout>{page}</LegalLayout>
);
