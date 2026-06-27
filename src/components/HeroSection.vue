<script setup>
import AppIcon from './AppIcon.vue'

const stats = [
  { value: '10+',  label: 'лет опыта'          },
  { value: '520',  label: 'объектов сдано'      },
  { value: '2 г',  label: 'гарантия'            },
  { value: '100%', label: 'фиксированная цена'  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <!--
    position: relative + overflow: hidden — нужны, чтобы орбы (см. ниже)
    были видны только внутри границ Hero и не «вылезали» за секцию.
  -->
  <section id="hero" class="hero section--dark">

    <!-- ОРБЫ — оранжевое и синее пятно, видные через стекло ниже -->
    <div class="section-orbs">
      <div class="orb orb--orange" style="width:560px; height:560px; top:-180px; left:-100px;"></div>
      <div class="orb orb--blue"   style="width:420px; height:420px; bottom:-140px; right:-80px;"></div>
    </div>

    <div class="container hero__layout">

      <!-- ЛЕВАЯ ЧАСТЬ: текст -->
      <div class="hero__content">
        <span class="hero__eyebrow" v-reveal>
          <span class="hero__eyebrow-dash"></span>
          Ремонт и строительство в Москве
        </span>

        <h1 class="hero__title" v-reveal="80">
          Ремонт квартир<br>
          <span class="hero__title-accent">по вашим задачам</span>
        </h1>

        <p class="hero__desc" v-reveal="160">
          10 лет делаю ремонты в Москве и области. Фиксированная цена в договоре,
          фотоотчёт каждый день, гарантия 2 года на все виды работ.
        </p>

        <div class="hero__actions" v-reveal="240">
          <button class="btn-primary" @click="scrollTo('calculator')">
            Рассчитать стоимость
            <AppIcon name="arrow-right" :size="18" />
          </button>
          <button class="btn-outline" @click="scrollTo('portfolio')">
            Смотреть портфолио
          </button>
        </div>
      </div>

      <!-- ПРАВАЯ ЧАСТЬ: стеклянная карточка «Активный объект» -->
      <!-- На экранах меньше 1024px скрыта (см. медиа-запрос внизу) -->
      <div class="hero__visual" v-reveal="200">
        <div class="hero__card glass">
          <div class="hero__card-header">
            <span class="hero__card-label">Активный объект</span>
            <span class="hero__card-status">В работе</span>
          </div>

          <div class="hero__card-image">
            <AppIcon name="building" :size="48" />
            <p>ЖК «Садовый», 3-комн. квартира</p>
            <span>78 м² · Москва</span>
          </div>

          <div class="hero__card-progress">
            <div class="hero__progress-header"><span>Прогресс работ</span><strong>67%</strong></div>
            <div class="hero__progress-bar"><div class="hero__progress-fill" style="width:67%"></div></div>
          </div>

          <div class="hero__card-stats">
            <div class="hero__card-stat"><strong>10 нед.</strong><span>срок</span></div>
            <div class="hero__card-stat"><strong>Фото</strong><span>ежедневно</span></div>
            <div class="hero__card-stat"><strong>★ 5.0</strong><span>рейтинг</span></div>
          </div>
        </div>
      </div>

    </div>

    <!-- СТЕКЛЯННАЯ ПОЛОСА СО СТАТИСТИКОЙ -->
    <div class="hero__stats-bar glass">
      <div class="container">
        <div class="hero__stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="hero__stat">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.hero { position: relative; overflow: hidden; min-height: 100vh; display: flex; flex-direction: column; }

.hero__layout {
  display: grid;
  grid-template-columns: 1fr 460px;
  gap: 48px;
  align-items: center;
  padding-top: 130px;
  padding-bottom: 40px;
  flex: 1;
}

/* ─── ЛЕВАЯ ЧАСТЬ ─────────────────────────────────────────── */
.hero__eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--orange); margin-bottom: 22px;
}
.hero__eyebrow-dash { width: 24px; height: 2px; background: var(--orange); }

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(40px, 6.5vw, 76px);
  font-weight: 900;
  color: var(--text-on-dark);
  line-height: 1.06;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}
.hero__title-accent { font-style: italic; color: var(--orange); }

.hero__desc {
  font-size: clamp(16px, 1.9vw, 19px);
  color: var(--text-on-dark-2);
  max-width: 540px;
  line-height: 1.72;
  margin-bottom: 40px;
}

.hero__actions { display: flex; gap: 16px; flex-wrap: wrap; }

/* ─── ПРАВАЯ ЧАСТЬ: КАРТОЧКА ──────────────────────────────── */
.hero__card {
  border-radius: var(--radius-lg);
  padding: 26px;
  display: flex; flex-direction: column; gap: 20px;
}

.hero__card-header { display: flex; align-items: center; justify-content: space-between; }
.hero__card-label { font-size: 12px; font-weight: 600; color: var(--text-on-dark-3); text-transform: uppercase; letter-spacing: 0.07em; }
.hero__card-status {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600; color: #4ADE80;
  background: rgba(74,222,128,0.14); padding: 4px 12px; border-radius: var(--radius-pill);
}

.hero__card-image {
  background: rgba(var(--orange-rgb), 0.12);
  border: 1px solid rgba(var(--orange-rgb), 0.22);
  border-radius: var(--radius);
  padding: 28px 18px;
  display: flex; flex-direction: column; align-items: center; gap: 9px;
  text-align: center; color: var(--text-on-dark);
}
.hero__card-image svg { color: var(--orange); opacity: 0.8; }
.hero__card-image p { font-size: 14px; font-weight: 600; color: var(--text-on-dark); }
.hero__card-image span { font-size: 12px; color: var(--text-on-dark-3); }

.hero__progress-header { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-on-dark-2); margin-bottom: 8px; }
.hero__progress-header strong { color: var(--text-on-dark); font-weight: 700; }
.hero__progress-bar { height: 6px; background: rgba(255,255,255,0.12); border-radius: 3px; overflow: hidden; }
.hero__progress-fill { height: 100%; background: linear-gradient(90deg, var(--orange), #FFC56B); border-radius: 3px; }

.hero__card-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); border-radius: var(--radius); overflow: hidden; }
.hero__card-stat { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 13px 6px; background: rgba(255,255,255,0.03); }
.hero__card-stat strong { font-size: 14px; font-weight: 700; color: var(--text-on-dark); }
.hero__card-stat span { font-size: 10.5px; color: var(--text-on-dark-3); text-transform: uppercase; letter-spacing: 0.05em; }

/* ─── ПОЛОСА СТАТИСТИКИ ───────────────────────────────────── */
.hero__stats-bar { position: relative; z-index: 2; border-radius: 0; border-left: none; border-right: none; border-bottom: none; }
.hero__stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.hero__stat { display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center; padding: 26px 16px; border-right: 1px solid var(--glass-dark-border); }
.hero__stat:last-child { border-right: none; }
.hero__stat strong { font-family: var(--font-heading); font-size: clamp(26px, 3.2vw, 36px); font-weight: 900; color: var(--orange); line-height: 1; }
.hero__stat span { font-size: 12px; font-weight: 500; color: var(--text-on-dark-3); text-transform: uppercase; letter-spacing: 0.06em; }

/* ─── АДАПТИВ ─────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero__layout { grid-template-columns: 1fr; }
  .hero__visual { display: none; }
}

@media (max-width: 768px) {
  .hero__layout { padding-top: 104px; }
  .hero__actions { flex-direction: column; align-items: flex-start; }
  .hero__stats-grid { grid-template-columns: repeat(2, 1fr); }
  .hero__stat:nth-child(2) { border-right: none; }
  .hero__stat:nth-child(1), .hero__stat:nth-child(2) { border-bottom: 1px solid var(--glass-dark-border); }
}
</style>
