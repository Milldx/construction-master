<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

const tabs = [
  { id: 'about',    label: 'О мне'        },
  { id: 'approach', label: 'Подход'       },
  { id: 'benefits', label: 'Преимущества' },
  { id: 'warranty', label: 'Гарантии'     },
]

// activeTab хранит id текущей открытой вкладки
const activeTab = ref('about')

const bigStats = [
  { value: '10',  suffix: '+', label: 'Лет на рынке'         },
  { value: '520', suffix: '',  label: 'Объектов завершено'   },
  { value: '97',  suffix: '%', label: 'Клиентов рекомендуют' },
  { value: '2',   suffix: 'г', label: 'Гарантия на работы'   },
]

const approachItems = [
  { id: 1, icon: 'document', title: 'Фиксированная цена',   desc: 'Все работы и материалы прописываю в смете до старта. Цена не меняется без вашего согласия.' },
  { id: 2, icon: 'camera',   title: 'Фотоотчёт каждый день', desc: 'Фото прогресса отправляю в мессенджер. Вы всегда знаете, что происходит на объекте.' },
  { id: 3, icon: 'ruler',    title: 'Бесплатный замер',      desc: 'Приеду, замерю, составлю детальную смету — без обязательств с вашей стороны.' },
  { id: 4, icon: 'calendar', title: 'Сдача строго в срок',   desc: 'Дату сдачи фиксирую в договоре. Каждый день просрочки — компенсация 1% от суммы.' },
]

// Раньше здесь были «свои бригады» и «закреплённый прораб» — но мастер один,
// поэтому пункты переписаны на то, что реально ценно при работе с ОДНИМ человеком
const benefitItems = [
  { id: 1, icon: 'sparkles',     title: 'Уборка после работ',     desc: 'Вывожу мусор и делаю чистовую уборку. Принимаете уже чистую квартиру.' },
  { id: 2, icon: 'user',         title: 'Работаю без посредников', desc: 'Все работы от начала до конца выполняю лично — без сменных бригад и случайных людей на объекте.' },
  { id: 3, icon: 'check-circle', title: 'Сертифицированные материалы', desc: 'Работаю с проверенными поставщиками. Предоставляю сертификаты по запросу.' },
  { id: 4, icon: 'phone',        title: 'Прямая связь со мной',   desc: 'Отвечаю на звонки и сообщения сам — без менеджеров и секретарей между нами.' },
]

const warrantyStats = [
  { value: '2 года', label: 'Срок гарантии'             },
  { value: '5 дней',  label: 'Устранение дефектов'       },
  { value: '0 ₽',     label: 'Выезд мастера по гарантии' },
]
</script>

<template>
  <section id="advantages" class="section section--dark adv">

    <div class="section-orbs">
      <div class="orb orb--orange" style="width:480px; height:480px; top:-100px; right:-100px;"></div>
      <div class="orb orb--blue"   style="width:400px; height:400px; bottom:-160px; left:-80px;"></div>
    </div>

    <div class="container">

      <div class="section-header adv__header" v-reveal>
        <span class="section-eyebrow">
          <AppIcon name="star" :size="14" />
          Почему выбирают меня
        </span>
        <h2 class="section-title section-title--light">Мои преимущества</h2>
        <p class="section-desc section-desc--dark adv__desc">
          За 10 лет я выработал систему, которая делает ремонт предсказуемым —
          без сюрпризов и скрытых расходов.
        </p>
      </div>

      <!-- ТАБЫ — стеклянная «таблетка»-переключатель -->
      <div class="adv__tabs glass" v-reveal="100">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="adv__tab"
          :class="{ 'adv__tab--active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- О МНЕ -->
      <div v-if="activeTab === 'about'" class="adv__panel">
        <p class="adv__about-text" v-reveal>
          Я — частный мастер с опытом более 10 лет. Ремонтирую квартиры,
          дома и коммерческие помещения в Москве и Московской области. Фиксированная
          смета, ежедневный фотоотчёт и гарантия, закреплённая в договоре, а не на словах.
        </p>
        <div class="adv__stats glass" v-reveal="120">
          <div v-for="stat in bigStats" :key="stat.label" class="adv__stat">
            <div class="adv__stat-num">{{ stat.value }}<span>{{ stat.suffix }}</span></div>
            <div class="adv__stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- ПОДХОД -->
      <div v-else-if="activeTab === 'approach'" class="adv__panel">
        <div class="adv__grid">
          <div v-for="(item, i) in approachItems" :key="item.id" class="adv-card glass" v-reveal="i * 90">
            <div class="adv-card__icon"><AppIcon :name="item.icon" :size="20" /></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <!-- ПРЕИМУЩЕСТВА -->
      <div v-else-if="activeTab === 'benefits'" class="adv__panel">
        <div class="adv__grid">
          <div v-for="(item, i) in benefitItems" :key="item.id" class="adv-card glass" v-reveal="i * 90">
            <div class="adv-card__icon"><AppIcon :name="item.icon" :size="20" /></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <!-- ГАРАНТИИ -->
      <div v-else class="adv__panel">
        <div class="adv__warranty glass" v-reveal>
          <div class="adv__warranty-text">
            <div class="adv__warranty-icon"><AppIcon name="shield-check" :size="26" /></div>
            <h3>Гарантия 2 года — прямо в договоре</h3>
            <p>
              Если в течение двух лет возникнет гарантийный случай — устраню бесплатно.
              Это пункт договора с указанием сроков, а не устное обещание.
            </p>
          </div>
          <div class="adv__warranty-stats">
            <div v-for="item in warrantyStats" :key="item.label" class="adv__warranty-stat glass">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.adv { position: relative; overflow: hidden; }
.adv__header { text-align: center; }
.adv__header .section-desc { margin: 0 auto; }

.adv__tabs {
  display: inline-flex; gap: 4px; padding: 6px;
  border-radius: var(--radius-pill);
  margin: 0 auto 48px;
  flex-wrap: wrap; justify-content: center;
}

.adv__tab {
  padding: 10px 24px; background: none; color: var(--text-on-dark-2);
  font-size: 14px; font-weight: 600; border-radius: var(--radius-pill);
  transition: background 0.2s, color 0.2s;
}
.adv__tab:hover { color: var(--text-on-dark); }
.adv__tab--active { background: var(--orange); color: var(--navy-dark); }

.adv__panel { max-width: 960px; margin: 0 auto; }

.adv__about-text {
  font-size: 17px; color: var(--text-on-dark-2); line-height: 1.8;
  text-align: center; max-width: 700px; margin: 0 auto 44px;
}

.adv__stats { display: grid; grid-template-columns: repeat(4, 1fr); border-radius: var(--radius-lg); overflow: hidden; }
.adv__stat { text-align: center; padding: 32px 16px; border-right: 1px solid var(--glass-dark-border); }
.adv__stat:last-child { border-right: none; }
.adv__stat-num { font-family: var(--font-heading); font-size: clamp(32px, 4.2vw, 50px); font-weight: 900; color: var(--orange); line-height: 1; margin-bottom: 8px; }
.adv__stat-num span { font-size: 0.55em; vertical-align: super; }
.adv__stat-label { font-size: 12.5px; color: var(--text-on-dark-3); text-transform: uppercase; letter-spacing: 0.06em; }

.adv__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

.adv-card { border-radius: var(--radius-lg); padding: 26px 22px; transition: transform 0.25s, border-color 0.25s; }
.adv-card:hover { transform: translateY(-4px); border-color: rgba(var(--orange-rgb), 0.4); }
.adv-card__icon { width: 40px; height: 40px; background: transparent; color: var(--orange); border: 1.5px solid rgba(var(--orange-rgb), 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.adv-card h3 { font-size: 16px; font-weight: 700; color: var(--text-on-dark); margin-bottom: 8px; }
.adv-card p  { font-size: 13.5px; color: var(--text-on-dark-2); line-height: 1.6; }

.adv__warranty { display: grid; grid-template-columns: 1.3fr 1fr; gap: 32px; align-items: center; border-radius: var(--radius-lg); padding: 44px 40px; }
.adv__warranty-icon { width: 54px; height: 54px; background: transparent; color: var(--orange); border: 1.5px solid rgba(var(--orange-rgb), 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
.adv__warranty-text h3 { font-size: 23px; font-weight: 800; color: var(--text-on-dark); margin-bottom: 12px; }
.adv__warranty-text p  { font-size: 15px; color: var(--text-on-dark-2); line-height: 1.75; }
.adv__warranty-stats { display: flex; flex-direction: column; gap: 14px; }
.adv__warranty-stat { display: flex; align-items: baseline; gap: 12px; padding: 16px 20px; border-radius: var(--radius); }
.adv__warranty-stat strong { font-family: var(--font-heading); font-size: 21px; font-weight: 800; color: var(--orange); min-width: 70px; }
.adv__warranty-stat span { font-size: 14px; color: var(--text-on-dark-2); }

@media (max-width: 1024px) {
  .adv__stats, .adv__grid { grid-template-columns: repeat(2, 1fr); }
  .adv__stat:nth-child(2) { border-right: none; }
  .adv__stat:nth-child(1), .adv__stat:nth-child(2) { border-bottom: 1px solid var(--glass-dark-border); }
  .adv__warranty { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .adv__tab { padding: 10px 14px; font-size: 13px; }
  .adv__stats, .adv__grid { grid-template-columns: 1fr; }
  .adv__warranty { padding: 28px 22px; }
}
</style>
