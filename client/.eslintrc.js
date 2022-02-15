module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'indent': ['error', 2, { offsetTernaryExpressions: false }],
    'semi': [2, 'never'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ],
    'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'multiline-ternary': [0, 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'react/display-name': 'off'
  }
}
