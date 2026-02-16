interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  plan: string
  role: string
}

export const useAuthState = () => {
  const connected = useState<boolean>('auth-connected', () => false)
  const user = useState<AuthUser | null>('auth-user', () => null)
  const loading = useState<boolean>('auth-loading', () => false)

  const refreshSession = async () => {
    loading.value = true
    try {
      const data = await $fetch<{ connected: boolean; user: AuthUser | null }>('/api/auth/session')
      connected.value = data.connected
      user.value = data.user
    } catch {
      connected.value = false
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    const data = await $fetch<{ ok: boolean; user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    connected.value = true
    user.value = data.user
    return data
  }

  const register = async (formData: Record<string, any>) => {
    const data = await $fetch<{ ok: boolean; user: AuthUser }>('/api/memberships/register', {
      method: 'POST',
      body: formData
    })
    connected.value = true
    user.value = data.user
    return data
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // Ignore errors
    }
    connected.value = false
    user.value = null
  }

  const startGoogleAuth = () => {
    window.location.href = '/api/auth/google/start'
  }

  return { connected, user, loading, refreshSession, login, register, logout, startGoogleAuth }
}
