"use client";
import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  
  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice = parseInt(item.price.replace(/\\D/g, ''));
    return acc + (numericPrice * item.quantity);
  }, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfcfc', color: '#111', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '80px' }} className="checkout-layout">

        {/* LEFT: Forms */}
        <div>
          <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '48px', fontWeight: 600 }}>Checkout</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* 1. Shipping */}
            <section>
              <div style={{ borderBottom: '1px solid #111', paddingBottom: '12px', marginBottom: '28px' }}>
                <h3 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: 600 }}>1. Shipping Address</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input type="text" placeholder="First Name" autoComplete="given-name"
                  style={{ padding: '16px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem', transition: 'border 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
                <input type="text" placeholder="Last Name" autoComplete="family-name"
                  style={{ padding: '16px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
                <input type="text" placeholder="Street Address" autoComplete="street-address"
                  style={{ gridColumn: 'span 2', padding: '16px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
                <input type="text" placeholder="City" autoComplete="address-level2"
                  style={{ padding: '16px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
                <input type="text" placeholder="Postal Code" autoComplete="postal-code"
                  style={{ padding: '16px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>
            </section>

            {/* 2. Payment — Stripe Mockup */}
            <section>
              <div style={{ borderBottom: '1px solid #111', paddingBottom: '12px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: 600 }}>2. Payment — Secure Checkout</h3>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Powered by Stripe" style={{ height: '18px', opacity: 0.4 }} />
              </div>

              <div style={{ padding: '28px', border: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#999', marginBottom: '10px', letterSpacing: '0.08em' }}>Card number</label>
                  {/* autoComplete="off" prevents browser overlapping dropdown on payment fields */}
                  <input type="text" placeholder="1234 5678 9012 3456" autoComplete="cc-number"
                    maxLength={19}
                    style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem', letterSpacing: '0.08em' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#111'}
                    onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#999', marginBottom: '10px', letterSpacing: '0.08em' }}>Expiry date</label>
                    <input type="text" placeholder="MM / YY" autoComplete="cc-exp"
                      style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                      onFocus={e => e.currentTarget.style.borderColor = '#111'}
                      onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#999', marginBottom: '10px', letterSpacing: '0.08em' }}>Security code (CVC)</label>
                    <input type="text" placeholder="CVC" autoComplete="cc-csc" maxLength={4}
                      style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                      onFocus={e => e.currentTarget.style.borderColor = '#111'}
                      onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>
              </div>
            </section>

            <button style={{
              backgroundColor: '#111', color: '#fff', padding: '20px',
              textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600,
              fontSize: '0.82rem', border: 'none', cursor: cartItems.length > 0 ? 'pointer' : 'not-allowed', width: '100%',
              fontFamily: 'inherit', transition: 'background 0.2s',
              opacity: cartItems.length > 0 ? 1 : 0.5
            }}
              disabled={cartItems.length === 0}
              onMouseEnter={e => { if (cartItems.length > 0) e.currentTarget.style.backgroundColor = '#333' }}
              onMouseLeave={e => { if (cartItems.length > 0) e.currentTarget.style.backgroundColor = '#111' }}
            >
              Pay ₹{subtotal.toLocaleString('en-IN')} Securely
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: '-24px' }}>
              🔒 256-bit SSL encrypted. Your data is never stored.
            </p>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div style={{ padding: '32px', backgroundColor: '#fff', border: '1px solid #eaeaea', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '28px', borderBottom: '1px solid #eaeaea', paddingBottom: '20px', fontWeight: 600 }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            {!isMounted ? (
              <p style={{ color: '#888', fontSize: '0.8rem' }}>Loading cart...</p>
            ) : cartItems.length === 0 ? (
              <p style={{ color: '#888', fontSize: '0.8rem' }}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '72px', height: '72px', backgroundColor: '#f5f5f5', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.82rem', fontWeight: 500, textTransform: 'uppercase', margin: '0 0 4px' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#888', margin: '0 0 8px' }}>Size: {item.size} {item.quantity > 1 ? `(x${item.quantity})` : ''}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '0.85rem', margin: 0 }}>{item.price}</p>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888' }}>Subtotal</span><span>₹{isMounted ? subtotal.toLocaleString('en-IN') : 0}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888' }}>Shipping</span><span style={{ color: '#27ae60' }}>Complimentary</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #111', paddingTop: '16px', marginTop: '8px', fontSize: '1rem', fontWeight: 600 }}>
              <span style={{ textTransform: 'uppercase' }}>Total</span><span>₹{isMounted ? subtotal.toLocaleString('en-IN') : 0}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
