import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { Modal } from '@components/modal/modal';
import { EmailAuthModal } from '@components/modal/email-auth-modal';
import { NextImage } from '@components/ui/next-image';
import { SiteLogo } from '@components/common/site-logo';
import { Button } from '@components/ui/button';
import { useDragControls } from 'framer-motion';
import type { Variants } from 'framer-motion';

const sheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

export function LoginMain(): JSX.Element {
  const [emailModal, setEmailModal] = useState<'signIn' | 'signUp' | null>(
    null
  );
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const dragControls = useDragControls();
  const { signInWithEmail, signUpWithEmail, error, loading } = useAuth();
  const openAuthModal = (mode: 'signIn' | 'signUp'): void => {
    setSheetExpanded(false);
    setEmailModal(mode);
  };
  const closeAuthModal = (): void => {
    setSheetExpanded(false);
    setEmailModal(null);
  };

  return (
    <main className='grid min-h-0 lg:grid-cols-2'>
      <section className='relative hidden min-h-0 items-center justify-center overflow-hidden bg-white lg:flex'>
        <NextImage
          imgClassName='!object-contain'
          blurClassName='bg-white'
          src='/Discussion.jpg'
          alt='Des personnes réunies autour d’une idée'
          layout='fill'
          priority
          useSkeleton
        />
      </section>

      <section className='mx-auto flex w-full max-w-xl flex-col justify-center px-5 py-8 sm:px-10 lg:max-w-none lg:px-12 lg:py-4 xl:px-20'>
        <div className='mb-7 flex items-center gap-3 lg:mb-6 xl:mb-8'>
          <SiteLogo size={48} />
          <span className='font-brand text-[1.8rem] font-semibold tracking-[-0.05em] text-[#202124]'>
            Inspiration
          </span>
        </div>

        <div className='max-w-lg'>
          <h1 className='text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-[3.2rem]'>
            Ça se passe maintenant.
          </h1>
          <p className='mt-3 max-w-md text-base leading-relaxed text-light-secondary dark:text-dark-secondary lg:mt-2 xl:text-lg'>
            Des conversations, des découvertes et des idées à partager — avec
            des personnes qui comptent.
          </p>
          <h2 className='mt-6 text-lg font-medium tracking-tight text-[#1877b9] sm:mt-7 sm:text-xl lg:mt-5'>
            Rejoignez Inspiration aujourd’hui.
          </h2>

          <div className='[&_button]:min-h-11 mt-4 flex flex-col gap-2.5 lg:mt-3 lg:gap-2 [&_button]:py-2.5'>
            <Button
              className='rounded-full bg-accent-blue font-semibold text-white transition hover:brightness-95 focus-visible:!ring-accent-blue/80 active:brightness-90'
              onClick={() => openAuthModal('signUp')}
            >
              Créer un compte avec un e-mail
            </Button>
            <p className='px-1 text-center text-xs leading-relaxed text-light-secondary dark:text-dark-secondary'>
              En vous inscrivant, vous acceptez nos{' '}
              <a
                className='underline decoration-light-secondary/50 underline-offset-2 hover:text-accent-blue'
                href='/terms'
                target='_blank'
                rel='noreferrer'
              >
                conditions d’utilisation
              </a>{' '}
              et notre{' '}
              <a
                className='underline decoration-light-secondary/50 underline-offset-2 hover:text-accent-blue'
                href='/privacy'
                target='_blank'
                rel='noreferrer'
              >
                politique de confidentialité
              </a>
              , y compris l’utilisation des cookies.
            </p>
          </div>

          <div className='mt-6 border-t border-light-border pt-4 dark:border-dark-border sm:mt-7 lg:mt-5 lg:pt-3'>
            <p className='text-sm text-light-secondary dark:text-dark-secondary'>
              Vous avez déjà un compte ?
            </p>
            <Button
              className='min-h-10 mt-2 w-full rounded-full border border-light-line-reply font-semibold text-accent-blue hover:bg-accent-blue/10 focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20 dark:border-dark-line-reply sm:w-60'
              onClick={() => openAuthModal('signIn')}
            >
              Se connecter
            </Button>
          </div>
        </div>
      </section>

      <Modal
        open={emailModal !== null}
        closeModal={closeAuthModal}
        className='flex items-end justify-center p-0 sm:items-center sm:p-4'
        modalAnimation={sheetAnimation}
        modalClassName='fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md sm:static'
        drag='y'
        dragListener={false}
        dragControls={dragControls}
        dragElastic={0.25}
        dragMomentum={false}
        dragSnapToOrigin
        onDrag={(_, info) => {
          if (info.offset.y < -32) setSheetExpanded(true);
        }}
        onDragEnd={(_, info) => {
          if (info.offset.y < -60) {
            setSheetExpanded(true);
            return;
          }
          if (sheetExpanded && info.offset.y > 70) {
            setSheetExpanded(false);
            return;
          }
          if (info.offset.y > 120 || info.velocity.y > 550) closeAuthModal();
        }}
      >
        {emailModal && (
          <EmailAuthModal
            mode={emailModal}
            dragControls={dragControls}
            sheetExpanded={sheetExpanded}
            loading={loading}
            error={error}
            closeModal={closeAuthModal}
            signInWithEmail={signInWithEmail}
            signUpWithEmail={signUpWithEmail}
          />
        )}
      </Modal>
    </main>
  );
}
