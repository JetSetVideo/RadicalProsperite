<script setup>
import { ref } from 'vue'

// Sample events data - can be updated with real data
const events = ref([
  {
    id: 1,
    title: 'Assemblée Générale Parisienne',
    date: '2026-02-15',
    time: '19:00',
    location: 'Paris - 8ème arrondissement',
    description: 'Réunion mensuelle des adhérents parisiens pour discuter des prochaines actions.',
    coordinates: { x: 200, y: 150 }
  },
  {
    id: 2,
    title: 'Conférence sur la Blockchain',
    date: '2026-03-01',
    time: '14:00',
    location: 'Lyon - Centre des Congrès',
    description: 'Conférence sur l\'utilisation de la blockchain pour la transparence gouvernementale.',
    coordinates: { x: 280, y: 200 }
  },
  {
    id: 3,
    title: 'Forum Économique',
    date: '2026-03-20',
    time: '10:00',
    location: 'Bordeaux - Palais de la Bourse',
    description: 'Discussion sur les politiques économiques libertariennes et leur application en France.',
    coordinates: { x: 130, y: 280 }
  },
  {
    id: 4,
    title: 'Rencontre Méridionale',
    date: '2026-04-05',
    time: '18:00',
    location: 'Marseille - Vieux Port',
    description: 'Rassemblement des sympathisants du Sud de la France.',
    coordinates: { x: 320, y: 280 }
  }
])

// News articles
const newsArticles = ref([
  {
    id: 1,
    title: 'Nouveau programme économique dévoilé',
    excerpt: 'Découvrez notre vision pour une économie française libérée et prospère.',
    date: '2026-01-15',
    category: 'Programme'
  },
  {
    id: 2,
    title: 'Interview exclusive du fondateur',
    excerpt: 'Les ambitions et la vision de Radical Prospérité expliquées en détail.',
    date: '2026-01-10',
    category: 'Médias'
  },
  {
    id: 3,
    title: 'Succès du premier meeting national',
    excerpt: 'Plus de 500 sympathisants réunis pour notre premier grand rassemblement.',
    date: '2026-01-05',
    category: 'Événements'
  }
])
</script>

<template>
  <main class="main-content min-h-screen pb-24">
    <div class="content-container">
      <!-- Page Header -->
      <section class="page-header mb-12 text-center">
        <div class="header-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
          <FontAwesomeIcon icon="fa-solid fa-circle-info" class="mr-2" />
          Centre d'Information
        </div>
        <h1 class="page-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Informations
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Restez informé des actualités, événements et rencontres du parti Radical Prospérité
        </p>
      </section>

      <!-- News Section -->
      <section class="news-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-newspaper" class="mr-3" />
          Actualités
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="article in newsArticles" :key="article.id" class="news-card rp-card p-6 rounded-xl">
            <div class="category-badge rp-badge inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3">
              {{ article.category }}
            </div>
            <h3 class="text-lg font-bold mb-2">{{ article.title }}</h3>
            <p class="text-sm opacity-70 mb-3">{{ article.excerpt }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs opacity-50">{{ new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
              <button class="read-more-btn text-sm font-medium">
                Lire plus
                <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="ml-1" />
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Map and Calendar Section -->
      <section class="events-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-calendar-days" class="mr-3" />
          Rencontres et Événements
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Map Component -->
          <Carte :events="events" />
          
          <!-- Calendar Component -->
          <Calendrier :events="events" />
        </div>
      </section>

      <!-- Quick Info Cards -->
      <section class="info-cards-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-lightbulb" class="mr-3" />
          En Bref
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="info-card rp-card p-5 rounded-xl text-center">
            <div class="info-icon icon-gradient mb-3">
              <FontAwesomeIcon icon="fa-solid fa-users" class="text-3xl" />
            </div>
            <h4 class="font-bold text-lg mb-1">500+</h4>
            <p class="text-sm opacity-70">Adhérents actifs</p>
          </div>
          
          <div class="info-card rp-card p-5 rounded-xl text-center">
            <div class="info-icon icon-gradient mb-3">
              <FontAwesomeIcon icon="fa-solid fa-city" class="text-3xl" />
            </div>
            <h4 class="font-bold text-lg mb-1">15</h4>
            <p class="text-sm opacity-70">Villes représentées</p>
          </div>
          
          <div class="info-card rp-card p-5 rounded-xl text-center">
            <div class="info-icon icon-gradient mb-3">
              <FontAwesomeIcon icon="fa-solid fa-calendar-check" class="text-3xl" />
            </div>
            <h4 class="font-bold text-lg mb-1">{{ events.length }}</h4>
            <p class="text-sm opacity-70">Événements à venir</p>
          </div>
          
          <div class="info-card rp-card p-5 rounded-xl text-center">
            <div class="info-icon icon-gradient mb-3">
              <FontAwesomeIcon icon="fa-solid fa-handshake" class="text-3xl" />
            </div>
            <h4 class="font-bold text-lg mb-1">50+</h4>
            <p class="text-sm opacity-70">Partenaires</p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section rp-section p-8 rounded-2xl text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">
          <FontAwesomeIcon icon="fa-solid fa-envelope" class="mr-3" />
          Contactez-nous
        </h2>
        <p class="text-lg mb-6 opacity-80">
          Une question ? Besoin d'informations supplémentaires ?
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="mailto:contact@radical-prosperite.fr" class="contact-btn rp-btn-primary px-6 py-3 rounded-lg font-semibold">
            <FontAwesomeIcon icon="fa-solid fa-envelope" class="mr-2" />
            contact@radical-prosperite.fr
          </a>
          <a href="tel:+33100000000" class="contact-btn secondary rp-btn-outline px-6 py-3 rounded-lg font-semibold">
            <FontAwesomeIcon icon="fa-solid fa-phone" class="mr-2" />
            01 00 00 00 00
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* Hierarchical Depth Design Tokens */
:root {
  /* Level 0: Base (page-background) */
  --shadow-level-0: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  
  /* Level 1: Main Blocks (sections) */
  --shadow-level-1: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  --shadow-level-1-inner: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  /* Level 2: Cards/Items inside sections */
  --shadow-level-2: 
    0 8px 25px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  --shadow-level-2-inner: inset 0 2px 4px rgba(0, 0, 0, 0.08);

  /* Level 3: Buttons/Clickables (Highest) */
  --shadow-level-3: 
    0 12px 30px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  --shadow-level-3-hover: 
    0 15px 35px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.dark {
  --shadow-level-0: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-level-1: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  --shadow-level-1-inner: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-level-2: 
    0 8px 25px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --shadow-level-2-inner: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-level-3: 
    0 12px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  --shadow-level-3-hover: 
    0 15px 35px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-shadow: var(--shadow-level-0);
  border-radius: var(--radius-2xl);
  background: rgba(128, 128, 128, 0.03);
}

@media (min-width: 640px) {
  .content-container {
    padding: 2rem;
  }
}

/* News Card - Level 2 */
.news-card {
  box-shadow: var(--shadow-level-2);
}

/* Events Section - Level 1 */
.events-section {
  box-shadow: var(--shadow-level-1);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  background: var(--bg-section-light);
}

.dark .events-section {
  background: var(--bg-section-dark);
}

/* Info Card - Level 2 */
.info-card {
  box-shadow: var(--shadow-level-2);
}

/* Contact Section - Level 1 */
.contact-section {
  box-shadow: var(--shadow-level-1);
}

/* Contact Button - Level 3 */
.contact-btn {
  box-shadow: var(--shadow-level-3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-level-3-hover);
}

/* Page-specific styles only — shared classes (.main-content, .page-header,
   .header-badge, .page-title, .section-title, .rp-card, .rp-section,
   .icon-gradient, .rp-badge, .rp-btn-primary, .rp-btn-outline,
   .content-container) are provided by main.css */

/* News: "read more" link colors */
.read-more-btn {
  color: #003399;
  transition: color var(--transition-normal);
}

.dark .read-more-btn {
  color: #4d7fbf;
}

.read-more-btn:hover {
  color: #c8102e;
}

.dark .read-more-btn:hover {
  color: #ff4d6d;
}
</style>
