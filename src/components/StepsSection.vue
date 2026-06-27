<script setup>
import AppIcon from './AppIcon.vue'

const steps = [
  { num:'01', icon:'chat',         title:'Заявка',        desc:'Оставьте заявку — обсудим задачу, и я запишу вас на бесплатный замер.',        duration:'15 мин.'    },
  { num:'02', icon:'ruler',        title:'Замер и смета', desc:'Приеду, сделаю точные замеры и составлю детальную смету за 24 часа.',           duration:'1–2 дня'    },
  { num:'03', icon:'document',     title:'Договор',       desc:'Фиксированная цена, перечень работ, дата сдачи — закрепляю в договоре.',       duration:'1 день'     },
  { num:'04', icon:'home',         title:'Работы',        desc:'Начинаю ремонт. Каждый день — фотоотчёт. Вы контролируете процесс онлайн.',     duration:'По договору'},
  { num:'05', icon:'check-circle', title:'Приёмка',       desc:'Совместная приёмка, устранение замечаний. Оплата — после вашего одобрения.',    duration:'1 день'     },
  { num:'06', icon:'shield-check', title:'Гарантия',      desc:'Выдаю гарантийный документ на 2 года. Звоните — приеду и исправлю бесплатно.',   duration:'2 года'     },
]
</script>

<template>
  <section id="steps" class="section section--light">
    <div class="container">

      <div class="section-header" v-reveal>
        <span class="section-eyebrow">
          <AppIcon name="calendar" :size="14" />
          Как я работаю
        </span>
        <h2 class="section-title">Этапы сотрудничества</h2>
        <p class="section-desc">
          Прозрачный процесс от первого звонка до получения гарантийного документа.
        </p>
      </div>

      <div class="st__grid">
        <div v-for="(step, i) in steps" :key="step.num" class="st-card glass-light" v-reveal="i * 90">
          <div class="st-card__top">
            <span class="st-card__num">{{ step.num }}</span>
            <div class="st-card__icon"><AppIcon :name="step.icon" :size="20" /></div>
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
          <div class="st-card__duration">
            <AppIcon name="clock" :size="13" />
            {{ step.duration }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.st__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

.st-card {
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  display: flex; flex-direction: column; gap: 12px;
  transition: transform 0.25s, border-color 0.25s;
}
.st-card:hover { transform: translateY(-5px); border-color: rgba(var(--orange-rgb), 0.4); }

.st-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
.st-card__num { font-family: var(--font-heading); font-size: 48px; font-weight: 900; color: var(--border); line-height: 1; transition: color 0.25s; }
.st-card:hover .st-card__num { color: var(--orange); }
.st-card__icon { width: 38px; height: 38px; background: transparent; color: var(--orange-dark); border: 1.5px solid rgba(var(--orange-rgb), 0.35); border-radius: 50%; display: flex; align-items: center; justify-content: center; }

.st-card h3 { font-size: 18px; font-weight: 700; color: var(--navy); }
.st-card p  { font-size: 14px; color: var(--muted); line-height: 1.6; flex: 1; }

.st-card__duration {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: var(--navy);
  background: rgba(0,0,0,0.05); padding: 6px 14px; border-radius: var(--radius-pill);
  align-self: flex-start;
}

@media (max-width: 1024px) { .st__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .st__grid { grid-template-columns: 1fr; } }
</style>
