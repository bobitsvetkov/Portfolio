import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Portfolio/',
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code so content edits don't bust its cache.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor'
          if (/node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
          if (/node_modules\/(react-icons|lucide-react)\//.test(id)) return 'icons'
        },
      },
    },
  },
})
