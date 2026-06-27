<script setup>
/*
  LogoMark — логотип сайта: молоток, повёрнутый «в ударе».
  Та же геометрия, что в favicon.svg, только нарисована линией
  (stroke), а не заливкой — чтобы соответствовать тонкому
  минималистичному стилю остальных иконок (AppIcon.vue).

  currentColor — цвет наследуется от родителя через CSS `color`.
*/
defineProps({
  size: { type: [Number, String], default: 22 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    stroke-width="3.2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!--
      transform="rotate(-35 24 24)" — поворачиваем ВСЮ группу
      (боёк + ручку) на -35° вокруг центра иконки (24,24).
      Без поворота молоток выглядел бы как плоский крест —
      поворот даёт ощущение «удара».
    -->
    <g transform="rotate(-35 24 24)">
      <!-- Боёк (голова молотка) -->
      <rect x="13" y="7" width="22" height="11" rx="3" />
      <!-- Ручка -->
      <rect x="20.5" y="17" width="7" height="25" rx="3.5" />
    </g>
  </svg>
</template>
