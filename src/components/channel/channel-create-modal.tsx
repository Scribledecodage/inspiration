import { useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useDragControls } from 'framer-motion';
import type { PanInfo, Variants } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { createGroupConversation } from '@lib/firebase/chat';
import {
  channelsCollection,
  userConversationsCollection
} from '@lib/firebase/collections';
import { fileToBase64 } from '@lib/supabase/storage';
import { avatarShapeOptions } from '@lib/avatar-shape';
import { Modal } from '@components/modal/modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { AvatarPickerModal } from '@components/user/avatar-picker-modal';
import { ChannelAvatar } from '@components/channel/channel-avatar';
import type { ChangeEvent, ReactNode } from 'react';
import type { AvatarShape } from '@lib/types/theme';
import type { ChannelVisibility } from '@lib/types/channel';

type ChannelCreateModalProps = {
  open: boolean;
  closeModal: () => void;
};

type Step = 'conditions' | 'identity' | 'details' | 'publish';

/* Les étapes de saisie : les conditions d'abord, puis l'identité de la
   chaîne, sa présentation, et enfin la création. */
const STEPS: Readonly<Step[]> = [
  'conditions',
  'identity',
  'details',
  'publish'
];

const STEP_TITLES: Record<Step, string> = {
  conditions: 'Conditions de création',
  identity: 'Identité de la chaîne',
  details: 'Présentation de la chaîne',
  publish: 'Créer la chaîne'
};

/* Longueur du nom de la chaîne. */
const MIN_NAME = 3;
const MAX_NAME = 40;
/* Longueur de la description. */
const MAX_DESCRIPTION = 200;

/* Ce qu'une chaîne permet. */
const allowedContents: readonly string[] = [
  'Une chaîne est un espace de publication qui n’appartient qu’à vous : vous seul y publiez, les autres le lisent et y réagissent.',
  'Un nom et une image qui identifient clairement votre chaîne, une description qui explique de quoi elle parle.',
  'Une audience choisie : une chaîne publique apparaît dans « Découvrir », une chaîne privée reste entre vous.',
  'Les messages envoyés dans la chaîne restent modérables : ils peuvent être signalés comme n’importe quel autre contenu.'
];

/* Ce qui n'est pas accepté. */
const refusedContents: readonly string[] = [
  'Les contenus illicites, les propos haineux ou discriminants, le harcèlement et les menaces.',
  'Les chaînes qui usurpent l’identité d’une marque, d’une personne ou d’une institution.',
  'Les chaînes de spam, de publicité agressive ou de contenu frauduleux.'
];

const moderationNote =
  'Une chaîne qui enfreint ces conditions peut être retirée de la plateforme ; la suppression est alors définitive.';

const sheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

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

/**
 * Fenêtre de création d'une chaîne. Elle se déroule en plusieurs étapes, à
 * l'image de la fenêtre de création d'un statut : les conditions d'abord,
 * puis l'identité, la présentation, et enfin la création.
 */
export function ChannelCreateModal({
  open,
  closeModal
}: ChannelCreateModalProps): JSX.Element {
  const { user } = useAuth();
  const { width } = useWindow();

  /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */
  const isSheet = width < 1024;

  const dragControls = useDragControls();

  const [step, setStep] = useState<Step>('conditions');
  const [hasRead, setHasRead] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [visibility, setVisibility] = useState<ChannelVisibility>('public');
  const [avatarShape, setAvatarShape] = useState<AvatarShape>('circle');
  const [shapesOpen, setShapesOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const trimmedName = name.trim();
  const nameValid = trimmedName.length >= MIN_NAME;
  const nameTooLong = name.length > MAX_NAME;
  const descriptionTooLong = description.length > MAX_DESCRIPTION;

  const reset = (): void => {
    setStep('conditions');
    setHasRead(false);
    setName('');
    setDescription('');
    setPhotoURL(null);
    setVisibility('public');
    setAvatarShape('circle');
    setExpanded(false);
  };

  const handleClose = (): void => {
    if (creating) return;
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

  const goToStep = (next: Step): void => {
    setStep(next);
  };

  const goBack = (): void => {
    const index = STEPS.indexOf(step);

    if (index > 0) setStep(STEPS[index - 1]);
  };

  const handlePhotoChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !user?.id) return;

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image trop lourde : 8 Mo maximum.');
      return;
    }

    setPhotoBusy(true);

    try {
      const base64Data = await fileToBase64(file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name || `channel-${Date.now()}.jpg`,
          contentType: file.type || 'image/jpeg',
          base64Data,
          userId: user.id
        })
      });

      if (!response.ok) throw new Error('upload-failed');

      const { url } = (await response.json()) as { url?: string };
      if (!url) throw new Error('upload-failed');

      setPhotoURL(url);
    } catch {
      toast.error("Impossible d'ajouter cette image.");
    } finally {
      setPhotoBusy(false);
    }
  };

  const handleCreate = async (): Promise<void> => {
    if (!user?.id || creating || !nameValid || nameTooLong) return;

    setCreating(true);

    try {
      const conversation = await createGroupConversation({
        creatorId: user.id,
        memberIds: [],
        name: trimmedName,
        photoURL,
        description: description.trim() || null
      });

      /* Marque la conversation comme une chaîne (auteur seul publie). */
      await updateDoc(
        doc(userConversationsCollection(user.id), conversation.id),
        {
          type: 'channel',
          createdBy: user.id,
          avatarShape
        }
      );

      /* Dépose la chaîne dans la collection publique : la page « Découvrir »
         ne montre que les chaînes publiques. */
      await setDoc(doc(channelsCollection, conversation.id), {
        id: conversation.id,
        name: trimmedName,
        description: description.trim() || null,
        photoURL,
        ownerId: user.id,
        conversationId: conversation.id,
        visibility,
        avatarShape,
        createdAt: Date.now()
      });

      reset();
      closeModal();
      toast.success('Chaîne créée.');
    } catch {
      toast.error('Impossible de créer la chaîne.');
    } finally {
      setCreating(false);
    }
  };

  const stepIndex = STEPS.indexOf(step) + 1;

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
          className='flex w-full touch-none justify-center py-3'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}

      <div className='flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]'>
        <StepIndicator step={stepIndex} steps={STEPS} />

        <div className='flex items-center gap-3'>
          {step !== 'conditions' && (
            <button
              aria-label='Retour'
              className='rounded-full p-2 text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
              onClick={goBack}
              type='button'
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
                Ce qu’une chaîne permet
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
                Modération
              </h3>
              <p className='mt-2'>{moderationNote}</p>

              <p className='mt-4 border-t border-light-line-reply pt-3 text-xs text-main-accent dark:border-dark-line-reply'>
                Fin des conditions.
              </p>
            </div>

            <Acknowledgement checked={hasRead} onChange={setHasRead}>
              J’ai lu ces conditions et je m’engage à ne publier dans cette
              chaîne que du contenu conforme.
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
                onClick={(): void => goToStep('identity')}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}

        {step === 'identity' && (
          <>
            <div className='flex items-center gap-4'>
              <ChannelAvatar
                name={trimmedName || 'Chaîne'}
                photoURL={photoURL}
                shape={avatarShape}
                size={64}
              />

              <div className='flex min-w-0 flex-col gap-1'>
                <label
                  className='cursor-pointer rounded-full bg-main-accent px-4 py-1.5 text-sm font-bold text-white transition hover:bg-main-accent/90'
                  htmlFor='channel-photo'
                >
                  {photoBusy ? 'Envoi…' : 'Choisir une image'}
                </label>
                <span className='text-xs text-light-secondary dark:text-dark-secondary'>
                  JPG ou PNG, 8 Mo maximum.
                </span>
                <input
                  accept='image/*'
                  className='hidden'
                  id='channel-photo'
                  onChange={handlePhotoChange}
                  type='file'
                />
              </div>
            </div>

            {/* Forme de l'image de la chaîne : comme pour notre propre avatar,
                la photo est découpée dans la forme choisie (rond par défaut).
                Sans image, l'aperçu montre l'icône d'information. */}
            <div className='flex items-center gap-3 rounded-md border border-light-border p-3 dark:border-dark-border'>
              <ChannelAvatar
                name={trimmedName || 'Chaîne'}
                photoURL={photoURL}
                shape={avatarShape}
                size={40}
              />

              <div className='flex min-w-0 flex-1 flex-col'>
                <span className='truncate text-sm font-semibold text-light-primary dark:text-dark-primary'>
                  Forme de l’image
                </span>
                <span className='truncate text-[11px] text-light-secondary dark:text-dark-secondary'>
                  {avatarShapeOptions.find(
                    ([key]) => key === avatarShape
                  )?.[1] ?? 'Rond'}
                </span>
              </div>

              <button
                className='shrink-0 rounded-full border border-light-line-reply px-3 py-1.5 text-xs font-bold text-light-primary transition hover:bg-light-primary/10 dark:border-dark-border dark:text-dark-primary dark:hover:bg-dark-primary/10'
                onClick={(): void => setShapesOpen(true)}
                type='button'
              >
                Choisir
              </button>
            </div>

            <div className='flex flex-col gap-1.5'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                Nom de la chaîne
              </span>
              <input
                className='w-full rounded-lg border border-light-line-reply bg-transparent p-2.5 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                maxLength={MAX_NAME}
                onChange={(event): void => setName(event.target.value)}
                placeholder='Ma chaîne'
                value={name}
              />
              <span
                className={cn(
                  'text-xs text-light-secondary dark:text-dark-secondary',
                  nameTooLong && 'text-main-accent'
                )}
              >
                {nameTooLong
                  ? `${MAX_NAME} caractères maximum.`
                  : `${name.length}/${MAX_NAME} — ${MIN_NAME} caractères minimum.`}
              </span>
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
                disabled={!nameValid || nameTooLong}
                onClick={(): void => goToStep('details')}
              >
                Suivant
              </Button>
            </div>
          </>
        )}

        {step === 'details' && (
          <>
            <div className='flex flex-col gap-1.5'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                Description
              </span>
              <textarea
                className='w-full resize-none rounded-lg border border-light-line-reply bg-transparent p-3 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                maxLength={MAX_DESCRIPTION}
                onChange={(event): void => setDescription(event.target.value)}
                placeholder='De quoi parle votre chaîne ?'
                rows={3}
                value={description}
              />
              <span
                className={cn(
                  'self-end text-xs text-light-secondary dark:text-dark-secondary',
                  descriptionTooLong && 'text-main-accent'
                )}
              >
                {description.length}/{MAX_DESCRIPTION}
              </span>
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                Audience
              </span>

              <button
                aria-pressed={visibility === 'public'}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                  visibility === 'public'
                    ? 'border-main-accent bg-main-accent/[0.08]'
                    : 'border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply'
                )}
                onClick={(): void => setVisibility('public')}
                type='button'
              >
                <MaterialIcon
                  className={cn(
                    'h-5 w-5 shrink-0',
                    visibility === 'public'
                      ? 'text-main-accent'
                      : 'text-light-secondary'
                  )}
                  iconName='public'
                />
                <span>
                  <span
                    className={cn(
                      'block text-sm font-bold',
                      visibility === 'public'
                        ? 'text-main-accent'
                        : 'text-light-primary dark:text-dark-primary'
                    )}
                  >
                    Chaîne publique
                  </span>
                  <span className='block text-xs text-light-secondary dark:text-dark-secondary'>
                    Elle apparaît dans « Découvrir » et peut être trouvée par
                    d’autres personnes.
                  </span>
                </span>
              </button>

              <button
                aria-pressed={visibility === 'private'}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                  visibility === 'private'
                    ? 'border-main-accent bg-main-accent/[0.08]'
                    : 'border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply'
                )}
                onClick={(): void => setVisibility('private')}
                type='button'
              >
                <MaterialIcon
                  className={cn(
                    'h-5 w-5 shrink-0',
                    visibility === 'private'
                      ? 'text-main-accent'
                      : 'text-light-secondary'
                  )}
                  iconName='lock'
                />
                <span>
                  <span
                    className={cn(
                      'block text-sm font-bold',
                      visibility === 'private'
                        ? 'text-main-accent'
                        : 'text-light-primary dark:text-dark-primary'
                    )}
                  >
                    Chaîne privée
                  </span>
                  <span className='block text-xs text-light-secondary dark:text-dark-secondary'>
                    Elle reste dans vos chaînes, sans apparaître dans «
                    Découvrir ».
                  </span>
                </span>
              </button>
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
                disabled={descriptionTooLong}
                onClick={(): void => goToStep('publish')}
              >
                Suivant
              </Button>
            </div>
          </>
        )}

        {step === 'publish' && (
          <>
            <div className='flex items-center gap-4 rounded-xl border border-light-line-reply bg-main-search-background/20 p-4 dark:border-dark-line-reply'>
              <ChannelAvatar
                name={trimmedName || 'Chaîne'}
                photoURL={photoURL}
                shape={avatarShape}
                size={56}
              />

              <div className='min-w-0 flex-1'>
                <p className='truncate font-bold text-light-primary dark:text-dark-primary'>
                  {trimmedName}
                </p>
                <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
                  {description.trim() || 'Aucune description'}
                </p>
                <p className='mt-1 text-xs text-light-secondary dark:text-dark-secondary'>
                  {visibility === 'public'
                    ? 'Chaîne publique'
                    : 'Chaîne privée'}
                </p>
              </div>
            </div>

            <p className='rounded-xl border border-light-line-reply bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-line-reply dark:text-dark-secondary'>
              Vous seul pourrez publier dans cette chaîne. Les autres personnes
              pourront la lire et y réagir, sauf si elle est privée.
            </p>

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
                disabled={creating || !nameValid}
                onClick={(): Promise<void> => handleCreate()}
              >
                {creating ? (
                  'Création…'
                ) : (
                  <>
                    <MaterialIcon className='h-5 w-5' iconName='add' />
                    Créer la chaîne
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Choix de la forme : fenêtre sur ordinateur, menu sur téléphone. */}
      <AvatarPickerModal
        open={shapesOpen}
        title='Forme de l’image de la chaîne'
        subtitle='La photo de la chaîne est découpée dans cette forme.'
        options={avatarShapeOptions}
        value={avatarShape}
        gridClass='grid-cols-2 xs:grid-cols-3'
        onClose={(): void => setShapesOpen(false)}
        onSelect={(shapeKey): void => {
          setAvatarShape(shapeKey as AvatarShape);
          setShapesOpen(false);
        }}
        renderPreview={(shapeKey): JSX.Element => (
          /* Sans image, la forme montre l'icône d'information ; avec une
             image, elle montre la photo découpée. */
          <ChannelAvatar
            name={trimmedName || 'Chaîne'}
            photoURL={photoURL}
            shape={shapeKey as AvatarShape}
            size={40}
          />
        )}
      />
    </Modal>
  );
}
