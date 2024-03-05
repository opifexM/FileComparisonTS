import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslint()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8'
    },
  },
});