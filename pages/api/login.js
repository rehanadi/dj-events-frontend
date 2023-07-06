import cookie from 'cookie'
import { API_URL } from '@/config/index';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
    return
  }

  const { identifier, password } = req.body

  // set backend login api in here so can setup http-only cookie on server response
  const backendRes = await fetch(`${API_URL}/auth/local`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ identifier, password })
  })
  const data = await backendRes.json()

  if (!backendRes.ok) {
    res.status(data.statusCode).json({ message: data.message[0].messages[0].message })
    return
  }

  // Set Cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'strict',
    path: '/'
  }))

  res.status(200).json({ user: data.user })
}