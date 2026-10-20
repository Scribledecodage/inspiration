import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection, userNotificationsCollection } from '@lib/firebase/collections';
import { setDoc, doc, query } from 'firebase/firestore';
import { MainContainer } from '@components/home/main-container';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainLayout } from '@components/layout/main-layout';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import type { ReactElement, ReactNode } from 'react';
import type { User } from '@lib/types/user';

// Contenu de la notification (miroir de notifications/announcement.json).
const ANNOUNCEMENT = {
  id: 'team-announcement-1',
  title: 'Nouveautés sur Inspiration',
  body: 'L’équipe Inspiration est heureuse de vous annoncer les dernières nouveautés de la plateforme.\n\n• Messagerie améliorée : sélection par appui long, suppression avec confirmation.\n• Chaînes : créez votre propre chaîne et partagez du contenu.\n• Statuts : partagez des moments éphémères (24 h).\n• Notifications : une page dédiée pour suivre toute l’activité.\n• Localisation : ajoutez un lieu à vos publications et visualisez-le sur une carte.\n• Programmation : programmez vos publications pour plus tard.\n\nMerci de faire partie de la communauté Inspiration. À très bientôt !',
  type: 'announcement' as const
};

export default function AdminNotifications(): JSX.Element {
  const { user, isAdmin } = useAuth();
  const { data: users } = useCollection<User>(query(usersCollection), {
    allowNull: true
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [count, setCount] = useState(0);

  if (!isAdmin) {
    return (
      <MainContainer>
        <SEO title='Admin / Inspiration' />
        <p className='p-4 text-sm text-light-secondary dark:text-dark-secondary'>
          Accès réservé.
        </p>
      </MainContainer>
    );
  }

  const handleSend = async (): Promise<void> => {
    if (!user?.id || sending) return;
    setSending(true);
    try {
      const list = users ?? [];
      let done = 0;
      for (const u of list) {
        try {
          await setDoc(doc(userNotificationsCollection(u.id), ANNOUNCEMENT.id), {
            id: ANNOUNCEMENT.id,
            title: ANNOUNCEMENT.title,
            body: ANNOUNCEMENT.body,
            type: ANNOUNCEMENT.type,
            createdAt: Date.now(),
            read: false
          });
          done += 1;
        } catch {
          // ignore
        }
      }
      setCount(done);
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <MainContainer>
      <SEO title='Admin Notifications / Inspiration' />
      <MainHeader
        useMobileSidebar
        title='Envoyer une notification'
        className='flex min-h-14 items-center justify-between'
      />
      <section className='flex flex-col gap-4 p-4'>
        <div className='rounded-xl border border-light-border bg-main-search-background/20 p-4 dark:border-dark-border'>
          <p className='text-sm font-bold text-light-primary dark:text-dark-primary'>
            {ANNOUNCEMENT.title}
          </p>
          <p className='mt-2 whitespace-pre-wrap text-sm text-light-secondary dark:text-dark-secondary'>
            {ANNOUNCEMENT.body}
          </p>
        </div>
        {sent ? (
          <p className='text-sm font-bold text-green-600'>
            Envoyé à {count} utilisateur{count > 1 ? 's' : ''}.
          </p>
        ) : (
          <button
            className='rounded-full bg-main-accent px-4 py-2 text-sm font-bold text-white transition hover:bg-main-accent/90 disabled:opacity-50'
            disabled={sending || !users?.length}
            onClick={() => void handleSend()}
            type='button'
          >
            {sending ? 'Envoi…' : 'Envoyer à tous'}
          </button>
        )}
      </section>
    </MainContainer>
  );
}

AdminNotifications.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
