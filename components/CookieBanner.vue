<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)
const COOKIE_KEY = 'rp_cookie_choice'

onMounted(() => {
  const choice = localStorage.getItem(COOKIE_KEY)
  if (!choice) {
    visible.value = true
  }
})

const accept = () => {
  localStorage.setItem(COOKIE_KEY, 'accepted')
  visible.value = false
}

const decline = () => {
  localStorage.setItem(COOKIE_KEY, 'declined')
  visible.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div v-if="visible" class="cookie-banner fixed bottom-0 left-0 right-0 z-[100] px-4 py-0">
      <div class="cookie-container max-w-4xl mx-auto p-5 rounded-t-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon="fa-solid fa-cookie-bite" class="text-lg" />
            <span class="font-semibold text-sm">Cookies & Confidentialité</span>
          </div>
          <p class="text-xs opacity-80 leading-relaxed">
            Ce site utilise uniquement des cookies essentiels au fonctionnement (session, préférences).
            Aucun cookie publicitaire ou de suivi n'est utilisé.
            En continuant, vous acceptez notre
            <a href="#" class="cookie-link underline">politique de confidentialité</a>.
          </p>
        </div>
        <div class="flex gap-3 shrink-0">
          <button @click="decline" class="cookie-btn-decline px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
            Refuser
          </button>
          <button @click="accept" class="cookie-btn-accept px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
            Accepter
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-container {
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid rgba(0, 51, 153, 0.2);
  border-bottom: none;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
  color: var(--text-light);
}

.dark .cookie-container {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(77, 127, 191, 0.25);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
  color: var(--text-dark);
}

.cookie-link {
  color: #003399;
}

.dark .cookie-link {
  color: #4d7fbf;
}

.cookie-btn-decline {
  background: transparent;
  border: 1px solid rgba(0, 51, 153, 0.3);
  color: var(--text-light);
}

.dark .cookie-btn-decline {
  border-color: rgba(77, 127, 191, 0.3);
  color: var(--text-dark);
}

.cookie-btn-decline:hover {
  background: rgba(0, 51, 153, 0.08);
}

.dark .cookie-btn-decline:hover {
  background: rgba(77, 127, 191, 0.1);
}

.cookie-btn-accept {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 51, 153, 0.3);
}

.dark .cookie-btn-accept {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
  box-shadow: 0 4px 12px rgba(77, 127, 191, 0.3);
}

.cookie-btn-accept:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 51, 153, 0.4);
}

/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
