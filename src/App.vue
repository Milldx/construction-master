<script setup>
import { RouterView } from 'vue-router'
import AdminPanel from './components/AdminPanel.vue'
</script>

<template>
  <!--
    AdminPanel — кнопка входа/плашка администратора.
    Лежит здесь (а не на каждой странице отдельно), чтобы быть
    доступной и на главной, и на /projects.
  -->
  <AdminPanel />

  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
