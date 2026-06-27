import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllProjectsView from '../views/AllProjectsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    // Вторая страница — «Все объекты»
    path: '/projects',
    name: 'projects',
    component: AllProjectsView
  }
  // В будущем сюда можно добавить страницу «Спасибо за заявку»:
  // { path: '/thank-you', name: 'thank-you', component: ThankYouView }
]

const router = createRouter({
  // createWebHashHistory — добавляет # в URL (например, site.com/#/projects)
  // Это важно для GitHub Pages: без него обновление страницы даёт 404
  history: createWebHashHistory(),
  routes,

  // Прокрутка наверх при переходе между маршрутами
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
