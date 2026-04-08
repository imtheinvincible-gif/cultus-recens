"use client";
import React, { useState } from 'react';

export default function AiShopper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', 
          backgroundColor: '#111', color: '#fff', borderRadius: '50%', border: 'none', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 9999, transition: 'transform 0.2s',
          transform: isOpen ? 'scale(0)' : 'scale(1)'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>✦</span>
      </button>

      <div style={{
          position: 'fixed', bottom: '30px', right: '30px', width: '380px', height: '500px',
          backgroundColor: '#fff', border: '1px solid #111', zIndex: 10000,
          display: 'flex', flexDirection: 'column',
          transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #eaeaea', backgroundColor: '#fcfcfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', margin: 0 }}>AI Stylist</h4>
            <span style={{ fontSize: '0.75rem', color: '#666' }}>Cultus Recens Intelligence</span>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#111' }}>✕</button>
        </div>
        
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem' }}>
          <div style={{ alignSelf: 'flex-start', backgroundColor: '#f4f4f4', padding: '12px 16px', maxWidth: '80%', color: '#111' }}>
            Welcome to Cultus Recens. I am your personal AI styling assistant. How can I formulate a look for you today?
          </div>
          <div style={{ alignSelf: 'flex-start', backgroundColor: '#f4f4f4', padding: '12px 16px', maxWidth: '80%', color: '#111' }}>
            Are you looking for outerwear, everyday essentials, or perhaps sizing guidance?
          </div>
          <div style={{ alignSelf: 'flex-end', backgroundColor: '#111', color: '#fff', padding: '12px 16px', maxWidth: '80%' }}>
            I need help sizing the Technical Cargo Pant.
          </div>
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #eaeaea', display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Ask about styling, fit, or drops..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.85rem', padding: '8px' }} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#111' }}>→</button>
        </div>
      </div>
    </>
  );
}
