/**
 * Single source of truth for product data.
 * Used by: homepage, products page, product detail page, and admin inventory.
 * Replace with Prisma DB queries when the database is connected.
 */

export interface Product {
  id: string;
  name: string;
  /** Price string including currency symbol, e.g. "₹999" */
  price: string;
  /** Numeric price in paise (for calculations) */
  priceNumeric: number;
  image: string;
  category: 'Tops' | 'Bottoms' | 'Outerwear' | 'Accessories';
  description: string;
  availableSizes: string[];
  stock: number;
  isNew?: boolean;
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'oversized-essential-tee',
    name: 'Oversized Essential Tee',
    price: '₹999',
    priceNumeric: 999,
    image: '/product-tee.png',
    category: 'Tops',
    description: 'A relaxed, oversized silhouette crafted from 100% organic cotton. The foundational piece.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 50,
    isNew: true,
  },
  {
    id: 'technical-cargo-pant',
    name: 'Technical Cargo Pant',
    price: '₹2,499',
    priceNumeric: 2499,
    image: '/product-cargo.png',
    category: 'Bottoms',
    description: 'Utility meets minimalism. Six-pocket cargo silhouette in a durable ripstop weave.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 30,
    isNew: true,
  },
  {
    id: 'minimalist-zip-hoodie',
    name: 'Minimalist Zip Hoodie',
    price: '₹1,899',
    priceNumeric: 1899,
    image: '/product-hoodie.png',
    category: 'Tops',
    description: 'Full-zip in French terry with a clean, unadorned aesthetic. No logos.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 25,
    isNew: false,
  },
  {
    id: 'structured-shacket',
    name: 'Structured Shacket',
    price: '₹2,199',
    priceNumeric: 2199,
    image: '/product-shacket.png',
    category: 'Outerwear',
    description: 'The shirt-jacket hybrid. Structured enough to layer, easy enough to wear alone.',
    availableSizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    isNew: true,
  },
  {
    id: 'raw-hem-denim',
    name: 'Raw Hem Denim',
    price: '₹1,999',
    priceNumeric: 1999,
    image: '/product-cargo.png',
    category: 'Bottoms',
    description: 'Selvedge-inspired straight-leg denim with an intentional raw hem finish.',
    availableSizes: ['28', '30', '32', '34', '36'],
    stock: 18,
    isNew: false,
  },
  {
    id: 'heavyweight-crewneck',
    name: 'Heavyweight Crewneck',
    price: '₹1,299',
    priceNumeric: 1299,
    image: '/product-hoodie.png',
    category: 'Tops',
    description: '420gsm fleece-back cotton. Built to outlast a decade of winters.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 40,
    isNew: false,
  },
  {
    id: 'draped-trench-coat',
    name: 'Draped Trench Coat',
    price: '₹3,999',
    priceNumeric: 3999,
    image: '/product-shacket.png',
    category: 'Outerwear',
    description: 'An architectural take on the classic trench. Oversized, unlined, and effortless.',
    availableSizes: ['XS', 'S', 'M', 'L'],
    stock: 12,
    isNew: true,
  },
  {
    id: 'layering-turtleneck',
    name: 'Layering Turtleneck',
    price: '₹899',
    priceNumeric: 899,
    image: '/product-tee.png',
    category: 'Tops',
    description: 'Slim-fit ribbed turtleneck in a lightweight jersey. The perfect base layer.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 60,
    isNew: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter(p => p.category === category);
}

export const NEW_ARRIVALS = ALL_PRODUCTS.filter(p => p.isNew);
