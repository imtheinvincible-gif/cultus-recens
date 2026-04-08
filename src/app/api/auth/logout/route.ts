import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.redirect(new URL('/dashboard/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  res.cookies.set('cr_admin_auth', '', { maxAge: 0, path: '/' });
  res.cookies.set('cr_user', '', { maxAge: 0, path: '/' });
  return res;
}
