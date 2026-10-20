export const DEFAULT_AVATAR = '/Avatar homme.png';
export const DEFAULT_BANNER = '/Banniere.png';

type AvatarGender = 'homme' | 'femme' | 'autre' | undefined;

function isLegacyAsset(
  src: string | null | undefined,
  assetName: string
): boolean {
  if (!src) return true;

  const normalized = src.toLowerCase();
  return (
    normalized.includes(assetName) ||
    normalized.includes('firebasestorage.googleapis.com')
  );
}

function isFallbackErrorSrc(src: string | null | undefined): boolean {
  if (!src) return false;

  const assetName = src.split(/[?#]/, 1)[0].split('/').pop()?.toLowerCase();
  return assetName === 'banniere.avif' || assetName === 'banniere.png';
}

export function getAvatarSrc(
  src: string | null | undefined,
  gender?: AvatarGender
): string {
  const fallback = gender === 'femme' ? '/Avatar femme.png' : DEFAULT_AVATAR;

  if (!src) return fallback;

  const value = src.trim();
  if (!value) return fallback;

  if (isLegacyAsset(value, 'twitter-avatar')) return fallback;

  const fileName = value.split(/[?#]/, 1)[0].split('/').pop()?.toLowerCase();

  // Old default placeholder shipped with the clone.
  if (fileName === 'user.jpg') return fallback;

  const isRemote = /^(https?:)?\/\//i.test(value);
  const isLocal =
    value.startsWith('/') ||
    value.startsWith('data:') ||
    value.startsWith('blob:');

  // Anything that is not a real remote/local address (bare file name,
  // "null", "undefined", an expired "blob:" URL, ...) would render a broken
  // image, so fall back to the default avatar instead.
  if (!isRemote && !isLocal) return fallback;

  return value;
}

export function getBannerSrc(src: string | null | undefined): string {
  if (!src || isFallbackErrorSrc(src)) return DEFAULT_BANNER;

  const normalized = src.toLowerCase();
  return normalized.includes('twitter-banner') ||
    normalized.includes('firebasestorage.googleapis.com') ||
    normalized.endsWith('/banniere2.png')
    ? DEFAULT_BANNER
    : src;
}

export type AvatarImageOption = {
  /* Nom affiché sous la vignette. */
  name: string;
  /* Adresse de l'image : un fichier du site, ou un portrait distant. */
  src: string;
};

/* Photos de profil toutes prêtes : les deux avatars par défaut du site, puis
   quelques portraits dessinés que l'on peut choisir si on veut. */
export const avatarImageOptions: ReadonlyArray<AvatarImageOption> = [
  { name: 'Avatar homme', src: DEFAULT_AVATAR },
  { name: 'Avatar femme', src: '/Avatar femme.png' },
  {
    name: 'Froge',
    src: 'https://img.avatardecoration.com/avatars/froge_8.png'
  },
  {
    name: 'Grimma',
    src: 'https://img.avatardecoration.com/avatars/grimma_1.png'
  },
  {
    name: 'Klayden',
    src: 'https://img.avatardecoration.com/avatars/klayden_1.png'
  },
  {
    name: 'Scena',
    src: 'https://img.avatardecoration.com/avatars/scena_1.png'
  },
  {
    name: 'Megatron',
    src: 'https://img.avatardecoration.com/avatars/megatron_1.png'
  },
  {
    name: 'House',
    src: 'https://img.avatardecoration.com/avatars/house_1.png'
  },
  {
    name: 'Léon',
    src: 'https://img.avatardecoration.com/avatars/leon_2.png'
  }
];
