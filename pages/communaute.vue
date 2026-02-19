<script setup>
import { ref } from 'vue'

// Sample community members data
const teamMembers = ref([
  {
    id: 1,
    name: 'Alexandre Dupont',
    role: 'Fondateur & Président',
    bio: 'Entrepreneur et visionnaire, passionné par la transformation politique de la France.',
    avatar: null
  },
  {
    id: 2,
    name: 'Marie Laurent',
    role: 'Vice-Présidente',
    bio: 'Experte en économie et défenseure des libertés individuelles.',
    avatar: null
  },
  {
    id: 3,
    name: 'Thomas Bernard',
    role: 'Secrétaire Général',
    bio: 'Spécialiste en organisation et communication politique.',
    avatar: null
  },
  {
    id: 4,
    name: 'Sophie Martin',
    role: 'Trésorière',
    bio: 'Comptable de formation, garante de la transparence financière.',
    avatar: null
  }
])

// Regional groups
const regionalGroups = ref([
  { name: 'Île-de-France', members: 150, leader: 'Jean-Pierre Moreau' },
  { name: 'Auvergne-Rhône-Alpes', members: 85, leader: 'Claire Rousseau' },
  { name: 'Nouvelle-Aquitaine', members: 60, leader: 'Michel Blanc' },
  { name: 'Occitanie', members: 55, leader: 'Anne-Marie Petit' },
  { name: 'Provence-Alpes-Côte d\'Azur', members: 70, leader: 'Robert Duval' },
  { name: 'Grand Est', members: 45, leader: 'François Weber' }
])

// Social links
const socialLinks = [
  { name: 'Twitter / X', icon: 'fa-brands fa-x-twitter', url: '#' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook', url: '#' },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: '#' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: '#' },
  { name: 'YouTube', icon: 'fa-brands fa-youtube', url: '#' },
  { name: 'Telegram', icon: 'fa-brands fa-telegram', url: '#' },
  { name: 'Discord', icon: 'fa-brands fa-discord', url: '#' }
]
</script>

<template>
  <main class="main-content min-h-screen pb-24">
    <div class="content-container">
      <!-- Page Header -->
      <section class="page-header mb-12 text-center">
        <div class="header-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
          <FontAwesomeIcon icon="fa-solid fa-users" class="mr-2" />
          Notre Communauté
        </div>
        <h1 class="page-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Communauté
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Rejoignez une communauté de citoyens engagés pour une France prospère et libre
        </p>
      </section>

      <!-- Team Section -->
      <section class="team-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-user-tie" class="mr-3" />
          L'Équipe Dirigeante
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="member in teamMembers" :key="member.id" class="team-card rp-card p-6 rounded-xl text-center">
            <div class="avatar-wrapper mb-4 mx-auto">
              <div class="avatar-placeholder">
                <FontAwesomeIcon icon="fa-solid fa-user" class="text-3xl" />
              </div>
            </div>
            <h3 class="font-bold text-lg mb-1">{{ member.name }}</h3>
            <p class="role-badge rp-badge inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2">
              {{ member.role }}
            </p>
            <p class="text-sm opacity-70">{{ member.bio }}</p>
          </div>
        </div>
      </section>

      <!-- Regional Groups -->
      <section class="regional-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-map-marked-alt" class="mr-3" />
          Groupes Régionaux
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="group in regionalGroups" :key="group.name" class="regional-card rp-card p-5 rounded-xl">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-bold text-lg">{{ group.name }}</h3>
              <span class="member-count rp-badge px-2 py-1 rounded-full text-xs font-bold">
                {{ group.members }} membres
              </span>
            </div>
            <div class="flex items-center gap-2 text-sm opacity-70">
              <FontAwesomeIcon icon="fa-solid fa-user-shield" />
              <span>Responsable: {{ group.leader }}</span>
            </div>
            <button class="join-btn rp-btn-outline mt-4 w-full py-2 rounded-lg text-sm font-semibold">
              Rejoindre le groupe
            </button>
          </div>
        </div>
      </section>

      <!-- Community Values -->
      <section class="values-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-heart" class="mr-3" />
          Nos Valeurs Communautaires
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="value-card rp-card p-6 rounded-xl text-center">
            <div class="value-icon icon-gradient mb-4">
              <FontAwesomeIcon icon="fa-solid fa-handshake" class="text-4xl" />
            </div>
            <h3 class="font-bold text-xl mb-2">Solidarité</h3>
            <p class="text-sm opacity-70">
              Nous nous entraidons et nous soutenons mutuellement dans nos actions et projets.
            </p>
          </div>
          
          <div class="value-card rp-card p-6 rounded-xl text-center">
            <div class="value-icon icon-gradient mb-4">
              <FontAwesomeIcon icon="fa-solid fa-comments" class="text-4xl" />
            </div>
            <h3 class="font-bold text-xl mb-2">Dialogue</h3>
            <p class="text-sm opacity-70">
              Le débat constructif et le respect des opinions sont au cœur de notre communauté.
            </p>
          </div>
          
          <div class="value-card rp-card p-6 rounded-xl text-center">
            <div class="value-icon icon-gradient mb-4">
              <FontAwesomeIcon icon="fa-solid fa-rocket" class="text-4xl" />
            </div>
            <h3 class="font-bold text-xl mb-2">Action</h3>
            <p class="text-sm opacity-70">
              Ensemble, nous passons à l'action pour transformer nos idées en réalité.
            </p>
          </div>
        </div>
      </section>

      <!-- Social Media Section -->
      <section class="social-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-share-nodes" class="mr-3" />
          Suivez-nous
        </h2>
        <div class="flex flex-wrap justify-center gap-4">
          <a 
            v-for="social in socialLinks" 
            :key="social.name"
            :href="social.url"
            class="social-btn rp-card p-4 rounded-xl flex flex-col items-center gap-2"
            target="_blank"
          >
            <FontAwesomeIcon :icon="social.icon" class="text-2xl" />
            <span class="text-sm font-medium">{{ social.name }}</span>
          </a>
        </div>
      </section>

      <!-- Join CTA -->
      <section class="join-cta-section rp-section p-8 rounded-2xl text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">
          <FontAwesomeIcon icon="fa-solid fa-user-plus" class="mr-3" />
          Rejoignez la Communauté
        </h2>
        <p class="text-lg mb-6 opacity-80 max-w-2xl mx-auto">
          Faites partie du mouvement. Adhérez dès aujourd'hui et participez activement à la construction d'une nouvelle France.
        </p>
        <NuxtLink to="/adhesion" class="cta-btn rp-btn-primary inline-block px-8 py-4 rounded-lg font-bold text-lg">
          Devenir Membre
          <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="ml-2" />
        </NuxtLink>
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

/* Team Card - Level 2 */
.team-card {
  box-shadow: var(--shadow-level-2);
}

/* Regional Card - Level 2 */
.regional-card {
  box-shadow: var(--shadow-level-2);
}

/* Value Card - Level 2 */
.value-card {
  box-shadow: var(--shadow-level-2);
}

/* Social Button - Level 2/3 */
.social-btn {
  box-shadow: var(--shadow-level-2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-level-3);
}

/* Join CTA Section - Level 1 */
.join-cta-section {
  box-shadow: var(--shadow-level-1);
}

/* CTA Button - Level 3 */
.cta-btn {
  box-shadow: var(--shadow-level-3);
}

.cta-btn:hover {
  box-shadow: var(--shadow-level-3-hover);
}

/* Join Button - Level 3 */
.join-btn {
  box-shadow: var(--shadow-level-3);
}

/* ─── Page-specific: Avatar styling ─── */
.avatar-wrapper {
  width: 80px;
  height: 80px;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.2) 0%, rgba(200, 16, 46, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #003399;
}

.dark .avatar-placeholder {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.2) 0%, rgba(255, 77, 109, 0.2) 100%);
  border-color: #4d7fbf;
}

/* ─── Page-specific: Social button min-width ─── */
.social-btn {
  min-width: 100px;
}
</style>
