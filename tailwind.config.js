/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['src/pages/**/*.tsx', 'src/components/**/*.tsx', 'src/lib/**/*.ts'],
  theme: {
    screens: {
      xs: '500px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-main)', 'Inter', 'system-ui', 'sans-serif'],
        title: ['var(--font-title)', 'Inter', 'system-ui', 'sans-serif'],
        brand: ['Outfit', 'Manrope', 'sans-serif']
      },
      // prettier-ignore
      colors: {
        'main-primary': 'rgb(var(--main-primary) / <alpha-value>)',
        'main-secondary': 'rgb(var(--main-secondary) / <alpha-value>)',
        'main-background': 'rgb(var(--main-background) / <alpha-value>)',
        'main-search-background': 'rgb(var(--main-search-background) / <alpha-value>)',
        'main-sidebar-background': 'rgb(var(--main-sidebar-background) / <alpha-value>)',
        'main-accent': 'rgb(var(--main-accent) / <alpha-value>)',
        'accent-yellow': 'rgb(var(--accent-yellow) / <alpha-value>)',
        'accent-blue': 'rgb(var(--accent-blue) / <alpha-value>)',
        'accent-indigo': 'rgb(var(--accent-indigo) / <alpha-value>)',
        'accent-pink': 'rgb(var(--accent-pink) / <alpha-value>)',
        'accent-purple': 'rgb(var(--accent-purple) / <alpha-value>)',
        'accent-orange': 'rgb(var(--accent-orange) / <alpha-value>)',
        'accent-green': 'rgb(var(--accent-green) / <alpha-value>)',
        'accent-red': '#F4212E',
        'dark-primary': 'rgb(var(--dark-primary) / <alpha-value>)',
        'dark-secondary': 'rgb(var(--dark-secondary) / <alpha-value>)',
        'light-primary': 'rgb(var(--light-primary) / <alpha-value>)',
        'light-secondary': 'rgb(var(--light-secondary) / <alpha-value>)',
        'dark-border': 'rgb(var(--dark-border) / <alpha-value>)',
        'light-border': 'rgb(var(--light-border) / <alpha-value>)',
        'dark-line-reply': 'rgb(var(--dark-line-reply) / <alpha-value>)',
        'light-line-reply': 'rgb(var(--light-line-reply) / <alpha-value>)',
        'twitter-icon': '#D6D9DB',
        'image-preview-hover': '#272C30',
      }
    }
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('inner', '& > *');
    },
    require('daisyui')
  ],
  // daisyUI n'est utilisé que pour ses masques (formes d'avatar : cœur, étoile,
  // losange, hexagone). Les thèmes, les styles de base et tout le reste sont
  // désactivés pour ne rien changer au reste de l'application.
  daisyui: {
    themes: [],
    logs: false,
    base: false,
    styled: true,
    utils: true,
    prefix: 'dy-'
  }
};
