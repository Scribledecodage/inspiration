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

console.log(`[version] ${clean}`);
