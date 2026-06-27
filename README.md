# 🔨 МастерСтрой — Лендинг для мастера по ремонту

Учебный проект: Production Practice, Vue 3 + Vite

## 🚀 Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Запустить дев-сервер
npm run dev

# 3. Открыть в браузере
# http://localhost:5173
```

## 📁 Структура проекта

```
src/
├── assets/
│   └── style.css            ← Глобальные стили, CSS-переменные
├── components/
│   ├── NavBar.vue            ← Шапка с мобильным меню (fixed)
│   ├── HeroSection.vue       ← Первый экран, статистика
│   ├── ServicesSection.vue   ← Сетка услуг с ценами
│   ├── AdvantagesSection.vue ← Преимущества, большие числа
│   ├── PortfolioSection.vue  ← Портфолио с фильтром (computed)
│   ├── StepsSection.vue      ← Этапы сотрудничества
│   ├── CalculatorSection.vue ← Калькулятор (ref + computed) ⭐
│   ├── ReviewsSection.vue    ← Отзывы клиентов
│   ├── ContactsSection.vue   ← Контакты + форма (watch)
│   └── FooterSection.vue     ← Подвал
├── router/
│   └── index.js              ← Vue Router (один маршрут /)
├── views/
│   └── HomeView.vue          ← Сборка всех секций
├── App.vue                   ← Корневой компонент
└── main.js                   ← Точка входа
```

## ⭐ Ключевые концепции Vue в проекте

| Компонент | Что изучить |
|---|---|
| `CalculatorSection.vue` | `ref`, `computed`, `v-model`, `v-model.number` |
| `PortfolioSection.vue` | `computed` с фильтром массива, `:class` динамический |
| `NavBar.vue` | `onMounted`, `onUnmounted`, `watch` scroll события |
| `ContactsSection.vue` | `watch`, валидация, `v-if/v-else`, `@submit.prevent` |
| `HeroSection.vue` | `v-for`, `:style`, `clamp()` в CSS |

## 🌿 Работа с Git

```bash
# Первый раз (инициализация)
git init
git add .
git commit -m "feat: initial project setup"
git branch -M main
git remote add origin https://github.com/ИМЯ/construction-master.git
git push -u origin main
```

## 🌐 Публикация на GitHub Pages

```bash
# 1. Раскомментировать в vite.config.js:
# base: '/construction-master/'

# 2. Установить gh-pages
npm install --save-dev gh-pages

# 3. Добавить в package.json в "scripts":
# "deploy": "vite build && gh-pages -d dist"

# 4. Задеплоить
npm run deploy
```

## 🎨 Цвета проекта (CSS-переменные)

```css
--navy:   #1c2b3a   /* Тёмно-синий */
--orange: #f4a235   /* Строительный оранжевый */
--text:   #374151   /* Основной текст */
--muted:  #6b7280   /* Вторичный текст */
--light:  #f7f8fa   /* Светлый фон секций */
```
