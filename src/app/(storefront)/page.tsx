"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PRODUCTS = [
  { id: 'oversized-essential-tee', name: 'Oversized Essential Tee', price: '₹999', image: '/product-tee.png', category: 'Tops' },
  { id: 'technical-cargo-pant', name: 'Technical Cargo Pant', price: '₹2,499', image: '/product-cargo.png', category: 'Bottoms' },
  { id: 'minimalist-zip-hoodie', name: 'Minimalist Zip Hoodie', price: '₹1,899', image: '/product-hoodie.png', category: 'Tops' },
  { id: 'structured-shacket', name: 'Structured Shacket', price: '₹2,199', image: '/product-shacket.png', category: 'Outerwear' },
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <Link href={`/products/${product.id}`} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
      <div style={{ width: '100%', aspectRatio: '1 / 1', backgroundColor: '#f5f5f5', overflow: 'hidden', position: 'relative' }} className="product-card-img">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} className="product-img" />
        <div className="quick-add-overlay">
          <span style={{ backgroundColor: '#111', color: '#fff', padding: '12px 28px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', fontWeight: 600 }}>Quick Add</span>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '16px 8px 0' }}>
        <p style={{ fontSize: '0.68rem', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{product.category}</p>
        <h3 style={{ fontSize: '0.82rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{product.name}</h3>
        <p style={{ fontSize: '0.85rem', color: '#555' }}>{product.price}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#fff', color: '#111', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* ── HERO — Video Background Banner ── */}
      <section style={{ position: 'relative', width: '100%', height: 'calc(100vh - 130px)', minHeight: '520px', overflow: 'hidden', backgroundColor: '#111' }}>
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        {/* Subtle dark vignette at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
          zIndex: 10
        }} />
        
        {/* Brand Overlay Tagline */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', zIndex: 20, color: '#fff',
          padding: '0 24px'
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
            Cultus Recens
          </h2>
          <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.08em', maxWidth: '640px', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.4)', textTransform: 'uppercase' }}>
            Clothing that erases noise. Built for the contemporary human.
          </p>
        </div>
      </section>

      {/* ── COLLECTION LABEL — Italian Colony style: text just below hero ── */}
      <div style={{ textAlign: 'center', padding: '56px 48px 0' }}>
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#aaa', marginBottom: '10px' }}>SS 2026 — Arriving Now</p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 32px' }}>
          New Arrivals
        </h1>
      </div>

      {/* ── PRODUCT GRID — 4 col like Italian Colony ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="product-grid-responsive">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* View All CTA — IC style: centered, solid black pill */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/products" style={{
            display: 'inline-block', backgroundColor: '#111', color: '#fff',
            padding: '16px 56px', textTransform: 'uppercase',
            letterSpacing: '0.14em', fontWeight: 600, fontSize: '0.78rem',
            textDecoration: 'none',
          }}>View All</Link>
        </div>
      </section>

      {/* ── THREE-UP EDITORIAL BANNER — split image grid ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', height: '420px' }}>
          {[
            { label: 'Tops', href: '/products?category=Tops', img: '/product-tee.png', caption: 'From ₹999' },
            { label: 'Bottoms', href: '/products?category=Bottoms', img: '/product-cargo.png', caption: 'From ₹1,999' },
            { label: 'Outerwear', href: '/products?category=Outerwear', img: '/product-shacket.png', caption: 'From ₹2,199' },
          ].map(cat => (
            <Link key={cat.label} href={cat.href} style={{ position: 'relative', overflow: 'hidden', display: 'block', backgroundColor: '#f0f0f0', textDecoration: 'none' }}>
              <Image src={cat.img} alt={cat.label} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                className="product-img" />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
              }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: '#fff' }}>
                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.75, marginBottom: '4px' }}>{cat.caption}</p>
                <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, margin: 0 }}>{cat.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP — IC style dark editorial band ── */}
      <section style={{ backgroundColor: '#111', color: '#fff', padding: '80px 48px', textAlign: 'center', marginBottom: '0' }}>
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '20px' }}>The Cultus Philosophy</p>
        <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 2.5rem)', fontWeight: 300, letterSpacing: '0.04em', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.5 }}>
          &ldquo;Clothing that erases noise. Built for the contemporary human.&rdquo;
        </h2>
        <Link href="/products" style={{
          color: '#fff', textDecoration: 'none', textTransform: 'uppercase',
          letterSpacing: '0.12em', fontSize: '0.78rem',
          borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '4px',
        }}>
          Explore The Collection →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #eaeaea', padding: '80px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
        <div>
          {/* Use the CR logo in footer */}
          <Image src="/logo.png" alt="Cultus Recens" width={60} height={60} style={{ objectFit: 'contain', marginBottom: '16px' }} />
          <p style={{ color: '#888', fontSize: '0.82rem', lineHeight: 1.7 }}>Contemporary high-end streetwear. Modern wear, defined.</p>
        </div>
        <div>
          <h4 style={{ textTransform: 'uppercase', marginBottom: '20px', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600 }}>Customer Care</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.82rem', color: '#888', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Shipping & Returns', 'Size Guide', 'Contact Us', 'FAQ'].map(i => (
              <li key={i}><a href="#" style={{ color: '#888', textDecoration: 'none' }}>{i}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ textTransform: 'uppercase', marginBottom: '20px', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600 }}>Join The Cultus</h4>
          <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '16px' }}>Exclusive drops and early access.</p>
          <div style={{ display: 'flex', borderBottom: '1px solid #111' }}>
            <input type="email" placeholder="Your email" autoComplete="email"
              style={{ border: 'none', padding: '12px 0', flex: 1, outline: 'none', fontSize: '0.85rem', fontFamily: 'inherit' }} />
            <button style={{ background: 'none', border: 'none', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.08em' }}>
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
