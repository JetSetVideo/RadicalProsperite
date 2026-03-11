<script setup>
import { ref } from 'vue'

// Forum categories - Aligned with AI/Crypto/Law vision
const categories = ref([
  {
    id: 1,
    name: 'Agents IA Citoyens',
    description: 'Discussions sur votre représentant numérique, configuration et retours d\'expérience.',
    icon: 'fa-solid fa-robot',
    topics: 67,
    posts: 423,
    lastActivity: '2026-03-11'
  },
  {
    id: 2,
    name: 'Suivi des Lois',
    description: 'Analysez et discutez des lois locales, nationales et européennes qui vous affectent.',
    icon: 'fa-solid fa-scale-balanced',
    topics: 89,
    posts: 567,
    lastActivity: '2026-03-11'
  },
  {
    id: 3,
    name: 'Blockchain & Gouvernance',
    description: 'Vote décentralisé, transparence, et gouvernance on-chain.',
    icon: 'fa-solid fa-link',
    topics: 45,
    posts: 298,
    lastActivity: '2026-03-10'
  },
  {
    id: 4,
    name: 'Cryptomonnaies & Liberté Financière',
    description: 'Bitcoin, Ethereum, Solana et l\'économie décentralisée.',
    icon: 'fa-brands fa-bitcoin',
    topics: 78,
    posts: 456,
    lastActivity: '2026-03-11'
  },
  {
    id: 5,
    name: 'Propositions Citoyennes',
    description: 'Soumettez vos idées. Les meilleures seront votées sur blockchain.',
    icon: 'fa-solid fa-lightbulb',
    topics: 34,
    posts: 234,
    lastActivity: '2026-03-09'
  },
  {
    id: 6,
    name: 'Actions Locales',
    description: 'Coordonnez vos événements et rencontres régionales.',
    icon: 'fa-solid fa-map-location-dot',
    topics: 56,
    posts: 312,
    lastActivity: '2026-03-11'
  }
])

// Recent topics - Aligned with vision
const recentTopics = ref([
  {
    id: 1,
    title: '[Vote On-Chain] Priorité 2026 : IA ou Blockchain d\'abord ?',
    category: 'Propositions Citoyennes',
    author: 'Système',
    replies: 89,
    views: 1234,
    lastReply: '2026-03-11 14:30'
  },
  {
    id: 2,
    title: 'Mon agent IA a détecté une nouvelle taxe locale - Comment réagir ?',
    category: 'Suivi des Lois',
    author: 'CitoyenParis75',
    replies: 45,
    views: 567,
    lastReply: '2026-03-11 13:15'
  },
  {
    id: 3,
    title: 'Guide : Configurer les alertes de votre Agent IA Citoyen',
    category: 'Agents IA Citoyens',
    author: 'TechAdmin',
    replies: 67,
    views: 890,
    lastReply: '2026-03-11 11:45'
  },
  {
    id: 4,
    title: 'Discussion : Accepter les dons en SOL ?',
    category: 'Cryptomonnaies & Liberté Financière',
    author: 'CryptoMax',
    replies: 34,
    views: 456,
    lastReply: '2026-03-11 10:00'
  },
  {
    id: 5,
    title: 'Hackathon Démocratie 3.0 - Équipes et inscriptions',
    category: 'Actions Locales',
    author: 'EventOrga',
    replies: 23,
    views: 345,
    lastReply: '2026-03-11 09:30'
  }
])

// Forum stats
const forumStats = ref({
  totalTopics: 203,
  totalPosts: 1134,
  totalMembers: 487,
  newestMember: 'Antoine R.'
})
</script>

<template>
  <main class="main-content min-h-screen pb-24">
    <div class="content-container">
      <!-- Page Header -->
      <section class="page-header mb-12 text-center">
        <div class="header-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
          <FontAwesomeIcon icon="fa-solid fa-comments" class="mr-2" />
          Espace de Discussion
        </div>
        <h1 class="page-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Forum
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Échangez, débattez et proposez vos idées avec la communauté
        </p>
      </section>

      <!-- Forum Stats -->
      <section class="stats-section mb-8">
        <div class="stats-bar rp-card p-4 rounded-xl flex flex-wrap justify-center gap-6 md:gap-12">
          <div class="stat-item text-center">
            <span class="stat-value text-2xl font-bold">{{ forumStats.totalTopics }}</span>
            <span class="stat-label text-sm opacity-70 block">Sujets</span>
          </div>
          <div class="stat-item text-center">
            <span class="stat-value text-2xl font-bold">{{ forumStats.totalPosts }}</span>
            <span class="stat-label text-sm opacity-70 block">Messages</span>
          </div>
          <div class="stat-item text-center">
            <span class="stat-value text-2xl font-bold">{{ forumStats.totalMembers }}</span>
            <span class="stat-label text-sm opacity-70 block">Membres</span>
          </div>
          <div class="stat-item text-center">
            <span class="stat-label text-sm opacity-70 block">Dernier inscrit</span>
            <span class="stat-value font-semibold">{{ forumStats.newestMember }}</span>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <section class="actions-section mb-8 flex flex-wrap justify-center gap-4">
        <button class="action-btn primary rp-btn-primary px-6 py-3 rounded-lg font-semibold">
          <FontAwesomeIcon icon="fa-solid fa-plus" class="mr-2" />
          Nouveau Sujet
        </button>
        <button class="action-btn secondary rp-btn-outline px-6 py-3 rounded-lg font-semibold">
          <FontAwesomeIcon icon="fa-solid fa-search" class="mr-2" />
          Rechercher
        </button>
        <button class="action-btn secondary rp-btn-outline px-6 py-3 rounded-lg font-semibold">
          <FontAwesomeIcon icon="fa-solid fa-bell" class="mr-2" />
          Notifications
        </button>
      </section>

      <!-- Categories -->
      <section class="categories-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-folder-open" class="mr-3" />
          Catégories
        </h2>
        <div class="space-y-4">
          <div v-for="category in categories" :key="category.id" class="category-card rp-card p-5 rounded-xl">
            <div class="flex flex-col md:flex-row md:items-center gap-4">
              <div class="category-icon icon-gradient">
                <FontAwesomeIcon :icon="category.icon" class="text-2xl" />
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-1">{{ category.name }}</h3>
                <p class="text-sm opacity-70">{{ category.description }}</p>
              </div>
              <div class="flex gap-6 text-center">
                <div>
                  <span class="block font-bold">{{ category.topics }}</span>
                  <span class="text-xs opacity-70">Sujets</span>
                </div>
                <div>
                  <span class="block font-bold">{{ category.posts }}</span>
                  <span class="text-xs opacity-70">Messages</span>
                </div>
              </div>
              <button class="view-btn rp-btn-primary px-4 py-2 rounded-lg text-sm font-medium">
                Voir
                <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Topics -->
      <section class="recent-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-clock" class="mr-3" />
          Discussions Récentes
        </h2>
        <div class="space-y-3">
          <div v-for="topic in recentTopics" :key="topic.id" class="topic-card rp-card p-4 rounded-xl">
            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <div class="flex-1">
                <h3 class="font-semibold hover:text-blue-600 cursor-pointer">{{ topic.title }}</h3>
                <div class="flex flex-wrap items-center gap-3 mt-1 text-sm opacity-70">
                  <span class="category-tag rp-badge px-2 py-0.5 rounded text-xs">{{ topic.category }}</span>
                  <span>par {{ topic.author }}</span>
                </div>
              </div>
              <div class="flex gap-4 text-center text-sm">
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-reply" class="mr-1 opacity-50" />
                  <span>{{ topic.replies }}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-eye" class="mr-1 opacity-50" />
                  <span>{{ topic.views }}</span>
                </div>
              </div>
              <div class="text-xs opacity-50">
                {{ topic.lastReply }}
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-6">
          <button class="load-more-btn rp-btn-outline px-6 py-2 rounded-lg font-medium">
            Voir plus de discussions
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" class="ml-2" />
          </button>
        </div>
      </section>

      <!-- Forum Rules -->
      <section class="rules-section rp-card p-6 rounded-2xl">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <FontAwesomeIcon icon="fa-solid fa-gavel" />
          Règles du Forum
        </h2>
        <ul class="space-y-2 text-sm opacity-80">
          <li class="flex items-start gap-2">
            <FontAwesomeIcon icon="fa-solid fa-check" class="mt-1 text-green-500" />
            <span>Respectez les autres membres et leurs opinions</span>
          </li>
          <li class="flex items-start gap-2">
            <FontAwesomeIcon icon="fa-solid fa-check" class="mt-1 text-green-500" />
            <span>Restez constructif dans vos critiques et suggestions</span>
          </li>
          <li class="flex items-start gap-2">
            <FontAwesomeIcon icon="fa-solid fa-check" class="mt-1 text-green-500" />
            <span>Pas de spam, publicité ou contenu hors-sujet</span>
          </li>
          <li class="flex items-start gap-2">
            <FontAwesomeIcon icon="fa-solid fa-check" class="mt-1 text-green-500" />
            <span>Utilisez un langage approprié et courtois</span>
          </li>
          <li class="flex items-start gap-2">
            <FontAwesomeIcon icon="fa-solid fa-check" class="mt-1 text-green-500" />
            <span>Signalez tout contenu inapproprié aux modérateurs</span>
          </li>
        </ul>
      </section>

      <!-- Login Prompt (for non-members) -->
      <section class="login-prompt-section rp-section mt-8 p-6 rounded-2xl text-center">
        <FontAwesomeIcon icon="fa-solid fa-lock" class="text-4xl mb-4 opacity-50" />
        <h3 class="text-xl font-bold mb-2">Connectez-vous pour participer</h3>
        <p class="text-sm opacity-70 mb-4">
          Rejoignez la discussion en vous connectant à votre compte membre
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/adhesion" class="login-btn rp-btn-primary px-6 py-2 rounded-lg font-semibold">
            <FontAwesomeIcon icon="fa-solid fa-user-plus" class="mr-2" />
            S'inscrire
          </NuxtLink>
          <button class="login-btn secondary rp-btn-outline px-6 py-2 rounded-lg font-semibold">
            <FontAwesomeIcon icon="fa-solid fa-sign-in-alt" class="mr-2" />
            Se connecter
          </button>
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

/* Stats Bar - Level 1 */
.stats-bar {
  box-shadow: var(--shadow-level-1);
}

/* Category Card - Level 2 */
.category-card {
  box-shadow: var(--shadow-level-2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-level-3);
}

/* Topic Card - Level 2 */
.topic-card {
  box-shadow: var(--shadow-level-2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.topic-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-level-3);
}

/* Action Buttons - Level 3 */
.action-btn {
  box-shadow: var(--shadow-level-3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-level-3-hover);
}

/* View Button - Level 3 */
.view-btn {
  box-shadow: var(--shadow-level-3);
}

/* Load More Button - Level 3 */
.load-more-btn {
  box-shadow: var(--shadow-level-3);
}

/* Rules Section - Level 1 */
.rules-section {
  box-shadow: var(--shadow-level-1);
}

/* Login Prompt - Level 1 */
.login-prompt-section {
  box-shadow: var(--shadow-level-1);
}

/* ─── Page-specific: stat-value gradient text ─── */
.stat-value {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .stat-value {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── Page-specific: category card hover (translateX instead of Y) ─── */
.category-card:hover {
  transform: translateX(5px);
}

/* ─── Page-specific: category icon container ─── */
.category-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.15) 0%, rgba(200, 16, 46, 0.15) 100%);
  border-radius: 12px;
}

.dark .category-icon {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.2) 0%, rgba(255, 77, 109, 0.2) 100%);
}

/* ─── Page-specific: view button scale on hover ─── */
.view-btn:hover {
  transform: scale(1.05);
}

/* ─── Page-specific: topic card hover background change ─── */
.topic-card:hover {
  background: rgba(255, 255, 255, 0.95);
}

.dark .topic-card:hover {
  background: rgba(30, 30, 45, 0.95);
}

/* ─── Page-specific: login prompt dashed border override ─── */
.login-prompt-section {
  border-style: dashed;
}
</style>
