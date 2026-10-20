import { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { deleteStatus, registerStatusView } from '@lib/firebase/status';
import { buildStatusSlides } from '@lib/hooks/useStatuses';
import { useStatusVideoSrc } from '@lib/hooks/useStatusVideoSrc';
import { isVideoMedia } from '@lib/types/status';
import { MaterialIcon } from '@components/ui/material-icon';
import { ActionModal } from '@components/modal/action-modal';
import { Modal } from '@components/modal/modal';
import { StatusAvatarImage } from './status-avatar';
import type { StatusGroup } from '@lib/hooks/useStatuses';
import type { Status, StatusMedia } from '@lib/types/status';
import { useDragControls } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

/** Durée d'affichage d'une photo / d'un texte (ms). */
const SLIDE_DURATION = 7000;
/** Durée maximale d'une vidéo avant de passer à la suite (ms). */
const MAX_VIDEO_DURATION = 60000;
/** Ancienne couleur de trait par défaut : sans choix explicite, la barre prend
 *  la couleur d'« Affichage ». */
const DEFAULT_BAR_COLOR = '#1d9bf0';

type StatusViewerProps = {
  groups: StatusGroup[];
  /** Index du groupe ouvert au départ. */
  initialGroup?: number;
  onClose: () => void;
};

function formatRelative(timestamp: number): string {
  if (!timestamp) return 'à l’instant';

  const minutes = Math.floor((Date.now() - timestamp) / 60000);

  if (minutes < 1) return 'à l’instant';
  if (minutes < 60) return `il y a ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;

  return `il y a ${Math.floor(hours / 24)} j`;
}

function mediaDuration(media: StatusMedia | null, status?: Status): number {
  if (isVideoMedia(media ?? { kind: 'image', type: '' })) return MAX_VIDEO_DURATION;

  /* Chaque statut a sa propre durée d'affichage. */
  return status?.duration ?? SLIDE_DURATION;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = (hex ?? '').replace('#', '').trim();

  if (!value) return { r: 0, g: 0, b: 0 };

  const full =
    value.length === 3
      ? value
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : value.slice(0, 6);

  const parsed = parseInt(full, 16);

  if (Number.isNaN(parsed)) return { r: 0, g: 0, b: 0 };

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255
  };
}

/* La pastille du texte s'adapte au fond du statut : plus claire sur un fond
   sombre, plus sombre sur un fond clair. Le texte reste blanc dans les deux
   cas, donc toujours lisible. */
function textBubbleStyle(backgroundColor: string): {
  background: string;
  color: string;
} {
  const { r, g, b } = hexToRgb(backgroundColor);
  const isLight = (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;

  return isLight
    ? { background: 'rgba(15, 20, 25, 0.5)', color: '#ffffff' }
    : { background: 'rgba(255, 255, 255, 0.14)', color: '#ffffff' };
}

export function StatusViewer({
  groups,
  initialGroup = 0,
  onClose
}: StatusViewerProps): JSX.Element {
  const { user } = useAuth();

  const [groupIndex, setGroupIndex] = useState(initialGroup);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(SLIDE_DURATION);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuDragControls = useDragControls();
  const [deleting, setDeleting] = useState(false);

  /* Deux pauses possibles : le doigt posé sur l'écran (pausedRef) et le
     bouton pause (userPausedRef). Les deux arrêtent l'avance automatique. */
  const pausedRef = useRef(false);
  const userPausedRef = useRef(false);
  const goNextRef = useRef<() => void>(() => undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  /* La barre du haut sert de lecteur : on peut cliquer dessus pour jumped à
     un statut, ou faire glisser le curseur pour avancer/reculer. */
  const barRef = useRef<HTMLDivElement>(null);
  const scrubbingRef = useRef(false);
  const [scrubbing, setScrubbing] = useState(false);
  /* Temps déjà écoulé sur la diapositive courante : la barre permet de
     revenir en arrière à l'intérieur d'un même statut. */
  const elapsedRef = useRef(0);

  const group = groups[groupIndex];

  /* Une seule barre, découpée en segments : un segment par photo / vidéo, dans
     l'ordre des statuts. */
  const statusRows = useMemo(
    () =>
      group
        ? group.statuses.map((status) => ({
            status,
            slides: buildStatusSlides([status])
          }))
        : [],
    [group]
  );

  const slides = useMemo(
    () => statusRows.flatMap(({ slides: rowSlides }) => rowSlides),
    [statusRows]
  );

  const segments = useMemo(() => {
    const list: { status: Status; index: number }[] = [];
    let index = 0;

    for (const row of statusRows)
      for (const _ of row.slides) {
        list.push({ status: row.status, index });
        index += 1;
      }

    return list;
  }, [statusRows]);

  const slide = slides[slideIndex];
  const media =
    slide && slide.mediaIndex !== null
      ? slide.status.media[slide.mediaIndex] ?? null
      : null;

  const isVideo = media ? isVideoMedia(media) : false;
  const slideKey = `${groupIndex}:${slideIndex}`;
  /* Lecture directe depuis Backblaze : le proxy serverless tronque les vidéos
     au-delà de sa limite de taille. */
  const videoSrc = useStatusVideoSrc(isVideo && media ? media.src : null);

  const goNext = (): void => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((value) => value + 1);
      return;
    }

    if (groupIndex < groups.length - 1) {
      setGroupIndex((value) => value + 1);
      setSlideIndex(0);
      return;
    }

    onClose();
  };

  const goPrev = (): void => {
    if (slideIndex > 0) {
      setSlideIndex((value) => value - 1);
      return;
    }

    if (groupIndex > 0) {
      const previous = groups[groupIndex - 1];
      setGroupIndex(groupIndex - 1);
      setSlideIndex(Math.max(0, previous.slides.length - 1));
      return;
    }

    setProgress(0);
  };

  goNextRef.current = goNext;

  /* Clic ou glissement sur la barre : on saute à la diapositive visée. À
     l'intérieur de la diapositive courante, on se repositionne dans le temps
     (vidéo) ou on relance la durée (photo, texte). */
  const seekToPointer = (clientX: number): void => {
    const node = barRef.current;

    if (!node || !segments.length) return;

    const rect = node.getBoundingClientRect();

    if (rect.width <= 0) return;

    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const target = Math.min(
      segments.length - 1,
      Math.floor(ratio * segments.length)
    );

    if (target !== slideIndex) {
      setSlideIndex(target);
      return;
    }

    /* Position à l'intérieur du segment courant (0 → 1). */
    const withinSegment = ratio * segments.length - target;
    const video = videoRef.current;

    if (isVideo && video) {
      if (Number.isFinite(video.duration) && video.duration > 0)
        video.currentTime = withinSegment * video.duration;
      return;
    }

    elapsedRef.current = withinSegment * duration;
    setProgress(withinSegment);
  };

  const handleBarPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    scrubbingRef.current = true;
    setScrubbing(true);
    seekToPointer(event.clientX);
  };

  const handleBarPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    if (!scrubbingRef.current) return;
    event.stopPropagation();
    seekToPointer(event.clientX);
  };

  const handleBarPointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    if (!scrubbingRef.current) return;
    event.stopPropagation();
    scrubbingRef.current = false;
    setScrubbing(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  /* Pause / reprise : le bouton pause arrête l'horloge (et la vidéo), tandis
     qu'un appui maintenu sur l'écran ne suspend que temporairement. */
  const applyVideoPause = (shouldPause: boolean): void => {
    const video = videoRef.current;

    if (!video) return;

    if (shouldPause) video.pause();
    else void video.play().catch(() => undefined);
  };

  const togglePause = (): void => {
    const next = !paused;

    setPaused(next);
    userPausedRef.current = next;
    applyVideoPause(next);
  };

  const handleHoldStart = (): void => {
    pausedRef.current = true;
    applyVideoPause(true);
  };

  const handleHoldEnd = (): void => {
    pausedRef.current = false;
    if (!userPausedRef.current) applyVideoPause(false);
  };

  /* Suppression : le statut est effacé. S'il en reste d'autres, la lecture
     continue sur le suivant au lieu de refermer la visionneuse. */
  const handleDeleteStatus = async (): Promise<void> => {
    const statusId = slide?.status.id;

    if (!statusId || deleting) return;

    setDeleting(true);

    try {
      await deleteStatus(statusId);

      setDeleteOpen(false);
      setMenuOpen(false);

      const currentGroup = groups[groupIndex];
      const deletedStart =
        currentGroup?.slides.findIndex((s) => s.status.id === statusId) ?? -1;
      const deletedCount =
        currentGroup?.slides.filter((s) => s.status.id === statusId).length ?? 0;

      /* Il reste des diapositives dans le groupe : on continue sur la
         suivante (les index se décalent d'autant une fois le statut effacé). */
      if (
        currentGroup &&
        deletedStart >= 0 &&
        deletedStart + deletedCount < currentGroup.slides.length
      ) {
        setSlideIndex(deletedStart);
        return;
      }

      /* Le groupe est épuisé : on passe au groupe suivant qui a encore des
         statuts à montrer. */
      const nextGroup = groups.findIndex(
        (group, index) =>
          index > groupIndex && group.statuses.some((s) => s.id !== statusId)
      );

      if (nextGroup !== -1) {
        setGroupIndex(nextGroup);
        setSlideIndex(0);
        return;
      }

      /* Plus rien à voir : on ferme. */
      onClose();
    } catch {
      toast.error('Impossible de supprimer le statut');
    } finally {
      setDeleting(false);
    }
  };

  /* Le menu du statut se tire vers le bas pour se refermer. */
  const handleMenuDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y > 100 || info.velocity.y > 550) setMenuOpen(false);
  };

  /* Plein écran : on passe par l'API du navigateur, donc l'écran devient
     réellement plein écran (et non juste une grande fenêtre). */  const toggleFullscreen = (): void => {
    if (typeof document === 'undefined') return;

    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
      return;
    }

    const request = document.documentElement.requestFullscreen?.();
    if (request) void request.catch(() => undefined);
  };

  /* Suit l'état réel du plein écran (y compris quand on sort avec Échap). */
  useEffect(() => {
    const handleChange = (): void =>
      setExpanded(Boolean(document.fullscreenElement));

    document.addEventListener('fullscreenchange', handleChange);

    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  /* En plein écran, on masque les barres de défilement de la page : sinon une
     bande blanche reste visible sur le bord droit de l'écran. Le « gutter »
     réservé par `scrollbar-gutter: stable` est neutralisé lui aussi, sinon il
     laisse une bande vide à droite même sans barre de défilement. */
  useEffect(() => {
    if (!expanded) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousGutter = root.style.scrollbarGutter;

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    root.style.scrollbarGutter = 'auto';

    return (): void => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      root.style.scrollbarGutter = previousGutter;
    };
  }, [expanded]);

  /* En quittant le statut, on rend l'écran normal. */
  useEffect(
    () => (): void => {
      if (document.fullscreenElement)
        void document.exitFullscreen().catch(() => undefined);
    },
    []
  );

  /* Marque le statut comme vu (une seule écriture par statut et par session). */
  useEffect(() => {
    const statusId = slide?.status.id;

    if (statusId && user?.id) void registerStatusView(statusId, user.id);
  }, [slide?.status.id, user?.id]);

  /* Avance automatique : une seule boucle d'animation, donc une barre fluide.
     Photos et textes avancent à l'horloge, vidéos sur leur propre temps. */
  useEffect(() => {
    setProgress(0);
    setDuration(media ? mediaDuration(media, slide?.status) : SLIDE_DURATION);

    /* Si la lecture est en pause, la vidéo de la nouvelle diapositive ne doit
       pas démarrer toute seule. */
    if (isVideo && userPausedRef.current) videoRef.current?.pause();

    let frame = 0;
    let last = performance.now();

    elapsedRef.current = 0;

    const tick = (now: number): void => {
      if (isVideo) {
        const video = videoRef.current;

        if (video && video.duration && Number.isFinite(video.duration)) {
          setProgress(Math.min(1, video.currentTime / video.duration));

          if (video.ended) {
            goNextRef.current();
            return;
          }
        }
      } else {
        const delta = now - last;
        last = now;

        if (!pausedRef.current && !userPausedRef.current && !scrubbingRef.current)
          elapsedRef.current += delta;

        const value = Math.min(1, elapsedRef.current / duration);
        setProgress(value);

        if (value >= 1) {
          goNextRef.current();
          return;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideKey, isVideo, duration]);

  const handleLoadedMetadata = (element: HTMLVideoElement): void => {
    if (!element.duration || !Number.isFinite(element.duration)) return;

    setDuration(
      Math.min(MAX_VIDEO_DURATION, Math.max(2000, element.duration * 1000))
    );
  };

  if (!group || !slide) return <></>;

  const isOwn = group.isOwn;

  return (
    <>
      <Modal
        className={cn(
          'flex items-center justify-center',
          expanded ? 'bg-black !p-0' : '!p-0 xs:!p-4'
        )}
        modalClassName={cn(
          'relative flex w-full flex-col overflow-hidden bg-black',
          expanded
            ? 'fixed inset-0 h-full max-h-none w-full max-w-none rounded-none'
            : 'h-[100dvh] max-w-md rounded-none xs:h-[88vh] xs:rounded-md'
        )}
        open
        closeModal={onClose}
        closePanelOnClick={false}
      >
        <div
          className='relative flex h-full w-full flex-col'
          style={{ backgroundColor: slide.status.backgroundColor }}
          onPointerDown={handleHoldStart}
          onPointerUp={handleHoldEnd}
          onPointerLeave={handleHoldEnd}
        >
          {/* Une seule barre, fine, arrondie et détachée des bords, découpée en
            segments colorés. La couleur vient d'« Affichage » (couleur
            d'accent), sauf si une couleur de trait a été choisie à la
            publication. Elle reste au-dessus du dégradé de l'en-tête (z-40) :
            sinon le noir du dégradé l'assombrit et les couleurs choisies
            paraissent ternes. */}
          <div
            ref={barRef}
            aria-label='Avancer ou reculer dans les statuts'
            className='absolute inset-x-4 top-3 z-40 flex cursor-pointer gap-1 touch-none select-none'
            onPointerDown={handleBarPointerDown}
            onPointerMove={handleBarPointerMove}
            onPointerUp={handleBarPointerUp}
            onPointerCancel={handleBarPointerUp}
            role='slider'
            aria-valuemin={1}
            aria-valuemax={Math.max(1, segments.length)}
            aria-valuenow={slideIndex + 1}
          >
            {segments.map(({ status, index }) => {
              const fill =
                index < slideIndex ? 1 : index === slideIndex ? progress : 0;
              const chosen = status.barColor?.toLowerCase();
              const barColor =
                chosen && chosen !== DEFAULT_BAR_COLOR
                  ? status.barColor
                  : 'rgb(var(--main-accent))';

              return (
                <span
                  className={cn(
                    'h-1 flex-1 overflow-hidden rounded-full bg-white/70 transition-all duration-200',
                    scrubbing && 'h-1.5'
                  )}
                  key={index}
                >
                  <span
                    className='block h-full rounded-full'
                    style={{
                      width: `${fill * 100}%`,
                      backgroundColor: barColor
                    }}
                  />
                </span>
              );
            })}
          </div>

          {/* En-tête : auteur, heure, pause, plein écran, fermeture. */}
          <div className='z-30 flex items-center gap-3 bg-gradient-to-b from-black/70 to-transparent px-3 pb-6 pt-8'>
            <StatusAvatarImage
              src={group.user.photoURL}
              size={36}
              gender={group.user.gender}
              shape={group.user.avatarShape}
              frame={group.user.avatarFrame}
            />
            <div className='min-w-0 flex-1 text-white'>
              <p className='truncate text-sm font-bold'>{group.user.name}</p>
              <p className='truncate text-xs text-white/70'>
                @{group.user.username} ·{' '}
                {formatRelative(
                  slide.status.createdAt?.toMillis?.() ?? Date.now()
                )}
                {isOwn && ' · Vous'}
              </p>
            </div>
            {isOwn && (
              <>
                <button
                  className='hidden shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30 xs:flex'
                  type='button'
                  aria-label='Supprimer le statut'
                  onClick={(): void => setDeleteOpen(true)}
                >
                  <MaterialIcon className='h-6 w-6' iconName='delete' />
                </button>
                <button
                  className='shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30 xs:hidden'
                  type='button'
                  aria-label='Options du statut'
                  onClick={(): void => setMenuOpen(true)}
                >
                  <MaterialIcon
                    className='h-6 w-6'
                    iconName='more_horiz'
                  />
                </button>
              </>
            )}
            <button
              className='shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30'
              type='button'
              aria-label={paused ? 'Reprendre la lecture' : 'Mettre en pause'}
              aria-pressed={paused}
              onClick={togglePause}
              onPointerDown={(event): void => event.stopPropagation()}
              onPointerUp={(event): void => event.stopPropagation()}
            >
              <MaterialIcon
                className='h-6 w-6'
                iconName={paused ? 'play_arrow' : 'pause'}
              />
            </button>
            <button
              className='shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30'
              type='button'
              aria-label={expanded ? 'Quitter le plein écran' : 'Plein écran'}
              onClick={toggleFullscreen}
            >
              <MaterialIcon
                className='h-6 w-6'
                iconName={
                  expanded ? 'close_fullscreen' : 'open_in_full'
                }
              />
            </button>
            <button
              className='shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30'
              type='button'
              aria-label='Fermer le statut'
              onClick={onClose}
            >
              <MaterialIcon className='h-6 w-6' iconName='close' />
            </button>
          </div>

          {/* Contenu : média (photo/vidéo) et/ou texte. */}
          <div className='relative min-h-0 flex-1'>
            {media &&
              (isVideo ? (
                <video
                  className='h-full w-full object-contain'
                  key={media.src}
                  ref={videoRef}
                  src={videoSrc ?? media.src}
                  autoPlay
                  playsInline
                  onEnded={goNext}
                  onError={goNext}
                  onLoadedMetadata={(event) =>
                    handleLoadedMetadata(event.currentTarget)
                  }
                />
              ) : (
                <img
                  className='h-full w-full object-contain'
                  key={media.src}
                  src={media.src}
                  alt={media.alt}
                  draggable={false}
                />
              ))}

            {slide.status.kind === 'text' && (
              <div
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-end gap-3 px-6 pb-6 text-center',
                  media && 'bg-black/35'
                )}
              >
                {slide.status.text && (
                  <p
                    className='max-w-[min(32rem,90%)] whitespace-pre-wrap break-words rounded-[2rem] px-6 py-4 text-2xl font-semibold leading-snug shadow-lg backdrop-blur-sm'
                    style={{
                      background: textBubbleStyle(slide.status.backgroundColor)
                        .background,
                      color: slide.status.textColor ?? '#ffffff'
                    }}
                  >
                    {slide.status.text}
                  </p>
                )}
                {slide.status.link && (
                  <a
                    className='bg-white/15 max-w-full truncate rounded-full px-4 py-1.5 text-sm text-white underline'
                    href={slide.status.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={(event): void => event.stopPropagation()}
                  >
                    {slide.status.link}
                  </a>
                )}
              </div>
            )}

            {slide.status.kind === 'media' && slide.status.text && (
              <div className='absolute inset-0 flex flex-col items-center justify-end gap-3 bg-black/35 px-6 pb-6 text-center'>
                <p
                  className='max-w-[min(32rem,90%)] whitespace-pre-wrap break-words rounded-[2rem] px-6 py-4 text-2xl font-semibold leading-snug shadow-lg backdrop-blur-sm'
                  style={{
                    background: textBubbleStyle(slide.status.backgroundColor)
                      .background,
                    color: slide.status.textColor ?? '#ffffff'
                  }}
                >
                  {slide.status.text}
                </p>
              </div>
            )}

            {/* Zones de navigation : gauche = précédent, droite = suivant. */}
            <button
              className='absolute inset-y-0 left-0 z-10 w-1/3 cursor-pointer'
              type='button'
              aria-label='Statut précédent'
              onClick={goPrev}
            />
            <button
              className='absolute inset-y-0 right-0 z-10 w-2/3 cursor-pointer'
              type='button'
              aria-label='Statut suivant'
              onClick={goNext}
            />
          </div>

          {/* Pied : position. */}
          <div className='z-30 flex items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-4 text-[11px] text-white/70'>
            <span>
              Statut {slideIndex + 1}/{segments.length}
            </span>
            {statusRows.length > 1 && (
              <span>· {statusRows.length} publications</span>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        className='flex items-center justify-center p-4'
        modalClassName='w-full max-w-xs rounded-2xl bg-main-background p-8'
        open={deleteOpen}
        closeModal={(): void => setDeleteOpen(false)}
      >
        <ActionModal
          title='Supprimer le statut ?'
          description='Cette action est irréversible : le statut sera supprimé et la lecture s’arrêtera.'
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab focus-visible:bg-accent-red/90'
          mainBtnLabel={deleting ? 'Suppression…' : 'Supprimer'}
          secondaryBtnLabel='Annuler'
          focusOnMainBtn
          action={(): void => void handleDeleteStatus()}
          closeModal={(): void => setDeleteOpen(false)}
        />
      </Modal>

      <Modal
        className='flex items-end justify-center'
        modalClassName='w-full max-w-md rounded-t-2xl bg-main-background p-4 pb-6'
        drag='y'
        dragControls={menuDragControls}
        dragListener={false}
        dragElastic={0.5}
        dragMomentum={true}
        dragSnapToOrigin={false}
        dragConstraints={{ top: 0 }}
        onDragEnd={handleMenuDragEnd}
        open={menuOpen}
        closeModal={(): void => setMenuOpen(false)}
      >
        <div className='flex w-full flex-col gap-1'>
          <button
            aria-label='Faire glisser pour fermer le menu du statut'
            className='flex w-full touch-none justify-center py-3'
            onPointerDown={(event) => menuDragControls.start(event.nativeEvent)}
            type='button'
          >
            <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
          </button>
          <button
            className='accent-tab flex items-center gap-3 rounded-xl p-4 text-left font-bold text-accent-red transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
            type='button'
            onClick={(): void => {
              setMenuOpen(false);
              setDeleteOpen(true);
            }}
          >
            <MaterialIcon className='h-5 w-5' iconName='delete' />
            Supprimer le statut
          </button>
          <button
            className='accent-tab flex items-center gap-3 rounded-xl p-4 text-left font-bold text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
            type='button'
            onClick={(): void => setMenuOpen(false)}
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
            Fermer
          </button>
        </div>
      </Modal>
    </>
  );
}
