<script setup>
import AppIcon from './AppIcon.vue'

/*
  Цены на плитку — из обзора расценок по Москве и МО за 2025 год.
  Цены на штукатурку/шпаклёвку/стяжку/перегородки — подсмотрены
  у компании ЭкоПластер (специализация — машинная штукатурка)
  и приведены в соответствие с категориями калькулятора ниже.
  Остальные категории — ориентировочные цены, как и везде на сайте.
*/
const priceGroups = [
  {
    title: 'Укладка плитки',
    icon: 'ruler',
    items: [
      { name: 'Плитка стандартная (до 60×60 см)',        price: 'от 1 400 ₽/м²' },
      { name: 'Керамогранит (формат от 120 см)',          price: 'от 2 500 ₽/м²' },
      { name: 'Керамогранит крупноформатный (150 см+)',   price: 'от 5 000 ₽/м²' },
      { name: 'Художественная укладка, мозаика',          price: 'от 1 680 ₽/м²' },
      { name: 'Диагональная укладка',                     price: '+30% к цене'   },
      { name: 'Затирка швов',                             price: 'от 450 ₽/п.м.' },
      { name: 'Демонтаж старой плитки',                   price: 'от 200 ₽/м²'   },
    ],
  },
  {
    title: 'Штукатурка и стяжка',
    icon: 'squares',
    items: [
      { name: 'Механизированная штукатурка стен',  price: 'от 600 ₽/м²' },
      { name: 'Механизированная шпаклёвка',          price: 'от 550 ₽/м²' },
      { name: 'Штукатурка фасада',                   price: 'от 800 ₽/м²' },
      { name: 'Полусухая стяжка пола',               price: 'от 450 ₽/м²' },
      { name: 'Наливной пол (финишный слой)',        price: 'от 500 ₽/м²' },
      { name: 'Перегородки из блоков/ПГП',           price: 'от 900 ₽/м²' },
      { name: 'Демонтаж старого покрытия',           price: 'от 350 ₽/м²' },
    ],
  },
  {
    title: 'Малярные и отделочные',
    icon: 'paintbrush',
    items: [
      { name: 'Покраска стен и потолков',                 price: 'от 250 ₽/м²'  },
      { name: 'Поклейка обоев',                            price: 'от 300 ₽/м²'  },
      { name: 'Грунтовка поверхности',                     price: 'от 100 ₽/м²'  },
      { name: 'Декоративная штукатурка (венецианка и др.)', price: 'от 1 500 ₽/м²' },
    ],
  },
  {
    title: 'Электрика',
    icon: 'bolt',
    items: [
      { name: 'Монтаж розетки или выключателя', price: 'от 350 ₽/шт.'   },
      { name: 'Разводка проводки (точка)',       price: 'от 700 ₽'      },
      { name: 'Установка светильника',           price: 'от 500 ₽/шт.'  },
      { name: 'Монтаж электрощитка',              price: 'от 4 500 ₽'    },
    ],
  },
]

function scrollToContacts() {
  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
}
function scrollToCalculator() {
  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="prices" class="section section--light prices">

    <div class="section-orbs">
      <div class="orb orb--orange-soft" style="width:440px; height:440px; top:-120px; right:5%;"></div>
    </div>

    <div class="container">

      <div class="section-header" v-reveal>
        <span class="section-eyebrow">
          <AppIcon name="tag" :size="14" />
          Цены на работы
        </span>
        <h2 class="section-title">Прайс-лист</h2>
        <p class="section-desc">
          Ориентировочные цены 2025 года для Москвы и Московской области.
          Точная стоимость зависит от состояния поверхности и объёма работ.
        </p>
      </div>

      <div class="pl__grid">
        <div v-for="(group, i) in priceGroups" :key="group.title" class="pl-group glass-light" v-reveal="i * 100">
          <div class="pl-group__head">
            <div class="pl-group__icon"><AppIcon :name="group.icon" :size="19" /></div>
            <h3>{{ group.title }}</h3>
          </div>

          <ul class="pl-group__list">
            <li v-for="item in group.items" :key="item.name">
              <span class="pl-group__name">{{ item.name }}</span>
              <span class="pl-group__price">{{ item.price }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Подсказка + переход к калькулятору/контактам -->
      <div class="pl__note glass" v-reveal>
        <AppIcon name="check" :size="16" />
        <p>
          Это справочные цены — для точного расчёта под вашу площадь воспользуйтесь
          калькулятором или оставьте заявку на бесплатный замер.
        </p>
        <div class="pl__note-actions">
          <button class="btn-outline-dark" @click="scrollToCalculator">Открыть калькулятор</button>
          <button class="btn-primary" @click="scrollToContacts">
            Оставить заявку
            <AppIcon name="arrow-right" :size="16" />
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.prices { position: relative; overflow: hidden; }

.pl__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 32px;
}

.pl-group { border-radius: var(--radius-lg); padding: 26px 26px 22px; }

.pl-group__head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }

.pl-group__icon {
  width: 38px; height: 38px;
  background: transparent; color: var(--orange-dark);
  border: 1.5px solid rgba(var(--orange-rgb), 0.35);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.pl-group__head h3 { font-size: 17px; font-weight: 700; color: var(--navy); }

.pl-group__list { display: flex; flex-direction: column; }

.pl-group__list li {
  display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
  padding: 11px 0;
  border-bottom: 1px dashed rgba(0,0,0,0.10);
}
.pl-group__list li:last-child { border-bottom: none; }

.pl-group__name { font-size: 14px; color: var(--text); }
.pl-group__price { font-size: 14px; font-weight: 700; color: var(--orange-dark); white-space: nowrap; }

/* ─── ПОДСКАЗКА ───────────────────────────────────────────── */
.pl__note {
  border-radius: var(--radius-lg);
  padding: 28px 30px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.pl__note svg { color: var(--orange); flex-shrink: 0; }
.pl__note p { font-size: 14.5px; color: var(--text-on-dark-2); flex: 1; min-width: 220px; line-height: 1.6; }
.pl__note-actions { display: flex; gap: 12px; flex-wrap: wrap; }

@media (max-width: 900px) { .pl__grid { grid-template-columns: 1fr; } }

@media (max-width: 600px) {
  .pl__note { padding: 22px 22px; }
  .pl__note-actions { width: 100%; }
  .pl__note-actions button { flex: 1; justify-content: center; }
}
</style>
