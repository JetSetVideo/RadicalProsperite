<script setup>
import { ref } from 'vue'

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
        <section class="hero-section mb-10 md:mb-14 text-center mx-4 md:mx-8 lg:mx-12">
          <h1 class="hero-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Système politique décentralisé autonome
          </h1>
          <!-- Quote Section (inside hero for DOM order from preview) -->
          <section class="quote-section mb-10 md:mb-14 p-5 md:p-7 rounded-2xl mx-4 md:mx-8 lg:mx-12">
            <blockquote class="text-lg md:text-xl italic text-center mb-3">
              « La justice sans la force est impuissante ; la force sans la justice est tyrannique. »
            </blockquote>
            <p class="text-sm md:text-base text-center opacity-70 quote-attribution">— Blaise Pascal</p>
          </section>
          <p class="hero-subtitle text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Bonté • Fierté • Force
          </p>
          <div class="hero-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
            🇫🇷 Parti Libertarien Parisien
          </div>
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
          <h3 class="text-base md:text-lg font-semibold mb-1">Objectif:</h3> 
          <p class="text-sm md:text-base mb-4">Assurer la Gestion sociale optimale de la France</p>
          <h2 class="section-title text-xl sm:text-2xl md:text-3xl font-bold mb-5">Notre Mission</h2>
          <p class="text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Définir un nouveau modèle politique pour notre pays. Chaque génération devrait écrire ses lois. 
            Offrir un appareil administratif efficace et transparent pour garantir la bonne gouvernance citoyenne de la France.
            Dans notre société moderne, l'encre a été remplacée par le bit.
            Proposer une application pour offrir aux citoyens une maîtrise totale de la gestion de l'état.
          </p>
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
                Intelligence artificielle pour la gestion de l'état et assister le citoyen dans la selection de ses opinions.
                Blockchain pour garantir la transparence et la sécurité de la gestion de l'état.
                Génétique pour l'agriculture et la médecine pour assurer la santé de la nation.
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
        <section class="cta-section text-left p-6 md:p-10 rounded-2xl mx-4 md:mx-8 lg:mx-12">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Rejoignez le Mouvement</h2>
          <p class="text-sm md:text-base mb-6 opacity-90">
            Suivez-nous sur les réseaux sociaux et participez à la construction d'une France prospère.
          </p>
          <p class="text-sm font-semibold mb-4 donation-label">
            Donation:
          </p>
          <div class="crypto-donations flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            <!-- Bitcoin -->
            <div class="crypto-card flex items-center gap-3 px-4 py-3 rounded-xl">
              <div class="crypto-icon">
                <FontAwesomeIcon icon="fa-brands fa-bitcoin" class="text-xl" />
              </div>
              <div class="crypto-info text-left">
                <span class="crypto-name text-sm font-semibold block">Bitcoin</span>
                <span class="crypto-address text-xs opacity-60">Adresse à venir...</span>
              </div>
            </div>
            
            <!-- Ethereum -->
            <div class="crypto-card flex items-center gap-3 px-4 py-3 rounded-xl">
              <div class="crypto-icon">
                <FontAwesomeIcon icon="fa-brands fa-ethereum" class="text-xl" />
              </div>
              <div class="crypto-info text-left">
                <span class="crypto-name text-sm font-semibold block">Ethereum</span>
                <span class="crypto-address text-xs opacity-60">Adresse à venir...</span>
              </div>
            </div>
            
            <!-- Solana -->
            <div class="crypto-card flex items-center gap-3 px-4 py-3 rounded-xl">
              <div class="crypto-icon">
                <FontAwesomeIcon icon="fa-solid fa-coins" class="text-xl" />
              </div>
              <div class="crypto-info text-left">
                <span class="crypto-name text-sm font-semibold block">Solana</span>
                <span class="crypto-address text-xs opacity-60">Adresse à venir...</span>
              </div>
            </div>
          </div>
        </section>
      </div>
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

/* Page Background - Level 0 */
.page-background {
  text-align: left;
  background: rgba(128, 128, 128, 0.06);
  backdrop-filter: blur(4px) saturate(1.2);
  border-radius: var(--radius-2xl);
  margin: 4px;
  padding: 6px 0.5rem;
  box-shadow: var(--shadow-level-0);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.dark .page-background {
  background: rgba(0, 0, 0, 0.12);
  box-shadow: var(--shadow-level-0);
  border-color: rgba(255, 255, 255, 0.05);
}

/* Hero Section - Level 1 */
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: 2rem 20px;
  text-align: center;
  background: var(--bg-section-light);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-level-1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2.5rem;
}

.dark .hero-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

/* Quote Section - Level 2 (Child of Hero/Level 1) */
.quote-section {
  text-align: center;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.06) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(200, 16, 46, 0.06) 100%);
  border-left: 4px solid #003399;
  border-right: 4px solid #c8102e;
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-level-2);
  border-radius: var(--radius-xl);
  margin: 1.5rem 0;
}

/* Hero Badge - Level 2 */
.hero-badge {
  text-align: center;
  vertical-align: middle;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.12) 0%, rgba(200, 16, 46, 0.12) 100%);
  border: 1px solid rgba(0, 51, 153, 0.25);
  padding: 4px 1.5rem;
  margin: 1rem 16px;
  box-shadow: var(--shadow-level-2);
  border-radius: 9999px;
}

/* Meet-up Section - Level 1 */
.meetup-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-level-1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .meetup-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

/* Meet-up Card - Level 2 */
.meetup-card {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 51, 153, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-level-2);
}

.dark .meetup-card {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(77, 127, 191, 0.2);
}

/* Mission Section - Level 1 */
.mission-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-level-1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .mission-section {
  background: var(--bg-section-dark);
  border-color: rgba(255, 255, 255, 0.05);
}

/* Values Section - Level 1 */
.values-section {
  background: var(--bg-section-light);
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-level-1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .values-section {
  background: var(--bg-section-dark);
}

/* Value Cards - Level 2 */
.value-card {
  background: var(--bg-card-light);
  border: var(--border-card-light);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(12px);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  box-shadow: var(--shadow-level-2);
}

.value-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-level-3);
}

/* CTA Section - Level 1 */
.cta-section {
  background: var(--bg-section-light);
  padding: 2.5rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-level-1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

/* Crypto Card - Level 2 */
.crypto-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background: var(--bg-card-light);
  border: var(--border-card-light);
  border-radius: var(--radius-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  min-width: 180px;
  box-shadow: var(--shadow-level-2);
}

.crypto-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-level-3);
}

/* Page Background - Grey transparent */
.page-background {
  text-align: left;
  background: rgba(128, 128, 128, 0.06);
  backdrop-filter: blur(4px) saturate(1.2);
  border-radius: var(--radius-2xl);
  margin: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 6px 0.5rem;
  padding-top: 6px;
  padding-bottom: 6px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 51, 153, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.dark .page-background {
  background: rgba(0, 0, 0, 0.12);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(77, 127, 191, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.05);
}

@media (min-width: 640px) {
  .page-background {
    margin: 4px;
    padding: 6px 1rem;
  }
}

@media (min-width: 1024px) {
  .page-background {
    margin: 4px;
    padding: 6px 1.5rem;
  }
}

/* Content Container - Centers all content with proper margins */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.5rem;
}

@media (min-width: 640px) {
  .content-container {
    padding: 0 1rem;
  }
}

@media (min-width: 1024px) {
  .content-container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1280px) {
  .content-container {
    padding: 0 2rem;
  }
}

/* Hero Section */
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: 4px 20px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
  vertical-align: top;
}

.hero-badge {
  text-align: center;
  vertical-align: middle;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.12) 0%, rgba(200, 16, 46, 0.12) 100%);
  border: 1px solid rgba(0, 51, 153, 0.25);
  padding: 4px 1.5rem;
  padding-bottom: 4px;
  margin: 4px 16px;
  backdrop-filter: none;
  box-shadow: none;
}

.dark .hero-badge {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.18) 0%, rgba(255, 77, 109, 0.18) 100%);
  border-color: rgba(77, 127, 191, 0.35);
}

.hero-title {
  font-family: 'Ethnocentric', 'Orbitron', sans-serif;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
  background-image: linear-gradient(135deg, rgba(19, 57, 134, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(143, 15, 38, 1) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-align: center;
  vertical-align: middle;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  filter: none;
}

.dark .hero-title {
  background-image: linear-gradient(135deg, rgba(19, 57, 134, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(143, 15, 38, 1) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  letter-spacing: 0.3em;
  text-align: center;
}

/* Quote Section */
.quote-section {
  text-align: center;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.06) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(200, 16, 46, 0.06) 100%);
  border-left: 4px solid #003399;
  border-right: 4px solid #c8102e;
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-card);
}

.quote-attribution {
  text-align: right;
}

.dark .quote-section {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.12) 0%, rgba(25, 25, 40, 0.85) 50%, rgba(255, 77, 109, 0.12) 100%);
  border-left: 4px solid #4d7fbf;
  border-right: 4px solid #ff4d6d;
}

/* Meet-up Section */
.meetup-card {
  background: var(--bg-section-light);
  border: 2px solid rgba(0, 51, 153, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-card);
}

.dark .meetup-card {
  background: var(--bg-section-dark);
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
  backdrop-filter: blur(4px);
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

/* Section Titles - index-specific underline decoration */
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
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg,
    transparent 0%,
    #003399 15%,
    #c8102e 85%,
    transparent 100%
  );
  border-radius: 2px;
  box-shadow:
    0 2px 8px rgba(0, 51, 153, 0.3),
    0 2px 8px rgba(200, 16, 46, 0.3);
}

.dark .section-title::after {
  background: linear-gradient(90deg,
    transparent 0%,
    #4d7fbf 15%,
    #ff4d6d 85%,
    transparent 100%
  );
  box-shadow:
    0 2px 8px rgba(77, 127, 191, 0.4),
    0 2px 8px rgba(255, 77, 109, 0.4);
}

/* Value Cards - enhanced with design tokens */
.value-card {
  background: var(--bg-card-light);
  border: var(--border-card-light);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(12px);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
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
  flex-direction: row;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.06) 0%, rgba(200, 16, 46, 0.06) 100%);
  border-radius: 12px;
  margin-bottom: 0.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    inset 0 -1px 2px rgba(0, 0, 0, 0.03);
}

.dark .card-header {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.12) 0%, rgba(255, 77, 109, 0.12) 100%);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.08),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15);
}

.card-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.2) 0%, rgba(200, 16, 46, 0.2) 100%);
  flex-shrink: 0;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  box-shadow: 
    0 3px 8px rgba(0, 51, 153, 0.12),
    inset 0 1px 2px rgba(255, 255, 255, 0.4),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.dark .card-icon-wrapper {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.25) 0%, rgba(255, 77, 109, 0.25) 100%);
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.15),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
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

/* CTA Section */
.cta-section {
  background: var(--bg-section-light);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  box-shadow: var(--shadow-medium);
  vertical-align: middle;
  text-align: left;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg, #003399 0%, #ffffff 50%, #c8102e 100%);
  z-index: -1;
  border-radius: 1rem;
  opacity: 0.8;
}

.dark .cta-section {
  background: var(--bg-section-dark);
}

.dark .cta-section::before {
  background: linear-gradient(135deg, #4d7fbf 0%, #333344 50%, #ff4d6d 100%);
}

.cta-section .donation-label {
  font-weight: 500;
  color: rgba(121, 121, 121, 1);
}

.cta-tag {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.2) 0%, rgba(200, 16, 46, 0.2) 100%);
  border: 1px solid rgba(0, 51, 153, 0.4);
  color: var(--text-light);
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  margin: 0.25rem;
  box-shadow: 
    0 3px 10px rgba(0, 51, 153, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    inset 0 -1px 2px rgba(0, 0, 0, 0.08);
}

.dark .cta-tag {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.3) 0%, rgba(255, 77, 109, 0.3) 100%);
  border: 1px solid rgba(77, 127, 191, 0.5);
  color: var(--text-dark);
  box-shadow: 
    0 3px 10px rgba(0, 0, 0, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.15),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15);
}

.cta-tag:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 
    0 8px 20px rgba(200, 16, 46, 0.35),
    0 4px 10px rgba(0, 51, 153, 0.2),
    inset 0 1px 3px rgba(255, 255, 255, 0.6),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.dark .cta-tag:hover {
  box-shadow: 
    0 8px 20px rgba(255, 77, 109, 0.35),
    0 4px 10px rgba(77, 127, 191, 0.25),
    inset 0 1px 3px rgba(255, 255, 255, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}

/* Crypto Donation Cards */
.crypto-donations {
  gap: 1rem;
}

.crypto-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
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
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
}


.crypto-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(121deg, rgba(255, 192, 20, 0.2) 18%, rgba(245, 254, 124, 0.5) 33%, rgba(254, 184, 32, 0.5) 65%, rgba(194, 152, 0, 0.5) 43%, rgba(255, 149, 0, 0.5) 0%, rgba(255, 200, 0, 0.5) 100%);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    inset 0 -1px 2px rgba(0, 0, 0, 0.05);
}

.dark .crypto-icon {
  background: linear-gradient(121deg, rgba(255, 192, 20, 0.2) 18%, rgba(245, 254, 124, 0.5) 33%, rgba(254, 184, 32, 0.5) 65%, rgba(194, 152, 0, 0.5) 43%, rgba(255, 149, 0, 0.5) 0%, rgba(255, 200, 0, 0.5) 100%);
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

/* Responsive adjustments */
@media (max-width: 640px) {
  .hero-section, .meetup-section, .mission-section, .values-section, .cta-section {
    padding: 1.25rem 1rem;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-subtitle {
    letter-spacing: 0.15em;
    font-size: 1rem;
  }
  
  .quote-section blockquote {
    font-size: 1.1rem;
  }
  
  .card-icon-wrapper {
    width: 40px;
    height: 40px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .hero-title {
    font-size: 2.25rem;
  }
}
</style>
