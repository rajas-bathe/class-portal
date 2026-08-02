import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Detect cloud hosts that serve from root
  const isCloudHost = process.env.VERCEL === '1' || process.env.NETLIFY === 'true';
  
  const isFirebase = process.env.FIREBASE === 'true'; // optional: set this in Firebase's build settings
  
  const base = (isCloudHost || isFirebase || mode === 'production' && !process.env.GH_PAGES) ? '/' : '/class-portal/';

  return {
    plugins: [react(), tailwindcss()],
    base: base,
  };
});