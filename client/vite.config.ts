// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Optional: set the output directory to 'build' (CRA's default)
  build: {
    outDir: 'dist',
  },
  // Optional: automatically open the app on server start
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@state': path.resolve(__dirname, './src/state'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});
