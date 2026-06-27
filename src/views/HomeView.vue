<script setup>
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

// Импортируем все компоненты секций
import NavBar            from '../components/NavBar.vue'
import HeroSection       from '../components/HeroSection.vue'
import ServicesSection   from '../components/ServicesSection.vue'
import AdvantagesSection from '../components/AdvantagesSection.vue'
import PortfolioSection  from '../components/PortfolioSection.vue'
import StepsSection      from '../components/StepsSection.vue'
import CalculatorSection from '../components/CalculatorSection.vue'
import PriceListSection  from '../components/PriceListSection.vue'
import ContactsSection   from '../components/ContactsSection.vue'
import FooterSection     from '../components/FooterSection.vue'

const route = useRoute()

/*
  Если мы попали на главную с другой страницы через NavBar/Footer
  (там это выглядит как router.push({ path: '/', query: { scrollTo: 'id' } })),
  то в route.query.scrollTo будет лежать id нужной секции.

  nextTick — ждём, пока Vue полностью дорисует все секции на странице
  (включая только что смонтированный HomeView), и только ПОСЛЕ этого
  ищем элемент и скроллим к нему. Без nextTick элемент мог бы ещё
  не существовать в DOM в момент вызова.
*/
onMounted(() => {
  if (route.query.scrollTo) {
    nextTick(() => {
      document.getElementById(route.query.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
    })
  }
})
</script>

<template>
  <NavBar />
  <HeroSection />
  <ServicesSection />
  <AdvantagesSection />
  <PortfolioSection />
  <StepsSection />
  <CalculatorSection />
  <PriceListSection />
  <ContactsSection />
  <FooterSection />
</template>
