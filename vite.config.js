import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep images as separate files; do not base64-inline (clearer caching, no surprise “optimization”).
    assetsInlineLimit: 0,
  },
})
