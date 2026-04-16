import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Validates that the admin auth cookie is a base64-encoded signed token
 * (not just the plain string "authenticated").
 */
function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    // Tokens produced by admin-login/route.ts are base64 strings containing colons
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    // Basic structure check: email:timestamp:nonce:signature
    const parts = decoded.split(':');
    return parts.length >= 4;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard routes EXCEPT /dashboard/login
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
    const adminAuth = request.cookies.get('cr_admin_auth');
    
    // Old sessions had the value "authenticated" — reject those too
    if (!isValidAdminToken(adminAuth?.value)) {
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
