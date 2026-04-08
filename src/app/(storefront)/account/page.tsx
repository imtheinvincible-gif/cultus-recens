"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(c => c.startsWith('cr_user='));
    if (!cookie) { router.push('/login'); return; }
    try {
      const val = decodeURIComponent(cookie.split('=')[1]);
      setUser(JSON.parse(val));
    } catch { router.push('/login'); }
  }, [router]);

  const handleLogout = async () => {
    document.cookie = 'cr_user=; path=/; max-age=0';
    router.push('/');
    router.refresh();
  };

  if (!user) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
      <p>Loading...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 48px', fontFamily: "'Inter', 'Helvetica Neue', sans-serif", color: '#111' }}>
      <h1 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 600 }}>My Account</h1>
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '48px' }}>Welcome back, {user.name}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        {[
          { label: 'Orders', desc: 'Track and view your orders', href: '#', icon: '📦' },
          { label: 'Wishlist', desc: 'Your saved items', href: '#', icon: '♡' },
          { label: 'Addresses', desc: 'Manage delivery addresses', href: '#', icon: '📍' },
          { label: 'Payment Methods', desc: 'Saved cards & billing', href: '#', icon: '💳' },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{
            padding: '28px', border: '1px solid #eaeaea', textDecoration: 'none',
            color: '#111', transition: 'border 0.2s', display: 'block',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#111')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#eaeaea')}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '6px' }}>{item.label}</h3>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>{item.desc}</p>
          </Link>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.78rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Signed in as</p>
          <p style={{ fontSize: '0.88rem' }}>{user.email}</p>
        </div>
        <button onClick={handleLogout} style={{
          background: 'none', border: '1px solid #eaeaea', padding: '12px 24px',
          cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
          fontSize: '0.78rem', fontFamily: 'inherit', color: '#666', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.color = '#666'; }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
