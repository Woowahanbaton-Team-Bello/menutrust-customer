import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// API는 VITE_API_BASE_URL(절대 URL)로 직접 호출한다(src/api/publicMenu.js).
export default defineConfig({
  plugins: [react()],
})
