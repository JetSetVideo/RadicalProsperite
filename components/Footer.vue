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
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 footer-inner">
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
            <a href="https://www.instagram.com/radical.prosperite?igsh=MWRobzlsajluN2hqbw==" target="_blank" rel="noopener noreferrer" class="social-link mx-1 sm:mx-1.5" aria-label="Instagram">
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

.footer-content {
  text-align: center;
  vertical-align: middle;
}

.footer-inner {
  padding-left: 13px;
  padding-right: 13px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}

/* Footer container - centered content */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 1px;
  padding-bottom: 1px;
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.5), inset 6px 6px 14px 0px rgba(255, 255, 255, 0.2);
}

@media (min-width: 640px) {
  .footer-container {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (min-width: 1024px) {
  .footer-container {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (min-width: 1280px) {
  .footer-container {
    padding-left: 0;
    padding-right: 0;
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
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 3px;
  color: rgba(80, 100, 251, 0);
  vertical-align: middle;
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.5),
    inset -4px 2px 14px 0 rgba(0, 0, 0, 0.2);
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

/* ═══════════════════════════════════════════════════════════════
   FOOTER RESPONSIVE STYLES - All breakpoints
   ═══════════════════════════════════════════════════════════════ */

/* ─── Extra Small (<480px) - Small phones ─── */
@media (max-width: 479px) {
  .footer {
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .footer-content {
    padding: 0.5rem 0;
  }

  .footer-inner {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    gap: 4px;
  }

  .brand-text {
    display: none !important;
  }

  .copyright-text {
    display: none !important;
  }

  .social-icons {
    gap: 4px;
  }

  .social-link {
    padding: 0.4rem;
    font-size: 0.875rem;
  }

  .social-link svg {
    font-size: 0.9rem;
  }
}

/* ─── Small (480px-639px) - Large phones ─── */
@media (min-width: 480px) and (max-width: 639px) {
  .footer-content {
    padding: 0.625rem 0;
  }

  .footer-inner {
    gap: 6px;
  }

  .brand-text {
    font-size: 0.75rem;
  }

  .social-icons {
    gap: 6px;
  }

  .social-link {
    padding: 0.45rem;
  }

  .social-link svg {
    font-size: 1rem;
  }

  .copyright-text {
    font-size: 0.625rem;
  }
}

/* ─── Medium (640px-767px) - Small tablets ─── */
@media (min-width: 640px) and (max-width: 767px) {
  .footer-content {
    padding: 0.75rem 0;
  }

  .social-icons {
    gap: 8px;
  }

  .social-link {
    padding: 0.5rem;
  }
}

/* ─── Large (768px-1023px) - Tablets ─── */
@media (min-width: 768px) and (max-width: 1023px) {
  .footer-content {
    padding: 0.875rem 0;
  }

  .footer-inner {
    gap: 1.5rem;
  }

  .social-icons {
    gap: 10px;
  }

  .social-link {
    padding: 0.55rem;
  }

  .social-link svg {
    font-size: 1.125rem;
  }
}

/* ─── XL (1024px-1279px) - Laptops ─── */
@media (min-width: 1024px) and (max-width: 1279px) {
  .footer-content {
    padding: 1rem 0;
  }

  .footer-inner {
    gap: 2rem;
  }

  .social-icons {
    gap: 12px;
  }

  .social-link {
    padding: 0.6rem;
  }

  .social-link svg {
    font-size: 1.25rem;
  }

  .brand-text {
    font-size: 0.9375rem;
  }
}

/* ─── 2XL (1280px-1535px) - Desktops ─── */
@media (min-width: 1280px) and (max-width: 1535px) {
  .footer-content {
    padding: 1.125rem 0;
  }

  .footer-inner {
    gap: 2.5rem;
  }

  .social-icons {
    gap: 14px;
  }

  .social-link {
    padding: 0.65rem;
  }

  .social-link svg {
    font-size: 1.375rem;
  }

  .brand-text {
    font-size: 1rem;
  }
}

/* ─── 3XL (1536px+) - Wide screens ─── */
@media (min-width: 1536px) {
  .footer {
    max-width: 1800px;
    margin-left: auto;
    margin-right: auto;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }

  .footer-content {
    padding: 1.25rem 0;
  }

  .footer-inner {
    gap: 3rem;
  }

  .social-icons {
    gap: 16px;
  }

  .social-link {
    padding: 0.75rem;
  }

  .social-link svg {
    font-size: 1.5rem;
  }

  .brand-text {
    font-size: 1.125rem;
  }

  .copyright-text {
    font-size: 0.875rem;
  }
}

/* ─── Touch-friendly adjustments ─── */
@media (hover: none) and (pointer: coarse) {
  .social-link:hover {
    transform: none;
  }

  .social-link:active {
    transform: scale(0.95);
  }
}

/* ─── Landscape mobile ─── */
@media (max-height: 500px) and (orientation: landscape) {
  .footer-content {
    padding: 0.5rem 0;
  }

  .social-link {
    padding: 0.35rem;
  }
}
</style>
