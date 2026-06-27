<script setup>
import { ref, computed } from 'vue'
import { useAdmin } from '../composables/useAdmin.js'
import { usePortfolioData } from '../composables/usePortfolioData.js'
import { useServicesData } from '../composables/useServicesData.js'
import AppIcon from './AppIcon.vue'

const { isAdmin, isChecking, loginError, verifyAndLogin, logout } = useAdmin()

const portfolio = usePortfolioData()
const services  = useServicesData()

// ─── ФОРМА ВХОДА ─────────────────────────────────────────────
const showLogin = ref(false)
const ownerInput = ref('')
const repoInput  = ref('')
const tokenInput = ref('')

async function handleLogin() {
  const ok = await verifyAndLogin({
    ownerInput: ownerInput.value.trim(),
    repoInput: repoInput.value.trim(),
    tokenInput: tokenInput.value.trim(),
  })
  if (ok) showLogin.value = false
}

// ─── ПУБЛИКАЦИЯ ──────────────────────────────────────────────
// Сколько всего хранилищ с несохранёнными изменениями
const dirtyCount = computed(() => Number(portfolio.isDirty.value) + Number(services.isDirty.value))

const isPublishingAny = computed(() => portfolio.isPublishing.value || services.isPublishing.value)
const combinedError   = computed(() => portfolio.publishError.value || services.publishError.value)
const justPublished   = ref(false)

async function publishAll() {
  justPublished.value = false
  let allOk = true

  if (portfolio.isDirty.value) {
    const ok = await portfolio.publish('Обновление портфолио через админ-панель')
    if (!ok) allOk = false
  }
  if (services.isDirty.value) {
    const ok = await services.publish('Обновление услуг через админ-панель')
    if (!ok) allOk = false
  }

  if (allOk) justPublished.value = true
}
</script>

<template>
  <!-- ═══ НЕ ВОШЛИ: маленькая плавающая кнопка в углу ═══ -->
  <button
    v-if="!isAdmin"
    class="admin-fab glass"
    @click="showLogin = !showLogin"
    aria-label="Войти как администратор"
  >
    <AppIcon name="user" :size="18" />
  </button>

  <!-- ═══ ФОРМА ВХОДА ═══ -->
  <div v-if="!isAdmin && showLogin" class="admin-login glass">
    <h3>Вход для администратора</h3>
    <p class="admin-login__hint">
      Нужен GitHub-токен с доступом на запись в репозиторий сайта.
      Как его получить — см. инструкцию в README проекта.
    </p>

    <div class="admin-login__field">
      <label>Имя пользователя GitHub</label>
      <input v-model="ownerInput" type="text" placeholder="например, ivan-petrov" />
    </div>

    <div class="admin-login__field">
      <label>Название репозитория</label>
      <input v-model="repoInput" type="text" placeholder="например, construction-master" />
    </div>

    <div class="admin-login__field">
      <label>Personal Access Token</label>
      <input v-model="tokenInput" type="password" placeholder="ghp_..." />
    </div>

    <p v-if="loginError" class="admin-login__error">{{ loginError }}</p>

    <button class="btn-primary" :disabled="isChecking" @click="handleLogin">
      {{ isChecking ? 'Проверяю…' : 'Подключиться' }}
    </button>
  </div>

  <!-- ═══ ВОШЛИ: верхняя плашка ═══ -->
  <div v-if="isAdmin" class="admin-bar glass">
    <div class="admin-bar__inner container">
      <span class="admin-bar__status">
        <span class="admin-bar__dot"></span>
        Режим администратора
      </span>

      <span v-if="dirtyCount > 0" class="admin-bar__dirty">
        Не опубликовано: {{ dirtyCount }}
      </span>

      <span v-if="justPublished" class="admin-bar__success">
        <AppIcon name="check-circle" :size="15" />
        Опубликовано
      </span>
      <span v-if="combinedError" class="admin-bar__error">{{ combinedError }}</span>

      <div class="admin-bar__actions">
        <button
          v-if="dirtyCount > 0"
          class="btn-primary admin-bar__publish"
          :disabled="isPublishingAny"
          @click="publishAll"
        >
          {{ isPublishingAny ? 'Публикую…' : 'Опубликовать изменения' }}
        </button>
        <button class="admin-bar__logout" @click="logout">Выйти</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── КНОПКА ВХОДА ────────────────────────────────────────── */
.admin-fab {
  position: fixed;
  bottom: 24px; right: 24px;
  z-index: 1200;
  width: 44px; height: 44px;
  border-radius: 50%;
  color: var(--text-on-dark-2);
  display: flex; align-items: center; justify-content: center;
  transition: color 0.2s;
}
.admin-fab:hover { color: var(--orange); }

/* ─── ФОРМА ВХОДА ─────────────────────────────────────────── */
.admin-login {
  position: fixed;
  bottom: 78px; right: 24px;
  z-index: 1200;
  width: 300px;
  border-radius: var(--radius-lg);
  padding: 22px;
  display: flex; flex-direction: column; gap: 12px;
}
.admin-login h3 { font-size: 16px; font-weight: 700; color: var(--text-on-dark); }
.admin-login__hint { font-size: 12.5px; color: var(--text-on-dark-3); line-height: 1.5; margin-bottom: 4px; }

.admin-login__field { display: flex; flex-direction: column; gap: 5px; }
.admin-login__field label { font-size: 12.5px; font-weight: 600; color: var(--text-on-dark-2); }
.admin-login__field input {
  padding: 9px 11px;
  background: rgba(255,255,255,0.07);
  border: 1px solid var(--glass-dark-border);
  border-radius: var(--radius-sm);
  font-size: 13.5px; color: var(--text-on-dark);
}
.admin-login__field input:focus { border-color: var(--orange); outline: none; }

.admin-login__error { font-size: 12.5px; color: #ff8585; }
.admin-login button { width: 100%; justify-content: center; padding: 10px; font-size: 13.5px; margin-top: 4px; }

/* ─── ВЕРХНЯЯ ПЛАШКА АДМИНА ───────────────────────────────── */
/*
  top: 66px — это высота шапки (.navbar__inner в NavBar.vue).
  Плашка садится ПОД навбаром, а не поверх него.
  Если поменяешь высоту навбара — поправь и это число.
*/
.admin-bar {
  position: fixed; top: 66px; left: 0; right: 0; z-index: 999;
  border-top: none; border-left: none; border-right: none;
  background: rgba(180, 60, 30, 0.55) !important;
}
.admin-bar__inner { display: flex; align-items: center; gap: 18px; padding: 9px 24px; flex-wrap: wrap; }

.admin-bar__status { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--text-on-dark); }
.admin-bar__dot { width: 7px; height: 7px; border-radius: 50%; background: #4ADE80; }

.admin-bar__dirty  { font-size: 12.5px; color: var(--text-on-dark-2); }
.admin-bar__success{ display: flex; align-items: center; gap: 5px; font-size: 12.5px; color: #4ADE80; }
.admin-bar__error  { font-size: 12.5px; color: #ffb4b4; }

.admin-bar__actions { display: flex; gap: 10px; margin-left: auto; }
.admin-bar__publish { padding: 7px 16px; font-size: 12.5px; box-shadow: none; }
.admin-bar__logout {
  background: none; color: var(--text-on-dark-2); font-size: 12.5px; font-weight: 600;
  padding: 7px 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-pill);
}
.admin-bar__logout:hover { color: var(--text-on-dark); }

@media (max-width: 700px) {
  .admin-bar__inner { padding: 9px 16px; }
  .admin-bar__dirty { display: none; }
}
</style>
