export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email, password, phone, birthDate, address, city, postalCode, region, newsletter, membership } = body || {}

  // Validate required fields
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password) {
    throw createError({ statusCode: 400, message: 'Prénom, nom, email et mot de passe sont requis' })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({ statusCode: 400, message: 'Format d\'email invalide' })
  }

  // Validate password strength
  if (password.length < 8) {
    throw createError({ statusCode: 400, message: 'Le mot de passe doit contenir au moins 8 caractères' })
  }

  // Validate membership plan
  const validPlans = ['free', 'standard', 'premium', 'donor']
  const plan = validPlans.includes(membership) ? membership : 'free'

  const emailLower = email.trim().toLowerCase()
  const ip = getClientIp(event)
  const userAgent = getRequestHeader(event, 'user-agent') || ''

  const db = await getDb()

  // Check if email already exists
  const existing = await db.query(
    `SELECT id FROM members WHERE LOWER(email) = LOWER($1)`,
    [emailLower]
  )

  if (existing.rows.length > 0) {
    throw createError({ statusCode: 409, message: 'Un compte avec cet email existe déjà' })
  }

  // Hash password
  const passwordHash = hashPassword(password)

  // Insert member
  const result = await db.query(
    `INSERT INTO members (
      email, password_hash, first_name, last_name, phone, birth_date,
      address_line1, city, postal_code, region, newsletter_opt_in,
      membership_plan, signup_method, signup_ip, status,
      terms_accepted_at, privacy_accepted_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::membership_plan, 'email', $13, 'active', NOW(), NOW())
    RETURNING id, email, first_name, last_name, membership_plan, role`,
    [
      emailLower, passwordHash,
      firstName.trim(), lastName.trim(),
      phone?.trim() || null,
      birthDate || null,
      address?.trim() || null,
      city?.trim() || null,
      postalCode?.trim() || null,
      region || null,
      newsletter !== false,
      plan,
      ip
    ]
  )

  const member = result.rows[0]

  // Set session
  setSessionCookie(event, member.id)

  await logAudit('register', member.id, ip, userAgent, { method: 'email', plan })

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
