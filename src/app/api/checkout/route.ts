/**
 * Checkout API Route
 *
 * SECURITY: The Stripe client secret is NEVER hardcoded.
 * In production, set STRIPE_SECRET_KEY in your environment.
 * The client secret must only be returned to authenticated users.
 */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    // In development without Stripe configured, return a clear mock
    const body = await request.json().catch(() => ({}));
    const total = (body as { total?: number }).total || 0;

    console.warn('[checkout] STRIPE_SECRET_KEY not set — returning mock session');
    return NextResponse.json({
      success: true,
      mock: true,
      sessionId: 'cs_test_mock_' + Math.random().toString(36).substring(7),
      totalCharged: total,
      message: 'Mock checkout session. Set STRIPE_SECRET_KEY to enable real payments.',
    });
  }

  // --- Production path ---
  // import Stripe from 'stripe';
  // const stripe = new Stripe(stripeKey);
  // const session = await stripe.checkout.sessions.create({ ... });
  // return NextResponse.json({ success: true, sessionId: session.id });

  return NextResponse.json({ success: false, error: 'Stripe integration pending.' }, { status: 501 });
}
