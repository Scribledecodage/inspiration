/**
 * Publication d'une version de l'application de bureau.
 *
 * Étapes :
 *   1. compilation de l'interface puis du binaire Rust ;
 *   2. signature des artefacts de mise à jour (clé privée locale) ;
 *   3. génération du manifeste `latest.json` lu par l'application.
 *
 * L'application vérifie la signature de chaque paquet : une mise à jour
 * non signée, ou signée avec une autre clé, est refusée. C'est ce qui
 * rend la mise à jour automatique sûre.
 *
 * Usage : npm run release -- [--notes "texte des notes"]
 */

import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const bundleDir = join(root, 'src-tauri', 'target', 'release', 'bundle');

/* La clé privée ne quitte jamais la machine : elle est lue ici, et
   n'est jamais écrite dans le dépôt. */
const keyPath = join(root, '.keys', 'inspiration.key');
const passwordPath = join(root, '.keys', 'password.txt');

const notesIndex = process.argv.indexOf('--notes');
const notes =
  notesIndex !== -1 && process.argv[notesIndex + 1]
    ? process.argv[notesIndex + 1]
    : 'Nouvelles corrections et améliorations.';

if (!existsSync(keyPath)) {
  console.error(
    '\n[release] Clé de signature introuvable : .keys/inspiration.key\n' +
      'Générez-la avec : npx tauri signer generate -w .keys/inspiration.key\n'
  );
  process.exit(1);
}

const config = JSON.parse(
  readFileSync(join(root, 'src-tauri', 'tauri.conf.json'), 'utf8')
);

const version = config.version;

/* On appelle le CLI Tauri par son chemin : sur Windows, `npx` est un
   script .cmd que l'exécution directe ne trouve pas. */
const tauriCli = join(root, 'node_modules', '@tauri-apps', 'cli', 'tauri.js');

if (!existsSync(tauriCli)) {
  console.error(
    '\n[release] CLI Tauri introuvable. Lancez d’abord : npm install\n'
  );
  process.exit(1);
}

console.log(`[release] Construction de la version ${version}…`);

execFileSync(process.execPath, [tauriCli, 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    TAURI_SIGNING_PRIVATE_KEY: keyPath,
    TAURI_SIGNING_PRIVATE_KEY_PASSWORD: existsSync(passwordPath)
      ? readFileSync(passwordPath, 'utf8').trim()
      : ''
  }
});

/* Les artefacts produits : l'installateur NSIS (l'application) et son
   fichier de signature. Les noms changent avec la version : on cherche
   donc les fichiers plutôt que de les deviner. */
const artifacts = [
  {
    directory: join(bundleDir, 'nsis'),
    key: 'windows-x86_64',
    match: (name) => name.endsWith('-setup.exe')
  }
];

const platforms = {};

for (const artifact of artifacts) {
  if (!existsSync(artifact.directory)) continue;

  const file = readdirSync(artifact.directory).find((name) =>
    artifact.match(name)
  );

  if (!file) continue;

  const path = join(artifact.directory, file);
  const signatureFile = `${path}.sig`;

  if (!existsSync(signatureFile)) {
    console.warn(`[release] Signature absente pour ${file} : ignorée.`);
    continue;
  }

  platforms[artifact.key] = {
    signature: readFileSync(signatureFile, 'utf8').trim(),
    url: `https://github.com/ccrsxx/twitter-clone/releases/download/v${version}/${file}`
  };
}

if (!Object.keys(platforms).length) {
  console.error(
    '\n[release] Aucun artefact signé trouvé.\n' +
      'Vérifiez que bundle.createUpdaterArtifacts vaut true et que la clé est chargée.\n'
  );
  process.exit(1);
}

const manifest = {
  version,
  notes,
  pub_date: new Date().toISOString(),
  platforms
};

const outputDir = join(root, 'release');
mkdirSync(outputDir, { recursive: true });

const manifestPath = join(outputDir, 'latest.json');
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log('\n[release] Terminé.');
console.log(`[release] Manifeste : ${manifestPath}`);
console.log(
  '[release] À TELEVERSER sur la release GitHub « v' +
    version +
    ' » du dépôt ccrsxx/twitter-clone :\n' +
    '  - l’installateur (…-setup.exe) et sa signature (…-setup.exe.sig)\n' +
    '  - latest.json (à la racine de la release)\n'
);
console.log(
  '[release] L’application vérifiera la signature avant d’installer la mise à jour.'
);
