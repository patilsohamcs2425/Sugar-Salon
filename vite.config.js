import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { googleReviewsPlugin } from './vite-plugin-google-reviews.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    googleReviewsPlugin(),
  ],
  server: {
    host: true, // Exposes server to local Wi-Fi network for mobile access
    port: 5173,
  }
})