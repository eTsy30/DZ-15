module.exports = {
    parser: 'babel-eslint',
    env: {
      browser: true,
      es6: true,
    },
    plugins: ['react', 'import', 'react-hooks', 'prettier'],
    extends: [
      'eslint-config-react-app',
      'eslint:recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],
    settings: {
      react: {
        version: '16.9.0',
      },
    },
    rules: {
      'no-console': 'error',
      semi: ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'no-extra-semi': 'off',
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'require-atomic-updates': 'off',
      'max-lines-per-function': ['error', 300],
      eqeqeq: ['error', 'always'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'react/display-name': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  }