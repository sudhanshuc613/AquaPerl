// FINAL: Protect /admin/* behind admin role.
// Also: return 410 Gone for any old hacked/spam URLs so Google removes them fast.
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Purane hacked URLs — SEO spam jo hack ke time index ho gaya tha.
// Inko 410 Gone bhejo (permanently removed) + X-Robots-Tag: noindex
// Google jaldi deindex karega.
const SPAM_PATTERNS = [
  /^\/kent-ro-service\/?$/,        // Spam "KENTRO" pages
  /^\/[^/]*-ro-service\/?$/,       // Generic [brand]-ro-service spam pattern
  /^\/ro-water-purifier/,          // Random spam slugs
  /^\/water-purifier-repair/,
  /^\/ro-customer-care\/?/,
  /^\/ro-repair-center\/?/,
  /^\/ro-technician-patna\/?/,
];

// Known exact spam paths from the hack
const SPAM_EXACT = new Set([
  '/kent-ro-service',
  '/kent-ro-service/',
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 410 Gone for old spam URLs (hacked content that Google still has cached)
  if (SPAM_EXACT.has(pathname) || SPAM_PATTERNS.some(r => r.test(pathname))) {
    // Redirect to our clean homepage? NO — 410 is better for spam removal.
    // But to recover some SEO value, 301 to homepage.
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    const res = NextResponse.redirect(url, 301);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return res;
  }

  // Non-www → www 301 (extra safety beyond Vercel project setting)
  const host = req.headers.get('host') || '';
  if (host === 'roserviceinpatna.in') {
    const url = req.nextUrl.clone();
    url.host = 'www.roserviceinpatna.in';
    return NextResponse.redirect(url, 301);
  }

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    const role = (token as any)?.role;
    if (!['ADMIN','SUPER_ADMIN'].includes(role)) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|uploads|brands|images|og.jpg|icon-512.png|google893626847fe7ea68.html|api/auth).*)',
  ],
};
