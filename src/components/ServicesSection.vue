<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useServicesData } from '../composables/useServicesData.js'
import { useAdmin } from '../composables/useAdmin.js'

const { items: services, addItem, updateItem, deleteItem } = useServicesData()
const { isAdmin } = useAdmin()

function scrollToContacts() {
  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
}

// ─── РЕДАКТИРОВАНИЕ ОДНОЙ КАРТОЧКИ ────────────────────────────
// editingId === id услуги, которая сейчас редактируется (или null — никто)
const editingId = ref(null)
const draft = ref(null)

function startEdit(service) {
  draft.value = { ...service }
  editingId.value = service.id
}
function cancelEdit() {
  editingId.value = null
  draft.value = null
}
function saveEdit() {
  updateItem(editingId.value, { ...draft.value })
  editingId.value = null
  draft.value = null
}
function handleDelete(service) {
  if (confirm(`Удалить услугу «${service.title}»?`)) {
    deleteItem(service.id)
  }
}

// ─── ДОБАВЛЕНИЕ НОВОЙ УСЛУГИ ───────────────────────────────────
const showAddForm = ref(false)
const newService = ref(blankService())

function blankService() {
  return { icon: 'wrench', tag: '', title: '', desc: '', price: '' }
}

function submitNewService() {
  if (!newService.value.title.trim()) return
  addItem({
    id: Date.now(),
    icon: newService.value.icon,
    tag: newService.value.tag.trim() || null,
    title: newService.value.title,
    desc: newService.value.desc,
    price: newService.value.price,
  })
  newService.value = blankService()
  showAddForm.value = false
}
</script>

<template>
  <section id="services" class="section section--light services">

    <div class="section-orbs">
      <div class="orb orb--orange-soft" style="width:500px; height:500px; top:-150px; right:-100px;"></div>
    </div>

    <div class="container">

      <div class="section-header" v-reveal>
        <span class="section-eyebrow">
          <AppIcon name="wrench" :size="14" />
          Что я делаю
        </span>
        <h2 class="section-title">Мои услуги</h2>
        <p class="section-desc">
          Все виды ремонтных работ — от косметического освежения до полной перепланировки.
        </p>
      </div>

      <!-- Кнопка добавления услуги — только для админа -->
      <div v-if="isAdmin" class="s__admin-row">
        <button class="pf__add-btn" @click="showAddForm = !showAddForm">
          <AppIcon name="arrow-up" :size="14" style="transform: rotate(45deg)" />
          Добавить услугу
        </button>
      </div>

      <div v-if="showAddForm" class="s__add-form">
        <div class="s__add-row">
          <label>Название<input v-model="newService.title" type="text" placeholder="Например: Демонтаж" /></label>
          <label>Цена<input v-model="newService.price" type="text" placeholder="от 300 ₽/м²" /></label>
        </div>
        <label>Описание<textarea v-model="newService.desc" rows="2"></textarea></label>
        <label>Тег (необязательно)<input v-model="newService.tag" type="text" placeholder="Популярно" /></label>
        <div class="s__add-actions">
          <button class="btn-primary" @click="submitNewService">Добавить</button>
          <button class="s__add-cancel" @click="showAddForm = false">Отмена</button>
        </div>
      </div>

      <div class="s__grid">
        <div
          v-for="(s, i) in services"
          :key="s.id"
          class="s-card glass-light"
          :class="{ 's-card--featured': s.tag }"
          v-reveal="i * 90"
        >
          <!-- Админ-кнопки -->
          <div v-if="isAdmin && editingId !== s.id" class="s-card__admin-actions">
            <button class="s-card__admin-btn" @click="startEdit(s)" aria-label="Редактировать">
              <AppIcon name="document" :size="13" />
            </button>
            <button class="s-card__admin-btn s-card__admin-btn--danger" @click="handleDelete(s)" aria-label="Удалить">
              <AppIcon name="x-mark" :size="13" />
            </button>
          </div>

          <!-- РЕЖИМ ПРОСМОТРА -->
          <template v-if="editingId !== s.id">
            <div v-if="s.tag" class="s-card__tag">{{ s.tag }}</div>

            <div class="s-card__icon"><AppIcon :name="s.icon" :size="20" /></div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>

            <div class="s-card__footer">
              <span class="s-card__price">{{ s.price }}</span>
              <button class="s-card__btn" @click="scrollToContacts">
                Заказать
                <AppIcon name="arrow-right" :size="14" />
              </button>
            </div>
          </template>

          <!-- РЕЖИМ РЕДАКТИРОВАНИЯ -->
          <div v-else class="s-card__edit-form">
            <label>Название<input v-model="draft.title" type="text" /></label>
            <label>Описание<textarea v-model="draft.desc" rows="3"></textarea></label>
            <label>Цена<input v-model="draft.price" type="text" /></label>
            <label>Тег<input v-model="draft.tag" type="text" placeholder="(пусто, если нет)" /></label>
            <div class="s-card__edit-actions">
              <button class="btn-primary" @click="saveEdit">Сохранить</button>
              <button class="s__add-cancel" @click="cancelEdit">Отмена</button>
            </div>
          </div>
        </div>
      </div>

      <p class="s__note" v-reveal>
        <AppIcon name="chat" :size="15" />
        Здесь — основные направления. Полный перечень и точный состав работ
        обсуждаем индивидуально:
        <button class="s__note-link" @click="scrollToContacts">уточните по контактам</button>.
      </p>

    </div>
  </section>
</template>

<style scoped>
.services { position: relative; overflow: hidden; }
.s__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

.s-card {
  position: relative;
  border-radius: var(--radius-lg);
  padding: 30px 26px;
  display: flex; flex-direction: column; gap: 12px;
  transition: transform 0.25s, border-color 0.25s;
}
.s-card:hover { transform: translateY(-5px); border-color: rgba(var(--orange-rgb), 0.4); }
.s-card--featured { border-color: rgba(var(--orange-rgb), 0.45); }

.s-card__tag {
  position: absolute; top: -12px; left: 26px;
  background: var(--orange); color: var(--navy-dark);
  font-size: 11px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
  padding: 4px 12px; border-radius: var(--radius-pill);
}

.s-card__icon {
  width: 40px; height: 40px;
  background: transparent; color: var(--orange-dark);
  border: 1.5px solid rgba(var(--orange-rgb), 0.35);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

.s-card h3 { font-size: 18px; font-weight: 700; color: var(--navy); }
.s-card p  { font-size: 14px; color: var(--muted); line-height: 1.62; flex: 1; }

.s-card__footer {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.07);
}
.s-card__price { font-size: 14px; font-weight: 700; color: var(--orange-dark); }
.s-card__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; background: var(--navy); color: var(--white);
  font-size: 13px; font-weight: 600; border-radius: var(--radius-pill);
  transition: background 0.2s;
}
.s-card__btn:hover { background: var(--orange-dark); }

/* ─── АДМИН: КНОПКИ НА КАРТОЧКЕ ───────────────────────────── */
.s-card__admin-actions { position: absolute; top: 12px; right: 12px; z-index: 2; display: flex; gap: 6px; }
.s-card__admin-btn {
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,0.08); color: var(--navy);
  display: flex; align-items: center; justify-content: center;
}
.s-card__admin-btn:hover { background: var(--orange); color: var(--navy-dark); }
.s-card__admin-btn--danger:hover { background: #ef4444; color: var(--white); }

/* ─── АДМИН: ФОРМА РЕДАКТИРОВАНИЯ В КАРТОЧКЕ ──────────────── */
.s-card__edit-form { display: flex; flex-direction: column; gap: 9px; }
.s-card__edit-form label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; font-weight: 600; color: var(--navy); }
.s-card__edit-form input, .s-card__edit-form textarea {
  padding: 7px 9px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
  font-size: 13px; color: var(--text); font-family: var(--font-body);
}
.s-card__edit-actions { display: flex; gap: 8px; margin-top: 2px; }
.s-card__edit-actions .btn-primary { padding: 8px 16px; font-size: 12.5px; }

/* ─── АДМИН: КНОПКА И ФОРМА ДОБАВЛЕНИЯ ────────────────────── */
.s__admin-row { margin-bottom: 18px; }
.pf__add-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px;
  background: rgba(var(--orange-rgb), 0.12); color: var(--orange-dark);
  font-size: 14px; font-weight: 600;
  border: 1.5px dashed rgba(var(--orange-rgb), 0.4); border-radius: var(--radius-pill);
}
.pf__add-btn:hover { background: rgba(var(--orange-rgb), 0.2); }

.s__add-form {
  background: var(--white); border: 1.5px dashed var(--border);
  border-radius: var(--radius-lg); padding: 22px; margin-bottom: 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.s__add-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
.s__add-form label { display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; font-weight: 600; color: var(--navy); }
.s__add-form input, .s__add-form textarea {
  padding: 9px 11px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
  font-size: 13.5px; color: var(--text); font-family: var(--font-body);
}
.s__add-actions { display: flex; gap: 10px; }
.s__add-actions .btn-primary { padding: 9px 20px; font-size: 13.5px; }
.s__add-cancel { background: none; color: var(--muted); font-size: 13.5px; font-weight: 600; }

/* ─── ПОМЕТКА: список не исчерпывающий ───────────────────────── */
.s__note {
  display: flex; align-items: center; gap: 8px; justify-content: center; flex-wrap: wrap;
  margin-top: 28px; font-size: 14px; color: var(--muted); text-align: center;
}
.s__note svg { color: var(--orange-dark); flex-shrink: 0; }
.s__note-link {
  background: none; color: var(--orange-dark); font-size: 14px; font-weight: 600;
  text-decoration: underline; text-decoration-color: rgba(var(--orange-rgb), 0.4); padding: 0;
}
.s__note-link:hover { color: var(--navy); }

@media (max-width: 1024px) { .s__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .s__grid { grid-template-columns: 1fr; } }
</style>
