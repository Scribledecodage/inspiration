import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';

type CameraModalProps = {
  open: boolean;
  onClose: () => void;
  /* Photo prise à l'instant : un fichier JPEG, prêt pour l'enregistrement. */
  onCapture: (file: File) => void;
  /* Repli proposé quand l'appareil n'a pas de caméra (ordinateur fixe…) :
     choisir une image déjà présente sur l'appareil. */
  onPickFile?: () => void;
};

/* Prise de photo avec l'appareil photo de l'appareil (téléphone, tablette,
   webcam) : un aperçu en direct, un déclencheur, et la photo obtenue est
   renvoyée comme un simple fichier image.

   La fenêtre reprend le gabarit des autres menus du site (choix des photos,
   des formes, des cadres) : panneau collé aux bords sur téléphone, petite
   fenêtre centrée sur ordinateur. Affichée dans le corps de la page, pour
   qu'elle ne soit jamais rognée par la fenêtre de modification du profil. */
export function CameraModal({
  open,
  onClose,
  onCapture,
  onPickFile
}: CameraModalProps): JSX.Element | null {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [mounted, setMounted] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [canFlip, setCanFlip] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState(false);

  useEffect((): void => setMounted(true), []);

  /* La touche Échap referme le menu. */
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const stopCamera = useCallback((): void => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setReady(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    setError('');
    setFlash(false);

    const start = async (): Promise<void> => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('Cet appareil n’a pas d’appareil photo utilisable.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 1280 }
          },
          audio: false
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        const devices = await navigator.mediaDevices.enumerateDevices();
        setCanFlip(
          devices.filter(({ kind }) => kind === 'videoinput').length > 1
        );

        const video = videoRef.current;

        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => undefined);
          if (!cancelled) setReady(true);
        }
      } catch {
        setError(
          'Impossible d’ouvrir l’appareil photo. Autorisez la caméra, puis réessayez.'
        );
      }
    };

    void start();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [open, facingMode, stopCamera]);

  /* La photo est découpée dans l'image affichée. L'aperçu de la caméra avant
     est en miroir : la photo l'est aussi, pour correspondre à ce que l'on
     vient de voir. */
  const capture = (): void => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    if (facingMode === 'user') {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setFlash(true);

    canvas.toBlob(
      (blob) => {
        setFlash(false);
        if (!blob) return;

        onCapture(
          new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' })
        );
      },
      'image/jpeg',
      0.92
    );
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[70] flex items-end justify-center xs:items-center xs:p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          role='presentation'
        >
          <div
            className='absolute inset-0 bg-black/40 dark:bg-[#5B7083]/40'
            aria-hidden='true'
          />

          <motion.div
            className='relative flex max-h-[88dvh] w-full max-w-md flex-col overflow-y-auto overscroll-contain
                       rounded-t-2xl border-t border-light-border bg-main-background p-5
                       pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl
                       dark:border-dark-border xs:max-h-[80vh] xs:rounded-md xs:border xs:pb-5'
            initial={{ y: 40, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            onClick={(event): void => event.stopPropagation()}
            role='dialog'
            aria-label='Se prendre en photo'
          >
            <span
              className='mx-auto mb-3 h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50 xs:hidden'
              aria-hidden='true'
            />

            <header className='mb-4 flex items-start justify-between gap-4'>
              <div className='flex flex-col'>
                <h2 className='text-base font-bold text-light-primary dark:text-dark-primary'>
                  Se prendre en photo
                </h2>
                <p className='mt-0.5 text-sm text-light-secondary dark:text-dark-secondary'>
                  Cadrez votre visage, puis appuyez sur le déclencheur.
                </p>
              </div>

              <button
                className='-mr-2 -mt-2 rounded-full p-2 text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10'
                type='button'
                onClick={onClose}
                aria-label='Fermer l’appareil photo'
              >
                <MaterialIcon className='h-5 w-5' iconName='close' />
              </button>
            </header>

            <div className='relative h-[46dvh] w-full overflow-hidden rounded-xl bg-black xs:h-72'>
              <video
                className={cn(
                  'h-full w-full object-cover',
                  facingMode === 'user' && 'scale-x-[-1]'
                )}
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />

              {/* Éclair blanc au moment de la prise. */}
              <span
                className={cn(
                  'pointer-events-none absolute inset-0 bg-white transition-opacity duration-200',
                  flash ? 'opacity-80' : 'opacity-0'
                )}
                aria-hidden='true'
              />

              {canFlip && ready && (
                <button
                  className='absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65'
                  type='button'
                  onClick={(): void =>
                    setFacingMode((mode) =>
                      mode === 'user' ? 'environment' : 'user'
                    )
                  }
                  aria-label='Changer de caméra'
                >
                  <MaterialIcon className='h-5 w-5' iconName='refresh' />
                </button>
              )}

              {!ready && !error && (
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-3'>
                  <span
                    className='h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white'
                    aria-hidden='true'
                  />
                  <p className='text-sm text-white/80'>
                    Ouverture de l’appareil photo…
                  </p>
                </div>
              )}

              {error && (
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center'>
                  <MaterialIcon
                    className='h-9 w-9 text-white/70'
                    iconName='photo_camera'
                  />
                  <p className='max-w-xs text-sm text-white/80'>{error}</p>
                </div>
              )}
            </div>

            <div className='mt-4 flex flex-col items-center gap-1'>
              <button
                className='flex h-16 w-16 items-center justify-center rounded-full bg-main-accent text-white ring-4
                           ring-main-accent/20 transition active:scale-95 disabled:opacity-40 disabled:ring-0'
                type='button'
                onClick={capture}
                disabled={!ready}
                aria-label='Prendre la photo'
              >
                <MaterialIcon className='h-7 w-7' iconName='photo_camera' />
              </button>
              <span className='text-xs text-light-secondary dark:text-dark-secondary'>
                Prendre la photo
              </span>
            </div>

            {onPickFile && (
              <button
                className='group mt-4 flex w-full items-center gap-3 rounded-2xl border border-light-border p-3
                           text-left transition hover:border-light-line-reply hover:bg-light-primary/[0.03]
                           dark:border-dark-border dark:hover:border-dark-line-reply dark:hover:bg-dark-primary/[0.04]'
                type='button'
                onClick={onPickFile}
              >
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-light-primary/[0.06] text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'>
                  <MaterialIcon className='h-5 w-5' iconName='upload' />
                </span>

                <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
                  <span className='truncate text-sm font-bold text-light-primary dark:text-dark-primary'>
                    Choisir une image de votre appareil
                  </span>
                  <span className='truncate text-xs text-light-secondary dark:text-dark-secondary'>
                    Une photo déjà présente sur votre appareil
                  </span>
                </span>

                <MaterialIcon
                  className='h-4 w-4 shrink-0 text-light-secondary transition group-hover:translate-x-0.5 dark:text-dark-secondary'
                  iconName='chevron_right'
                />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
