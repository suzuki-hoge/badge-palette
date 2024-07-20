import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest'
import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [react(), crx({ manifest })],
});
