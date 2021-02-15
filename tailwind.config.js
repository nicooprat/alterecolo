const colors = require('tailwindcss/colors')
const { screens, gridTemplateColumns } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {},
    colors: {
      white: '#fff',
      primary: colors.green,
      neutral: colors.blueGray,
      yellow: colors.yellow,
    },
    fontFamily: {
      sans: [
        'Roboto',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Ubuntu',
        'Cantarell',
        'Noto Sans',
        'sans-serif',
        'BlinkMacSystemFont',
        '-apple-system',
        'Segoe UI',
        'sans-serif',
      ],
    },
    gridTemplateColumns: {
      ...gridTemplateColumns,
      list: 'repeat(auto-fit, minmax(16em, 1fr))',
    },
    screens: {
      ...screens,
      xs: '520px',
    },
  },
  variants: {
    ringWidth: ['hover', 'focus'],
  },
  plugins: [],
}
