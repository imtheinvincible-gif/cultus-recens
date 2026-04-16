/**
 * Admin Login API Route
 *
 * SECURITY: Credentials are loaded from environment variables.
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env.local / Render environment.
 * The auth cookie value is a signed token, not a plain string.
 */
import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomBytes } from 'crypto';

/** Generates a simple HMAC-based session token from a secret. */
function generateSessionToken(email: string): string {
  const secret = process.env.AUTH_SECRET || 'change-this-secret-in-production';
  const nonce = randomBytes(16).toString('hex');
  const payload = `${email}:${Date.now()}:${nonce}`;
  const sig = createHash('sha256').update(`${payload}:${secret}`).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64');
}

export async function POST(req: NextRequest) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD env vars not set.');
    return NextResponse.json(
      { success: false, error: 'Server misconfiguration.' },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (email?.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
    const token = generateSessionToken(email);
    const res = NextResponse.json({ success: true });
    res.cookies.set('cr_admin_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours — shorter session for admin
    });
    return res;
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
