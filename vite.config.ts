import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'docs'   //輸出到docs
  },
  base: './',  //資源路徑改為相對
  server: {
    host: '0.0.0.0',
    port: 9030,
  },
})
