/*
  Génère src/components/ui/material-icons.ts à partir du paquet npm
  @material-symbols/svg-400 (Google Material Symbols, licence Apache-2.0).

  Chaque icône est reprise dans ses deux états, exactement comme les paires
  contour/plein d'Heroicons :
    - « contour »  -> <nom>.svg        (état repos)
    - « plein »    -> <nom>-fill.svg   (état actif, ex. onglet sélectionné)

  Régénérer après avoir ajouté une icône à la liste ICONS :
    npm run icons:material
*/
const fs = require('fs');
const path = require('path');

/** Variante de tracé utilisée dans toute l'application. */
const STYLE = 'rounded';

const SOURCE = path.join(
  __dirname,
  '..',
  'node_modules',
  '@material-symbols',
  'svg-400',
  STYLE
);

const DEST = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'ui',
  'material-icons.ts'
);

/** Noms officiels Material Symbols réellement utilisés dans l'application. */
const ICONS = [
  'accessibility',
  'add',
  'ads_click',
  'alternate_email',
  'arrow_back',
  'arrow_forward',
  'auto_awesome_mosaic',
  'bar_chart',
  'block',
  'bolt',
  'bookmark',
  'bookmark_remove',
  'calendar_month',
  'campaign',
  'call',
  'chat_bubble',
  'check',
  'check_circle',
  'chevron_left',
  'chevron_right',
  'close',
  'close_fullscreen',
  'content_copy',
  'dashboard_customize',
  'delete',
  'description',
  'download',
  'edit',
  'edit_square',
  'favorite',
  'flag',
  'gif_box',
  'gpp_bad',
  'group',
  'help',
  'home',
  'image',
  'info',
  'ios_share',
  'key',
  'keyboard_arrow_down',
  'keyboard_arrow_up',
  'link',
  'location_on',
  'lock',
  'logout',
  'mail',
  'menu',
  'mobile',
  'mood',
  'more_horiz',
  'north_east',
  'notifications',
  'open_in_new',
  'open_in_full',
  'palette',
  'pause',
  'payments',
  'pending',
  'person',
  'person_add',
  'person_remove',
  'photo_camera',
  'pie_chart',
  'play_arrow',
  'power_settings_new',
  'public',
  'redeem',
  'refresh',
  'repeat',
  'search',
  'send',
  'settings',
  'smart_toy',
  'sms',
  'space_dashboard',
  'star',
  'subscriptions',
  'support_agent',
  'translate',
  'tune',
  'upload',
  'verified',
  'verified_user',
  'visibility',
  'visibility_off',
  'volume_up',
  'warning'
];

/** Extrait le viewBox et les tracés d'un fichier .svg Material Symbols. */
const litIcone = (nom, plein) => {
  const fichier = path.join(SOURCE, nom + (plein ? '-fill' : '') + '.svg');
  if (!fs.existsSync(fichier)) return null;

  const svg = fs.readFileSync(fichier, 'utf8');
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 -960 960 960';
  const traces = [...svg.matchAll(/<path[^>]*?\sd="([^"]+)"/g)].map(
    (m) => m[1]
  );

  return { viewBox, traces };
};

const manquantes = [];
const blocs = [];

for (const nom of ICONS) {
  const contour = litIcone(nom, false);
  const plein = litIcone(nom, true);

  if (!contour || !plein) {
    manquantes.push(
      nom + (contour ? '' : ' (contour)') + (plein ? '' : ' (plein)')
    );
    continue;
  }

  const lignes = (cle, { viewBox, traces }) =>
    `    ${cle}: {\n` +
    `      viewBox: '${viewBox}',\n` +
    `      traces: [\n` +
    traces.map((d) => `        '${d}'`).join(',\n') +
    `\n      ]\n` +
    `    }`;

  blocs.push(
    `  ${nom}: {\n${lignes('contour', contour)},\n${lignes(
      'plein',
      plein
    )}\n  }`
  );
}

if (manquantes.length) {
  console.error(
    'Icônes introuvables dans ' + STYLE + ' : ' + manquantes.join(', ')
  );
  const toutes = fs.readdirSync(SOURCE).filter((f) => !f.endsWith('-fill.svg'));
  for (const nom of manquantes) {
    const racine = nom.replace(/ \(.*\)$/, '');
    const proches = toutes
      .filter((f) => f.includes(racine.split('_')[0]))
      .slice(0, 12)
      .map((f) => f.replace('.svg', ''));
    console.error('  → pistes pour « ' + racine + ' » : ' + proches.join(', '));
  }
  process.exit(1);
}

const contenu =
  `/*\n` +
  `  Fichier GÉNÉRÉ — ne pas modifier à la main.\n` +
  `  Source : @material-symbols/svg-400 (Google Material Symbols, Apache-2.0).\n` +
  `  Régénérer avec : npm run icons:material\n` +
  `*/\n\n` +
  `export type MaterialIconPaths = {\n` +
  `  viewBox: string;\n` +
  `  traces: readonly string[];\n` +
  `};\n\n` +
  `export const materialIconPaths = {\n` +
  blocs.join(',\n') +
  `\n} as const;\n`;

fs.writeFileSync(DEST, contenu, 'utf8');
console.log(
  'OK — ' +
    blocs.length +
    ' icônes écrites dans ' +
    path.relative(process.cwd(), DEST) +
    ' (' +
    (Buffer.byteLength(contenu, 'utf8') / 1024).toFixed(1) +
    ' Ko)'
);
