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
  <main class="main-content min-h-screen pb-24" role="main">
    <!-- Grey transparent background container -->
    <div class="page-background">
      <!-- Content Container with centered margins -->
      <div class="content-container">
        <!-- Hero Section -->
        <header class="hero-section rp-section text-center" data-component="section" aria-labelledby="hero-title">
          <span class="rp-badge rp-badge--outline" role="text">
            🇫🇷 Parti Libertarien Parisien
          </span>
          <h1 id="hero-title" class="hero-title rp-heading rp-heading--gradient">
            Système politique décentralisé autonome
          </h1>
          <p class="hero-subtitle">
            Bonté • Fierté • Force
          </p>
        </header>

        <!-- Quote Section -->
        <figure class="quote-section rp-section" data-component="section" role="figure" aria-labelledby="quote-author">
          <blockquote class="quote-text" cite="https://fr.wikipedia.org/wiki/Blaise_Pascal">
            <p>« La justice sans la force est impuissante ; la force sans la justice est tyrannique. »</p>
          </blockquote>
          <figcaption id="quote-author" class="quote-attribution">— Blaise Pascal</figcaption>
        </figure>

        <!-- Next Meet-up Section -->
        <section class="meetup-section rp-section" data-component="section" aria-labelledby="meetup-title">
          <h2 id="meetup-title" class="rp-heading rp-heading--gradient rp-section-title text-center">
            Prochain Meet-up
          </h2>
        
          <article v-if="nextMeetup" class="meetup-card rp-card" data-component="card">
            <div class="meetup-layout">
              <time class="meetup-date-badge rp-badge rp-badge--primary" :datetime="nextMeetup.date">
                <span class="meetup-day">{{ new Date(nextMeetup.date).getDate() }}</span>
                <span class="meetup-month">{{ new Date(nextMeetup.date).toLocaleDateString('fr-FR', { month: 'short' }) }}</span>
              </time>
              <div class="meetup-info">
                <h3 class="meetup-title">{{ nextMeetup.title }}</h3>
                <dl class="meetup-details">
                  <div class="meetup-detail">
                    <dt class="sr-only">Heure</dt>
                    <dd>
                      <FontAwesomeIcon icon="fa-solid fa-clock" class="rp-icon rp-icon--sm" aria-hidden="true" />
                      {{ nextMeetup.time }}
                    </dd>
                  </div>
                  <div class="meetup-detail">
                    <dt class="sr-only">Lieu</dt>
                    <dd>
                      <FontAwesomeIcon icon="fa-solid fa-location-dot" class="rp-icon rp-icon--sm" aria-hidden="true" />
                      {{ nextMeetup.location }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
          
          <div v-else class="meetup-empty rp-card rp-card--flat" data-component="card" role="status">
            <div class="rp-icon-box rp-icon-box--xl meetup-empty-icon" aria-hidden="true">
              <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" class="rp-icon rp-icon--2xl rp-icon--gradient" />
            </div>
            <p class="meetup-empty-title">Aucun meet-up prévu</p>
            <p class="meetup-empty-subtitle">Suivez-nous pour être informé des prochains événements</p>
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

        <!-- AI Agent Section -->
        <section class="ai-section rp-section" data-component="section" aria-labelledby="ai-title">
          <h2 id="ai-title" class="rp-heading rp-heading--gradient rp-section-title text-center">
            <FontAwesomeIcon icon="fa-solid fa-robot" class="rp-icon rp-icon--lg" aria-hidden="true" />
            Agents IA Citoyens
          </h2>
          <div class="rp-grid rp-grid--2">
            <article class="ai-card rp-card" data-component="card">
              <div class="rp-icon-box rp-icon-box--xl ai-icon" aria-hidden="true">
                <FontAwesomeIcon icon="fa-solid fa-user-shield" class="rp-icon rp-icon--2xl" />
              </div>
              <h3 class="ai-card__title">Votre Représentant Numérique</h3>
              <p class="ai-card__text">
                Chaque citoyen dispose d'un agent IA personnel qui représente ses intérêts, 
                surveille les lois qui l'affectent, et participe aux votes selon ses valeurs.
              </p>
              <ul class="rp-list ai-features" role="list">
                <li class="rp-list-item">
                  <FontAwesomeIcon icon="fa-solid fa-check" class="rp-list-item__icon text-green-500" aria-hidden="true" />
                  <span>Surveillance des lois 24/7</span>
                </li>
                <li class="rp-list-item">
                  <FontAwesomeIcon icon="fa-solid fa-check" class="rp-list-item__icon text-green-500" aria-hidden="true" />
                  <span>Alertes personnalisées</span>
                </li>
                <li class="rp-list-item">
                  <FontAwesomeIcon icon="fa-solid fa-check" class="rp-list-item__icon text-green-500" aria-hidden="true" />
                  <span>Vote délégué intelligent</span>
                </li>
              </ul>
            </article>
            
            <article class="ai-card rp-card" data-component="card">
              <div class="rp-icon-box rp-icon-box--xl ai-icon" aria-hidden="true">
                <FontAwesomeIcon icon="fa-solid fa-scale-balanced" class="rp-icon rp-icon--2xl" />
              </div>
              <h3 class="ai-card__title">Comprendre les Lois</h3>
              <p class="ai-card__text">
                Notre IA traduit le jargon juridique en langage simple. 
                Suivez les lois locales, nationales et européennes qui vous concernent.
              </p>
              <div class="law-levels" role="list" aria-label="Niveaux de gouvernance">
                <span class="rp-badge rp-badge--outline" role="listitem">
                  <FontAwesomeIcon icon="fa-solid fa-building" aria-hidden="true" />
                  Mairie
                </span>
                <span class="rp-badge rp-badge--outline" role="listitem">
                  <FontAwesomeIcon icon="fa-solid fa-landmark" aria-hidden="true" />
                  Région
                </span>
                <span class="rp-badge rp-badge--outline" role="listitem">
                  <FontAwesomeIcon icon="fa-solid fa-flag" aria-hidden="true" />
                  France
                </span>
                <span class="rp-badge rp-badge--outline" role="listitem">
                  <FontAwesomeIcon icon="fa-solid fa-earth-europe" aria-hidden="true" />
                  Europe
                </span>
              </div>
            </article>
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
        <section class="values-section rp-section" data-component="section" aria-labelledby="values-title">
          <h2 id="values-title" class="rp-heading rp-heading--gradient rp-section-title text-center">
            Nos Valeurs
          </h2>
          <div class="rp-grid rp-grid--4" role="list">
            <!-- Justice Card -->
            <article class="value-card rp-card" data-component="card" role="listitem">
              <header class="value-card__header">
                <div class="rp-icon-box rp-icon-box--lg" aria-hidden="true">
                  <FontAwesomeIcon icon="fa-solid fa-scale-balanced" class="rp-icon rp-icon--xl rp-icon--gradient" />
                </div>
                <h3 class="value-card__title">Justice</h3>
              </header>
              <p class="value-card__text">
                Instaurer un contrôle judiciaire strict des juges et des procureurs. 
                Un suivi rigoureux de leurs jugements et des conséquences sur la société.
              </p>
            </article>

            <!-- Liberté Card -->
            <article class="value-card rp-card" data-component="card" role="listitem">
              <header class="value-card__header">
                <div class="rp-icon-box rp-icon-box--lg" aria-hidden="true">
                  <FontAwesomeIcon icon="fa-solid fa-dove" class="rp-icon rp-icon--xl rp-icon--gradient" />
                </div>
                <h3 class="value-card__title">Liberté</h3>
              </header>
              <p class="value-card__text">
                Défendre les libertés individuelles fondamentales. 
                Réduire l'emprise de l'État sur la vie des citoyens.
              </p>
            </article>

            <!-- Technologie Card -->
            <article class="value-card rp-card" data-component="card" role="listitem">
              <header class="value-card__header">
                <div class="rp-icon-box rp-icon-box--lg" aria-hidden="true">
                  <FontAwesomeIcon icon="fa-solid fa-microchip" class="rp-icon rp-icon--xl rp-icon--gradient" />
                </div>
                <h3 class="value-card__title">Technologie</h3>
              </header>
              <p class="value-card__text">
                IA pour la gestion de l'État. Blockchain pour la transparence. 
                Génétique pour l'agriculture et la médecine.
              </p>
            </article>

            <!-- Prospérité Card -->
            <article class="value-card rp-card" data-component="card" role="listitem">
              <header class="value-card__header">
                <div class="rp-icon-box rp-icon-box--lg" aria-hidden="true">
                  <FontAwesomeIcon icon="fa-solid fa-chart-line" class="rp-icon rp-icon--xl rp-icon--gradient" />
                </div>
                <h3 class="value-card__title">Prospérité</h3>
              </header>
              <p class="value-card__text">
                Favoriser l'entrepreneuriat et l'innovation. 
                Alléger la fiscalité pour libérer le potentiel économique.
              </p>
            </article>
          </div>
        </section>

        <!-- Call to Action -->
        <section class="cta-section rp-section" data-component="section" aria-labelledby="cta-title">
          <h2 id="cta-title" class="rp-heading rp-heading--gradient rp-section-title text-center">
            Rejoignez le Mouvement
          </h2>
          <p class="cta-subtitle">
            Suivez-nous sur les réseaux sociaux et participez à la construction d'une France prospère.
          </p>
          
          <!-- Social Links CTA -->
          <nav class="cta-buttons" aria-label="Réseaux sociaux">
            <a href="https://x.com/RadProsperite" target="_blank" rel="noopener noreferrer" class="rp-btn rp-btn--primary rp-btn--lg">
              <FontAwesomeIcon icon="fa-brands fa-x-twitter" class="rp-icon rp-icon--sm" aria-hidden="true" />
              <span>Suivre sur X</span>
            </a>
            <a href="https://discord.gg/53Jq3b8w" target="_blank" rel="noopener noreferrer" class="rp-btn rp-btn--outline rp-btn--lg">
              <FontAwesomeIcon icon="fa-brands fa-discord" class="rp-icon rp-icon--sm" aria-hidden="true" />
              <span>Rejoindre Discord</span>
            </a>
          </nav>

          <!-- Donation Section -->
          <aside class="donation-section" aria-labelledby="donation-title">
            <h3 id="donation-title" class="donation-label">
              <FontAwesomeIcon icon="fa-solid fa-heart" class="text-red-400" aria-hidden="true" />
              Soutenir le mouvement
            </h3>
            <div class="crypto-donations" role="list">
              <!-- Bitcoin -->
              <article class="crypto-card rp-card rp-card--interactive" data-component="card" role="listitem">
                <div class="rp-icon-box rp-icon-box--md crypto-icon" aria-hidden="true">
                  <FontAwesomeIcon icon="fa-brands fa-bitcoin" class="rp-icon rp-icon--lg" />
                </div>
                <div class="crypto-info">
                  <strong class="crypto-name">Bitcoin</strong>
                  <span class="crypto-address">Bientôt disponible</span>
                </div>
              </article>
              
              <!-- Ethereum -->
              <article class="crypto-card rp-card rp-card--interactive" data-component="card" role="listitem">
                <div class="rp-icon-box rp-icon-box--md crypto-icon" aria-hidden="true">
                  <FontAwesomeIcon icon="fa-brands fa-ethereum" class="rp-icon rp-icon--lg" />
                </div>
                <div class="crypto-info">
                  <strong class="crypto-name">Ethereum</strong>
                  <span class="crypto-address">Bientôt disponible</span>
                </div>
              </article>
              
              <!-- Solana -->
              <article class="crypto-card rp-card rp-card--interactive" data-component="card" role="listitem">
                <div class="rp-icon-box rp-icon-box--md crypto-icon" aria-hidden="true">
                  <FontAwesomeIcon icon="fa-solid fa-coins" class="rp-icon rp-icon--lg" />
                </div>
                <div class="crypto-info">
                  <strong class="crypto-name">Solana</strong>
                  <span class="crypto-address">Bientôt disponible</span>
                </div>
              </article>
            </div>
          </aside>
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
