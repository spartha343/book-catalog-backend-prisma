/** @type {ESLint.FlatConfig[]} */
const config = [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
      },
      globals: {
        // Replace `env` with appropriate global variable definitions
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    rules: {
      'no-console': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type']
    }
  }
];

module.exports = config;
