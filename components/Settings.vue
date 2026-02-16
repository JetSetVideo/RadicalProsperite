<script setup>
import { ref, computed } from 'vue'

// Use Nuxt UI's built-in color mode composable
const colorMode = useColorMode()
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const isDark = computed(() => colorMode.preference === 'dark')

const toggleMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const closeDropdown = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="settings-container relative" v-click-outside="closeDropdown">
    <!-- Gear Icon Button -->
    <button 
      @click="toggleDropdown" 
      class="gear-btn p-2 rounded-full transition-all duration-300 hover:scale-110"
      :class="{ 'rotate-90': isOpen }"
      aria-label="Settings"
    >
      <FontAwesomeIcon icon="fa-solid fa-gear" class="text-xl md:text-2xl" />
    </button>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu absolute right-0 top-full mt-2 min-w-48 rounded-lg shadow-xl overflow-hidden z-50">
        <div class="dropdown-header px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <span class="font-semibold text-sm">Paramètres</span>
        </div>
        
        <div class="dropdown-content p-2">
          <!-- Theme Toggle -->
          <button 
            @click="toggleMode" 
            class="dropdown-item w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200"
          >
            <FontAwesomeIcon 
              :icon="isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'" 
              class="text-lg"
            />
            <span class="text-sm">
              {{ isDark ? 'Mode Sombre' : 'Mode Clair' }}
            </span>
            <span class="ml-auto">
              <span class="toggle-indicator" :class="{ 'active': isDark }">
                <span class="toggle-dot"></span>
              </span>
            </span>
          </button>

          <!-- Language Option (placeholder for future) -->
          <button class="dropdown-item w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200">
            <FontAwesomeIcon icon="fa-solid fa-language" class="text-lg" />
            <span class="text-sm">Français</span>
            <FontAwesomeIcon icon="fa-solid fa-check" class="ml-auto text-green-500" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.gear-btn {
  color: #003399;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: var(--shadow-low), inset 0 1px 2px rgba(255, 255, 255, 0.5);
}

.dark .gear-btn {
  color: #ff6b7a;
  background: rgba(30, 30, 40, 0.8);
  box-shadow: var(--shadow-low), inset 0 1px 2px rgba(255, 255, 255, 0.08);
}

.gear-btn:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 15px rgba(200, 16, 46, 0.4), var(--shadow-low);
}

.dark .gear-btn:hover {
  background: rgba(50, 50, 60, 1);
  box-shadow: 0 0 15px rgba(77, 127, 191, 0.4), var(--shadow-low);
}

.gear-btn.rotate-90 {
  transform: rotate(90deg);
}

.dropdown-menu {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px) saturate(1.3);
  border: 1px solid rgba(200, 16, 46, 0.15);
  box-shadow: var(--shadow-medium), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.dark .dropdown-menu {
  background: rgba(25, 25, 38, 0.96);
  border: 1px solid rgba(77, 127, 191, 0.2);
  box-shadow: var(--shadow-medium), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.dropdown-header {
  background: linear-gradient(90deg, rgba(0, 51, 153, 0.1) 0%, rgba(200, 16, 46, 0.1) 100%);
}

.dark .dropdown-header {
  background: linear-gradient(90deg, rgba(77, 127, 191, 0.15) 0%, rgba(255, 77, 109, 0.15) 100%);
}

.dropdown-item {
  color: #1a1a2e;
}

.dark .dropdown-item {
  color: #ffffff;
}

.dropdown-item:hover {
  background: linear-gradient(90deg, rgba(0, 51, 153, 0.1) 0%, rgba(200, 16, 46, 0.1) 100%);
}

.dark .dropdown-item:hover {
  background: linear-gradient(90deg, rgba(77, 127, 191, 0.2) 0%, rgba(255, 77, 109, 0.2) 100%);
}

.toggle-indicator {
  width: 36px;
  height: 20px;
  background: #ccc;
  border-radius: 10px;
  position: relative;
  transition: background 0.3s ease;
}

.toggle-indicator.active {
  background: linear-gradient(90deg, #003399 0%, #c8102e 100%);
}

.toggle-dot {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-indicator.active .toggle-dot {
  transform: translateX(16px);
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .dropdown-menu {
    min-width: 200px;
    right: -0.5rem;
  }
}
</style>
