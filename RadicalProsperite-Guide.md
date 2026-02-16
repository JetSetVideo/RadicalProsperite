# Radical Prosperite - Backend & Infrastructure Guide

## Quick Reference

| Item | Value |
|------|-------|
| **Project path** | `/home/jetsetvideo/Desktop/RadicalProsperite/` |
| **Framework** | Nuxt 3 + Vue 3 + TypeScript |
| **Runtime** | Node.js 22 (via nvm) |
| **Database** | PostgreSQL 16 (localhost:5432) |
| **Deployment** | Vercel (frontend + API routes) |
| **Server IP (LAN)** | `192.168.1.55` |
| **Server IP (Public)** | `88.189.56.136` |

---

## Database Credentials

| Property | Value |
|----------|-------|
| **Database name** | `radicalprosperite` |
| **Username** | `radicalprosperite` |
| **Password** | `lysUN4OSBAAP9I3VoyGf0dt2sXmeItXT` |
| **Local URL** | `postgresql://radicalprosperite:lysUN4OSBAAP9I3VoyGf0dt2sXmeItXT@localhost:5432/radicalprosperite` |
| **Remote URL (for Vercel)** | `postgresql://radicalprosperite:lysUN4OSBAAP9I3VoyGf0dt2sXmeItXT@88.189.56.136:5432/radicalprosperite` |
| **SSL** | Required for remote connections (`hostssl` in pg_hba.conf) |
| **Extensions** | `pgcrypto` |

---

## Vercel Environment Variables

Set these in **Vercel Dashboard > Settings > Environment Variables**:

```
DATABASE_URL=postgresql://radicalprosperite:lysUN4OSBAAP9I3VoyGf0dt2sXmeItXT@88.189.56.136:5432/radicalprosperite
DATABASE_SSL=true
SESSION_SECRET=GrfHacSZBz7Gc+8VILzVUZD7htoJW/Cq7c1xr5F+Dp8=
NODE_ENV=production

# Google OAuth (set when you have credentials from Google Cloud Console)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=https://your-domain.vercel.app/api/auth/google/callback
```

### Local Development `.env`

Create `RadicalProsperite/.env`:

```
DATABASE_URL=postgresql://radicalprosperite:lysUN4OSBAAP9I3VoyGf0dt2sXmeItXT@localhost:5432/radicalprosperite
DATABASE_SSL=false
SESSION_SECRET=GrfHacSZBz7Gc+8VILzVUZD7htoJW/Cq7c1xr5F+Dp8=
NODE_ENV=development

# Google OAuth (for local testing)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

---

## Database Schema (7 tables)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **members** | Core user data | id (UUID), email, password_hash, google_sub, first_name, last_name, membership_plan (enum), role (enum), status (enum), consent fields, login tracking |
| **sessions** | Server-managed sessions | token_hash, member_id, ip_address, user_agent, is_active, expires_at |
| **login_attempts** | Brute force protection | email, ip_address, success, failure_reason, attempted_at |
| **password_resets** | Password recovery tokens | member_id, token_hash, expires_at, used |
| **audit_log** | Immutable security trail | member_id, action (enum), target_member_id, metadata (JSONB), ip_address |
| **donations** | Financial tracking | member_id, amount, currency, payment_reference |
| **notifications** | User notifications | member_id, title, body, type, read |

### Enums

| Enum | Values |
|------|--------|
| `membership_plan` | free, standard, premium, donor |
| `member_role` | member, moderator, admin, superadmin |
| `signup_method` | email, google |
| `account_status` | active, suspended, banned, deactivated, pending_verification |
| `audit_action` | login, login_failed, logout, register, password_change, profile_update, plan_change, role_change, account_suspend, account_ban, account_reactivate, google_link, google_unlink, donation, session_revoke, admin_action, consent_update |

### Security Features

- **Brute force protection**: 5 failed attempts = 30-minute account lock
- **Login attempt logging**: Every attempt recorded with IP, user agent, outcome
- **Audit trail**: All security-relevant actions logged with metadata
- **Account status checks**: Banned/suspended accounts rejected at login
- **IP tracking**: signup_ip, last_login_ip recorded
- **GDPR consent timestamps**: terms_accepted_at, privacy_accepted_at
- **Auto-cleanup function**: `cleanup_expired_data()` purges old data
- **Auto-update trigger**: `updated_at` automatically maintained

---

## API Endpoints

### Auth

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/auth/login` | Email/password login (with brute force protection) |
| `POST` | `/api/auth/logout` | Clear session cookie |
| `GET` | `/api/auth/session` | Check current session status |
| `GET` | `/api/auth/google/start` | Initiate Google OAuth flow |
| `GET` | `/api/auth/google/callback` | Handle Google OAuth return |

### Memberships

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/memberships/register` | New member registration |

---

## Server Utilities

| File | Exports |
|------|---------|
| `server/utils/db.ts` | `getDb()`, `logAudit()`, `recordLoginAttempt()`, `isAccountLocked()`, `getRecentFailedAttempts()`, `lockAccount()`, `getClientIp()` |
| `server/utils/session.ts` | `createSessionToken()`, `verifySessionToken()`, `setSessionCookie()`, `clearSessionCookie()`, `getSessionMemberId()` |
| `server/utils/password.ts` | `hashPassword()`, `verifyPassword()` |

---

## PostgreSQL Configuration Changes Made

| File | Change |
|------|--------|
| `/etc/postgresql/16/main/postgresql.conf` | `listen_addresses = '*'` (was localhost) |
| `/etc/postgresql/16/main/pg_hba.conf` | Added `hostssl` rules for radicalprosperite user from any IP |
| `/etc/fail2ban/jail.d/postgresql.conf` | Fail2ban jail for PostgreSQL (5 attempts = 1hr ban) |
| `/etc/fail2ban/filter.d/postgresql.conf` | Fail2ban filter for auth failures |

### Firewall

```
Port 5432/tcp OPEN (UFW rule: "PostgreSQL for Vercel")
```

---

## Router Port Forwarding Required

Your server is behind NAT. For Vercel to reach PostgreSQL, you must configure your router:

| External Port | Internal IP | Internal Port | Protocol |
|--------------|-------------|---------------|----------|
| 5432 | 192.168.1.55 | 5432 | TCP |

Access your router admin at `192.168.1.1` (typically) and add this port forward.

---

## Session & Cookie System

| Cookie | Purpose | Duration |
|--------|---------|----------|
| `rp_session` | Session token (HMAC-SHA256 signed) | 30 days |
| `rp_cookie_choice` | GDPR cookie consent | 6 months |
| `rp_google_state` | OAuth state parameter | 10 minutes |

**Session format**: `{memberId}:{timestamp}.{hmac_signature}`
**Cookie flags**: `httpOnly`, `sameSite: lax`, `secure` in production, `path: /`

---

## Project Structure

```
RadicalProsperite/
  app.vue                         # Main layout + circuit board background
  nuxt.config.ts                  # Nuxt configuration
  Design.md                       # Comprehensive design system
  package.json                    # Dependencies
  components/
    Navbar.vue                    # French tricolor navbar
    Footer.vue                    # Social media footer
    CookieBanner.vue              # GDPR cookie consent
    Settings.vue                  # Theme toggle
    Calendrier.vue                # Event calendar
    Carte.vue                     # France map
  composables/
    useAuthState.ts               # Auth state management
  pages/
    index.vue                     # Home page
    adhesion.vue                  # Membership + auth
    informations.vue              # News + events
    communaute.vue                # Community page
    forum.vue                     # Forum
    magasin.vue                   # Store
    aides.vue                     # Help
  server/
    api/auth/login.post.ts        # Login with brute force protection
    api/auth/logout.post.ts       # Logout
    api/auth/session.get.ts       # Session check
    api/auth/google/start.get.ts  # Google OAuth start
    api/auth/google/callback.get.ts # Google OAuth callback
    api/memberships/register.post.ts # Registration
    db/schema.sql                 # Full database schema (7 tables)
    utils/db.ts                   # DB pool + security helpers
    utils/session.ts              # HMAC session management
    utils/password.ts             # scrypt password hashing
```

---

## Running Locally

```bash
cd ~/Desktop/RadicalProsperite-main

# Install dependencies
npm install

# Create .env file (see Environment Variables above)

# Run development server
npm run dev
# Visit http://localhost:3000

# Apply schema to database (happens automatically on first API call)
```

---

## Deploying to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard (see above)
4. Ensure router port 5432 is forwarded to 192.168.1.55
5. Deploy

---

## Backup & Maintenance

- PostgreSQL is backed up daily at 2AM (included in existing `pg_dumpall`)
- Backups stored at `/home/jetsetvideo/backups/postgres/` and synced to OneDrive
- Run `SELECT cleanup_expired_data();` periodically to purge old sessions/attempts
- Monitor with `sudo fail2ban-client status postgresql`

---

## Google OAuth Setup (when ready)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API" or "People API"
4. Go to Credentials > Create OAuth Client ID
5. Set authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://your-domain.vercel.app/api/auth/google/callback`
6. Copy Client ID and Client Secret to environment variables

---

## Troubleshooting

### Database connection fails from Vercel
- Check router port forwarding (5432 -> 192.168.1.55)
- Verify public IP hasn't changed: `curl -4 ifconfig.me`
- Check PostgreSQL is listening: `sudo ss -tlnp | grep 5432`
- Check Fail2ban hasn't banned the IP: `sudo fail2ban-client status postgresql`

### Schema creation fails
- Check user permissions: `PGPASSWORD='...' psql -h 127.0.0.1 -U radicalprosperite -d radicalprosperite -c "\dt"`
- Check pgcrypto: `SELECT * FROM pg_extension WHERE extname = 'pgcrypto';`

### Session not persisting
- Check `SESSION_SECRET` is set and consistent
- Check cookie domain matches (localhost vs production domain)
- Check `secure` flag (only works with HTTPS in production)

### Account locked
- Unlock manually: `UPDATE members SET locked_until = NULL, failed_login_count = 0 WHERE email = 'user@example.com';`
