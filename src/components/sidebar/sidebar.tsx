import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { Input } from '@components/input/input';
import { SiteLogo } from '@components/common/site-logo';
import { BottomNavIcon } from '@components/common/bottom-nav-icon';
import { Button } from '@components/ui/button';
import { SidebarLink } from './sidebar-link';
import { MaterialIcon } from '@components/ui/material-icon';
import { MoreSettings } from './more-settings';
import { SidebarProfile } from './sidebar-profile';
import { MobileSidebar } from './mobile-sidebar';
import { DisplayModal } from '@components/modal/display-modal';
import type { IconName } from '@components/ui/material-icon';
import { useCollection } from '@lib/hooks/useCollection';
import {
  userNotificationsCollection,
  userConversationsCollection
} from '@lib/firebase/collections';
import { isConversationUnread } from '@lib/firebase/chat';
import { query, where, limit } from 'firebase/firestore';
import type { Notification } from '@lib/types/notification';
import type { Conversation } from '@lib/types/message';
import type { PanInfo, Variants } from 'framer-motion';

export type NavLink = {
  href: string;
  linkName: string;
  iconName: IconName;
  iconSrc?: string;
  disabled?: boolean;
  canBeHidden?: boolean;
};

const navLinks: Readonly<NavLink[]> = [
  {
    href: '/home',
    linkName: 'Accueil',
    iconName: 'home'
  },
  {
    href: '/trends',
    linkName: 'Découvrir',
    iconName: 'search',
    canBeHidden: true
  },
  {
    href: '/notifications',
    linkName: 'Notifications',
    iconName: 'notifications'
  },
  {
    href: '/messages',
    linkName: 'Messagerie',
    iconName: 'mail'
  },
  {
    href: '/bookmarks',
    linkName: 'Signets',
    iconName: 'favorite',
    canBeHidden: true
  },
  {
    href: '/settings',
    linkName: 'Réglages',
    iconName: 'tune'
  }
];

const composeSheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

export function Sidebar(): JSX.Element {
  const { user } = useAuth();
  const { isMobile } = useWindow();
  const { asPath } = useRouter();

  const { open, openModal, closeModal } = useModal();
  const {
    open: displayOpen,
    openModal: openDisplayModal,
    closeModal: closeDisplayModal
  } = useModal();
  const [composeExpanded, setComposeExpanded] = useState(false);
  const dragControls = useDragControls();
  const barRef = useRef<HTMLDivElement>(null);

  /* Sur téléphone, la barre du bas s'efface quand on descend et revient
     quand on remonte. Le suivi se fait sur la classe CSS (aucun rendu React,
     aucune animation image par image : c'est un simple `transform` que le
     navigateur anime sur le GPU). */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let lastY = window.scrollY;
    let hidden = false;

    const handleScroll = (): void => {
      const y = window.scrollY;

      /* En haut de page, la barre est toujours là. */
      if (y <= 0) {
        hidden = false;
      } else {
        const delta = y - lastY;

        /* Un seuil : les micro-mouvements du doigt ne doivent pas faire
           clignoter la barre. */
        if (Math.abs(delta) >= 10) {
          lastY = y;

          /* On descend → la barre s'efface ; on remonte → elle revient. */
          hidden = delta > 0;
        }
      }

      /* La classe est reappliquée à chaque défilement : elle a pu être
         retirée entre-temps (quand le clavier se ferme, la barre doit
         revenir). */
      bar.classList.toggle('mobile-bar-hidden', hidden);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const username = user?.username as string;

  const { data: unreadNotifs } = useCollection<Notification>(
    user?.id
      ? query(
          userNotificationsCollection(user.id),
          where('read', '==', false),
          limit(10)
        )
      : (null as never),
    { allowNull: true, disabled: !user?.id }
  );
  const { data: convos } = useCollection<Conversation>(
    user?.id
      ? query(userConversationsCollection(user.id), limit(20))
      : (null as never),
    { allowNull: true, disabled: !user?.id }
  );

  const onNotificationsPage = asPath === '/notifications';
  const onMessagesPage = asPath === '/messages';

  const notifBadge = onNotificationsPage
    ? 0
    : Math.min((unreadNotifs ?? []).length, 10);
  const unreadMsgCount = (convos ?? []).filter((conversation) =>
    isConversationUnread(conversation, user?.id ?? '')
  ).length;
  const msgBadge = onMessagesPage ? 0 : Math.min(unreadMsgCount, 10);

  return (
    <header
      id='sidebar'
      className='flex w-0 shrink-0 transition-opacity duration-200 xs:w-20 md:w-24
                 lg:max-w-none xl:-mr-4 xl:w-full xl:max-w-xs xl:justify-end'
    >
      <Modal
        className='flex items-end justify-center p-0 xs:items-start xs:justify-center xs:p-4'
        modalAnimation={isMobile ? composeSheetAnimation : undefined}
        modalClassName={`fixed inset-x-0 bottom-0 max-h-[90dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:max-h-[90vh] xs:rounded-lg xs:border ${
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
        onDrag={(_, info) => {
          // Suppression de l'expansion vers le haut
        }}
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
      <Modal
        className='flex items-start justify-center !overflow-hidden p-4'
        modalClassName='my-auto max-h-[calc(100dvh_-_2rem)] max-w-xl bg-main-background w-full p-8 rounded-md
                       hover-animation overflow-y-auto overscroll-contain'
        open={displayOpen}
        closeModal={closeDisplayModal}
      >
        <DisplayModal closeModal={closeDisplayModal} />
      </Modal>
      <div
        className='fixed bottom-3 z-40 mx-3 flex w-[calc(100%-1.5rem)] flex-col
                   justify-between rounded-[2rem] border border-light-border/60
                   bg-main-background/90 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                   backdrop-blur-2xl transition-transform duration-200 ease-out dark:border-dark-border/60 dark:bg-main-background/90
                   max-[499px]:bg-main-background max-[499px]:backdrop-blur-0
                   xs:top-0 xs:mx-0 xs:h-full xs:w-auto xs:rounded-none xs:border-0 xs:bg-transparent
                   xs:px-2 xs:py-3 xs:pt-2 xs:shadow-none md:px-4 xl:w-72'
        data-mobile-bar
        ref={barRef}
      >
        <section className='flex flex-col justify-center gap-0 xs:items-center xs:gap-2 xl:items-stretch'>
          <h1 className='hidden xs:flex'>
            <Link href='/home'>
              <a
                className='custom-button main-tab flex items-center gap-4 text-accent-blue transition hover:bg-light-primary/10 
                           focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80
                           dark:text-twitter-icon dark:hover:bg-dark-primary/10'
              >
                <SiteLogo size={28} />
                <span className='hidden font-title text-xl font-bold tracking-tight text-light-primary dark:text-dark-primary xl:block'>
                  Inspiration
                </span>
              </a>
            </Link>
          </h1>
          <nav className='hidden items-center justify-around xs:flex xs:flex-col xs:justify-center xl:block'>
            {navLinks.map(({ ...linkData }) => (
              <SidebarLink
                {...linkData}
                badge={
                  linkData.href === '/notifications'
                    ? notifBadge
                    : linkData.href === '/messages'
                    ? msgBadge
                    : undefined
                }
                key={linkData.href}
              />
            ))}
            <button
              type='button'
              onClick={openDisplayModal}
              className='custom-button flex gap-4 text-xl transition group-hover:bg-light-primary/10 group-focus-visible:ring-2
                         group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 dark:group-focus-visible:ring-white
                         xl:pr-5'
            >
              <MaterialIcon className='h-7 w-7' iconName='appearance' />
              <p className='hidden xl:block'>Apparence</p>
            </button>
          </nav>
          <nav
            aria-label='Navigation principale'
            className='grid grid-cols-5 items-stretch justify-items-stretch gap-0.5 px-1.5 pt-1 xs:hidden'
          >
            {[
              { href: '/home', label: 'Accueil', iconName: 'home' },
              { href: '/trends', label: 'Découvrir', iconName: 'search' },
              { href: '/messages', label: 'Messagerie', iconName: 'mail' },
              { href: '/bookmarks', label: 'Signets', iconName: 'favorite' }
            ].map(({ href, label, iconName }) => {
              const active = asPath === href;
              const badge =
                href === '/messages'
                  ? msgBadge
                  : href === '/notifications'
                  ? notifBadge
                  : 0;

              return (
                <Link href={href} key={href}>
                  <a
                    aria-current={active ? 'page' : undefined}
                    className={`accent-tab relative flex h-14 w-full min-w-0 flex-col items-center justify-center gap-0.5 whitespace-nowrap rounded-full px-0.5 py-1.5 text-[11px] font-medium leading-tight transition-colors active:bg-light-primary/10 dark:active:bg-dark-primary/20 ${
                      active
                        ? 'font-semibold text-main-accent'
                        : 'text-light-secondary dark:text-dark-secondary'
                    }`}
                  >
                    {/* Pastille de l'onglet actif, comme dans WhatsApp : elle
                        grandit depuis son centre et s'efface en fondu. Chaque
                        onglet possède la sienne — aucune ne glisse d'un onglet
                        à l'autre. */}
                    <motion.span
                      aria-hidden='true'
                      animate={{
                        opacity: active ? 1 : 0,
                        scaleX: active ? 1 : 0.32
                      }}
                      className='pointer-events-none absolute inset-0 rounded-full bg-light-primary/[0.12] dark:bg-dark-primary/[0.18]'
                      initial={false}
                      transition={{
                        opacity: { duration: 0.12 },
                        scaleX: { type: 'spring', stiffness: 320, damping: 26 }
                      }}
                    />
                    <BottomNavIcon active={active}>
                      <MaterialIcon
                        className='h-6 w-6'
                        iconName={iconName as IconName}
                        solid={active}
                      />
                      {badge > 0 && (
                        <span className='absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white'>
                          {badge > 9 ? '9+' : badge}
                        </span>
                      )}
                    </BottomNavIcon>
                    <span className='relative max-w-full truncate'>
                      {label}
                    </span>
                  </a>
                </Link>
              );
            })}
            <span className='relative flex w-full min-w-0'>
              <MobileSidebar bottomTrigger />
              {notifBadge > 0 && (
                <span className='absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white'>
                  {notifBadge > 9 ? '9+' : notifBadge}
                </span>
              )}
            </span>
          </nav>

          {/* Bouton flottant de publication, sur mobile. Il est ancré à la barre
              (et non à une hauteur en dur) : `bottom-full` le place juste
              au-dessus d'elle, quelle que soit sa hauteur réelle. Les icônes
              restent donc toujours visibles. */}
          {asPath === '/home' && (
            <Button
              aria-label='Écrire une publication'
              className='accent-tab absolute bottom-full right-2 z-20 mb-3
                         flex h-14 w-14 items-center justify-center rounded-full
                         bg-main-accent text-white transition-transform duration-150
                         active:scale-95 xs:hidden'
              onClick={openComposer}
            >
              <MaterialIcon className='h-7 w-7 text-white' iconName='add' />
            </Button>
          )}

          {/* Desktop publish button */}
          <Button
            className='accent-tab absolute right-4 hidden -translate-y-[72px] items-center justify-center bg-main-accent text-center text-lg font-bold text-white
                       outline-none transition hover:brightness-90 active:brightness-75 xs:static xs:flex
                       xs:translate-y-0 xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 xl:w-11/12'
            onClick={openComposer}
          >
            <MaterialIcon className='block h-7 w-7 xl:hidden' iconName='add' />
            <p className='m-0 hidden xl:block'>Publier</p>
          </Button>
        </section>
        {!isMobile && <SidebarProfile />}
      </div>
    </header>
  );
}
