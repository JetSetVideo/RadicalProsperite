export default defineEventHandler(async (event) => {
  const memberId = getSessionMemberId(event)

  if (!memberId) {
    return { connected: false, user: null }
  }

  const db = await getDb()
  const result = await db.query(
    `SELECT id, email, first_name, last_name, membership_plan, role, status
     FROM members WHERE id = $1 AND status NOT IN ('banned', 'deactivated')`,
    [memberId]
  )

  if (result.rows.length === 0) {
    clearSessionCookie(event)
    return { connected: false, user: null }
  }

  const member = result.rows[0]

  return {
    connected: true,
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
