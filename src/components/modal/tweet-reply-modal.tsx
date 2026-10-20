import { useDragControls } from 'framer-motion';
import { useWindow } from '@lib/context/window-context';
import { Modal } from '@components/modal/modal';
import { Input } from '@components/input/input';
import { Tweet } from '@components/tweet/tweet';
import type { Variants } from 'framer-motion';
import type { TweetProps } from '@components/tweet/tweet';

/* Sur téléphone, la réponse s'ouvre comme un menu glissant depuis le bas de
   l'écran (mêmes réglages que la fenêtre « Écrire »). Sur ordinateur, elle
   reste une fenêtre centrée. */
const sheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

type TweetReplyModalProps = {
  tweet: TweetProps;
  open: boolean;
  closeModal: () => void;
};

export function TweetReplyModal({
  tweet,
  open,
  closeModal
}: TweetReplyModalProps): JSX.Element {
  const { isMobile } = useWindow();
  const dragControls = useDragControls();

  return (
    <Modal
      className='flex items-end justify-center p-0 xs:items-start xs:justify-center xs:p-4'
      modalAnimation={isMobile ? sheetAnimation : undefined}
      modalClassName='fixed inset-x-0 bottom-0 max-h-[90dvh] w-full max-w-xl overflow-y-auto
                       overscroll-contain rounded-t-lg border-t border-light-border
                       bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl
                       dark:border-dark-border xs:static xs:my-8 xs:max-h-[90vh] xs:rounded-lg
                       xs:border'
      drag='y'
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0.5}
      dragMomentum
      dragConstraints={{ top: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 200 || info.velocity.y > 1000) closeModal();
      }}
      open={open}
      closeModal={closeModal}
    >
      <Input
        modal
        replyModal
        sheetHandle
        dragControls={dragControls}
        parent={{ id: tweet.id, username: tweet.user.username }}
        closeModal={closeModal}
      >
        <Tweet modal parentTweet {...tweet} />
      </Input>
    </Modal>
  );
}
