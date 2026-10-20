import { Dialog } from '@headlessui/react';
import { SiteLogo } from '@components/common/site-logo';
import { Button } from '@components/ui/button';
import type { ReactNode, FormEvent } from 'react';

type UsernameModalProps = {
  loading: boolean;
  children: ReactNode;
  available: boolean;
  alreadySet: boolean;
  changeUsername: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  cancelUpdateUsername: () => void;
};

const usernameModalData = [
  {
    title: 'Comment souhaitez-vous être appelé ?',
    description:
      'Votre @nom d’utilisateur est unique. Vous pourrez toujours le modifier plus tard.',
    cancelLabel: 'Passer'
  },
  {
    title: 'Modifier votre nom d’utilisateur ?',
    description:
      'Votre @nom d’utilisateur est unique. Vous pouvez le modifier ici à tout moment.',
    cancelLabel: 'Annuler'
  }
] as const;

export function UsernameModal({
  loading,
  children,
  available,
  alreadySet,
  changeUsername,
  cancelUpdateUsername
}: UsernameModalProps): JSX.Element {
  const { title, description, cancelLabel } = usernameModalData[+alreadySet];

  return (
    <form
      className='flex h-full flex-col justify-between'
      onSubmit={changeUsername}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <i className='mx-auto'>
            <SiteLogo size={56} />
          </i>
          <div className='flex flex-col gap-2'>
            <Dialog.Title className='text-2xl font-bold xs:text-3xl sm:text-4xl'>
              {title}
            </Dialog.Title>
            <Dialog.Description className='text-light-secondary dark:text-dark-secondary'>
              {description}
            </Dialog.Description>
          </div>
        </div>
        {children}
      </div>
      <div className='flex flex-col gap-3 inner:py-2 inner:font-bold'>
        <Button
          className='bg-light-primary text-white transition focus-visible:bg-light-primary/90
                     enabled:hover:bg-light-primary/90 enabled:active:bg-light-primary/80 
                     dark:bg-light-border dark:text-light-primary dark:focus-visible:bg-light-border/90 
                     dark:enabled:hover:bg-light-border/90 dark:enabled:active:bg-light-border/75'
          type='submit'
          loading={loading}
          disabled={!available}
        >
          Définir le nom d’utilisateur
        </Button>
        <Button
          className='border border-light-line-reply hover:bg-light-primary/10 focus-visible:bg-light-primary/10
                     active:bg-light-primary/20 dark:border-light-secondary dark:text-light-border 
                     dark:hover:bg-light-border/10 dark:focus-visible:bg-light-border/10 
                     dark:active:bg-light-border/20'
          onClick={cancelUpdateUsername}
        >
          {cancelLabel}
        </Button>
      </div>
    </form>
  );
}
