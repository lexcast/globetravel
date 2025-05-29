import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@/*", replacement: resolve(__dirname, "./src/*") }]
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
