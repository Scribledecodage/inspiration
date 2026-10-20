/**
 * Démarre les émulateurs Firebase depuis un dossier de travail situé HORS du
 * projet.
 *
 * Pourquoi ? Sur Windows, le renommage de dossier est bloqué dans certains
 * dossiers (ici le dossier du projet sous "Downloads") : la CLI échouait à la
 * fin de l'export des données avec
 *   EPERM: operation not permitted, rename 'firebase-export-…' -> '.emulator-data'
 * ce qui empêchait la persistance (les données étaient perdues au redémarrage).
 *
 * En lançant la CLI avec un CWD neutre et `--config <projet>/firebase.json`,
 * l'import/export fonctionne normalement.
 *
 * Usage : npm run emulators
 * Variable optionnelle : EMULATOR_DATA_DIR (dossier de données)
 */
'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
// Dossier "de travail" = CWD de la CLI (neutre, hors projet) : c'est là que
// l'émulateur écrit ses dossiers temporaires d'export avant de les renommer.
const workDir =
  process.env.EMULATOR_WORK_DIR ||
  path.join(os.homedir(), '.firebase-emulator-work');
// Dossier de données persistantes (import au démarrage / export à l'arrêt).
const dataDir =
  process.env.EMULATOR_DATA_DIR ||
  path.join(os.homedir(), '.firebase-emulator-data');
const configPath = path.join(projectDir, 'firebase.json');
const project = process.env.FIREBASE_PROJECT || 'mont2-tweet';

fs.mkdirSync(workDir, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

const args = [
  'emulators:start',
  '--config',
  configPath,
  '--only',
  'firestore,auth,storage',
  '--project',
  project,
  `--import=${dataDir}`,
  `--export-on-exit=${dataDir}`
];

console.log(`[emulators] configuration : ${configPath}`);
console.log(`[emulators] travail        : ${workDir}`);
console.log(`[emulators] données        : ${dataDir}`);
console.log(`[emulators] projet         : ${project}`);

const child = spawn('firebase', args, {
  cwd: workDir,
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => process.exit(code ?? 0));
