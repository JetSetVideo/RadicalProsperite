# 🚀 Radical Prosperité

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.8.2-00DC82.svg)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.3.8-4FC08D.svg)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://www.typescriptlang.org)

**Mouvement politique libertarien français pour une économie libérée et prospère.**

Radical Prosperité est une plateforme politique numérique moderne construite avec Nuxt 3, conçue pour promouvoir les idées libertariennes en France. Le projet met l'accent sur une expérience utilisateur exceptionnelle avec un design cyber-civique innovant et des animations mathématiques sophistiquées.

## 🌟 Fonctionnalités

### 🎨 Design System Unique
- **Thème cyber-civique** avec métaphore de carte mère électronique
- **Animations mathématiques** avec ondes cosinus/sinus sur 12 secondes
- **Système de couleurs tricolore français** (bleu, blanc, rouge)
- **Effets glass-morphism** et arrière-plans animés complexes
- **Typographie orbitrale** avec polices spécialisées

### 🏗️ Architecture Technique
- **Nuxt 3** avec Vue 3 et TypeScript
- **SSR/SSG** pour des performances optimales
- **Design system modulaire** avec variables CSS centralisées
- **Composants réutilisables** avec composition API
- **Base de données PostgreSQL** avec Prisma ORM

### 📱 Interface Utilisateur
- **Navigation immersive** avec barre fixe et sous-navigation
- **Cartes d'adhésion** avec effets de survol sophistiqués
- **Carte interactive** avec marqueurs d'événements
- **Calendrier responsive** avec événements organisés
- **Mode sombre natif** avec préférences persistantes

### 🔐 Sécurité & Authentification
- **OAuth Google** pour l'authentification
- **Sessions sécurisées** avec cookies HTTPOnly
- **Protection CSRF** et validation côté serveur
- **Chiffrement des données sensibles**

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 (recommandé)
- **PostgreSQL** >= 12.0 (pour la base de données)

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/radical-prosperite/radical-prosperite.git
   cd radical-prosperite
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**

   Créer un fichier `.env` à la racine :
   ```env
   # Base de données
   DATABASE_URL="postgresql://username:password@localhost:5432/radical_prosperite"

   # Authentification
   JWT_SECRET="your-super-secret-jwt-key-here"
   GOOGLE_OAUTH_CLIENT_ID="your-google-client-id"
   GOOGLE_OAUTH_CLIENT_SECRET="your-google-client-secret"

   # Application
   NUXT_PUBLIC_SITE_URL="http://localhost:3003"
   NUXT_PUBLIC_API_BASE="/api"
   ```

4. **Préparer la base de données**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

   L'application sera disponible sur [http://localhost:3003](http://localhost:3003)

## 📜 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run dev:host         # Serveur accessible depuis le réseau

# Build & Production
npm run build            # Build de production
npm run generate         # Génération statique
npm run preview          # Prévisualisation du build

# Qualité du code
npm run lint             # Vérification ESLint
npm run lint:fix         # Correction automatique ESLint
npm run typecheck        # Vérification TypeScript

# Tests
npm run test             # Tests unitaires
npm run test:ui          # Interface de tests

# Maintenance
npm run clean            # Nettoyage des caches
npm run analyze          # Analyse du bundle
```

## 🏛️ Architecture du Projet

```
RadicalProsperite/
├── assets/
│   ├── css/
│   │   ├── variables.css   # Tokens design (couleurs, espacements, radius, ombres)
│   │   └── main.css        # Base : typo, .page-content, .section-spacing, reduced motion
│   └── fonts/              # Polices locales (ex. Ethnocentric)
├── components/
│   ├── Navbar.vue          # Navigation fixe (brand, sous-nav, adhésion, paramètres)
│   ├── Footer.vue          # Pied de page fixe (brand, réseaux, copyright)
│   ├── Settings.vue        # Menu paramètres (thème clair/sombre)
│   ├── Carte.vue           # Carte interactive
│   └── Calendrier.vue      # Calendrier événements
├── pages/
│   ├── index.vue           # Accueil (hero, citation, meet-up, mission, valeurs, CTA)
│   ├── adhesion.vue        # Adhésion / Connexion
│   ├── informations.vue    # Centre d'information
│   ├── communaute.vue      # Communauté
│   ├── forum.vue           # Forum
│   ├── magasin.vue         # Magasin
│   └── aides.vue           # Aides
├── plugins/                # ex. fontawesome.client.js, click-outside
├── app.vue                 # Shell : #background, #bands, fonts
├── nuxt.config.ts          # css: ['~/assets/css/main.css'], modules, ui
├── Design.md               # Design system complet (voir section 0 pour structure)
└── Dev.md                  # Guide développement
```

## 🎨 Design System

Documentation complète dans **[`Design.md`](./Design.md)** (structure projet, tokens, composants, pages, motion, accessibilité). Résumé :

- **Structure** : `assets/css/` (variables + main), composants layout/UI, pages avec marges par tier (mobile / tablette / web)
- **Responsive** : 3 tiers (Design §0.5) ; marges gauche/droite `--margin-page-mobile`, `--margin-page-tablet`, `--margin-page-web` ; **pas de padding-top** sur `.page-content`
- **Navbar** : Bloc titre + bloc actions côte à côte, fonds et ombres intérieures/extérieures (clair/sombre)
- **Hiérarchie** : Tailles, couleurs et tabulations (Design §0.6) pour titres, corps, légendes
- **Couleurs** : Tokens dans `variables.css` (surfaces, texte, accents, tricolore FR)
- **Arrière-plan** : Animations fluides type smoke, entrelacées, inspiration Mandelbrot (Design §0.8)
- **Animations** : Lentes ; `prefers-reduced-motion` respecté

## 🔧 Technologies Utilisées

### Frontend
- **Nuxt 3** - Framework Vue.js full-stack
- **Vue 3** - Framework JavaScript progressif
- **TypeScript** - JavaScript typé
- **Tailwind CSS** - Framework CSS utilitaire
- **FontAwesome** - Bibliothèque d'icônes

### Backend
- **Nitro** - Moteur serveur de Nuxt
- **PostgreSQL** - Base de données relationnelle
- **Prisma** - ORM de base de données

### Outils de Développement
- **ESLint** - Linting JavaScript/TypeScript
- **Prettier** - Formatage du code
- **Vitest** - Framework de tests
- **Vue DevTools** - Outils de développement Vue

## 🌍 Déploiement

### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/radical-prosperite/radical-prosperite)

### Autres Plateformes

Le projet peut être déployé sur n'importe quelle plateforme supportant Node.js :

```bash
# Build pour la production
npm run build

# Prévisualisation locale
npm run preview
```

## 🤝 Contribution

Nous accueillons les contributions ! Voir [`CONTRIBUTING.md`](./CONTRIBUTING.md) pour les guidelines détaillées.

### Processus de Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commiter** vos changements (`git commit -m 'Add amazing feature'`)
4. **Pousser** vers la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

## 📋 Roadmap

- [ ] Système de forum communautaire
- [ ] Intégration paiements pour dons
- [ ] Application mobile React Native
- [ ] API publique pour intégrations tierces
- [ ] Multilinguisme (anglais, espagnol)
- [ ] Analytics et métriques d'engagement

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/radical-prosperite/radical-prosperite/issues)
- **Discussions** : [GitHub Discussions](https://github.com/radical-prosperite/radical-prosperite/discussions)
- **Email** : contact@radical-prosperite.fr

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [`LICENSE`](./LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Nuxt Team** pour le framework exceptionnel
- **Vue.js Community** pour l'écosystème riche
- **Contributeurs** pour leur temps et expertise
- **Mouvement Libertarien Français** pour l'inspiration

---

**Fait avec ❤️ pour une France plus libre et prospère** 🇫🇷
