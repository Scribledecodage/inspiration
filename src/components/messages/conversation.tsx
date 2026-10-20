import { useEffect, useMemo, useRef, useState } from 'react';
import { orderBy, query } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import TextArea from 'react-textarea-autosize';
import { toast } from 'react-hot-toast';
import type { EncodedVoiceNote } from '@lib/audio/voice';
import {
  startVoiceCapture,
  unlockVoiceAudio,
  type VoiceCapture
} from '@lib/audio/recorder';
import { useCollection } from '@lib/hooks/useCollection';
import { conversationMessagesCollection } from '@lib/firebase/collections';
import {
  getChatId,
  getChatOwnerId,
  getConversationOwnerId,
  markConversationAsRead,
  sendGroupMessage,
  sendMessage,
  voteOnMessagePoll
} from '@lib/firebase/chat';
import Link from 'next/link';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import { Loading } from '@components/ui/loading';
import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { GifPickerModal } from '@components/modal/gif-picker-modal';
import { EmojiPicker } from '@components/ui/emoji-picker';
import { PollModal } from '@components/modal/poll-modal';
import { LocationModal } from '@components/modal/location-modal';
import { LocationMapModal } from '@components/modal/location-map-modal';
import { ScheduleModal } from '@components/modal/schedule-modal';
import { PollPreview } from '@components/input/poll-preview';
import { LocationPreview } from '@components/input/location-preview';
import { SchedulePreview } from '@components/input/schedule-preview';
import { LinkPreviewCard } from '@components/common/link-preview-card';
import { ComposerText } from '@components/common/composer-text';
import { LinkifiedText } from '@components/common/linkified-text';
import { findLink, fetchLinkPreview } from '@lib/link-preview';
import type { LinkPreviewData } from '@lib/link-preview';
import { MessagePoll } from './message-poll';
import { GroupAvatar } from './group-avatar';
import { ChannelAvatar } from '@components/channel/channel-avatar';
import { AiAvatar } from './ai-avatar';
import { AiMarkdown } from './ai-markdown';
import { AiMessageTools, hasAiActions } from './ai-message-tools';
import {
  aiBotUser,
  appendAiMessage,
  ensureAiConversation,
  AI_BOT_ID,
  AI_BOT_NAME
} from '@lib/ai-bot';
import {
  rewriteWithAi,
  streamChatWithAi,
  translateWithAi,
  withAiDefaults
} from '@lib/ai';
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import type {
  ChatMessage,
  Conversation as ConversationData
} from '@lib/types/message';
import type { ImagesPreview } from '@lib/types/file';
import type { User } from '@lib/types/user';
import type { TweetPoll } from '@lib/types/tweet';
import type { IconName } from '@components/ui/material-icon';

const MAX_RECORD_SECONDS = 120;

/** Taille maximale d'une image jointe dans un message. */
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

/* Le menu d'options reprend les mêmes entrées que la barre de publication. */
const ATTACH_OPTIONS: readonly {
  name: string;
  iconName: IconName;
}[] = [
  { name: 'Media', iconName: 'image' },
  { name: 'GIF', iconName: 'gif_box' },
  { name: 'Sondage', iconName: 'bar_chart' },
  { name: 'Emoji', iconName: 'mood' },
  { name: 'Schedule', iconName: 'calendar_month' },
  { name: 'Location', iconName: 'location_on' }
];

/* Les entrées d'assistance n'apparaissent que si la personne a laissé
   l'intelligence artificielle active. */
const AI_ATTACH_OPTIONS: readonly {
  name: string;
  iconName: IconName;
}[] = [
  { name: 'Traduire', iconName: 'translate' },
  { name: 'Réécrire', iconName: 'auto_awesome_mosaic' }
];

/* Questions proposées à l'ouverture d'une conversation avec l'assistant. */
const AI_SUGGESTIONS: readonly string[] = [
  'Aide-moi à écrire une publication',
  'Améliore ce texte',
  'Traduis ce message en anglais'
];

/* Le menu se déplie au-dessus de la barre de saisie : la hauteur s'anime pour
   « soulever » la barre, comme dans Google Messages. */ const attachMenuAnimation =
  {
    initial: { height: 0, opacity: 0 },
    animate: {
      height: 'auto',
      opacity: 1,
      transition: { type: 'spring' as const, damping: 30, stiffness: 300 }
    },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } }
  };

/** Decorative waveform used both for the button icon and the audio player. */
const WAVE_BARS = [10, 18, 13, 22, 9, 16, 20, 12, 15, 11, 17, 8];

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function AudioWaveIcon({ className }: { className?: string }): JSX.Element {
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

type AudioMessageProps = {
  src: string;
  duration: number | null;
  mine: boolean;
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

function AudioMessage({ src, duration, mine }: AudioMessageProps): JSX.Element {
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

  if (unsupported || failed) {
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
  }

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
        {formatTime(
          playing || currentTime > 0
            ? totalDuration - currentTime
            : totalDuration
        )}
      </span>
      <audio
        ref={audioRef}
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
        src={src}
      />
    </div>
  );
}

type ConversationProps = {
  user: User;
  contact?: User;
  group?: ConversationData;
  /** Membres du groupe (hors vous-même), pour les avatars et les noms. */
  members?: User[];
  onBack: () => void;
  /** Affichage en page autonome (ex. chaîne) : flèche de retour toujours visible. */
  standalone?: boolean;
};

export function Conversation({
  user,
  contact,
  group,
  members = [],
  onBack,
  standalone = false
}: ConversationProps): JSX.Element {
  const isGroup = Boolean(group);
  /* Dans une chaîne, seul l'auteur peut publier : les autres sont en lecture
     seule. Pour les groupes et les conversations privées, tout le monde écrit. */
  const canPost =
    !group || group.type !== 'channel' || group.createdBy === user.id;
  const directId = contact?.id ?? '';

  /* Conversation avec l'assistant : elle est rangée dans la boîte de la
     personne qui l'utilise, donc les messages sont toujours chez elle. */
  const isAi = group?.type === 'ai';

  const chatId = group ? group.id : getChatId(user.id, directId);
  const chatOwnerId = group
    ? isAi
      ? user.id
      : getConversationOwnerId(group.participants)
    : getChatOwnerId(user.id, directId);

  /* Réglages d'intelligence artificielle de la personne. */
  const aiSettings = useMemo(
    () => withAiDefaults(user.aiSettings),
    [user.aiSettings]
  );
  const aiEnabled = aiSettings.enabled;

  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members]
  );

  const { data: messages, loading } = useCollection<ChatMessage>(
    query(
      conversationMessagesCollection(chatOwnerId, chatId),
      orderBy('createdAt', 'asc')
    ),
    { allowNull: true }
  );

  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  /* Messages en cours d'envoi : leur bulle s'affiche tout de suite, tout en
     bas de la conversation, sans attendre la réponse du serveur. */
  const [pendingMessages, setPendingMessages] = useState<ChatMessage[]>([]);
  /* Réponse de l'assistant en cours de rédaction : le texte arrive morceau
     par morceau, il s'affiche donc au fur et à mesure. */
  const [aiStream, setAiStream] = useState<{
    id: string;
    text: string;
    createdAt: number;
  } | null>(null);

  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [voiceBusy, setVoiceBusy] = useState(false);

  /* Menu d'options : il se soulève au-dessus de la barre de saisie et se
     referme dès qu'on écrit ou qu'on clique ailleurs. */
  const [attachOpen, setAttachOpen] = useState(false);
  const [gifOpen, setGifOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  /* Curseur du message en cours : il est repris en aperçu dans le sélecteur
     d'emoji. */
  const [emojiCaret, setEmojiCaret] = useState(0);
  /* Image jointe, en attente d'envoi : l'aperçu vit au-dessus de la barre. */
  const [attachedImage, setAttachedImage] = useState<{
    url: string;
    src: string;
  } | null>(null);
  const [imageBusy, setImageBusy] = useState(false);
  /* Aperçu du lien collé dans la zone de texte : il se met à jour à la
     frappe et disparaît dès que le lien est effacé. */
  const [linkPreview, setLinkPreview] = useState<LinkPreviewData | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  /* Sondage, lieu et programmation : mêmes objets que pour une publication. */
  const [poll, setPoll] = useState<TweetPoll | null>(null);
  const [pollOpen, setPollOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [messageLocation, setMessageLocation] = useState<string | null>(null);
  /* Lieu affiché sur la carte : il ne s'agit pas forcément du message courant. */
  const [mapLocation, setMapLocation] = useState<string | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  /* Date d'envoi choisie : le message attend qu'elle soit atteinte. */
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  const sessionRef = useRef<VoiceCapture | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startingRef = useRef(false);
  const startedAtRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = (): void => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  };

  useEffect(() => {
    // New conversation opened: jump straight to the latest message.
    isAtBottomRef.current = true;
    scrollToBottom();
  }, [chatId]);

  useEffect(() => {
    if (isAtBottomRef.current) scrollToBottom();
  }, [messages?.length, pendingMessages.length, aiStream?.text.length]);

  /* Tant que la conversation est ouverte, les nouveaux messages sont lus :
     on repousse la marque de lecture pour que le badge reste éteint, y
     compris après être revenu dans une autre section. */
  useEffect(() => {
    if (!messages?.length) return;

    void markConversationAsRead(user.id, chatId);
  }, [messages?.length, user.id, chatId]);

  /* La conversation avec l'assistant est créée à la première ouverture : elle
     n'existe pas tant que la personne ne l'a jamais utilisée. */
  useEffect(() => {
    if (!isAi) return;

    void ensureAiConversation(user.id).catch(() => undefined);
  }, [isAi, user.id]);

  /* Les messages en cours d'envoi s'ajoutent à la suite de la conversation :
     ils occupent donc le bas de la liste pendant l'envoi. */
  const visibleMessages = useMemo(() => {
    const list = [...(messages ?? []), ...pendingMessages];

    /* La réponse de l'assistant, encore en cours, est affichée comme un
       message ordinaire : elle s'écrit sous les yeux de la personne. */
    if (aiStream)
      list.push({
        id: aiStream.id,
        text: aiStream.text,
        audioURL: null,
        audioDuration: null,
        imageURL: null,
        poll: null,
        pollVotes: null,
        location: null,
        linkPreview: null,
        createdBy: AI_BOT_ID,
        createdAt: aiStream.createdAt,
        fromAI: true
      });

    return list;
  }, [messages, pendingMessages, aiStream]);

  /* La bulle d'un message en cours d'envoi s'efface dès que le vrai message
     est arrivé, pour qu'il ne disparaisse jamais entre les deux. Un envoi
     resté sans réponse est oublié au bout de vingt secondes, afin de ne pas
     laisser une bulle bloquée à l'écran. */
  useEffect(() => {
    if (!pendingMessages.length) return;

    const confirmed = [...(messages ?? [])];

    setPendingMessages((current) => {
      const remaining = current.filter((pending) => {
        if (Date.now() - pending.createdAt > 20000) return false;

        const index = confirmed.findIndex(
          (message) =>
            message.createdBy === pending.createdBy &&
            message.text === pending.text &&
            Math.abs(message.createdAt - pending.createdAt) < 30000
        );

        if (index === -1) return true;

        confirmed.splice(index, 1);
        return false;
      });

      return remaining.length === current.length ? current : remaining;
    });
  }, [messages, pendingMessages]);

  const stopRecordTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  /* À chaque frappe, on cherche un lien : l'aperçu est demandé une seule fois
     par lien, et disparaît dès que le lien disparaît du texte. */
  const handleTextChange = (value: string): void => {
    setText(value);

    const link = findLink(value);

    if (!link) {
      previewUrlRef.current = null;
      setLinkPreview(null);
      return;
    }

    if (link === previewUrlRef.current) return;

    previewUrlRef.current = link;
    setLinkPreview(null);

    void fetchLinkPreview(link).then((data) => {
      /* Le lien a pu changer entre-temps : on n'affiche plus rien. */
      if (previewUrlRef.current !== link) return;

      setLinkPreview(data);
    });
  };

  /* Le menu se referme si on clique dehors, et dès qu'on revient dans la barre
     de texte : la frappe doit rester au premier plan. */
  useEffect(() => {
    if (!attachOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;

      if (
        target?.closest('[data-attach-menu]') ||
        target?.closest('[data-attach-toggle]')
      )
        return;

      setAttachOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [attachOpen]);

  /* Envoyer une image passe par la même API que les messages vocaux. */
  const uploadImage = async (blob: Blob, fileName: string): Promise<string> => {
    const base64Data = await blobToBase64(blob);

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName,
        contentType: blob.type || 'image/jpeg',
        base64Data,
        userId: user.id
      })
    });

    if (!response.ok) throw new Error('upload-failed');

    const { url } = (await response.json()) as { url?: string };
    if (!url) throw new Error('upload-failed');

    return url;
  };

  const attachImage = async (blob: Blob, fileName: string): Promise<void> => {
    setImageBusy(true);

    const preview =
      typeof window !== 'undefined' && typeof URL.createObjectURL === 'function'
        ? URL.createObjectURL(blob)
        : null;

    try {
      const url = await uploadImage(blob, fileName);

      setAttachedImage({ url, src: preview ?? url });
      setAttachOpen(false);
    } catch {
      if (preview) URL.revokeObjectURL(preview);
      toast.error("Impossible d'ajouter cette image.");
    } finally {
      setImageBusy(false);
    }
  };

  const handleImageSelect = (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return Promise.resolve();

    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Image trop lourde : 8 Mo maximum.');
      return Promise.resolve();
    }

    return attachImage(file, file.name || `image-${Date.now()}.jpg`);
  };

  const handleImagePaste = (
    event: ClipboardEvent<HTMLTextAreaElement>
  ): void => {
    const file = Array.from(event.clipboardData.files).find((item) =>
      item.type.startsWith('image/')
    );

    if (!file) return;

    event.preventDefault();

    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Image trop lourde : 8 Mo maximum.');
      return;
    }

    void attachImage(file, file.name || `image-${Date.now()}.png`);
  };

  const removeAttachedImage = (): void => {
    setAttachedImage((current) => {
      if (current?.src.startsWith('blob:')) URL.revokeObjectURL(current.src);
      return null;
    });
  };

  const handleGifSelect = (gif: ImagesPreview[number]): void => {
    /* Le GIF arrive déjà sous forme d'adresse : on l'affiche directement,
       l'API d'upload n'est pas nécessaire pour lui. */
    setAttachedImage({ url: gif.src, src: gif.src });
    setGifOpen(false);
    setAttachOpen(false);
  };

  const handleEmojiSelect = (emoji: string): void => {
    /* Le sélecteur reste ouvert : on peut enchaîner plusieurs emojis.
       Il se ferme au clic dehors ou avec la croix. L'emoji est inséré à
       l'endroit du curseur, pas à la fin du message. */
    const area = textAreaRef.current;

    if (!area) {
      setText((current) => current + emoji);
      return;
    }

    const start = area.selectionStart ?? area.value.length;
    const end = area.selectionEnd ?? start;

    setText((current) => current.slice(0, start) + emoji + current.slice(end));

    /* Le curseur avance : l'aperçu du sélecteur suit. */
    setEmojiCaret(start + emoji.length);

    requestAnimationFrame((): void => {
      area.focus();

      const position = start + emoji.length;
      area.setSelectionRange(position, position);
    });
  };

  const stopStream = (): void => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(
    () => () => {
      // Leaving the conversation stops any ongoing recording.
      stopRecordTimer();
      sessionRef.current?.cancel();
      sessionRef.current = null;
      stopStream();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        resolve(result.replace(/^data:[^;]+;base64,/, ''));
      };
      reader.onerror = () => reject(new Error('read-error'));
      reader.readAsDataURL(blob);
    });

  const sendVoiceMessage = async (note: EncodedVoiceNote): Promise<void> => {
    setVoiceBusy(true);

    try {
      /* Jamais de durée nulle : elle ferait afficher « 0 s » au destinataire
         alors que le son est parfaitement audible. */
      const audioDuration = Math.max(1, Math.round(note.duration || 1));

      const base64Data = await blobToBase64(note.blob);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `voice-${Date.now()}.${note.extension}`,
          contentType: note.mimeType,
          base64Data,
          userId: user.id
        })
      });

      if (!response.ok) throw new Error('upload-failed');

      const { url } = (await response.json()) as { url?: string };
      if (!url) throw new Error('upload-failed');

      if (group)
        await sendGroupMessage({
          senderId: user.id,
          conversation: group,
          audioURL: url,
          audioDuration
        });
      else
        await sendMessage({
          senderId: user.id,
          recipientId: directId,
          audioURL: url,
          audioDuration
        });
    } catch {
      toast.error("Impossible d'envoyer le message vocal.");
    } finally {
      setVoiceBusy(false);
    }
  };

  const startRecording = async (): Promise<void> => {
    if (voiceBusy || startingRef.current || sessionRef.current) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error(
        'Les messages vocaux ne sont pas pris en charge par ce navigateur.'
      );
      return;
    }

    startingRef.current = true;

    try {
      /* Débloque l'audio dans le geste utilisateur (iOS/Safari). */
      unlockVoiceAudio();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const session = await startVoiceCapture(stream);
      sessionRef.current = session;

      startedAtRef.current = Date.now();
      setRecordSeconds(0);
      setRecording(true);

      timerRef.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - startedAtRef.current) / 1000);
        setRecordSeconds(elapsed);
        if (elapsed >= MAX_RECORD_SECONDS) stopRecording(false);
      }, 250);
    } catch {
      sessionRef.current?.cancel();
      sessionRef.current = null;
      stopStream();
      setRecording(false);
      toast.error("Impossible d'accéder au microphone.");
    } finally {
      startingRef.current = false;
    }
  };

  /* Arrête la capture. Un enregistrement annulé n'est ni envoyé ni converti. */
  const finishRecording = async (cancelled: boolean): Promise<void> => {
    const session = sessionRef.current;

    if (!session) return;

    sessionRef.current = null;
    stopRecordTimer();

    if (cancelled) {
      session.cancel();
      stopStream();
      setRecording(false);
      return;
    }

    const note = await session.stop();

    stopStream();
    setRecording(false);

    if (!note) {
      toast.error("L'enregistrement est vide : aucun message envoyé.");
      return;
    }

    await sendVoiceMessage(note);
  };

  const stopRecording = (cancelled: boolean): void => {
    void finishRecording(cancelled);
  };

  const sendCurrent = async (payload: {
    text: string | null;
    imageURL: string | null;
    poll: TweetPoll | null;
    location: string | null;
  }): Promise<void> => {
    if (group)
      await sendGroupMessage({
        senderId: user.id,
        conversation: group,
        ...payload
      });
    else
      await sendMessage({
        senderId: user.id,
        recipientId: directId,
        ...payload
      });
  };

  const clearComposer = (): void => {
    setText('');
    setPoll(null);
    setMessageLocation(null);
    setScheduledDate(null);
    setLinkPreview(null);
    previewUrlRef.current = null;
    removeAttachedImage();
  };

  /* Demande une réponse à l'assistant et l'écrit dans la conversation.
     La réponse arrive en flux : elle s'affiche au fur et à mesure, puis elle
     est enregistrée une fois terminée. */
  const askAssistant = async (question: string): Promise<void> => {
    const history = [...(messages ?? [])]
      .filter((message) => message.text?.trim())
      .slice(-12)
      .map((message): { role: 'user' | 'assistant'; content: string } => ({
        role: message.fromAI ? 'assistant' : 'user',
        content: (message.text as string).trim()
      }));

    const stream = {
      id: `pending-ai-${Date.now()}`,
      text: '',
      createdAt: Date.now()
    };

    setAiStream(stream);
    isAtBottomRef.current = true;

    try {
      const reply = await streamChatWithAi(
        [...history, { role: 'user', content: question }],
        aiSettings,
        (partial) => {
          setAiStream({ ...stream, text: partial });
          scrollToBottom();
        }
      );

      setAiStream(null);

      if (reply.trim()) await appendAiMessage(user.id, reply.trim());
    } catch (error) {
      setAiStream(null);

      toast.error(
        (error as Error)?.message ??
          'L’assistant n’a pas pu répondre. Vérifiez vos réglages.'
      );
    }
  };

  /* Traduit le brouillon : la traduction remplace le texte tapé. */
  const handleTranslateDraft = async (): Promise<void> => {
    const value = text.trim();

    if (!value) {
      toast.error('Écrivez d’abord votre message.');
      return;
    }

    try {
      setText(await translateWithAi(value, aiSettings));
    } catch (error) {
      toast.error(
        (error as Error)?.message ?? 'Impossible de traduire le message.'
      );
    }
  };

  /* Réécrit le brouillon pour le rendre plus clair et plus court. */
  const handleRewriteDraft = async (): Promise<void> => {
    const value = text.trim();

    if (!value) {
      toast.error('Écrivez d’abord votre message.');
      return;
    }

    try {
      setText(await rewriteWithAi(value, aiSettings));
    } catch (error) {
      toast.error(
        (error as Error)?.message ?? 'Impossible de reformuler le message.'
      );
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const value = text.trim();
    const image = attachedImage;

    /* Un message peut ne porter qu'une image, un sondage ou un lieu : le
       texte reste facultatif. */
    if ((!value && !image && !poll && !messageLocation) || sending || imageBusy)
      return;

    const payload = {
      text: value || null,
      imageURL: image?.url ?? null,
      poll,
      location: messageLocation,
      linkPreview
    };

    /* Envoi programmé : le message part quand l'heure choisie est atteinte,
       à condition que la conversation reste ouverte. */
    if (scheduledDate) {
      const delay = scheduledDate.getTime() - Date.now();

      if (delay > 0) {
        clearComposer();
        toast.success(
          `Message programmé pour ${scheduledDate.toLocaleString('fr-FR')}`
        );

        setTimeout(() => {
          void sendCurrent(payload).catch(() =>
            toast.error("Impossible d'envoyer le message programmé.")
          );
        }, delay);

        return;
      }
    }

    /* La bulle apparaît tout de suite en bas de la conversation : on n'attend
       pas la réponse du serveur pour la voir. Elle sera remplacée par le vrai
       message dès son arrivée. */
    const pending: ChatMessage = {
      id: `pending-${Date.now()}`,
      text: payload.text,
      audioURL: null,
      audioDuration: null,
      imageURL: payload.imageURL,
      poll: payload.poll,
      pollVotes: null,
      location: payload.location,
      linkPreview: payload.linkPreview,
      createdBy: user.id,
      createdAt: Date.now()
    };

    clearComposer();
    setPendingMessages((current) => [...current, pending]);
    isAtBottomRef.current = true;
    setSending(true);

    try {
      await sendCurrent(payload);

      /* L'assistant répond après chaque message : sa réponse arrive dans la
         conversation comme un message de plus. */
      if (isAi && aiSettings.assistantEnabled && value)
        void askAssistant(value);
    } catch {
      toast.error("Impossible d'envoyer le message.");
      /* Le message retourne dans la zone de saisie : il n'est pas perdu. */
      setText((current) => current || value);
      if (image) setAttachedImage(image);
      setPoll(poll);
      setMessageLocation(messageLocation);
      setPendingMessages((current) =>
        current.filter(({ id }) => id !== pending.id)
      );
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        'z-40 flex flex-col bg-main-background',
        /* En page autonome (chaîne), la conversation reste dans le flux de la
           page : elle ne recouvre plus l'en-tête, qui porte le titre, la
           description et la flèche de retour. Sur téléphone, la conversation
           occupait tout l'écran (`fixed inset-0`) et cet en-tête
           disparaissait complètement. */
        standalone
          ? 'relative min-h-0 flex-1'
          : cn(
              'fixed inset-0',
              'md:sticky md:top-[57px] md:z-auto md:h-[calc(100dvh-57px)] md:min-w-0 md:flex-1 md:self-start md:border-l md:border-light-border md:dark:border-dark-border'
            )
      )}
      data-no-section-swipe
    >
      {/* Les sélecteurs réutilisent exactement les modales de la barre de
          publication (GIF, emoji). */}
      <GifPickerModal
        open={gifOpen}
        closeModal={() => setGifOpen(false)}
        onSelect={handleGifSelect}
      />
      <EmojiPicker
        caret={emojiCaret}
        open={emojiOpen}
        closeModal={(): void => setEmojiOpen(false)}
        onSelect={handleEmojiSelect}
        value={text}
      />
      <PollModal
        open={pollOpen}
        poll={poll}
        closeModal={() => setPollOpen(false)}
        onApply={(value) => {
          setPoll(value);
          setPollOpen(false);
        }}
      />
      <LocationModal
        open={locationOpen}
        closeModal={() => setLocationOpen(false)}
        onSelect={(value) => {
          setMessageLocation(value);
          setLocationOpen(false);
        }}
        current={messageLocation}
        onClear={() => setMessageLocation(null)}
      />
      <ScheduleModal
        open={scheduleOpen}
        closeModal={() => setScheduleOpen(false)}
        onSchedule={(date) => {
          setScheduledDate(date);
          setScheduleOpen(false);
        }}
      />
      {/* En page autonome (chaîne), l'en-tête de la page porte déjà l'icône,
          le titre et la flèche de retour : on ne le répète pas ici. */}
      {!standalone && (
        <div className='glass-header flex items-center gap-3 border-b border-light-border px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] dark:border-dark-border md:pt-3'>
          <button
            aria-label='Retour à la boîte de réception'
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-primary transition hover:bg-light-primary/10 active:bg-light-primary/20 dark:text-dark-primary dark:hover:bg-dark-primary/10'
            onClick={onBack}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
          </button>
          {isAi ? (
            <>
              <AiAvatar className='!self-center' size={40} />
              <div className='min-w-0'>
                <p className='truncate text-[15px] font-bold text-light-primary dark:text-dark-primary'>
                  {AI_BOT_NAME}
                </p>
                <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
                  {group?.description ?? 'Posez votre question.'}
                </p>
              </div>
              {/* Sur téléphone, la conversation recouvre la liste : le bouton
                  « retour » doit être franc pour qu'on puisse revenir
                  choisir une autre conversation. */}
              <button
                className='ml-auto shrink-0 rounded-full border border-light-border px-3 py-1.5 text-sm font-semibold text-light-primary transition hover:bg-light-primary/5 dark:border-dark-border dark:text-dark-primary dark:hover:bg-dark-primary/5 md:hidden'
                onClick={onBack}
                type='button'
              >
                Conversations
              </button>
            </>
          ) : !isGroup && contact?.username ? (
            <Link href={`/user/${contact.username}`}>
              <a className='flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80'>
                <UserAvatar
                  alt={contact?.name ?? ''}
                  className='!self-center'
                  frame={contact?.avatarFrame}
                  gender={contact?.gender}
                  shape={contact?.avatarShape}
                  size={40}
                  src={contact?.photoURL ?? ''}
                />
                <div className='min-w-0'>
                  <UserName
                    className='text-[15px]'
                    name={contact?.name ?? ''}
                    verified={contact?.verified ?? false}
                  />
                  <UserUsername
                    disableLink
                    className='text-sm'
                    username={contact?.username ?? ''}
                  />
                </div>
              </a>
            </Link>
          ) : (
            <>
              {isGroup ? (
                group?.type === 'channel' ? (
                  /* La chaîne garde la taille de son vignette dans « Découvrir »
                     (48 px) : l'icône reste au même endroit quand on ouvre la
                     chaîne, sur téléphone comme sur ordinateur. */
                  <ChannelAvatar
                    className='!self-center'
                    name={group?.name ?? 'Chaîne'}
                    photoURL={group?.photoURL}
                    shape={group?.avatarShape}
                    size={48}
                  />
                ) : (
                  <GroupAvatar
                    className='!self-center'
                    members={members}
                    photoURL={group?.photoURL}
                    size={40}
                  />
                )
              ) : (
                <UserAvatar
                  alt={contact?.name ?? ''}
                  className='!self-center'
                  frame={contact?.avatarFrame}
                  gender={contact?.gender}
                  shape={contact?.avatarShape}
                  size={40}
                  src={contact?.photoURL ?? ''}
                />
              )}
              <div className='min-w-0'>
                {isGroup ? (
                  <>
                    <p className='truncate text-[15px] font-bold text-light-primary dark:text-dark-primary'>
                      {group?.name || 'Groupe'}
                    </p>
                    <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
                      {group?.description ||
                        `${group?.participants.length ?? 0} membres`}
                    </p>
                  </>
                ) : (
                  <>
                    <UserName
                      className='text-[15px]'
                      name={contact?.name ?? ''}
                      verified={contact?.verified ?? false}
                    />
                    <UserUsername
                      disableLink
                      className='text-sm'
                      username={contact?.username ?? ''}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div
        className={cn(
          'overscroll-contain px-4 pt-6 pb-6',
          standalone
            ? 'min-h-0 flex-1 overflow-y-auto'
            : 'min-h-0 flex-1 overflow-y-auto'
        )}
        onScroll={(event) => {
          const list = event.currentTarget;
          isAtBottomRef.current =
            list.scrollHeight - list.scrollTop - list.clientHeight < 80;
        }}
        ref={listRef}
      >
        {loading && !messages ? (
          <Loading className='mt-8' />
        ) : !visibleMessages.length ? (
          <div className='flex h-full flex-col items-center justify-center gap-4 px-6 text-center'>
            <span className='flex w-full justify-center'>
              {isAi ? (
                <AiAvatar className='!self-center' size={72} />
              ) : isGroup ? (
                group?.type === 'channel' ? (
                  <ChannelAvatar
                    name={group?.name ?? 'Chaîne'}
                    photoURL={group?.photoURL}
                    shape={group?.avatarShape}
                    size={72}
                  />
                ) : (
                  <GroupAvatar
                    members={members}
                    photoURL={group?.photoURL}
                    size={72}
                  />
                )
              ) : (
                <UserAvatar
                  alt={contact?.name ?? ''}
                  frame={contact?.avatarFrame}
                  gender={contact?.gender}
                  shape={contact?.avatarShape}
                  size={72}
                  src={contact?.photoURL ?? ''}
                />
              )}
            </span>
            <p className='text-lg font-bold text-light-primary dark:text-dark-primary'>
              {isAi ? 'Posez votre question' : 'Commencez la discussion'}
            </p>
            <p className='max-w-xs text-sm leading-5 text-light-secondary dark:text-dark-secondary'>
              {isAi
                ? 'L’assistant répond dans la langue de votre choix. Demandez-lui une idée, une correction, une reformulation…'
                : isGroup
                ? 'Envoyez votre premier message dans ce groupe.'
                : `Envoyez votre premier message à @${
                    contact?.username ?? ''
                  }.`}
            </p>
            {isAi && (
              <div className='mt-2 flex max-w-sm flex-wrap justify-center gap-2'>
                {AI_SUGGESTIONS.map((suggestion) => (
                  <button
                    className='rounded-full border border-light-border px-3 py-1.5 text-xs font-semibold text-light-secondary transition hover:border-main-accent hover:text-main-accent dark:border-dark-border dark:text-dark-secondary'
                    key={suggestion}
                    onClick={() => {
                      setText(suggestion);
                      textAreaRef.current?.focus();
                    }}
                    type='button'
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col'>
            {visibleMessages.map((message, index) => {
              const mine = message.createdBy === user.id;
              /* Message qui vient d'être envoyé : sa bulle est déjà en bas de
                 la conversation, en attendant que le serveur confirme. */
              const isPending = message.id.startsWith('pending-');
              /* Dans un groupe, l'auteur d'un message reçu peut être n'importe
                 quel membre : on affiche alors son avatar et son nom. */
              const sender = mine
                ? user
                : message.fromAI
                ? aiBotUser
                : isGroup
                ? membersById.get(message.createdBy)
                : contact;
              const previous = visibleMessages[index - 1];
              const next = visibleMessages[index + 1];
              const isFirstOfGroup =
                !previous || previous.createdBy !== message.createdBy;
              const isLastOfGroup =
                !next || next.createdBy !== message.createdBy;

              /* Heure affichée sous la bulle. */
              const time = new Date(message.createdAt).toLocaleTimeString(
                'fr-FR',
                { hour: '2-digit', minute: '2-digit' }
              );

              /* Le message a-t-il des actions (traduire, copier) ? Si oui,
                 l'heure rejoint leur ligne : sinon les deux se chevauchent. */
              const aiRow = hasAiActions(message, aiSettings);

              return (
                <div
                  className={cn(
                    'flex w-full flex-col',
                    isFirstOfGroup ? 'mt-4 first:mt-0' : 'mt-0.5'
                  )}
                  key={message.id}
                >
                  <div
                    className={cn(
                      'flex w-full items-end gap-2',
                      mine ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {!mine && (
                      <span
                        className={cn(
                          'w-9 shrink-0',
                          !isLastOfGroup && 'invisible'
                        )}
                      >
                        {message.fromAI ? (
                          <AiAvatar size={36} />
                        ) : (
                          sender && (
                            <UserAvatar
                              alt={sender.name}
                              frame={sender.avatarFrame}
                              gender={sender.gender}
                              shape={sender.avatarShape}
                              size={36}
                              src={sender.photoURL}
                            />
                          )
                        )}
                      </span>
                    )}
                    {mine && isPending && (
                      <CustomIcon
                        className='mb-1.5 h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary'
                        iconName='SpinnerIcon'
                      />
                    )}
                    <div
                      className={cn(
                        'relative flex min-w-0 flex-col',
                        /* La réponse de l'assistant n'est pas dans une bulle :
                           elle est posée sur la page, comme un article. */
                        message.fromAI ? 'w-full' : 'max-w-[75%]',
                        mine ? 'items-end' : 'items-start'
                      )}
                    >
                      {isGroup && !mine && isFirstOfGroup && sender && (
                        <span className='mb-1 text-xs font-semibold text-light-secondary dark:text-dark-secondary'>
                          {sender.name}
                        </span>
                      )}
                      <div
                        className={cn(
                          'text-[15px] leading-[1.45]',
                          message.fromAI
                            ? /* Pas de bulle : le texte est posé directement
                                 sur la page, avec un simple liseré à gauche
                                 pour le détacher du message précédent. */
                              'break-words border-l-2 border-main-accent/30 pl-3 text-light-primary dark:text-dark-primary'
                            : cn(
                                'whitespace-pre-wrap break-words px-4 py-2.5',
                                'rounded-2xl transition-colors duration-150',
                                mine
                                  ? 'rounded-br-md bg-main-accent text-white'
                                  : 'rounded-bl-md bg-main-search-background text-light-primary dark:text-dark-primary'
                              ),
                          isPending && 'opacity-70'
                        )}
                        title={new Date(message.createdAt).toLocaleString(
                          'fr-FR'
                        )}
                      >
                        {message.audioURL ? (
                          <AudioMessage
                            duration={message.audioDuration}
                            mine={mine}
                            src={message.audioURL}
                          />
                        ) : (
                          message.imageURL && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              alt='Pièce jointe'
                              className='max-h-72 w-full max-w-[260px] rounded-xl object-cover'
                              loading='lazy'
                              src={message.imageURL}
                            />
                          )
                        )}
                        {message.imageURL && message.text && (
                          <span className='mt-1 block'>
                            <LinkifiedText mine={mine} text={message.text} />
                          </span>
                        )}
                        {!message.audioURL && !message.imageURL && (
                          /* Les réponses de l'assistant sont en Markdown :
                             les astérisques des mots en gras et les listes
                             sont rendues, pas laissées brutes. */
                          message.fromAI ? (
                            message.text ? (
                              <AiMarkdown text={message.text} />
                            ) : (
                              /* L'assistant rédige : trois points qui
                                 clignotent. */
                              <span className='flex items-center gap-1 py-1'>
                                {[0, 1, 2].map((index) => (
                                  <span
                                    className='h-1.5 w-1.5 animate-pulse rounded-full bg-light-secondary dark:bg-dark-secondary'
                                    key={index}
                                    style={{
                                      animationDelay: `${index * 160}ms`
                                    }}
                                  />
                                ))}
                              </span>
                            )
                          ) : (
                            <LinkifiedText
                              mine={mine}
                              text={message.text ?? ''}
                            />
                          )
                        )}
                        {message.poll && !isPending && (
                          <MessagePoll
                            currentUserId={user.id}
                            mine={mine}
                            onVote={async (choices) => {
                              try {
                                await voteOnMessagePoll({
                                  ownerId: chatOwnerId,
                                  chatId,
                                  messageId: message.id,
                                  userId: user.id,
                                  choices,
                                  voter: {
                                    name: user.name,
                                    username: user.username,
                                    photoURL: user.photoURL,
                                    gender: user.gender,
                                    avatarShape: user.avatarShape,
                                    avatarFrame: user.avatarFrame
                                  }
                                });
                              } catch {
                                toast.error(
                                  'Impossible d’enregistrer votre vote.'
                                );
                              }
                            }}
                            poll={message.poll}
                            votes={message.pollVotes ?? {}}
                          />
                        )}
                        {message.location && (
                          <>
                            {/* Le lieu ouvre la même carte que celle de
                              l'accueil, en panneau glissant sur mobile. */}
                            <button
                              className='mt-1 flex w-full max-w-full items-center gap-1 rounded-full bg-main-accent/10 px-2.5 py-1 text-sm font-bold text-main-accent transition hover:bg-main-accent/20'
                              onClick={(event) => {
                                event.stopPropagation();
                                setMapLocation(message.location ?? null);
                              }}
                              type='button'
                            >
                              <MaterialIcon
                                className='h-4 w-4 shrink-0'
                                iconName='location_on'
                              />
                              <span className='min-w-0 truncate'>
                                {message.location}
                              </span>
                            </button>
                            <LocationMapModal
                              closeModal={() => setMapLocation(null)}
                              location={mapLocation ?? ''}
                              open={mapLocation === message.location}
                            />
                          </>
                        )}
                      </div>
                      {/* L'heure est posée sous la bulle. Quand le message a
                          des actions (traduire, copier), elle rejoint leur
                          ligne : les deux se chevauchaient sinon. */}
                      {isLastOfGroup && !aiRow && (
                        <span
                          className={cn(
                            'absolute top-full mt-0.5 px-2 text-[11px] text-light-secondary dark:text-dark-secondary',
                            mine ? 'right-0 text-right' : 'left-0 text-left'
                          )}
                        >
                          {time}
                        </span>
                      )}
                    </div>
                    {mine && (
                      <span
                        className={cn(
                          'w-9 shrink-0',
                          !isLastOfGroup && 'invisible'
                        )}
                      >
                        <UserAvatar
                          alt={user.name}
                          frame={user.avatarFrame}
                          gender={user.gender}
                          shape={user.avatarShape}
                          size={36}
                          src={user.photoURL}
                        />
                      </span>
                    )}
                  </div>

                  {/* L'aperçu du lien est posé sous la bulle, sur toute la
                      largeur : à l'intérieur, il hériterait de la couleur de
                      la bulle et son texte deviendrait illisible. */}
                  {message.linkPreview && (
                    <LinkPreviewCard
                      className={cn('mt-1', mine ? 'self-end' : 'self-start')}
                      preview={message.linkPreview}
                    />
                  )}

                  {/* Heure et actions (traduire, copier) sur une seule ligne
                      sous la bulle. */}
                  {aiRow && (
                    <AiMessageTools
                      message={message}
                      mine={mine}
                      settings={aiSettings}
                      time={time}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {canPost ? (
        <div className='mt-auto border-t border-light-border px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] dark:border-dark-border md:px-4'>
          {recording || voiceBusy ? (
            <div className='flex items-center gap-3 rounded-3xl bg-main-search-background px-4 py-2'>
              {voiceBusy ? (
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
                    {formatTime(recordSeconds)}
                  </span>
                  <span className='flex-1 truncate text-right text-xs text-light-secondary dark:text-dark-secondary'>
                    Message vocal en cours…
                  </span>
                  <button
                    aria-label='Annuler le message vocal'
                    className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:text-dark-secondary dark:hover:bg-white/5'
                    onClick={() => stopRecording(true)}
                    type='button'
                  >
                    <MaterialIcon className='h-5 w-5' iconName='close' />
                  </button>
                  <button
                    aria-label='Envoyer le message vocal'
                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95'
                    onClick={() => stopRecording(false)}
                    type='button'
                  >
                    <MaterialIcon className='h-4 w-4' iconName='send' solid />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {/* Aperçus des options choisies, au-dessus de la barre de saisie. */}
              <AnimatePresence initial={false}>
                {poll && (
                  <PollPreview
                    poll={poll}
                    onEdit={() => setPollOpen(true)}
                    onRemove={() => setPoll(null)}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {messageLocation && (
                  <LocationPreview
                    location={messageLocation}
                    onEdit={() => setLocationOpen(true)}
                    onRemove={() => setMessageLocation(null)}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {scheduledDate && (
                  <SchedulePreview
                    date={scheduledDate}
                    onEdit={() => setScheduleOpen(true)}
                    onRemove={() => setScheduledDate(null)}
                  />
                )}
              </AnimatePresence>

              {/* Menu d'options : il se soulève juste au-dessus de la barre de
                saisie, comme dans Google Messages. Il se referme au clic
                dehors ou dès qu'on revient dans la zone de texte. */}
              <AnimatePresence initial={false}>
                {attachOpen && (
                  <motion.div
                    animate={attachMenuAnimation.animate}
                    className='overflow-hidden'
                    data-attach-menu
                    exit={attachMenuAnimation.exit}
                    initial={attachMenuAnimation.initial}
                  >
                    <div className='flex flex-wrap items-center gap-1 rounded-3xl bg-main-search-background px-2 py-2'>
                      {[
                        ...ATTACH_OPTIONS,
                        ...(aiEnabled ? AI_ATTACH_OPTIONS : [])
                      ].map(({ name, iconName }) => (
                        <button
                          aria-label={name}
                          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                                     text-main-accent transition
                                     hover:bg-main-accent/10 active:bg-main-accent/20
                                     disabled:opacity-40'
                          disabled={imageBusy}
                          key={name}
                          onClick={(event) => {
                            setAttachOpen(false);

                            if (name === 'Media')
                              attachInputRef.current?.click();
                            else if (name === 'GIF') setGifOpen(true);
                            else if (name === 'Traduire')
                              void handleTranslateDraft();
                            else if (name === 'Réécrire')
                              void handleRewriteDraft();
                            else if (name === 'Emoji') {
                              const area = textAreaRef.current;

                              setEmojiCaret(
                                area?.selectionStart ?? text.length
                              );
                              setEmojiOpen(true);
                            } else if (name === 'Sondage') setPollOpen(true);
                            else if (name === 'Schedule') setScheduleOpen(true);
                            else if (name === 'Location') setLocationOpen(true);
                          }}
                          title={name}
                          type='button'
                        >
                          <MaterialIcon
                            className='h-5 w-5'
                            iconName={iconName}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Aperçu du lien collé : il apparaît sous la frappe et disparaît dès que
                le lien est effacé. */}
              <AnimatePresence initial={false}>
                {linkPreview && <LinkPreviewCard preview={linkPreview} />}
              </AnimatePresence>

              {/* Aperçu de l'image jointe, au-dessus de la barre de saisie. */}
              <AnimatePresence initial={false}>
                {attachedImage && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='flex items-center gap-3 rounded-2xl bg-main-search-background p-2'
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                    initial={{ opacity: 0, y: 8 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt='Image jointe'
                      className='h-16 w-16 shrink-0 rounded-xl object-cover'
                      src={attachedImage.src}
                    />
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                        Image jointe
                      </p>
                      <p className='text-xs text-light-secondary dark:text-dark-secondary'>
                        Envoyée avec le prochain message.
                      </p>
                    </div>
                    <button
                      aria-label='Retirer l’image'
                      className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                               text-light-secondary transition
                               hover:bg-black/5 dark:text-dark-secondary dark:hover:bg-white/5'
                      onClick={removeAttachedImage}
                      title='Retirer l’image'
                      type='button'
                    >
                      <MaterialIcon className='h-5 w-5' iconName='close' />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className='relative flex items-center gap-2 rounded-3xl bg-main-search-background px-3 py-1.5 focus-within:ring-2 focus-within:ring-main-accent'>
                {/* Bouton « fichier » : il ouvre le menu d'options, qui soulève
                  la barre de saisie vers le haut. */}
                <button
                  aria-expanded={attachOpen}
                  aria-label='Ouvrir le menu des options'
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white',
                    'transition hover:brightness-90 active:scale-95',
                    attachOpen ? 'bg-main-accent/90' : 'bg-main-accent'
                  )}
                  data-attach-toggle
                  onClick={() => setAttachOpen((open) => !open)}
                  onMouseDown={(event) => event.stopPropagation()}
                  title='Options'
                  type='button'
                >
                  <MaterialIcon
                    className='h-4 w-4 text-white'
                    iconName='description'
                  />
                </button>
                <div className='relative min-w-0 flex-1 self-center'>
                  <TextArea
                    className='relative z-10 block w-full resize-none break-all bg-transparent
                             py-1.5 text-[15px] leading-[1.45]
                             text-transparent caret-light-primary outline-none
                             placeholder:text-transparent
                             dark:caret-dark-primary'
                    maxRows={5}
                    minRows={1}
                    onChange={(event) => handleTextChange(event.target.value)}
                    /* Revenir dans la barre de texte referme le menu. */
                    onFocus={() => setAttachOpen(false)}
                    onKeyDown={handleKeyDown}
                    onPaste={handleImagePaste}
                    placeholder='Écrivez un message…'
                    ref={textAreaRef}
                    value={text}
                  />
                  {/* Calque affiché derrière le champ : mêmes police, interligne
                    et gouttières, sinon le texte ne se superpose pas. Le
                    placeholder vient d'ici, celui du champ restant
                    transparent pour éviter un doublon. */}
                  <span className='pointer-events-none absolute inset-0 py-1.5'>
                    {!text ? (
                      <span className='text-[15px] leading-[1.45] text-light-secondary dark:text-dark-secondary'>
                        {scheduledDate
                          ? `Programmé pour le ${scheduledDate.toLocaleString(
                              'fr-FR'
                            )}…`
                          : 'Écrivez un message…'}
                      </span>
                    ) : (
                      <ComposerText
                        className='block break-all text-[15px] leading-[1.45] text-light-primary dark:text-dark-primary'
                        text={text}
                      />
                    )}
                  </span>
                </div>
                {imageBusy ? (
                  <CustomIcon
                    className='h-5 w-5 shrink-0 animate-spin text-main-accent'
                    iconName='SpinnerIcon'
                  />
                ) : text.trim() || attachedImage || poll || messageLocation ? (
                  <button
                    aria-label={
                      scheduledDate
                        ? 'Programmer le message'
                        : 'Envoyer le message'
                    }
                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95 disabled:opacity-60'
                    disabled={sending}
                    onClick={() => void handleSubmit()}
                    type='button'
                  >
                    {scheduledDate ? (
                      <MaterialIcon
                        className='h-4 w-4'
                        iconName='calendar_month'
                        solid
                      />
                    ) : (
                      <MaterialIcon className='h-4 w-4' iconName='send' solid />
                    )}
                  </button>
                ) : (
                  <button
                    aria-label='Enregistrer un message vocal'
                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95'
                    onClick={() => void startRecording()}
                    type='button'
                  >
                    <AudioWaveIcon className='h-4 w-4' />
                  </button>
                )}
              </div>

              <input
                accept='image/*'
                className='hidden'
                onChange={(event) => void handleImageSelect(event)}
                ref={attachInputRef}
                type='file'
              />
            </div>
          )}
        </div>
      ) : (
        <div className='border-t border-light-border px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] dark:border-dark-border md:px-4'>
          <div className='mx-auto max-w-md rounded-xl bg-main-search-background px-4 py-3 text-center text-sm text-light-secondary dark:text-dark-secondary'>
            Ceci est une chaîne, vous ne pouvez pas écrire
          </div>
        </div>
      )}
    </div>
  );
}
