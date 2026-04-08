import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get('category');
    
    // Abstract ORM Query: Retrieves Products, nested Variations (Stock levels) and Category
    const products = await prisma.product.findMany({
      where: categoryName ? { category: { name: categoryName } } : undefined,
      include: {
        variations: true,
        category: true
      }
    });
    
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    // Silent fail for mock purposes if the DB connection string isn't populated yet
    return NextResponse.json({ success: false, error: 'Database connection failed. Ensure POSTGRES_URL is set in .env' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // SECURITY: Authenticate admin session here via NextAuth before creating DB entry
    
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        images: body.images || [],
        category: {
          connectOrCreate: {
            where: { name: body.category },
            create: { name: body.category }
          }
        }
      }
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create product constraint violation.' }, { status: 400 });
  }
}
