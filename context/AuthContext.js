import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FRONTEND_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => checkUserLoggedIn(), [])

  // Register user
  const register = async (user) => {
    const res = await fetch(`${FRONTEND_URL}/api/register`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    })
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null) // after show it on toast then clear it from state
    }
  }

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${FRONTEND_URL}/api/login`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ identifier, password })
    })
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null) // after show it on toast then clear it from state
    }
  }

  // Logout user
  const logout = async () => {
    const res = await fetch(`${FRONTEND_URL}/api/logout`, {
      method: 'POST'
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // Auth user
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${FRONTEND_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{
      user, error, register, login, logout, checkUserLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext