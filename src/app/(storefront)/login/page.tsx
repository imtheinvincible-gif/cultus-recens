"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/customer-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/account');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate registration - in production this would create a DB record
    await new Promise(r => setTimeout(r, 800));
    // Store basic session
    document.cookie = `cr_user=${encodeURIComponent(JSON.stringify({ email, name }))}; path=/; max-age=${60*60*24*7}`;
    setLoading(false);
    router.push('/account');
    router.refresh();
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#f9f9f9', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: '460px', padding: '0 24px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ color: '#111', fontSize: '1.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>
              Cultus Recens
            </h1>
          </Link>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eaeaea', marginBottom: '40px' }}>
          {(['login', 'register'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setMode(tab); setError(''); }}
              style={{
                flex: 1, padding: '16px', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: '0.78rem', textTransform: 'uppercase',
                letterSpacing: '0.1em', fontFamily: 'inherit', fontWeight: mode === tab ? 600 : 400,
                color: mode === tab ? '#111' : '#999',
                borderBottom: mode === tab ? '2px solid #111' : '2px solid transparent',
                marginBottom: '-1px', transition: 'all 0.2s',
              }}
            >
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid #eaeaea' }}>
          {mode === 'login' ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: '8px' }}>Email</label>
                <input
                  type="email" required autoComplete="email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', fontFamily: 'inherit', transition: 'border 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: '8px' }}>Password</label>
                <input
                  type="password" required autoComplete="current-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', fontFamily: 'inherit', transition: 'border 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>
              {error && <p style={{ color: '#e74c3c', fontSize: '0.78rem', padding: '12px 0' }}>✕ {error}</p>}
              <button type="submit" disabled={loading} style={{
                padding: '16px', backgroundColor: loading ? '#ddd' : '#111',
                color: loading ? '#999' : '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600,
                fontSize: '0.8rem', fontFamily: 'inherit', transition: 'background 0.2s',
              }}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              {/* Demo hint */}
              <p style={{ fontSize: '0.72rem', color: '#bbb', textAlign: 'center' }}>
                Demo: user@example.com / password123
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: '8px' }}>Full Name</label>
                <input
                  type="text" required autoComplete="name"
                  value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', fontFamily: 'inherit' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: '8px' }}>Email</label>
                <input
                  type="email" required autoComplete="email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', fontFamily: 'inherit' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: '8px' }}>Password</label>
                <input
                  type="password" required autoComplete="new-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', fontFamily: 'inherit' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>
              {error && <p style={{ color: '#e74c3c', fontSize: '0.78rem' }}>✕ {error}</p>}
              <button type="submit" disabled={loading} style={{
                padding: '16px', backgroundColor: loading ? '#ddd' : '#111',
                color: loading ? '#999' : '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600,
                fontSize: '0.8rem', fontFamily: 'inherit',
              }}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#888', fontSize: '0.75rem' }}>
          <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>← Continue Shopping</Link>
        </p>
      </div>
    </div>
  );
}
