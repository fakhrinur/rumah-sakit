import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'rs-sehat-sentosa.auth'

/**
 * Daftar akun demo (hard-coded hanya untuk keperluan belajar).
 * Di aplikasi nyata, autentikasi harus divalidasi di server.
 */
export const DEMO_ACCOUNTS = [
  {
    email: 'admin@sehatsentosa.id',
    password: 'admin123',
    name: 'Rina Kartika',
    role: 'Administrator',
    unit: 'Manajemen Rumah Sakit',
  },
  {
    email: 'dokter@sehatsentosa.id',
    password: 'dokter123',
    name: 'dr. Ayu Prameswari',
    role: 'Dokter Spesialis',
    unit: 'Poli Penyakit Dalam',
  },
]

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    // Simulasi request ke server
    await new Promise((resolve) => setTimeout(resolve, 900))

    const account = DEMO_ACCOUNTS.find(
      (item) =>
        item.email.toLowerCase() === String(email).trim().toLowerCase() &&
        item.password === password,
    )

    setIsLoading(false)

    if (!account) {
      throw new Error('Email atau kata sandi salah. Silakan coba lagi.')
    }

    const { password: _password, ...profile } = account
    setUser({ ...profile, loginAt: new Date().toISOString() })
    return profile
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), isLoading, login, logout }),
    [user, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return context
}
