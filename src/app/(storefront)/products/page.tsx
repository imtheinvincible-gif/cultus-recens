"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { ALL_PRODUCTS } from '@/lib/products';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial values from URL params
  const urlCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('search') || '';
  const urlSort = searchParams.get('sort') || 'recommended';

  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [activeSize, setActiveSize] = useState('');
  const [sort, setSort] = useState(urlSort);

  // Sync URL → state when URL changes (e.g. clicking nav "Tops")
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  // Update URL when category changes from sidebar
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'All') params.delete('category');
    else params.set('category', cat);
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (s: string) => {
    setSort(s);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', s);
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Filter — size filter now actually filters by availableSizes
  let filtered = ALL_PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !urlSearch || p.name.toLowerCase().includes(urlSearch.toLowerCase());
    const matchSize = !activeSize || p.availableSizes.includes(activeSize);
    return matchCat && matchSearch && matchSize;
  });

  // Sort
  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));

  const CATS = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];
  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div style={{ backgroundColor: '#fff', color: '#111', minHeight: '100vh', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* Page Header Bar */}
      <div style={{ padding: '18px 48px', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
        <h1 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: 0 }}>
          {urlSearch
            ? `Search: "${urlSearch}"`
            : activeCategory === 'All' ? 'All Products' : activeCategory}
          <span style={{ color: '#aaa', fontWeight: 400, marginLeft: '10px' }}>({filtered.length})</span>
        </h1>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {urlSearch && (
            <Link href="/products" style={{ fontSize: '0.78rem', color: '#888', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ✕ Clear search
            </Link>
          )}
          <select
            value={sort} onChange={e => handleSortChange(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'inherit', color: '#111' }}>
            <option value="recommended">Sort: Recommended</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: 'flex' }} className="plp-layout">

        {/* Sidebar */}
        <aside style={{
          width: '220px', flexShrink: 0, padding: '36px 28px 40px 40px',
          borderRight: '1px solid #eaeaea', position: 'sticky', top: '104px',
          height: 'calc(100vh - 104px)', overflowY: 'auto',
        }} className="plp-sidebar">

          <div style={{ marginBottom: '36px' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', marginBottom: '18px', color: '#aaa', fontWeight: 500 }}>Category</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CATS.map(cat => (
                <li key={cat}>
                  <button onClick={() => handleCategoryChange(cat)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontSize: '0.85rem', fontFamily: 'inherit', textAlign: 'left',
                    color: activeCategory === cat ? '#111' : '#999',
                    fontWeight: activeCategory === cat ? 600 : 400,
                    letterSpacing: '0.02em',
                  }}>
                    {cat}
                    {activeCategory === cat && activeCategory !== 'All' && (
                      <span style={{ marginLeft: '8px', fontSize: '0.7rem', color: '#bbb' }}>✓</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '36px' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', marginBottom: '18px', color: '#aaa', fontWeight: 500 }}>Size</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {SIZES.map(size => (
                <button key={size} onClick={() => setActiveSize(activeSize === size ? '' : size)} style={{
                  padding: '9px', fontFamily: 'inherit',
                  border: activeSize === size ? '1.5px solid #111' : '1px solid #e0e0e0',
                  background: activeSize === size ? '#111' : 'transparent',
                  color: activeSize === size ? '#fff' : '#111',
                  cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em',
                  transition: 'all 0.15s',
                }}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', marginBottom: '18px', color: '#aaa', fontWeight: 500 }}>Color</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[['#111111', 'Onyx', false], ['#f5f5f5', 'White', true], ['#7a7a7a', 'Grey', false], ['#c8b99a', 'Sand', false]].map(([hex, label, border]) => (
                <div key={hex as string} title={label as string} style={{
                  width: '26px', height: '26px', backgroundColor: hex as string,
                  cursor: 'pointer', border: border ? '1px solid #ddd' : '2px solid transparent',
                  outline: '2px solid transparent', transition: 'outline 0.1s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.outline = '2px solid #888')}
                  onMouseLeave={e => (e.currentTarget.style.outline = '2px solid transparent')}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <main style={{ flex: 1, padding: '40px 48px' }}>

          {/* Active filter chip */}
          {activeCategory !== 'All' && (
            <div style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#111', color: '#fff', padding: '6px 14px', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {activeCategory}
                <button onClick={() => handleCategoryChange('All')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0 0 0 4px' }}>×</button>
              </span>
            </div>
          )}

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#bbb' }}>
              <p style={{ fontSize: '1rem', marginBottom: '16px' }}>No products found.</p>
              <button onClick={() => handleCategoryChange('All')} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#888', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                Browse all products
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="product-grid-plp">
              {filtered.map(product => (
                <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#f5f5f5', overflow: 'hidden', position: 'relative' }} className="product-card-img">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} className="product-img" />
                    <div className="quick-add-overlay">
                      <span style={{ backgroundColor: '#111', color: '#fff', padding: '10px 22px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.72rem', fontWeight: 600 }}>
                        Quick Add
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: '14px' }}>
                    <p style={{ fontSize: '0.7rem', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{product.category}</p>
                    <h3 style={{ fontSize: '0.82rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{product.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#555' }}>{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
