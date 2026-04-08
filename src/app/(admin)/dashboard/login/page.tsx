"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push(redirect);
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

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#111', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 24px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ color: '#fff', fontSize: '1.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>
              Cultus Recens
            </h1>
          </Link>
          <p style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '8px' }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: '#1a1a1a', padding: '48px', border: '1px solid #2a2a2a' }}>
          <h2 style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', fontWeight: 600 }}>
            Sign In
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#666', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@cultusrecens.com"
                style={{
                  width: '100%', padding: '14px 16px',
                  backgroundColor: '#111', border: '1px solid #333', color: '#fff',
                  outline: 'none', fontSize: '0.88rem', fontFamily: 'inherit',
                  transition: 'border 0.2s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#555'}
                onBlur={e => e.currentTarget.style.borderColor = '#333'}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#666', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '14px 16px',
                  backgroundColor: '#111', border: '1px solid #333', color: '#fff',
                  outline: 'none', fontSize: '0.88rem', fontFamily: 'inherit',
                  transition: 'border 0.2s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#555'}
                onBlur={e => e.currentTarget.style.borderColor = '#333'}
              />
            </div>

            {error && (
              <p style={{ color: '#e74c3c', fontSize: '0.78rem', padding: '12px', backgroundColor: '#2a1010', border: '1px solid #441010' }}>
                ✕ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '8px', width: '100%', padding: '16px',
                backgroundColor: loading ? '#333' : '#fff', color: '#111',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                fontWeight: 700, fontSize: '0.8rem', fontFamily: 'inherit',
                transition: 'background 0.2s',
              }}
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div style={{ marginTop: '28px', padding: '16px', backgroundColor: '#111', border: '1px solid #2a2a2a' }}>
            <p style={{ color: '#555', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Demo Credentials</p>
            <p style={{ color: '#888', fontSize: '0.78rem', fontFamily: 'monospace' }}>admin@cultusrecens.com</p>
            <p style={{ color: '#888', fontSize: '0.78rem', fontFamily: 'monospace' }}>admin123</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#444', fontSize: '0.75rem' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>← Back to Store</Link>
        </p>
      </div>
    </div>
  );
}
