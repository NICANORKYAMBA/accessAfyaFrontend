import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': './src/components',
      '@styles': './src/styles',
      '@graphql': './src/graphql',
      '@utils': './src/utils',
    },
  },
  optimizeDeps: {
    include: ['@apollo/client', '@apollo/client/link/context'],
    exclude: ['apollo-upload-client'],
  },
});