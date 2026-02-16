<script setup>
import { ref } from 'vue'

// Forum categories
const categories = ref([
  {
    id: 1,
    name: 'Discussions Générales',
    description: 'Échangez sur tous les sujets liés au parti et à la politique.',
    icon: 'fa-solid fa-comments',
    topics: 45,
    posts: 234,
    lastActivity: '2026-01-18'
  },
  {
    id: 2,
    name: 'Économie & Fiscalité',
    description: 'Débats sur les politiques économiques et fiscales.',
    icon: 'fa-solid fa-chart-line',
    topics: 28,
    posts: 156,
    lastActivity: '2026-01-17'
  },
  {
    id: 3,
    name: 'Libertés Individuelles',
    description: 'Discussions sur les droits et libertés fondamentaux.',
    icon: 'fa-solid fa-dove',
    topics: 32,
    posts: 189,
    lastActivity: '2026-01-18'
  },
  {
    id: 4,
    name: 'Technologies & Innovation',
    description: 'Blockchain, IA, et leur application dans la gouvernance.',
    icon: 'fa-solid fa-microchip',
    topics: 19,
    posts: 98,
    lastActivity: '2026-01-16'
  },
  {
    id: 5,
    name: 'Actions Locales',
    description: 'Coordonnez vos actions et événements locaux.',
    icon: 'fa-solid fa-map-location-dot',
    topics: 56,
    posts: 312,
    lastActivity: '2026-01-18'
  },
  {
    id: 6,
    name: 'Propositions & Idées',
    description: 'Soumettez vos idées et propositions au parti.',
    icon: 'fa-solid fa-lightbulb',
    topics: 23,
    posts: 145,
    lastActivity: '2026-01-17'
  }
])

// Recent topics
const recentTopics = ref([
  {
    id: 1,
    title: 'Proposition: Réforme fiscale progressive',
    category: 'Économie & Fiscalité',
    author: 'Jean-Marc D.',
    replies: 24,
    views: 156,
    lastReply: '2026-01-18 14:30'
  },
  {
    id: 2,
    title: 'Organisation du meeting de février à Paris',
    category: 'Actions Locales',
    author: 'Sophie L.',
    replies: 18,
    views: 98,
    lastReply: '2026-01-18 12:15'
  },
  {
    id: 3,
    title: 'Utilisation de la blockchain pour les votes internes',
    category: 'Technologies & Innovation',
    author: 'Pierre M.',
    replies: 31,
    views: 234,
    lastReply: '2026-01-18 10:45'
  },
  {
    id: 4,
    title: 'Bienvenue aux nouveaux membres !',
    category: 'Discussions Générales',
    author: 'Admin',
    replies: 156,
    views: 892,
    lastReply: '2026-01-18 09:00'
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
