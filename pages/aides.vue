<script setup>
import { ref } from 'vue'

// FAQ items
const faqs = ref([
  {
    id: 1,
    question: 'Comment adhérer au parti ?',
    answer: 'Pour adhérer, rendez-vous sur la page Adhésion et remplissez le formulaire d\'inscription. L\'adhésion annuelle est de 30€ et vous donne accès à tous les avantages membres.',
    isOpen: false
  },
  {
    id: 2,
    question: 'Quels sont les avantages de l\'adhésion ?',
    answer: 'En tant que membre, vous bénéficiez : du droit de vote aux décisions internes, de l\'accès au forum privé, d\'invitations aux événements exclusifs, de réductions sur la boutique, et de la newsletter mensuelle.',
    isOpen: false
  },
  {
    id: 3,
    question: 'Comment participer aux événements locaux ?',
    answer: 'Consultez la page Informations pour voir le calendrier des événements. Vous pouvez également rejoindre votre groupe régional via la page Communauté pour être informé des activités locales.',
    isOpen: false
  },
  {
    id: 4,
    question: 'Comment faire un don au parti ?',
    answer: 'Vous pouvez faire un don sur notre page d\'accueil via les cryptomonnaies (Bitcoin, Ethereum, Solana) ou par virement bancaire. Contactez-nous pour plus d\'informations.',
    isOpen: false
  },
  {
    id: 5,
    question: 'Comment devenir bénévole ?',
    answer: 'Pour devenir bénévole, contactez-nous via le formulaire de contact ou rejoignez votre groupe régional. Nous avons besoin de volontaires pour l\'organisation d\'événements, la communication, et plus encore.',
    isOpen: false
  },
  {
    id: 6,
    question: 'Comment contacter le parti ?',
    answer: 'Vous pouvez nous contacter par email à contact@radical-prosperite.fr, par téléphone au 01 00 00 00 00, ou via nos réseaux sociaux. Nous répondons généralement sous 48h.',
    isOpen: false
  }
])

const toggleFaq = (id) => {
  const faq = faqs.value.find(f => f.id === id)
  if (faq) {
    faq.isOpen = !faq.isOpen
  }
}

// Resource documents
const resources = ref([
  {
    id: 1,
    title: 'Statuts du Parti',
    description: 'Document officiel des statuts de Radical Prospérité.',
    icon: 'fa-solid fa-file-contract',
    type: 'PDF'
  },
  {
    id: 2,
    title: 'Programme Politique',
    description: 'Notre programme complet et nos propositions.',
    icon: 'fa-solid fa-scroll',
    type: 'PDF'
  },
  {
    id: 3,
    title: 'Guide du Membre',
    description: 'Tout ce que vous devez savoir en tant que membre.',
    icon: 'fa-solid fa-book-open',
    type: 'PDF'
  },
  {
    id: 4,
    title: 'Charte des Valeurs',
    description: 'Nos principes fondamentaux et notre éthique.',
    icon: 'fa-solid fa-heart',
    type: 'PDF'
  }
])

// Support categories
const supportCategories = ref([
  {
    icon: 'fa-solid fa-user-plus',
    title: 'Adhésion',
    description: 'Questions sur l\'inscription et les cotisations'
  },
  {
    icon: 'fa-solid fa-calendar-alt',
    title: 'Événements',
    description: 'Informations sur nos rencontres et activités'
  },
  {
    icon: 'fa-solid fa-store',
    title: 'Boutique',
    description: 'Commandes, livraisons et retours'
  },
  {
    icon: 'fa-solid fa-laptop',
    title: 'Technique',
    description: 'Problèmes de connexion ou d\'accès'
  }
])
</script>

<template>
  <main class="main-content min-h-screen pb-24">
    <div class="content-container">
      <!-- Page Header -->
      <section class="page-header mb-12 text-center">
        <div class="header-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
          <FontAwesomeIcon icon="fa-solid fa-hands-helping" class="mr-2" />
          Centre d'Aide
        </div>
        <h1 class="page-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Aides & Support
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Trouvez toutes les réponses à vos questions et les ressources dont vous avez besoin
        </p>
      </section>

      <!-- Quick Links -->
      <section class="quick-links-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-bolt" class="mr-3" />
          Accès Rapide
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="category in supportCategories" :key="category.title" class="quick-link-card rp-card p-5 rounded-xl text-center cursor-pointer">
            <div class="quick-link-icon icon-gradient mb-3">
              <FontAwesomeIcon :icon="category.icon" class="text-3xl" />
            </div>
            <h3 class="font-bold mb-1">{{ category.title }}</h3>
            <p class="text-xs opacity-70">{{ category.description }}</p>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-question-circle" class="mr-3" />
          Questions Fréquentes
        </h2>
        <div class="space-y-3">
          <div v-for="faq in faqs" :key="faq.id" class="faq-item rp-card rounded-xl overflow-hidden">
            <button 
              @click="toggleFaq(faq.id)"
              class="faq-question w-full p-5 flex items-center justify-between text-left"
            >
              <span class="font-semibold pr-4">{{ faq.question }}</span>
              <FontAwesomeIcon 
                :icon="faq.isOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" 
                class="flex-shrink-0 transition-transform duration-300"
              />
            </button>
            <Transition name="accordion">
              <div v-if="faq.isOpen" class="faq-answer px-5 pb-5">
                <p class="text-sm opacity-80">{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- Resources Section -->
      <section class="resources-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-folder-open" class="mr-3" />
          Documents & Ressources
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="resource in resources" :key="resource.id" class="resource-card rp-card p-5 rounded-xl">
            <div class="resource-icon icon-gradient mb-3">
              <FontAwesomeIcon :icon="resource.icon" class="text-3xl" />
            </div>
            <h3 class="font-bold mb-1">{{ resource.title }}</h3>
            <p class="text-sm opacity-70 mb-3">{{ resource.description }}</p>
            <button class="download-btn rp-btn-primary w-full py-2 rounded-lg text-sm font-medium">
              <FontAwesomeIcon icon="fa-solid fa-download" class="mr-2" />
              Télécharger {{ resource.type }}
            </button>
          </div>
        </div>
      </section>

      <!-- Tutorials Section -->
      <section class="tutorials-section mb-12">
        <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-graduation-cap" class="mr-3" />
          Guides & Tutoriels
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="tutorial-card rp-card p-6 rounded-xl">
            <div class="tutorial-number icon-gradient mb-3">01</div>
            <h3 class="font-bold text-lg mb-2">Premiers pas</h3>
            <p class="text-sm opacity-70 mb-4">
              Guide complet pour bien démarrer en tant que nouveau membre.
            </p>
            <ul class="text-sm space-y-2 opacity-80">
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Créer son compte</span>
              </li>
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Compléter son profil</span>
              </li>
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Rejoindre un groupe</span>
              </li>
            </ul>
          </div>
          
          <div class="tutorial-card rp-card p-6 rounded-xl">
            <div class="tutorial-number icon-gradient mb-3">02</div>
            <h3 class="font-bold text-lg mb-2">Participer</h3>
            <p class="text-sm opacity-70 mb-4">
              Comment s'impliquer activement dans la vie du parti.
            </p>
            <ul class="text-sm space-y-2 opacity-80">
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Voter aux consultations</span>
              </li>
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Proposer des idées</span>
              </li>
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Organiser des événements</span>
              </li>
            </ul>
          </div>
          
          <div class="tutorial-card rp-card p-6 rounded-xl">
            <div class="tutorial-number icon-gradient mb-3">03</div>
            <h3 class="font-bold text-lg mb-2">Communiquer</h3>
            <p class="text-sm opacity-70 mb-4">
              Les outils et canaux de communication du parti.
            </p>
            <ul class="text-sm space-y-2 opacity-80">
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Utiliser le forum</span>
              </li>
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Contacter les responsables</span>
              </li>
              <li class="flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500" />
                <span>Partager sur les réseaux</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section rp-section p-8 rounded-2xl">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">
            <FontAwesomeIcon icon="fa-solid fa-headset" class="mr-3" />
            Besoin d'aide supplémentaire ?
          </h2>
          <p class="text-lg opacity-80">
            Notre équipe de support est là pour vous aider
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="contact-method rp-card p-5 rounded-xl text-center">
            <FontAwesomeIcon icon="fa-solid fa-envelope" class="text-3xl mb-3" />
            <h3 class="font-bold mb-2">Email</h3>
            <p class="text-sm opacity-70 mb-3">Réponse sous 24h</p>
            <a href="mailto:support@radical-prosperite.fr" class="contact-link">
              support@radical-prosperite.fr
            </a>
          </div>
          
          <div class="contact-method rp-card p-5 rounded-xl text-center">
            <FontAwesomeIcon icon="fa-solid fa-phone" class="text-3xl mb-3" />
            <h3 class="font-bold mb-2">Téléphone</h3>
            <p class="text-sm opacity-70 mb-3">Lun-Ven 9h-18h</p>
            <a href="tel:+33100000000" class="contact-link">
              01 00 00 00 00
            </a>
          </div>
          
          <div class="contact-method rp-card p-5 rounded-xl text-center">
            <FontAwesomeIcon icon="fa-brands fa-discord" class="text-3xl mb-3" />
            <h3 class="font-bold mb-2">Discord</h3>
            <p class="text-sm opacity-70 mb-3">Support en direct</p>
            <a href="#" class="contact-link">
              Rejoindre le serveur
            </a>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* FAQ accordion transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
}

/* FAQ question hover highlight */
.faq-question {
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: rgba(0, 51, 153, 0.05);
}

.dark .faq-question:hover {
  background: rgba(77, 127, 191, 0.1);
}

/* FAQ answer divider */
.faq-answer {
  border-top: 1px solid rgba(0, 51, 153, 0.1);
}

.dark .faq-answer {
  border-top-color: rgba(77, 127, 191, 0.1);
}

/* FAQ card: disable hover lift (accordion items shouldn't float) */
.faq-item:hover {
  transform: none;
}

/* Tutorial number: Orbitron sizing + muted opacity */
.tutorial-number {
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  opacity: 0.3;
}

/* Contact method icons: gradient text */
.contact-method svg {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .contact-method svg {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Contact link colors */
.contact-link {
  color: #003399;
  font-weight: 500;
  text-decoration: underline;
}

.dark .contact-link {
  color: #4d7fbf;
}

.contact-link:hover {
  color: #c8102e;
}

.dark .contact-link:hover {
  color: #ff4d6d;
}
</style>
