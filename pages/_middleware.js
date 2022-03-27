import { NextResponse } from 'next/server'

export function middleware (req) {
  const { headers, nextUrl } = req

  if (nextUrl.pathname === '/' || nextUrl.pathname.startsWith('/api')) {
    const basicAuth = headers.get('authorization')

    if (basicAuth) {
      const auth = basicAuth.split(' ')[1]
      const [user, password] = Buffer.from(auth, 'base64').toString().split(':')

      if (user === process.env.AUTH_USER && password === process.env.AUTH_PASSWORD) {
        return NextResponse.next()
      }
    }

    return new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  return NextResponse.next()
}
