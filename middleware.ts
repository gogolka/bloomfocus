import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Only protect /admin routes
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const authHeader = req.headers.get('authorization')

  if (authHeader) {
    const encoded = authHeader.split(' ')[1]
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
    const [user, pass] = decoded.split(':')

    const validUser = process.env.ADMIN_USER || 'diana'
    const validPass = process.env.ADMIN_PASSWORD || ''

    if (user === validUser && pass === validPass && validPass !== '') {
      return NextResponse.next()
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="bloom focus admin"',
    },
  })
}

export const config = {
  matcher: '/admin/:path*',
}
