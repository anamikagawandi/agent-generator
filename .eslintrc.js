module.exports = {
  extends: '@spotify/eslint-config-base/es6',
  env: {
    jest: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  overrides: [{
    files: ['*.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    extends: [
      '@spotify/eslint-config-base',
      '@spotify/eslint-config-typescript',
      'prettier',
    ],
    plugins: ['prettier', 'import'],
    rules: {
      'prettier/prettier': 'error',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',
      'no-console': 'off',
      'import/extensions': ['error', 'never', { json: 'always' }],
      'import/no-unresolved': 'off',
      "new-cap": 0,
    },
  }],
};
