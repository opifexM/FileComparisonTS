import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

export default defineConfig({
  plugins: [eslint()],
  resolve: {
    alias: {
      '#src/*': resolve(__dirname, './src/*'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});