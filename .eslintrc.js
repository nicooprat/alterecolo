module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'vue/attribute-hyphenation': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/script-setup-uses-vars': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  ignorePatterns: ['dist'],
}
