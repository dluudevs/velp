module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  // extends configs
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // list plugins
  plugins: ['prettier'],
  // https://eslint.org/docs/rules/
  rules: {
    'react/jsx-max-props-per-line': [
      1,
      {
        maxiumum: 2,
        when: 'always',
      },
    ],
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
  },
};
