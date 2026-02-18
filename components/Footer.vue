<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const scrollY = ref(0)
const documentHeight = ref(0)
const windowHeight = ref(0)

const updateMeasurements = () => {
  scrollY.value = window.scrollY
  documentHeight.value = document.documentElement.scrollHeight
  windowHeight.value = window.innerHeight
}

// Footer visible: at top (initial state) OR at bottom of page
const isVisible = computed(() => {
  // If page is not scrollable, always show footer
  if (documentHeight.value <= windowHeight.value) return true
  
  // At top of page (initial state)
  const atTop = scrollY.value === 0
  
  // At bottom of page (within 50px tolerance)
  const atBottom = scrollY.value + windowHeight.value >= documentHeight.value - 50
  
  return atTop || atBottom
})

onMounted(() => {
  updateMeasurements()
  window.addEventListener('scroll', updateMeasurements)
  window.addEventListener('resize', updateMeasurements)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateMeasurements)
  window.removeEventListener('resize', updateMeasurements)
})
</script>

<template>
  <footer class="footer fixed bottom-0 left-0 right-0 z-40 transition-all duration-500" :class="{ 'opacity-0 pointer-events-none translate-y-full': !isVisible }">
    <div class="footer-content py-4 md:py-5">
      <!-- Centered content container matching page content -->
      <div class="footer-container">
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
          <!-- Brand -->
          <span class="brand-text text-sm font-medium hidden sm:block">Radical Prospérité</span>
          
          <!-- Social Icons - Horizontally aligned and centered with margins -->
          <div class="social-icons flex flex-row justify-center items-center gap-3 sm:gap-4 md:gap-5 mx-4 sm:mx-6 md:mx-8">
            <a href="https://x.com/RadProsperite" target="_blank" rel="noopener noreferrer" class="social-link mx-1 sm:mx-1.5" aria-label="Twitter/X">
              <FontAwesomeIcon icon="fa-brands fa-x-twitter" class="text-lg sm:text-xl" />
            </a>
            <a href="https://www.tiktok.com/@radical.prosperite" target="_blank" rel="noopener noreferrer" class="social-link mx-1 sm:mx-1.5" aria-label="TikTok">
              <FontAwesomeIcon icon="fa-brands fa-tiktok" class="text-lg sm:text-xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link mx-1 sm:mx-1.5" aria-label="Instagram">
              <FontAwesomeIcon icon="fa-brands fa-instagram" class="text-lg sm:text-xl" />
            </a>
            <a href="https://www.linkedin.com/in/prosp%C3%A8re-radical-79b0583b2/" target="_blank" rel="noopener noreferrer" class="social-link mx-1 sm:mx-1.5" aria-label="LinkedIn">
              <FontAwesomeIcon icon="fa-brands fa-linkedin" class="text-lg sm:text-xl" />
            </a>
            <a href="https://discord.gg/53Jq3b8w" target="_blank" rel="noopener noreferrer" class="social-link mx-1 sm:mx-1.5" aria-label="Discord">
              <FontAwesomeIcon icon="fa-brands fa-discord" class="text-lg sm:text-xl" />
            </a>
            <a href="https://www.youtube.com/@RadicalProsp%C3%A9rit%C3%A9" target="_blank" rel="noopener noreferrer" class="social-link mx-1 sm:mx-1.5" aria-label="YouTube">
              <FontAwesomeIcon icon="fa-brands fa-youtube" class="text-lg sm:text-xl" />
            </a>
          </div>
          
          <!-- Copyright -->
          <span class="copyright-text text-xs opacity-70 hidden sm:block">© 2026 Paris</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, 
    rgba(0, 51, 153, 0.95) 0%, 
    rgba(255, 255, 255, 0.95) 50%, 
    rgba(200, 16, 46, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  box-shadow: 
    0 -8px 32px rgba(0, 0, 0, 0.15),
    0 -4px 16px rgba(0, 51, 153, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
}

.dark .footer {
  background: linear-gradient(135deg, 
    rgba(0, 30, 100, 0.95) 0%, 
    rgba(30, 30, 40, 0.95) 50%, 
    rgba(140, 10, 30, 0.95) 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 -8px 32px rgba(0, 0, 0, 0.35),
    0 -4px 16px rgba(0, 30, 100, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Footer container - centered content */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-left: 12px;
  margin-right: 12px;
  padding-left: 18px;
  padding-right: 18px;
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
}

@media (min-width: 640px) {
  .footer-container {
    padding-left: 18px;
    padding-right: 18px;
  }
}

@media (min-width: 1024px) {
  .footer-container {
    padding-left: 18px;
    padding-right: 18px;
  }
}

@media (min-width: 1280px) {
  .footer-container {
    padding-left: 18px;
    padding-right: 18px;
  }
}

.brand-text {
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(90deg, #ffffff 0%, #003399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .brand-text {
  background: linear-gradient(90deg, #4d7fbf 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.copyright-text {
  color: #ffffff;
}

.dark .copyright-text {
  color: rgba(255, 255, 255, 0.7);
}

/* Social icons - always horizontal row */
.social-icons {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.social-link {
  color: #1a1a2e;
  transition: all var(--transition-normal);
  padding: 0.6rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(4px);
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.1),
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    inset 0 -1px 2px rgba(0, 0, 0, 0.08);
}

.dark .social-link {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15);
}

.social-link:hover {
  transform: scale(1.2) translateY(-3px);
  color: #003399;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 
    0 6px 15px rgba(0, 51, 153, 0.3),
    0 3px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 3px rgba(255, 255, 255, 0.6),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.dark .social-link:hover {
  color: #ff4d6d;
  background: rgba(255, 77, 109, 0.2);
  box-shadow: 
    0 6px 15px rgba(255, 77, 109, 0.35),
    0 3px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 3px rgba(255, 255, 255, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .footer-content {
    padding: 0.75rem 0;
  }
  
  .social-icons {
    gap: 0.75rem;
  }
  
  .social-link {
    padding: 0.375rem;
  }
}
</style>
