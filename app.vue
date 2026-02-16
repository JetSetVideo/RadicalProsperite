<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <!-- Background: fluid smoking + fractal-inspired (Design 0.8) -->
    <div class="fixed inset-0 z-0 pointer-events-none" id="background" aria-hidden="true">
      <div class="fractal-layer" aria-hidden="true"></div>
    </div>

    <Navbar />
    <!-- Content: top padding from Design system (--page-content-top-padding) -->
    <div class="page-content relative">
      <NuxtPage />
    </div>
    <Footer />
    <CookieBanner />
  </div>
</template>

<script setup>
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
const atTop = computed(() => y.value === 0)

// Check auth session on app mount
const { refreshSession } = useAuthState()
onMounted(() => {
  refreshSession()
})
</script>

<style>
/* Fonts: Google + local Ethnocentric (Design 3.1). Global base/typography in assets/css/main.css */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

@font-face {
  font-family: 'Ethnocentric';
  src: url('~assets/fonts/Ethnocentric Rg It.otf') format('opentype');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Ethnocentric';
  src: url('~assets/fonts/Ethnocentric Rg.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Base: gradient that stays (light/dark) */
#background {
  background: radial-gradient(
    ellipse 120% 100% at 50% 50%,
    var(--bg-light) 0%,
    rgba(0, 51, 153, 0.06) 40%,
    rgba(200, 16, 46, 0.06) 70%,
    var(--bg-light) 100%
  );
}

.dark #background {
  background: radial-gradient(
    ellipse 120% 100% at 50% 50%,
    var(--bg-dark) 0%,
    rgba(0, 51, 153, 0.12) 40%,
    rgba(200, 16, 46, 0.12) 70%,
    var(--bg-dark) 100%
  );
}

/* Layer 1: fluid smoke blob – drift + fade (lerp-like ease-in-out) */
#background::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160%;
  height: 160%;
  background: radial-gradient(
    ellipse 50% 50% at 30% 30%,
    var(--accent-blue-light) 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse 40% 40% at 70% 60%,
    var(--accent-red-light) 0%,
    transparent 45%
  );
  transform: translate(-50%, -50%);
  opacity: 0.5;
  animation: fluidSmoke1 45s ease-in-out infinite;
}

.dark #background::before {
  background: radial-gradient(
      ellipse 50% 50% at 30% 30%,
      var(--accent-blue-dark) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 40% 40% at 70% 60%,
      var(--accent-red-dark) 0%,
      transparent 45%
    );
  opacity: 0.55;
}

@keyframes fluidSmoke1 {
  0%, 100% {
    transform: translate(-50%, -50%) translate(0, 0) scale(1);
    opacity: 0.5;
  }
  25% {
    transform: translate(-50%, -50%) translate(3%, -2%) scale(1.05);
    opacity: 0.65;
  }
  50% {
    transform: translate(-50%, -50%) translate(-2%, 3%) scale(0.98);
    opacity: 0.45;
  }
  75% {
    transform: translate(-50%, -50%) translate(2%, 2%) scale(1.02);
    opacity: 0.6;
  }
}

/* Layer 2: second smoke layer – different phase, intertwining */
#background::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140%;
  height: 140%;
  background: radial-gradient(
      circle 35% at 60% 40%,
      rgba(77, 127, 191, 0.2) 0%,
      transparent 55%
    ),
    radial-gradient(
      circle 30% at 35% 65%,
      rgba(255, 77, 109, 0.15) 0%,
      transparent 50%
    );
  transform: translate(-50%, -50%);
  animation: fluidSmoke2 60s ease-in-out infinite;
  opacity: 0.6;
}

.dark #background::after {
  background: radial-gradient(
      circle 35% at 60% 40%,
      rgba(56, 189, 248, 0.12) 0%,
      transparent 55%
    ),
    radial-gradient(
      circle 30% at 35% 65%,
      rgba(255, 77, 109, 0.15) 0%,
      transparent 50%
    );
  opacity: 0.65;
}

@keyframes fluidSmoke2 {
  0%, 100% {
    transform: translate(-50%, -50%) translate(-2%, 0) rotate(0deg);
    opacity: 0.6;
  }
  33% {
    transform: translate(-50%, -50%) translate(2%, -3%) rotate(2deg);
    opacity: 0.75;
  }
  66% {
    transform: translate(-50%, -50%) translate(-1%, 2%) rotate(-1deg);
    opacity: 0.5;
  }
}

/* Mandelbrot-inspired: fine layered orbs (fractal-like repetition) – very subtle */
.fractal-layer {
  position: absolute;
  inset: -50%;
  background: 
    radial-gradient(circle 8% at 20% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 100%),
    radial-gradient(circle 6% at 80% 30%, rgba(200, 16, 46, 0.06) 0%, transparent 100%),
    radial-gradient(circle 5% at 40% 80%, rgba(74, 222, 128, 0.05) 0%, transparent 100%),
    radial-gradient(circle 7% at 70% 70%, rgba(56, 189, 248, 0.06) 0%, transparent 100%);
  animation: fractalDrift 100s ease-in-out infinite;
  pointer-events: none;
}

.dark .fractal-layer {
  background: 
    radial-gradient(circle 8% at 20% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 100%),
    radial-gradient(circle 6% at 80% 30%, rgba(255, 77, 109, 0.08) 0%, transparent 100%),
    radial-gradient(circle 5% at 40% 80%, rgba(74, 222, 128, 0.06) 0%, transparent 100%),
    radial-gradient(circle 7% at 70% 70%, rgba(56, 189, 248, 0.08) 0%, transparent 100%);
}

@keyframes fractalDrift {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  50% { transform: translate(1%, -1%) scale(1.02); opacity: 1; }
}

</style>
