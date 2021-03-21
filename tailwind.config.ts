import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import { screens, gridTemplateColumns } from 'tailwindcss/defaultTheme'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  corePlugins: [],
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
      // Does not work for now https://github.com/windicss/windicss/issues/83
      list: 'repeat(auto-fit, minmax(16em, 1fr))',
    },
    screens: {
      ...screens,
      xs: '520px',
    },
  },
  plugins: [typography],
})
