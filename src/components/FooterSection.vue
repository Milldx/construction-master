<script setup>
import { useRouter, useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import LogoMark from './LogoMark.vue'

const footerLinks = [
  { label:'Услуги',       anchor:'services'   },
  { label:'Портфолио',    anchor:'portfolio'  },
  { label:'О мне',        anchor:'advantages' },
  { label:'Калькулятор',  anchor:'calculator' },
  { label:'Цены',          anchor:'prices'     },
  { label:'Контакты',     anchor:'contacts'   },
]

const currentYear = new Date().getFullYear()

const router = useRouter()
const route  = useRoute()

// Та же логика, что в NavBar.vue — на другой странице сперва переходим на главную
function scrollTo(id) {
  if (route.name !== 'home') {
    router.push({ path: '/', query: { scrollTo: id } })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToTop() {
  if (route.name !== 'home') {
    router.push('/')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="footer">
    <div class="container">

      <div class="footer__top">
        <div class="footer__brand">
          <button class="footer__logo" @click="scrollToTop">
            <LogoMark :size="20" class="footer__logo-icon" />
            МастерСтрой
          </button>
          <p class="footer__tagline">
            Ремонт и строительство в Москве и МО. 10 лет опыта, гарантия 2 года.
          </p>
          <a href="tel:+79991234567" class="footer__phone">
            <AppIcon name="phone" :size="14" />
            +7 (999) 123-45-67
          </a>
        </div>

        <div class="footer__nav">
          <p class="footer__col-title">Разделы</p>
          <ul>
            <li v-for="link in footerLinks" :key="link.anchor">
              <button @click="scrollTo(link.anchor)">{{ link.label }}</button>
            </li>
          </ul>
        </div>

        <div class="footer__contacts">
          <p class="footer__col-title">Контакты</p>
          <ul>
            <li><a href="tel:+79991234567"><AppIcon name="phone" :size="13" />+7 (999) 123-45-67</a></li>
            <li><a href="https://wa.me/79991234567" target="_blank"><AppIcon name="chat" :size="13" />WhatsApp</a></li>
            <li><a href="mailto:info@masterstroy.ru"><AppIcon name="mail" :size="13" />info@masterstroy.ru</a></li>
            <li><span><AppIcon name="map-pin" :size="13" />Москва и МО</span></li>
          </ul>
        </div>
      </div>

      <div class="footer__divider"></div>

      <div class="footer__bottom">
        <p>© {{ currentYear }} МастерСтрой. Все права защищены.</p>
        <button class="footer__top-btn" @click="scrollToTop">
          Наверх <AppIcon name="arrow-up" :size="13" />
        </button>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--navy-dark); padding: 56px 0 28px; }

.footer__top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 44px; margin-bottom: 40px; }

.footer__logo {
  display: flex; align-items: center; gap: 9px;
  background: none; cursor: pointer; margin-bottom: 14px;
  font-family: var(--font-heading); font-size: 16px; font-weight: 700;
  color: var(--text-on-dark);
}
.footer__logo-icon { color: var(--orange); flex-shrink: 0; }

.footer__tagline { font-size: 14px; color: var(--text-on-dark-3); line-height: 1.7; max-width: 280px; margin-bottom: 16px; }
.footer__phone { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600; color: var(--orange); }

.footer__col-title { font-size: 11.5px; font-weight: 700; color: var(--text-on-dark-3); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }

.footer__nav button { background: none; color: var(--text-on-dark-2); font-size: 13.5px; padding: 5px 0; display: block; transition: color 0.2s; text-align: left; }
.footer__nav button:hover { color: var(--text-on-dark); }

.footer__contacts ul { display: flex; flex-direction: column; gap: 9px; }
.footer__contacts a, .footer__contacts span { display: flex; align-items: center; gap: 7px; font-size: 13.5px; color: var(--text-on-dark-2); transition: color 0.2s; }
.footer__contacts a:hover { color: var(--text-on-dark); }

.footer__divider { height: 1px; background: var(--glass-dark-border); margin-bottom: 22px; }

.footer__bottom { display: flex; align-items: center; justify-content: space-between; }
.footer__bottom p { font-size: 12.5px; color: var(--text-on-dark-3); }

.footer__top-btn { display: inline-flex; align-items: center; gap: 5px; background: none; color: var(--text-on-dark-2); font-size: 12.5px; font-weight: 600; transition: color 0.2s; }
.footer__top-btn:hover { color: var(--orange); }

@media (max-width: 900px) {
  .footer__top { grid-template-columns: 1fr 1fr; }
  .footer__brand { grid-column: 1 / -1; }
}
@media (max-width: 600px) {
  .footer__top { grid-template-columns: 1fr; }
  .footer__bottom { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
