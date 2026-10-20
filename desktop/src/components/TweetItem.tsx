import { useState } from 'preact/hooks';
import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { openUrl } from '../lib/platform';
import type { AppUser, Tweet } from '../lib/types';

function formatDate(value: unknown): string {
  if (!value || typeof value !== 'object') return '';

  const date = (value as { toDate?: () => Date }).toDate?.();

  if (!date) return '';

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "à l'instant";
  if (seconds < 3600) return `il y a ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `il y a ${Math.floor(seconds / 3600)} h`;
  if (seconds < 604800) return `il y a ${Math.floor(seconds / 86400)} j`;

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric'
  });
}

type TweetItemProps = {
  tweet: Tweet;
  author?: AppUser;
  currentUserId?: string;
  bookmarked?: boolean;
  onLike: (tweet: Tweet, liked: boolean) => void;
  onRetweet: (tweet: Tweet, retweeted: boolean) => void;
  onBookmark: (tweet: Tweet, bookmarked: boolean) => void;
  onReply: (tweet: Tweet, text: string) => void;
  onDelete?: (tweet: Tweet) => void;
  onOpenProfile?: (username: string) => void;
};

export function TweetItem({
  tweet,
  author,
  currentUserId,
  bookmarked = false,
  onLike,
  onRetweet,
  onBookmark,
  onReply,
  onDelete,
  onOpenProfile
}: TweetItemProps) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const liked = Boolean(currentUserId && tweet.userLikes?.includes(currentUserId));
  const retweeted = Boolean(currentUserId && tweet.userRetweets?.includes(currentUserId));
  const isOwner = currentUserId === tweet.createdBy;

  const submitReply = (): void => {
    const text = replyText.trim();

    if (!text) return;

    onReply(tweet, text);
    setReplyText('');
    setReplying(false);
  };

  return (
    <article className='tweet'>
      <Avatar
        className='tweet-avatar'
        name={author?.name}
        onClick={() => author && onOpenProfile?.(author.username)}
        src={author?.photoURL}
      />

      <div className='tweet-body'>
        <div className='tweet-head'>
          <span
            className='tweet-name'
            onClick={() => author && onOpenProfile?.(author.username)}
          >
            {author?.name ?? 'Utilisateur'}
          </span>

          {author?.verified && (
            <Icon className='tweet-verified' name='verified' />
          )}

          <span className='tweet-handle'>@{author?.username ?? 'inconnu'}</span>
          <span className='tweet-date'>· {formatDate(tweet.createdAt)}</span>
        </div>

        {tweet.text && <p className='tweet-text selectable'>{tweet.text}</p>}

        {tweet.images?.length
          ? tweet.images.map((image) => (
              <img
                alt=''
                className='tweet-image selectable'
                key={image}
                onClick={() => void openUrl(image)}
                src={image}
              />
            ))
          : null}

        {tweet.location && (
          <p className='tweet-handle'>📍 {tweet.location}</p>
        )}

        <div className='tweet-actions'>
          <button
            className='action'
            onClick={() => setReplying((value) => !value)}
            title='Répondre'
            type='button'
          >
            <Icon name='chat' />
            {tweet.userReplies ? <span>{tweet.userReplies}</span> : null}
          </button>

          <button
            className={`action ${retweeted ? 'on' : ''}`}
            onClick={() => onRetweet(tweet, retweeted)}
            title='Repartager'
            type='button'
          >
            <Icon name='repeat' />
            {tweet.userRetweets?.length ? <span>{tweet.userRetweets.length}</span> : null}
          </button>

          <button
            className={`action ${liked ? 'on' : ''}`}
            onClick={() => onLike(tweet, liked)}
            title='J’aime'
            type='button'
          >
            <Icon filled={liked} name='heart' />
            {tweet.userLikes?.length ? <span>{tweet.userLikes.length}</span> : null}
          </button>

          <button
            className='action'
            onClick={() =>
              void openUrl(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `${tweet.text ?? ''} — https://u-social.vercel.app`
                )}`
              )
            }
            title='Partager'
            type='button'
          >
            <Icon name='share' />
          </button>

          <button
            className={`action ${bookmarked ? 'on' : ''}`}
            onClick={() => onBookmark(tweet, bookmarked)}
            title='Signet'
            type='button'
          >
            <Icon filled={bookmarked} name='bookmark' />
          </button>

          {isOwner && onDelete && (
            <button
              className='action danger'
              onClick={() => onDelete(tweet)}
              title='Supprimer'
              type='button'
            >
              <Icon name='close' />
            </button>
          )}
        </div>

        {replying && (
          <div className='reply-box'>
            <textarea
              autoFocus
              className='selectable'
              onInput={(event) =>
                setReplyText((event.target as HTMLTextAreaElement).value)
              }
              placeholder={`Répondre à @${author?.username ?? ''}`}
              value={replyText}
            />
            <div className='composer-bar'>
              <span />
              <button
                className='button'
                disabled={!replyText.trim()}
                onClick={submitReply}
                type='button'
              >
                Répondre
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
