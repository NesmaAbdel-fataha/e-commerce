import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use '/' as base when deploying on Vercel (it serves from root).
// Keep '/e-commerce/' for GitHub Pages deployments (gh-pages).
const isVercel = !!process.env.VERCEL;
const basePath = isVercel ? '/' : '/e-commerce/';

export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
})