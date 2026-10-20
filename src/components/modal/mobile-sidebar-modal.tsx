import { useTheme } from '@lib/context/theme-context';
import { Button } from '@components/ui/button';
import { MainHeader } from '@components/home/main-header';
import { MobileSidebarLink } from '@components/sidebar/mobile-sidebar-link';
import { MaterialIcon } from '@components/ui/material-icon';
import type { NavLink } from '@components/sidebar/sidebar';
import type { User } from '@lib/types/user';
import type { DragControls } from 'framer-motion';

export type MobileNavLink = Omit<NavLink, 'canBeHidden'>;

const topNavLinks: Readonly<MobileNavLink[]> = [
  {
    href: '/messages',
    linkName: 'Messagerie',
    iconName: 'mail'
  },
  {
    href: '/notifications',
    linkName: 'Notifications',
    iconName: 'notifications'
  },
  {
    href: '/people',
    linkName: 'Utilisateurs',
    iconName: 'dashboard_customize'
  },
  {
    href: '/settings',
    linkName: 'Réglages',
    iconName: 'tune'
  }
];

type MobileSidebarModalProps = Pick<
  User,
  'username' | 'photoURL' | 'gender' | 'avatarShape' | 'avatarFrame'
> & {
  closeModal: () => void;
  openDisplay: () => void;
  openStatuses: () => void;
  dragControls: DragControls;
};

export function MobileSidebarModal({
  username,
  photoURL,
  gender,
  avatarShape,
  avatarFrame,
  closeModal,
  openDisplay,
  openStatuses,
  dragControls
}: MobileSidebarModalProps): JSX.Element {
  const { avatarShape: localShape, avatarFrame: localFrame } = useTheme();

  /* Repli sur la personnalisation locale (Apparence) : l'avatar du menu doit
     garder sa forme et son cadre même si le profil ne les a pas enregistrés. */
  const menuShape = avatarShape ?? localShape;
  const menuFrame = avatarFrame ?? localFrame;

  const userLink = `/user/${username}`;

  return (
    <>
      {/* Barre fine : elle sert de poignée pour faire glisser le menu vers le
          bas (le refermer) ou vers le haut (l'étirer sur tout l'écran). */}
      <button
        aria-label='Faire glisser le menu vers le bas ou vers le haut'
        className='flex w-full touch-none justify-center py-3 xs:hidden'
        onPointerDown={(event) => dragControls.start(event.nativeEvent)}
        type='button'
      >
        <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
      </button>
      <MainHeader
        disableSticky
        useActionButton
        className='flex flex-row-reverse items-center justify-between px-5 py-1'
        iconName='close'
        title='Compte'
        tip='Fermer'
        action={closeModal}
      />
      <section className='mt-0.5 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]'>
        <nav aria-label='Autres sections' className='flex flex-col'>
          <MobileSidebarLink
            href={userLink}
            iconName='person'
            linkName='Profil'
            avatarSrc={photoURL ?? ''}
            gender={gender}
            shape={menuShape}
            frame={menuFrame}
            closeMenu={closeModal}
          />
          {topNavLinks.map((linkData) => (
            <MobileSidebarLink
              {...linkData}
              closeMenu={closeModal}
              key={linkData.href}
            />
          ))}
        </nav>
        <i className='my-3 block h-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
        <nav aria-label='Préférences et compte' className='flex flex-col'>
          <Button
            className='accent-tab accent-bg-tab flex items-center gap-4 rounded-md p-2 text-lg font-bold transition
                       hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c] 
                       dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white'
            onClick={openDisplay}
          >
            <MaterialIcon className='h-6 w-6' iconName='appearance' />
            Apparence
          </Button>
          <Button
            className='accent-tab accent-bg-tab flex items-center gap-4 rounded-md p-2 text-lg font-bold transition
                       hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c] 
                       dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white'
            onClick={openStatuses}
          >
            <MaterialIcon className='h-6 w-6' iconName='subscriptions' />
            Statuts
          </Button>
        </nav>
      </section>
    </>
  );
}
