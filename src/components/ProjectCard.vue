<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useAdmin } from '../composables/useAdmin.js'
import { usePortfolioData } from '../composables/usePortfolioData.js'

/*
  defineProps — «входные данные» компонента.
  Карточка получает ОДИН объект item через атрибут:
    <ProjectCard :item="someProject" />
*/
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const categoryLabel = { apartment: 'Квартира', bathroom: 'Ванная', kitchen: 'Кухня' }

// ─── АДМИН-РЕДАКТИРОВАНИЕ ────────────────────────────────────
const { isAdmin } = useAdmin()
const { updateItem, deleteItem } = usePortfolioData()

const isEditing = ref(false)
// draft — отдельная копия полей для редактирования.
// Если бы мы правили props.item напрямую, отмена была бы невозможна —
// поэтому работаем с копией и применяем её только по кнопке "Сохранить".
const draft = ref({ ...props.item, tagsText: props.item.tags.join(', ') })

function startEdit() {
  draft.value = { ...props.item, tagsText: props.item.tags.join(', ') }
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
}

function saveEdit() {
  updateItem(props.item.id, {
    title: draft.value.title,
    category: draft.value.category,
    area: draft.value.area,
    city: draft.value.city,
    duration: draft.value.duration,
    desc: draft.value.desc,
    // tagsText → обратно в массив: разбиваем по запятой, убираем пробелы и пустые элементы
    tags: draft.value.tagsText.split(',').map((t) => t.trim()).filter(Boolean),
  })
  isEditing.value = false
}

function handleDelete() {
  if (confirm(`Удалить объект «${props.item.title}»? Это действие не опубликуется само — не забудь нажать «Опубликовать изменения».`)) {
    deleteItem(props.item.id)
  }
}
</script>

<template>
  <div class="pf-card glass-light" :class="{ 'pf-card--editing': isEditing }">

    <!-- ═══ АДМИН-КНОПКИ (видны только в режиме администратора) ═══ -->
    <div v-if="isAdmin && !isEditing" class="pf-card__admin-actions">
      <button class="pf-card__admin-btn" @click="startEdit" aria-label="Редактировать">
        <AppIcon name="document" :size="14" />
      </button>
      <button class="pf-card__admin-btn pf-card__admin-btn--danger" @click="handleDelete" aria-label="Удалить">
        <AppIcon name="x-mark" :size="14" />
      </button>
    </div>

    <!-- ═══ РЕЖИМ ПРОСМОТРА ═══ -->
    <template v-if="!isEditing">
      <div class="pf-card__image" :style="`background: hsl(${item.hue}, 65%, 50%)`">
        <span class="pf-card__category">{{ categoryLabel[item.category] }}</span>
        <span class="pf-card__area">{{ item.area }}</span>
      </div>

      <div class="pf-card__body">
        <h3>{{ item.title }}</h3>
        <p class="pf-card__desc">{{ item.desc }}</p>

        <div class="pf-card__tags">
          <span v-for="tag in item.tags" :key="tag" class="pf-card__tag-chip">{{ tag }}</span>
        </div>

        <div class="pf-card__meta">
          <span><AppIcon name="map-pin" :size="13" />{{ item.city }}</span>
          <span><AppIcon name="clock" :size="13" />{{ item.duration }}</span>
        </div>
      </div>
    </template>

    <!-- ═══ РЕЖИМ РЕДАКТИРОВАНИЯ (видно только админу) ═══ -->
    <div v-else class="pf-card__edit-form">
      <label>Название<input v-model="draft.title" type="text" /></label>

      <label>
        Категория
        <select v-model="draft.category">
          <option value="apartment">Квартира</option>
          <option value="bathroom">Ванная</option>
          <option value="kitchen">Кухня</option>
        </select>
      </label>

      <div class="pf-card__edit-row">
        <label>Площадь<input v-model="draft.area" type="text" /></label>
        <label>Срок<input v-model="draft.duration" type="text" /></label>
      </div>

      <label>Город/район<input v-model="draft.city" type="text" /></label>
      <label>Описание<textarea v-model="draft.desc" rows="3"></textarea></label>
      <label>Теги (через запятую)<input v-model="draft.tagsText" type="text" /></label>

      <div class="pf-card__edit-actions">
        <button class="btn-primary" @click="saveEdit">Сохранить</button>
        <button class="pf-card__cancel-btn" @click="cancelEdit">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pf-card { position: relative; border-radius: var(--radius-lg); overflow: hidden; transition: transform 0.25s, box-shadow 0.25s; }
.pf-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.pf-card--editing:hover { transform: none; }

.pf-card__image { position: relative; height: 200px; }

.pf-card__category {
  position: absolute; bottom: 14px; left: 14px;
  background: rgba(0,0,0,0.45); color: var(--white);
  font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: var(--radius-pill);
  backdrop-filter: blur(6px);
}
.pf-card__area {
  position: absolute; bottom: 14px; right: 14px;
  background: var(--orange); color: var(--navy-dark);
  font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-pill);
}

.pf-card__body { padding: 18px 20px 20px; }
.pf-card__body h3 { font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }

.pf-card__desc { font-size: 13.5px; color: var(--muted); line-height: 1.55; margin-bottom: 12px; }

.pf-card__tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.pf-card__tag-chip {
  font-size: 12px; font-weight: 600; color: var(--orange-dark);
  background: rgba(var(--orange-rgb), 0.12);
  padding: 3px 10px; border-radius: var(--radius-pill);
}

.pf-card__meta { display: flex; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.07); }
.pf-card__meta span { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; color: var(--muted); }

/* ─── АДМИН-КНОПКИ НА КАРТОЧКЕ ────────────────────────────── */
.pf-card__admin-actions {
  position: absolute; top: 10px; left: 10px; z-index: 2;
  display: flex; gap: 6px;
}
.pf-card__admin-btn {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(0,0,0,0.55); color: var(--white);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(6px);
}
.pf-card__admin-btn:hover { background: var(--orange); color: var(--navy-dark); }
.pf-card__admin-btn--danger:hover { background: #ef4444; color: var(--white); }

/* ─── ФОРМА РЕДАКТИРОВАНИЯ ─────────────────────────────────── */
.pf-card__edit-form { padding: 20px; display: flex; flex-direction: column; gap: 10px; background: var(--white); }
.pf-card__edit-form label { display: flex; flex-direction: column; gap: 4px; font-size: 12.5px; font-weight: 600; color: var(--navy); }
.pf-card__edit-form input, .pf-card__edit-form select, .pf-card__edit-form textarea {
  padding: 8px 10px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
  font-size: 13.5px; color: var(--text); font-family: var(--font-body);
}
.pf-card__edit-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pf-card__edit-actions { display: flex; gap: 8px; margin-top: 4px; }
.pf-card__edit-actions .btn-primary { padding: 9px 18px; font-size: 13px; }
.pf-card__cancel-btn { background: none; color: var(--muted); font-size: 13px; font-weight: 600; }
</style>
