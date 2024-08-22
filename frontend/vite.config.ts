import { URL, fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
Object.assign(process.env, loadEnv(process.env.NODE_ENV || 'development', process.cwd(), ''));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: parseInt(process.env.PORT || '7200'),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @import "@/styles/1-abstracts/!all";
        `,
      },
    },
  },
});
