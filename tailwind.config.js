/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const typography = require('@tailwindcss/typography')

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    screens: {
      xs: '520px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        white: '#fff',
        primary: colors.green,
        neutral: colors.blueGray,
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
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
        'in-dialog': 'cubic-bezier(0.05, 1, 0.44, 1)',
      },
      transitionDuration: {
        10000: '10s',
      },
      typography: (theme) => ({
        light: {
          css: [
            {
              color: theme('colors.neutral.400'),
              '[class~="lead"]': {
                color: theme('colors.neutral.300'),
              },
              a: {
                color: theme('colors.white'),
              },
              strong: {
                color: theme('colors.white'),
              },
              'ol > li::before': {
                color: theme('colors.neutral.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.neutral.600'),
              },
              hr: {
                borderColor: theme('colors.neutral.200'),
              },
              blockquote: {
                color: theme('colors.neutral.200'),
                borderLeftColor: theme('colors.neutral.600'),
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.white'),
              },
              h3: {
                color: theme('colors.white'),
              },
              h4: {
                color: theme('colors.white'),
              },
              'figure figcaption': {
                color: theme('colors.neutral.400'),
              },
              code: {
                color: theme('colors.white'),
              },
              'a code': {
                color: theme('colors.white'),
              },
              pre: {
                color: theme('colors.neutral.200'),
                backgroundColor: theme('colors.neutral.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.neutral.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.neutral.600'),
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [typography],
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
}
