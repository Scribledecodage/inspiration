/* Plugin de diagnostic : enregistre la feuille de style telle que PostCSS
   la recoit, avant le passage de Tailwind. */
module.exports = {
  postcssPlugin: 'dump',
  Once(root) {
    require('fs').writeFileSync('dump.css', root.toString());
  }
};
