import { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { getRandomId } from '@lib/random';
import {
  getStorageErrorMessage,
  uploadStatusFiles
} from '@lib/supabase/storage';
import {
  createStatus,
  DEFAULT_STATUS_BACKGROUND,
  DEFAULT_STATUS_BAR,
  DEFAULT_STATUS_DURATION,
  DEFAULT_STATUS_TEXT_COLOR,
  STATUS_BACKGROUNDS,
  STATUS_DURATIONS,
  STATUS_TEXT_COLORS
} from '@lib/firebase/status';
import { isVideoMedia } from '@lib/types/status';
import { useWindow } from '@lib/context/window-context';
import type { PanInfo, Variants } from 'framer-motion';
import { useDragControls } from 'framer-motion';
import { Modal } from '@components/modal/modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import type { ChangeEvent, ReactNode } from 'react';
import type { FilesWithId } from '@lib/types/file';
import type { StatusColorOption } from '@lib/firebase/status';
import type { StatusMedia, StatusMediaKind } from '@lib/types/status';

type StatusCreateModalProps = {
  open: boolean;
  closeModal: () => void;
};

type Step =
  | 'conditions'
  | 'choose'
  | 'content'
  | 'style'
  | 'duration'
  | 'publish';

/** Nombre maximal de médias dans un même statut. */
const MAX_FILES = 10;
/** Longueur maximale du texte. */
const MAX_TEXT = 280;

/* Les étapes de saisie : les trois premières préparent le statut, les deux
   suivantes le personnalisent, la dernière l'envoie (ou le programme). */
const STEPS: Readonly<Step[]> = [
  'conditions',
  'choose',
  'content',
  'style',
  'duration',
  'publish'
];

const STEP_TITLES: Record<Step, string> = {
  conditions: 'Conditions de publication',
  choose: 'Créer un statut',
  content: 'Photo ou vidéo',
  style: 'Apparence du statut',
  duration: "Durée d'affichage",
  publish: 'Publier le statut'
};

/* Ce que la plateforme permet de publier. */
const allowedContents: readonly string[] = [
  'Une ou plusieurs photos ou vidéos (10 au maximum), avec une légende.',
  'Un statut texte, avec un lien facultatif.',
  'Une couleur de fond et une couleur de texte choisies dans la palette, ou une couleur personnalisée.',
  'Une durée d’affichage propre à ce statut : chaque statut peut rester plus ou moins longtemps à l’écran.',
  'La couleur du trait (barre de progression) suit la couleur d’accent d’Inspiration.'
];

/* Ce qui n'est pas accepté. */
const refusedContents: readonly string[] = [
  'Les contenus illicites, les propos haineux ou discriminants, les contenus à caractère sexuel non consentis, les menaces et le harcèlement.',
  'Une insulte isolée reste tolérée : c’est le caractère grave et répété qui est sanctionné.'
];

const schedulingNote =
  'Vous pouvez publier tout de suite ou programmer la publication : le statut reste invisible jusqu’à l’heure choisie.';

type ColorPickerProps = {
  label: string;
  value: string;
  colors: Readonly<StatusColorOption[]>;
  onChange: (value: string) => void;
};

function ColorPicker({
  label,
  value,
  colors,
  onChange
}: ColorPickerProps): JSX.Element {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
        {label}
      </span>
      <div className='flex flex-wrap items-center gap-2'>
        {colors.map((color) => (
          <button
            className={cn(
              'h-8 w-8 rounded-full border border-light-line-reply transition dark:border-dark-line-reply',
              value.toLowerCase() === color.value.toLowerCase() &&
                'dark:ring-offset-dark-background ring-2 ring-main-accent ring-offset-2 ring-offset-main-background'
            )}
            style={{ backgroundColor: color.value }}
            type='button'
            title={color.name}
            aria-label={color.name}
            key={color.value}
            onClick={(): void => onChange(color.value)}
          />
        ))}
        <label
          className='relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-light-line-reply dark:border-dark-line-reply'
          title='Couleur personnalisée'
        >
          <MaterialIcon className='h-4 w-4' iconName='palette' />
          <input
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            type='color'
            value={value}
            onChange={(event): void => onChange(event.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

type StepIndicatorProps = {
  step: number;
  steps: Readonly<Step[]>;
};

function StepIndicator({ step, steps }: StepIndicatorProps): JSX.Element {
  return (
    <div
      aria-label={`Étape ${step} sur ${steps.length}`}
      className='flex items-center gap-1.5'
    >
      {steps.map((value, index) => (
        <span
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            index < step
              ? 'bg-main-accent'
              : 'bg-light-border dark:bg-dark-border'
          )}
          key={value}
        />
      ))}
      <span className='ml-1 shrink-0 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
        {step}/{steps.length}
      </span>
    </div>
  );
}

type AcknowledgementProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

function Acknowledgement({
  checked,
  onChange,
  children
}: AcknowledgementProps): JSX.Element {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors',
        checked
          ? 'border-main-accent/60 bg-main-accent/[0.07]'
          : 'border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply'
      )}
    >
      <input
        checked={checked}
        className='mt-0.5 h-4 w-4 shrink-0 accent-main-accent'
        onChange={(event): void => onChange(event.target.checked)}
        type='checkbox'
      />
      <span className='text-sm leading-6 text-light-primary dark:text-dark-primary'>
        {children}
      </span>
    </label>
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

export function StatusCreateModal({
  open,
  closeModal
}: StatusCreateModalProps): JSX.Element {
  const { user } = useAuth();
  const { width } = useWindow();

  /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */
  const isSheet = width < 1024;

  const inputFileRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  const [step, setStep] = useState<Step>('conditions');
  const [hasRead, setHasRead] = useState(false);
  const [kind, setKind] = useState<'media' | 'text'>('media');
  const [items, setItems] = useState<FilesWithId>([]);
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_STATUS_BACKGROUND
  );
  const [textColor, setTextColor] = useState(DEFAULT_STATUS_TEXT_COLOR);
  const [duration, setDuration] = useState(DEFAULT_STATUS_DURATION);
  const [schedule, setSchedule] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const previews = useMemo(
    () =>
      items.map((file) => ({
        id: file.id,
        src: URL.createObjectURL(file),
        alt: file.name,
        type: file.type
      })),
    [items]
  );

  /* Libère les aperçus locaux quand ils ne servent plus. */
  useEffect(
    () => () => previews.forEach(({ src }) => URL.revokeObjectURL(src)),
    [previews]
  );

  const reset = (): void => {
    setStep('conditions');
    setHasRead(false);
    setKind('media');
    setItems([]);
    setText('');
    setLink('');
    setBackgroundColor(DEFAULT_STATUS_BACKGROUND);
    setTextColor(DEFAULT_STATUS_TEXT_COLOR);
    setDuration(DEFAULT_STATUS_DURATION);
    setSchedule(false);
    setScheduledDate('');
    setScheduledTime('');
    setExpanded(false);
  };

  const handleClose = (): void => {
    if (loading) return;
    reset();
    closeModal();
  };

  /* Sur téléphone, la barre du haut permet de faire glisser la fenêtre : vers
     le bas pour la refermer, vers le haut pour l'étirer sur toute la hauteur
     de l'écran. */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y < -60) {
      setExpanded(true);
      return;
    }

    if (info.offset.y > 200 || info.velocity.y > 900) {
      handleClose();
      return;
    }

    if (expanded && info.offset.y > 60) {
      setExpanded(false);
      return;
    }

    if (info.offset.y > 100) handleClose();
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    const selected = event.target.files;

    if (selected?.length) {
      const next: FilesWithId = Array.from(selected)
        .filter(
          (file) =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        )
        .map((file) => Object.assign(file, { id: getRandomId() }));

      setItems((previous) => [...previous, ...next].slice(0, MAX_FILES));
    }

    event.target.value = '';
  };

  const removeItem = (id: string) => (): void =>
    setItems((previous) => previous.filter((file) => file.id !== id));

  const goToStep = (next: Step): void => {
    setStep(next);
  };

  const goBack = (): void => {
    const index = visibleSteps.indexOf(step);

    if (index > 0) setStep(visibleSteps[index - 1]);
  };

  const scheduledDateTime = (): Date | null => {
    if (!schedule || !scheduledDate || !scheduledTime) return null;

    const date = new Date(`${scheduledDate}T${scheduledTime}`);

    if (Number.isNaN(date.getTime()) || date.getTime() <= Date.now())
      return null;

    return date;
  };

  const handlePublish = async (): Promise<void> => {
    if (!user || loading) return;

    const isText = kind === 'text';
    const hasMedia = items.length > 0;

    if (isText && !text.trim() && !link.trim() && !hasMedia) {
      toast.error('Écrivez quelque chose ou ajoutez un média');
      return;
    }

    if (!isText && !hasMedia) {
      toast.error('Ajoutez au moins une photo ou une vidéo');
      return;
    }

    if (schedule && !scheduledDateTime()) {
      toast.error('Choisissez une date et une heure futures');
      return;
    }

    setLoading(true);

    try {
      let media: StatusMedia[] = [];

      if (hasMedia) {
        const uploaded = await uploadStatusFiles(user.id, items);

        media = uploaded.map((image) => {
          const mediaKind: StatusMediaKind = isVideoMedia({
            kind: 'image',
            type: image.type ?? ''
          })
            ? 'video'
            : 'image';

          return {
            id: image.id,
            src: image.src,
            alt: image.alt,
            type: image.type ?? '',
            kind: mediaKind
          };
        });
      }

      await createStatus(user.id, {
        kind: isText ? 'text' : 'media',
        media,
        text: text.trim() || null,
        link: link.trim() || null,
        backgroundColor,
        barColor: DEFAULT_STATUS_BAR,
        textColor,
        duration,
        scheduledFor: scheduledDateTime()
      });

      toast.success(scheduledDateTime() ? 'Statut programmé' : 'Statut publié');
      reset();
      closeModal();
    } catch (error) {
      toast.error(getStorageErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const preview = text.trim() || link.trim() || 'Votre texte apparaîtra ici';

  /* Une vidéo impose sa propre durée : l'étape de durée est donc sautée. */
  const hasVideo = items.some((file) => file.type.startsWith('video/'));

  const visibleSteps = useMemo(
    () => (hasVideo ? STEPS.filter((value) => value !== 'duration') : STEPS),
    [hasVideo]
  );

  const stepIndex = visibleSteps.indexOf(step) + 1;

  /* L'aperçu d'une vidéo montre l'image prise à deux secondes : la première
     frame est souvent un écran noir ou une transition. */
  const handlePreviewMetadata = (element: HTMLVideoElement): void => {
    if (element.duration > 2) element.currentTime = 2;
  };

  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const minTime = now.toTimeString().slice(0, 5);

  return (
    <Modal
      className='flex items-end justify-center p-0 lg:items-center lg:p-4'
      modalAnimation={isSheet ? sheetAnimation : undefined}
      modalClassName={`flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-lg border-t border-light-border bg-main-background shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border lg:static lg:max-h-[85vh] lg:max-w-md lg:rounded-lg lg:border ${
        expanded
          ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))] lg:h-auto lg:max-h-[85vh]'
          : ''
      }`}
      drag={isSheet ? 'y' : undefined}
      dragControls={isSheet ? dragControls : undefined}
      dragListener={false}
      dragSnapToOrigin
      dragUp={160}
      onDragEnd={isSheet ? handleDragEnd : undefined}
      open={open}
      closeModal={handleClose}
    >
      {isSheet && (
        <button
          aria-label='Faire glisser la fenêtre vers le bas ou vers le haut'
          className='flex w-full touch-none justify-center py-3 lg:hidden'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}
      <div className='flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]'>
        <StepIndicator step={stepIndex} steps={visibleSteps} />

        <div className='flex items-center gap-3'>
          {step !== 'conditions' && (
            <button
              className='rounded-full p-2 text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
              type='button'
              aria-label='Retour'
              onClick={goBack}
            >
              <MaterialIcon className='h-5 w-5' iconName='chevron_left' />
            </button>
          )}
          <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
            {STEP_TITLES[step]}
          </h2>
        </div>

        {step === 'conditions' && (
          <div className='flex flex-col gap-3'>
            <div className='max-h-[38vh] overflow-y-auto overscroll-contain rounded-lg border border-light-line-reply bg-main-search-background/20 p-4 text-sm font-normal leading-6 text-light-secondary dark:border-dark-line-reply dark:bg-dark-primary/[0.04] dark:text-dark-secondary'>
              <h3 className='text-sm font-bold text-main-accent'>
                Ce que vous pouvez publier
              </h3>
              <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                {allowedContents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3 className='mt-4 text-sm font-bold text-main-accent'>
                Ce qui n’est pas accepté
              </h3>
              <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                {refusedContents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3 className='mt-4 text-sm font-bold text-main-accent'>
                Publier maintenant ou plus tard
              </h3>
              <p className='mt-2'>{schedulingNote}</p>

              <p className='mt-4 border-t border-light-line-reply pt-3 text-xs text-main-accent dark:border-dark-line-reply'>
                Fin des conditions.
              </p>
            </div>

            <Acknowledgement checked={hasRead} onChange={setHasRead}>
              J’ai lu ces conditions et je m’engage à ne publier que du contenu
              conforme.
            </Acknowledgement>

            <div className='flex flex-col-reverse gap-2 xs:flex-row xs:justify-end'>
              <Button
                className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                onClick={handleClose}
              >
                Annuler
              </Button>
              <Button
                className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                disabled={!hasRead}
                onClick={(): void => goToStep('choose')}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}

        {step === 'choose' && (
          <div className='flex flex-col gap-1'>
            <button
              className='flex items-center gap-4 rounded-xl p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
              type='button'
              onClick={(): void => {
                setKind('media');
                goToStep('content');
              }}
            >
              <span className='bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent'>
                <MaterialIcon className='h-6 w-6' iconName='image' />
              </span>
              <span className='min-w-0'>
                <span className='block font-bold text-light-primary dark:text-dark-primary'>
                  Photo ou vidéo
                </span>
                <span className='block text-sm text-light-secondary dark:text-dark-secondary'>
                  Combinez plusieurs photos et vidéos, avec une légende
                </span>
              </span>
            </button>

            <button
              className='flex items-center gap-4 rounded-xl p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
              type='button'
              onClick={(): void => {
                setKind('text');
                goToStep('content');
              }}
            >
              <span className='bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent'>
                <MaterialIcon className='h-6 w-6' iconName='edit_square' />
              </span>
              <span className='min-w-0'>
                <span className='block font-bold text-light-primary dark:text-dark-primary'>
                  Texte
                </span>
                <span className='block text-sm text-light-secondary dark:text-dark-secondary'>
                  Écrivez, ajoutez un lien, une image ou une vidéo
                </span>
              </span>
            </button>
          </div>
        )}

        {step === 'content' && (
          <>
            {/* Aperçu : fond coloré + médias + texte. */}
            <div
              className='relative flex min-h-[180px] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl p-4'
              style={{ backgroundColor }}
            >
              {previews.length > 0 && (
                <div className='grid w-full grid-cols-2 gap-2'>
                  {previews.map((image) => (
                    <div
                      className='relative overflow-hidden rounded-lg bg-black/30'
                      key={image.id}
                    >
                      {image.type.startsWith('video/') ? (
                        <video
                          className='h-28 w-full object-cover'
                          src={image.src}
                          muted
                          playsInline
                          onLoadedMetadata={(event): void =>
                            handlePreviewMetadata(event.currentTarget)
                          }
                        />
                      ) : (
                        <img
                          className='h-28 w-full object-cover'
                          src={image.src}
                          alt={image.alt}
                        />
                      )}
                      <button
                        className='absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white transition hover:bg-black/80'
                        type='button'
                        aria-label='Retirer ce média'
                        onClick={removeItem(image.id)}
                      >
                        <MaterialIcon className='h-4 w-4' iconName='close' />
                      </button>
                      {image.type.startsWith('video/') && (
                        <span className='absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white'>
                          Vidéo
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {kind === 'text' ? (
                <p
                  className='w-full whitespace-pre-wrap break-words text-center text-xl font-semibold'
                  style={{
                    color: text.trim() ? textColor : 'rgba(255,255,255,0.5)'
                  }}
                >
                  {preview}
                </p>
              ) : (
                text.trim() && (
                  <p
                    className='w-full whitespace-pre-wrap break-words text-center text-sm'
                    style={{ color: textColor }}
                  >
                    {text}
                  </p>
                )
              )}
            </div>

            {/* Ajout de médias. */}
            <div className='flex items-center gap-2'>
              <input
                className='hidden'
                type='file'
                accept='image/*,video/*'
                onChange={handleFiles}
                ref={inputFileRef}
                multiple
              />
              <Button
                className='accent-tab accent-bg-tab flex items-center gap-2 rounded-full bg-main-accent/10 px-3 py-1.5 text-sm font-semibold text-main-accent'
                type='button'
                disabled={items.length >= MAX_FILES}
                onClick={(): void => inputFileRef.current?.click()}
              >
                <MaterialIcon className='h-5 w-5' iconName='add' />
                {items.length ? 'Ajouter' : 'Ajouter des photos / vidéos'}
              </Button>
              <span className='text-xs text-light-secondary dark:text-dark-secondary'>
                {items.length}/{MAX_FILES}
              </span>
            </div>

            {/* Texte : légende pour un média, contenu pour un statut texte. */}
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                {kind === 'text' ? 'Votre texte' : 'Légende (affichée en bas)'}
              </span>
              <textarea
                className='w-full resize-none rounded-lg border border-light-line-reply bg-transparent p-3 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                rows={kind === 'text' ? 3 : 2}
                maxLength={MAX_TEXT}
                placeholder={
                  kind === 'text'
                    ? 'Que voulez-vous dire ?'
                    : 'Ajouter une légende…'
                }
                value={text}
                onChange={(event): void => setText(event.target.value)}
              />
              <span className='self-end text-xs text-light-secondary dark:text-dark-secondary'>
                {text.length}/{MAX_TEXT}
              </span>
            </div>

            {/* Lien optionnel (surtout utile pour un statut texte). */}
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                Lien (optionnel)
              </span>
              <input
                className='w-full rounded-lg border border-light-line-reply bg-transparent p-2.5 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                type='url'
                inputMode='url'
                placeholder='https://…'
                value={link}
                onChange={(event): void => setLink(event.target.value)}
              />
            </div>

            <div className='flex flex-col-reverse gap-2 xs:flex-row xs:justify-end'>
              <Button
                className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                onClick={goBack}
              >
                Retour
              </Button>
              <Button
                className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                onClick={(): void => goToStep('style')}
              >
                Suivant
              </Button>
            </div>
          </>
        )}

        {step === 'style' && (
          <>
            <div
              className='relative flex min-h-[120px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl p-4'
              style={{ backgroundColor }}
            >
              <p
                className='w-full whitespace-pre-wrap break-words text-center text-xl font-semibold'
                style={{ color: textColor }}
              >
                {preview}
              </p>
            </div>

            <ColorPicker
              label='Couleur de fond'
              value={backgroundColor}
              colors={STATUS_BACKGROUNDS}
              onChange={setBackgroundColor}
            />

            <ColorPicker
              label='Couleur du texte'
              value={textColor}
              colors={STATUS_TEXT_COLORS}
              onChange={setTextColor}
            />

            <p className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
              La couleur du trait — la barre de progression en haut de l’écran —
              suit la couleur d’accent d’Inspiration.
            </p>

            <div className='flex flex-col-reverse gap-2 xs:flex-row xs:justify-end'>
              <Button
                className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                onClick={goBack}
              >
                Retour
              </Button>
              <Button
                className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                onClick={(): void =>
                  goToStep(hasVideo ? 'publish' : 'duration')
                }
              >
                Suivant
              </Button>
            </div>
          </>
        )}

        {step === 'duration' && (
          <>
            <p className='rounded-xl border border-light-line-reply bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-line-reply dark:text-dark-secondary'>
              Cette durée s’applique <strong>à ce statut uniquement</strong> :
              les autres statuts gardent la leur.
            </p>

            <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
              {STATUS_DURATIONS.map((option) => {
                const value = Number(option.value);
                const selected = duration === value;

                return (
                  <button
                    key={option.value}
                    type='button'
                    aria-pressed={selected}
                    onClick={(): void => setDuration(value)}
                    className={cn(
                      'rounded-xl border px-3 py-3 text-sm font-semibold transition-colors',
                      selected
                        ? 'border-main-accent bg-main-accent/[0.08] text-main-accent'
                        : 'border-light-line-reply text-light-primary hover:bg-main-search-background/60 dark:border-dark-line-reply dark:text-dark-primary'
                    )}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>

            <label className='flex flex-col gap-1.5'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                Durée personnalisée (secondes)
              </span>
              <div className='flex items-center gap-3'>
                <input
                  className='w-24 rounded-lg border border-light-line-reply bg-transparent p-2.5 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                  type='number'
                  min={1}
                  max={60}
                  step={1}
                  value={Math.round(duration / 1000)}
                  onChange={(event): void => {
                    const seconds = Math.min(
                      60,
                      Math.max(1, Number(event.target.value) || 1)
                    );
                    setDuration(seconds * 1000);
                  }}
                />
                <span className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
                  Entre 1 et 60 secondes : c’est la durée pendant laquelle le
                  statut reste affiché.
                </span>
              </div>
            </label>

            <div className='flex flex-col-reverse gap-2 xs:flex-row xs:justify-end'>
              <Button
                className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                onClick={goBack}
              >
                Retour
              </Button>
              <Button
                className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                onClick={(): void => goToStep('publish')}
              >
                Suivant
              </Button>
            </div>
          </>
        )}

        {step === 'publish' && (
          <>
            <div className='rounded-xl border border-light-line-reply bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-line-reply dark:text-dark-secondary'>
              {schedulingNote}
            </div>

            <div className='flex flex-col gap-2'>
              <button
                type='button'
                aria-pressed={!schedule}
                onClick={(): void => setSchedule(false)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                  !schedule
                    ? 'border-main-accent bg-main-accent/[0.08]'
                    : 'border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply'
                )}
              >
                <MaterialIcon
                  className={cn(
                    'h-5 w-5 shrink-0',
                    !schedule ? 'text-main-accent' : 'text-light-secondary'
                  )}
                  iconName='send'
                />
                <span>
                  <span
                    className={cn(
                      'block text-sm font-bold',
                      !schedule
                        ? 'text-main-accent'
                        : 'text-light-primary dark:text-dark-primary'
                    )}
                  >
                    Publier maintenant
                  </span>
                  <span className='block text-xs text-light-secondary dark:text-dark-secondary'>
                    Le statut apparaît tout de suite dans votre profil.
                  </span>
                </span>
              </button>

              <button
                type='button'
                aria-pressed={schedule}
                onClick={(): void => setSchedule(true)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                  schedule
                    ? 'border-main-accent bg-main-accent/[0.08]'
                    : 'border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply'
                )}
              >
                <MaterialIcon
                  className={cn(
                    'h-5 w-5 shrink-0',
                    schedule ? 'text-main-accent' : 'text-light-secondary'
                  )}
                  iconName='calendar_month'
                />
                <span>
                  <span
                    className={cn(
                      'block text-sm font-bold',
                      schedule
                        ? 'text-main-accent'
                        : 'text-light-primary dark:text-dark-primary'
                    )}
                  >
                    Programmer pour plus tard
                  </span>
                  <span className='block text-xs text-light-secondary dark:text-dark-secondary'>
                    Le statut n’apparaîtra qu’à l’heure choisie.
                  </span>
                </span>
              </button>
            </div>

            {schedule && (
              <div className='flex flex-col gap-3 sm:flex-row'>
                <label className='flex flex-1 flex-col gap-1.5'>
                  <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                    Date
                  </span>
                  <input
                    className='w-full rounded-lg border border-light-line-reply bg-transparent p-2.5 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                    type='date'
                    min={minDate}
                    value={scheduledDate}
                    onChange={(event): void =>
                      setScheduledDate(event.target.value)
                    }
                  />
                </label>
                <label className='flex flex-1 flex-col gap-1.5'>
                  <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                    Heure
                  </span>
                  <input
                    className='w-full rounded-lg border border-light-line-reply bg-transparent p-2.5 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                    type='time'
                    min={minTime}
                    value={scheduledTime}
                    onChange={(event): void =>
                      setScheduledTime(event.target.value)
                    }
                  />
                </label>
              </div>
            )}

            <div className='flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between'>
              <Button
                className='inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                onClick={goBack}
              >
                <MaterialIcon className='h-4 w-4' iconName='chevron_left' />
                Retour
              </Button>
              <Button
                className='inline-flex items-center justify-center gap-2 rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                disabled={loading}
                onClick={(): Promise<void> => handlePublish()}
              >
                {loading ? (
                  'Publication…'
                ) : (
                  <>
                    <MaterialIcon className='h-5 w-5' iconName='send' />
                    {schedule ? 'Programmer le statut' : 'Publier le statut'}
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
