import { useState } from 'react';
import cn from 'clsx';
import { getAvatarFrameDecoration } from '@lib/avatar-shape';
import type { AvatarFrame } from '@lib/types/theme';

type AvatarDecorationProps = {
  frame?: AvatarFrame;
  className?: string;
};

/* Décorations d'avatar : l'image est posée autour de la photo, comme les
   décorations Discord. Elle mesure une fois et demie la photo (son centre
   transparent laisse le visage bien visible).
   Le parent doit être positionné (`relative` ou `absolute`). */export function AvatarDecoration({
  frame,
  className
}: AvatarDecorationProps): JSX.Element | null {
  const [failed, setFailed] = useState(false);
  const src = getAvatarFrameDecoration(frame);

  // Image indisponible : on n'affiche simplement rien.
  if (!src || failed) return null;

  return (
    <span
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute -inset-1/4 z-10 select-none',
        className
      )}
    >
      <img
        className='h-full w-full object-contain'
        src={src}
        alt=''
        draggable={false}
        onError={(): void => setFailed(true)}
      />
    </span>
  );
}
