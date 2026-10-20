const path = require('path');

/* Le site est à côté de ce dossier : on compile ses feuilles de style avec
   sa configuration Tailwind, en désignant explicitement les fichiers à
   analyser (sinon les chemins relatifs seraient pris depuis ce dossier, et
   aucune classe ne serait générée). */
const site = path.resolve(__dirname, '..');

/* Tailwind analyse les fichiers avec des globs : sur Windows, les chemins
   doivent être séparés par des slashs, sinon aucun fichier n'est trouvé. */
const glob = (...parts) => path.join(...parts).replace(/\\/g, '/');

module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(site, 'tailwind.config.js'),
      content: [
        glob(site, 'src/pages/**/*.tsx'),
        glob(site, 'src/components/**/*.tsx'),
        glob(site, 'src/lib/**/*.ts'),
        glob(__dirname, 'src/**/*.tsx')
      ]
    },
    autoprefixer: {}
  }
};
