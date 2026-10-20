import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useDragControls } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { useModal } from '@lib/hooks/useModal';
import { tweetsCollection } from '@lib/firebase/collections';
import {
  removeTweet,
  manageReply,
  manageFollow,
  managePinnedTweet,
  manageTotalTweets,
  manageTotalPhotos
} from '@lib/firebase/utils';
import { delayScroll, preventBubbling, sleep } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { EditTweetModal } from '@components/modal/edit-tweet-modal';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import type { Variants, PanInfo } from 'framer-motion';
import type { Tweet } from '@lib/types/tweet';
import type { User } from '@lib/types/user';

/** Animation conservée pour le menu de partage du profil. */
export const variants: Variants = {
  initial: { opacity: 0, y: -25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: -25, transition: { duration: 0.2 } }
};

const sheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

const menuItemClass =
  'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-main-sidebar-background';

const tileClass =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent/10 text-main-accent';

type TweetActionsProps = Pick<Tweet, 'createdBy'> & {
  isOwner: boolean;
  ownerId: string;
  tweetId: string;
  username: string;
  parentId?: string;
  hasImages: boolean;
  viewTweet?: boolean;
};

type PinModalData = Record<'title' | 'description' | 'mainBtnLabel', string>;

const pinModalData: Readonly<PinModalData[]> = [
  {
    title: 'Épingler la publication au profil ?',
    description:
      'Cette publication apparaîtra en haut de votre profil et remplacera toute publication précédemment épinglée.',
    mainBtnLabel: 'Épingler'
  },
  {
    title: 'Désépingler la publication du profil ?',
    description:
      'Cette publication n’apparaîtra plus automatiquement en haut de votre profil.',
    mainBtnLabel: 'Désépingler'
  }
];

export function TweetActions({
  isOwner,
  ownerId,
  tweetId,
  parentId,
  username,
  hasImages,
  viewTweet,
  createdBy
}: TweetActionsProps): JSX.Element {
  const { user, isAdmin } = useAuth();
  const { isMobile } = useWindow();
  const { push } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const dragControls = useDragControls();

  const {
    open: removeOpen,
    openModal: removeOpenModal,
    closeModal: removeCloseModal
  } = useModal();

  const {
    open: pinOpen,
    openModal: pinOpenModal,
    closeModal: pinCloseModal
  } = useModal();

  const {
    open: editOpen,
    openModal: editOpenModal,
    closeModal: editCloseModal
  } = useModal();

  /* La modification n'est proposée que sur nos propres publications. */
  const openEditModal = (): void => {
    closeMenu();
    editOpenModal();
  };

  const { id: userId, following, pinnedTweet } = user as User;

  const isInAdminControl = isAdmin && !isOwner;
  const tweetIsPinned = pinnedTweet === tweetId;

  const closeMenu = (): void => setMenuOpen(false);

  /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y > 100 || info.velocity.y > 550) closeMenu();
  };

  const handleRemove = async (): Promise<void> => {
    if (viewTweet)
      if (parentId) {
        const parentSnapshot = await getDoc(doc(tweetsCollection, parentId));
        if (parentSnapshot.exists()) {
          await push(`/tweet/${parentId}`, undefined, { scroll: false });
          delayScroll(200)();
          await sleep(50);
        } else await push('/home');
      } else await push('/home');

    await Promise.all([
      removeTweet(tweetId),
      manageTotalTweets('decrement', ownerId),
      hasImages && manageTotalPhotos('decrement', createdBy),
      parentId && manageReply('decrement', parentId)
    ]);

    toast.success(
      `${isInAdminControl ? `La publication de @${username}` : 'Votre publication'} a été supprimée`
    );

    removeCloseModal();
  };

  const handlePin = async (): Promise<void> => {
    await managePinnedTweet(tweetIsPinned ? 'unpin' : 'pin', userId, tweetId);
    toast.success(
      `Votre publication a été ${tweetIsPinned ? 'désépinglée' : 'épinglée'} sur votre profil`
    );
    pinCloseModal();
  };

  const handleFollow = async (
    type: Parameters<typeof manageFollow>[0]
  ): Promise<void> => {
    closeMenu();
    await manageFollow(type, userId, createdBy);

    toast.success(
      `${type === 'follow' ? 'Vous suivez maintenant' : 'Vous ne suivez plus'} @${username}`
    );
  };

  const userIsFollowed =
    Array.isArray(following) && following.includes(createdBy);

  const currentPinModalData = useMemo(
    () => pinModalData[+tweetIsPinned],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pinOpen]
  );

  const openRemoveModal = (): void => {
    closeMenu();
    removeOpenModal();
  };

  const openPinModal = (): void => {
    closeMenu();
    pinOpenModal();
  };

  return (
    <>
      <Button
        aria-expanded={menuOpen}
        aria-haspopup='dialog'
        className={cn(
          `main-tab group absolute top-2 right-4 p-2 xs:right-2
           hover:bg-accent-blue/10 focus-visible:bg-accent-blue/10
           focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20`,
          menuOpen && 'bg-accent-blue/10 [&>div>svg]:text-accent-blue'
        )}
        onClick={preventBubbling((): void => setMenuOpen(true))}
      >
        <div className='group relative'>
          <MaterialIcon
            className='h-5 w-5 text-light-secondary group-hover:text-accent-blue
                       group-focus-visible:text-accent-blue dark:text-dark-secondary/80'
            iconName='more_horiz'
          />
          {!menuOpen && <ToolTip tip='Plus' />}
        </div>
      </Button>
      <Modal
        className={cn(
          'justify-center p-0',
          isMobile ? 'flex items-end' : 'flex items-center p-4'
        )}
        closeModal={closeMenu}
        closeOnBackdropClick
        modalAnimation={isMobile ? sheetAnimation : undefined}
        drag={isMobile ? 'y' : undefined}
        dragControls={dragControls}
        dragListener={false}
        dragElastic={0.5}
        dragMomentum={true}
        dragSnapToOrigin={false}
        dragConstraints={{ top: 0 }}
        onDragEnd={handleDragEnd}
        modalClassName={cn(
          'flex w-full flex-col overflow-hidden bg-main-background shadow-2xl',
          isMobile
            ? 'max-h-[80dvh] max-w-lg rounded-t-xl pb-[max(1rem,env(safe-area-inset-bottom))]'
            : 'max-w-sm rounded-lg'
        )}
        open={menuOpen}
      >
        {isMobile && (
          <button
            aria-label='Faire glisser pour fermer le menu Options'
            className='flex w-full touch-none justify-center py-3'
            onPointerDown={(event) => dragControls.start(event.nativeEvent)}
            type='button'
          >
            <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
          </button>
        )}
        <header className='flex items-center gap-1 px-3 py-3'>
          <h2 className='flex-1 px-1 text-lg font-bold'>Options</h2>
          <Button
            aria-label='Fermer'
            className='rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
            onClick={closeMenu}
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </Button>
        </header>
        <div className='flex flex-col px-2 pb-2'>
          {isOwner && (
            <Button className={menuItemClass} onClick={openEditModal}>
              <span className={tileClass}>
                <MaterialIcon className='h-5 w-5' iconName='edit_square' />
              </span>
              <span className='min-w-0 flex-1'>Modifier</span>
            </Button>
          )}
          {(isAdmin || isOwner) && (
            <Button
              className={cn(menuItemClass, 'text-accent-red')}
              onClick={openRemoveModal}
            >
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-red/10 text-accent-red'>
                <MaterialIcon className='h-5 w-5' iconName='delete' />
              </span>
              <span className='min-w-0 flex-1'>Supprimer</span>
            </Button>
          )}
          {isOwner ? (
            <Button className={menuItemClass} onClick={openPinModal}>
              <span className={tileClass}>
                <CustomIcon
                  className='h-5 w-5'
                  iconName={tweetIsPinned ? 'PinOffIcon' : 'PinIcon'}
                />
              </span>
              <span className='min-w-0 flex-1'>
                {tweetIsPinned
                  ? 'Désépingler du profil'
                  : 'Épingler sur votre profil'}
              </span>
            </Button>
          ) : userIsFollowed ? (
            <Button
              className={menuItemClass}
              onClick={(): void => void handleFollow('unfollow')}
            >
              <span className={tileClass}>
                <MaterialIcon className='h-5 w-5' iconName='person_remove' />
              </span>
              <span className='min-w-0 flex-1'>
                Ne plus suivre @{username}
              </span>
            </Button>
          ) : (
            <Button
              className={menuItemClass}
              onClick={(): void => void handleFollow('follow')}
            >
              <span className={tileClass}>
                <MaterialIcon className='h-5 w-5' iconName='person_add' />
              </span>
              <span className='min-w-0 flex-1'>Suivre @{username}</span>
            </Button>
          )}
        </div>
      </Modal>
      <EditTweetModal
        open={editOpen}
        tweetId={tweetId}
        closeModal={editCloseModal}
      />
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={removeOpen}
        closeModal={removeCloseModal}
      >
        <ActionModal
          title='Supprimer la publication ?'
          description={`Cette action est irréversible et la publication sera supprimée de ${
            isInAdminControl ? `le profil de @${username}` : 'votre'
          } profil, le fil des comptes qui suivent ${
            isInAdminControl ? `@${username}` : 'vous'
          } et des résultats de recherche Twitter.`}
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab
                            focus-visible:bg-accent-red/90'
          mainBtnLabel='Supprimer'
          focusOnMainBtn
          action={handleRemove}
          closeModal={removeCloseModal}
        />
      </Modal>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={pinOpen}
        closeModal={pinCloseModal}
      >
        <ActionModal
          {...currentPinModalData}
          mainBtnClassName='bg-light-primary hover:bg-light-primary/90 active:bg-light-primary/80 dark:text-light-primary
                            dark:bg-light-border dark:hover:bg-light-border/90 dark:active:bg-light-border/75'
          focusOnMainBtn
          action={handlePin}
          closeModal={pinCloseModal}
        />
      </Modal>
    </>
  );
}
