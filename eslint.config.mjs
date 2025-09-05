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
    globals: {
      // Nuxt core
      defineNuxtConfig: 'readonly',
      defineNuxtPlugin: 'readonly',
      defineNuxtRouteMiddleware: 'readonly',
      defineEventHandler: 'readonly',
      defineLazyEventHandler: 'readonly',
      useRuntimeConfig: 'readonly',
      useAppConfig: 'readonly',
      useState: 'readonly',
      useNuxtApp: 'readonly',
      useRoute: 'readonly',
      useRouter: 'readonly',
      useAsyncData: 'readonly',
      useFetch: 'readonly',
      useLazyFetch: 'readonly',
      useCookie: 'readonly',
      useRequestHeaders: 'readonly',
      useHead: 'readonly',
      useSeoMeta: 'readonly',
      useBody: 'readonly',
      useQuery: 'readonly',
      useParams: 'readonly',
      navigateTo: 'readonly',
      abortNavigation: 'readonly',
      addRouteMiddleware: 'readonly',
      definePayloadPlugin: 'readonly',

      // Vue (template setup / composables)
      ref: 'readonly',
      reactive: 'readonly',
      computed: 'readonly',
      watch: 'readonly',
      watchEffect: 'readonly',
      onMounted: 'readonly',
      onUnmounted: 'readonly',
      onBeforeMount: 'readonly',
      onBeforeUnmount: 'readonly',
      onBeforeUpdate: 'readonly',
      onUpdated: 'readonly',
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
      h: 'readonly',
      resolveComponent: 'readonly',

      // Pinia
      usePostStore: 'readonly',
    },
  },
  rules: {
    // Prettier
    'prettier/prettier': 'error',

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
