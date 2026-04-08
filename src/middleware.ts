import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard routes EXCEPT /dashboard/login
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
    const adminAuth = request.cookies.get('cr_admin_auth');
    if (!adminAuth || adminAuth.value !== 'authenticated') {
      const loginUrl = new URL('/dashboard/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
