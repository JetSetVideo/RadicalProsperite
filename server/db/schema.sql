-- Radical Prosperité — Database Schema
-- PostgreSQL 16 + pgcrypto

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Enums ──

DO $$ BEGIN
  CREATE TYPE membership_plan AS ENUM ('free', 'standard', 'premium', 'donor');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE member_role AS ENUM ('member', 'moderator', 'admin', 'superadmin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE signup_method AS ENUM ('email', 'google');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE account_status AS ENUM ('active', 'suspended', 'banned', 'deactivated', 'pending_verification');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE audit_action AS ENUM (
    'login', 'login_failed', 'logout', 'register', 'password_change',
    'profile_update', 'plan_change', 'role_change', 'account_suspend',
    'account_ban', 'account_reactivate', 'google_link', 'google_unlink',
    'donation', 'session_revoke', 'admin_action', 'consent_update'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Members ──

CREATE TABLE IF NOT EXISTS members (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT NOT NULL,
  password_hash  TEXT,
  google_sub     TEXT UNIQUE,
  google_avatar_url TEXT,
  first_name     TEXT NOT NULL DEFAULT '',
  last_name      TEXT NOT NULL DEFAULT '',
  phone          TEXT,
  birth_date     DATE,
  address_line1  TEXT,
  city           TEXT,
  postal_code    TEXT,
  region         TEXT,
  membership_plan membership_plan NOT NULL DEFAULT 'free',
  role           member_role NOT NULL DEFAULT 'member',
  signup_method  signup_method NOT NULL DEFAULT 'email',
  status         account_status NOT NULL DEFAULT 'active',
  newsletter_opt_in BOOLEAN DEFAULT true,
  signup_ip      INET,
  last_login_at  TIMESTAMPTZ,
  last_login_ip  INET,
  login_count    INTEGER DEFAULT 0,
  failed_login_count INTEGER DEFAULT 0,
  locked_until   TIMESTAMPTZ,
  terms_accepted_at TIMESTAMPTZ,
  privacy_accepted_at TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_members_email_lower ON members (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_members_status ON members (status);
CREATE INDEX IF NOT EXISTS idx_members_plan ON members (membership_plan);
CREATE INDEX IF NOT EXISTS idx_members_role ON members (role);
CREATE INDEX IF NOT EXISTS idx_members_google_sub ON members (google_sub) WHERE google_sub IS NOT NULL;

-- ── Sessions ──

CREATE TABLE IF NOT EXISTS sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash  TEXT NOT NULL UNIQUE,
  member_id   UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  ip_address  INET,
  user_agent  TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  expires_at  TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_member ON sessions (member_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions (expires_at);

-- ── Login Attempts ──

CREATE TABLE IF NOT EXISTS login_attempts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT NOT NULL,
  ip_address     INET,
  user_agent     TEXT,
  success        BOOLEAN NOT NULL DEFAULT false,
  failure_reason TEXT,
  attempted_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts (LOWER(email), attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts (ip_address, attempted_at DESC);

-- ── Password Resets ──

CREATE TABLE IF NOT EXISTS password_resets (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id  UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  used       BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_password_resets_member ON password_resets (member_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets (token_hash);

-- ── Audit Log ──

CREATE TABLE IF NOT EXISTS audit_log (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action           audit_action NOT NULL,
  member_id        UUID REFERENCES members(id) ON DELETE SET NULL,
  target_member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  ip_address       INET,
  user_agent       TEXT,
  metadata         JSONB,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_member ON audit_log (member_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log (action, created_at DESC);

-- ── Rate Limits ──

CREATE TABLE IF NOT EXISTS rate_limits (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT NOT NULL,
  hits       INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_key ON rate_limits (key, window_start);

-- ── Donations ──

CREATE TABLE IF NOT EXISTS donations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id         UUID REFERENCES members(id) ON DELETE SET NULL,
  amount            DECIMAL(10,2) NOT NULL,
  currency          TEXT DEFAULT 'EUR',
  payment_method    TEXT,
  payment_reference TEXT,
  status            TEXT DEFAULT 'completed',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donations_member ON donations (member_id);

-- ── Notifications ──

CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id  UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  body       TEXT,
  type       TEXT DEFAULT 'info',
  read       BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_member ON notifications (member_id, read, created_at DESC);

-- ── Auto-update trigger ──

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER trg_members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Cleanup function ──

CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void AS $$
BEGIN
  DELETE FROM sessions WHERE expires_at < NOW();
  DELETE FROM password_resets WHERE expires_at < NOW();
  DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL '90 days';
  DELETE FROM rate_limits WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;
