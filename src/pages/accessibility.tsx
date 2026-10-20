import { useRouter } from 'next/router';
import { ContactLink } from '@components/common/contact-link';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { LegalLayout } from '@components/layout/legal-layout';
import type { ReactElement, ReactNode } from 'react';

export default function AccessibilityPage(): JSX.Element {
  const { back } = useRouter();

  return (
    <MainContainer>
      <SEO
        title='Accessibilité / Inspiration'
        description='Les mesures d’accessibilité réellement en place sur Inspiration, ses limites connues et comment signaler un obstacle.'
      />
      <MainHeader
        useActionButton
        useMobileSidebar
        title='Accessibilité'
        action={back}
      />
      <article className='flex flex-col gap-8 px-4 py-6 text-[15px] leading-7 sm:px-6'>
        <header className='border-b border-light-border pb-6 dark:border-dark-border'>
          <h1 className='font-title text-2xl font-bold text-main-accent sm:text-3xl'>
            Accessibilité numérique
          </h1>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            En vigueur en 2026 · un service plus accessible à tous
          </p>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            Dernière mise à jour :{' '}
            <time dateTime='2026-10-17'>17 octobre 2026</time>
          </p>
        </header>

        <p className='text-light-secondary dark:text-dark-secondary'>
          Inspiration est édité par Inspiration Inc. Nous cherchons à rendre le
          service utilisable par le plus grand nombre, quels que soient
          l’appareil, la connexion et la manière de naviguer. Cette page décrit
          ce qui est réellement en place, ce qui reste imparfait et comment nous
          signaler une difficulté.
        </p>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            1. Structure et navigation
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Langue déclarée :
              </strong>{' '}
              les pages sont déclarées en français (lang=&quot;fr&quot;), ce qui
              permet aux lecteurs d’écran de choisir la bonne prononciation.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Titres hiérarchisés :
              </strong>{' '}
              chaque page comporte un titre principal, puis des sous-titres de
              section.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Navigation au clavier :
              </strong>{' '}
              les liens et les boutons sont des éléments HTML natifs, atteignables
              avec la touche Tab et activables au clavier.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Repères de focus :
              </strong>{' '}
              un contour visible apparaît sur l’élément actif lorsque vous
              naviguez au clavier.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Libellés explicites :
              </strong>{' '}
              les boutons qui n’affichent qu’une icône possèdent un intitulé en
              français destiné aux technologies d’assistance (par exemple
              « Écrire une publication », « Fermer le sélecteur de GIF »,
              « Suivre @nom »).
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Images :
              </strong>{' '}
              les photos de profil, bannières et images des publications
              disposent d’un texte de remplacement.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            2. Affichage et confort de lecture
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Thèmes :
              </strong>{' '}
              plusieurs modes d’affichage sont disponibles dans le menu Affichage
              (clair, sombre, dim, ou alignement sur le réglage de votre
              système).
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Couleur et typographie :
              </strong>{' '}
              vous pouvez choisir une couleur d’accent et une police d’écriture
              parmi les options proposées.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Avatar :
              </strong>{' '}
              la forme et le cadre de votre photo de profil sont personnalisables.
            </li>
            <li>
              <strong className='text-light-primary dark:text-dark-primary'>
                Adaptation aux écrans :
              </strong>{' '}
              les pages s’ajustent aux différentes tailles d’écran ; sur
              téléphone, un menu dédié et des gestes de balayage permettent
              d’accéder aux mêmes fonctions.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            3. Limites connues
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Nous préférons être transparents sur ce qui n’est pas encore
            satisfaisant :
          </p>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              Aucun audit d’accessibilité externe n’a encore été réalisé : l’état
              décrit sur cette page résulte d’un travail interne et ne constitue
              pas une déclaration de conformité au RGAA ou aux WCAG.
            </li>
            <li>
              Certaines animations ne tiennent pas encore compte du réglage
              système « réduire les animations ».
            </li>
            <li>
              Les contenus fournis par des tiers (GIFs animés GIPHY, images
              importées, sites externes liés depuis les profils) échappent à
              notre contrôle et peuvent ne pas être accessibles.
            </li>
            <li>
              Les fonctions interactives (menus, fenêtres de composition,
              sélecteurs) reposent sur JavaScript : sans JavaScript, seule une
              partie du service reste consultable.
            </li>
          </ul>
        </section>

        <section className='space-y-3 border-b border-light-border pb-6 dark:border-dark-border'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            4. Signaler un obstacle
          </h2>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Si une page ou une fonction vous pose problème, écrivez-nous à
            l’adresse ci-dessous en précisant si possible : la page concernée, ce
            qui s’est mal passé, votre appareil ou votre navigateur, ainsi que la
            technologie d’assistance utilisée (lecteur d’écran, loupe,
            navigation au clavier, etc.). Vos retours nous aident à prioriser les
            corrections.
          </p>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Contact : <ContactLink />
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='font-title text-lg font-bold text-light-primary dark:text-dark-primary'>
            5. Pistes d’amélioration
          </h2>
          <ul className='list-disc space-y-2 pl-5 text-light-secondary dark:text-dark-secondary'>
            <li>
              respecter le réglage « réduire les animations » du système ;
            </li>
            <li>harmoniser et renforcer les contrastes des thèmes ;</li>
            <li>
              vérifier systématiquement la navigation au clavier et avec un
              lecteur d’écran sur les parcours principaux ;
            </li>
            <li>
              réaliser un audit d’accessibilité afin de publier une déclaration
              de conformité fiable.
            </li>
          </ul>
        </section>
      </article>
    </MainContainer>
  );
}

AccessibilityPage.getLayout = (page: ReactElement): ReactNode => (
  <LegalLayout>{page}</LegalLayout>
);
