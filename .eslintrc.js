// module.exports = {
//   parser: '@typescript-eslint/parser', // Specifies the ESLint parser
//   parserOptions: {
//     ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
//     sourceType: 'module', // Allows for the use of imports
//   },
//   extends: [
//     'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
//     'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
//     'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
//   ],
//   rules: {
//     // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
//     // e.g. "@typescript-eslint/explicit-function-return-type": "off",
//   },
// }

const path = require('path');
const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  plugins: ['sort-class-members', 'import', 'prettier', 'vue'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    'arrow-body-style': 'off',
    camelcase: [
      'error',
      {
        properties: 'always',
      },
    ],
    'consistent-return': 'off',
    curly: ['error', 'all'],
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-relative-parent-imports': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': IS_DEV ? 'warn' : 'error',
    'no-debugger': IS_DEV ? 'warn' : 'error',
    'no-return-assign': ['error', 'always'],
    'object-curly-newline': 'off',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: false,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        printWidth: 120,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
    radix: ['error', 'always'],
    'sort-class-members/sort-class-members': [
      'error',
      {
        accessorPairPositioning: 'getThenSet',
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[methods]',
          '[conventional-private-methods]',
        ],
      },
    ],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  overrides: [
    {
      files: ['src/store/*'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
    {
      files: ['**/__tests__/*.js', '**/__mocks__/*.js', '**/tests/unit/**/*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  settings: {
    'import/core-modules': ['path', 'os'],
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, './src')]],
        extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
      },
    },
  },
};
