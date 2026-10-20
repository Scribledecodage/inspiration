import cn from 'clsx';
import { getAvatarSrc } from '@lib/media';
import {
  getAvatarFrameDecoration,
  getAvatarShapeClass
} from '@lib/avatar-shape';
import { AvatarDecoration } from '@components/user/avatar-frame';
import type { PollVote } from '@lib/types/tweet';

type VoterStackProps = {
  voters: PollVote[];
  className?: string;
  /* Taille des avatars (en pixels). */
  size?: number;
  /* Couleur du « +N » (les messages écrits dans une bulle bleue ne peuvent
     pas utiliser le gris du site). */
  countClassName?: string;
};

/** Nombre d'avatars superposés au maximum. */
const MAX_AVATARS = 3;

/**
 * Avatars des personnes ayant coché un choix : empilés et légèrement
 * chevauchés. Utilisé par les sondages des publications et des messages, pour
 * qu'ils se ressemblent.
 */
export function VoterStack({
  voters,
  className,
  size = 20,
  countClassName
}: VoterStackProps): JSX.Element {
  const shown = voters.slice(0, MAX_AVATARS);
  const extra = voters.length - shown.length;

  return (
    <span className={cn('flex shrink-0 items-center', className)}>
      <span className='flex'>
        {shown.map((vote, index) => (
          <span
            className={cn(
              'relative block overflow-hidden bg-main-search-background',
              getAvatarShapeClass(vote.avatarShape)
            )}
            style={{
              width: size,
              height: size,
              marginLeft: index === 0 ? 0 : -Math.round(size * 0.4),
              zIndex: shown.length - index
            }}
            title={vote.name || `@${vote.username}`}
            key={`${vote.username}-${index}`}
          >
            <img
              className='block h-full w-full object-cover'
              src={getAvatarSrc(vote.photoURL, vote.gender)}
              alt={`Avatar de ${vote.name || vote.username}`}
              height={size}
              width={size}
              loading='lazy'
            />
            <AvatarDecoration frame={vote.avatarFrame} />
          </span>
        ))}
      </span>
      {extra > 0 && (
        <span
          className={cn(
            'ml-1 text-xs',
            countClassName ?? 'text-light-secondary dark:text-dark-secondary'
          )}
        >
          +{extra}
        </span>
      )}
    </span>
  );
}
