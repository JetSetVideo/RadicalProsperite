import { createHmac, timingSafeEqual } from 'crypto'

const getSecret = (): string => {
  const config = useRuntimeConfig()
  if (!config.sessionSecret) {
    throw new Error('SESSION_SECRET is not set')
  }
  return config.sessionSecret
}

export const createSessionToken = (memberId: string): string => {
  const timestamp = Date.now().toString(36)
  const data = `${memberId}:${timestamp}`
  const hmac = createHmac('sha256', getSecret()).update(data).digest('hex')
  return `${data}.${hmac}`
}

export const verifySessionToken = (token: string | undefined): string | null => {
  if (!token || typeof token !== 'string') return null

  const dotIndex = token.lastIndexOf('.')
  if (dotIndex === -1) return null

  const data = token.substring(0, dotIndex)
  const signature = token.substring(dotIndex + 1)

  const expectedHmac = createHmac('sha256', getSecret()).update(data).digest('hex')

  // Timing-safe comparison
  try {
    const sigBuf = Buffer.from(signature, 'hex')
    const expectedBuf = Buffer.from(expectedHmac, 'hex')
    if (sigBuf.length !== expectedBuf.length) return null
    if (!timingSafeEqual(sigBuf, expectedBuf)) return null
  } catch {
    return null
  }

  const colonIndex = data.indexOf(':')
  if (colonIndex === -1) return null

  return data.substring(0, colonIndex)
}

export const setSessionCookie = (event: any, memberId: string) => {
  const token = createSessionToken(memberId)
  const config = useRuntimeConfig()
  const isProduction = config.public?.nodeEnv === 'production' || process.env.NODE_ENV === 'production'

  setCookie(event, 'rp_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })
}

export const clearSessionCookie = (event: any) => {
  deleteCookie(event, 'rp_session', {
    httpOnly: true,
    path: '/'
  })
}

export const getSessionMemberId = (event: any): string | null => {
  const token = getCookie(event, 'rp_session')
  return verifySessionToken(token)
}
