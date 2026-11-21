import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The frontend calls the API under /api. During development Vite forwards those
// requests to Spring Boot on :8080 (stripping the /api prefix), so the browser
// only ever talks to one origin and the backend needs no CORS configuration.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
