import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // base — должен совпадать с именем твоего GitHub-репозитория.
  // Если репозиторий называется НЕ "construction-master" — поменяй строку ниже!
  // Пример: репозиторий "my-repair-site" → base: '/my-repair-site/'
  base: '/construction-master/',
})
