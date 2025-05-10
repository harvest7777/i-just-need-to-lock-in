import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  use: {
    // Load your saved login state here
    storageState: path.resolve(__dirname, './user.json'),
    baseURL: 'http://localhost:3000',
  },
});
