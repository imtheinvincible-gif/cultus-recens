/**
 * Logout Route — POST only (GET logout is a CSRF vulnerability).
 * Clears both admin and customer auth cookies and redirects to homepage.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const isAdmin = req.cookies.has('cr_admin_auth');
  const redirectPath = isAdmin ? '/dashboard/login' : '/login';
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = NextResponse.redirect(new URL(redirectPath, base));
  res.cookies.set('cr_admin_auth', '', { maxAge: 0, path: '/', httpOnly: true });
  res.cookies.set('cr_user', '', { maxAge: 0, path: '/', httpOnly: true });
  return res;
}

// Prevent GET-based logout (CSRF protection)
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}
