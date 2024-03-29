import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    }
  },
  build:{
    outDir:"../../dist/",
    emptyOutDir:true,
    chunkSizeWarningLimit: 1600,

  }
})
