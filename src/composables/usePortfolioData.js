import { createEditableList } from './createEditableList.js'
import { portfolioItems } from '../data/portfolioItems.js'

/*
  createEditableList() вызван здесь, на уровне модуля — ОДИН раз
  за всё время жизни приложения. portfolioStore — общий объект,
  который получит любой компонент, импортировавший usePortfolioData.
*/
const portfolioStore = createEditableList({
  defaultData: portfolioItems,
  filePath: 'src/data/portfolioItems.js',
  varName: 'portfolioItems',
  fileComment: `/*
  Общий список выполненных объектов.
  Этот файл обновляется автоматически через админ-панель сайта
  (кнопка «Опубликовать изменения») — редактировать руками тоже можно.
*/`,
})

export function usePortfolioData() {
  return portfolioStore
}
