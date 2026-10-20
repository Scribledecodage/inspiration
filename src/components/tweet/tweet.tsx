import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { TweetReplyModal } from '@components/modal/tweet-reply-modal';
import { ImagePreview } from '@components/input/image-preview';
import { MaterialIcon } from '@components/ui/material-icon';
import { UserAvatar } from '@components/user/user-avatar';
import { UserTooltip } from '@components/user/user-tooltip';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { TweetActions } from './tweet-actions';
import { TweetDate } from './tweet-date';
import { TweetStatus } from './tweet-status';
import { TweetStats } from './tweet-stats';
import { TweetText } from './tweet-text';
import { TweetPoll } from './tweet-poll';
import { LocationMapModal } from '@components/modal/location-map-modal';
import { AudioPlayer } from '@components/common/audio-player';
import { LinkPreviewCard } from '@components/common/link-preview-card';
import type { Variants } from 'framer-motion';
import type { Tweet as TweetData } from '@lib/types/tweet';
import type { User } from '@lib/types/user';

export type TweetProps = TweetData & {
  user: User;
  modal?: boolean;
  pinned?: boolean;
  profile?: User | null;
  parentTweet?: boolean;
};

/* Une publication qui arrive au défilement apparaît directement à sa place.
   Avant, chaque nouvelle publication remontait de 8 px en 220 ms : tout ce
   qui se trouvait en dessous glissait avec elle, et le fil semblait
   « bouger » à chaque page chargée. La publication ne part plus non plus
   d'une opacité nulle, pour que le fil n'apparaisse jamais délavé. */
export const variants: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0, ease: 'easeOut' }
  },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

export const Tweet = forwardRef<HTMLElement, TweetProps>(function Tweet(
  tweet,
  ref
): JSX.Element {
  const {
    id: tweetId,
    text,
    modal,
    images,
    parent,
    pinned,
    profile,
    userLikes,
    createdBy,
    createdAt,
    parentTweet,
    userReplies,
    userRetweets,
    views,
    poll,
    pollVotes,
    location,
    audioURL,
    audioDuration,
    linkPreview,
    user: tweetUserData
  } = tweet;

  const { id: ownerId, name, username, verified, photoURL, gender } = tweetUserData ?? { id: '', name: '', username: '', verified: false, photoURL: '', gender: 'autre' };

  const { user } = useAuth();
  const router = useRouter();

  const { open, openModal, closeModal } = useModal();

  const [mapOpen, setMapOpen] = useState(false);

  const tweetLink = `/tweet/${tweetId}`;

  const userId = user?.id as string;

  const isOwner = userId === createdBy;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  const {
    id: profileId,
    name: profileName,
    username: profileUsername
  } = profile ?? {};

  const reply = !!parent;
  const safeRetweets = Array.isArray(userRetweets) ? userRetweets : [];
  const tweetIsRetweeted = safeRetweets.includes(profileId ?? '');

  return (
    <motion.article
      ref={ref}
      role='link'
      tabIndex={modal ? -1 : 0}
      aria-label={`Ouvrir la publication de ${name}`}
      className={cn(
        'accent-tab relative flex cursor-pointer flex-col gap-y-3 px-4 py-3.5 pr-6 outline-none transition-colors duration-150 ease-out hover:bg-light-primary/[0.025] dark:hover:bg-dark-primary/[0.03] active:bg-light-primary/[0.04] dark:active:bg-dark-primary/[0.05] xs:pr-4',
        parentTweet
          ? 'mt-0.5 pt-2.5 pb-0'
          : 'border-b border-light-border/60 dark:border-dark-border/60'
      )}
      onClick={(event) => {
        if ((event.target as Element).closest('a, button, input, textarea, button.motion-button'))
          return;
        void router.push(tweetLink, undefined, { scroll: !reply });
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter') return;
        if ((event.target as Element).closest('a, button, input, textarea'))
          return;
        void router.push(tweetLink, undefined, { scroll: !reply });
      }}
      {...(!modal ? { ...variants } : {})}
      animate={{
        ...variants.animate,
        ...(parentTweet && { transition: { duration: 0.2 } })
      }}
    >
      <TweetReplyModal tweet={tweet} open={open} closeModal={closeModal} />
      <>
          <div className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-1'>
            <AnimatePresence initial={false}>
              {modal ? null : pinned ? (
                <TweetStatus type='pin'>
                  <p className='text-sm font-bold'>Publication épinglée</p>
                </TweetStatus>
              ) : (
                tweetIsRetweeted && (
                  <TweetStatus type='tweet'>
                    <Link href={profileUsername as string}>
                      <a className='custom-underline truncate text-sm font-bold'>
                        {userId === profileId ? 'You' : profileName} Retweeted
                      </a>
                    </Link>
                  </TweetStatus>
                )
              )}
            </AnimatePresence>
            <div className='flex flex-col items-center gap-2'>
              <UserTooltip modal={modal} {...tweetUserData}>
                <UserAvatar
                  src={photoURL}
                  alt={name}
                  username={username}
                  gender={gender}
                  shape={tweetUserData?.avatarShape}
                  frame={tweetUserData?.avatarFrame}
                  statusEmoji={tweetUserData?.statusEmoji}
                />
              </UserTooltip>
              {parentTweet && (
                <i className='hover-animation h-full w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
              )}
            </div>
            <div className='flex min-w-0 flex-col'>
              <div className='flex justify-between gap-2 text-light-secondary dark:text-dark-secondary'>
                <div className='flex gap-1 truncate xs:overflow-visible xs:whitespace-normal'>
                  <UserTooltip modal={modal} {...tweetUserData}>
                    <UserName
                      name={name}
                      username={username}
                      verified={verified}
                      className='text-light-primary dark:text-dark-primary'
                    />
                  </UserTooltip>
                  <UserTooltip modal={modal} {...tweetUserData}>
                    <UserUsername username={username} />
                  </UserTooltip>
                  <TweetDate tweetLink={tweetLink} createdAt={createdAt} />
                </div>
                <div className='px-4'>
                  {!modal && (
                    <TweetActions
                      isOwner={isOwner}
                      ownerId={ownerId}
                      tweetId={tweetId}
                      parentId={parentId}
                      username={username}
                      hasImages={!!images}
                      createdBy={createdBy}
                    />
                  )}
                </div>
              </div>
              {(reply || modal) && (
                <p
                  className={cn(
                    'text-light-secondary dark:text-dark-secondary',
                    modal && 'order-1 my-2'
                  )}
                >
                  En réponse à{' '}
                  <Link href={`/user/${parentUsername}`}>
                    <a className='custom-underline text-main-accent'>
                      @{parentUsername}
                    </a>
                  </Link>
                </p>
              )}
              {text && <TweetText text={text} />}
              {location && (
                <>
                  <button
                    type='button'
                    onClick={(event) => {
                      event.stopPropagation();
                      setMapOpen(true);
                    }}
                    className='flex w-fit items-center gap-1 rounded-full bg-main-accent/10 px-2.5 py-1 text-sm font-bold text-main-accent transition hover:bg-main-accent/20'
                  >
                    <MaterialIcon className='h-4 w-4 shrink-0' iconName='location_on' />
                    <span className='truncate'>{location}</span>
                  </button>
                  <LocationMapModal
                    open={mapOpen}
                    closeModal={() => setMapOpen(false)}
                    location={location}
                  />
                </>
              )}
              <div className='mt-1 flex flex-col gap-2'>
                {images && (
                  <ImagePreview
                    tweet
                    imagesPreview={images}
                    previewCount={images.length}
                  />
                )}
                {poll && <TweetPoll tweetId={tweetId} poll={poll} pollVotes={pollVotes} />}
                {linkPreview && (
                  <div className='mt-2'>
                    <LinkPreviewCard preview={linkPreview} />
                  </div>
                )}
                {audioURL && (
                  <div className='rounded-2xl bg-main-search-background px-4 py-3'>
                    <p className='mb-2 text-xs font-semibold text-light-secondary dark:text-dark-secondary'>
                      Message vocal
                    </p>
                    <AudioPlayer duration={audioDuration} src={audioURL} />
                  </div>
                )}
                {!modal && (
                  <TweetStats
                    reply={reply}
                    userId={userId}
                    isOwner={isOwner}
                    tweetId={tweetId}
                    userLikes={userLikes}
                    userReplies={userReplies}
                    userRetweets={safeRetweets}
                    views={views}
                    openModal={modal ? undefined : openModal}
                    text={text}
                    name={name}
                    username={username}
                    photoURL={photoURL}
                    previewImage={images?.[0]?.src}
                    authorId={ownerId}
                  />
                )}
              </div>
            </div>
          </div>
      </>
    </motion.article>
  );
});
