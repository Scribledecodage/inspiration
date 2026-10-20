import { useState } from 'react';
import cn from 'clsx';
import { getAvatarSrc } from '@lib/media';
import type { CSSProperties, SyntheticEvent } from 'react';
import type { User } from '@lib/types/user';

type GroupAvatarProps = {
  /** Photo du groupe : elle est prioritaire sur les avatars des membres. */
  photoURL?: string | null;
  /** Membres utilisés quand le groupe n'a pas de photo. */
  members?: User[];
  size?: number;
  className?: string;
};

/** Nombre d'avatars superposés au maximum. */
const MAX_STACKED = 3;

/** Disposition des avatars superposés selon leur nombre. */
function getLayout(count: number): CSSProperties[] {
  if (count === 2)
    return [
      { top: 0, left: 0 },
      { bottom: 0, right: 0 }
    ];

  return [
    { top: 0, left: 0 },
    { top: 0, right: 0 },
    { bottom: 0, left: '50%', transform: 'translateX(-50%)' }
  ];
}

/**
 * Avatar d'un membre : sa photo si elle se charge, sinon l'avatar par défaut
 * du site placé en arrière-plan (comme partout ailleurs dans le site, y compris
 * quand l'ancienne photo n'est plus disponible).
 */
function MemberAvatar({
  member,
  size
}: {
  member: User;
  size: number;
}): JSX.Element {
  const defaultSrc = getAvatarSrc(null, member.gender);
  const src = getAvatarSrc(member.photoURL, member.gender);

  return (
    <span
      className='group-avatar-member relative block h-full w-full bg-cover bg-center'
      style={{ backgroundImage: `url("${defaultSrc}")` }}
    >
      {src === defaultSrc ? null : (
        <img
          alt=''
          className='block h-full w-full object-cover'
          height={size}
          onError={(event: SyntheticEvent<HTMLImageElement>): void => {
            /* Photo cassée : on la masque, l'avatar par défaut reste visible. */
            event.currentTarget.style.opacity = '0';
          }}
          src={src}
          width={size}
        />
      )}
    </span>
  );
}

export function GroupAvatar({
  photoURL,
  members = [],
  size = 44,
  className
}: GroupAvatarProps): JSX.Element {
  const [photoBroken, setPhotoBroken] = useState(false);

  /* Les membres ayant une vraie photo passent en premier : ils sont ainsi
     toujours visibles, même si le groupe compte beaucoup de monde. */
  const ordered = [...members].sort(
    (first, second) =>
      Number(Boolean(second.photoURL?.trim())) -
      Number(Boolean(first.photoURL?.trim()))
  );
  const stacked = ordered.slice(0, MAX_STACKED);
  const showPhoto = Boolean(photoURL) && !photoBroken;

  if (showPhoto) {
    return (
      <span
        className={cn(
          'relative block shrink-0 overflow-hidden rounded-xl bg-main-search-background',
          className
        )}
        style={{ width: size, height: size }}
      >
        <img
          alt=''
          className='block h-full w-full object-cover'
          height={size}
          onError={(): void => setPhotoBroken(true)}
          src={photoURL as string}
          width={size}
        />
      </span>
    );
  }

  /* Aucun membre à afficher : rond neutre et vide. */
  if (!stacked.length) {
    return (
      <span
        aria-hidden='true'
        className={cn(
          'relative block shrink-0 rounded-full border border-light-border bg-main-search-background dark:border-dark-border',
          className
        )}
        style={{ width: size, height: size }}
      />
    );
  }

  if (stacked.length === 1) {
    return (
      <span
        className={cn(
          'relative block shrink-0 overflow-hidden rounded-full bg-main-search-background',
          className
        )}
        style={{ width: size, height: size }}
      >
        <MemberAvatar member={stacked[0]} size={size} />
      </span>
    );
  }

  const layout = getLayout(stacked.length);
  const avatarSize = stacked.length === 2 ? '62%' : '56%';

  return (
    <span
      aria-hidden='true'
      className={cn('relative block shrink-0', className)}
      style={{ width: size, height: size }}
    >
      {stacked.map((member, index) => (
        <span
          className='group-avatar-stack absolute block overflow-hidden rounded-full ring-2 ring-main-background'
          key={member.id}
          style={{ width: avatarSize, height: avatarSize, ...layout[index] }}
        >
          <MemberAvatar member={member} size={size} />
        </span>
      ))}
    </span>
  );
}
