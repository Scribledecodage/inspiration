import Link from 'next/link';
import { useState, useEffect, useRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { tweetsCollection } from '@lib/firebase/collections';
import {
  manageReply,
  manageTotalTweets,
  manageTotalPhotos,
  scheduleTweet
} from '@lib/firebase/utils';
import { getStorageErrorMessage, uploadImages } from '@lib/supabase/storage';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { sleep } from '@lib/utils';
import { fillImagesSizes, getImagesData } from '@lib/validation';
import { askAiToReply } from '@lib/ai-tweet';
import { mentionsAi } from '@lib/mentions';
import { UserAvatar } from '@components/user/user-avatar';
import { MaterialIcon } from '@components/ui/material-icon';
import { InputForm, fromTop } from './input-form';
import { ImagePreview } from './image-preview';
import { MediaMenu } from './media-menu';
import { PollPreview } from './poll-preview';
import { SchedulePreview } from './schedule-preview';
import { LocationPreview } from './location-preview';
import { VoiceRecorder } from './voice-recorder';
import { AudioPlayer } from '@components/common/audio-player';
import { LinkPreviewCard } from '@components/common/link-preview-card';
import { findLink, fetchLinkPreview } from '@lib/link-preview';
import type { LinkPreviewData } from '@lib/link-preview';
import { GifPickerModal } from '@components/modal/gif-picker-modal';
import { PollModal } from '@components/modal/poll-modal';
import { EmojiPicker } from '@components/ui/emoji-picker';
import { ScheduleModal } from '@components/modal/schedule-modal';
import { LocationModal } from '@components/modal/location-modal';
import { InputOptions } from './input-options';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import type { ReactNode, FormEvent, ChangeEvent, ClipboardEvent } from 'react';
import type { WithFieldValue } from 'firebase/firestore';
import type { Variants } from 'framer-motion';
import type { DragControls } from 'framer-motion';
import type { User } from '@lib/types/user';
import type { Tweet, TweetPoll } from '@lib/types/tweet';
import type { FilesWithId, ImagesPreview } from '@lib/types/file';

type InputProps = {
  modal?: boolean;
  reply?: boolean;
  parent?: { id: string; username: string };
  disabled?: boolean;
  children?: ReactNode;
  replyModal?: boolean;
  closeModal?: () => void;
  sheetHandle?: boolean;
  dragControls?: DragControls;
};

/* En dessous de cette largeur, le sélecteur d'emoji est une feuille qui
   recouvre le bas de l'écran. */
const EMOJI_SHEET_WIDTH = 640;

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export function Input({
  modal,
  reply,
  parent,
  disabled,
  children,
  replyModal,
  closeModal,
  sheetHandle,
  dragControls
}: InputProps): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [selectedGifs, setSelectedGifs] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [visited, setVisited] = useState(false);
  const [gifOpen, setGifOpen] = useState(false);
  /* Menu des photos : il remplace le sélecteur du système, ouvert au clic
     sur l'icône image. */
  const [photosOpen, setPhotosOpen] = useState(false);
  const [poll, setPoll] = useState<TweetPoll | null>(null);
  const [pollOpen, setPollOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  /* Texte en cours de saisie : il est repris en aperçu dans le sélecteur
     d'emoji. La valeur est suivie en direct, le curseur est mis à jour à
     l'ouverture et après chaque emoji inséré. */
  const [emojiCaret, setEmojiCaret] = useState(0);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [tweetLocation, setTweetLocation] = useState<string | null>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  /* Message vocal joint à la publication, enregistré par le même composant que
     dans la messagerie. */
  const [recordingOpen, setRecordingOpen] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  /* Flux micro demandé dès le clic sur le bouton : sur iOS/Safari,
     `getUserMedia` doit être appelé dans le geste utilisateur, pas dans un
     effet React déclenché après le rendu. */
  const [voiceStreamPromise, setVoiceStreamPromise] =
    useState<Promise<MediaStream> | null>(null);
  /* Aperçu du lien collé : demandé à la frappe, retiré si le lien disparaît. */
  const [linkPreview, setLinkPreview] = useState<LinkPreviewData | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const { user, isAdmin } = useAuth();
  const { width } = useWindow();
  const { name, username, photoURL, gender, avatarShape, avatarFrame } =
    user as User;

  /* Sur téléphone, le sélecteur d'emoji est une feuille : le clavier la
     recouvrirait. */
  const isEmojiSheet = width < EMOJI_SHEET_WIDTH;

  /* Confirmation avant d'effacer la publication (icône de la poubelle,
     touche Échap). */
  const {
    open: discardOpen,
    openModal: openDiscardModal,
    closeModal: closeDiscardModal
  } = useModal();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const previewCount = imagesPreview.length;
  const isUploadingImages = !!previewCount;

  /* La zone de publication contient-elle quelque chose ? C'est ce qui
     rend l'icône « effacer » utilisable. */
  const hasContent = Boolean(
    inputValue.trim() ||
      imagesPreview.length ||
      poll ||
      scheduledDate ||
      tweetLocation ||
      audioURL
  );

  useEffect(
    () => {
      /* `preventScroll` : sans lui, le navigateur amène le champ à l'écran
         et la page défile toute seule. */
      if (modal) inputRef.current?.focus({ preventScroll: true });
      return cleanImage;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendTweet = async (): Promise<void> => {
    inputRef.current?.blur();

    setLoading(true);

    const isReplying = reply ?? replyModal;
    const userId = user?.id as string;

    // Si une date est programmée, on enregistre une publication programmée
    // (elle sera envoyée automatiquement à l'heure choisie) au lieu de
    // publier immédiatement.
    if (scheduledDate) {
      let scheduledImages: Awaited<ReturnType<typeof uploadImages>> = null;

      try {
        scheduledImages = await uploadImages(userId, selectedImages);
      } catch (error) {
        setLoading(false);
        toast.error(getStorageErrorMessage(error));
        return;
      }

      const scheduledMedia = [...selectedGifs, ...(scheduledImages ?? [])];

      try {
        await scheduleTweet({
          text: inputValue.trim() || null,
          parent: isReplying && parent ? parent : null,
          images: scheduledMedia.length ? scheduledMedia : null,
          poll: poll ?? null,
          createdBy: userId,
          scheduledAt: scheduledDate,
          location: tweetLocation
        });
      } catch {
        setLoading(false);
        toast.error('Impossible de programmer la publication. Réessayez.');
        return;
      }

      toast.success(
        `Publication programmée pour le ${scheduledDate.toLocaleString(
          'fr-FR'
        )}`
      );
      discardTweet();
      setScheduledDate(null);
      setLoading(false);
      if (closeModal) closeModal();
      return;
    }

    let uploadedImages: Awaited<ReturnType<typeof uploadImages>> = null;

    try {
      uploadedImages = await uploadImages(userId, selectedImages);
    } catch (error) {
      setLoading(false);
      toast.error(getStorageErrorMessage(error));
      return;
    }

    const images = [...selectedGifs, ...(uploadedImages ?? [])];

    const tweetData: WithFieldValue<Omit<Tweet, 'id'>> = {
      text: inputValue.trim() || null,
      parent: isReplying && parent ? parent : null,
      images: images.length ? images : null,
      poll: poll ?? null,
      pollVotes: poll ? {} : null,
      location: tweetLocation,
      audioURL,
      audioDuration,
      linkPreview,
      userLikes: [],
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: null,
      userReplies: 0,
      userRetweets: []
    };

    await sleep(500);

    const [tweetRef] = await Promise.all([
      addDoc(tweetsCollection, tweetData),
      manageTotalTweets('increment', userId),
      tweetData.images && manageTotalPhotos('increment', userId),
      isReplying && manageReply('increment', parent?.id as string)
    ]);

    const { id: tweetId } = await getDoc(tweetRef);

    /* La publication mentionne l'assistant : il y répond. La réponse arrive
       dans la discussion, comme une réponse de plus. */
    if (mentionsAi(inputValue)) {
      void askAiToReply(
        tweetId,
        parent?.username ?? null,
        inputValue.trim() || null,
        tweetData.images as ImagesPreview | null
      ).then((result) => {
        if (!result.ok)
          toast.error(result.error ?? 'L’assistant n’a pas répondu.');
      });
    }

    if (!modal && !replyModal) {
      discardTweet();
      setLoading(false);
    }

    if (closeModal) closeModal();

    toast.success(
      () => (
        <span className='flex gap-2'>
          Your Tweet was sent
          <Link href={`/tweet/${tweetId}`}>
            <a className='custom-underline font-bold'>Voir</a>
          </Link>
        </span>
      ),
      { duration: 6000 }
    );
  };

  /* Ajout de fichiers à la publication : que viennent du collage, du menu des
     photos ou du sélecteur du système, ils passent tous par ici. */
  const addFiles = (files: FileList | File[] | null): void => {
    const imagesData = getImagesData(files, {
      currentFiles: previewCount,
      allowUploadingVideos: true
    });

    if (!imagesData) {
      toast.error('Please choose a GIF or photo up to 4');
      return;
    }

    const { imagesPreviewData, selectedImagesData } = imagesData;

    setImagesPreview([...imagesPreview, ...imagesPreviewData]);
    setSelectedImages([...selectedImages, ...selectedImagesData]);

    /* Les dimensions des images sont relevées juste après : l'aperçu peut
       ainsi être affiché dans le bon format, sans changer de taille quand
       l'image arrive. */
    void fillImagesSizes(imagesPreviewData).then((sized) => {
      setImagesPreview((current) =>
        current.map((image) => sized.find(({ id }) => id === image.id) ?? image)
      );
    });

    inputRef.current?.focus({ preventScroll: true });
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ): void => {
    const isClipboardEvent = 'clipboardData' in e;

    if (isClipboardEvent) {
      const isPastingText = e.clipboardData.getData('text');
      if (isPastingText) return;
    }

    const files = isClipboardEvent ? e.clipboardData.files : e.target.files;

    addFiles(files);
  };

  const handleGifSelect = (gif: ImagesPreview[number]): void => {
    setImagesPreview([...imagesPreview, gif]);
    setSelectedGifs([...selectedGifs, gif]);
    inputRef.current?.focus({ preventScroll: true });
  };

  /* L'emoji est inséré à l'endroit du curseur, pas à la fin du texte : on
     peut continuer d'écrire à la suite. Le curseur est replacé juste après
     l'emoji. */
  const handleEmojiSelect = (emoji: string): void => {
    const input = inputRef.current;

    if (!input) {
      setInputValue((current) => current + emoji);
      return;
    }

    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;

    setInputValue(
      (current) => current.slice(0, start) + emoji + current.slice(end)
    );

    /* Le curseur avance : l'aperçu du sélecteur suit. */
    setEmojiCaret(start + emoji.length);

    /* Sur téléphone, on ne rend pas le focus à la zone de saisie : le
       clavier se rouvrirait par-dessus la feuille d'emoji. Sur ordinateur, on
       le rend pour pouvoir continuer à écrire. Dans les deux cas, le focus
       ne doit pas faire défiler la page. */
    if (isEmojiSheet) return;

    requestAnimationFrame((): void => {
      input.focus({ preventScroll: true });

      const position = start + emoji.length;
      input.setSelectionRange(position, position);
    });
  };

  const removeImage = (targetId: string) => (): void => {
    setSelectedImages(selectedImages.filter(({ id }) => id !== targetId));
    setSelectedGifs(selectedGifs.filter(({ id }) => id !== targetId));
    setImagesPreview(imagesPreview.filter(({ id }) => id !== targetId));

    const image = imagesPreview.find(({ id }) => id === targetId);
    const isGif = selectedGifs.some(({ id }) => id === targetId);

    if (image && !isGif) URL.revokeObjectURL(image.src);
  };

  const cleanImage = (): void => {
    imagesPreview.forEach(({ src }) => URL.revokeObjectURL(src));

    setSelectedImages([]);
    setSelectedGifs([]);
    setImagesPreview([]);
  };

  const discardTweet = (): void => {
    setInputValue('');
    setVisited(false);
    setPoll(null);
    setScheduledDate(null);
    setTweetLocation(null);
    setAudioURL(null);
    setAudioDuration(null);
    setRecordingOpen(false);
    setVoiceStreamPromise(null);
    setLinkPreview(null);
    previewUrlRef.current = null;
    cleanImage();

    inputRef.current?.blur();
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(value);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendTweet();
  };

  const handleFocus = (): void => setVisited(!loading);

  const formId = useId();

  const inputLimit = isAdmin ? 560 : 280;

  const inputLength = inputValue.length;
  const isValidInput = !!inputValue.trim().length;
  const isCharLimitExceeded = inputLength > inputLimit;

  const isValidTweet =
    !isCharLimitExceeded &&
    (isValidInput || isUploadingImages || Boolean(poll) || Boolean(audioURL));

  return (
    <form
      className={cn('flex flex-col', {
        '-mx-4': reply,
        'gap-2': replyModal,
        'cursor-not-allowed': disabled
      })}
      onSubmit={handleSubmit}
    >
      {/* Confirmation avant d'effacer la publication : c'est un geste
          destructif, on demande. */}
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={discardOpen}
        closeModal={closeDiscardModal}
      >
        <ActionModal
          title='Supprimer la publication ?'
          description='Cette action est irréversible et votre brouillon sera perdu.'
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75'
          mainBtnLabel='Supprimer'
          action={(): void => {
            discardTweet();
            closeDiscardModal();
          }}
          closeModal={closeDiscardModal}
        />
      </Modal>
      {sheetHandle && dragControls && (
        <button
          aria-label='Faire glisser pour fermer la fenêtre'
          className='flex w-full touch-none justify-center py-3 lg:hidden'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>
      )}
      <GifPickerModal
        open={gifOpen}
        closeModal={() => setGifOpen(false)}
        onSelect={handleGifSelect}
      />
      <MediaMenu
        open={photosOpen}
        closeModal={(): void => setPhotosOpen(false)}
        onSelect={(files): void => {
          setPhotosOpen(false);
          addFiles(files);
        }}
        allowVideos
      />
      <PollModal
        open={pollOpen}
        poll={poll}
        closeModal={() => setPollOpen(false)}
        onApply={setPoll}
      />
      <EmojiPicker
        caret={emojiCaret}
        open={emojiOpen}
        closeModal={(): void => setEmojiOpen(false)}
        onSelect={handleEmojiSelect}
        value={inputValue}
      />
      <ScheduleModal
        open={scheduleOpen}
        closeModal={() => setScheduleOpen(false)}
        onSchedule={(date) => setScheduledDate(date)}
      />
      <LocationModal
        open={locationOpen}
        closeModal={() => setLocationOpen(false)}
        onSelect={setTweetLocation}
        current={tweetLocation}
        onClear={() => setTweetLocation(null)}
      />
      {loading && (
        <motion.i className='h-1 animate-pulse bg-main-accent' {...variants} />
      )}
      {children}
      {reply && visited && (
        <motion.p
          className='ml-[75px] -mb-2 mt-2 text-light-secondary dark:text-dark-secondary'
          {...fromTop}
        >
          En réponse à{' '}
          <Link href={`/user/${parent?.username as string}`}>
            <a className='custom-underline text-main-accent'>
              {parent?.username as string}
            </a>
          </Link>
        </motion.p>
      )}
      <label
        className={cn(
          'hover-animation relative grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3',
          reply
            ? 'pt-3 pb-1'
            : replyModal
            ? 'pt-0'
            : 'border-b-2 border-light-border dark:border-dark-border',
          (disabled || loading) && 'pointer-events-none opacity-50'
        )}
        htmlFor={formId}
      >
        {/* Effacer le brouillon : en haut à droite de la zone, à côté du
            réglage « Tout le monde », et non parmi les outils de création.
            Grise tant que la zone est vide, bleue dès qu'il y a quelque
            chose à supprimer. */}
        {!reply && !replyModal && !modal && (
          <button
            aria-label='Effacer le brouillon'
            className={cn(
              'absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition',
              hasContent
                ? 'text-main-accent hover:bg-main-accent/10'
                : 'text-light-secondary/50 dark:text-dark-secondary/50'
            )}
            disabled={!hasContent}
            onClick={openDiscardModal}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='delete' />
          </button>
        )}
        <UserAvatar
          src={photoURL}
          alt={name}
          username={username}
          gender={gender}
          frame={avatarFrame}
          shape={avatarShape}
        />
        <div className='flex w-full min-w-0 flex-col gap-4'>
          <InputForm
            modal={modal}
            reply={reply}
            formId={formId}
            visited={visited}
            loading={loading}
            inputRef={inputRef}
            replyModal={replyModal}
            inputValue={inputValue}
            isValidTweet={isValidTweet}
            isUploadingImages={isUploadingImages}
            sendTweet={sendTweet}
            handleFocus={handleFocus}
            discardTweet={discardTweet}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
            recording={recordingOpen}
            onDiscardRequest={openDiscardModal}
            popupOpen={
              emojiOpen ||
              photosOpen ||
              gifOpen ||
              pollOpen ||
              scheduleOpen ||
              locationOpen
            }
            recorder={
              <VoiceRecorder
                active={recordingOpen}
                streamPromise={voiceStreamPromise}
                onClose={() => {
                  setRecordingOpen(false);
                  setVoiceStreamPromise(null);
                }}
                onRecorded={(url, duration) => {
                  setAudioURL(url);
                  setAudioDuration(duration);
                  setRecordingOpen(false);
                  setVoiceStreamPromise(null);
                  inputRef.current?.focus({ preventScroll: true });
                }}
                userId={user?.id as string}
              />
            }
          >
            {isUploadingImages && (
              <ImagePreview
                imagesPreview={imagesPreview}
                previewCount={previewCount}
                removeImage={!loading ? removeImage : undefined}
              />
            )}
            {poll && (
              <PollPreview
                poll={poll}
                onEdit={() => setPollOpen(true)}
                onRemove={() => setPoll(null)}
              />
            )}
            {scheduledDate && (
              <SchedulePreview
                date={scheduledDate}
                onEdit={() => setScheduleOpen(true)}
                onRemove={() => setScheduledDate(null)}
              />
            )}
            {/* Aperçu du lien collé, sous la zone de texte. */}
            {linkPreview && (
              <LinkPreviewCard
                preview={linkPreview}
                onRemove={() => {
                  previewUrlRef.current = null;
                  setLinkPreview(null);
                }}
              />
            )}
            {tweetLocation && (
              <LocationPreview
                location={tweetLocation}
                onEdit={() => setLocationOpen(true)}
                onRemove={() => setTweetLocation(null)}
              />
            )}
            {/* Message vocal : même matériel que la messagerie. L'aperçu du
                vocal joint reste sous la zone de texte. */}
            {audioURL && !recordingOpen && (
              <div className='relative rounded-2xl bg-main-search-background px-4 py-3'>
                <p className='mb-2 text-xs font-semibold text-light-secondary dark:text-dark-secondary'>
                  Message vocal joint · à écouter avant d’envoyer
                </p>
                <AudioPlayer duration={audioDuration} src={audioURL} />
                <button
                  aria-label='Retirer le message vocal'
                  className='absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full
                             text-light-secondary transition hover:bg-black/5
                             dark:text-dark-secondary dark:hover:bg-white/5'
                  onClick={() => {
                    setAudioURL(null);
                    setAudioDuration(null);
                  }}
                  title='Retirer le message vocal'
                  type='button'
                >
                  <MaterialIcon className='h-5 w-5' iconName='close' />
                </button>
              </div>
            )}
          </InputForm>
          <AnimatePresence initial={false}>
            {(reply ? reply && visited && !loading : !loading) && (
              <InputOptions
                reply={reply}
                modal={modal}
                inputLimit={inputLimit}
                inputLength={inputLength}
                hasPoll={Boolean(poll)}
                scheduled={Boolean(scheduledDate)}
                hasLocation={Boolean(tweetLocation)}
                isValidTweet={isValidTweet}
                isCharLimitExceeded={isCharLimitExceeded}
                onPhotosClick={(): void => setPhotosOpen(true)}
                onGifClick={() => setGifOpen(true)}
                onPollClick={() => setPollOpen(true)}
                onEmojiClick={(): void => {
                  const input = inputRef.current;

                  setEmojiCaret(input?.selectionStart ?? inputValue.length);
                  setEmojiOpen(true);
                }}
                onScheduleClick={() => setScheduleOpen(true)}
                onLocationClick={() => setLocationOpen(true)}
              />
            )}
          </AnimatePresence>
        </div>
      </label>
    </form>
  );
}
