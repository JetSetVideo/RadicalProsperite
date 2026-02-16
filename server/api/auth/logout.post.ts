export default defineEventHandler(async (event) => {
  const memberId = getSessionMemberId(event)

  if (memberId) {
    const ip = getClientIp(event)
    const userAgent = getRequestHeader(event, 'user-agent') || ''
    await logAudit('logout', memberId, ip, userAgent)
  }

  clearSessionCookie(event)

  return { ok: true }
})
