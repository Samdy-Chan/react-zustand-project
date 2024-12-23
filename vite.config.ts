import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // self added
  root: './',
  resolve: {
    // configure for path alias
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // configure for omit the extension when importing the following files
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.json'],
  },
});
