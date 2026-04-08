import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'admin@cultusrecens.com';
const ADMIN_PASSWORD = 'admin123';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('cr_admin_auth', 'authenticated', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
