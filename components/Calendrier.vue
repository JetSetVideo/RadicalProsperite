<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select-event'])

// Current date management
const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

// Calendar navigation
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const goToToday = () => {
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
}

// Generate calendar days
const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // Get the day of week for the first day (0 = Sunday, we need Monday = 0)
  let startDay = firstDay.getDay() - 1
  if (startDay < 0) startDay = 6
  
  // Previous month days
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      currentMonth: false,
      date: new Date(currentYear.value, currentMonth.value - 1, prevMonthLastDay - i)
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    days.push({
      day: i,
      currentMonth: true,
      date: date,
      isToday: date.toDateString() === today.toDateString()
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      currentMonth: false,
      date: new Date(currentYear.value, currentMonth.value + 1, i)
    })
  }
  
  return days
})

// Check if a day has events
const getEventsForDay = (date) => {
  return props.events.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === date.toDateString()
  })
}

// Selected event
const selectedDay = ref(null)
const selectedDayEvents = ref([])

const selectDay = (dayInfo) => {
  const events = getEventsForDay(dayInfo.date)
  if (events.length > 0) {
    selectedDay.value = dayInfo
    selectedDayEvents.value = events
  }
}

const closeEventPopup = () => {
  selectedDay.value = null
  selectedDayEvents.value = []
}
</script>

<template>
  <div class="calendrier-container compact">
    <div class="calendrier-header mb-3">
      <h3 class="text-base md:text-lg font-bold flex items-center gap-2">
        <FontAwesomeIcon icon="fa-solid fa-calendar-alt" />
        Calendrier
      </h3>
    </div>

    <!-- Calendar Navigation -->
    <div class="calendar-nav flex items-center justify-between mb-3">
      <button @click="prevMonth" class="nav-btn p-1.5 rounded-lg">
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" class="text-sm" />
      </button>
      
      <div class="text-center">
        <h4 class="text-sm font-semibold">{{ monthNames[currentMonth] }} {{ currentYear }}</h4>
        <button @click="goToToday" class="today-btn text-xs">
          Aujourd'hui
        </button>
      </div>
      
      <button @click="nextMonth" class="nav-btn p-1.5 rounded-lg">
        <FontAwesomeIcon icon="fa-solid fa-chevron-right" class="text-sm" />
      </button>
    </div>

    <!-- Calendar Grid - Compact -->
    <div class="calendar-grid compact">
      <!-- Day Headers -->
      <div class="day-headers grid grid-cols-7 mb-1">
        <div v-for="day in dayNames" :key="day" class="day-header text-center text-xs font-medium py-1">
          {{ day.charAt(0) }}
        </div>
      </div>
      
      <!-- Calendar Days - Full 6 rows -->
      <div class="days-grid grid grid-cols-7 gap-0.5">
        <div 
          v-for="(dayInfo, index) in calendarDays" 
          :key="index"
          class="day-cell p-0.5 md:p-1 rounded cursor-pointer transition-all duration-200"
          :class="{
            'other-month': !dayInfo.currentMonth,
            'today': dayInfo.isToday,
            'has-event': getEventsForDay(dayInfo.date).length > 0
          }"
          @click="selectDay(dayInfo)"
        >
          <span class="day-number text-xs">{{ dayInfo.day }}</span>
          <div v-if="getEventsForDay(dayInfo.date).length > 0" class="event-dots flex justify-center">
            <span class="event-dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Events List - Compact -->
    <div class="upcoming-events mt-4">
      <h4 class="text-sm font-semibold mb-2 flex items-center gap-2">
        <FontAwesomeIcon icon="fa-solid fa-clock" class="text-xs" />
        Prochains
      </h4>
      
      <div v-if="events.length > 0" class="events-list space-y-2">
        <div 
          v-for="event in events.slice(0, 3)" 
          :key="event.id"
          class="event-card p-2 rounded-lg"
        >
          <div class="flex items-center gap-2">
            <div class="event-date-badge compact">
              <span class="text-sm font-bold">{{ new Date(event.date).getDate() }}</span>
              <span class="text-[10px]">{{ monthNames[new Date(event.date).getMonth()].slice(0, 3) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="font-medium text-xs truncate">{{ event.title }}</h5>
              <span class="text-[10px] opacity-60">{{ event.time }} - {{ event.location.split(' - ')[0] }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="no-events p-3 rounded-lg text-center">
        <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" class="text-lg mb-1 opacity-50" />
        <p class="text-xs opacity-70">Aucun événement prévu</p>
      </div>
    </div>

    <!-- Event Details Popup -->
    <Transition name="popup">
      <div v-if="selectedDay && selectedDayEvents.length > 0" class="event-popup" @click.self="closeEventPopup">
        <div class="popup-content">
          <button @click="closeEventPopup" class="close-btn">
            <FontAwesomeIcon icon="fa-solid fa-times" />
          </button>
          <h4 class="text-lg font-bold mb-3">
            {{ selectedDay.day }} {{ monthNames[currentMonth] }} {{ currentYear }}
          </h4>
          <div class="space-y-3">
            <div v-for="event in selectedDayEvents" :key="event.id" class="popup-event p-3 rounded-lg">
              <h5 class="font-semibold">{{ event.title }}</h5>
              <div class="flex items-center gap-2 text-sm mt-1">
                <FontAwesomeIcon icon="fa-solid fa-clock" />
                <span>{{ event.time }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm mt-1">
                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                <span>{{ event.location }}</span>
              </div>
              <p class="text-sm opacity-80 mt-2">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.calendrier-container {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 51, 153, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 16px rgba(0, 51, 153, 0.08),
    inset 0 1px 2px rgba(255, 255, 255, 0.5);
}

.calendrier-container.compact {
  padding: 0.875rem;
}

.dark .calendrier-container {
  background: rgba(30, 30, 45, 0.9);
  border: 1px solid rgba(77, 127, 191, 0.3);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.05);
}

.calendrier-header h3 {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .calendrier-header h3 {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-btn {
  background: rgba(0, 51, 153, 0.1);
  color: #003399;
  transition: all 0.3s ease;
}

.dark .nav-btn {
  background: rgba(77, 127, 191, 0.1);
  color: #4d7fbf;
}

.nav-btn:hover {
  background: rgba(0, 51, 153, 0.2);
  transform: scale(1.1);
}

.dark .nav-btn:hover {
  background: rgba(77, 127, 191, 0.2);
}

.today-btn {
  color: #c8102e;
  text-decoration: underline;
  opacity: 0.8;
}

.dark .today-btn {
  color: #ff4d6d;
}

.today-btn:hover {
  opacity: 1;
}

.day-header {
  color: #003399;
  font-weight: 600;
}

.dark .day-header {
  color: #4d7fbf;
}

.day-cell {
  min-height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid transparent;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

.compact .day-cell {
  min-height: 26px;
  padding: 2px;
}

.dark .day-cell {
  background: rgba(30, 30, 45, 0.5);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
}

.day-cell:hover {
  background: rgba(0, 51, 153, 0.1);
  border-color: rgba(0, 51, 153, 0.3);
}

.dark .day-cell:hover {
  background: rgba(77, 127, 191, 0.1);
  border-color: rgba(77, 127, 191, 0.3);
}

.day-cell.other-month {
  opacity: 0.4;
}

.day-cell.today {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.2) 0%, rgba(200, 16, 46, 0.2) 100%);
  border: 2px solid #003399;
  font-weight: bold;
}

.dark .day-cell.today {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.2) 0%, rgba(255, 77, 109, 0.2) 100%);
  border-color: #4d7fbf;
}

.day-cell.has-event {
  background: rgba(200, 16, 46, 0.1);
  border-color: rgba(200, 16, 46, 0.3);
}

.dark .day-cell.has-event {
  background: rgba(255, 77, 109, 0.1);
  border-color: rgba(255, 77, 109, 0.3);
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c8102e;
}

.dark .event-dot {
  background: #ff4d6d;
}

.event-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  padding: 0.375rem;
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  color: white;
  border-radius: 0.375rem;
  box-shadow: 
    0 2px 6px rgba(0, 51, 153, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

.event-date-badge.compact {
  min-width: 32px;
  padding: 0.25rem;
}

.dark .event-date-badge {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
}

.event-card {
  background: rgba(0, 51, 153, 0.05);
  border: 1px solid rgba(0, 51, 153, 0.15);
  transition: all 0.3s ease;
}

.dark .event-card {
  background: rgba(77, 127, 191, 0.05);
  border-color: rgba(77, 127, 191, 0.15);
}

.event-card:hover {
  background: rgba(0, 51, 153, 0.1);
  transform: translateX(5px);
}

.dark .event-card:hover {
  background: rgba(77, 127, 191, 0.1);
}

.no-events {
  background: rgba(0, 0, 0, 0.05);
}

.dark .no-events {
  background: rgba(255, 255, 255, 0.05);
}

.event-popup {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.popup-content {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.dark .popup-content {
  background: #1e1e2d;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.close-btn:hover {
  opacity: 1;
}

.popup-event {
  background: rgba(0, 51, 153, 0.1);
  border: 1px solid rgba(0, 51, 153, 0.2);
}

.dark .popup-event {
  background: rgba(77, 127, 191, 0.1);
  border-color: rgba(77, 127, 191, 0.2);
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .popup-content,
.popup-leave-to .popup-content {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 640px) {
  .calendrier-container {
    padding: 1rem;
  }
  
  .day-cell {
    min-height: 32px;
    padding: 0.25rem;
  }
  
  .day-number {
    font-size: 0.75rem;
  }
  
  .event-dot {
    width: 4px;
    height: 4px;
  }
}
</style>
