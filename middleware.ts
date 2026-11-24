import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-change-me-in-production-min-32-chars'
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isCheckoutRoute = pathname.startsWith('/checkout');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  // Redirect logged-in users away from auth pages
  if (token && isAuthRoute) {
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/', req.url));
    } catch {
      // invalid token, continue
    }
  }

  if (!isAdminRoute && !isCheckoutRoute) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (isAdminRoute && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/login', '/register'],
};