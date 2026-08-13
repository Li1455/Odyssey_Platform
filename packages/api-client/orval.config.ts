import { defineConfig } from 'orval';

export default defineConfig({
  odysseyApi: {
    input: {
      target: '../../services/backend/openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/api.ts',
      schemas: './src/generated/model',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: {
          path: './src/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },
});