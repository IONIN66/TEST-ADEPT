import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/TEST-ADEPT",
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      store: "/src/store",
      constants: "/src/constants",
      style: "/src/style"
    }
  }
})
