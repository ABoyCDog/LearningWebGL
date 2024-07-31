import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    // env: {
    //   browser: true,
    //   node: true,
    //   es6: true,
    // },
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
        modules: true,
        experimentalObjectRestSpread: true,
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/no-v-text': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
    },
  },
];
