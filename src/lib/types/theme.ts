export type Theme = 'auto' | 'light' | 'dim' | 'dark';
export type Accent = 'blue' | 'indigo' | 'pink' | 'purple' | 'red' | 'green';
export type FontType =
  /* Polices proposées dans le menu Apparence. */
  'inter' | 'manrope' | 'jakarta' | 'plex';
export type AvatarShape =
  /* Rond (par défaut). */
  | 'circle'
  /* Les formes ci-dessous sont découpées par les masques de la bibliothèque
     daisyUI (carré net, squircle, cœur, losange, hexagone). */
  | 'square'
  | 'squircle'
  | 'heart'
  | 'diamond'
  | 'hexagon'
  /* Anciennes formes (fleur, nuage, ovale, rosette, carré arrondi, étoile,
     pentagone, décagone, triangle) : conservées pour les profils enregistrés
     avant, elles donnent le carré. */
  | 'flower'
  | 'cloud'
  | 'oval'
  | 'rosette'
  | 'rounded-square'
  | 'star'
  | 'pentagon'
  | 'decagon'
  | 'triangle';
export type AvatarFrame =
  /* Aucun cadre (par défaut). */
  | 'none'
  /* Décorations d'avatar (images PNG posées autour de la photo), comme les
     décorations Discord. */
  | 'clown'
  | 'warp_helmet'
  | 'mokoko'
  | 'sakura_gyoiko'
  | 'victory_crown'
  | 'freezer_bunny_lovebug'
  | 'tga_controller'
  | 'shield_potion'
  | 'fuchsia_agent'
  | 'wingmans_got_it'
  | 'heart_to_heart'
  | 'los_santos'
  | 'shadow'
  | 'rec_room_lightning'
  | 'new_year_2025'
  | 'bush_camper'
  | 'hailey'
  /* Anciens cadres (halo, anneau, double, dégradé, pointillé, néon, or) :
     conservés pour les profils enregistrés avant, ils ne dessinent plus rien. */
  | 'halo'
  | 'ring'
  | 'double'
  | 'gradient'
  | 'glow'
  | 'dashed'
  | 'neon'
  | 'gold';
