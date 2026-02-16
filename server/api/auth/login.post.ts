export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email et mot de passe requis' })
  }

  const emailLower = email.trim().toLowerCase()
  const ip = getClientIp(event)
  const userAgent = getRequestHeader(event, 'user-agent') || ''

  // Check brute force lock
  if (await isAccountLocked(emailLower)) {
    await recordLoginAttempt(emailLower, ip, userAgent, false, 'account_locked')
    throw createError({ statusCode: 429, message: 'Compte temporairement verrouillé. Réessayez dans 30 minutes.' })
  }

  const db = await getDb()

  // Find member
  const result = await db.query(
    `SELECT id, email, password_hash, first_name, last_name, membership_plan, role, status
     FROM members WHERE LOWER(email) = LOWER($1)`,
    [emailLower]
  )

  if (result.rows.length === 0) {
    await recordLoginAttempt(emailLower, ip, userAgent, false, 'user_not_found')
    const failCount = await getRecentFailedAttempts(emailLower)
    if (failCount >= 5) {
      await lockAccount(emailLower)
    }
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' })
  }

  const member = result.rows[0]

  // Check account status
  if (member.status === 'banned') {
    await recordLoginAttempt(emailLower, ip, userAgent, false, 'account_banned')
    throw createError({ statusCode: 403, message: 'Ce compte a été suspendu' })
  }

  if (member.status === 'suspended') {
    await recordLoginAttempt(emailLower, ip, userAgent, false, 'account_suspended')
    throw createError({ statusCode: 403, message: 'Ce compte est temporairement suspendu' })
  }

  if (!member.password_hash) {
    await recordLoginAttempt(emailLower, ip, userAgent, false, 'no_password')
    throw createError({ statusCode: 401, message: 'Ce compte utilise la connexion Google. Utilisez "Continuer avec Google".' })
  }

  // Verify password
  const valid = verifyPassword(password, member.password_hash)
  if (!valid) {
    await recordLoginAttempt(emailLower, ip, userAgent, false, 'wrong_password')
    const failCount = await getRecentFailedAttempts(emailLower)
    if (failCount >= 5) {
      await lockAccount(emailLower)
      await logAudit('login_failed', member.id, ip, userAgent, { reason: 'account_locked_after_5_attempts' })
      throw createError({ statusCode: 429, message: 'Trop de tentatives. Compte verrouillé pour 30 minutes.' })
    }
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' })
  }

  // Success — set session
  setSessionCookie(event, member.id)

  // Update login tracking
  await db.query(
    `UPDATE members SET last_login_at = NOW(), last_login_ip = $1,
     failed_login_count = 0, locked_until = NULL, login_count = COALESCE(login_count, 0) + 1
     WHERE id = $2`,
    [ip, member.id]
  )

  await recordLoginAttempt(emailLower, ip, userAgent, true)
  await logAudit('login', member.id, ip, userAgent, { method: 'email' })

  return {
    ok: true,
    user: {
      id: member.id,
      email: member.email,
      firstName: member.first_name,
      lastName: member.last_name,
      plan: member.membership_plan,
      role: member.role
    }
  }
})
