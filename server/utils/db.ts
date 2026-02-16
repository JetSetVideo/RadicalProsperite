import pg from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'

const { Pool } = pg

let pool: pg.Pool | null = null
let schemaApplied = false

export const getDb = async (): Promise<pg.Pool> => {
  if (!pool) {
    const config = useRuntimeConfig()
    const isSSL = config.databaseSsl === 'true'

    pool = new Pool({
      connectionString: config.databaseUrl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ...(isSSL ? { ssl: { rejectUnauthorized: false } } : {})
    })

    pool.on('error', (err) => {
      console.error('[DB] Pool error:', err.message)
      pool = null
      schemaApplied = false
    })
  }

  // Auto-apply schema on first connection
  if (!schemaApplied) {
    try {
      const result = await pool.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'members')`
      )
      if (!result.rows[0].exists) {
        const schemaPath = join(process.cwd(), 'server', 'db', 'schema.sql')
        const schema = readFileSync(schemaPath, 'utf-8')
        await pool.query(schema)
        console.log('[DB] Schema applied successfully')
      }
      schemaApplied = true
    } catch (err: any) {
      console.error('[DB] Schema check/apply failed:', err.message)
      // Don't block — table may already exist
      schemaApplied = true
    }
  }

  return pool
}

// ── Security helpers ──

export const logAudit = async (
  action: string,
  memberId: string | null,
  ip: string,
  userAgent: string,
  metadata?: Record<string, any>,
  targetMemberId?: string
) => {
  const db = await getDb()
  await db.query(
    `INSERT INTO audit_log (action, member_id, target_member_id, ip_address, user_agent, metadata)
     VALUES ($1::audit_action, $2, $3, $4, $5, $6)`,
    [action, memberId, targetMemberId || null, ip, userAgent, metadata ? JSON.stringify(metadata) : null]
  )
}

export const recordLoginAttempt = async (
  email: string,
  ip: string,
  userAgent: string,
  success: boolean,
  failureReason?: string
) => {
  const db = await getDb()
  await db.query(
    `INSERT INTO login_attempts (email, ip_address, user_agent, success, failure_reason)
     VALUES ($1, $2, $3, $4, $5)`,
    [email, ip, userAgent, success, failureReason || null]
  )
}

export const isAccountLocked = async (email: string): Promise<boolean> => {
  const db = await getDb()
  const result = await db.query(
    `SELECT locked_until FROM members WHERE LOWER(email) = LOWER($1) AND locked_until > NOW()`,
    [email]
  )
  return result.rows.length > 0
}

export const getRecentFailedAttempts = async (
  email: string,
  windowMinutes: number = 15
): Promise<number> => {
  const db = await getDb()
  const result = await db.query(
    `SELECT COUNT(*) as count FROM login_attempts
     WHERE LOWER(email) = LOWER($1) AND success = false
     AND attempted_at > NOW() - INTERVAL '1 minute' * $2`,
    [email, windowMinutes]
  )
  return parseInt(result.rows[0].count, 10)
}

export const lockAccount = async (email: string, durationMinutes: number = 30) => {
  const db = await getDb()
  await db.query(
    `UPDATE members SET locked_until = NOW() + INTERVAL '1 minute' * $2,
     failed_login_count = COALESCE(failed_login_count, 0) + 1
     WHERE LOWER(email) = LOWER($1)`,
    [email, durationMinutes]
  )
}

export const getClientIp = (event: any): string => {
  const headers = getRequestHeaders(event)
  return (
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    headers['x-real-ip'] ||
    event.node?.req?.socket?.remoteAddress ||
    '0.0.0.0'
  )
}
