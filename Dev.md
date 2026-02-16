# Radical Prosperité — Development

Site du mouvement politique **Radical Prosperité**. Idées, rencontres, réseaux sociaux et politiques.

## Features

- **Home** (`/`) — Titre, citation, messages clés, meet-up, mission, valeurs, CTA et dons crypto.
- **Pages** : Adhésion, Informations, Communauté, Forum, Magasin, Aides.
- **Authentification** : Inscription/connexion par email + mot de passe, Google OAuth 2.0.
- **Cookie Banner** : Bandeau RGPD conforme aux lois européennes.
- Design responsive, thème sombre par défaut.
- Navbar fixe qui disparaît au scroll et réapparaît en haut (affiche avatar connecté ou bouton adhésion).
- Footer fixe visible en haut et en bas de page.
- Arrière-plan animé (bandes tricolores, effets discrets).

## Design & architecture

- **Design system** : [`Design.md`](./Design.md) — couleurs, typo, espacements, composants, motion, accessibilité.
- **Plan global** (Design §0.5–0.8) :
  - **Responsive** : 3 tiers (mobile &lt;768px, tablet 768–1023px, web ≥1024px) ; marges gauche/droite par tier (`--margin-page-mobile`, `--margin-page-tablet`, `--margin-page-web`).
  - **Page content** : pas de padding-top (`--page-content-top-padding: 0`).
  - **Hiérarchie** : tailles, couleurs et tabulations définies (titres, corps, légendes) pour une lecture claire.
  - **Navbar** : bloc parent titre (`.navbar__title`) et bloc actions (`.navbar__actions`) côte à côte, avec marges, fonds et ombres intérieures/extérieures (thèmes clair et sombre).
  - **Arrière-plan** : animations fluides type « smoke », entrelacées, avec effet type lerp et inspiration Mandelbrot (voir Design §0.8).
- **Styles** : `assets/css/variables.css` (tokens), `assets/css/main.css` (base, `.page-content`, typo, reduced motion), `app.vue` (fonts, `#background`).
- **Boutons** : ombre intérieure claire + ombre extérieure foncée. **Cartes** : `padding-left: 1.25rem`.

## Technologies

- **Nuxt 3** (3.8.x) — Vue 3, Vite, TypeScript
- **@nuxt/ui** — Tailwind, color mode (dark par défaut)
- **@nuxt/fonts** — Gestion des polices
- **@vueuse/nuxt** — Utilitaires (e.g. `useScroll`)
- **Font Awesome** — Icônes (plugin client)
- **PostgreSQL 16** — Base de données (via `pg`)
- **node-postgres** (`pg`) — Client PostgreSQL
- Déploiement : Vercel, Cloudflare. Analytics / GTM / Search Console selon besoin.

## Backend

### Base de données

PostgreSQL 16 avec l'extension `pgcrypto`. Schéma dans `server/db/schema.sql`.

**Tables** : `members`, `sessions`, `login_attempts`, `password_resets`, `audit_log`, `rate_limits`, `donations`, `notifications`.

**Enums** : `membership_plan`, `member_role`, `signup_method`, `account_status`, `audit_action`.

### Authentification

| Méthode | Description |
|---------|-------------|
| Email + mot de passe | Hachage scrypt, protection brute force (5 tentatives = 30 min de verrouillage) |
| Google OAuth 2.0 | Flux authorization code, paramètre state CSRF |

### Sessions

Cookie `rp_session` signé HMAC-SHA256, httpOnly, sameSite lax, 30 jours.

### API Endpoints

| Méthode | Chemin | Description |
|---------|--------|-------------|
| `POST` | `/api/auth/login` | Connexion email/mot de passe |
| `POST` | `/api/auth/logout` | Déconnexion |
| `GET` | `/api/auth/session` | Vérifier la session |
| `GET` | `/api/auth/google/start` | Démarrer OAuth Google |
| `GET` | `/api/auth/google/callback` | Callback OAuth Google |
| `POST` | `/api/memberships/register` | Inscription |

### Utilitaires serveur

| Fichier | Exports |
|---------|---------|
| `server/utils/db.ts` | `getDb()`, `logAudit()`, `recordLoginAttempt()`, `isAccountLocked()`, `getRecentFailedAttempts()`, `lockAccount()`, `getClientIp()` |
| `server/utils/session.ts` | `createSessionToken()`, `verifySessionToken()`, `setSessionCookie()`, `clearSessionCookie()`, `getSessionMemberId()` |
| `server/utils/password.ts` | `hashPassword()`, `verifyPassword()` |

### Sécurité

- Protection brute force : 5 tentatives échouées = verrouillage 30 minutes
- Journal d'audit immutable pour toutes les actions sécuritaires
- Vérification du statut de compte (banni/suspendu) à chaque connexion
- Tracking IP : `signup_ip`, `last_login_ip`
- Horodatage du consentement RGPD : `terms_accepted_at`, `privacy_accepted_at`

## Cookie Banner (RGPD)

Composant `CookieBanner.vue` dans `app.vue`. Conforme aux lois européennes :
- Affichage au premier accès (stockage localStorage `rp_cookie_choice`)
- Boutons Accepter/Refuser
- Texte clair : uniquement cookies essentiels (session, préférences)
- Aucun cookie publicitaire ou de suivi

## Composables

| Fichier | Description |
|---------|-------------|
| `composables/useAuthState.ts` | État d'authentification global (connected, user, login, register, logout, startGoogleAuth) |

## Installation

```bash
pnpm install   # ou npm install
cp .env.example .env   # configurer les variables d'environnement
pnpm dev
```

## Variables d'environnement

Voir `.env` pour les valeurs locales. Pour Vercel, configurer dans le dashboard :

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL PostgreSQL |
| `DATABASE_SSL` | `true` pour Vercel, `false` en local |
| `SESSION_SECRET` | Secret HMAC pour les sessions |
| `GOOGLE_CLIENT_ID` | ID client OAuth Google |
| `GOOGLE_CLIENT_SECRET` | Secret client OAuth Google |
| `GOOGLE_REDIRECT_URI` | URI de callback OAuth |

## TODO

- Performance et SEO.
- Système de paiement pour les adhésions.
- Réinitialisation de mot de passe par email.
- Panel d'administration.
