<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterSection from '../components/FooterSection.vue'
import AppIcon from '../components/AppIcon.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { usePortfolioData } from '../composables/usePortfolioData.js'
import { useAdmin } from '../composables/useAdmin.js'

const router = useRouter()
const { isAdmin } = useAdmin()
const { items, addItem } = usePortfolioData()

function goToContacts() {
  router.push({ path: '/', query: { scrollTo: 'contacts' } })
}

const filterTabs = [
  { label: 'Все работы', value: 'all'       },
  { label: 'Квартиры',   value: 'apartment' },
  { label: 'Ванные',     value: 'bathroom'  },
  { label: 'Кухни',      value: 'kitchen'   },
]

// Здесь — ВЕСЬ список (items — реактивный массив из общего хранилища)
const activeFilter = ref('all')

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return items.value
  return items.value.filter(item => item.category === activeFilter.value)
})

// Считаем, сколько объектов в каждой категории — для чипов в шапке страницы
const categoryCount = computed(() => ({
  apartment: items.value.filter(i => i.category === 'apartment').length,
  bathroom:  items.value.filter(i => i.category === 'bathroom').length,
  kitchen:   items.value.filter(i => i.category === 'kitchen').length,
}))

// ─── ФОРМА «ДОБАВИТЬ ОБЪЕКТ» (видна только администратору) ────
const showAddForm = ref(false)
const newItem = ref(blankItem())

function blankItem() {
  return { title: '', category: 'apartment', area: '', city: '', duration: '', desc: '', tagsText: '' }
}

function submitNewItem() {
  if (!newItem.value.title.trim()) return

  addItem({
    // Date.now() — количество миллисекунд с 1970 года, на практике
    // гарантированно разное число при каждом клике — этого достаточно
    // для уникального id в небольшом списке вроде нашего портфолио.
    id: Date.now(),
    title: newItem.value.title,
    category: newItem.value.category,
    area: newItem.value.area,
    city: newItem.value.city,
    duration: newItem.value.duration,
    desc: newItem.value.desc,
    tags: newItem.value.tagsText.split(',').map(t => t.trim()).filter(Boolean),
    hue: String(Math.floor(Math.random() * 360)), // случайный цвет фото-заглушки
  })

  newItem.value = blankItem()
  showAddForm.value = false
}
</script>

<template>
  <NavBar />

  <!-- Небольшая шапка страницы вместо полноразмерного Hero -->
  <section class="page-head section--dark">
    <div class="section-orbs">
      <div class="orb orb--orange" style="width:420px; height:420px; top:-140px; right:-60px;"></div>
    </div>
    <div class="container">
      <RouterLink to="/" class="page-head__back">
        <AppIcon name="arrow-left" :size="16" />
        Назад на главную
      </RouterLink>
      <span class="section-eyebrow" v-reveal>
        <AppIcon name="camera" :size="14" />
        Портфолио
      </span>
      <h1 class="page-head__title section-title--light" v-reveal="80">Все выполненные объекты</h1>
      <p class="page-head__desc section-desc--dark" v-reveal="140">
        {{ items.length }} объектов с договором, фотоотчётом и гарантией —
        от небольших санузлов до полного ремонта квартир.
      </p>

      <!-- Чипы со статистикой по категориям -->
      <div class="page-head__stats glass" v-reveal="200">
        <div class="page-head__stat">
          <strong>{{ items.length }}</strong>
          <span>всего объектов</span>
        </div>
        <div class="page-head__stat">
          <strong>{{ categoryCount.apartment }}</strong>
          <span>квартиры</span>
        </div>
        <div class="page-head__stat">
          <strong>{{ categoryCount.bathroom }}</strong>
          <span>ванные</span>
        </div>
        <div class="page-head__stat">
          <strong>{{ categoryCount.kitchen }}</strong>
          <span>кухни</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light projects">
    <div class="container">

      <div class="pf__filters" v-reveal>
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          class="pf__tab"
          :class="{ 'pf__tab--active': activeFilter === tab.value }"
          @click="activeFilter = tab.value"
        >
          {{ tab.label }}
        </button>

        <!-- Кнопка добавления — видна только администратору -->
        <button v-if="isAdmin" class="pf__add-btn" @click="showAddForm = !showAddForm">
          <AppIcon name="arrow-up" :size="14" style="transform: rotate(45deg)" />
          Добавить объект
        </button>
      </div>

      <!-- Форма нового объекта — появляется по кнопке выше -->
      <div v-if="showAddForm" class="pf__add-form">
        <div class="pf__add-row">
          <label>Название<input v-model="newItem.title" type="text" placeholder="Например: Студия в центре" /></label>
          <label>
            Категория
            <select v-model="newItem.category">
              <option value="apartment">Квартира</option>
              <option value="bathroom">Ванная</option>
              <option value="kitchen">Кухня</option>
            </select>
          </label>
        </div>
        <div class="pf__add-row">
          <label>Площадь<input v-model="newItem.area" type="text" placeholder="32 м²" /></label>
          <label>Срок<input v-model="newItem.duration" type="text" placeholder="4 нед." /></label>
          <label>Город/район<input v-model="newItem.city" type="text" placeholder="Москва, ..." /></label>
        </div>
        <label>Описание<textarea v-model="newItem.desc" rows="2" placeholder="Что было сделано"></textarea></label>
        <label>Теги (через запятую)<input v-model="newItem.tagsText" type="text" placeholder="Плитка, Электрика" /></label>
        <div class="pf__add-actions">
          <button class="btn-primary" @click="submitNewItem">Добавить</button>
          <button class="pf__add-cancel" @click="showAddForm = false">Отмена</button>
        </div>
      </div>

      <div class="pf__grid">
        <ProjectCard
          v-for="(item, i) in filteredItems"
          :key="item.id"
          :item="item"
          v-reveal="i * 70"
        />
      </div>

      <!-- На случай если выбранная категория пуста -->
      <p v-if="filteredItems.length === 0" class="pf__empty">
        В этой категории пока нет объектов — но я постоянно их добавляю.
      </p>

    </div>
  </section>

  <!-- Финальный призыв к действию — мостик к форме на главной -->
  <section class="section cta-bridge">
    <div class="section-orbs">
      <div class="orb orb--blue" style="width:380px; height:380px; bottom:-140px; left:10%;"></div>
    </div>
    <div class="container cta-bridge__inner glass" v-reveal>
      <div>
        <h2>Хотите такой же результат?</h2>
        <p>Оставьте заявку — приеду на бесплатный замер и составлю смету за 24 часа.</p>
      </div>
      <button class="btn-primary" @click="goToContacts">
        Оставить заявку
        <AppIcon name="arrow-right" :size="18" />
      </button>
    </div>
  </section>

  <FooterSection />
</template>

<style scoped>
.page-head {
  position: relative;
  overflow: hidden;
  padding: 150px 0 60px;
}

.page-head__back {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 600;
  color: var(--text-on-dark-2);
  margin-bottom: 28px;
  transition: color 0.2s, gap 0.2s;
}
.page-head__back:hover { color: var(--orange); gap: 12px; }

.page-head__title { margin-top: 14px; margin-bottom: 14px; font-size: clamp(28px, 4vw, 42px); }
.page-head__desc { max-width: 560px; margin-bottom: 28px; }

/* ─── ЧИПЫ СО СТАТИСТИКОЙ ─────────────────────────────────── */
.page-head__stats {
  display: inline-flex;
  gap: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.page-head__stat {
  display: flex; flex-direction: column; gap: 4px;
  padding: 16px 26px;
  border-right: 1px solid var(--glass-dark-border);
}
.page-head__stat:last-child { border-right: none; }
.page-head__stat strong { font-family: var(--font-heading); font-size: 24px; font-weight: 900; color: var(--orange); line-height: 1; }
.page-head__stat span { font-size: 11.5px; color: var(--text-on-dark-3); text-transform: uppercase; letter-spacing: 0.06em; }

.projects { position: relative; }

.pf__filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
.pf__tab {
  padding: 9px 20px; background: var(--white); color: var(--text);
  font-size: 14px; font-weight: 600;
  border: 1.5px solid var(--border); border-radius: var(--radius-pill);
  transition: all 0.2s;
}
.pf__tab:hover { border-color: var(--orange); color: var(--orange-dark); }
.pf__tab--active { background: var(--navy); color: var(--white); border-color: var(--navy); }

.pf__add-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px; margin-left: auto;
  background: rgba(var(--orange-rgb), 0.12); color: var(--orange-dark);
  font-size: 14px; font-weight: 600;
  border: 1.5px dashed rgba(var(--orange-rgb), 0.4); border-radius: var(--radius-pill);
}
.pf__add-btn:hover { background: rgba(var(--orange-rgb), 0.2); }

.pf__add-form {
  background: var(--white); border: 1.5px dashed var(--border);
  border-radius: var(--radius-lg); padding: 22px; margin-bottom: 28px;
  display: flex; flex-direction: column; gap: 12px;
}
.pf__add-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
.pf__add-form label { display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; font-weight: 600; color: var(--navy); }
.pf__add-form input, .pf__add-form select, .pf__add-form textarea {
  padding: 9px 11px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
  font-size: 13.5px; color: var(--text); font-family: var(--font-body);
}
.pf__add-actions { display: flex; gap: 10px; }
.pf__add-actions .btn-primary { padding: 9px 20px; font-size: 13.5px; }
.pf__add-cancel { background: none; color: var(--muted); font-size: 13.5px; font-weight: 600; }

.pf__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

.pf__empty { text-align: center; color: var(--muted); font-size: 15px; padding: 40px 0; }

@media (max-width: 1024px) { .pf__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .pf__grid { grid-template-columns: 1fr; } }

/* ─── ФИНАЛЬНЫЙ БЛОК-ПРИГЛАШЕНИЕ ──────────────────────────── */
.cta-bridge { position: relative; overflow: hidden; background: var(--navy); padding-bottom: 96px; }

.cta-bridge__inner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
  border-radius: var(--radius-lg);
  padding: 40px 44px;
}
.cta-bridge__inner h2 { font-size: 26px; font-weight: 800; color: var(--text-on-dark); margin-bottom: 8px; }
.cta-bridge__inner p  { font-size: 15px; color: var(--text-on-dark-2); }

@media (max-width: 700px) {
  .cta-bridge__inner { padding: 30px 26px; text-align: center; justify-content: center; }
  .cta-bridge__inner button { width: 100%; justify-content: center; }
}
</style>
