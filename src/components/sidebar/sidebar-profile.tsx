import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import Link from 'next/link';
import { useAuth } from '@lib/context/auth-context';
import { useTheme } from '@lib/context/theme-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { DisplayModal } from '@components/modal/display-modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import type { Variants } from 'framer-motion';
import type { User } from '@lib/types/user';

const menuVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.16, ease: 'easeOut' }
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } }
};

export function SidebarProfile(): JSX.Element {
  const { user, signOut } = useAuth();
  const { avatarShape: localShape, avatarFrame: localFrame } = useTheme();
  const {
    open: logoutOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal
  } = useModal();
  const {
    open: displayOpen,
    openModal: openDisplayModal,
    closeModal: closeDisplayModal
  } = useModal();

  const {
    name,
    username,
    verified,
    photoURL,
    gender,
    avatarShape,
    avatarFrame
  } = user as User;

  /* Forme et cadre personnels : on utilise d'abord ce que contient le profil,
     puis la personnalisation locale (Apparence) pour que l'avatar et son
     effet s'affichent même si le profil n'a pas encore enregistré le choix. */
  const shape = avatarShape ?? localShape;
  const frame = avatarFrame ?? localFrame;

  return (
    <Link href={`/user/${username}`}>
      <a className='custom-button main-tab dark-bg-tab flex w-full items-center justify-between hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'>
        {/* Pas de `truncate` ici : son `overflow-hidden` rognait l'anneau / le
            cadre autour de l'avatar. */}
        <div className='flex min-w-0 items-center gap-3'>
          <UserAvatar
            src={photoURL}
            alt={name}
            size={40}
            gender={gender}
            username={undefined}
            frame={frame}
            shape={shape}
          />
          <div className='hidden min-w-0 truncate text-start leading-5 xl:block'>
            <UserName
              name={name}
              className='start font-semibold'
              verified={verified}
            />
            <UserUsername username={username} disableLink />
          </div>
        </div>
      </a>
    </Link>
  );
}
