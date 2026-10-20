import { useState } from 'react';
import {
  TrendsLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { AsideTrends } from '@components/aside/aside-trends';
import { StatusOwnCard } from '@components/status/status-own-card';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ChannelCreateModal } from '@components/channel/channel-create-modal';
import { ChannelAvatar } from '@components/channel/channel-avatar';
import { ChannelHeader } from '@components/channel/channel-header';
import { Input } from '@components/input/input';
import { Conversation } from '@components/messages/conversation';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import {
  userConversationsCollection,
  channelsCollection
} from '@lib/firebase/collections';
import { useDragControls } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import type { Query } from 'firebase/firestore';
import type { PanInfo, Variants } from 'framer-motion';
import type { ReactElement, ReactNode } from 'react';
import type { Channel } from '@lib/types/channel';
import type { Conversation as ConversationData } from '@lib/types/message';
import type { User } from '@lib/types/user';

const composeSheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

export default function Discover(): JSX.Element {
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();
  const [composeExpanded, setComposeExpanded] = useState(false);
  const dragControls = useDragControls();

  // Chaînes de l'utilisateur.
  const { data: channelsRaw } = useCollection<ConversationData>(
    query(
      userConversationsCollection(user?.id ?? 'pending'),
      where('type', '==', 'channel')
    ),
    { allowNull: true, disabled: !user?.id }
  );

  const channels = [...(channelsRaw ?? [])].sort(
    (a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)
  );

  // Chaînes publiques (les chaînes privées restent hors de la découverte).
  const { data: publicChannelsRaw } = useCollection<Channel>(
    channelsCollection,
    { allowNull: true, disabled: !user?.id }
  );

  const publicChannels = [...(publicChannelsRaw ?? [])]
    .filter((channel) => channel.visibility !== 'private')
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  // Création d'une chaîne.
  const [channelOpen, setChannelOpen] = useState(false);

  // Chaîne ouverte (lecture / publication).
  const [selectedChannel, setSelectedChannel] =
    useState<ConversationData | null>(null);

  const openComposer = (): void => {
    setComposeExpanded(false);
    openModal();
  };

  const handleComposeDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (composeExpanded && info.offset.y > 70) {
      setComposeExpanded(false);
      return;
    }

    if (info.offset.y > 200 || info.velocity.y > 1000) closeModal();
  };

  if (selectedChannel && user) {
    return (
      <div className='flex h-[100dvh] w-full max-w-xl flex-col'>
        {/* Barre du haut de la chaîne : flèche de retour, image dans la forme
            choisie, nom et description. Elle est visible sur téléphone
            comme sur ordinateur. */}
        <ChannelHeader
          description={selectedChannel.description}
          name={selectedChannel.name ?? 'Chaîne'}
          onBack={(): void => setSelectedChannel(null)}
          photoURL={selectedChannel.photoURL}
          shape={selectedChannel.avatarShape}
        />
        <div className='flex min-h-0 flex-1 flex-col'>
          <Conversation
            group={selectedChannel}
            members={[]}
            onBack={() => setSelectedChannel(null)}
            standalone
            user={user}
          />
        </div>
      </div>
    );
  }

  return (
    <MainContainer>
      <SEO title='Découvrir / Inspiration' />
      <MainHeader useMobileSidebar title='Découvrir' />
      <section className='flex flex-col gap-4 p-4'>
        <StatusOwnCard />

        {/* Créer votre chaîne */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-light-primary dark:text-dark-primary'>
              Créer votre chaîne
            </h2>
            <button
              className='rounded-full bg-main-accent px-4 py-1.5 text-sm font-bold text-white transition hover:bg-main-accent/90'
              onClick={() => setChannelOpen(true)}
              type='button'
            >
              Créer
            </button>
          </div>
          <div className='rounded-xl border border-light-border bg-main-search-background/20 p-4 dark:border-dark-border'>
            <p className='text-sm text-light-secondary dark:text-dark-secondary'>
              Créez votre propre chaîne pour partager votre contenu. Seul vous
              pourrez y publier ; les autres pourront la lire.
            </p>
          </div>
        </div>

        {/* Vos chaînes */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold text-light-primary dark:text-dark-primary'>
            Vos chaînes
          </h2>
          {!channels || channels.length === 0 ? (
            <div className='rounded-xl border border-light-border bg-main-search-background/20 p-4 dark:border-dark-border'>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                Vos chaînes apparaîtront ici
              </p>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {channels.map((channel) => (
                <button
                  className='flex items-center gap-3 rounded-xl border border-light-border bg-main-search-background/20 p-3 text-left transition hover:bg-main-search-background/40 dark:border-dark-border'
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  type='button'
                >
                  <ChannelAvatar
                    name={channel.name ?? 'Chaîne'}
                    photoURL={channel.photoURL}
                    shape={channel.avatarShape}
                    size={48}
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-bold text-light-primary dark:text-dark-primary'>
                      {channel.name}
                    </p>
                    {channel.description && (
                      <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
                        {channel.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Découvrir des chaînes */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold text-light-primary dark:text-dark-primary'>
            Découvrir des chaînes
          </h2>
          {!publicChannels || publicChannels.length === 0 ? (
            <div className='rounded-xl border border-light-border bg-main-search-background/20 p-4 dark:border-dark-border'>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                Aucune chaîne à découvrir pour le moment
              </p>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {publicChannels.map((channel) => (
                <button
                  className='flex items-center gap-3 rounded-xl border border-light-border bg-main-search-background/20 p-3 text-left transition hover:bg-main-search-background/40 dark:border-dark-border'
                  key={channel.id}
                  onClick={() =>
                    setSelectedChannel({
                      id: channel.conversationId,
                      participants: [channel.ownerId],
                      updatedAt: channel.createdAt,
                      lastMessage: null,
                      type: 'channel',
                      name: channel.name,
                      photoURL: channel.photoURL,
                      description: channel.description,
                      createdBy: channel.ownerId,
                      avatarShape: channel.avatarShape
                    })
                  }
                  type='button'
                >
                  <ChannelAvatar
                    name={channel.name ?? 'Chaîne'}
                    photoURL={channel.photoURL}
                    shape={channel.avatarShape}
                    size={48}
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-bold text-light-primary dark:text-dark-primary'>
                      {channel.name}
                    </p>
                    {channel.description && (
                      <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
                        {channel.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <AsideTrends inTrendsPage />

      {/* Composer (publications) */}
      <Modal
        className='flex items-end justify-center p-0 xs:items-start xs:justify-center xs:p-4'
        modalAnimation={composeSheetAnimation}
        modalClassName={`fixed inset-x-0 bottom-0 max-h-[90dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-3xl border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:max-h-[90vh] xs:rounded-2xl xs:border ${
          composeExpanded
            ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]'
            : ''
        }`}
        drag='y'
        dragControls={dragControls}
        dragListener={false}
        dragElastic={0.5}
        dragMomentum={true}
        dragSnapToOrigin={false}
        dragConstraints={{ top: 0 }}
        onDragEnd={handleComposeDragEnd}
        open={open}
        closeModal={closeModal}
      >
        <Input
          modal
          closeModal={closeModal}
          sheetHandle
          dragControls={dragControls}
        />
      </Modal>

      {/* Création d'une chaîne */}
      <ChannelCreateModal
        open={channelOpen}
        closeModal={(): void => setChannelOpen(false)}
      />
    </MainContainer>
  );
}

Discover.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <TrendsLayout>{page}</TrendsLayout>
    </MainLayout>
  </ProtectedLayout>
);
