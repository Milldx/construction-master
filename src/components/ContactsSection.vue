<script setup>
import { ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'

const contacts = [
  { icon:'phone',   label:'Телефон',      value:'+7 (999) 123-45-67',  href:'tel:+79991234567'           },
  { icon:'chat',    label:'WhatsApp',     value:'+7 (999) 123-45-67',  href:'https://wa.me/79991234567'  },
  { icon:'mail',    label:'Email',        value:'info@masterstroy.ru', href:'mailto:info@masterstroy.ru' },
  { icon:'map-pin', label:'Район работы', value:'Москва и МО',         href: null                        },
  { icon:'clock',   label:'Режим работы', value:'Пн–Вс: 8:00–21:00',   href: null                        },
]

const name    = ref('')
const phone   = ref('')
const message = ref('')

const nameError  = ref('')
const phoneError = ref('')

const isSubmitted = ref(false)
const isLoading   = ref(false)

watch(name,  () => { if (name.value.trim())  nameError.value  = '' })
watch(phone, () => { if (phone.value.trim()) phoneError.value = '' })

function validateForm() {
  let ok = true
  nameError.value = ''; phoneError.value = ''

  if (!name.value.trim()) { nameError.value = 'Введите ваше имя'; ok = false }

  const digits = phone.value.replace(/\D/g, '')
  if (!phone.value.trim())     { phoneError.value = 'Введите номер телефона'; ok = false }
  else if (digits.length < 10) { phoneError.value = 'Минимум 10 цифр'; ok = false }

  return ok
}

function handleSubmit() {
  if (!validateForm()) return
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isSubmitted.value = true
    name.value = phone.value = message.value = ''
  }, 1200)
}
</script>

<template>
  <section id="contacts" class="section contacts">

    <div class="section-orbs">
      <div class="orb orb--orange-soft" style="width:440px; height:440px; top:-100px; left:-80px;"></div>
    </div>

    <div class="container">

      <div class="section-header" v-reveal>
        <span class="section-eyebrow">
          <AppIcon name="phone" :size="14" />
          Свяжитесь со мной
        </span>
        <h2 class="section-title">Контакты</h2>
        <p class="section-desc">Оставьте заявку — перезвоню в течение 15 минут.</p>
      </div>

      <div class="ct__layout">

        <!-- ЛЕВАЯ: контакты -->
        <div class="ct__info" v-reveal>
          <div class="ct__list">
            <a v-for="c in contacts" :key="c.label" class="ct-item glass-light"
               :href="c.href || undefined" :class="{ 'ct-item--link': c.href }"
               target="_blank" rel="noopener">
              <div class="ct-item__icon"><AppIcon :name="c.icon" :size="18" /></div>
              <div class="ct-item__body">
                <span class="ct-item__label">{{ c.label }}</span>
                <span class="ct-item__value">{{ c.value }}</span>
              </div>
              <AppIcon v-if="c.href" name="chevron-right" :size="15" class="ct-item__arrow" />
            </a>
          </div>

          <div class="ct__badges">
            <div class="ct__badge"><AppIcon name="check" :size="14" />Перезвоню за 15 минут</div>
            <div class="ct__badge"><AppIcon name="check" :size="14" />Замер бесплатно</div>
            <div class="ct__badge"><AppIcon name="check" :size="14" />Договор с гарантией</div>
          </div>
        </div>

        <!-- ПРАВАЯ: форма -->
        <div class="ct__form-wrap glass-light" v-reveal="120">

          <div v-if="isSubmitted" class="ct__success">
            <div class="ct__success-icon"><AppIcon name="check-circle" :size="54" /></div>
            <h3>Заявка принята!</h3>
            <p>Перезвоню в течение 15 минут. Спасибо!</p>
            <button class="btn-primary" @click="isSubmitted = false">Отправить ещё одну</button>
          </div>

          <form v-else class="ct__form" @submit.prevent="handleSubmit">
            <h3>Оставить заявку</h3>

            <div class="f-field" :class="{ 'f-field--err': nameError }">
              <label for="f-name">Ваше имя *</label>
              <input id="f-name" type="text" v-model="name" placeholder="Иван Иванов" />
              <span v-if="nameError" class="f-error">{{ nameError }}</span>
            </div>

            <div class="f-field" :class="{ 'f-field--err': phoneError }">
              <label for="f-phone">Телефон *</label>
              <input id="f-phone" type="tel" v-model="phone" placeholder="+7 (999) 000-00-00" />
              <span v-if="phoneError" class="f-error">{{ phoneError }}</span>
            </div>

            <div class="f-field">
              <label for="f-msg">Опишите задачу</label>
              <textarea id="f-msg" v-model="message" placeholder="Нужен ремонт 3-комн. квартиры, 75 м²..." rows="4"></textarea>
            </div>

            <button type="submit" class="btn-primary ct__submit" :disabled="isLoading">
              <span v-if="isLoading">Отправляем...</span>
              <template v-else>Отправить заявку <AppIcon name="arrow-right" :size="18" /></template>
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts { position: relative; overflow: hidden; }
.ct__layout { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: start; }

.ct__list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 26px; }

.ct-item { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: var(--radius); transition: border-color 0.2s; }
.ct-item--link:hover { border-color: rgba(var(--orange-rgb), 0.4); }

.ct-item__icon {
  width: 38px; height: 38px;
  background: transparent; color: var(--orange-dark);
  border: 1.5px solid rgba(var(--orange-rgb), 0.3);
  border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.ct-item__body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.ct-item__label { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; }
.ct-item__value { font-size: 15px; font-weight: 600; color: var(--navy); }
.ct-item__arrow { color: var(--muted); flex-shrink: 0; }

.ct__badges { display: flex; flex-direction: column; gap: 8px; }
.ct__badge { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; color: var(--navy); padding: 10px 14px; background: #f0fdf4; border-left: 3px solid #22c55e; border-radius: var(--radius-sm); }
.ct__badge svg { color: #22c55e; flex-shrink: 0; }

.ct__form-wrap { border-radius: var(--radius-lg); padding: 36px 32px; }
.ct__form { display: flex; flex-direction: column; gap: 18px; }
.ct__form h3 { font-size: 21px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }

.f-field { display: flex; flex-direction: column; gap: 7px; }
.f-field label { font-size: 14px; font-weight: 600; color: var(--navy); }

.f-field input, .f-field textarea {
  padding: 13px 15px;
  background: rgba(255,255,255,0.6);
  border: 1.5px solid var(--border); border-radius: var(--radius);
  font-size: 15px; color: var(--text); font-family: var(--font-body);
  resize: none;
}
.f-field input:focus, .f-field textarea:focus { border-color: var(--orange); outline: none; }
.f-field--err input { border-color: #ef4444; }
.f-error { font-size: 13px; color: #ef4444; font-weight: 500; }

.ct__submit { width: 100%; justify-content: center; padding: 16px; font-size: 15px; }
.ct__submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.ct__success { display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; padding: 16px 0; }
.ct__success-icon { color: var(--orange-dark); }
.ct__success h3 { font-size: 23px; font-weight: 700; color: var(--navy); }
.ct__success p  { color: var(--muted); font-size: 15px; }

@media (max-width: 900px) { .ct__layout { grid-template-columns: 1fr; gap: 36px; } }
@media (max-width: 600px) { .ct__form-wrap { padding: 24px 18px; } }
</style>
