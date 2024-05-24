module.exports = {
  overrides: [
    {
      files: ['**/*.{ts|tsx}'],
      rules: {
        'max-lines-per-function': [1, { max: 200, skipBlankLines: true, skipComments: true }],
      },
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
      rules: {
        'max-lines-per-function': [1, { max: 500, skipBlankLines: true, skipComments: true }],
        'max-nested-callbacks': [1, 8],
        'no-console': 0,
      },
    },
  ],
  settings: {},
  plugins: ['simple-import-sort', 'prettier'],
  extends: ['standard', 'plugin:prettier/recommended'],
  globals: {
    fetch: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Overwrite rules specified from the extended configs or add ones
    // Prettier
    'prettier/prettier': [1, { endOfLine: 'auto' }],
    // Tailwind
    'tailwindcss/classnames-order': 0,
    // 'tailwindcss/no-custom-classname': [
    //   2,
    //   {
    //     config: './tailwind.config.cjs',
    //     callees: ['cx', 'classnames', 'clsx', 'cva', 'tw', 'makeVariants'],
    //     whitelist: ['sb-unstyled'],
    //   },
    // ],
    // import
    'import/no-absolute-path': 0,
    'import/exports-last': 0,
    // simple-import-sort
    'simple-import-sort/imports': 1,
    // Misc
    'array-callback-return': 1,
    complexity: [1, 8],
    curly: [1, 'multi-line'],
    'max-lines': [1, { max: 300, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': [1, { max: 100, skipBlankLines: true, skipComments: true }],
    'max-depth': [2, 5],
    'max-nested-callbacks': [1, 5],
    'newline-before-return': 1,
    'no-console': [1, { allow: ['error'] }],
    'no-debugger': 1,
    'no-nested-ternary': 2,
    'no-shadow': 0,
    'no-unneeded-ternary': 2,
    'no-unused-expressions': [1, { allowShortCircuit: true }],
    'no-use-before-define': 0,
    'no-var': 2,
    quotes: [1, 'single', { allowTemplateLiterals: false, avoidEscape: true }],
    'space-before-function-paren': [
      1,
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
  },
}
