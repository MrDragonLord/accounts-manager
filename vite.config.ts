import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue',
      '.css',
    ],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap':fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url)),
    }
  }
})
