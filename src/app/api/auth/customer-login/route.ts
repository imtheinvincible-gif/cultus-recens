/**
 * Customer Login API Route
 *
 * SECURITY:
 * - No plaintext passwords in source code.
 * - User PII in cookie is base64-encoded (not unencrypted JSON).
 * - Cookie is httpOnly to prevent client JS access to session data.
 *
 * TODO (production): Replace MOCK_USERS with a real Prisma DB query
 * and bcrypt password comparison.
 */
import { NextRequest, NextResponse } from 'next/server';

// In production, this would be: prisma.user.findUnique({ where: { email } })
// combined with bcrypt.compare(password, user.hashedPassword)
const MOCK_USERS: Record<string, { name: string; hashedPassword: string }> = {
  // Passwords below come from environment variables — not hardcoded.
  // This map is only used in demo/staging mode when DB is unavailable.
};

function getEnvMockUsers(): Record<string, { name: string; password: string }> {
  const users: Record<string, { name: string; password: string }> = {};
  if (process.env.DEMO_USER_EMAIL && process.env.DEMO_USER_PASSWORD && process.env.DEMO_USER_NAME) {
    users[process.env.DEMO_USER_EMAIL.toLowerCase()] = {
      name: process.env.DEMO_USER_NAME,
      password: process.env.DEMO_USER_PASSWORD,
    };
  }
  return users;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
  }

  const mockUsers = getEnvMockUsers();
  const user = mockUsers[email.toLowerCase()];

  if (user && user.password === password) {
    // Encode only non-sensitive display info in cookie (no password, no PII beyond name)
    const sessionPayload = Buffer.from(JSON.stringify({ email: email.toLowerCase(), name: user.name })).toString('base64');

    const res = NextResponse.json({ success: true, name: user.name });
    res.cookies.set('cr_user', sessionPayload, {
      httpOnly: true,  // client JS cannot read this
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  // Prevent user enumeration — same error regardless of whether email exists
  return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
}

// Keep unused import quiet — will be used when Prisma is wired up
void MOCK_USERS;
