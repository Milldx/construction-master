/*
  ═══════════════════════════════════════════════════════════
  КАСТОМНАЯ ДИРЕКТИВА v-reveal
  ═══════════════════════════════════════════════════════════

  Что это: директива — это как v-if или v-model, но мы пишем
  её сами. Vue даёт доступ к НАСТОЯЩЕМУ DOM-элементу (el) в
  момент его появления на странице — это то, чего не может
  computed или watch (они работают с данными, а не с DOM).

  Что делает: элемент с v-reveal невидим и сдвинут на 24px вниз.
  Как только он попадает в видимую часть экрана при скролле —
  плавно проявляется и встаёт на место.

  Как использовать в шаблоне:
    <div v-reveal>...</div>                  — без задержки
    <div v-reveal="200">...</div>             — задержка 200мс
    <div v-for="(x,i) in list" v-reveal="i*80">...</div>  — «по очереди»

  Технология внутри: IntersectionObserver — встроенный браузерный
  API, который сообщает, когда элемент входит в зону видимости.
  Это эффективнее, чем проверять scroll-позицию вручную в JS.
  ═══════════════════════════════════════════════════════════
*/

export const reveal = {
  // mounted — хук жизненного цикла директивы.
  // Вызывается один раз, когда элемент появляется в DOM.
  mounted(el, binding) {
    // 1. Начальное состояние: невидим, сдвинут вниз
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'

    // 2. binding.value — это то, что передано в v-reveal="ЗДЕСЬ".
    //    Если ничего не передано — задержки нет (0мс).
    const delay = typeof binding.value === 'number' ? binding.value : 0

    // 3. Наблюдатель следит, когда элемент входит в видимую область
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // isIntersecting === true, когда элемент показался на экране
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, delay)

            // Анимация должна сработать один раз — отключаем наблюдение
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 } // срабатывает, когда видно хотя бы 15% элемента
    )

    observer.observe(el)
  },
}
