import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import {
  MAX_RECORD_SECONDS,
  blobToBase64,
  type EncodedVoiceNote
} from '@lib/audio/voice';
import {
  startVoiceCapture,
  unlockVoiceAudio,
  type VoiceCapture
} from '@lib/audio/recorder';
import { CustomIcon } from '@components/ui/custom-icon';
import { MaterialIcon } from '@components/ui/material-icon';

type VoiceRecorderProps = {
  /** Identifiant utilisé pour ranger le fichier dans le stockage. */
  userId: string;
  /** Le panneau est ouvert : l'enregistrement démarre. */
  active: boolean;
  /**
   * Flux micro déjà demandé dans le clic d'ouverture.
   *
   * Sur iOS/Safari, `getUserMedia` doit être lancé depuis le geste
   * utilisateur ; l'enregistreur ne le redemande donc pas dans un effet.
   */
  streamPromise?: Promise<MediaStream> | null;
  /** Le vocal est prêt ; l'appelant ferme le panneau. */
  onRecorded: (audioURL: string, duration: number) => void;
  /** Fermeture par la croix ou par un clic à l'extérieur. */
  onClose: () => void;
  className?: string;
};

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Enregistreur de message vocal de la barre de publication.
 *
 * Même matériel que la messagerie : capture PCM du micro, conversion en MP3 et
 * durée exacte. L'enregistrement démarre dès que le panneau est ouvert, se
 * ferme à la croix ou en cliquant à l'extérieur.
 */
export function VoiceRecorder({
  userId,
  active,
  streamPromise,
  onRecorded,
  onClose,
  className
}: VoiceRecorderProps): JSX.Element | null {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sending, setSending] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<VoiceCapture | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startedAtRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const closedRef = useRef(false);
  /* Numéro du démarrage courant : annule les démarrages obsolètes (StrictMode,
     fermeture pendant l'autorisation micro). */
  const runRef = useRef(0);

  const stopTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopStream = (): void => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  /* Ferme le panneau sans remonter le micro (croix ou clic dehors). */
  const close = (): void => {
    closedRef.current = true;
    runRef.current++;
    stopTimer();

    sessionRef.current?.cancel();
    sessionRef.current = null;

    stopStream();
    setRecording(false);
    onClose();
  };

  const upload = async (note: EncodedVoiceNote): Promise<void> => {
    setSending(true);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `voice-${Date.now()}.${note.extension}`,
          contentType: note.mimeType,
          base64Data: await blobToBase64(note.blob),
          userId
        })
      });

      if (!response.ok) throw new Error('upload-failed');

      const { url } = (await response.json()) as { url?: string };

      if (!url) throw new Error('upload-failed');

      setSending(false);
      onRecorded(url, Math.max(1, Math.round(note.duration || 1)));
    } catch {
      setSending(false);
      toast.error("Impossible d'enregistrer le message vocal.");
      close();
    }
  };

  /* Arrête la capture. Un enregistrement annulé n'est ni envoyé ni converti. */
  const finish = async (cancelled: boolean): Promise<void> => {
    const session = sessionRef.current;

    if (!session) return;

    runRef.current++;
    sessionRef.current = null;
    stopTimer();

    if (cancelled) {
      session.cancel();
      stopStream();
      setRecording(false);
      return;
    }

    const note = await session.stop();

    stopStream();
    setRecording(false);

    if (closedRef.current) return;

    if (!note) {
      toast.error("L'enregistrement est vide : aucun message envoyé.");
      close();
      return;
    }

    await upload(note);
  };

  useEffect(() => {
    if (!active) return;

    /* Un clic à l'extérieur du panneau annule l'enregistrement. */
    const handleClickOutside = (event: MouseEvent): void => {
      if (panelRef.current?.contains(event.target as Node)) return;

      close();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(
    () => () => {
      /* Quitter le composant interrompt l'enregistrement en cours. */
      closedRef.current = true;
      runRef.current++;
      stopTimer();
      sessionRef.current?.cancel();
      sessionRef.current = null;
      stopStream();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* L'ouverture du panneau lance directement l'enregistrement. */
  useEffect(() => {
    if (!active || recording || sending) return;

    closedRef.current = false;

    const start = async (): Promise<void> => {
      const run = ++runRef.current;

      if (!streamPromise && !navigator.mediaDevices?.getUserMedia) {
        toast.error(
          'Les messages vocaux ne sont pas pris en charge par ce navigateur.'
        );
        close();
        return;
      }

      try {
        /* Débloque l'audio dans le geste utilisateur (iOS/Safari). */
        unlockVoiceAudio();

        const stream = streamPromise
          ? await streamPromise
          : await navigator.mediaDevices.getUserMedia({ audio: true });

        if (closedRef.current || runRef.current !== run) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        const session = await startVoiceCapture(stream);

        if (closedRef.current || runRef.current !== run) {
          session.cancel();
          stream.getTracks().forEach((track) => track.stop());
          if (streamRef.current === stream) streamRef.current = null;
          return;
        }

        sessionRef.current = session;
        startedAtRef.current = Date.now();
        setSeconds(0);
        setRecording(true);

        timerRef.current = setInterval(() => {
          const elapsed = Math.round(
            (Date.now() - startedAtRef.current) / 1000
          );

          setSeconds(elapsed);

          if (elapsed >= MAX_RECORD_SECONDS) {
            stopTimer();
            void finish(false);
          }
        }, 250);
      } catch {
        toast.error("Impossible d'accéder au microphone.");
        close();
      }
    };

    void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const stop = (cancelled: boolean): void => {
    void finish(cancelled);
  };

  if (!active) return null;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        /* Compact sur mobile : la barre reste dans la largeur de l'écran et ne
           provoque aucun défilement horizontal. */
        'flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-2xl',
        'bg-main-search-background px-3 py-2 xs:gap-3 xs:rounded-3xl xs:px-4',
        className
      )}
      initial={{ opacity: 0, y: 8 }}
      ref={panelRef}
    >
      {sending ? (
        <>
          <CustomIcon
            className='h-5 w-5 text-main-accent'
            iconName='SpinnerIcon'
          />
          <span className='text-sm text-light-secondary dark:text-dark-secondary'>
            Envoi du message vocal…
          </span>
        </>
      ) : (
        <>
          <span className='h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#e5484d]' />
          <span className='text-sm font-semibold tabular-nums text-light-primary dark:text-dark-primary'>
            {formatTime(seconds)}
          </span>
          <span className='min-w-0 flex-1 truncate text-right text-xs text-light-secondary dark:text-dark-secondary'>
            Enregistrement…
          </span>
          <button
            aria-label='Annuler le message vocal'
            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:text-dark-secondary dark:hover:bg-white/5'
            onClick={close}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </button>
          <button
            aria-label='Envoyer le message vocal'
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95'
            onClick={() => stop(false)}
            type='button'
          >
            <MaterialIcon className='h-4 w-4' iconName='send' solid />
          </button>
        </>
      )}
    </motion.div>
  );
}
