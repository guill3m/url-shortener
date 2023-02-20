import { NextResponse } from 'next/server'

export function middleware (req) {
  const { headers, nextUrl } = req

  if (nextUrl.pathname === '/' || nextUrl.pathname.startsWith('/api')) {
    const basicAuth = headers.get('Authorization')

    if (basicAuth) {
      const auth = basicAuth.split(' ')[1]
      const [user, password] = atob(auth).split(':')

      if (user === process.env.AUTH_USER && password === process.env.AUTH_PASSWORD) {
        return NextResponse.next()
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  return NextResponse.next()
}
