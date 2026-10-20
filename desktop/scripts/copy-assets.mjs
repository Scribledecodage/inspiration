/**
 * Prépare les images de l'application de bureau.
 *
 * L'application reprend l'interface du site : elle a besoin des mêmes
 * images. Mais le site embarque des PNG de plusieurs mégaoctets (les
 * photos d'avatars, la bannière…), ce qui ferait grossir l'installateur
 * pour rien : à l'écran, un avatar de 256 pixels suffit.
 *
 * Ce script copie les images du site dans `desktop/public`, en les
 * redimensionnant. Le résultat est identique à l'œil, mais l'installateur
 * reste léger.
 *
 * Usage : node scripts/copy-assets.mjs
 */

import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
/* Les images du site… */
const source = resolve(here, '..', 'public');
/* …et leur version allégée, dans l'application de bureau. */
const target = join(here, 'public');

/* Largeur maximale de chaque image. */
const MAX_WIDTH = {
  'LogoSite.png': 256,
  'Logo192.png': 192,
  '404.png': 512,
  'Avatar femme.png': 256,
  'Avatar homme.png': 256,
  'Banniere.png': 1024,
  'Discussion.png': 512
};

/* Images trop lourdes et inutilisées dans l'application de bureau. */
const SKIPPED = [
  'BCC-2026-EXPLORER-PARIS--HIDDEN-GEMS-HEADER-MOBILE-aBAVxeBL.jpg'
];

if (!existsSync(target)) mkdirSync(target, { recursive: true });

let before = 0;
let after = 0;

for (const name of Object.keys(MAX_WIDTH)) {
  const from = join(source, name);

  if (!existsSync(from)) continue;

  before += statSync(from).size;

  const width = MAX_WIDTH[name];

  await sharp(from)
    .resize({ width, withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9, palette: true })
    .toFile(join(target, name));

  after += statSync(join(target, name)).size;

  console.log(
    `[assets] ${name} → ${width} px (${Math.round(
      statSync(from).size / 1024
    )} ko → ${Math.round(statSync(join(target, name)).size / 1024)} ko)`
  );
}

/* Les autres images (petites) sont copiées telles quelles. */
for (const name of [
  'Discussion.jpg',
  'Conversation.jpg',
  'Contact.webp',
  'home.png',
  'Notif.png',
  'ma.png',
  'Banniere.jpg',
  'Discussion.avif',
  'paris_non-ed_shutterstock_2614817413_mncfps.avif'
]) {
  const from = join(source, name);

  if (!existsSync(from)) continue;

  before += statSync(from).size;

  const { copyFileSync } = await import('node:fs');
  copyFileSync(from, join(target, name));

  after += statSync(join(target, name)).size;
}

console.log(
  `\n[assets] Total : ${(before / 1024 / 1024).toFixed(1)} Mo → ${(
    after / 1024
  ).toFixed(0)} ko`
);
console.log(`[assets] Ignorées : ${SKIPPED.join(', ')}`);
