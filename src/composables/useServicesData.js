import { createEditableList } from './createEditableList.js'
import { services } from '../data/services.js'

const servicesStore = createEditableList({
  defaultData: services,
  filePath: 'src/data/services.js',
  varName: 'services',
  fileComment: `/*
  Список услуг.
  Этот файл обновляется автоматически через админ-панель сайта
  (кнопка «Опубликовать изменения») — редактировать руками тоже можно.
*/`,
})

export function useServicesData() {
  return servicesStore
}
