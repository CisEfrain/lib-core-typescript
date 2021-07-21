module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'objectLiteralProperty', format: ['snake_case', 'UPPER_CASE', 'camelCase'] }
    ]
  }
}
