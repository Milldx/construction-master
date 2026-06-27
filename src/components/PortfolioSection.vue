<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'
import ProjectCard from './ProjectCard.vue'
import { usePortfolioData } from '../composables/usePortfolioData.js'

const filterTabs = [
  { label: 'Все работы', value: 'all'       },
  { label: 'Квартиры',   value: 'apartment' },
  { label: 'Ванные',     value: 'bathroom'  },
  { label: 'Кухни',      value: 'kitchen'   },
]

// items — теперь реактивный массив из общего хранилища (а не статичный импорт).
// Если админ добавит/удалит объект, previewItems пересчитается сам — это computed.
const { items } = usePortfolioData()
const previewItems = computed(() => items.value.slice(0, 6))

const activeFilter = ref('all')

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return previewItems.value
  return previewItems.value.filter(item => item.category === activeFilter.value)
})
</script>

<template>
  <section id="portfolio" class="section portfolio">

    <div class="section-orbs">
      <div class="orb orb--blue-soft" style="width:460px; height:460px; bottom:-160px; left:-100px;"></div>
    </div>

    <div class="container">

      <div class="section-header" v-reveal>
        <span class="section-eyebrow">
          <AppIcon name="camera" :size="14" />
          Мои работы
        </span>
        <h2 class="section-title">Портфолио</h2>
        <p class="section-desc">
          Реальные объекты, реальные клиенты. Каждый проект — с договором и гарантией.
        </p>
      </div>

      <div class="pf__filters" v-reveal="80">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          class="pf__tab"
          :class="{ 'pf__tab--active': activeFilter === tab.value }"
          @click="activeFilter = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- ProjectCard — переиспользуемый компонент, тот же что и на /projects -->
      <div class="pf__grid">
        <ProjectCard
          v-for="(item, i) in filteredItems"
          :key="item.id"
          :item="item"
          v-reveal="i * 80"
        />
      </div>

      <div class="pf__more" v-reveal>
        <!--
          RouterLink — переход на ВТОРУЮ страницу (/projects), а не скролл по якорю.
          Раньше эта кнопка просто сбрасывала фильтр на главной — теперь ведёт
          на отдельную страницу со ВСЕМИ объектами.
        -->
        <RouterLink to="/projects" class="btn-outline-dark">
          Смотреть все работы
          <AppIcon name="arrow-right" :size="16" />
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
.portfolio { position: relative; overflow: hidden; }

.pf__filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
.pf__tab {
  padding: 9px 20px; background: var(--white); color: var(--text);
  font-size: 14px; font-weight: 600;
  border: 1.5px solid var(--border); border-radius: var(--radius-pill);
  transition: all 0.2s;
}
.pf__tab:hover { border-color: var(--orange); color: var(--orange-dark); }
.pf__tab--active { background: var(--navy); color: var(--white); border-color: var(--navy); }

.pf__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }

.pf__more { text-align: center; }

@media (max-width: 1024px) { .pf__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .pf__grid { grid-template-columns: 1fr; } }
</style>
