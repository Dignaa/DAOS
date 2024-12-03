import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  base: '/', // Root path of your app
  plugins: [TanStackRouterVite(), react()],
  server: {
    port: 8080,
  },
});
