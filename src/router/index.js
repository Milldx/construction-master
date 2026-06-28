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
})

/*
  ПОЧЕМУ НЕ scrollBehavior:
  Опция scrollBehavior (которая была здесь раньше) асинхронно ждёт
  завершения навигации и решает, куда скроллить. Но у нас в App.vue
  переходы между страницами обёрнуты в <Transition mode="out-in"> —
  он ЗАДЕРЖИВАЕТ появление новой страницы до конца анимации исчезновения
  старой. Из-за этой задержки scrollBehavior иногда "стрелял" слишком
  рано или слишком поздно — итог: пользователь оставался проскроленным
  туда, где был на ПРЕДЫДУЩЕЙ странице, а если новая страница короче —
  видел пустоту внизу.

  router.afterEach — более грубый, но надёжный инструмент: выполняется
  сразу после того, как маршрут точно сменился, не дожидаясь анимаций.
*/
router.afterEach((to) => {
  // Если в адресе НЕТ query.scrollTo — это обычный переход,
  // сбрасываем скролл наверх.
  // Если query.scrollTo ЕСТЬ — это переход "вернуться на главную
  // и докрутить до якоря" (см. NavBar.vue/FooterSection.vue) —
  // в этом случае скролл к нужному месту делает HomeView.vue сам,
  // здесь его не трогаем.
  if (!to.query.scrollTo) {
    window.scrollTo(0, 0)
  }
})

export default router
