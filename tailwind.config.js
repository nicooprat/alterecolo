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
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '520px',
      },
      boxShadow: {
        md: `
  0 0.8px 1.3px rgba(0, 0, 0, 0.07),
  0 2.7px 4.5px rgba(0, 0, 0, 0.042),
  0 12px 20px rgba(0, 0, 0, 0.028)
            `,
        dialog: `
            0 2.8px 2.2px rgba(0, 0, 0, 0.02),
            0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
            0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
            0 100px 80px rgba(0, 0, 0, 0.07)
            `,
      },
      transitionTimingFunction: {
        'in-dialog': 'cubic-bezier(1, 0, 1, 0.36)',
      },
    },
  },
  plugins: [typography],
}
