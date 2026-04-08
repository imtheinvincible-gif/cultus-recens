"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
const PRODUCT_DATA: Record<string, {
  name: string; price: string; image: string;
  category: string; description: string; sizes: string[];
  stock: Record<string, number>;
}> = {
  'oversized-essential-tee': {
    name: 'Oversized Essential Tee',
    price: '₹999',
    image: '/product-tee.png',
    category: 'Tops',
    description: 'Ultra-soft 300 GSM cotton. Drop-shoulder cut for a premium oversized silhouette. Reinforced ribbed collar stays crisp wash after wash. Finished with a raw hem at the cuff.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: { XS: 12, S: 8, M: 4, L: 0, XL: 6 },
  },
  'technical-cargo-pant': {
    name: 'Technical Cargo Pant',
    price: '₹2,499',
    image: '/product-cargo.png',
    category: 'Bottoms',
    description: 'Engineered from a water-resistant nylon blend. Six-pocket utility design with YKK zippers. Tapered jogger fit with elasticated cuffs. Built for the urban commute.',
    sizes: ['28', '30', '32', '34', '36'],
    stock: { '28': 5, '30': 3, '32': 1, '34': 9, '36': 7 },
  },
  'minimalist-zip-hoodie': {
    name: 'Minimalist Zip Hoodie',
    price: '₹1,899',
    image: '/product-hoodie.png',
    category: 'Tops',
    description: 'Garment-dyed fleece for a worn-in, premium hand feel. Clean full-zip design with a concealed front pocket. Double-layered hood with a flat drawcord.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: { XS: 3, S: 11, M: 9, L: 7, XL: 4, XXL: 2 },
  },
  'structured-shacket': {
    name: 'Structured Shacket',
    price: '₹2,199',
    image: '/product-shacket.png',
    category: 'Outerwear',
    description: 'A shirt-jacket hybrid for transitional weather. Constructed from a woven canvas twill. Two chest pockets, snap-button front opening, and a clean unlined interior.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 6, M: 0, L: 2, XL: 8 },
  },
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCT_DATA[params.slug] ?? PRODUCT_DATA['oversized-essential-tee'];
  const [selectedSize, setSelectedSize] = useState('');
  const [accordionOpen, setAccordionOpen] = useState<string | null>('description');
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const getStockStatus = (size: string) => {
    if (!size) return null;
    const count = product.stock[size] ?? 0;
    if (count === 0) return { label: 'Out of Stock', color: '#e74c3c' };
    if (count <= 3) return { label: `Only ${count} left`, color: '#e67e22' };
    return { label: 'In Stock', color: '#27ae60' };
  };

  const stockStatus = getStockStatus(selectedSize);

  const accordions = [
    { key: 'description', label: 'Description', content: product.description },
    { key: 'details', label: 'Material & Care', content: 'Shell: 95% Cotton, 5% Elastane. Wash cold, tumble dry low. Do not bleach. Iron on low heat only.' },
    { key: 'shipping', label: 'Shipping & Returns', content: 'Free shipping on orders above ₹2000. Easy 30-day returns on unworn items with original tags attached.' },
  ];

  return (
    <div style={{ backgroundColor: '#fff', color: '#111', minHeight: '100vh', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 70px)' }} className="pdp-layout">

        {/* LEFT: Strict 1:1 Image — no borders, no shadows, flush */}
        <div style={{ position: 'sticky', top: '70px', height: 'calc(100vh - 70px)', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* RIGHT: Product Info */}
        <div style={{ padding: '60px 56px', overflowY: 'auto', maxHeight: 'calc(100vh - 70px)' }}>
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#999', marginBottom: '12px' }}>
            {product.category}
          </p>
          <h1 style={{ fontSize: '1.6rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: '16px', lineHeight: 1.2 }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '40px', color: '#111' }}>
            {product.price}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Size</label>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: '#888', textDecoration: 'underline', fontFamily: 'inherit' }}>
                Size Guide
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.sizes.map(size => {
                const count = product.stock[size] ?? 0;
                const isOutOfStock = count === 0;
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '12px 18px',
                      border: isSelected ? '1.5px solid #111' : '1px solid #ddd',
                      background: isSelected ? '#111' : isOutOfStock ? '#fafafa' : '#fff',
                      color: isSelected ? '#fff' : isOutOfStock ? '#bbb' : '#111',
                      cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                      fontSize: '0.82rem', fontFamily: 'inherit',
                      fontWeight: 500, letterSpacing: '0.05em',
                      transition: 'all 0.15s',
                      textDecoration: isOutOfStock ? 'line-through' : 'none',
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock Indicator */}
          {stockStatus && (
            <p style={{ fontSize: '0.78rem', color: stockStatus.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '24px', fontWeight: 500 }}>
              ● {stockStatus.label}
            </p>
          )}

          {/* Add to Cart */}
          <button
            disabled={!selectedSize || (product.stock[selectedSize] ?? 0) === 0}
            onClick={() => {
              addItem({
                slug: params.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                size: selectedSize,
                quantity: 1,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            style={{
              width: '100%', padding: '18px',
              backgroundColor: selectedSize && (product.stock[selectedSize] ?? 0) > 0 
                ? (added ? '#27ae60' : '#111') 
                : '#ddd',
              color: selectedSize && (product.stock[selectedSize] ?? 0) > 0 ? '#fff' : '#999',
              border: 'none', cursor: selectedSize ? 'pointer' : 'default',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              fontWeight: 600, fontSize: '0.82rem', fontFamily: 'inherit',
              marginBottom: '16px', transition: 'background 0.2s',
            }}
          >
            {!selectedSize 
              ? 'Select a Size' 
              : (product.stock[selectedSize] ?? 0) === 0 
                ? 'Out of Stock' 
                : added ? 'Added' : 'Add to Cart'}
          </button>

          <button style={{
            width: '100%', padding: '18px',
            backgroundColor: 'transparent', color: '#111',
            border: '1px solid #ddd', cursor: 'pointer',
            textTransform: 'uppercase', letterSpacing: '0.12em',
            fontWeight: 500, fontSize: '0.82rem', fontFamily: 'inherit', marginBottom: '40px',
          }}>
            ♡ Save to Wishlist
          </button>

          {/* Accordion Sections */}
          <div style={{ borderTop: '1px solid #eaeaea' }}>
            {accordions.map(acc => (
              <div key={acc.key} style={{ borderBottom: '1px solid #eaeaea' }}>
                <button
                  onClick={() => setAccordionOpen(accordionOpen === acc.key ? null : acc.key)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer',
                    textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.78rem',
                    fontWeight: 600, fontFamily: 'inherit', color: '#111',
                  }}
                >
                  {acc.label}
                  <span style={{ fontSize: '1rem', fontWeight: 300, transition: 'transform 0.2s', transform: accordionOpen === acc.key ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </button>
                {accordionOpen === acc.key && (
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.8', paddingBottom: '20px' }}>
                    {acc.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
