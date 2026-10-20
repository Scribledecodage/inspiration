import type { FontType } from './types/theme';

/**
 * Polices proposées dans le menu Apparence.
 *
 * Quatre familles professionnelles, dessinées pour les interfaces et
 * parfaitement lisibles en français. Les anciennes valeurs enregistrées
 * (« outfit », « chirp ») sont converties automatiquement par
 * `normalizeFont` afin de ne jamais casser un profil existant.
 */
export const DEFAULT_FONT: FontType = 'inter';

export const fontStacks: Record<FontType, string> = {
  inter: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  manrope: "'Manrope', 'Inter', system-ui, sans-serif",
  jakarta: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  plex: "'IBM Plex Sans', 'Inter', system-ui, sans-serif"
};

export type FontOption = {
  key: FontType;
  label: string;
  description: string;
};

export const fontOptions: Readonly<FontOption[]> = [
  {
    key: 'inter',
    label: 'Inter',
    description: 'Neutre et précise, la référence des interfaces modernes.'
  },
  {
    key: 'manrope',
    label: 'Manrope',
    description: 'Géométrique et contemporaine, avec beaucoup de caractère.'
  },
  {
    key: 'jakarta',
    label: 'Plus Jakarta Sans',
    description: 'Chaleureuse et éditoriale, agréable à lire au quotidien.'
  },
  {
    key: 'plex',
    label: 'IBM Plex Sans',
    description: 'Technique et soignée, pensée pour les longs contenus.'
  }
];

const availableFonts = fontOptions.map(({ key }) => key);

export function normalizeFont(font: string | null | undefined): FontType {
  if (availableFonts.includes(font as FontType)) return font as FontType;

  /* Anciens choix : Outfit était la police des titres, Chirp la police
     « maison ». On les remplace par les équivalents les plus proches. */
  if (font === 'outfit') return 'manrope';
  if (font === 'chirp') return 'inter';

  return DEFAULT_FONT;
}
