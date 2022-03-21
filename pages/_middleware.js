import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (
    !token &&
    pathname !== '/login' &&
    !pathname.includes('graphql-demo') &&
    !pathname.includes('character')
  ) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url.href)
  }
}
