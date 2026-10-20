import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { MaterialIcon } from '@components/ui/material-icon';

type AudioPlayerProps = {
  src: string;
  /** Durée en secondes, si elle est connue à l'avance. */
  duration?: number | null;
  /** Le message est-il envoyé par la personne qui regarde ? */
  mine?: boolean;
};

/** Types MIME audio par extension, pour savoir si l'appareil sait les lire. */
const AUDIO_MIME_BY_EXTENSION: Record<string, string> = {
  webm: 'audio/webm;codecs=opus',
  m4a: 'audio/mp4',
  ogg: 'audio/ogg;codecs=opus',
  opus: 'audio/ogg;codecs=opus',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  aac: 'audio/aac'
};

/* Décorative waveform used both for the button icon and the audio player. */
const WAVE_BARS = [10, 18, 13, 22, 9, 16, 20, 12, 15, 11, 17, 8];

export function formatAudioTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/** Icône d'onde audio, utilisée comme bouton d'enregistrement. */
export function AudioWaveIcon({
  className
}: {
  className?: string;
}): JSX.Element {
  return (
    <svg
      aria-hidden='true'
      className={cn('h-5 w-5', className)}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
    >
      <path d='M3.5 10v4' />
      <path d='M7.75 7.5v9' />
      <path d='M12 4.5v15' />
      <path d='M16.25 7.5v9' />
      <path d='M20.5 10v4' />
    </svg>
  );
}

/**
 * Lecteur de message vocal.
 *
 * Partagé par la messagerie et les publications : même rendu, même gestion
 * des formats illisibles. Quand l'appareil ne sait pas décoder le fichier, on
 * propose de l'ouvrir plutôt que d'afficher une erreur incompréhensible.
 */
export function AudioPlayer({
  src,
  duration,
  mine = false
}: AudioPlayerProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration ?? 0);
  /* Format non lu par cet appareil, ou lecture qui a échoué : on propose alors
     d'ouvrir le fichier au lieu d'une erreur incompréhensible. */
  const [unsupported, setUnsupported] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const extension = src.split('?', 1)[0].split('.').pop()?.toLowerCase();
    const mime = extension ? AUDIO_MIME_BY_EXTENSION[extension] : undefined;

    if (!mime || typeof document === 'undefined') return;

    /* Safari ne lit pas le webm/opus enregistré par Chrome/Android : on le
       détecte avant même d'essayer de lancer la lecture. */
    const probe = document.createElement('audio');

    if (probe.canPlayType(mime) === '') setUnsupported(true);
  }, [src]);

  const progress =
    totalDuration > 0 ? Math.min(currentTime / totalDuration, 1) : 0;
  const playedBars = Math.round(progress * WAVE_BARS.length);

  const togglePlay = (): void => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused)
      void audio.play().catch(() => {
        setFailed(true);
        toast.error('Ce message vocal ne peut pas être lu sur cet appareil.');
      });
    else audio.pause();
  };

  if (unsupported || failed)
    return (
      <span className='flex items-center gap-2'>
        <MaterialIcon className='h-5 w-5' iconName='volume_up' />
        <span
          className={cn(
            'text-sm',
            mine
              ? 'text-white/90'
              : 'text-light-secondary dark:text-dark-secondary'
          )}
        >
          {failed
            ? 'Lecture impossible sur cet appareil.'
            : 'Format audio non pris en charge sur cet appareil.'}
        </span>
        <a
          className={cn(
            'text-sm font-semibold underline',
            mine ? 'text-white' : 'text-main-accent'
          )}
          href={src}
          rel='noreferrer'
          target='_blank'
        >
          Ouvrir
        </a>
      </span>
    );

  return (
    <div className='flex items-center gap-3'>
      <button
        aria-label={playing ? 'Mettre en pause' : 'Lire le message vocal'}
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition active:scale-95',
          mine
            ? 'hover:bg-white/35 bg-white/25 text-white'
            : 'bg-main-accent text-white hover:brightness-90'
        )}
        onClick={togglePlay}
        type='button'
      >
        <MaterialIcon
          className='h-4 w-4'
          iconName={playing ? 'pause' : 'play_arrow'}
          solid
        />
      </button>
      <span aria-hidden='true' className='flex h-8 items-center gap-[3px]'>
        {WAVE_BARS.map((height, index) => (
          <span
            className={cn(
              'w-[3px] rounded-full transition-colors',
              index < playedBars
                ? mine
                  ? 'bg-white'
                  : 'bg-main-accent'
                : mine
                ? 'bg-white/40'
                : 'bg-light-secondary/40 dark:bg-dark-secondary/40'
            )}
            key={index}
            style={{ height }}
          />
        ))}
      </span>
      <span
        className={cn(
          'min-w-[2.25rem] text-xs tabular-nums',
          mine
            ? 'text-white/90'
            : 'text-light-secondary dark:text-dark-secondary'
        )}
      >
        {formatAudioTime(
          playing || currentTime > 0
            ? totalDuration - currentTime
            : totalDuration
        )}
      </span>
      <audio
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => setFailed(true)}
        onLoadedMetadata={(event) => {
          const value = event.currentTarget.duration;

          if (Number.isFinite(value) && value > 0) setTotalDuration(value);
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        preload='metadata'
        ref={audioRef}
        src={src}
      />
    </div>
  );
}
