<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import LogoMark from './LogoMark.vue'

const navLinks = [
  { label: 'Услуги',      anchor: 'services'   },
  { label: 'Портфолио',   anchor: 'portfolio'  },
  { label: 'О мне',       anchor: 'advantages' },
  { label: 'Калькулятор', anchor: 'calculator' },
  { label: 'Цены',        anchor: 'prices'     },
  { label: 'Контакты',    anchor: 'contacts'   },
]

const isMobileOpen = ref(false)
const isScrolled   = ref(false)

// useRouter — для программных переходов (router.push)
// useRoute  — чтобы узнать, на какой странице мы сейчас находимся
const router = useRouter()
const route  = useRoute()

/*
  Раньше scrollTo просто искал элемент на странице — это работало,
  пока сайт был одностраничным. Теперь у нас 2 страницы, и якоря
  ("services", "portfolio" и т.д.) существуют только на главной.

  Поэтому: если мы НЕ на главной — сначала переходим на главную
  с пометкой query.scrollTo, а HomeView сам доскроллит после
  отрисовки (см. HomeView.vue). Если мы УЖЕ на главной — скроллим
  как раньше, без перехода.
*/
function scrollTo(id) {
  if (route.name !== 'home') {
    router.push({ path: '/', query: { scrollTo: id } })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  isMobileOpen.value = false
}

function goHome() {
  if (route.name !== 'home') {
    router.push('/')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleScroll() { isScrolled.value = window.scrollY > 40 }

onMounted(()  => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header class="navbar glass" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__inner container">

      <!-- ЛОГОТИП — минимализм: иконка-силуэт + текст -->
      <button class="navbar__logo" @click="goHome">
        <LogoMark :size="22" class="navbar__logo-icon" />
        МастерСтрой
      </button>

      <nav class="navbar__nav">
        <button v-for="link in navLinks" :key="link.anchor" class="navbar__link" @click="scrollTo(link.anchor)">
          {{ link.label }}
        </button>
      </nav>

      <div class="navbar__actions">
        <a href="tel:+79991234567" class="navbar__phone">+7 (999) 123-45-67</a>
        <button class="navbar__cta" @click="scrollTo('contacts')">Получить смету</button>
      </div>

      <button class="navbar__burger" @click="isMobileOpen = !isMobileOpen" aria-label="Меню">
        <AppIcon :name="isMobileOpen ? 'x-mark' : 'bars'" :size="20" />
      </button>
    </div>

    <div class="navbar__mobile glass" :class="{ 'navbar__mobile--open': isMobileOpen }">
      <div class="container navbar__mobile-inner">
        <button v-for="link in navLinks" :key="link.anchor" class="navbar__mobile-link" @click="scrollTo(link.anchor)">
          {{ link.label }}
        </button>
        <a href="tel:+79991234567" class="navbar__mobile-phone">+7 (999) 123-45-67</a>
        <button class="navbar__cta navbar__mobile-cta" @click="scrollTo('contacts')">Получить смету</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: rgba(14, 22, 38, 0.32) !important;
  border-top: none; border-left: none; border-right: none;
  transition: background 0.3s, box-shadow 0.3s;
}

.navbar--scrolled {
  background: rgba(14, 22, 38, 0.68) !important;
  box-shadow: var(--shadow-md);
}

.navbar__inner { display: flex; align-items: center; gap: 24px; height: 66px; }

/* ─── ЛОГОТИП: минимализм — текст + точка, без иконки в рамке ─── */
.navbar__logo {
  display: flex; align-items: center; gap: 9px;
  background: none;
  font-family: var(--font-heading);
  font-size: 16px; font-weight: 700;
  color: var(--text-on-dark);
  letter-spacing: -0.01em;
  flex-shrink: 0;
}

.navbar__logo-icon { color: var(--orange); flex-shrink: 0; }

/* ─── НАВИГАЦИЯ: без «таблеток» — просто подчёркивание при hover ─── */
.navbar__nav { display: flex; align-items: center; gap: 6px; flex: 1; justify-content: center; }

.navbar__link {
  position: relative;
  padding: 8px 4px;
  margin: 0 10px;
  background: none;
  color: var(--text-on-dark-2);
  font-size: 14px; font-weight: 500;
  transition: color 0.2s;
}

/* Подчёркивание — growing underline, плавная анимация через transform */
.navbar__link::after {
  content: '';
  position: absolute;
  left: 4px; right: 4px; bottom: 2px;
  height: 1px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.navbar__link:hover { color: var(--text-on-dark); }
.navbar__link:hover::after { transform: scaleX(1); }

/* ─── ДЕЙСТВИЯ ───────────────────────────────────────────────── */
.navbar__actions { display: flex; align-items: center; gap: 22px; flex-shrink: 0; }

.navbar__phone { font-size: 13.5px; font-weight: 500; color: var(--text-on-dark-2); transition: color 0.2s; }
.navbar__phone:hover { color: var(--orange); }

/* Минималистичная CTA — тонкий контур вместо плотной заливки */
.navbar__cta {
  padding: 9px 20px;
  background: transparent;
  color: var(--text-on-dark);
  font-size: 13px; font-weight: 600;
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: var(--radius-pill);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.navbar__cta:hover { border-color: var(--orange); color: var(--orange); background: rgba(var(--orange-rgb), 0.08); }

.navbar__burger { display: none; background: none; color: var(--text-on-dark); padding: 6px; margin-left: auto; }

/* ─── МОБИЛЬНОЕ МЕНЮ ─────────────────────────────────────────── */
.navbar__mobile {
  display: none;
  background: rgba(14, 22, 38, 0.55) !important;
  border-top: 1px solid var(--glass-dark-border);
  max-height: 0; overflow: hidden;
  transition: max-height 0.4s ease;
}
.navbar__mobile--open { max-height: 460px; }

.navbar__mobile-inner { padding: 14px 24px 22px; display: flex; flex-direction: column; gap: 2px; }
.navbar__mobile-link {
  background: none; color: var(--text-on-dark-2); font-size: 16px; font-weight: 500;
  text-align: left; padding: 12px 4px; border-bottom: 1px solid var(--glass-dark-border);
}
.navbar__mobile-phone { display: block; margin-top: 14px; color: var(--orange); font-size: 16px; font-weight: 600; }
.navbar__mobile-cta { margin-top: 14px; width: 100%; justify-content: center; text-align: center; }

@media (max-width: 1024px) {
  .navbar__nav, .navbar__actions { display: none; }
  .navbar__burger { display: flex; }
  .navbar__mobile { display: block; }
}
</style>
