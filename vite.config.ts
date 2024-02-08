import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/fast-track-challenge',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/infrastructure/assets/scss/abstracts/abstracts.scss";
        @import "@/infrastructure/assets/scss/main.scss";
        `
      }
    }
  }
})
