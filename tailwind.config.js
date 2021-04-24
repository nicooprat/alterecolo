/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const typography = require('@tailwindcss/typography')

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        primary: colors.green,
        neutral: colors.blueGray,
        yellow: colors.yellow,
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '520px',
      },
    },
  },
  plugins: [typography],
}
