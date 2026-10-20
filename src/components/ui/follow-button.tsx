import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { manageFollow } from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';

type FollowButtonProps = {
  userTargetId: string;
  userTargetUsername: string;
};

export function FollowButton({
  userTargetId,
  userTargetUsername
}: FollowButtonProps): JSX.Element | null {
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();
  const [pending, setPending] = useState(false);
  const [followOverride, setFollowOverride] = useState<boolean | null>(null);

  const { id: userId, following } = user ?? {};

  const authSaysFollowed = !!following?.includes(userTargetId);
  const userIsFollowed = followOverride ?? authSaysFollowed;

  useEffect(() => {
    if (followOverride === authSaysFollowed) setFollowOverride(null);
  }, [authSaysFollowed, followOverride]);

  if (user?.id === userTargetId) return null;

  const handleFollow = async (): Promise<void> => {
    if (!userId || pending) return;
    setPending(true);
    setFollowOverride(true);
    try {
      await manageFollow('follow', userId, userTargetId);
    } catch {
      setFollowOverride(null);
      toast.error('Impossible de suivre ce compte. Réessaie.');
    } finally {
      setPending(false);
    }
  };

  const handleUnfollow = async (): Promise<void> => {
    if (!userId || pending) return;
    setPending(true);
    setFollowOverride(false);
    try {
      await manageFollow('unfollow', userId, userTargetId);
      closeModal();
    } catch {
      setFollowOverride(null);
      toast.error('Impossible de se désabonner. Réessaie.');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          title={`Ne plus suivre @${userTargetUsername} ?`}
          description='Ses publications n’apparaîtront plus dans votre fil d’accueil. Vous pouvez toujours consulter son profil, sauf si ses publications sont protégées.'
          mainBtnLabel='Ne plus suivre'
          secondaryBtnLabel='Annuler'
          action={handleUnfollow}
          closeModal={closeModal}
        />
      </Modal>
      {userIsFollowed ? (
        <Button
          className='dark-bg-tab relative flex min-w-[140px] justify-center self-start whitespace-nowrap border border-light-line-reply px-4 py-1.5
                     font-bold transition-colors hover:border-accent-red hover:bg-accent-red hover:text-white
                     dark:border-light-secondary'
          onClick={preventBubbling(openModal)}
          disabled={pending}
          aria-label={`Ne plus suivre @${userTargetUsername}`}
        >
          <span>Abonné</span>
        </Button>
      ) : (
        <Button
          className='self-start border border-main-accent bg-main-accent px-4 py-1.5 font-bold text-white
                     hover:bg-main-accent/90 focus-visible:bg-main-accent/90 active:bg-main-accent/75'
          onClick={preventBubbling(handleFollow)}
          disabled={pending}
          aria-label={`Suivre @${userTargetUsername}`}
        >
          {pending ? 'En cours…' : 'Suivre'}
        </Button>
      )}
    </>
  );
}
