// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import parserTs from '@typescript-eslint/parser';
import pluginTs from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default withNuxt({
  ignores: [
    '**/node_modules/**',
    '.output',
    '.nuxt',
    'dist',
    'commitlint.config.cjs',
    'eslint.config.mjs',
  ],
  plugins: {
    prettier: eslintPluginPrettier,
    '@typescript-eslint': pluginTs,
    vue: vuePlugin,
  },
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: parserTs,
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: process.cwd(),
    },
  },
  rules: {
    // Prettier
    'prettier/prettier': 'error',
    'no-undef': 'off',

    // Airbnb-like rules
    'no-console': 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
  },
});
