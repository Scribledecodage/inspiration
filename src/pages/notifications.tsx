import { useEffect, useRef, useState } from 'react';
import { orderBy, query, limit, startAfter, getDocs } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { userNotificationsCollection } from '@lib/firebase/collections';
import { deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { MainLayout } from '@components/layout/main-layout';
import { ProtectedLayout } from '@components/layout/common-layout';
import { MainContainer } from '@components/home/main-container';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { Modal } from '@components/modal/modal';
import { MaterialIcon } from '@components/ui/material-icon';
import { useWindow } from '@lib/context/window-context';
import { motion } from 'framer-motion';
import type { Notification } from '@lib/types/notification';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import type { ReactElement, ReactNode } from 'react';

const PAGE_SIZE = 20;

type NotificationIconProps = {
  notif: Notification;
  /** Taille du carré : 44 px dans la liste, 32 px en pied de message. */
  size?: 44 | 32;
};

/* L'icône de la notification : le logo du site sur fond blanc pour les
   annonces, la cloche d'accent pour les autres. */
function NotificationIcon({
  notif,
  size = 44
}: NotificationIconProps): JSX.Element {
  const box = size === 44 ? 'h-11 w-11' : 'h-8 w-8';
  const logo = size === 44 ? 'h-7 w-7' : 'h-5 w-5';

  if (notif.type === 'announcement')
    return (
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-white shadow-sm',
          'ring-1 ring-black/[0.06] dark:ring-white/20',
          box
        )}
      >
        <img
          alt='Inspiration'
          className={cn('object-contain', logo)}
          src='/LogoSite.png'
        />
      </span>
    );

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl bg-main-accent/10 text-main-accent',
        box
      )}
    >
      <MaterialIcon className='h-5 w-5' iconName='notifications' />
    </span>
  );
}

type NotificationThreadProps = {
  notif: Notification;
  onBack: () => void;
};

/* La notification affichée à côté de la liste, présentée comme une
   conversation : l'expéditeur en haut, le message dans une bulle. */
function NotificationThread({
  notif,
  onBack
}: NotificationThreadProps): JSX.Element {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className='flex h-full min-h-0 flex-col'
      initial={{ opacity: 0, x: 24 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
    >
      <header className='flex items-center gap-3 border-b border-light-border/60 px-4 py-3 dark:border-dark-border/60 md:hidden'>
        <button
          aria-label='Retour à la liste'
          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-primary
                     transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
          onClick={onBack}
          type='button'
        >
          <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
        </button>
        <h2 className='truncate text-base font-bold text-light-primary dark:text-dark-primary'>
          {notif.title}
        </h2>
      </header>

      <div className='min-h-0 flex-1 overflow-y-auto px-4 py-5'>
        <div className='flex items-start gap-3'>
          <NotificationIcon notif={notif} />

          <div className='min-w-0 flex-1'>
            <div className='flex items-baseline justify-between gap-3'>
              <p className='truncate font-bold text-light-primary dark:text-dark-primary'>
                {notif.title}
              </p>
              <time className='shrink-0 text-xs text-light-secondary dark:text-dark-secondary'>
                {new Date(notif.createdAt).toLocaleString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            <p className='mt-0.5 text-xs text-light-secondary dark:text-dark-secondary'>
              {notif.type === 'announcement'
                ? 'Équipe Inspiration Inc.'
                : 'Inspiration Inc.'}
            </p>

            <div className='mt-3'>
              <p className='whitespace-pre-wrap text-[15px] leading-relaxed text-light-primary dark:text-dark-primary'>
                {notif.body}
              </p>
            </div>

            <div className='mt-3 flex items-center gap-2 text-xs text-light-secondary dark:text-dark-secondary'>
              <NotificationIcon notif={notif} size={32} />
              <span>
                {notif.type === 'announcement'
                  ? 'Envoyé par l’équipe Inspiration Inc.'
                  : 'Créé automatiquement à la création de votre compte'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Notifications(): JSX.Element {
  const { user } = useAuth();
  const { isMobile: mobileFlag, isTwoPane } = useWindow();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cursor, setCursor] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Notification | null>(null);
  /* Largeur de la colonne « Boîte de réception », comme dans la messagerie. */
  const [inboxWidth, setInboxWidth] = useState(320);
  const resizingRef = useRef(false);
  const [multiDeleteOpen, setMultiDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Garantit la notification de bienvenue.
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    void (async () => {
      try {
        const ref = doc(userNotificationsCollection(user.id), 'welcome');
        const snap = await getDoc(ref);
        if (cancelled || snap.exists()) return;
        const createdMs =
          typeof user.createdAt === 'number'
            ? user.createdAt
            : user.createdAt &&
              typeof (user.createdAt as { toMillis?: () => number })
                .toMillis === 'function'
            ? (user.createdAt as { toMillis: () => number }).toMillis()
            : Date.now();
        await setDoc(ref, {
          id: 'welcome',
          title: 'Bienvenue sur Inspiration',
          body: 'Merci d’avoir créé votre compte sur Inspiration.\n\nInspiration est un réseau social pensé pour partager vos idées, vos passions et vos moments dans un espace simple, rapide et respectueux. Vous pouvez publier du texte, des photos, des GIFs, des sondages et des vidéos, programmer vos publications, ajouter un lieu, et échanger en messages privés ou en groupes.\n\nPour bien démarrer : complétez votre profil (photo, bio, lieu, thème), publiez votre premier message, explorez la page « Découvrir » pour trouver des comptes à suivre, créez un statut éphémère (24 h), lancez une chaîne pour diffuser du contenu dont vous êtes le seul auteur, et personnalisez vos préférences dans les paramètres.\n\nVos données restent les vôtres. Nous ne vendons jamais vos informations personnelles. Vous gardez le contrôle total de votre contenu et de votre expérience.\n\nBesoin d’aide ? Consultez les paramètres ou contactez-nous. Bonne exploration sur Inspiration !',
          type: 'welcome',
          createdAt: createdMs,
          read: false
        });
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // Charge la première page.
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    void (async () => {
      try {
        const q = query(
          userNotificationsCollection(user.id),
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        );
        const snap = await getDocs(q);
        if (cancelled) return;
        const docs = snap.docs.map((d) => d.data());
        setNotifications(docs);
        setCursor(snap.docs[snap.docs.length - 1] ?? null);
        setHasMore(snap.docs.length === PAGE_SIZE);
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const loadMore = async (): Promise<void> => {
    if (!user?.id || !cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const q = query(
        userNotificationsCollection(user.id),
        orderBy('createdAt', 'desc'),
        startAfter(cursor),
        limit(PAGE_SIZE)
      );
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => d.data());
      setNotifications((prev) => [...prev, ...docs]);
      setCursor(snap.docs[snap.docs.length - 1] ?? null);
      setHasMore(snap.docs.length === PAGE_SIZE);
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (selectedIds.size === 0) return;
    const handleOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-notif-row]')) return;
      setSelectedIds(new Set());
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [selectedIds.size]);

  // Défilement infini : charge la page suivante quand le sentinel est visible.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loadingMore && hasMore) {
          void loadMore();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, notifications.length]);

  const handleDeleteOne = async (notif: Notification): Promise<void> => {
    if (!user?.id) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(userNotificationsCollection(user.id), notif.id));
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteMany = async (): Promise<void> => {
    if (!user?.id) return;
    setDeleting(true);
    try {
      for (const id of selectedIds) {
        try {
          await deleteDoc(doc(userNotificationsCollection(user.id), id));
        } catch {
          // ignore
        }
      }
      setNotifications((prev) => prev.filter((n) => !selectedIds.has(n.id)));
      setSelectedIds(new Set());
      setMultiDeleteOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const sorted = notifications;
  const selected = sorted.find((n) => n.id === selectedId) ?? null;

  return (
    <MainContainer className='!max-w-6xl !pb-20 xs:!pb-0'>
      <SEO title='Notifications / Inspiration' />
      <MainHeader
        title='Notifications'
        useMobileSidebar
        className='min-h-14 flex items-center justify-between'
        beforeTitle={
          selectedIds.size > 0 ? (
            <button
              aria-label='Supprimer les notifications sélectionnées'
              className='mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#e5484d] text-white shadow-sm transition hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]/60 active:scale-95'
              onClick={() => {
                if (selectedIds.size === 1) {
                  const n = sorted.find((x) => x.id === [...selectedIds][0]);
                  if (n) setToDelete(n);
                  return;
                }
                setMultiDeleteOpen(true);
              }}
              onMouseDown={(event) => event.stopPropagation()}
              title='Supprimer'
              type='button'
            >
              <MaterialIcon className='h-5 w-5' iconName='delete' />
            </button>
          ) : undefined
        }
      />

      <section className='flex min-h-[min(760px,calc(100dvh-5rem))] flex-1'>
        <aside
          className={cn(
            'flex w-full max-w-none shrink-0 flex-col md:sticky md:top-[57px] md:h-[calc(100dvh-57px)] md:min-h-0 md:self-start md:overflow-hidden',
            selected && 'hidden md:flex'
          )}
          style={{
            /* Tant que le volet de lecture est masqué (écran étroit), la
               liste occupe toute la largeur : une colonne étroite avec un
               grand vide à côté n'est pas lisible. */
            width: isTwoPane ? inboxWidth : undefined
          }}
        >
          <div className='hidden items-center justify-between px-5 py-5 md:flex'>
            <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
              Boîte de réception
            </h2>
            <button
              aria-label='Réinitialiser la largeur'
              className='flex h-7 w-7 items-center justify-center rounded-full text-light-secondary transition
                       hover:bg-light-primary/10 hover:text-light-primary
                       dark:text-dark-secondary dark:hover:bg-dark-primary/10
                       dark:hover:text-dark-primary'
              onClick={(): void => setInboxWidth(320)}
              title='Largeur par défaut'
              type='button'
            >
              <MaterialIcon className='h-4 w-4' iconName='close_fullscreen' />
            </button>
          </div>
          <div className='flex flex-1 flex-col md:min-h-0 md:overflow-y-auto md:overscroll-contain'>
            {loading && sorted.length === 0 ? (
              <div className='flex justify-center py-8'>
                <span className='inline-block h-6 w-6 animate-spin rounded-full border-2 border-main-accent border-t-transparent' />
              </div>
            ) : sorted.length === 0 ? (
              <div className='flex flex-col items-center justify-center gap-4 px-6 py-16 text-center'>
                <p className='text-lg font-bold text-light-primary dark:text-dark-primary'>
                  Pas de notifications pour le moment
                </p>
                <p className='max-w-sm text-sm leading-5 text-light-secondary dark:text-dark-secondary'>
                  C'est ici que la magie opère ! Restez informé de tout ce qui
                  compte.
                </p>
              </div>
            ) : (
              <div className='flex flex-col gap-1.5 px-2 py-2'>
                {sorted.map((notif) => (
                  <div
                    className='group relative'
                    data-notif-row={notif.id}
                    key={notif.id}
                    onPointerCancel={() => {
                      if (longPressTimerRef.current) {
                        clearTimeout(longPressTimerRef.current);
                        longPressTimerRef.current = null;
                      }
                    }}
                    onPointerDown={() => {
                      if (longPressTimerRef.current)
                        clearTimeout(longPressTimerRef.current);
                      longPressTimerRef.current = setTimeout(() => {
                        setSelectedIds((current) => {
                          const next = new Set(current);
                          next.add(notif.id);
                          return next;
                        });
                        longPressTimerRef.current = null;
                      }, 500);
                    }}
                    onPointerUp={() => {
                      if (longPressTimerRef.current) {
                        clearTimeout(longPressTimerRef.current);
                        longPressTimerRef.current = null;
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'relative flex items-center rounded-xl transition-colors',
                        selectedIds.has(notif.id)
                          ? 'bg-main-accent/10'
                          : selected?.id === notif.id
                          ? 'bg-main-search-background'
                          : 'bg-main-background hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                      )}
                    >
                      <div
                        className='min-h-16 flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-3 py-3'
                        onClick={() => {
                          if (selectedIds.size > 0) {
                            setSelectedIds((current) => {
                              const next = new Set(current);
                              if (next.has(notif.id)) next.delete(notif.id);
                              else next.add(notif.id);
                              return next;
                            });
                            return;
                          }
                          // Affiche la notification à côté de la liste, et la marque
                          // comme lue immédiatement. Un second clic sur la notification
                          // déjà ouverte la referme, comme une conversation.
                          setSelectedId(
                            selected?.id === notif.id ? null : notif.id
                          );
                          if (notif.read !== true) {
                            void (async () => {
                              try {
                                const { updateDoc } = await import(
                                  'firebase/firestore'
                                );
                                await updateDoc(
                                  doc(
                                    userNotificationsCollection(user!.id),
                                    notif.id
                                  ),
                                  { read: true }
                                );
                              } catch {
                                // ignore
                              }
                            })();
                          }
                        }}
                      >
                        <span className='relative shrink-0'>
                          <NotificationIcon notif={notif} />
                          {selectedIds.has(notif.id) && (
                            <motion.span
                              animate={{ scale: 1, opacity: 1 }}
                              className='absolute inset-0 flex items-center justify-center rounded-xl bg-main-accent/90'
                              initial={{ scale: 0.5, opacity: 0 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 20
                              }}
                            >
                              <MaterialIcon
                                className='h-5 w-5 text-white'
                                iconName='check'
                                solid
                              />
                            </motion.span>
                          )}
                        </span>
                        <div className='min-w-0 flex-1'>
                          {/* Le titre garde toute la largeur : la date passe à
                          droite de l'aperçu, sinon elle écrase le titre. */}
                          <p className='flex min-w-0 items-center gap-2 font-bold text-light-primary dark:text-dark-primary'>
                            <span className='truncate'>{notif.title}</span>
                            {notif.read !== true && (
                              <span
                                aria-label='Notification non lue'
                                className='h-2 w-2 shrink-0 rounded-full bg-main-accent'
                              />
                            )}
                          </p>
                          <div className='flex items-baseline justify-between gap-2'>
                            <span className='min-w-0 flex-1 truncate text-sm text-light-secondary dark:text-dark-secondary'>
                              {notif.body.replace(/\n/g, ' ').length > 80
                                ? `${notif.body
                                    .replace(/\n/g, ' ')
                                    .slice(0, 80)}…`
                                : notif.body.replace(/\n/g, ' ')}
                            </span>
                            <span className='shrink-0 text-[11px] text-light-secondary dark:text-dark-secondary'>
                              {new Date(notif.createdAt).toLocaleString(
                                'fr-FR',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!mobileFlag && (
                        <button
                          aria-label='Supprimer la notification'
                          className='mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-transparent text-[#e5484d] opacity-0 transition hover:bg-[#e5484d]/10 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] active:scale-95 group-focus-within:opacity-100 group-hover:opacity-100'
                          onClick={(event) => {
                            event.stopPropagation();
                            setToDelete(notif);
                          }}
                          title='Supprimer'
                          type='button'
                        >
                          <MaterialIcon className='h-4 w-4' iconName='delete' />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {hasMore && (
                  <div ref={sentinelRef} className='flex justify-center py-4'>
                    {loadingMore && (
                      <span className='inline-block h-5 w-5 animate-spin rounded-full border-2 border-main-accent border-t-transparent' />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Poignée de redimensionnement (bureau uniquement). */}
        <div
          className='hidden w-2 cursor-col-resize bg-light-border/40 transition-colors hover:bg-main-accent/60 dark:bg-dark-border/40 md:block'
          onMouseDown={(event) => {
            event.preventDefault();
            resizingRef.current = true;
            const startX = event.clientX;
            const startWidth = inboxWidth;

            const handleMove = (moveEvent: MouseEvent): void => {
              if (!resizingRef.current) return;
              const next = Math.min(
                480,
                Math.max(240, startWidth + moveEvent.clientX - startX)
              );
              setInboxWidth(next);
            };

            const handleUp = (): void => {
              resizingRef.current = false;
              document.removeEventListener('mousemove', handleMove);
              document.removeEventListener('mouseup', handleUp);
              document.body.style.cursor = '';
              document.body.style.userSelect = '';
            };

            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
          }}
          title='Glisser pour redimensionner'
        />

        <section
          className={cn(
            'flex min-w-0 flex-1 flex-col border-l border-light-border/60 dark:border-dark-border/60',
            !selected && 'hidden md:flex'
          )}
        >
          {selected ? (
            <NotificationThread
              notif={selected}
              onBack={(): void => setSelectedId(null)}
            />
          ) : (
            <div className='flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center'>
              <span className='flex h-14 w-14 items-center justify-center rounded-xl bg-main-accent/10 text-main-accent'>
                <MaterialIcon className='h-6 w-6' iconName='notifications' />
              </span>
              <p className='text-lg font-bold text-light-primary dark:text-dark-primary'>
                Aucune notification sélectionnée
              </p>
              <p className='max-w-sm text-sm leading-5 text-light-secondary dark:text-dark-secondary'>
                Choisissez une notification dans la liste pour la lire ici, à
                côté.
              </p>
            </div>
          )}
        </section>
      </section>

      <Modal
        className='flex items-center justify-center p-4'
        modalClassName='w-full max-w-[26rem] rounded-lg bg-white px-8 py-8 shadow-2xl sm:px-10 sm:py-9 dark:bg-[#18212a]'
        open={toDelete !== null}
        closeModal={() => {
          if (!deleting) setToDelete(null);
        }}
      >
        <div
          role='alertdialog'
          aria-modal='true'
          aria-labelledby='delete-notif-title'
        >
          <h2
            id='delete-notif-title'
            className='text-[22px] font-bold leading-7 text-light-primary dark:text-dark-primary'
          >
            Supprimer cette notification ?
          </h2>
          <p className='mt-3 text-base leading-[1.6] text-[#536471] dark:text-dark-secondary'>
            Cette notification sera retirée. Cette action est définitive.
          </p>
          <div className='mt-7 flex flex-col gap-3'>
            <button
              className='min-h-[50px] w-full rounded-full bg-[#e5484d] px-5 text-base font-bold text-white transition hover:bg-[#d7373b] disabled:opacity-60'
              disabled={deleting}
              onClick={() => void handleDeleteOne(toDelete!)}
              type='button'
            >
              {deleting ? 'Suppression…' : 'Supprimer'}
            </button>
            <button
              className='min-h-[50px] w-full rounded-full border border-[#cfd9de] bg-white px-5 text-base font-bold text-light-primary transition hover:bg-black/[0.03] disabled:opacity-60 dark:border-[#52606d] dark:bg-[#18212a] dark:text-dark-primary dark:hover:bg-white/5'
              disabled={deleting}
              onClick={() => setToDelete(null)}
              type='button'
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        className='flex items-center justify-center p-4'
        modalClassName='w-full max-w-[26rem] rounded-lg bg-white px-8 py-8 shadow-2xl sm:px-10 sm:py-9 dark:bg-[#18212a]'
        open={multiDeleteOpen}
        closeModal={() => {
          if (!deleting) setMultiDeleteOpen(false);
        }}
      >
        <div role='alertdialog' aria-modal='true'>
          <h2 className='text-[22px] font-bold leading-7 text-light-primary dark:text-dark-primary'>
            Supprimer {selectedIds.size} notification
            {selectedIds.size > 1 ? 's' : ''} ?
          </h2>
          <p className='mt-3 text-base leading-[1.6] text-[#536471] dark:text-dark-secondary'>
            Les notifications sélectionnées seront retirées. Cette action est
            définitive.
          </p>
          <div className='mt-7 flex flex-col gap-3'>
            <button
              className='min-h-[50px] w-full rounded-full bg-[#e5484d] px-5 text-base font-bold text-white transition hover:bg-[#d7373b] disabled:opacity-60'
              disabled={deleting}
              onClick={() => void handleDeleteMany()}
              type='button'
            >
              {deleting ? 'Suppression…' : 'Supprimer'}
            </button>
            <button
              className='min-h-[50px] w-full rounded-full border border-[#cfd9de] bg-white px-5 text-base font-bold text-light-primary transition hover:bg-black/[0.03] disabled:opacity-60 dark:border-[#52606d] dark:bg-[#18212a] dark:text-dark-primary dark:hover:bg-white/5'
              disabled={deleting}
              onClick={() => setMultiDeleteOpen(false)}
              type='button'
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </MainContainer>
  );
}

Notifications.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>{page}</MainLayout>
  </ProtectedLayout>
);
