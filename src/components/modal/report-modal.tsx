import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { addDoc } from 'firebase/firestore';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { userReportsCollection } from '@lib/firebase/collections';
import { uploadImageFile, uploadVideoFile } from '@lib/supabase/storage';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { Modal } from '@components/modal/modal';
import type { ChangeEvent, ReactNode } from 'react';
import type { Variants, PanInfo } from 'framer-motion';
import type { WithFieldValue } from 'firebase/firestore';
import type { Report, ReportAttachment, ReportReason } from '@lib/types/report';

type ReportModalProps = {
  open: boolean;
  /** Publication signalée. */
  tweetId: string;
  /** Auteur de la publication signalée. */
  tweetAuthorId: string;
  tweetAuthorUsername: string;
  /** Aperçu de la publication signalée. */
  tweetAuthorName?: string;
  tweetText?: string | null;
  tweetPhotoURL?: string;
  closeModal: () => void;
};

/* Les étapes de saisie : 1 = conditions, 2 = motif, 3 = précisions.
   L'étape 4 est l'écran de confirmation, après l'envoi. */
type Step = 1 | 2 | 3 | 4;

const totalSteps = 3;

const maxAttachmentSize = 8 * 1024 * 1024;

const sheetAnimation: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } }
};

const stepAnimation: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 26, stiffness: 260 }
  },
  exit: { opacity: 0, x: -24, transition: { duration: 0.12 } }
};

/* Ce qui peut être signalé. */
const prohibitedContents: readonly string[] = [
  'Contenu illégal : atteinte à la vie privée, contenus impliquant des mineurs, appel à la violence, atteinte à l’intégrité physique ou morale d’autrui, encouragement à des comportements illicites.',
  'Contenu haineux : propos visant une personne ou un groupe en raison de son origine, de sa religion, de son handicap, de son sexe, de son orientation ou de ses opinions.',
  'Photo, GIF, vidéo ou texte interdit : contenus à caractère sexuel non consentis, contenus menaçant la sécurité d’autrui, contenus incitant à la haine ou à la violence.',
  'Fascisme, nazisme, antisémitisme et xénophobie : ces contenus sont interdits et retirés sans délai.',
  'Harcèlement : menaces, harcèlement répété, publications visant à humilier ou à isoler une personne.'
];

/* Ce qui ne constitue pas un manquement : on ne signale pas à la légère. */
const toleratedContents: readonly string[] = [
  'Une insulte isolée, une provocation légère ou un désaccord vif n’est pas, à lui seul, un contenu interdit : les échanges entre membres restent libres tant qu’ils ne deviennent pas un harcèlement.',
  'Seul un contenu réellement grave — violence, haine, mise en danger, contenu illégal — justifie un signalement.'
];

/* Le signalement abusif : la règle qui protège les personnes innocentées.
   Aucun bannissement automatique n'est prévu : c'est l'équipe de modération
   qui décide, au cas par cas, des suites à donner. */
const abuseWarnings: readonly string[] = [
  'Signaler à tort une personne qui n’a rien fait de grave n’aide personne : ce signalement sera simplement ignoré.',
  'Les signalements répétés sans motif sérieux sont écartés. Aucune sanction n’est appliquée automatiquement : chaque suite donnée est décidée par une personne, après examen du signalement.'
];

const reasons: Readonly<
  { value: ReportReason; label: string; description: string }[]
> = [
  {
    value: 'illegal',
    label: 'Contenu illégal',
    description:
      'Vie privée, mineurs, appel à la violence, atteinte à l’intégrité d’autrui.'
  },
  {
    value: 'hateful',
    label: 'Contenu haineux ou menaçant',
    description:
      'Propos visant une personne ou un groupe, menaces, mise en danger.'
  },
  {
    value: 'prohibited_media',
    label: 'Photo, GIF, vidéo ou texte interdit',
    description:
      'Contenu sexuel non consenti ou contenu incitant à la haine et à la violence.'
  },
  {
    value: 'discrimination',
    label: 'Fascisme, nazisme, antisémitisme ou racisme',
    description:
      'Idées, symboles ou appels reposant sur une idéologie de supériorité.'
  },
  {
    value: 'harassment',
    label: 'Harcèlement ou humiliation',
    description:
      'Harcèlement répété, stalking, publications visant à isoler une personne.'
  },
  {
    value: 'other',
    label: 'Autre motif',
    description:
      'Le motif ne figure pas dans la liste : décrivez-le à l’étape suivante.'
  }
];

type StepIndicatorProps = {
  step: Step;
};

function StepIndicator({ step }: StepIndicatorProps): JSX.Element {
  if (step === 4) return <></>;

  return (
    <div
      aria-label={`Étape ${step} sur ${totalSteps}`}
      className='flex items-center gap-1.5'
    >
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map(
        (value) => (
          <span
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              value <= step
                ? 'bg-main-accent'
                : 'bg-light-border dark:bg-dark-border'
            )}
            key={value}
          />
        )
      )}
      <span className='ml-1 shrink-0 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
        {step}/{totalSteps}
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
          : 'border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
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

export function ReportModal({
  open,
  tweetId,
  tweetAuthorId,
  tweetAuthorUsername,
  tweetAuthorName,
  tweetText,
  tweetPhotoURL,
  closeModal
}: ReportModalProps): JSX.Element {
  const { user } = useAuth();

  const [step, setStep] = useState<Step>(1);
  const [hasRead, setHasRead] = useState(false);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [otherReason, setOtherReason] = useState('');
  const [details, setDetails] = useState('');
  const [attachment, setAttachment] = useState<ReportAttachment | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y > 100 || info.velocity.y > 550) closeModal();
  };

  useEffect(() => {
    if (!open) return;

    setStep(1);
    setHasRead(false);
    setReason(null);
    setOtherReason('');
    setDetails('');
    setAttachment(null);
    setUploading(false);
    setSending(false);
    setError('');
  }, [open]);

  const needsDetails = reason === 'other';
  const canSend =
    !!reason && (!needsDetails || otherReason.trim().length > 0) && !sending;

  const goToStep = (nextStep: Step): void => {
    setError('');
    setStep(nextStep);
  };

  const handleAttachment = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file || !user?.id) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setError('Seules les images et les vidéos peuvent être jointes.');
      return;
    }

    if (file.size > maxAttachmentSize) {
      setError('Pièce jointe trop lourde : 8 Mo maximum.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const fileWithId = Object.assign(file, { id: `report-${Date.now()}` });

      const uploaded = file.type.startsWith('video/')
        ? await uploadVideoFile(user.id, fileWithId)
        : await uploadImageFile(user.id, fileWithId);

      setAttachment({
        url: uploaded.src,
        contentType: file.type,
        name: file.name
      });
    } catch {
      setError('Impossible d’envoyer cette pièce jointe. Réessayez.');
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async (): Promise<void> => {
    if (!user?.id) {
      setError('Vous devez être connecté pour envoyer un signalement.');
      return;
    }

    if (!reason) {
      setError('Choisissez un motif pour continuer.');
      return;
    }

    if (needsDetails && !otherReason.trim()) {
      setError('Décrivez le motif de votre signalement.');
      return;
    }

    setSending(true);
    setError('');

    try {
      const reportData: WithFieldValue<Omit<Report, 'id'>> = {
        tweetId,
        tweetAuthorId,
        tweetAuthorUsername,
        createdBy: user.id,
        reason,
        details: [otherReason.trim(), details.trim()]
          .filter(Boolean)
          .join('\n\n'),
        attachments: attachment ? [attachment] : [],
        createdAt: Date.now(),
        status: 'pending'
      };

      await addDoc(userReportsCollection(user.id), reportData);

      setStep(4);
    } catch {
      setError(
        'Le signalement n’a pas pu être envoyé. Vérifiez votre connexion et réessayez.'
      );
    } finally {
      setSending(false);
    }
  };

  const title =
    step === 1
      ? 'Signaler une publication'
      : step === 2
      ? 'Quel est le motif ?'
      : step === 3
      ? 'Précisions sur le signalement'
      : 'Demande prise en compte';

  const subtitle =
    step === 1
      ? 'Lisez les conditions avant de continuer : elles protègent aussi les personnes qui n’ont rien fait de grave.'
      : step === 2
      ? 'Choisissez le motif qui correspond le mieux au contenu signalé.'
      : step === 3
      ? 'Ajoutez un message ou une pièce jointe pour aider la modération.'
      : 'Le signalement a bien été transmis à l’équipe de modération.';

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      className='flex items-end justify-center p-0 xs:items-center xs:p-4'
      modalAnimation={sheetAnimation}
      modalClassName='fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-2xl border-t border-light-line-reply bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl dark:border-dark-line-reply xs:static xs:max-h-[88vh] xs:max-w-lg xs:rounded-xl xs:border xs:p-6'
      drag='y'
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0.5}
      dragMomentum={true}
      dragSnapToOrigin={false}
      dragConstraints={{ top: 0 }}
      onDragEnd={handleDragEnd}
    >
      <button
        aria-label='Faire glisser pour fermer la fenêtre de signalement'
        className='-mt-2 flex w-full touch-none justify-center py-3 xs:hidden'
        onPointerDown={(event) => dragControls.start(event.nativeEvent)}
        type='button'
      >
        <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
      </button>

      <StepIndicator step={step} />

      <div className='mb-4 mt-3 flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <h2 className='text-lg font-bold text-main-accent'>{title}</h2>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            {subtitle}
          </p>
        </div>
        <Button
          aria-label='Fermer'
          className='-mr-2 -mt-2 shrink-0 p-2'
          onClick={closeModal}
        >
          <MaterialIcon className='h-5 w-5' iconName='close' />
        </Button>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={step}
          animate='animate'
          exit='exit'
          initial='initial'
          variants={stepAnimation}
        >
          {step === 1 && (
            <div className='flex flex-col gap-3'>
              {/* Aperçu de la publication signalée : la personne voit exactement
                  ce qu'elle signale avant de lire les conditions. */}
              <div className='flex items-start gap-3 rounded-xl border border-light-border p-3 dark:border-dark-border'>
                {tweetPhotoURL && (
                  <img
                    alt=''
                    className='h-10 w-10 shrink-0 rounded-full object-cover'
                    src={tweetPhotoURL}
                  />
                )}
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-bold text-light-primary dark:text-dark-primary'>
                    {tweetAuthorName ?? tweetAuthorUsername}{' '}
                    <span className='font-normal text-light-secondary dark:text-dark-secondary'>
                      @{tweetAuthorUsername}
                    </span>
                  </p>
                  {tweetText && (
                    <p
                      className='mt-0.5 overflow-hidden text-sm leading-5 text-light-secondary
                                 [display:-webkit-box] [-webkit-box-orient:vertical]
                                 [-webkit-line-clamp:3] dark:text-dark-secondary'
                    >
                      {tweetText}
                    </p>
                  )}
                </div>
              </div>

              <div
                aria-label='Conditions de signalement'
                className='max-h-[38vh] overflow-y-auto overscroll-contain rounded-lg border border-light-line-reply bg-main-search-background/20 p-4 text-sm font-normal leading-6 text-light-secondary dark:border-dark-line-reply dark:bg-dark-primary/[0.04] dark:text-dark-secondary xs:max-h-[36vh]'
                role='region'
                tabIndex={0}
              >
                <h3 className='text-sm font-bold text-main-accent'>
                  Ce qui peut être signalé
                </h3>
                <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                  {prohibitedContents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h3 className='mt-4 text-sm font-bold text-main-accent'>
                  Ce qui n’est pas un manquement
                </h3>
                <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                  {toleratedContents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h3 className='mt-4 text-sm font-bold text-main-accent'>
                  Le signalement abusif
                </h3>
                <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                  {abuseWarnings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className='mt-4 border-t border-light-line-reply pt-3 text-xs text-main-accent dark:border-dark-line-reply'>
                  Fin des conditions.
                </p>
              </div>

              <Acknowledgement checked={hasRead} onChange={setHasRead}>
                J’ai lu ces conditions et je signale uniquement un contenu qui
                me paraît réellement interdit.
              </Acknowledgement>

              <div className='mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:justify-end'>
                <Button
                  className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                  onClick={closeModal}
                >
                  Annuler
                </Button>
                <Button
                  className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                  disabled={!hasRead}
                  onClick={(): void => goToStep(2)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                {reasons.map((item) => {
                  const selected = reason === item.value;

                  return (
                    <button
                      key={item.value}
                      type='button'
                      aria-pressed={selected}
                      onClick={(): void => {
                        setReason(item.value);
                        setError('');
                      }}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors',
                        selected
                          ? 'border-main-accent bg-main-accent/[0.08]'
                          : 'border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                      )}
                    >
                      <span
                        aria-hidden='true'
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                          selected
                            ? 'border-main-accent bg-main-accent text-white'
                            : 'border-light-line-reply bg-transparent dark:border-dark-line-reply'
                        )}
                      >
                        {selected && (
                          <MaterialIcon className='h-3 w-3' iconName='check' />
                        )}
                      </span>
                      <span className='min-w-0 flex-1'>
                        <span
                          className={cn(
                            'block text-sm font-semibold',
                            selected
                              ? 'text-main-accent'
                              : 'text-light-primary dark:text-dark-primary'
                          )}
                        >
                          {item.label}
                        </span>
                        <span className='mt-0.5 block text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
                          {item.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {needsDetails && (
                <label className='flex flex-col gap-1.5'>
                  <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                    Décrivez le motif
                  </span>
                  <textarea
                    value={otherReason}
                    maxLength={300}
                    rows={3}
                    placeholder='En quelques mots, qu’est-ce qui ne respecte pas les règles ?'
                    onChange={(event): void => {
                      setOtherReason(event.target.value);
                      setError('');
                    }}
                    className='w-full resize-none rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply'
                  />
                  <span className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
                    {otherReason.trim()
                      ? 'Merci : votre motif est enregistré.'
                      : 'Le bouton « Suivant » reste désactivé tant que le motif n’est pas décrit. Vous pouvez aussi revenir en arrière pour choisir un autre motif.'}
                  </span>
                </label>
              )}

              {error && (
                <p className='text-sm text-accent-red' role='alert'>
                  {error}
                </p>
              )}

              <div className='mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between'>
                <Button
                  className='inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                  onClick={(): void => goToStep(1)}
                >
                  <MaterialIcon className='h-4 w-4' iconName='chevron_left' />
                  Retour
                </Button>
                <div className='flex flex-col-reverse gap-2 xs:flex-row'>
                  <Button
                    className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                    onClick={closeModal}
                  >
                    Annuler
                  </Button>
                  <Button
                    className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                    disabled={!reason || (needsDetails && !otherReason.trim())}
                    onClick={(): void => goToStep(3)}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='flex flex-col gap-3'>
              <p className='rounded-xl border border-light-border bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-border dark:text-dark-secondary'>
                La publication signalée est{' '}
                <strong className='text-main-accent'>
                  @{tweetAuthorUsername}
                </strong>
                . Décrivez ce qui pose problème, ou joignez une capture : plus
                votre description est précise, plus le traitement est rapide.
              </p>

              <label className='flex flex-col gap-1.5'>
                <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                  Votre message (facultatif)
                </span>
                <textarea
                  value={details}
                  maxLength={1000}
                  rows={4}
                  placeholder='Expliquez en quelques lignes ce que vous avez vu.'
                  onChange={(event): void => setDetails(event.target.value)}
                  className='w-full resize-none rounded-lg border border-light-border bg-transparent px-3 py-2 text-sm outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply'
                />
              </label>

              <div className='flex flex-col gap-1.5'>
                <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                  Pièce jointe (facultative)
                </span>
                <input
                  ref={fileInputRef}
                  accept='image/*,video/*'
                  className='hidden'
                  onChange={handleAttachment}
                  type='file'
                />
                {attachment ? (
                  <div className='flex items-center gap-3 rounded-lg border border-main-accent/40 bg-main-accent/[0.06] p-3'>
                    <MaterialIcon
                      className='h-5 w-5 shrink-0 text-main-accent'
                      iconName={
                        attachment.contentType.startsWith('video/')
                          ? 'play_arrow'
                          : 'image'
                      }
                    />
                    <span className='min-w-0 flex-1 truncate text-sm text-light-primary dark:text-dark-primary'>
                      {attachment.name}
                    </span>
                    <Button
                      aria-label='Retirer la pièce jointe'
                      className='shrink-0 p-1.5'
                      onClick={(): void => setAttachment(null)}
                    >
                      <MaterialIcon className='h-4 w-4' iconName='close' />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className='rounded-lg border border-dashed border-light-border px-4 py-3 font-semibold text-main-accent transition hover:bg-main-accent/5 dark:border-dark-line-reply'
                    disabled={uploading}
                    onClick={(): void => fileInputRef.current?.click()}
                  >
                    <span className='inline-flex items-center gap-2'>
                      <MaterialIcon className='h-5 w-5' iconName='upload' />
                      {uploading
                        ? 'Envoi en cours…'
                        : 'Joindre une image ou une vidéo'}
                    </span>
                  </Button>
                )}
                <p className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
                  Une seule pièce jointe, 8 Mo maximum. Les fichiers envoyés
                  restent dans l’espace privé d’Inspiration Inc. pour l’examen
                  de la demande : ils ne sont jamais publiés.
                </p>
              </div>

              {error && (
                <p className='text-sm text-accent-red' role='alert'>
                  {error}
                </p>
              )}

              <div className='mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between'>
                <Button
                  className='inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                  onClick={(): void => goToStep(2)}
                >
                  <MaterialIcon className='h-4 w-4' iconName='chevron_left' />
                  Retour
                </Button>
                <div className='flex flex-col-reverse gap-2 xs:flex-row'>
                  <Button
                    className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                    onClick={closeModal}
                  >
                    Annuler
                  </Button>
                  <Button
                    className='inline-flex items-center justify-center gap-2 rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                    disabled={!canSend}
                    onClick={(): Promise<void> => handleSend()}
                  >
                    {sending ? (
                      'Envoi en cours…'
                    ) : (
                      <>
                        <MaterialIcon className='h-5 w-5' iconName='send' />
                        Envoyer la demande
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='flex flex-col items-center gap-4 py-4 text-center'>
              <motion.span
                aria-hidden='true'
                animate={{ scale: [0.5, 1.12, 1], opacity: [0, 1, 1] }}
                className='relative flex h-20 w-20 items-center justify-center rounded-full bg-main-accent/10 text-main-accent'
                initial={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <motion.span
                  animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
                  className='absolute inset-0 rounded-full border-2 border-main-accent'
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    repeatDelay: 0.35
                  }}
                />
                <MaterialIcon className='h-10 w-10' iconName='check' solid />
              </motion.span>

              <div>
                <h3 className='text-lg font-bold text-main-accent'>
                  Votre demande a été prise en compte
                </h3>
                <p className='mt-2 text-sm leading-6 text-light-secondary dark:text-dark-secondary'>
                  Le signalement a été enregistré et sera examiné par l’équipe
                  d’Inspiration Inc. dans les meilleurs délais. Vous n’avez rien
                  d’autre à faire : vous pouvez continuer à utiliser
                  l’application normalement.
                </p>
                <p className='mt-2 text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
                  La personne signalée n’est pas informée de votre signalement.
                  Aucune mesure n’est appliquée automatiquement : chaque suite
                  donnée est décidée par une personne, après examen du dossier.
                </p>
              </div>

              <Button
                className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                onClick={closeModal}
              >
                Fermer
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}
