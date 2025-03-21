import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.spec.ts'],
    exclude: [],
    coverage: {
      exclude: ['bin', 'dist', 'eslint.config.mts', 'vitest.config.ts'],
      provider: 'istanbul',
      reporter: ['text', 'json-summary'],
    },
  },
});
