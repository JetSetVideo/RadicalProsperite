import { randomBytes } from 'crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.googleClientId || !config.googleRedirectUri) {
    throw createError({ statusCode: 500, message: 'Google OAuth non configuré' })
  }

  // Generate state parameter for CSRF protection
  const state = randomBytes(32).toString('hex')

  setCookie(event, 'rp_google_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10 // 10 minutes
  })

  const params = new URLSearchParams({
    client_id: config.googleClientId,
    redirect_uri: config.googleRedirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'consent'
  })

  return sendRedirect(event, `https://accounts.google.com/o/oauth2/v2/auth?${params}`)
})
