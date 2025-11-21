import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/patients': 'http://localhost:3000',
      '/doctors': 'http://localhost:3000',
      '/appointments': 'http://localhost:3000',
    }
  }
})
