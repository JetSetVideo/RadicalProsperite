<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const atTop = ref(true)

const handleScroll = () => {
  atTop.value = window.scrollY === 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Auth state
const { connected, user, logout } = useAuthState()
const showUserMenu = ref(false)

const handleLogout = async () => {
  showUserMenu.value = false
  await logout()
  navigateTo('/')
}

// Navigation links for sub-bar
const navLinks = [
  { name: 'Informations', path: '/informations', icon: 'fa-solid fa-circle-info' },
  { name: 'Communauté', path: '/communaute', icon: 'fa-solid fa-users' },
  { name: 'Forum', path: '/forum', icon: 'fa-solid fa-comments' },
  { name: 'Magasin', path: '/magasin', icon: 'fa-solid fa-store' },
  { name: 'Aides', path: '/aides', icon: 'fa-solid fa-handshake-angle' }
]
</script>

<template>
  <!-- Main Navbar: .navbar__title | spacer | .navbar__actions (Design 0.7, 5.1) -->
  <nav class="navbar fixed top-0 z-50 transition-all duration-300 mt-4 rounded-2xl" :class="{ 'opacity-0 pointer-events-none': !atTop }">
    <div class="navbar-content flex items-center justify-center h-14 sm:h-16 md:h-20 gap-6 md:gap-8">
      <!-- Title block: parent div for brand (aligned with actions) -->
      <div class="navbar__title">
        <NuxtLink to="/" class="title-link">
          <h1 class="title">Radical Prospérité</h1>
        </NuxtLink>
      </div>

      <!-- Actions block: adhesion/settings (aligned with title, left/right margins) -->
      <div class="navbar__actions">
        <!-- Connected: User avatar with menu -->
        <div v-if="connected" class="relative">
          <button
            @click="showUserMenu = !showUserMenu"
            class="user-avatar-btn flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-semibold transition-all duration-300"
          >
            <div class="avatar-circle w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {{ user?.firstName?.[0] || 'U' }}
            </div>
            <span class="hidden sm:inline text-white">{{ user?.firstName }}</span>
          </button>
          <Transition name="fade">
            <div v-if="showUserMenu" class="user-menu absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50">
              <NuxtLink to="/adhesion" class="menu-item block px-4 py-3 text-sm" @click="showUserMenu = false">
                <FontAwesomeIcon icon="fa-solid fa-id-card" class="mr-2" />
                Mon compte
              </NuxtLink>
              <button @click="handleLogout" class="menu-item block w-full text-left px-4 py-3 text-sm">
                <FontAwesomeIcon icon="fa-solid fa-sign-out-alt" class="mr-2" />
                Déconnexion
              </button>
            </div>
          </Transition>
        </div>
        <!-- Not connected: Adhesion Button -->
        <NuxtLink v-else to="/adhesion" class="adhesion-btn px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 flex items-center">
          <FontAwesomeIcon icon="fa-solid fa-user-plus" class="mr-1.5 md:mr-2" />
          <span class="hidden sm:inline">Adhésion</span>
        </NuxtLink>
        <div class="settings-wrapper">
          <Settings />
        </div>
      </div>
    </div>

    <!-- Sub Navigation Bar -->
    <div class="sub-navbar border-t border-white/20 sub-navbar-margins">
      <div class="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 py-2.5 px-4 overflow-x-auto">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="nav-link flex items-center gap-1.5 md:gap-2 px-3 sm:px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap"
        >
          <FontAwesomeIcon :icon="link.icon" class="text-sm md:text-base" />
          <span>{{ link.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Tier margins (Design 0.5, 5.1) */
.navbar {
  left: 0;
  right: 0;
  margin-left: var(--margin-page-mobile);
  margin-right: var(--margin-page-mobile);
}

@media (min-width: 768px) {
  .navbar {
    margin-left: var(--margin-page-tablet);
    margin-right: var(--margin-page-tablet);
  }
}

@media (min-width: 1024px) {
  .navbar {
    margin-left: var(--margin-page-web);
    margin-right: var(--margin-page-web);
  }
}

@media (min-width: 1280px) {
  .navbar {
    margin-left: var(--margin-page-web-xl);
    margin-right: var(--margin-page-web-xl);
  }
}

.navbar {
  background: linear-gradient(135deg, 
    rgba(0, 51, 153, 0.95) 0%, 
    rgba(0, 51, 153, 0.85) 25%,
    rgba(255, 255, 255, 0.95) 50%, 
    rgba(200, 16, 46, 0.85) 75%,
    rgba(200, 16, 46, 0.95) 100%
  );
  background-size: 300% 300%;
  animation: tricolorFlow 20s ease-in-out infinite;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.25),
    0 4px 16px rgba(0, 51, 153, 0.2),
    0 2px 8px rgba(200, 16, 46, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.dark .navbar {
  background: linear-gradient(135deg, 
    rgba(0, 30, 100, 0.95) 0%, 
    rgba(0, 30, 100, 0.85) 25%,
    rgba(30, 30, 40, 0.95) 50%, 
    rgba(140, 10, 30, 0.85) 75%,
    rgba(140, 10, 30, 0.95) 100%
  );
  background-size: 300% 300%;
  animation: tricolorFlow 20s ease-in-out infinite;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 30, 100, 0.3),
    0 2px 8px rgba(140, 10, 30, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Title block: inner left/right margins so not sticking to edges */
.navbar__title {
  margin-left: var(--space-sm);
  margin-right: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.25),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.15);
}

.dark .navbar__title {
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.08),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.35);
}

/* Actions block: inner left/right margins, align-items center with title */
.navbar__actions {
  margin-left: var(--space-sm);
  margin-right: var(--space-sm);
  display: flex;
  align-items: center;
  gap: 0.5rem 1rem;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.15);
}

.dark .navbar__actions {
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.06),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.35);
}

.navbar-content {
  padding-left: var(--margin-page-mobile);
  padding-right: var(--margin-page-mobile);
  width: 100%;
}

@media (min-width: 768px) {
  .navbar-content {
    padding-left: var(--margin-page-tablet);
    padding-right: var(--margin-page-tablet);
  }
}

@media (min-width: 1024px) {
  .navbar-content {
    padding-left: var(--margin-page-web);
    padding-right: var(--margin-page-web);
  }
}

@media (min-width: 1280px) {
  .navbar-content {
    padding-left: var(--margin-page-web-xl);
    padding-right: var(--margin-page-web-xl);
  }
}

.sub-navbar-margins {
  margin-left: var(--space-sm);
  margin-right: var(--space-sm);
}

@media (min-width: 768px) {
  .sub-navbar-margins {
    margin-left: var(--space-md);
    margin-right: var(--space-md);
  }
}


.title-link {
  text-decoration: none;
  display: block;
}

.title {
  font-family: 'Ethnocentric', 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2;
  white-space: nowrap;
  background: linear-gradient(90deg, #003399 0%, #ffffff 50%, #c8102e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

@media (min-width: 640px) {
  .title { font-size: 1.25rem; }
}

@media (min-width: 768px) {
  .title { font-size: 1.5rem; }
}

@media (min-width: 1024px) {
  .title { font-size: 1.75rem; }
}

@media (min-width: 1280px) {
  .title { font-size: 2rem; }
}

.dark .title {
  background: linear-gradient(90deg, #4d7fbf 0%, #ffffff 50%, #ff4d6d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-link {
  color: #003399;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.6rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.8),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.dark .home-link {
  color: #4d7fbf;
  background: rgba(30, 30, 45, 0.9);
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.15),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}

.home-link:hover {
  transform: scale(1.1);
  box-shadow: 
    0 0 15px rgba(0, 51, 153, 0.5),
    0 5px 15px rgba(0, 0, 0, 0.2),
    inset 0 1px 3px rgba(255, 255, 255, 0.9),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.dark .home-link:hover {
  box-shadow: 
    0 0 15px rgba(77, 127, 191, 0.5),
    0 5px 15px rgba(0, 0, 0, 0.4),
    inset 0 1px 3px rgba(255, 255, 255, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}

.adhesion-btn {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    var(--shadow-btn-outer-bottom),
    var(--shadow-btn-inner-top),
    inset 0 -1px 2px rgba(0, 0, 0, 0.12);
}

.dark .adhesion-btn {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    var(--shadow-btn-outer-bottom),
    var(--shadow-btn-inner-top),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}

.adhesion-btn:hover {
  box-shadow: 
    var(--shadow-btn-outer-bottom),
    0 6px 20px rgba(200, 16, 46, 0.35),
    var(--shadow-btn-inner-top),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
}

.sub-navbar {
  background: rgba(0, 0, 0, 0.1);
}

.dark .sub-navbar {
  background: rgba(0, 0, 0, 0.2);
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.35),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.6) 0%, rgba(200, 16, 46, 0.6) 100%);
  box-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.3),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}

@keyframes tricolorFlow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* User avatar button (connected state): same inner top light + outer bottom dark */
.user-avatar-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(74, 222, 128, 0.5);
  box-shadow: 
    var(--shadow-btn-outer-bottom),
    var(--shadow-btn-inner-top),
    0 0 12px rgba(74, 222, 128, 0.3);
}

.user-avatar-btn:hover {
  border-color: rgba(74, 222, 128, 0.8);
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
}

.avatar-circle {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
}

.dark .avatar-circle {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
}

.user-menu {
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid rgba(0, 51, 153, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
}

.dark .user-menu {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(77, 127, 191, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.menu-item {
  color: var(--text-light);
  transition: background 0.2s ease;
}

.dark .menu-item {
  color: var(--text-dark);
}

.menu-item:hover {
  background: rgba(0, 51, 153, 0.08);
}

.dark .menu-item:hover {
  background: rgba(77, 127, 191, 0.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Settings wrapper styling */
.settings-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-wrapper :deep(button),
.settings-wrapper :deep(.settings-btn) {
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 
    var(--shadow-btn-outer-bottom),
    var(--shadow-btn-inner-top),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

/* Mobile: compact title and actions */
@media (max-width: 480px) {
  .navbar {
    margin-top: 0.5rem;
  }
  .navbar__title,
  .navbar__actions {
    margin-left: var(--space-sm);
    margin-right: var(--space-sm);
    padding: var(--space-xs) var(--space-sm);
  }
  .nav-link {
    padding: 0.375rem 0.625rem;
    font-size: 0.7rem;
  }
  .adhesion-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 640px) {
  .sub-navbar {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  
  .sub-navbar .flex {
    gap: 0.375rem;
  }
}

@media (min-width: 1536px) {
  .navbar {
    margin-left: 6rem;
    margin-right: 6rem;
  }
}
</style>
