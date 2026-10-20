/**
 * Aligne la version de l'application sur celle du tag publié.
 *
 * Usage : node scripts/set-version.mjs 1.0.1
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const version = process.argv[2];

if (!version) {
  console.error('Usage : node scripts/set-version.mjs <version>');
  process.exit(1);
}

const clean = version.replace(/^v/, '');

/* La configuration Tauri porte la version de l'installateur. */
const configPath = join(here, 'src-tauri', 'tauri.conf.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));

config.version = clean;

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

/* Le paquet de l'interface suit la même version. */
const packagePath = join(here, 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

packageJson.version = clean;

writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

/* Le crate Rust porte lui aussi une version : c'est elle que Windows affiche
   dans la liste des applications installées, et celle inscrite dans le
   fichier de l'exécutable. Sans cette mise à jour, l'application installée
   continuait de se présenter en 1.0.0. */
const cargoPath = join(here, 'src-tauri', 'Cargo.toml');
const cargo = readFileSync(cargoPath, 'utf8');

/* Seule la version du paquet est touchée : une dépendance peut elle aussi
   porter une ligne « version = … ». */
const section = cargo.match(/\[\s*package\s*\][\s\S]*?^version\s*=\s*"[^"]*"/m);

if (section) {
  const updated = cargo.replace(
    section[0],
    section[0].replace(/version\s*=\s*"[^"]*"/, 'version = "' + clean + '"')
  );

  writeFileSync(cargoPath, updated);
} else console.warn('[version] Section [package] introuvable dans Cargo.toml.');

console.log(`[version] ${clean}`);
