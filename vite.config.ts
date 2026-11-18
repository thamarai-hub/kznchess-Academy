import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Two pages: the home page and /donate/.
      input: {
        main: resolve(root, 'index.html'),
        donate: resolve(root, 'donate/index.html'),
      },
    },
  },
});
