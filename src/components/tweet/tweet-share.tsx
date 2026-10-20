import Link from 'next/link';
import { useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useDragControls } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { manageBookmark } from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import { siteURL } from '@lib/env';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { ToolTip } from '@components/ui/tooltip';
import { Modal } from '@components/modal/modal';
import { CustomIcon } from '@components/ui/custom-icon';
import type { Variants, PanInfo } from 'framer-motion';
import type { IconName } from '@components/ui/material-icon';

type TweetShareProps = {
  userId: string;
  tweetId: string;
  viewTweet?: boolean;
  /** Aperçu affiché dans le panneau « Partager via… ». */
  text?: string | null;
  name?: string;
  username?: string;
  photoURL?: string;
  previewImage?: string;
};

type ShareTarget = {
  id: string;
  label: string;
  iconName?: IconName;
  iconClassName: string;
  /** Icône officielle de l'application (dossier « App icon »). */
  appIcon?: string;
  href?: string;
  onClick?: () => void;
  customIcon?: JSX.Element;
};

function ShareTargetIcon({ target }: { target: ShareTarget }): JSX.Element {
  const [failed, setFailed] = useState(false);

  if (target.appIcon && !failed)
    return (
      <span className='flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 dark:ring-white/10'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=''
          className='h-full w-full object-contain'
          loading='lazy'
          onError={(): void => setFailed(true)}
          src={target.appIcon}
        />
      </span>
    );

  return (
    <span
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
        target.iconClassName
      )}
    >
      {target.customIcon ??
        (target.iconName && (
          <MaterialIcon className='h-5 w-5' iconName={target.iconName} />
        ))}
    </span>
  );
}

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

export function TweetShare({
  userId,
  tweetId,
  viewTweet,
  text,
  name,
  username,
  photoURL,
  previewImage
}: TweetShareProps): JSX.Element {
  const { userBookmarks } = useAuth();
  const { isMobile } = useWindow();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'share'>('menu');
  const dragControls = useDragControls();

  const tweetURL = `${siteURL}/tweet/${tweetId}`;
  const trimmedText = text?.trim() ?? '';
  const previewText = trimmedText ? trimmedText : 'Publication sans texte.';
  const shareText = trimmedText
    ? trimmedText
    : 'Découvrez cette publication sur Inspiration.';
  const shareBody = `${shareText}\n\n${tweetURL}`;

  const isApple =
    typeof navigator !== 'undefined' &&
    /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);

  const tweetIsBookmarked = !!userBookmarks?.some(({ id }) => id === tweetId);

  const close = (): void => setOpen(false);

  /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y > 100 || info.velocity.y > 550) close();
  };

  const openMenu = (): void => {
    setView('menu');
    setOpen(true);
  };

  const handleCopy = async (): Promise<void> => {
    close();
    await navigator.clipboard.writeText(tweetURL);
    toast.success('Lien copié dans le presse-papiers');
  };

  const handleBookmark = async (): Promise<void> => {
    const type = tweetIsBookmarked ? 'unbookmark' : 'bookmark';
    close();
    await manageBookmark(type, userId, tweetId);

    toast.success(
      type === 'bookmark'
        ? (): JSX.Element => (
            <span className='flex gap-2'>
              Publication ajoutée à vos signets
              <Link href='/bookmarks'>
                <a className='custom-underline font-bold'>Voir</a>
              </Link>
            </span>
          )
        : 'Publication retirée de vos signets'
    );
  };

  /* Partage natif : c'est le vrai panneau du système (Google Messages sur
     Android, Apple Messages sur iPhone, etc.). Repli sur le presse-papiers
     quand l'appareil ne le propose pas. */
  const handleSystemShare = async (): Promise<void> => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }

    close();

    try {
      await navigator.share({
        title: 'Inspiration',
        text: shareText,
        url: tweetURL
      });
    } catch {
      /* Partage annulé par l'utilisateur. */
    }
  };

  const openTarget = (target: ShareTarget): void => {
    close();

    if (target.onClick) {
      target.onClick();
      return;
    }

    if (!target.href) return;

    if (target.href.startsWith('http')) {
      window.open(target.href, '_blank', 'noopener,noreferrer');
      return;
    }

    /* sms: et mailto: doivent ouvrir l'application native correspondante. */
    window.location.href = target.href;
  };

  const shareTargets: ShareTarget[] = [
    {
      id: 'system',
      label: 'Partage système',
      iconName: 'ios_share',
      iconClassName: 'bg-main-accent text-white',
      onClick: () => void handleSystemShare()
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      iconName: 'chat_bubble',
      iconClassName: 'bg-[#25D366] text-white',
      appIcon: '/icons/apps/whatsapp.png',
      href: `https://wa.me/?text=${encodeURIComponent(shareBody)}`
    },
    {
      id: 'gmail',
      label: 'Gmail',
      iconName: 'mail',
      iconClassName: 'bg-[#EA4335] text-white',
      appIcon: '/icons/apps/gmail.webp',
      href: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
        'Une publication sur Inspiration'
      )}&body=${encodeURIComponent(shareBody)}`
    },
    {
      id: 'messages',
      label: isApple ? 'Apple Messages' : 'Google Messages',
      iconName: 'sms',
      iconClassName: 'bg-[#1A73E8] text-white',
      appIcon: isApple
        ? '/icons/apps/apple-messages.svg'
        : '/icons/apps/google-messages.webp',
      href: `sms:${isApple ? '&' : '?'}body=${encodeURIComponent(shareBody)}`,
      customIcon: isApple ? (
        <CustomIcon className='h-5 w-5' iconName='AppleIcon' />
      ) : undefined
    },
    {
      id: 'telegram',
      label: 'Telegram',
      iconName: 'send',
      iconClassName: 'bg-[#229ED9] text-white',
      appIcon: '/icons/apps/telegram.png',
      href: `https://t.me/share/url?url=${encodeURIComponent(
        tweetURL
      )}&text=${encodeURIComponent(shareText)}`
    },
    {
      id: 'facebook',
      label: 'Facebook',
      iconName: 'public',
      iconClassName: 'bg-[#1877F2] text-white',
      appIcon: '/icons/apps/facebook.png',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        tweetURL
      )}`
    },
    {
      id: 'x',
      label: 'X',
      iconName: 'alternate_email',
      iconClassName: 'bg-black text-white',
      appIcon: '/icons/apps/x.jpg',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        tweetURL
      )}&text=${encodeURIComponent(shareText)}`
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      iconName: 'person',
      iconClassName: 'bg-[#0A66C2] text-white',
      appIcon: '/icons/apps/linkedin.svg',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        tweetURL
      )}`
    },
    {
      id: 'email',
      label: 'E-mail',
      iconName: 'mail',
      iconClassName:
        'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary',
      href: `mailto:?subject=${encodeURIComponent(
        'Une publication sur Inspiration'
      )}&body=${encodeURIComponent(shareBody)}`
    },
    {
      id: 'copy',
      label: 'Copier le lien',
      iconName: 'content_copy',
      iconClassName:
        'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary',
      onClick: () => void handleCopy()
    }
  ];

  return (
    <>
      <Button
        aria-expanded={open}
        aria-haspopup='dialog'
        className={cn(
          `group relative flex items-center gap-1 p-0 outline-none
           transition-none hover:text-accent-blue focus-visible:text-accent-blue`,
          open && 'text-accent-blue'
        )}
        onClick={preventBubbling(openMenu)}
      >
        <i
          className='relative rounded-full p-2 not-italic duration-200 group-hover:bg-accent-blue/10 
                     group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-2 
                     group-focus-visible:ring-accent-blue/80 group-active:bg-accent-blue/20'
        >
          <MaterialIcon
            className={viewTweet ? 'h-6 w-6' : 'h-5 w-5'}
            iconName='ios_share'
          />
          {!open && <ToolTip tip='Partager' />}
        </i>
      </Button>
      <Modal
        className={cn(
          'justify-center p-0',
          isMobile ? 'flex items-end' : 'flex items-center p-4'
        )}
        closeModal={close}
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
            ? 'max-h-[88dvh] max-w-lg rounded-t-xl pb-[max(1rem,env(safe-area-inset-bottom))]'
            : 'max-h-[85dvh] max-w-md rounded-lg'
        )}
        open={open}
      >
        {isMobile && (
          <button
            aria-label='Faire glisser pour fermer le menu Partager'
            className='flex w-full touch-none justify-center py-3'
            onPointerDown={(event) => dragControls.start(event.nativeEvent)}
            type='button'
          >
            <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
          </button>
        )}
        <header className='flex items-center gap-1 px-3 py-3'>
          {view === 'share' && (
            <Button
              aria-label='Revenir au menu Partager'
              className='rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
              onClick={(): void => setView('menu')}
            >
              <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
            </Button>
          )}
          <h2 className='flex-1 px-1 text-lg font-bold'>
            {view === 'menu' ? 'Partager' : 'Partager via…'}
          </h2>
          <Button
            aria-label='Fermer'
            className='rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
            onClick={close}
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </Button>
        </header>

        {view === 'menu' ? (
          <div className='flex flex-col px-2 pb-2'>
            <Button
              className={menuItemClass}
              onClick={(): void => void handleCopy()}
            >
              <span className={tileClass}>
                <MaterialIcon className='h-5 w-5' iconName='content_copy' />
              </span>
              <span className='min-w-0 flex-1'>Copier le lien de la publication</span>
            </Button>
            <Button
              className={menuItemClass}
              onClick={(): void => void handleBookmark()}
            >
              <span
                className={cn(
                  tileClass,
                  tweetIsBookmarked &&
                    'bg-accent-pink/10 text-accent-pink dark:bg-accent-pink/10'
                )}
              >
                <MaterialIcon
                  className='h-5 w-5'
                  iconName='favorite'
                  solid={tweetIsBookmarked}
                />
              </span>
              <span className='min-w-0 flex-1'>
                {tweetIsBookmarked
                  ? 'Retirer des signets'
                  : 'Ajouter aux signets'}
              </span>
            </Button>
            <Button
              className={menuItemClass}
              onClick={(): void => setView('share')}
            >
              <span className={tileClass}>
                <MaterialIcon className='h-5 w-5' iconName='ios_share' />
              </span>
              <span className='min-w-0 flex-1'>Partager via…</span>
              <MaterialIcon
                className='h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary'
                iconName='chevron_right'
              />
            </Button>
          </div>
        ) : (
          <div className='flex min-h-0 flex-col gap-3 overflow-y-auto px-4 pb-4'>
            {/* Aperçu de la publication partagée. */}
            <div className='rounded-xl border border-light-border bg-main-search-background/50 p-3 dark:border-dark-border'>
              <div className='flex items-start gap-3'>
                {photoURL ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    alt=''
                    className='h-10 w-10 shrink-0 rounded-full object-cover'
                    src={photoURL}
                  />
                ) : (
                  <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main-accent text-sm font-bold text-white'>
                    {(name ?? 'I').charAt(0).toUpperCase()}
                  </span>
                )}
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-bold text-light-primary dark:text-dark-primary'>
                    {name ? name : 'Publication'}
                    {username && (
                      <span className='ml-1 font-normal text-light-secondary dark:text-dark-secondary'>
                        @{username}
                      </span>
                    )}
                  </p>
                  <p className='mt-1 line-clamp-3 whitespace-pre-wrap break-words text-sm text-light-secondary dark:text-dark-secondary'>
                    {previewText}
                  </p>
                </div>
                {previewImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    alt=''
                    className='h-12 w-12 shrink-0 rounded-lg object-cover'
                    src={previewImage}
                  />
                )}
              </div>
            </div>

            <div className='flex flex-col'>
              {shareTargets.map((target): JSX.Element => (
                <Button
                  className={menuItemClass}
                  key={target.id}
                  onClick={(): void => openTarget(target)}
                >
                  <ShareTargetIcon target={target} />
                  <span className='min-w-0 flex-1 truncate font-semibold'>
                    {target.label}
                  </span>
                  <MaterialIcon
                    className='h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary'
                    iconName='chevron_right'
                  />
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
