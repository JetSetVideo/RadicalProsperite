export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { code, state, error } = query

  if (error) {
    return sendRedirect(event, '/adhesion?error=google_denied')
  }

  if (!code || !state) {
    return sendRedirect(event, '/adhesion?error=google_invalid')
  }

  // Verify state parameter
  const storedState = getCookie(event, 'rp_google_state')
  deleteCookie(event, 'rp_google_state', { path: '/' })

  if (!storedState || storedState !== state) {
    return sendRedirect(event, '/adhesion?error=google_csrf')
  }

  const config = useRuntimeConfig()
  const ip = getClientIp(event)
  const userAgent = getRequestHeader(event, 'user-agent') || ''

  try {
    // Exchange code for tokens
    const tokenResponse = await $fetch<any>('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: {
        code,
        client_id: config.googleClientId,
        client_secret: config.googleClientSecret,
        redirect_uri: config.googleRedirectUri,
        grant_type: 'authorization_code'
      }
    })

    // Get user info
    const userInfo = await $fetch<any>('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
    })

    const { id: googleSub, email, given_name, family_name, picture } = userInfo

    if (!email) {
      return sendRedirect(event, '/adhesion?error=google_no_email')
    }

    const db = await getDb()

    // Check if member exists by google_sub or email
    let result = await db.query(
      `SELECT id, email, status FROM members WHERE google_sub = $1 OR LOWER(email) = LOWER($2) LIMIT 1`,
      [googleSub, email]
    )

    let memberId: string

    if (result.rows.length > 0) {
      const member = result.rows[0]

      // Check account status
      if (member.status === 'banned') {
        await logAudit('login_failed', member.id, ip, userAgent, { method: 'google', reason: 'banned' })
        return sendRedirect(event, '/adhesion?error=account_banned')
      }

      // Link Google sub if not yet linked
      if (!result.rows[0].google_sub) {
        await db.query(
          `UPDATE members SET google_sub = $1, google_avatar_url = $2, signup_method = 'google' WHERE id = $3`,
          [googleSub, picture || null, member.id]
        )
      }

      memberId = member.id

      // Update login tracking
      await db.query(
        `UPDATE members SET last_login_at = NOW(), last_login_ip = $1,
         login_count = COALESCE(login_count, 0) + 1 WHERE id = $2`,
        [ip, memberId]
      )
    } else {
      // Create new member via Google
      const insertResult = await db.query(
        `INSERT INTO members (email, first_name, last_name, google_sub, google_avatar_url,
         signup_method, membership_plan, status, signup_ip, last_login_at, last_login_ip,
         terms_accepted_at, privacy_accepted_at)
         VALUES ($1, $2, $3, $4, $5, 'google', 'free', 'active', $6, NOW(), $6, NOW(), NOW())
         RETURNING id`,
        [email, given_name || '', family_name || '', googleSub, picture || null, ip]
      )
      memberId = insertResult.rows[0].id
      await logAudit('register', memberId, ip, userAgent, { method: 'google' })
    }

    // Set session
    setSessionCookie(event, memberId)
    await logAudit('login', memberId, ip, userAgent, { method: 'google' })

    return sendRedirect(event, '/adhesion?connected=true')
  } catch (err: any) {
    console.error('[Google OAuth] Error:', err.message)
    return sendRedirect(event, '/adhesion?error=google_failed')
  }
})
