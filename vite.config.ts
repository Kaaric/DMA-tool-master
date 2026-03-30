import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Diese Zeile sorgt dafür, dass die Pfade bei Strato stimmen
  plugins: [vue()],
})