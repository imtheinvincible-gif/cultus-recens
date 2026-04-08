import { NextRequest, NextResponse } from 'next/server';

// Simulated user store (in production this would be a DB query via Prisma)
const MOCK_USERS: Record<string, { name: string; password: string }> = {
  'user@example.com': { name: 'Alex Kim', password: 'password123' },
  'customer@cultusrecens.com': { name: 'Priya Sharma', password: 'cultus2026' },
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = MOCK_USERS[email.toLowerCase()];
  if (user && user.password === password) {
    const res = NextResponse.json({ success: true, name: user.name });
    res.cookies.set('cr_user', JSON.stringify({ email, name: user.name }), {
      httpOnly: false, // readable by client for display
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
}
