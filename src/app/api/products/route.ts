/**
 * Products API Route
 *
 * GET /api/products — Public. Returns product catalog.
 * POST /api/products — Admin only. Creates a product (requires valid admin cookie).
 *
 * TODO: Replace ALL_PRODUCTS with Prisma DB queries when database is connected.
 */
import { NextRequest, NextResponse } from 'next/server';
import { ALL_PRODUCTS } from '@/lib/products';

function isAdminAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get('cr_admin_auth')?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return decoded.split(':').length >= 4;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get('category');

  const products = categoryName
    ? ALL_PRODUCTS.filter(p => p.category === categoryName)
    : ALL_PRODUCTS;

  return NextResponse.json({ success: true, data: products });
}

export async function POST(request: NextRequest) {
  // SECURITY: Admin authentication check
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.price || !body?.category) {
    return NextResponse.json({ success: false, error: 'name, price, and category are required.' }, { status: 400 });
  }

  // In production: await prisma.product.create({ data: body })
  // For now, return a mock success since we have no DB
  const mockProduct = {
    id: body.name.toLowerCase().replace(/\s+/g, '-'),
    name: body.name,
    price: body.price,
    category: body.category,
    image: body.image || '/placeholder.png',
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ success: true, data: mockProduct }, { status: 201 });
}
