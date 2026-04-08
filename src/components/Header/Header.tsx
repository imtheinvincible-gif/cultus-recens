"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const NAV_LINKS = [
    { label: 'All Products', href: '/products' },
    { label: 'Tops', href: '/products?category=Tops' },
    { label: 'Bottoms', href: '/products?category=Bottoms' },
    { label: 'Outerwear', href: '/products?category=Outerwear' },
  ];

  return (
    <>
      {/* Announcement Banner (Marquee) */}
      <div className="announcement-banner">
        <Link href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="marquee-track">
            
            <div className="marquee-content">
              <span>✨ FREE SHIPPING ON ALL ORDERS OVER ₹2000</span>
              <span>•</span>
              <span>🔥 EXPLORE THE NEW SS 2026 COLLECTION</span>
              <span>•</span>
              <span>⚡ GET FLAT 10% OFF ON APP PURCHASE. DOWNLOAD APP NOW!</span>
              <span>•</span>
            </div>

            <div className="marquee-content" aria-hidden="true">
              <span>✨ FREE SHIPPING ON ALL ORDERS OVER ₹2000</span>
              <span>•</span>
              <span>🔥 EXPLORE THE NEW SS 2026 COLLECTION</span>
              <span>•</span>
              <span>⚡ GET FLAT 10% OFF ON APP PURCHASE. DOWNLOAD APP NOW!</span>
              <span>•</span>
            </div>

          </div>
        </Link>
      </div>

      {/* Main Header */}
      <header style={{
        backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0',
        position: 'sticky', top: 0, zIndex: 500,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}>
        {/* Top Row: Logo left, utility icons right */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 48px', height: '72px', position: 'relative',
        }}>
          {/* Left — Logo + Brand Name */}
          <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
            <Link href="/" style={{
              display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: '#111'
            }}>
              <Image
                src="/logo.png"
                alt="Cultus Recens Logo"
                width={48}
                height={48}
                style={{ objectFit: 'contain' }}
                priority
              />
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Cultus Recens
              </span>
            </Link>
          </div>

          {/* Right — utility icons */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', width: '300px', justifyContent: 'flex-end' }}>
            <button onClick={() => setSearchOpen(s => !s)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              color: '#111',
            }} title="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <Link href="/login" title="Account" style={{ color: '#111', display: 'flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link href="/cart" title="Cart" style={{ color: '#111', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {isMounted && cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-10px',
                  backgroundColor: '#111', color: '#fff',
                  borderRadius: '50%', width: '16px', height: '16px',
                  fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700,
                }}>{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Row — centered navigation */}
        <nav style={{
          display: 'flex', justifyContent: 'center', gap: '48px',
          padding: '0 48px 16px', borderTop: '1px solid #f5f5f5',
        }}>
          {NAV_LINKS.map(link => (
            <Link key={link.label} href={link.href} style={{
              textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem',
              fontWeight: 500, textDecoration: 'none', color: '#111',
              transition: 'opacity 0.2s', paddingTop: '14px',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.45')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Search Drawer */}
      {searchOpen && (
        <div style={{
          position: 'fixed', top: '130px', left: 0, right: 0,
          backgroundColor: '#fff', padding: '20px 48px',
          borderBottom: '1px solid #eaeaea', zIndex: 400,
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
            <input
              autoFocus type="text" value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              style={{
                flex: 1, padding: '14px 16px', border: '1px solid #111',
                outline: 'none', fontSize: '0.95rem', fontFamily: 'inherit',
              }}
            />
            <button type="submit" style={{
              padding: '14px 32px', backgroundColor: '#111', color: '#fff',
              border: 'none', cursor: 'pointer', textTransform: 'uppercase',
              letterSpacing: '0.08em', fontSize: '0.8rem', fontFamily: 'inherit',
            }}>Go</button>
            <button type="button" onClick={() => setSearchOpen(false)} style={{
              background: 'none', border: '1px solid #eaeaea', padding: '14px 16px',
              cursor: 'pointer', color: '#888', fontSize: '1.2rem',
            }}>✕</button>
          </form>
        </div>
      )}
    </>
  );
}
