<script setup>
import { ref } from 'vue'

// SEO Meta
useHead({
  title: 'Radical Prospérité - Parti Libertarien Français',
  meta: [
    { name: 'description', content: 'Système politique décentralisé autonome. Un nouveau modèle politique pour la France basé sur la technologie, la transparence et la liberté individuelle.' },
    { property: 'og:title', content: 'Radical Prospérité - Parti Libertarien Français' },
    { property: 'og:description', content: 'Rejoignez le mouvement pour une France prospère. Justice, Liberté, Technologie, Prospérité.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
})

// Meet-up data (can be updated when there's a planned meet-up)
const nextMeetup = ref(null) // Set to { date: '2026-02-15', time: '19:00', location: 'Paris', title: 'Nom du meet-up' } when planned
</script>

<template>
  <main class="main-content min-h-screen pb-24">
    <!-- Grey transparent background container -->
    <div class="page-background">
      <!-- Content Container with centered margins -->
      <div class="content-container">
        <!-- Hero Section -->
        <section class="hero-section mb-8 md:mb-10 text-center mx-4 md:mx-8 lg:mx-12">
          <div class="hero-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
            🇫🇷 Parti Libertarien Parisien
          </div>
          <h1 class="hero-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Système politique décentralisé autonome
          </h1>
          <p class="hero-subtitle text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-2">
            Bonté • Fierté • Force
          </p>
        </section>

        <!-- Quote Section -->
        <section class="quote-section mb-10 md:mb-14 p-5 md:p-7 rounded-2xl mx-4 md:mx-8 lg:mx-12">
          <blockquote class="text-lg md:text-xl italic text-center mb-3">
            « La justice sans la force est impuissante ; la force sans la justice est tyrannique. »
          </blockquote>
          <p class="text-sm md:text-base text-center opacity-70 quote-attribution">— Blaise Pascal</p>
        </section>

        <!-- Next Meet-up Section -->
        <section class="meetup-section mb-10 md:mb-14 mx-4 md:mx-8 lg:mx-12">
          <h2 class="section-title text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">Prochain Meet-up</h2>
        
          <div v-if="nextMeetup" class="meetup-card p-5 md:p-7 rounded-2xl">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-5">
              <div class="meetup-date-badge flex flex-col items-center justify-center p-3 rounded-xl min-w-20">
                <span class="text-2xl font-bold">{{ new Date(nextMeetup.date).getDate() }}</span>
                <span class="text-xs uppercase">{{ new Date(nextMeetup.date).toLocaleDateString('fr-FR', { month: 'short' }) }}</span>
              </div>
              <div class="flex-1 text-center md:text-left">
                <h3 class="text-lg md:text-xl font-bold mb-1.5">{{ nextMeetup.title }}</h3>
                <div class="meetup-details flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 text-sm opacity-80">
                  <span class="flex items-center justify-center md:justify-start gap-2">
                    <FontAwesomeIcon icon="fa-solid fa-clock" />
                    {{ nextMeetup.time }}
                  </span>
                  <span class="flex items-center justify-center md:justify-start gap-2">
                    <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    {{ nextMeetup.location }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="meetup-empty p-6 md:p-10 rounded-2xl text-center">
            <div class="meetup-empty-icon mb-3">
              <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" class="text-3xl md:text-4xl" />
            </div>
            <p class="text-base md:text-lg font-medium opacity-80">Aucun meet-up prévu</p>
            <p class="text-xs md:text-sm opacity-60 mt-1.5">Suivez-nous pour être informé des prochains événements</p>
          </div>
        </section>

        <!-- Mission Section -->
        <section class="mission-section mb-10 md:mb-14 text-center mx-4 md:mx-8 lg:mx-12">
          <h2 class="section-title text-xl sm:text-2xl md:text-3xl font-bold mb-5">Notre Mission</h2>
          <p class="mission-objective text-base md:text-lg font-medium mb-4 opacity-90">
            Assurer la gestion sociale optimale de la France
          </p>
          <p class="text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Définir un nouveau modèle politique pour notre pays. Chaque génération devrait écrire ses lois. 
            Offrir un appareil administratif efficace et transparent pour garantir la bonne gouvernance citoyenne de la France.
          </p>
          <p class="text-sm md:text-base max-w-3xl mx-auto leading-relaxed mt-3">
            Dans notre société moderne, l'encre a été remplacée par le bit.
            Notre objectif : une application permettant aux citoyens une maîtrise totale de la gestion de l'État.
          </p>
        </section>

        <!-- AI Agent Section - NEW -->
        <section class="ai-section mb-10 md:mb-14 mx-4 md:mx-8 lg:mx-12">
          <h2 class="section-title text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
            <FontAwesomeIcon icon="fa-solid fa-robot" class="mr-2" />
            Agents IA Citoyens
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="ai-card p-6 rounded-2xl">
              <div class="ai-icon mb-4">
                <FontAwesomeIcon icon="fa-solid fa-user-shield" class="text-4xl" />
              </div>
              <h3 class="text-lg font-bold mb-3">Votre Représentant Numérique</h3>
              <p class="text-sm opacity-80 mb-4">
                Chaque citoyen dispose d'un agent IA personnel qui représente ses intérêts, 
                surveille les lois qui l'affectent, et participe aux votes selon ses valeurs.
              </p>
              <ul class="text-sm space-y-2">
                <li class="flex items-center gap-2">
                  <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                  Surveillance des lois 24/7
                </li>
                <li class="flex items-center gap-2">
                  <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                  Alertes personnalisées
                </li>
                <li class="flex items-center gap-2">
                  <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                  Vote délégué intelligent
                </li>
              </ul>
            </div>
            
            <div class="ai-card p-6 rounded-2xl">
              <div class="ai-icon mb-4">
                <FontAwesomeIcon icon="fa-solid fa-scale-balanced" class="text-4xl" />
              </div>
              <h3 class="text-lg font-bold mb-3">Comprendre les Lois</h3>
              <p class="text-sm opacity-80 mb-4">
                Notre IA traduit le jargon juridique en langage simple. 
                Suivez les lois locales, nationales et européennes qui vous concernent.
              </p>
              <div class="law-levels flex flex-wrap gap-2 mt-4">
                <span class="law-badge px-3 py-1 rounded-full text-xs font-medium">
                  <FontAwesomeIcon icon="fa-solid fa-building" class="mr-1" />
                  Mairie
                </span>
                <span class="law-badge px-3 py-1 rounded-full text-xs font-medium">
                  <FontAwesomeIcon icon="fa-solid fa-landmark" class="mr-1" />
                  Région
                </span>
                <span class="law-badge px-3 py-1 rounded-full text-xs font-medium">
                  <FontAwesomeIcon icon="fa-solid fa-flag" class="mr-1" />
                  France
                </span>
                <span class="law-badge px-3 py-1 rounded-full text-xs font-medium">
                  <FontAwesomeIcon icon="fa-solid fa-earth-europe" class="mr-1" />
                  Europe
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Blockchain Transparency Section - NEW -->
        <section class="blockchain-section mb-10 md:mb-14 mx-4 md:mx-8 lg:mx-12">
          <h2 class="section-title text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
            <FontAwesomeIcon icon="fa-solid fa-link" class="mr-2" />
            Gouvernance Transparente
          </h2>
          <div class="blockchain-card p-6 rounded-2xl text-center">
            <div class="chain-visual flex justify-center items-center gap-2 mb-6 flex-wrap">
              <div class="chain-block">
                <FontAwesomeIcon icon="fa-solid fa-cube" class="text-2xl" />
                <span class="text-xs">Vote</span>
              </div>
              <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="text-gray-400" />
              <div class="chain-block">
                <FontAwesomeIcon icon="fa-solid fa-cube" class="text-2xl" />
                <span class="text-xs">Validation</span>
              </div>
              <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="text-gray-400" />
              <div class="chain-block">
                <FontAwesomeIcon icon="fa-solid fa-cube" class="text-2xl" />
                <span class="text-xs">Exécution</span>
              </div>
              <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="text-gray-400" />
              <div class="chain-block">
                <FontAwesomeIcon icon="fa-solid fa-cube" class="text-2xl" />
                <span class="text-xs">Audit</span>
              </div>
            </div>
            <p class="text-sm md:text-base opacity-80 max-w-2xl mx-auto">
              Chaque décision, chaque vote, chaque dépense est enregistré sur la blockchain. 
              Aucune manipulation possible. Transparence totale et vérifiable par tous.
            </p>
            <div class="blockchain-stats flex flex-wrap justify-center gap-6 mt-6">
              <div class="stat">
                <span class="stat-number text-2xl font-bold">100%</span>
                <span class="stat-label text-xs opacity-60 block">Transparent</span>
              </div>
              <div class="stat">
                <span class="stat-number text-2xl font-bold">0</span>
                <span class="stat-label text-xs opacity-60 block">Manipulation</span>
              </div>
              <div class="stat">
                <span class="stat-number text-2xl font-bold">∞</span>
                <span class="stat-label text-xs opacity-60 block">Vérifiable</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Values Grid -->
        <section class="values-section mb-10 md:mb-14 mx-4 md:mx-8 lg:mx-12">
          <h2 class="section-title text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">Nos Valeurs</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <!-- Justice Card -->
            <div class="value-card p-5 rounded-2xl">
              <div class="card-header flex items-center gap-3 mb-2 px-3 py-2">
                <div class="card-icon-wrapper">
                  <FontAwesomeIcon icon="fa-solid fa-scale-balanced" class="text-xl md:text-2xl" />
                </div>
                <h3 class="text-lg md:text-xl font-bold">Justice</h3>
              </div>
              <p class="text-sm opacity-80 px-2">
                Instaurer un contrôle judiciaire strict des juges et des procureurs. 
                Un suivi rigoureux de leurs jugements et des conséquences sur la société.
              </p>
            </div>

            <!-- Liberté Card -->
            <div class="value-card p-5 rounded-2xl">
              <div class="card-header flex items-center gap-3 mb-2 px-3 py-2">
                <div class="card-icon-wrapper">
                  <FontAwesomeIcon icon="fa-solid fa-dove" class="text-xl md:text-2xl" />
                </div>
                <h3 class="text-lg md:text-xl font-bold">Liberté</h3>
              </div>
              <p class="text-sm opacity-80 px-2">
                Défendre les libertés individuelles fondamentales. 
                Réduire l'emprise de l'État sur la vie des citoyens.
              </p>
            </div>

            <!-- Technologie Card -->
            <div class="value-card p-5 rounded-2xl">
              <div class="card-header flex items-center gap-3 mb-2 px-3 py-2">
                <div class="card-icon-wrapper">
                  <FontAwesomeIcon icon="fa-solid fa-microchip" class="text-xl md:text-2xl" />
                </div>
                <h3 class="text-lg md:text-xl font-bold">Technologie</h3>
              </div>
              <p class="text-sm opacity-80 px-2">
                IA pour la gestion de l'État. Blockchain pour la transparence. 
                Génétique pour l'agriculture et la médecine.
              </p>
            </div>

            <!-- Prospérité Card -->
            <div class="value-card p-5 rounded-2xl">
              <div class="card-header flex items-center gap-3 mb-2 px-3 py-2">
                <div class="card-icon-wrapper">
                  <FontAwesomeIcon icon="fa-solid fa-chart-line" class="text-xl md:text-2xl" />
                </div>
                <h3 class="text-lg md:text-xl font-bold">Prospérité</h3>
              </div>
              <p class="text-sm opacity-80 px-2">
                Favoriser l'entrepreneuriat et l'innovation. 
                Alléger la fiscalité pour libérer le potentiel économique.
              </p>
            </div>
          </div>
        </section>

        <!-- Call to Action -->
        <section class="cta-section text-center p-6 md:p-10 rounded-2xl mx-4 md:mx-8 lg:mx-12">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Rejoignez le Mouvement</h2>
          <p class="text-sm md:text-base mb-6 opacity-90">
            Suivez-nous sur les réseaux sociaux et participez à la construction d'une France prospère.
          </p>
          
          <!-- Social Links CTA -->
          <div class="cta-buttons flex flex-wrap justify-center gap-3 mb-8">
            <a href="https://x.com/RadProsperite" target="_blank" rel="noopener" class="cta-btn px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
              <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
              <span>Suivre sur X</span>
            </a>
            <a href="https://discord.gg/53Jq3b8w" target="_blank" rel="noopener" class="cta-btn px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
              <FontAwesomeIcon icon="fa-brands fa-discord" />
              <span>Rejoindre Discord</span>
            </a>
          </div>

          <!-- Donation Section -->
          <div class="donation-section pt-6 border-t border-white/20">
            <p class="text-sm font-semibold mb-4 donation-label">
              <FontAwesomeIcon icon="fa-solid fa-heart" class="mr-2 text-red-400" />
              Soutenir le mouvement
            </p>
            <div class="crypto-donations flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
              <!-- Bitcoin -->
              <div class="crypto-card flex items-center gap-3 px-4 py-3 rounded-xl">
                <div class="crypto-icon">
                  <FontAwesomeIcon icon="fa-brands fa-bitcoin" class="text-xl" />
                </div>
                <div class="crypto-info text-left">
                  <span class="crypto-name text-sm font-semibold block">Bitcoin</span>
                  <span class="crypto-address text-xs opacity-60">Bientôt disponible</span>
                </div>
              </div>
              
              <!-- Ethereum -->
              <div class="crypto-card flex items-center gap-3 px-4 py-3 rounded-xl">
                <div class="crypto-icon">
                  <FontAwesomeIcon icon="fa-brands fa-ethereum" class="text-xl" />
                </div>
                <div class="crypto-info text-left">
                  <span class="crypto-name text-sm font-semibold block">Ethereum</span>
                  <span class="crypto-address text-xs opacity-60">Bientôt disponible</span>
                </div>
              </div>
              
              <!-- Solana -->
              <div class="crypto-card flex items-center gap-3 px-4 py-3 rounded-xl">
                <div class="crypto-icon">
                  <FontAwesomeIcon icon="fa-solid fa-coins" class="text-xl" />
                </div>
                <div class="crypto-info text-left">
                  <span class="crypto-name text-sm font-semibold block">Solana</span>
                  <span class="crypto-address text-xs opacity-60">Bientôt disponible</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════════════
   RADICAL PROSPÉRITÉ - INDEX PAGE STYLES (Cleaned & Consolidated)
   ═══════════════════════════════════════════════════════════════ */

/* Page Background Container */
.page-background {
  background: rgba(128, 128, 128, 0.06);
  backdrop-filter: blur(4px) saturate(1.2);
  border-radius: var(--radius-2xl);
  margin: 4px;
  padding: 6px 0.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.dark .page-background {
  background: rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.05);
}

@media (min-width: 640px) {
  .page-background { padding: 6px 1rem; }
}

@media (min-width: 1024px) {
  .page-background { padding: 6px 1.5rem; }
}

/* Content Container */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.5rem;
}

@media (min-width: 640px) { .content-container { padding: 0 1rem; } }
@media (min-width: 1024px) { .content-container { padding: 0 1.5rem; } }
@media (min-width: 1280px) { .content-container { padding: 0 2rem; } }

/* ─── Hero Section ─── */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  background: var(--bg-section-light);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .hero-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

.hero-badge {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.12) 0%, rgba(200, 16, 46, 0.12) 100%);
  border: 1px solid rgba(0, 51, 153, 0.25);
  box-shadow: var(--shadow-low);
}

.dark .hero-badge {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.18) 0%, rgba(255, 77, 109, 0.18) 100%);
  border-color: rgba(77, 127, 191, 0.35);
}

.hero-title {
  font-family: 'Ethnocentric', 'Orbitron', sans-serif;
  max-width: 780px;
  background-image: linear-gradient(135deg, #133986 0%, #ffffff 50%, #8f0f26 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  letter-spacing: 0.3em;
}

/* ─── Quote Section ─── */
.quote-section {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.06) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(200, 16, 46, 0.06) 100%);
  border-left: 4px solid #003399;
  border-right: 4px solid #c8102e;
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-card);
}

.dark .quote-section {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.12) 0%, rgba(25, 25, 40, 0.85) 50%, rgba(255, 77, 109, 0.12) 100%);
  border-left-color: #4d7fbf;
  border-right-color: #ff4d6d;
}

.quote-attribution {
  text-align: right;
}

/* ─── Meet-up Section ─── */
.meetup-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .meetup-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

.meetup-card {
  background: var(--bg-card-light);
  border: 2px solid rgba(0, 51, 153, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-card);
}

.dark .meetup-card {
  background: var(--bg-card-dark);
  border-color: rgba(77, 127, 191, 0.3);
}

.meetup-date-badge {
  background: var(--gradient-tricolor-light);
  color: white;
  box-shadow: var(--shadow-btn-outer-bottom);
}

.dark .meetup-date-badge {
  background: var(--gradient-tricolor-dark);
}

.meetup-empty {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.04) 0%, rgba(200, 16, 46, 0.04) 100%);
  border: 2px dashed rgba(0, 51, 153, 0.2);
  box-shadow: var(--shadow-section);
}

.dark .meetup-empty {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.08) 0%, rgba(255, 77, 109, 0.08) 100%);
  border-color: rgba(77, 127, 191, 0.3);
}

.meetup-empty-icon {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.6;
}

.dark .meetup-empty-icon {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── Mission Section ─── */
.mission-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .mission-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

.mission-objective {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .mission-objective {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── Section Titles ─── */
.section-title {
  position: relative;
  display: block;
  width: 100%;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, #003399 15%, #c8102e 85%, transparent 100%);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 51, 153, 0.3), 0 2px 8px rgba(200, 16, 46, 0.3);
}

.dark .section-title::after {
  background: linear-gradient(90deg, transparent 0%, #4d7fbf 15%, #ff4d6d 85%, transparent 100%);
}

/* ─── Values Section ─── */
.values-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .values-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

.value-card {
  background: var(--bg-card-light);
  border: var(--border-card-light);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(12px);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  box-shadow: var(--shadow-card);
}

.dark .value-card {
  background: var(--bg-card-dark);
  border: var(--border-card-dark);
}

.value-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
  border-color: rgba(200, 16, 46, 0.3);
}

.dark .value-card:hover {
  border-color: rgba(255, 77, 109, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.06) 0%, rgba(200, 16, 46, 0.06) 100%);
  border-radius: 12px;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -1px 2px rgba(0, 0, 0, 0.03);
}

.dark .card-header {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.12) 0%, rgba(255, 77, 109, 0.12) 100%);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.08), inset 0 -1px 2px rgba(0, 0, 0, 0.15);
}

.card-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.2) 0%, rgba(200, 16, 46, 0.2) 100%);
  box-shadow: 0 3px 8px rgba(0, 51, 153, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.4);
}

.dark .card-icon-wrapper {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.25) 0%, rgba(255, 77, 109, 0.25) 100%);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.15);
}

.card-icon-wrapper svg {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .card-icon-wrapper svg {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── CTA Section ─── */
.cta-section {
  background: var(--bg-section-light);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  box-shadow: var(--shadow-medium);
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  background: linear-gradient(135deg, #003399 0%, #ffffff 50%, #c8102e 100%);
  z-index: -1;
  opacity: 0.8;
}

.dark .cta-section {
  background: var(--bg-section-dark);
}

.dark .cta-section::before {
  background: linear-gradient(135deg, #4d7fbf 0%, #333344 50%, #ff4d6d 100%);
}

.cta-btn {
  background: var(--gradient-tricolor-light);
  color: white;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  box-shadow: var(--shadow-btn-outer-bottom);
}

.dark .cta-btn {
  background: var(--gradient-tricolor-dark);
}

.cta-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 51, 153, 0.3);
}

.donation-section {
  border-color: rgba(255, 255, 255, 0.2);
}

.donation-label {
  color: rgba(100, 100, 100, 1);
}

.dark .donation-label {
  color: rgba(180, 180, 180, 1);
}

/* ─── Crypto Cards ─── */
.crypto-card {
  background: var(--bg-card-light);
  border: var(--border-card-light);
  border-radius: var(--radius-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  min-width: 180px;
  box-shadow: var(--shadow-card);
}

.dark .crypto-card {
  background: var(--bg-card-dark);
  border: var(--border-card-dark);
}

.crypto-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: var(--shadow-card-hover);
}

.crypto-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 192, 20, 0.3) 0%, rgba(255, 200, 0, 0.5) 100%);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5);
}

.crypto-icon svg {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .crypto-icon svg {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── AI Section ─── */
.ai-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .ai-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

.ai-card {
  background: var(--bg-card-light);
  border: var(--border-card-light);
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.dark .ai-card {
  background: var(--bg-card-dark);
  border: var(--border-card-dark);
}

.ai-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.ai-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(74, 222, 128, 0.2) 100%);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
}

.ai-icon svg {
  background: linear-gradient(135deg, #38bdf8 0%, #4ade80 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.law-badge {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.15) 0%, rgba(200, 16, 46, 0.15) 100%);
  border: 1px solid rgba(0, 51, 153, 0.25);
  color: var(--text-light);
}

.dark .law-badge {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.2) 0%, rgba(255, 77, 109, 0.2) 100%);
  border-color: rgba(77, 127, 191, 0.35);
  color: var(--text-dark);
}

/* ─── Blockchain Section ─── */
.blockchain-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .blockchain-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

.blockchain-card {
  background: var(--bg-card-light);
  border: var(--border-card-light);
  box-shadow: var(--shadow-card);
}

.dark .blockchain-card {
  background: var(--bg-card-dark);
  border: var(--border-card-dark);
}

.chain-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.1) 0%, rgba(200, 16, 46, 0.1) 100%);
  border: 2px solid rgba(0, 51, 153, 0.2);
  border-radius: var(--radius-md);
  min-width: 70px;
}

.dark .chain-block {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.15) 0%, rgba(255, 77, 109, 0.15) 100%);
  border-color: rgba(77, 127, 191, 0.3);
}

.chain-block svg {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .chain-block svg {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blockchain-stats .stat-number {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .blockchain-stats .stat-number {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE STYLES - All breakpoints
   ═══════════════════════════════════════════════════════════════ */

/* ─── Extra Small (<480px) - Small phones ─── */
@media (max-width: 479px) {
  .page-background {
    margin: 2px;
    padding: 4px 0.5rem;
    border-radius: var(--radius-lg);
  }

  .content-container {
    padding: 0 0.25rem;
  }

  .hero-section,
  .meetup-section,
  .mission-section,
  .values-section,
  .cta-section,
  .quote-section {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: 1rem 0.75rem;
    border-radius: var(--radius-lg);
  }

  .hero-title {
    font-size: 1.125rem;
    line-height: 1.3;
  }

  .hero-subtitle {
    font-size: 0.875rem;
    letter-spacing: 0.1em;
  }

  .hero-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .section-title::after {
    bottom: -8px;
    height: 2px;
  }

  .quote-section blockquote {
    font-size: 0.95rem;
  }

  .value-card {
    padding: 0.75rem;
  }

  .card-header {
    padding: 0.35rem 0.5rem;
    gap: 0.5rem;
  }

  .card-icon-wrapper {
    width: 32px;
    height: 32px;
  }

  .card-header h3 {
    font-size: 0.95rem;
  }

  .value-card p {
    font-size: 0.8rem;
  }

  .cta-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .crypto-card {
    min-width: 150px;
    padding: 0.5rem 0.75rem;
  }

  .crypto-icon {
    width: 28px;
    height: 28px;
  }

  .crypto-name {
    font-size: 0.75rem;
  }

  .crypto-address {
    font-size: 0.65rem;
  }

  .meetup-empty {
    padding: 1.5rem 1rem;
  }
}

/* ─── Small (480px-639px) - Large phones ─── */
@media (min-width: 480px) and (max-width: 639px) {
  .hero-section,
  .meetup-section,
  .mission-section,
  .values-section,
  .cta-section,
  .quote-section {
    margin-left: 0.75rem;
    margin-right: 0.75rem;
    padding: 1.25rem 1rem;
  }

  .hero-title {
    font-size: 1.375rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    letter-spacing: 0.15em;
  }

  .section-title {
    font-size: 1.125rem;
  }

  .card-icon-wrapper {
    width: 36px;
    height: 36px;
  }
}

/* ─── Medium (640px-767px) - Small tablets ─── */
@media (min-width: 640px) and (max-width: 767px) {
  .hero-section,
  .meetup-section,
  .mission-section,
  .values-section,
  .cta-section,
  .quote-section {
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 1.5rem 1.25rem;
  }

  .hero-title {
    font-size: 1.625rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .values-section .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ─── Large (768px-1023px) - Tablets ─── */
@media (min-width: 768px) and (max-width: 1023px) {
  .page-background {
    padding: 8px 1.5rem;
  }

  .hero-section,
  .meetup-section,
  .mission-section,
  .values-section,
  .cta-section,
  .quote-section {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    padding: 2rem 1.75rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    letter-spacing: 0.2em;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .values-section .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .card-icon-wrapper {
    width: 44px;
    height: 44px;
  }

  .cta-buttons {
    gap: 1rem;
  }

  .crypto-donations {
    gap: 1rem;
  }
}

/* ─── XL (1024px-1279px) - Laptops ─── */
@media (min-width: 1024px) and (max-width: 1279px) {
  .page-background {
    padding: 10px 2rem;
  }

  .content-container {
    max-width: 960px;
  }

  .hero-section,
  .meetup-section,
  .mission-section,
  .values-section,
  .cta-section,
  .quote-section {
    margin-left: 2rem;
    margin-right: 2rem;
    padding: 2.25rem 2rem;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .section-title {
    font-size: 1.625rem;
  }

  .values-section .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .card-icon-wrapper {
    width: 46px;
    height: 46px;
  }
}

/* ─── 2XL (1280px-1535px) - Desktops ─── */
@media (min-width: 1280px) and (max-width: 1535px) {
  .page-background {
    padding: 12px 2.5rem;
  }

  .content-container {
    max-width: 1200px;
  }

  .hero-section,
  .meetup-section,
  .mission-section,
  .values-section,
  .cta-section,
  .quote-section {
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    padding: 2.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    letter-spacing: 0.3em;
  }

  .section-title {
    font-size: 1.875rem;
  }

  .values-section .grid {
    gap: 1.75rem;
  }

  .value-card {
    padding: 1.5rem;
  }

  .card-icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .cta-section {
    padding: 3rem;
  }
}

/* ─── 3XL (1536px+) - Wide screens ─── */
@media (min-width: 1536px) {
  .page-background {
    padding: 16px 3rem;
    max-width: 1800px;
    margin-left: auto;
    margin-right: auto;
  }

  .content-container {
    max-width: 1400px;
  }

  .hero-section,
  .meetup-section,
  .mission-section,
  .values-section,
  .cta-section,
  .quote-section {
    margin-left: 3rem;
    margin-right: 3rem;
    padding: 3rem;
  }

  .hero-title {
    font-size: 2.75rem;
  }

  .hero-subtitle {
    font-size: 1.375rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .quote-section blockquote {
    font-size: 1.375rem;
  }

  .values-section .grid {
    gap: 2rem;
  }

  .value-card {
    padding: 1.75rem;
  }

  .card-header h3 {
    font-size: 1.25rem;
  }

  .value-card p {
    font-size: 1rem;
  }

  .card-icon-wrapper {
    width: 52px;
    height: 52px;
  }

  .cta-section {
    padding: 3.5rem;
  }

  .crypto-card {
    min-width: 200px;
    padding: 1rem 1.25rem;
  }
}

/* ─── Ultra-wide (1920px+) ─── */
@media (min-width: 1920px) {
  .page-background {
    max-width: 2000px;
  }

  .content-container {
    max-width: 1600px;
  }

  .hero-title {
    font-size: 3rem;
  }

  .section-title {
    font-size: 2.25rem;
  }

  .values-section .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ─── Touch-friendly adjustments ─── */
@media (hover: none) and (pointer: coarse) {
  .value-card:hover,
  .crypto-card:hover,
  .cta-btn:hover {
    transform: none;
  }

  .value-card:active,
  .crypto-card:active,
  .cta-btn:active {
    transform: scale(0.98);
  }
}

/* ─── Landscape mobile ─── */
@media (max-height: 500px) and (orientation: landscape) {
  .hero-section {
    padding: 1rem;
  }

  .hero-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .hero-subtitle {
    margin-bottom: 0.25rem;
  }

  .hero-badge {
    margin-bottom: 0.5rem;
  }
}
</style>
