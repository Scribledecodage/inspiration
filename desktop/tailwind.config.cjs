/* Configuration Tailwind de l'application de bureau.
 *
 * Elle reprend celle du site (mêmes couleurs, mêmes polices, mêmes
 * variantes) et ne change qu'une chose : les fichiers à analyser.
 *
 * `relative: true` est indispensable : par défaut, Tailwind résout les
 * chemins depuis le dossier courant (celui de l'application de bureau), et
 * non depuis le fichier de configuration — aucune classe n'était donc
 * générée, et la page s'affichait sans aucun style.
 */
const path = require('path');

const site = path.resolve(__dirname, '..');
const base = require(path.join(site, 'tailwind.config.js'));

module.exports = {
  ...base,
  content: {
    relative: true,
    files: [
      '../src/pages/**/*.tsx',
      '../src/components/**/*.tsx',
      '../src/lib/**/*.ts',
      './src/**/*.tsx'
    ]
  }
};
