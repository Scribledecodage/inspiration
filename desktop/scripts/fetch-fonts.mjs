/**
 * Télécharge les polices du site pour les embarquer dans l'application.
 *
 * Sur le web, les polices viennent de Google Fonts. Dans une application de
 * bureau, mieux vaut les avoir sur le disque : l'application s'ouvre
 * instantanément, fonctionne hors connexion, et ne interroge pas Google à
 * chaque lancement.
 *
 * Usage : node scripts/fetch-fonts.mjs
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
/* Les polices sont rangées avec le code : Vite s'occupe de les copier
   (et de renommer les fichiers) quand il construit la feuille de style. */
const outputDir = join(here, 'src', 'fonts');

const FAMILIES = [
  'IBM+Plex+Sans:wght@400;500;600;700',
  'Inter:wght@400;500;600;700;800',
  'Manrope:wght@400;500;600;700;800',
  'Outfit:wght@500;600;700;800',
  'Plus+Jakarta+Sans:wght@400;500;600;700;800'
];

/* On ne garde que les alphabets latins : le site est en français. */
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']);

const url = `https://fonts.googleapis.com/css2?family=${FAMILIES.join(
  '&family='
)}&display=swap`;

/* Un navigateur moderne pour obtenir du woff2. */
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36'
};

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const response = await fetch(url, { headers });

if (!response.ok) {
  console.error(`[fonts] Téléchargement impossible (${response.status}).`);
  process.exit(1);
}

const css = await response.text();

/* Découpage des blocs @font-face. */
const blocks = css.split('@font-face').slice(1);

const rules = [];
let count = 0;

for (const block of blocks) {
  const subset = /\/\*\s*([a-z-]+)\s*\*\//.exec(css.slice(0, css.indexOf(block)))?.[1];
  const comment = block.match(/\/\*\s*([a-z-]+)\s*\*\//);
  const name = comment?.[1];

  if (name && !KEEP_SUBSETS.has(name)) continue;

  const family = /font-family:\s*'([^']+)'/.exec(block)?.[1];
  const weight = /font-weight:\s*(\d+)/.exec(block)?.[1];
  const style = /font-style:\s*(\w+)/.exec(block)?.[1] ?? 'normal';
  const source = /url\((https:[^)]+)\)/.exec(block)?.[1];
  const range = /unicode-range:\s*([^;]+);/.exec(block)?.[1];

  if (!family || !weight || !source) continue;

  const fileName = `${family.toLowerCase().replace(/\s+/g, '-')}-${weight}${
    name && name !== 'latin' ? `-${name}` : ''
  }.woff2`;

  const file = join(outputDir, fileName);

  if (!existsSync(file)) {
    const fontResponse = await fetch(source, { headers });

    if (!fontResponse.ok) {
      console.warn(`[fonts] Ignorée : ${fileName} (${fontResponse.status})`);
      continue;
    }

    writeFileSync(file, Buffer.from(await fontResponse.arrayBuffer()));
    count += 1;
  }

  rules.push(
    `@font-face {\n  font-family: '${family}';\n  font-style: ${style};\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('./${fileName}') format('woff2');${
      range ? `\n  unicode-range: ${range};` : ''
    }\n}`
  );
}

writeFileSync(join(outputDir, 'fonts.css'), `${rules.join('\n\n')}\n`);

console.log(`[fonts] ${count} fichier(s) téléchargé(s), ${rules.length} règle(s).`);
console.log(`[fonts] CSS : src/fonts/fonts.css`);
