import { ref, computed } from 'vue'
import { useGithubPublish } from './useGithubPublish.js'

/*
  ═══════════════════════════════════════════════════════════
  createEditableList — общий «движок» для редактируемых списков
  (портфолио и услуги используют его одинаково).
  ═══════════════════════════════════════════════════════════

  ВАЖНО: это ФАБРИКА. Она должна быть вызвана ОДИН РАЗ на уровне
  модуля — в usePortfolioData.js и useServicesData.js (см. эти
  файлы). Если вызвать её прямо внутри компонента, каждый компонент
  получит СВОЙ собственный items — и они не будут видеть правки
  друг друга. Поэтому сами компоненты не используют эту фабрику
  напрямую.

  options:
    defaultData    — исходный массив (то, что сейчас в файле на GitHub)
    filePath       — путь к файлу в репозитории, например 'src/data/services.js'
    varName        — имя переменной в этом файле, например 'services'
    fileComment    — комментарий, который останется в начале файла
*/
export function createEditableList({ defaultData, filePath, varName, fileComment }) {
  // items — рабочая копия. Редактируешь её — видишь изменения сразу
  // (это просто реактивный ref), но в файле на GitHub пока ничего не поменялось.
  const items = ref(JSON.parse(JSON.stringify(defaultData)))

  // isDirty — «есть несохранённые изменения». Сравниваем текущий items
  // с исходными данными: если отличаются — true.
  const isDirty = computed(
    () => JSON.stringify(items.value) !== JSON.stringify(defaultData)
  )

  const isPublishing   = ref(false)
  const publishError   = ref('')
  const publishSuccess = ref(false)

  function addItem(item) {
    items.value.push(item)
  }

  function updateItem(id, fields) {
    const index = items.value.findIndex((i) => i.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...fields }
    }
  }

  function deleteItem(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function resetToDefaults() {
    items.value = JSON.parse(JSON.stringify(defaultData))
  }

  // Собираем итоговый ТЕКСТ файла .js — ровно в том виде,
  // в котором он должен лежать в src/data/
  function buildFileContent() {
    const body = JSON.stringify(items.value, null, 2)
    return `${fileComment}\n\nexport const ${varName} = ${body}\n`
  }

  /*
    publish — отправляет файл на GitHub через useGithubPublish.
    После успеха GitHub Actions сам пересоберёт и выложит сайт
    (обычно занимает 30–90 секунд).
  */
  async function publish(commitMessage) {
    isPublishing.value = true
    publishError.value = ''
    publishSuccess.value = false

    const { publishFile } = useGithubPublish()
    const result = await publishFile(filePath, buildFileContent(), commitMessage)

    isPublishing.value = false
    if (result.success) {
      publishSuccess.value = true
    } else {
      publishError.value = result.error
    }
    return result.success
  }

  return {
    items, isDirty, addItem, updateItem, deleteItem, resetToDefaults,
    publish, isPublishing, publishError, publishSuccess, buildFileContent,
  }
}
