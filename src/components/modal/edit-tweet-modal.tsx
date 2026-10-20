import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { tweetsCollection } from '@lib/firebase/collections';
import { manageTotalPhotos } from '@lib/firebase/utils';
import { getRandomId } from '@lib/random';
import { uploadImages } from '@lib/supabase/storage';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { Modal } from '@components/modal/modal';
import type { ChangeEvent } from 'react';
import type { Variants, PanInfo } from 'framer-motion';
import type { FilesWithId } from '@lib/types/file';
import type { ImagesPreview } from '@lib/types/file';

type EditTweetModalProps = {
  open: boolean;
  /** Publication à modifier. */
  tweetId: string;
  closeModal: () => void;
};

/* Les étapes de modification : le texte, les médias, puis l'enregistrement. */
type Step = 'text' | 'media' | 'save';

const STEPS: Readonly<Step[]> = ['text', 'media', 'save'];

const STEP_TITLES: Record<Step, string> = {
  text: 'Modifier le texte',
  media: 'Modifier les médias',
  save: 'Enregistrer'
};

/** Longueur maximale du texte d'une publication. */
const MAX_TEXT = 280;

/** Nombre maximal de médias dans une même publication. */
const MAX_FILES = 4;

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

type StepIndicatorProps = {
  step: number;
};

function StepIndicator({ step }: StepIndicatorProps): JSX.Element {
  return (
    <div
      aria-label={`Étape ${step} sur ${STEPS.length}`}
      className='flex items-center gap-1.5'
    >
      {STEPS.map((value, index) => (
        <span
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            index < step ? 'bg-main-accent' : 'bg-light-border dark:bg-dark-border'
          )}
          key={value}
        />
      ))}
      <span className='ml-1 shrink-0 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
        {step}/{STEPS.length}
      </span>
    </div>
  );
}

export function EditTweetModal({
  open,
  tweetId,
  closeModal
}: EditTweetModalProps): JSX.Element {
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  const [step, setStep] = useState<Step>('text');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<ImagesPreview>([]);
  const [initialImageCount, setInitialImageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  /* La publication est relue à l'ouverture : on modifie toujours la version
     la plus récente, pas celle affichée dans la liste. */
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    setStep('text');
    setText('');
    setLocation('');
    setImages([]);
    setInitialImageCount(0);
    setLoading(true);
    setUploading(false);
    setSaving(false);
    setError('');

    void (async () => {
      try {
        const snapshot = await getDoc(doc(tweetsCollection, tweetId));

        if (cancelled || !snapshot.exists()) return;

        const data = snapshot.data();

        setText(data.text ?? '');
        setLocation(data.location ?? '');
        setImages(data.images ?? []);
        setInitialImageCount(data.images?.length ?? 0);
      } catch {
        if (!cancelled) setError('Publication introuvable.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, tweetId]);

  const canSave = text.trim().length > 0 || images.length > 0;

  const goToStep = (next: Step): void => {
    setError('');
    setStep(next);
  };

  const goBack = (): void => {
    const index = STEPS.indexOf(step);

    if (index > 0) setStep(STEPS[index - 1]);
  };

  /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y > 100 || info.velocity.y > 550) closeModal();
  };

  const handleFiles = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const selected = event.target.files;

    event.target.value = '';

    if (!selected?.length || !user?.id) return;

    const files: FilesWithId = Array.from(selected)
      .filter(
        (file) =>
          file.type.startsWith('image/') || file.type.startsWith('video/')
      )
      .map((file) => Object.assign(file, { id: getRandomId() }));

    if (!files.length) return;

    setUploading(true);
    setError('');

    try {
      const uploaded = await uploadImages(user.id, files);

      if (!uploaded?.length) {
        setError("Impossible d'ajouter ces médias.");
        return;
      }

      setImages((previous) =>
        [...previous, ...uploaded].slice(0, MAX_FILES)
      );
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Impossible d'ajouter ces médias."
      );
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (id: string): void => {
    setImages((previous) => previous.filter((image) => image.id !== id));
  };

  const handleSave = async (): Promise<void> => {
    if (!user?.id || saving) return;

    if (!canSave) {
      setError('Une publication ne peut pas être vide.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await updateDoc(doc(tweetsCollection, tweetId), {
        text: text.trim() || null,
        location: location.trim() || null,
        images: images.length ? images : null,
        updatedAt: serverTimestamp()
      });

      /* Le compteur de photos du profil suit le nombre de médias. */
      const added = images.length - initialImageCount;

      if (added > 0) await manageTotalPhotos('increment', user.id);
      if (added < 0)
        await manageTotalPhotos(
          'decrement',
          user.id
        );

      toast.success('Publication modifiée');
      closeModal();
    } catch {
      setError('La publication n’a pas pu être modifiée. Réessayez.');
    } finally {
      setSaving(false);
    }
  };

  const stepIndex = STEPS.indexOf(step) + 1;

  const preview = useMemo(
    () => text.trim() || 'Votre texte apparaîtra ici',
    [text]
  );

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      className='flex items-end justify-center p-0 xs:items-center xs:p-4'
      modalAnimation={sheetAnimation}
      drag='y'
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0.5}
      dragMomentum={true}
      dragSnapToOrigin={false}
      dragConstraints={{ top: 0 }}
      onDragEnd={handleDragEnd}
      modalClassName='fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-2xl border-t border-light-line-reply bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl dark:border-dark-line-reply xs:static xs:max-h-[88vh] xs:max-w-lg xs:rounded-xl xs:border xs:p-6'
    >
      <button
        aria-label='Faire glisser pour fermer la fenêtre de modification'
        className='-mt-2 flex w-full touch-none justify-center py-3 xs:hidden'
        onPointerDown={(event) => dragControls.start(event.nativeEvent)}
        type='button'
      >
        <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
      </button>

      <StepIndicator step={stepIndex} />

      <div className='mb-4 mt-3 flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <h2 className='text-lg font-bold text-main-accent'>
            {STEP_TITLES[step]}
          </h2>
          <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
            {step === 'text'
              ? 'Le texte et le lieu de la publication.'
              : step === 'media'
              ? 'Ajoutez ou retirez les photos et vidéos.'
              : 'Vérifiez avant d’enregistrer.'}
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
          {loading && (
            <div className='flex justify-center py-8'>
              <span className='inline-block h-6 w-6 animate-spin rounded-full border-2 border-main-accent border-t-transparent' />
            </div>
          )}

          {!loading && step === 'text' && (
            <div className='flex flex-col gap-3'>
              <div className='rounded-xl border border-light-line-reply p-4'>
                <p className='whitespace-pre-wrap break-words text-[15px] leading-relaxed text-light-primary dark:text-dark-primary'>
                  {preview}
                </p>
              </div>

              <label className='flex flex-col gap-1.5'>
                <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                  Texte de la publication
                </span>
                <textarea
                  className='w-full resize-none rounded-lg border border-light-line-reply bg-transparent p-3 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                  maxLength={MAX_TEXT}
                  placeholder='Que voulez-vous dire ?'
                  rows={4}
                  value={text}
                  onChange={(event): void => setText(event.target.value)}
                />
                <span className='self-end text-xs text-light-secondary dark:text-dark-secondary'>
                  {text.length}/{MAX_TEXT}
                </span>
              </label>

              <label className='flex flex-col gap-1.5'>
                <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                  Lieu (facultatif)
                </span>
                <input
                  className='w-full rounded-lg border border-light-line-reply bg-transparent p-2.5 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary'
                  placeholder='Paris, France'
                  value={location}
                  onChange={(event): void => setLocation(event.target.value)}
                />
              </label>

              <div className='flex flex-col-reverse gap-2 xs:flex-row xs:justify-end'>
                <Button
                  className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                  onClick={closeModal}
                >
                  Annuler
                </Button>
                <Button
                  className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                  onClick={(): void => goToStep('media')}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {!loading && step === 'media' && (
            <div className='flex flex-col gap-3'>
              {images.length > 0 && (
                <div className='grid grid-cols-2 gap-2'>
                  {images.map((image) => (
                    <div
                      className='relative overflow-hidden rounded-lg bg-black/30'
                      key={image.id}
                    >
                      {image.type?.startsWith('video/') ? (
                        <video
                          className='h-28 w-full object-cover'
                          src={image.src}
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          alt={image.alt ?? ''}
                          className='h-28 w-full object-cover'
                          src={image.src}
                        />
                      )}
                      <button
                        aria-label='Retirer ce média'
                        className='absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white transition hover:bg-black/80'
                        onClick={(): void => removeImage(image.id)}
                        type='button'
                      >
                        <MaterialIcon className='h-4 w-4' iconName='close' />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                accept='image/*,video/*'
                className='hidden'
                multiple
                onChange={handleFiles}
                ref={fileInputRef}
                type='file'
              />

              <Button
                className='accent-tab accent-bg-tab flex items-center justify-center gap-2 rounded-full bg-main-accent/10 px-4 py-2.5 text-sm font-semibold text-main-accent'
                disabled={uploading || images.length >= MAX_FILES}
                onClick={(): void => fileInputRef.current?.click()}
              >
                <MaterialIcon className='h-5 w-5' iconName='add' />
                {uploading
                  ? 'Envoi en cours…'
                  : images.length
                  ? 'Ajouter des médias'
                  : 'Ajouter des photos / vidéos'}
              </Button>

              <p className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
                {images.length}/{MAX_FILES} médias. Le sondage et le message vocal
                ne sont pas modifiables une fois la publication envoyée.
              </p>

              {error && (
                <p className='text-sm text-accent-red' role='alert'>
                  {error}
                </p>
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
                  className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                  onClick={(): void => goToStep('save')}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {!loading && step === 'save' && (
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2 rounded-xl border border-light-line-reply p-4'>
                <p className='text-xs font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
                  Texte
                </p>
                <p className='whitespace-pre-wrap break-words text-[15px] leading-relaxed text-light-primary dark:text-dark-primary'>
                  {text.trim() || 'Aucun texte'}
                </p>
                {location.trim() && (
                  <p className='mt-1 flex items-center gap-1.5 text-sm text-light-secondary dark:text-dark-secondary'>
                    <MaterialIcon className='h-4 w-4' iconName='location_on' />
                    {location.trim()}
                  </p>
                )}
                <p className='mt-1 text-xs font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
                  Médias : {images.length}
                </p>
              </div>

              <p className='rounded-xl border border-light-line-reply bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-line-reply dark:text-dark-secondary'>
                La publication sera mise à jour : le texte, le lieu et les médias
                seront remplacés par ce que vous voyez ici.
              </p>

              {error && (
                <p className='text-sm text-accent-red' role='alert'>
                  {error}
                </p>
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
                  disabled={saving || !canSave}
                  onClick={(): Promise<void> => handleSave()}
                >
                  {saving ? (
                    'Enregistrement…'
                  ) : (
                    <>
                      <MaterialIcon className='h-5 w-5' iconName='check' />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}
