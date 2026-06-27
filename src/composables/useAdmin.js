import { ref } from 'vue'

/*
  ═══════════════════════════════════════════════════════════
  useAdmin — состояние «режима администратора»
  ═══════════════════════════════════════════════════════════

  Важная идея: «пароль» здесь не нужен, потому что настоящий
  допуск к редактированию — это GitHub Personal Access Token
  (PAT) с правом записи именно в ТВОЙ репозиторий. Случайный
  посетитель сайта такого токена не знает и не может его подобрать.

  Креды (owner, repo, token) хранятся в localStorage — ТОЛЬКО
  в твоём браузере. Если зайти с другого устройства — там нужно
  будет ввести их повторно. Это нормально: токен — секрет,
  его не зашивают в код сайта (иначе он был бы виден всем).

  Этот файл написан как «синглтон»: переменные admin* созданы
  ОДИН раз на уровне модуля (не внутри функции). Поэтому какой
  компонент ни импортирует useAdmin() — все получают ОДНИ И ТЕ ЖЕ
  реактивные данные. Это и есть простое общее состояние без Pinia.
*/

const STORAGE_KEY = 'admin_github_credentials'

function loadSaved() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

const saved = loadSaved()

const owner    = ref(saved?.owner    || '')
const repo     = ref(saved?.repo     || '')
const token    = ref(saved?.token    || '')
const isAdmin  = ref(Boolean(saved))   // считаем «вошли», если креды уже сохранены
const isChecking = ref(false)
const loginError  = ref('')

/*
  Проверяем токен РЕАЛЬНЫМ запросом к GitHub —
  чтобы не выяснять, что токен неверный, только в момент публикации.
*/
async function verifyAndLogin({ ownerInput, repoInput, tokenInput }) {
  isChecking.value = true
  loginError.value = ''

  try {
    const res = await fetch(`https://api.github.com/repos/${ownerInput}/${repoInput}`, {
      headers: { Authorization: `token ${tokenInput}` },
    })

    if (res.status === 404) {
      loginError.value = 'Репозиторий не найден — проверь имя пользователя и название репозитория.'
      return false
    }
    if (res.status === 401) {
      loginError.value = 'Токен не принят GitHub — проверь, что скопировал его полностью.'
      return false
    }
    if (!res.ok) {
      loginError.value = `GitHub ответил ошибкой (${res.status}). Попробуй позже.`
      return false
    }

    const data = await res.json()
    // permissions.push показывает, может ли этот токен ЗАПИСЫВАТЬ в репозиторий
    if (!data.permissions?.push) {
      loginError.value = 'У токена нет прав на запись в этот репозиторий (нужен scope "Contents: Read and write").'
      return false
    }

    owner.value = ownerInput
    repo.value  = repoInput
    token.value = tokenInput
    isAdmin.value = true

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      owner: ownerInput, repo: repoInput, token: tokenInput,
    }))

    return true
  } catch (e) {
    loginError.value = 'Не получилось связаться с GitHub. Проверь интернет-соединение.'
    return false
  } finally {
    isChecking.value = false
  }
}

function logout() {
  isAdmin.value = false
  owner.value = ''
  repo.value = ''
  token.value = ''
  localStorage.removeItem(STORAGE_KEY)
}

export function useAdmin() {
  return { isAdmin, owner, repo, token, isChecking, loginError, verifyAndLogin, logout }
}
