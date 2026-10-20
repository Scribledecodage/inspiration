import { useState } from 'preact/hooks';

type AvatarProps = {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
  onClick?: () => void;
};

/**
 * Avatar.
 *
 * Sans photo, un rond coloré avec l'initiale est dessiné : l'application
 * n'embarque donc aucune image lourde (les avatars du site pèsent plus
 * d'un mégaoctet chacun).
 */
export function Avatar({
  src,
  name,
  size = 44,
  className,
  onClick
}: AvatarProps) {
  const [failed, setFailed] = useState(false);

  const initial = (name ?? '?').trim().charAt(0).toUpperCase() || '?';

  /* La couleur est déduite du nom : deux comptes voisins n'ont jamais la
     même couleur. */
  const hue =
    [...(name ?? '?')].reduce((total, letter) => total + letter.charCodeAt(0), 0) %
    360;

  if (!src || failed)
    return (
      <span
        className={className}
        onClick={onClick}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${Math.round(size * 0.42)}px`,
          background: `hsl(${hue} 62% 46%)`,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          flex: 'none',
          userSelect: 'none'
        }}
      >
        {initial}
      </span>
    );

  return (
    <img
      alt=''
      className={className}
      onClick={onClick}
      onError={() => setFailed(true)}
      src={src}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
