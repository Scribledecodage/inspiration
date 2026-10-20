import type { AvatarShape, AvatarFrame } from '@lib/types/theme';

/* Formes d'image de profil proposées : le rond (par défaut), puis les formes
   découpées par les masques de la bibliothèque daisyUI (préfixés « dy- » pour
   ne rien changer au reste du site). */
export const avatarShapeOptions: ReadonlyArray<[AvatarShape, string]> = [
  ['circle', 'Rond'],
  ['squircle', 'Squircle'],
  ['heart', 'Cœur'],
  ['diamond', 'Losange'],
  ['hexagon', 'Hexagone']
];

/* Nom de chaque forme, y compris celles qu'on ne propose plus (les profils
   enregistrés avant gardent leur forme et son nom). */
export const avatarShapeLabels: Partial<Record<AvatarShape, string>> = {
  circle: 'Rond',
  square: 'Carré',
  squircle: 'Squircle',
  heart: 'Cœur',
  diamond: 'Losange',
  hexagon: 'Hexagone'
};

/* Cadres de l'avatar : « Aucun » ou une décoration d'avatar (image PNG posée
   autour de la photo, comme les décorations Discord). */
export const avatarFrameOptions: ReadonlyArray<[AvatarFrame, string]> = [
  ['none', 'Aucun'],
  ['clown', 'Clown'],
  ['warp_helmet', 'Casque spatial'],
  ['mokoko', 'Mokoko'],
  ['sakura_gyoiko', 'Sakura'],
  ['victory_crown', 'Couronne de vainqueur'],
  ['freezer_bunny_lovebug', 'Lapin des neiges'],
  ['tga_controller', 'Manette TGA'],
  ['shield_potion', 'Bouclier potion'],
  ['fuchsia_agent', 'Agent fuchsia'],
  ['wingmans_got_it', 'Wingman'],
  ['heart_to_heart', 'Cœur à cœur'],
  ['los_santos', 'Los Santos'],
  ['shadow', 'Ombre'],
  ['rec_room_lightning', 'Éclair Rec Room'],
  ['new_year_2025', 'Nouvel an 2025'],
  ['bush_camper', 'Buisson campeur'],
  ['hailey', 'Hailey']
];

/* Décorations d'avatar : l'image est posée autour de la photo, avec son
   centre transparent au niveau du visage. */
const frameDecorationSrc: Partial<Record<AvatarFrame, string>> = {
  clown: 'https://img.avatardecoration.com/decorations/im_a_clown.png',
  warp_helmet: 'https://img.avatardecoration.com/decorations/warp_helmet.png',
  mokoko: 'https://img.avatardecoration.com/decorations/mokoko.png',
  sakura_gyoiko:
    'https://img.avatardecoration.com/decorations/sakura_gyoiko.png',
  victory_crown:
    'https://img.avatardecoration.com/decorations/victory_crown.png',
  freezer_bunny_lovebug:
    'https://img.avatardecoration.com/decorations/freezer_bunny_lovebug.png',
  tga_controller:
    'https://img.avatardecoration.com/decorations/tga_controller.png',
  shield_potion:
    'https://img.avatardecoration.com/decorations/shield_potion.png',
  fuchsia_agent:
    'https://img.avatardecoration.com/decorations/fuchsia_agent.png',
  wingmans_got_it:
    'https://img.avatardecoration.com/decorations/wingmans_got_it.png',
  heart_to_heart:
    'https://img.avatardecoration.com/decorations/heart_to_heart.png',
  los_santos: 'https://img.avatardecoration.com/decorations/los_santos.png',
  shadow: 'https://img.avatardecoration.com/decorations/shadow.png',
  rec_room_lightning:
    'https://img.avatardecoration.com/decorations/rec_room_lightning.png',
  new_year_2025:
    'https://img.avatardecoration.com/decorations/new_year_2025.png',
  bush_camper:
    'https://img.avatardecoration.com/decorations/bush_camper.png',
  hailey: 'https://img.avatardecoration.com/decorations/hailey.png'
};

/* Masques daisyUI : ils s'appliquent au conteneur, qui découpe donc à la fois
   la photo et l'avatar de repli placé derrière. Le squircle a son propre
   masque : celui de la bibliothèque est presque un rond, invisible à cette
   taille (voir « .avatar-squircle » dans les styles). */
const shapeMaskClass: Partial<Record<AvatarShape, string>> = {
  square: 'dy-mask dy-mask-square',
  squircle: 'avatar-squircle',
  heart: 'dy-mask dy-mask-heart',
  diamond: 'dy-mask dy-mask-diamond',
  hexagon: 'dy-mask dy-mask-hexagon-2'
};

/* Anciennes formes : elles donnent le carré (net, sans coins arrondis). */
const legacyShapeClass = 'dy-mask dy-mask-square';

/* Classe à poser sur le conteneur de l'avatar (celui qui porte le masque,
   jamais la photo directement). */
export function getAvatarShapeClass(shape?: AvatarShape): string {
  if (!shape || shape === 'circle') return 'avatar-circle';
  return shapeMaskClass[shape] ?? legacyShapeClass;
}

/* Adresse de la décoration d'avatar choisie (aucune si le cadre est vide). */
export function getAvatarFrameDecoration(
  frame?: AvatarFrame
): string | undefined {
  return frame ? frameDecorationSrc[frame] : undefined;
}

/* Nom du cadre affiché (celui de la liste, sinon « Aucun »). */
export function getAvatarFrameLabel(frame?: AvatarFrame): string {
  return (
    avatarFrameOptions.find(([frameKey]) => frameKey === frame)?.[1] ?? 'Aucun'
  );
}

/* La forme est-elle découpée par un masque (et non un simple rond) ? Les
   formes masquées ne supportent ni bordure ni fond supplémentaires : ils
   seraient découpés et laisseraient des vides autour de la photo. */
export function isMaskedAvatarShape(shape?: AvatarShape): boolean {
  return getAvatarShapeClass(shape) !== 'avatar-circle';
}
