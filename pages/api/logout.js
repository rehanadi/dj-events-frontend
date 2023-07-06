import cookie from 'cookie'
 
export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
    return
  }

  // Destroy Cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0), // passed date
    sameSite: 'strict',
    path: '/'
  }))

  res.status(200).json({ message: 'Logout success' })
}