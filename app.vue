<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <!-- Background animation - Fixed to cover entire viewport -->
    <div class="fixed inset-0 z-0" id="background"></div>
    
    <!-- Diagonal bands overlay - Fixed to always be visible -->
    <div class="fixed inset-0 z-0 pointer-events-none" id="bands"></div>

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

/* Main background with slow pulsing gradient */
#background {
  background: radial-gradient(
    ellipse at center,
    var(--bg-light) 0%,
    rgba(0, 51, 153, 0.08) 30%,
    rgba(200, 16, 46, 0.08) 60%,
    var(--bg-light) 100%
  );
  animation: pulse 25s ease-in-out infinite;
}

.dark #background {
  background: radial-gradient(
    ellipse at center,
    var(--bg-dark) 0%,
    rgba(0, 51, 153, 0.15) 30%,
    rgba(200, 16, 46, 0.15) 60%,
    var(--bg-dark) 100%
  );
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* Diagonal bands with blue and red - wider with gradient fade and pulse */
#bands {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

#bands::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 400%;
  height: 400%;
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 70px,
    rgba(0, 51, 153, 0) 70px,
    rgba(0, 51, 153, 0.12) 85px,
    rgba(77, 127, 191, 0.18) 100px,
    rgba(0, 51, 153, 0.12) 115px,
    rgba(0, 51, 153, 0) 130px,
    transparent 130px,
    transparent 200px,
    rgba(200, 16, 46, 0) 200px,
    rgba(200, 16, 46, 0.12) 215px,
    rgba(255, 77, 109, 0.18) 230px,
    rgba(200, 16, 46, 0.12) 245px,
    rgba(200, 16, 46, 0) 260px,
    transparent 260px
  );
  animation: moveBands 120s linear infinite, pulseBands 8s ease-in-out infinite;
}

.dark #bands::before {
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 70px,
    rgba(0, 51, 153, 0) 70px,
    rgba(0, 51, 153, 0.2) 85px,
    rgba(77, 127, 191, 0.35) 100px,
    rgba(0, 51, 153, 0.2) 115px,
    rgba(0, 51, 153, 0) 130px,
    transparent 130px,
    transparent 200px,
    rgba(200, 16, 46, 0) 200px,
    rgba(200, 16, 46, 0.2) 215px,
    rgba(255, 77, 109, 0.35) 230px,
    rgba(200, 16, 46, 0.2) 245px,
    rgba(200, 16, 46, 0) 260px,
    transparent 260px
  );
}

#bands::after {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 400%;
  height: 400%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 100px,
    rgba(0, 51, 153, 0) 100px,
    rgba(0, 51, 153, 0.06) 112px,
    rgba(77, 127, 191, 0.1) 124px,
    rgba(0, 51, 153, 0.06) 136px,
    rgba(0, 51, 153, 0) 148px,
    transparent 148px,
    transparent 220px,
    rgba(200, 16, 46, 0) 220px,
    rgba(200, 16, 46, 0.06) 232px,
    rgba(255, 77, 109, 0.1) 244px,
    rgba(200, 16, 46, 0.06) 256px,
    rgba(200, 16, 46, 0) 268px,
    transparent 268px
  );
  animation: moveBandsReverse 180s linear infinite, pulseBandsAlt 10s ease-in-out infinite;
}

.dark #bands::after {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 100px,
    rgba(77, 127, 191, 0) 100px,
    rgba(77, 127, 191, 0.12) 112px,
    rgba(100, 150, 220, 0.18) 124px,
    rgba(77, 127, 191, 0.12) 136px,
    rgba(77, 127, 191, 0) 148px,
    transparent 148px,
    transparent 220px,
    rgba(255, 77, 109, 0) 220px,
    rgba(255, 77, 109, 0.12) 232px,
    rgba(255, 120, 140, 0.18) 244px,
    rgba(255, 77, 109, 0.12) 256px,
    rgba(255, 77, 109, 0) 268px,
    transparent 268px
  );
}

@keyframes moveBands {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(260px, 260px);
  }
}

@keyframes moveBandsReverse {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-268px, 268px);
  }
}

@keyframes pulseBands {
  0%, 100% {
    opacity: 0.7;
    filter: brightness(1);
  }
  50% {
    opacity: 1;
    filter: brightness(1.15);
  }
}

@keyframes pulseBandsAlt {
  0%, 100% {
    opacity: 0.6;
    filter: brightness(1);
  }
  50% {
    opacity: 0.9;
    filter: brightness(1.2);
  }
}

/* Subtle rotating rays effect - MUCH SLOWER */
#background::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--accent-blue-light) 15deg,
    transparent 30deg,
    transparent 90deg,
    var(--accent-red-light) 105deg,
    transparent 120deg,
    transparent 180deg,
    var(--accent-blue-light) 195deg,
    transparent 210deg,
    transparent 270deg,
    var(--accent-red-light) 285deg,
    transparent 300deg,
    transparent 360deg
  );
  transform: translate(-50%, -50%);
  animation: rotateRays 90s linear infinite;
  opacity: 0.4;
}

.dark #background::before {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--accent-blue-dark) 15deg,
    transparent 30deg,
    transparent 90deg,
    var(--accent-red-dark) 105deg,
    transparent 120deg,
    transparent 180deg,
    var(--accent-blue-dark) 195deg,
    transparent 210deg,
    transparent 270deg,
    var(--accent-red-dark) 285deg,
    transparent 300deg,
    transparent 360deg
  );
  opacity: 0.5;
}

@keyframes rotateRays {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Secondary subtle overlay */
#background::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    transparent 30%,
    rgba(0, 51, 153, 0.03) 50%,
    rgba(200, 16, 46, 0.03) 70%,
    transparent 100%
  );
  transform: translate(-50%, -50%);
  animation: pulseOverlay 30s ease-in-out infinite;
}

.dark #background::after {
  background: radial-gradient(
    circle at center,
    transparent 0%,
    transparent 30%,
    rgba(77, 127, 191, 0.08) 50%,
    rgba(255, 77, 109, 0.08) 70%,
    transparent 100%
  );
}

@keyframes pulseOverlay {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
}

</style>
