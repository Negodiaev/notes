/** @type {Partial<CustomThemeConfig & {extend: Partial<CustomThemeConfig>}> & DefaultTheme} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        slideIn: {
          '0%': { bottom: '-100px', opacity: 0 },
          '75%': { bottom: '60px', opacity: 0.6 },
          '100%': { bottom: '60px', opacity: 1 },
        },
      },
      animation: {
        'slide-in': 'slideIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
