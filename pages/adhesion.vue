<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const { connected, user, login, register, logout, startGoogleAuth } = useAuthState()

// Form state
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  birthDate: '',
  address: '',
  city: '',
  postalCode: '',
  region: '',
  newsletter: true,
  acceptTerms: false
})

// Login form
const loginData = ref({
  email: '',
  password: ''
})

// Toggle between register and login
const isRegistering = ref(true)

// UI state
const errorMessage = ref('')
const successMessage = ref('')
const submitting = ref(false)

// Check for OAuth redirect messages
onMounted(() => {
  const route = useRoute()
  if (route.query.connected === 'true') {
    successMessage.value = 'Connexion réussie !'
  } else if (route.query.error) {
    const errors: Record<string, string> = {
      google_denied: 'Connexion Google annulée',
      google_invalid: 'Erreur de connexion Google',
      google_csrf: 'Erreur de sécurité. Veuillez réessayer.',
      google_no_email: 'Impossible de récupérer votre email Google',
      google_failed: 'Erreur lors de la connexion Google',
      account_banned: 'Ce compte a été suspendu'
    }
    errorMessage.value = errors[route.query.error as string] || 'Une erreur est survenue'
  }
})

// Form validation
const isFormValid = computed(() => {
  if (isRegistering.value) {
    return formData.value.firstName &&
           formData.value.lastName &&
           formData.value.email &&
           formData.value.password &&
           formData.value.password.length >= 8 &&
           formData.value.acceptTerms
  }
  return loginData.value.email && loginData.value.password
})

// Membership types
const membershipTypes = ref([
  {
    id: 'standard',
    name: 'Adhésion Standard',
    price: 30,
    period: 'an',
    features: [
      'Accès au forum privé',
      'Newsletter mensuelle',
      'Droit de vote aux consultations',
      'Carte de membre'
    ],
    recommended: false
  },
  {
    id: 'premium',
    name: 'Adhésion Premium',
    price: 60,
    period: 'an',
    features: [
      'Tous les avantages Standard',
      'Accès aux événements exclusifs',
      'Réductions sur la boutique (-15%)',
      'Ligne directe avec les responsables',
      'Badge membre premium'
    ],
    recommended: true
  },
  {
    id: 'militant',
    name: 'Adhésion Militant',
    price: 100,
    period: 'an',
    features: [
      'Tous les avantages Premium',
      'Formation politique avancée',
      'Participation aux réunions stratégiques',
      'Kit de communication complet',
      'Mentorat personnalisé'
    ],
    recommended: false
  }
])

const selectedMembership = ref('premium')

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  submitting.value = true

  try {
    if (isRegistering.value) {
      await register({
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        email: formData.value.email,
        password: formData.value.password,
        phone: formData.value.phone,
        birthDate: formData.value.birthDate,
        address: formData.value.address,
        city: formData.value.city,
        postalCode: formData.value.postalCode,
        region: formData.value.region,
        newsletter: formData.value.newsletter,
        membership: selectedMembership.value
      })
      successMessage.value = 'Inscription réussie ! Bienvenue chez Radical Prospérité.'
    } else {
      await login(loginData.value.email, loginData.value.password)
      successMessage.value = 'Connexion réussie !'
    }
  } catch (err: any) {
    errorMessage.value = err?.data?.message || err?.message || 'Une erreur est survenue'
  } finally {
    submitting.value = false
  }
}

const handleLogout = async () => {
  await logout()
  successMessage.value = ''
}

// French regions
const regions = [
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Hauts-de-France',
  'Provence-Alpes-Côte d\'Azur',
  'Grand Est',
  'Pays de la Loire',
  'Normandie',
  'Bretagne',
  'Bourgogne-Franche-Comté',
  'Centre-Val de Loire',
  'Corse'
]
</script>

<template>
  <main class="main-content min-h-screen pb-24">
    <div class="content-container">
      <!-- Connected: Member Dashboard -->
      <div v-if="connected">
        <section class="page-header mb-12 text-center">
          <div class="header-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
            <FontAwesomeIcon icon="fa-solid fa-circle-check" class="mr-2" />
            Espace Membre
          </div>
          <h1 class="page-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Bienvenue, {{ user?.firstName }} !
          </h1>
          <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
            Vous êtes connecté en tant que membre {{ user?.plan }}
          </p>
        </section>

        <section class="form-container p-6 md:p-8 rounded-2xl max-w-md mx-auto text-center mb-12">
          <div class="mb-4">
            <p class="text-sm opacity-70 mb-1">Email</p>
            <p class="font-semibold">{{ user?.email }}</p>
          </div>
          <div class="mb-6">
            <p class="text-sm opacity-70 mb-1">Abonnement</p>
            <p class="font-semibold capitalize">{{ user?.plan }}</p>
          </div>
          <button @click="handleLogout" class="submit-btn w-full py-3 rounded-lg font-bold">
            <FontAwesomeIcon icon="fa-solid fa-sign-out-alt" class="mr-2" />
            Se déconnecter
          </button>
        </section>
      </div>

      <!-- Not connected -->
      <div v-else>

      <!-- Page Header -->
      <section class="page-header mb-12 text-center">
        <div class="header-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
          <FontAwesomeIcon icon="fa-solid fa-user-plus" class="mr-2" />
          {{ isRegistering ? 'Rejoignez-nous' : 'Espace Membre' }}
        </div>
        <h1 class="page-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          {{ isRegistering ? 'Adhésion' : 'Connexion' }}
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          {{ isRegistering ? 'Devenez membre de Radical Prospérité et participez à la transformation de la France' : 'Connectez-vous à votre espace membre' }}
        </p>
      </section>

      <!-- Error / Success Messages -->
      <div v-if="errorMessage" class="error-banner max-w-3xl mx-auto mb-6 p-4 rounded-xl flex items-center gap-3">
        <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
        <span class="text-sm">{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="ml-auto opacity-60 hover:opacity-100">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>
      <div v-if="successMessage" class="success-banner max-w-3xl mx-auto mb-6 p-4 rounded-xl flex items-center gap-3">
        <FontAwesomeIcon icon="fa-solid fa-circle-check" />
        <span class="text-sm">{{ successMessage }}</span>
        <button @click="successMessage = ''" class="ml-auto opacity-60 hover:opacity-100">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>

      <!-- Toggle Register/Login -->
      <section class="toggle-section mb-8 flex justify-center">
        <div class="toggle-wrapper p-1 rounded-full">
          <button
            @click="isRegistering = true; errorMessage = ''"
            class="toggle-btn px-6 py-2 rounded-full font-semibold"
            :class="{ 'active': isRegistering }"
          >
            S'inscrire
          </button>
          <button
            @click="isRegistering = false; errorMessage = ''"
            class="toggle-btn px-6 py-2 rounded-full font-semibold"
            :class="{ 'active': !isRegistering }"
          >
            Se connecter
          </button>
        </div>
      </section>

      <!-- Registration Section -->
      <div v-if="isRegistering">
        <!-- Membership Options -->
        <section class="membership-section mb-12">
          <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
            <FontAwesomeIcon icon="fa-solid fa-award" class="mr-3" />
            Choisissez votre Adhésion
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="membership in membershipTypes" 
              :key="membership.id"
              class="membership-card p-6 rounded-xl cursor-pointer"
              :class="{ 'selected': selectedMembership === membership.id, 'recommended': membership.recommended }"
              @click="selectedMembership = membership.id"
            >
              <div v-if="membership.recommended" class="recommended-badge text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                Recommandé
              </div>
              <h3 class="font-bold text-xl mb-2">{{ membership.name }}</h3>
              <div class="price mb-4">
                <span class="text-3xl font-bold">{{ membership.price }}€</span>
                <span class="text-sm opacity-70">/{{ membership.period }}</span>
              </div>
              <ul class="space-y-2 mb-4">
                <li v-for="feature in membership.features" :key="feature" class="flex items-start gap-2 text-sm">
                  <FontAwesomeIcon icon="fa-solid fa-check" class="text-green-500 mt-0.5" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <div class="selection-indicator">
                <FontAwesomeIcon :icon="selectedMembership === membership.id ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'" class="text-xl" />
              </div>
            </div>
          </div>
        </section>

        <!-- Registration Form -->
        <section class="form-section mb-12">
          <h2 class="section-title text-2xl md:text-3xl font-bold mb-6 text-center">
            <FontAwesomeIcon icon="fa-solid fa-file-signature" class="mr-3" />
            Vos Informations
          </h2>
          <form @submit.prevent="handleSubmit" class="form-container p-6 md:p-8 rounded-2xl max-w-3xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Prénom *</label>
                <input 
                  v-model="formData.firstName"
                  type="text" 
                  class="form-input w-full px-4 py-3 rounded-lg"
                  placeholder="Votre prénom"
                  required
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Nom *</label>
                <input 
                  v-model="formData.lastName"
                  type="text" 
                  class="form-input w-full px-4 py-3 rounded-lg"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Email *</label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  class="form-input w-full px-4 py-3 rounded-lg"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Téléphone</label>
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  class="form-input w-full px-4 py-3 rounded-lg"
                  placeholder="06 00 00 00 00"
                />
              </div>
            </div>

            <div class="form-group mb-6">
              <label class="block text-sm font-medium mb-2">Mot de passe *</label>
              <input
                v-model="formData.password"
                type="password"
                class="form-input w-full px-4 py-3 rounded-lg"
                placeholder="Minimum 8 caractères"
                minlength="8"
                required
              />
              <p v-if="formData.password && formData.password.length < 8" class="text-xs mt-1" style="color: var(--error)">
                Le mot de passe doit contenir au moins 8 caractères
              </p>
            </div>

            <div class="form-group mb-6">
              <label class="block text-sm font-medium mb-2">Date de naissance</label>
              <input 
                v-model="formData.birthDate"
                type="date" 
                class="form-input w-full px-4 py-3 rounded-lg"
              />
            </div>

            <div class="form-group mb-6">
              <label class="block text-sm font-medium mb-2">Adresse</label>
              <input 
                v-model="formData.address"
                type="text" 
                class="form-input w-full px-4 py-3 rounded-lg"
                placeholder="Numéro et rue"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Code Postal</label>
                <input 
                  v-model="formData.postalCode"
                  type="text" 
                  class="form-input w-full px-4 py-3 rounded-lg"
                  placeholder="75000"
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Ville</label>
                <input 
                  v-model="formData.city"
                  type="text" 
                  class="form-input w-full px-4 py-3 rounded-lg"
                  placeholder="Paris"
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Région</label>
                <select v-model="formData.region" class="form-input w-full px-4 py-3 rounded-lg">
                  <option value="">Sélectionnez</option>
                  <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                </select>
              </div>
            </div>

            <div class="checkboxes space-y-3 mb-6">
              <label class="flex items-start gap-3 cursor-pointer">
                <input 
                  v-model="formData.newsletter"
                  type="checkbox" 
                  class="form-checkbox mt-1"
                />
                <span class="text-sm">Je souhaite recevoir la newsletter et les informations du parti</span>
              </label>
              <label class="flex items-start gap-3 cursor-pointer">
                <input 
                  v-model="formData.acceptTerms"
                  type="checkbox" 
                  class="form-checkbox mt-1"
                  required
                />
                <span class="text-sm">J'accepte les conditions générales et la politique de confidentialité *</span>
              </label>
            </div>

            <button
              type="submit"
              class="submit-btn w-full py-4 rounded-lg font-bold text-lg"
              :disabled="!isFormValid || submitting"
            >
              <FontAwesomeIcon :icon="submitting ? 'fa-solid fa-spinner' : 'fa-solid fa-arrow-right'" class="mr-2" :class="{ 'animate-spin': submitting }" />
              {{ submitting ? 'Inscription en cours...' : `S'inscrire (${membershipTypes.find(m => m.id === selectedMembership)?.price}€/an)` }}
            </button>
          </form>
        </section>
      </div>

      <!-- Login Section -->
      <div v-else>
        <section class="login-section">
          <form @submit.prevent="handleSubmit" class="form-container p-6 md:p-8 rounded-2xl max-w-md mx-auto">
            <div class="form-group mb-6">
              <label class="block text-sm font-medium mb-2">Email</label>
              <input 
                v-model="loginData.email"
                type="email" 
                class="form-input w-full px-4 py-3 rounded-lg"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div class="form-group mb-6">
              <label class="block text-sm font-medium mb-2">Mot de passe</label>
              <input 
                v-model="loginData.password"
                type="password" 
                class="form-input w-full px-4 py-3 rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>

            <div class="flex items-center justify-between mb-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="form-checkbox" />
                <span class="text-sm">Se souvenir de moi</span>
              </label>
              <a href="#" class="text-sm forgot-link">Mot de passe oublié ?</a>
            </div>

            <button
              type="submit"
              class="submit-btn w-full py-4 rounded-lg font-bold text-lg"
              :disabled="!isFormValid || submitting"
            >
              <FontAwesomeIcon :icon="submitting ? 'fa-solid fa-spinner' : 'fa-solid fa-sign-in-alt'" class="mr-2" :class="{ 'animate-spin': submitting }" />
              {{ submitting ? 'Connexion...' : 'Se connecter' }}
            </button>

            <div class="divider my-6">
              <span class="divider-text text-sm opacity-50">ou</span>
            </div>

            <div class="social-login space-y-3">
              <button type="button" @click="startGoogleAuth" class="social-btn w-full py-3 rounded-lg font-medium">
                <FontAwesomeIcon icon="fa-brands fa-google" class="mr-2" />
                Continuer avec Google
              </button>
            </div>
          </form>
        </section>
      </div>

      </div> <!-- /v-else (not connected) -->

      <!-- Benefits Section -->
      <section class="benefits-section mt-12 p-8 rounded-2xl">
        <h2 class="text-2xl font-bold mb-6 text-center">
          <FontAwesomeIcon icon="fa-solid fa-gift" class="mr-3" />
          Pourquoi Devenir Membre ?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="benefit-item text-center">
            <div class="benefit-icon mb-3">
              <FontAwesomeIcon icon="fa-solid fa-vote-yea" class="text-3xl" />
            </div>
            <h3 class="font-bold mb-2">Participez aux Décisions</h3>
            <p class="text-sm opacity-70">Votez et influencez les orientations du parti</p>
          </div>
          <div class="benefit-item text-center">
            <div class="benefit-icon mb-3">
              <FontAwesomeIcon icon="fa-solid fa-users" class="text-3xl" />
            </div>
            <h3 class="font-bold mb-2">Rejoignez un Réseau</h3>
            <p class="text-sm opacity-70">Connectez-vous avec des citoyens engagés</p>
          </div>
          <div class="benefit-item text-center">
            <div class="benefit-icon mb-3">
              <FontAwesomeIcon icon="fa-solid fa-bullhorn" class="text-3xl" />
            </div>
            <h3 class="font-bold mb-2">Faites Entendre Votre Voix</h3>
            <p class="text-sm opacity-70">Proposez vos idées et projets</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* Error & Success banners */
.error-banner {
  background: var(--error-bg, rgba(127, 29, 29, 0.25));
  border: 1px solid var(--error-border, rgba(251, 113, 133, 0.35));
  color: var(--error, #fb7185);
}

.success-banner {
  background: var(--success-bg, rgba(6, 58, 39, 0.35));
  border: 1px solid var(--success-border, rgba(74, 222, 128, 0.35));
  color: var(--success, #10b981);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .content-container {
    padding: 0 2rem;
  }
}

/* Toggle */
.toggle-wrapper {
  background: rgba(0, 51, 153, 0.08);
  border: 1px solid rgba(0, 51, 153, 0.18);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-card);
}

.dark .toggle-wrapper {
  background: rgba(77, 127, 191, 0.08);
  border-color: rgba(77, 127, 191, 0.18);
}

.toggle-btn {
  transition: all var(--transition-normal);
}

.toggle-btn.active {
  background: var(--gradient-tricolor-light);
  color: white;
  box-shadow: var(--shadow-btn-outer-bottom), var(--shadow-btn-inner-top);
}

.dark .toggle-btn.active {
  background: var(--gradient-tricolor-dark);
}

/* Membership Cards */
.membership-card {
  background: var(--bg-card-light);
  border: 2px solid rgba(0, 51, 153, 0.12);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-card);
}

.dark .membership-card {
  background: var(--bg-card-dark);
  border-color: rgba(77, 127, 191, 0.18);
}

.membership-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card-hover);
}


.membership-card.selected {
  border-color: #003399;
  box-shadow: 0 0 20px rgba(0, 51, 153, 0.3);
}

.dark .membership-card.selected {
  border-color: #4d7fbf;
  box-shadow: 0 0 20px rgba(77, 127, 191, 0.3);
}

.membership-card.recommended {
  border-color: #c8102e;
}

.dark .membership-card.recommended {
  border-color: #ff4d6d;
}

.recommended-badge {
  background: linear-gradient(135deg, #c8102e 0%, #ff4d6d 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(200, 16, 46, 0.3);
}

.price {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .price {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.selection-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #003399;
}

.dark .selection-indicator {
  color: #4d7fbf;
}

/* Form */
.form-container {
  background: var(--bg-card-light);
  border: var(--border-card-light);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-card);
}

.dark .form-container {
  background: var(--bg-card-dark);
  border: var(--border-card-dark);
}

.form-input {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 51, 153, 0.15);
  transition: all var(--transition-normal);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
}

.dark .form-input {
  background: rgba(25, 25, 40, 0.8);
  border-color: rgba(77, 127, 191, 0.18);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
}

.form-input:focus {
  outline: none;
  border-color: #003399;
  box-shadow: 0 0 0 3px rgba(0, 51, 153, 0.12), inset 0 1px 2px rgba(0, 0, 0, 0.04);
}

.dark .form-input:focus {
  border-color: #4d7fbf;
  box-shadow: 0 0 0 3px rgba(77, 127, 191, 0.12), inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.form-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #003399;
}

.dark .form-checkbox {
  accent-color: #4d7fbf;
}

.submit-btn {
  background: var(--gradient-tricolor-light);
  color: white;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  box-shadow: var(--shadow-btn-outer-bottom), var(--shadow-btn-inner-top);
}

.dark .submit-btn {
  background: var(--gradient-tricolor-dark);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-btn-outer-bottom), 0 10px 30px rgba(0, 51, 153, 0.3), var(--shadow-btn-inner-top);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.forgot-link {
  color: #003399;
}

.dark .forgot-link {
  color: #4d7fbf;
}

.forgot-link:hover {
  text-decoration: underline;
}

.divider {
  display: flex;
  align-items: center;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(0, 51, 153, 0.2);
}

.dark .divider::before,
.dark .divider::after {
  background: rgba(77, 127, 191, 0.2);
}

.divider-text {
  padding: 0 1rem;
}

.social-btn {
  background: var(--bg-glass-light);
  border: var(--border-card-light);
  transition: all var(--transition-normal);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-card);
}

.dark .social-btn {
  background: var(--bg-glass-dark);
  border: var(--border-card-dark);
}

.social-btn:hover {
  background: rgba(0, 51, 153, 0.08);
  transform: translateY(-1px);
  box-shadow: var(--shadow-card-hover);
}

.dark .social-btn:hover {
  background: rgba(77, 127, 191, 0.08);
}

/* Benefits */
.benefits-section {
  background: var(--bg-section-light);
  border: var(--border-card-light);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-section);
}

.dark .benefits-section {
  background: var(--bg-section-dark);
  border: var(--border-card-dark);
}

.benefit-icon {
  background: var(--gradient-tricolor-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .benefit-icon {
  background: var(--gradient-tricolor-dark);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
