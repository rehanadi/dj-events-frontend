import cookie from 'cookie'
import { API_URL } from '@/config/index';

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
    return
  }

  if (!req.headers.cookie) {
    res.status(403).json({ message: 'Not Authorized' })
    return
  }

  const { token } = cookie.parse(req.headers.cookie)

  const backendRes = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'GET'
  })

  const user =  await backendRes.json()

  if (!backendRes.ok) {
    res.status(403).json({ message: 'User forbidden' })
    return
  }

  res.status(200).json({ user })
}