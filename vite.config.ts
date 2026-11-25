import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/aps-cycle-1/', // à adapter au nom exact du repo si hébergé en sous-chemin
});
