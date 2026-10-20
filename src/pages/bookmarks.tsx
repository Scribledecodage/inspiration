import { useMemo } from 'react';
import { AnimatePresence, useDragControls } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { orderBy, query } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { useCollection } from '@lib/hooks/useCollection';
import { useArrayDocument } from '@lib/hooks/useArrayDocument';
import { clearAllBookmarks } from '@lib/firebase/utils';
import {
  tweetsCollection,
  userBookmarksCollection
} from '@lib/firebase/collections';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Tweet } from '@components/tweet/tweet';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { MaterialIcon } from '@components/ui/material-icon';
import { Loading } from '@components/ui/loading';
import type { ReactElement, ReactNode } from 'react';

const sheetAnimation: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } }
};

export default function Bookmarks(): JSX.Element {
  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();
  const dragControls = useDragControls();

  const userId = user?.id as string;

  const { data: bookmarksRef, loading: bookmarksRefLoading } = useCollection(
    query(userBookmarksCollection(userId), orderBy('createdAt', 'desc')),
    { allowNull: true }
  );

  const tweetIds = useMemo(
    () => bookmarksRef?.map(({ id }) => id) ?? [],
    [bookmarksRef]
  );

  const { data: tweetData, loading: tweetLoading } = useArrayDocument(
    tweetIds,
    tweetsCollection,
    { includeUser: true }
  );

  const handleClear = async (): Promise<void> => {
    await clearAllBookmarks(userId);
    closeModal();
    toast.success('Tous les signets ont été supprimés');
  };

  return (
    <MainContainer>
      <SEO title='Signets / Inspiration' />
      <Modal
        className='flex items-end justify-center p-0 xs:items-center xs:p-4'
        modalAnimation={sheetAnimation}
        modalClassName='fixed inset-x-0 bottom-0 w-full rounded-t-3xl border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl dark:border-dark-border xs:static xs:max-w-xs xs:rounded-2xl xs:border xs:p-8'
        drag='y'
        dragControls={dragControls}
        dragListener={false}
        dragElastic={0.25}
        dragMomentum={false}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 550) closeModal();
        }}
        open={open}
        closeModal={closeModal}
      >
        <button
          aria-label='Faire glisser pour fermer la confirmation'
          className='mb-4 flex w-full touch-none justify-center py-1 xs:hidden'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1.5 w-12 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
        <ActionModal
          title='Supprimer tous vos signets ?'
          description='Cette action retirera toutes les publications sauvegardées dans vos signets. Vous pourrez toujours les retrouver dans le fil si vous les cherchez.'
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab 
                            focus-visible:bg-accent-red/90'
          mainBtnLabel='Tout effacer'
          action={handleClear}
          closeModal={closeModal}
        />
      </Modal>
      <MainHeader
        useMobileSidebar
        className='flex items-center justify-between'
        beforeTitle={
          <div className='flex flex-col'>
            <h2 className='text-[1.25rem] leading-tight'>Signets</h2>
            <p className='text-xs text-light-secondary dark:text-dark-secondary'>
              @{user?.username} · {tweetIds.length}{' '}
              {tweetIds.length > 1
                ? 'publications sauvegardées'
                : 'publication sauvegardée'}
            </p>
          </div>
        }
      >
        {tweetIds.length > 0 && (
          <Button
            className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                       active:bg-light-primary/20 dark:hover:bg-dark-primary/10
                       dark:active:bg-dark-primary/20'
            onClick={openModal}
            aria-label='Supprimer tous les signets'
          >
            <MaterialIcon
              className='h-5 w-5 text-light-secondary hover:text-accent-red dark:text-dark-secondary'
              iconName='delete'
            />
            <ToolTip tip='Effacer tous les signets' />
          </Button>
        )}
      </MainHeader>
      <section className='mt-0.5'>
        {bookmarksRefLoading || tweetLoading ? (
          <Loading className='mt-5' />
        ) : !tweetData || tweetData.length === 0 ? (
          <StatsEmpty
            title='Conservez vos meilleures inspirations pour plus tard'
            titleClassName='font-title text-2xl font-bold tracking-tight text-light-primary dark:text-dark-primary max-w-sm mx-auto'
            description='Ne laissez pas s’échapper les idées marquantes ! Cliquez sur l’icône signet sous n’importe quelle publication pour l’enregistrer ici et la consulter à tout moment.'
            imageData={{ src: '/assets/no-bookmarks.png', alt: 'Aucun signet' }}
            imageWidth={336}
            imageHeight={336}
          />
        ) : (
          <AnimatePresence initial={false}>
            {tweetData?.map((tweet) => (
              <Tweet {...tweet} key={tweet.id} />
            ))}
          </AnimatePresence>
        )}
      </section>
    </MainContainer>
  );
}

Bookmarks.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
