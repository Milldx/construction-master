import { createApp } from 'vue'
import './assets/style.css'   // Глобальные стили (CSS-переменные, reset)
import App from './App.vue'
import router from './router/index.js'
import { reveal } from './directives/reveal.js'

const app = createApp(App)

// Регистрируем директиву v-reveal глобально —
// теперь её можно использовать в ЛЮБОМ компоненте без импорта
app.directive('reveal', reveal)

app.use(router).mount('#app')
