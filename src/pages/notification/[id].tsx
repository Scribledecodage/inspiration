import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { MainLayout } from '@components/layout/main-layout';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { useAuth } from '@lib/context/auth-context';
import { getDoc, doc } from 'firebase/firestore';
import { userNotificationsCollection } from '@lib/firebase/collections';
import { MaterialIcon } from '@components/ui/material-icon';
import type { Notification } from '@lib/types/notification';
import type { ReactElement, ReactNode } from 'react';

export default function NotificationDetail(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [notif, setNotif] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id || !id || typeof id !== 'string') return;
    let cancelled = false;
    void (async () => {
      try {
        const ref = doc(userNotificationsCollection(user.id), id);
        const snap = await getDoc(ref);
        if (cancelled) return;
        if (snap.exists()) {
          setNotif(snap.data());
          // Marque comme lu.
          if (snap.data().read !== true) {
            const { updateDoc } = await import('firebase/firestore');
            await updateDoc(ref, { read: true });
          }
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id, id]);

  const isWelcome = notif?.type === 'welcome';

  return (
    <MainContainer>
      <SEO title={`${notif?.title ?? 'Notification'} / Inspiration`} />
      <MainHeader
        useMobileSidebar
        title={notif?.title ?? 'Notification'}
        className='min-h-14 flex items-center gap-3'
        beforeTitle={
          <button
            aria-label='Retour'
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
            onClick={() => router.back()}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
          </button>
        }
      />
      <article className='flex flex-col gap-4 px-4 py-6'>
        {loading && !notif ? (
          <p className='text-sm text-light-secondary dark:text-dark-secondary'>
            Chargement…
          </p>
        ) : !notif ? (
          <p className='text-sm text-light-secondary dark:text-dark-secondary'>
            Notification introuvable.
          </p>
        ) : (
          <>
            <p className='text-xs text-light-secondary dark:text-dark-secondary'>
              {new Date(notif.createdAt).toLocaleString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className='whitespace-pre-wrap text-[15px] leading-relaxed text-light-primary dark:text-dark-primary'>
              {notif.body}
            </p>

            {isWelcome && (
              <>
                <div className='h-px w-full bg-light-border dark:bg-dark-border' />

                <section className='flex flex-col gap-3'>
                  <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
                    Bienvenue sur Inspiration
                  </h2>
                  <p className='text-[15px] leading-relaxed text-light-primary dark:text-dark-primary'>
                    Nous sommes ravis de vous accueillir. Inspiration est un
                    réseau social pensé pour partager vos idées, vos passions et
                    vos moments, dans un espace simple, rapide et respectueux.
                    Ce guide vous aidera à prendre vos marques en quelques
                    minutes.
                  </p>
                </section>

                <section className='flex flex-col gap-3'>
                  <h3 className='text-base font-bold text-light-primary dark:text-dark-primary'>
                    1. Complétez votre profil
                  </h3>
                  <p className='text-[15px] leading-relaxed text-light-secondary dark:text-dark-secondary'>
                    Ajoutez une photo, une bannière, une bio et votre lieu. Un
                    profil complet est plus souvent visité et suivi. Vous pouvez
                    aussi choisir la forme et le cadre de votre avatar dans les
                    paramètres.
                  </p>
                </section>

                <section className='flex flex-col gap-3'>
                  <h3 className='text-base font-bold text-light-primary dark:text-dark-primary'>
                    2. Publiez votre premier message
                  </h3>
                  <p className='text-[15px] leading-relaxed text-light-secondary dark:text-dark-secondary'>
                    Depuis la barre de rédaction, écrivez un texte, ajoutez
                    jusqu’à quatre photos ou GIFs, créez un sondage ou
                    programmez une publication pour plus tard. Chaque
                    publication peut recevoir un lieu pour la géolocaliser.
                  </p>
                </section>

                <section className='flex flex-col gap-3'>
                  <h3 className='text-base font-bold text-light-primary dark:text-dark-primary'>
                    3. Découvrez et suivez
                  </h3>
                  <p className='text-[15px] leading-relaxed text-light-secondary dark:text-dark-secondary'>
                    Explorez la page « Découvrir » pour trouver des comptes à
                    suivre, des tendances et des chaînes. Suivre des personnes
                    enrichit votre fil d’actualité.
                  </p>
                </section>

                <section className='flex flex-col gap-3'>
                  <h3 className='text-base font-bold text-light-primary dark:text-dark-primary'>
                    4. Statuts, chaînes et messagerie
                  </h3>
                  <p className='text-[15px] leading-relaxed text-light-secondary dark:text-dark-secondary'>
                    Partagez un statut éphémère (24 h), créez une chaîne pour
                    diffuser du contenu dont vous êtes le seul auteur, et
                    échangez en messages privés ou en groupes.
                  </p>
                </section>

                <section className='flex flex-col gap-3'>
                  <h3 className='text-base font-bold text-light-primary dark:text-dark-primary'>
                    5. Notifications et confidentialité
                  </h3>
                  <p className='text-[15px] leading-relaxed text-light-secondary dark:text-dark-secondary'>
                    Vous serez informé des nouveaux abonnés, mentions, j’aime,
                    retweets et réponses. Gérez vos préférences dans les
                    paramètres. Vos données restent les vôtres.
                  </p>
                </section>

                <div className='h-px w-full bg-light-border dark:bg-dark-border' />

                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  Besoin d’aide ? Consultez les paramètres ou contactez-nous.
                  Bonne exploration sur Inspiration !
                </p>
              </>
            )}

            <div className='mt-4 flex items-center gap-2 border-t border-light-border pt-4 text-xs text-light-secondary dark:border-dark-border dark:text-dark-secondary'>
              {notif.type === 'announcement' ? (
                <>
                  <img
                    alt='Inspiration'
                    className='h-4 w-4 object-contain'
                    src='/LogoSite.png'
                  />
                  <span>Envoyé par l'équipe Inspiration Inc.</span>
                </>
              ) : (
                <>
                  <img
                    alt='Inspiration'
                    className='h-4 w-4 object-contain'
                    src='/LogoSite.png'
                  />
                  <span>
                    Créé automatiquement à la création de votre compte
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </article>
    </MainContainer>
  );
}

NotificationDetail.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
