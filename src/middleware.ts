// FINAL: Protect ONLY /admin/* routes (even /admin/login allowed? no — admin login is at /login for legacy. We only block /admin/* behind admin role.)
// Public: everything else (/, /api/shop, /api/service-requests POST, /auth/*, /book-service, etc.)
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) return NextResponse.next();

  // Allow /admin/login page itself (for manual admin entry) — we can create this later.
  if (pathname === '/admin/login') return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    // Send to admin secret login at /login (the legacy admin login page)
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
  const role = (token as any)?.role;
  if (!['ADMIN','SUPER_ADMIN'].includes(role)) {
    return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
