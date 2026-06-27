<script setup>
import { ref, computed } from 'vue'
import AppIcon from './AppIcon.vue'

/*
  Категории «черновых» работ (механизированная штукатурка, шпаклёвка,
  стяжка, перегородки) подсмотрены у компании ЭкоПластер —
  специализированной службы машинной штукатурки в Москве и МО.
  Раньше тут была одна общая строка «Малярно-штукатурные работы» —
  теперь это 5 отдельных, более точных позиций.
*/
const serviceOptions = [
  { id:'luxury',         label:'Евроремонт (премиум-класс)',      pricePerSqm: 5500  },
  { id:'standard',       label:'Ремонт квартиры (стандарт)',      pricePerSqm: 3000  },
  { id:'cosmetic',       label:'Косметический ремонт',            pricePerSqm: 1500  },
  { id:'bathroom',       label:'Ремонт ванной комнаты',           pricePerSqm: 15000 },
  { id:'kitchen',        label:'Ремонт кухни',                    pricePerSqm: 8000  },
  { id:'tiling',         label:'Укладка плитки',                  pricePerSqm: 1500  },
  { id:'mech_plaster',   label:'Механизированная штукатурка стен', pricePerSqm: 600   },
  { id:'mech_putty',     label:'Механизированная шпаклёвка',       pricePerSqm: 550   },
  { id:'screed',         label:'Полусухая стяжка пола',            pricePerSqm: 450   },
  { id:'partitions',     label:'Перегородки из блоков/ПГП',        pricePerSqm: 900   },
  { id:'facade_plaster', label:'Штукатурка фасада',                pricePerSqm: 800   },
]

const selectedServiceId = ref('standard')
const area              = ref(50)

const selectedService = computed(() => serviceOptions.find(s => s.id === selectedServiceId.value))

const estimatedCost = computed(() => {
  if (!selectedService.value) return 0
  return selectedService.value.pricePerSqm * area.value
})

const minCost = computed(() => Math.round(estimatedCost.value * 0.9))
const maxCost = computed(() => Math.round(estimatedCost.value * 1.1))

const formattedMin = computed(() => minCost.value.toLocaleString('ru-RU') + ' ₽')
const formattedMax = computed(() => maxCost.value.toLocaleString('ru-RU') + ' ₽')

function clampArea() {
  if (area.value < 1)    area.value = 1
  if (area.value > 1000) area.value = 1000
}

function scrollToContacts() {
  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="calculator" class="section section--light calc">

    <div class="section-orbs">
      <div class="orb orb--orange-soft" style="width:420px; height:420px; top:-120px; left:20%;"></div>
    </div>

    <div class="container">

      <div class="section-header" v-reveal>
        <span class="section-eyebrow">
          <AppIcon name="calculator" :size="14" />
          Примерная стоимость
        </span>
        <h2 class="section-title">Калькулятор стоимости</h2>
        <p class="section-desc">
          Выберите услугу и введите площадь — получите ориентировочную стоимость.
        </p>
      </div>

      <div class="calc__layout">

        <!-- ЛЕВАЯ ПАНЕЛЬ: настройки (светлое стекло, т.к. секция светлая) -->
        <div class="calc__panel glass-light" v-reveal>
          <h3>Параметры</h3>

          <div class="calc__field">
            <label for="svc">Тип работ</label>
            <select id="svc" class="calc__select" v-model="selectedServiceId">
              <option v-for="opt in serviceOptions" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
            </select>
          </div>

          <div class="calc__field">
            <label for="area-range">Площадь <strong class="calc__area-val">{{ area }} м²</strong></label>
            <input id="area-range" type="range" class="calc__range" v-model.number="area" min="1" max="300" step="1" />
            <div class="calc__range-hints"><span>1 м²</span><span>300 м²</span></div>
          </div>

          <div class="calc__field">
            <label for="area-num">Или введите точное значение</label>
            <div class="calc__input-row">
              <input id="area-num" type="number" class="calc__input" v-model.number="area" min="1" max="1000" @blur="clampArea" />
              <span>м²</span>
            </div>
          </div>

          <div class="calc__ppm" v-if="selectedService">
            Цена за 1 м²: <strong>{{ selectedService.pricePerSqm.toLocaleString('ru-RU') }} ₽</strong>
          </div>
        </div>

        <!-- ПРАВАЯ ПАНЕЛЬ: результат (тёмное прозрачное стекло — контраст с левой панелью) -->
        <div class="calc__result glass" v-reveal="120">
          <p class="calc__result-eyebrow">Примерная стоимость работ</p>

          <div class="calc__price-range">
            <span>{{ formattedMin }}</span>
            <span class="calc__price-sep">—</span>
            <span>{{ formattedMax }}</span>
          </div>

          <p class="calc__service-name" v-if="selectedService">{{ selectedService.label }}</p>
          <p class="calc__area-info">Площадь: <strong>{{ area }} м²</strong></p>

          <hr />

          <p class="calc__note">
            <AppIcon name="check" :size="14" />
            Расчёт ориентировочный. Точная стоимость — после бесплатного замера.
          </p>

          <button class="btn-primary calc__cta" @click="scrollToContacts">
            Получить точную смету
            <AppIcon name="arrow-right" :size="18" />
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.calc { position: relative; overflow: hidden; }
.calc__layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }

.calc__panel { border-radius: var(--radius-lg); padding: 36px 32px; display: flex; flex-direction: column; gap: 24px; }
.calc__panel h3 { font-size: 19px; font-weight: 700; color: var(--navy); }

.calc__field { display: flex; flex-direction: column; gap: 10px; }
.calc__field label { font-size: 14px; font-weight: 600; color: var(--navy); display: flex; justify-content: space-between; }
.calc__area-val { color: var(--orange-dark); font-size: 16px; }

.calc__select {
  width: 100%; padding: 13px 16px;
  background: rgba(255,255,255,0.6);
  border: 1.5px solid var(--border); border-radius: var(--radius);
  font-size: 15px; color: var(--text); font-family: var(--font-body);
}
.calc__select:focus { border-color: var(--orange); outline: none; }

.calc__range { width: 100%; height: 5px; -webkit-appearance: none; appearance: none; background: rgba(0,0,0,0.12); border-radius: 3px; outline: none; cursor: pointer; }
.calc__range::-webkit-slider-thumb {
  -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%;
  background: var(--orange); box-shadow: 0 2px 10px rgba(var(--orange-rgb), 0.5);
  cursor: pointer; border: 3px solid var(--white);
}
.calc__range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: var(--orange); cursor: pointer; border: 3px solid var(--white); }
.calc__range-hints { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); }

.calc__input-row { display: flex; align-items: center; gap: 10px; }
.calc__input { flex: 1; padding: 13px 16px; background: rgba(255,255,255,0.6); border: 1.5px solid var(--border); border-radius: var(--radius); font-size: 16px; color: var(--text); }
.calc__input:focus { border-color: var(--orange); outline: none; }
.calc__input-row span { font-size: 16px; font-weight: 600; color: var(--muted); }

.calc__ppm { font-size: 14px; color: var(--muted); background: rgba(0,0,0,0.04); padding: 12px 16px; border-radius: var(--radius); }
.calc__ppm strong { color: var(--navy); }

/* ─── ПРАВАЯ ПАНЕЛЬ (тёмное стекло) ───────────────────────── */
.calc__result { border-radius: var(--radius-lg); padding: 36px 32px; display: flex; flex-direction: column; gap: 14px; }
.calc__result-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-on-dark-3); }

.calc__price-range { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.calc__price-range span:not(.calc__price-sep) { font-family: var(--font-heading); font-size: clamp(26px, 3.5vw, 36px); font-weight: 900; color: var(--orange); }
.calc__price-sep { font-size: 22px; color: var(--text-on-dark-3); }

.calc__service-name { font-size: 15px; color: var(--text-on-dark); font-weight: 500; }
.calc__area-info { font-size: 14px; color: var(--text-on-dark-2); }
.calc__area-info strong { color: var(--text-on-dark); }

hr { border: none; border-top: 1px solid var(--glass-dark-border); }

.calc__note { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--text-on-dark-3); line-height: 1.6; }
.calc__note svg { color: #4ADE80; margin-top: 2px; flex-shrink: 0; }

.calc__cta { margin-top: 8px; justify-content: center; width: 100%; padding: 16px; }

@media (max-width: 900px) {
  .calc__layout { grid-template-columns: 1fr; }
  .calc__panel, .calc__result { padding: 26px 22px; }
}
</style>
