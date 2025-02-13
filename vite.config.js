import tailwindcss from '@tailwindcss/vite'  // <-- ADD THIS LINE!
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
})