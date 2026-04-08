"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────
interface ProductVariation { size: string; stock: number; }
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  variations: ProductVariation[];
  image: string;
}

function computeStatus(variations: ProductVariation[]): 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' {
  const total = variations.reduce((s, v) => s + v.stock, 0);
  if (total === 0) return 'OUT_OF_STOCK';
  if (total <= 5) return 'LOW_STOCK';
  return 'IN_STOCK';
}

// ─── Seed Data ─────────────────────────────────────────────
const SEED: Product[] = [
  { id: '1', name: 'Oversized Essential Tee', category: 'Tops', price: 999, image: '/product-tee.png', variations: [{ size: 'XS', stock: 12 }, { size: 'S', stock: 8 }, { size: 'M', stock: 4 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 6 }] },
  { id: '2', name: 'Technical Cargo Pant', category: 'Bottoms', price: 2499, image: '/product-cargo.png', variations: [{ size: '28', stock: 5 }, { size: '30', stock: 1 }, { size: '32', stock: 0 }, { size: '34', stock: 9 }] },
  { id: '3', name: 'Minimalist Zip Hoodie', category: 'Tops', price: 1899, image: '/product-hoodie.png', variations: [{ size: 'S', stock: 11 }, { size: 'M', stock: 9 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 4 }] },
  { id: '4', name: 'Structured Shacket', category: 'Outerwear', price: 2199, image: '/product-shacket.png', variations: [{ size: 'S', stock: 6 }, { size: 'M', stock: 0 }, { size: 'L', stock: 2 }, { size: 'XL', stock: 8 }] },
];

// ─── Empty form template ────────────────────────────────────
const EMPTY_FORM = { name: '', category: 'Tops', price: '', imageUrl: '', variations: [{ size: 'S', stock: 0 }, { size: 'M', stock: 0 }, { size: 'L', stock: 0 }] };
const CATEGORIES = ['Tops', 'Bottoms', 'Outerwear', 'Accessories'];

// ─── Status Badge ────────────────────────────────────────────
function StatusBadge({ status }: { status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' }) {
  const cfg = {
    IN_STOCK: { bg: '#e8f8ee', color: '#1a7a3a', label: 'In Stock' },
    LOW_STOCK: { bg: '#fff8e1', color: '#c05c00', label: 'Low Stock' },
    OUT_OF_STOCK: { bg: '#fce8e8', color: '#c0392b', label: 'Out of Stock' },
  }[status];
  return (
    <span style={{ backgroundColor: cfg.bg, color: cfg.color, padding: '5px 12px', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
      {cfg.label}
    </span>
  );
}

// ─── Modal ────────────────────────────────────────────────────
function ProductModal({
  mode, initial, onSave, onClose
}: {
  mode: 'add' | 'edit';
  initial: typeof EMPTY_FORM | null;
  onSave: (data: typeof EMPTY_FORM) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<typeof EMPTY_FORM>(initial ?? { ...EMPTY_FORM, variations: [{ size: 'S', stock: 0 }, { size: 'M', stock: 0 }, { size: 'L', stock: 0 }] });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => setForm(f => ({ ...f, imageUrl: e.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const setField = (field: string, value: string | number) => setForm(f => ({ ...f, [field]: value }));
  const setVariation = (idx: number, key: 'size' | 'stock', value: string | number) => {
    setForm(f => {
      const vars = [...f.variations];
      vars[idx] = { ...vars[idx], [key]: key === 'stock' ? Number(value) : value };
      return { ...f, variations: vars };
    });
  };
  const addVariation = () => setForm(f => ({ ...f, variations: [...f.variations, { size: '', stock: 0 }] }));
  const removeVariation = (idx: number) => setForm(f => ({ ...f, variations: f.variations.filter((_, i) => i !== idx) }));

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', border: '1px solid #e0e0e0',
    outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem',
    backgroundColor: '#fff', color: '#111',
  };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginBottom: '8px' };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '0' }}>
        {/* Modal Header */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: 0 }}>
            {mode === 'add' ? '+ Add New Product' : '✎ Edit Product'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: '#999', lineHeight: 1 }}>×</button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Name */}
            <div>
              <label style={labelStyle}>Product Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => setField('name', e.target.value)} placeholder="e.g. Oversized Essential Tee"
                onFocus={e => e.currentTarget.style.borderColor = '#111'}
                onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} />
            </div>

            {/* Category + Price */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Category *</label>
                <select value={form.category} onChange={e => setField('category', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Price (₹) *</label>
                <input type="number" style={inputStyle} value={form.price} onChange={e => setField('price', e.target.value)} placeholder="1999"
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} />
              </div>
            </div>

            {/* Product Photo Upload */}
            <div>
              <label style={labelStyle}>Product Photo</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleImageFile(f); }}
                style={{
                  border: dragOver ? '2px dashed #111' : '2px dashed #e0e0e0',
                  padding: form.imageUrl ? '0' : '32px 20px',
                  textAlign: 'center', cursor: 'pointer',
                  backgroundColor: dragOver ? '#fafafa' : '#fff',
                  transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                  minHeight: form.imageUrl ? '140px' : 'auto',
                }}
              >
                {form.imageUrl ? (
                  <>
                    <Image src={form.imageUrl} alt="Preview" fill style={{ objectFit: 'contain' }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
                    >
                      <span style={{ color: '#fff', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0 }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>Change Photo</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '1.6rem', marginBottom: '8px', color: '#ccc' }}>📸</div>
                    <p style={{ fontSize: '0.78rem', color: '#999', margin: 0 }}>Click or drag & drop to upload</p>
                    <p style={{ fontSize: '0.7rem', color: '#bbb', margin: '4px 0 0' }}>PNG, JPG, WEBP up to 10MB</p>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }} />
              {/* Or enter URL */}
              <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.68rem', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Or URL:</span>
                <input
                  type="text" value={form.imageUrl.startsWith('data:') ? '' : form.imageUrl}
                  onChange={e => setField('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  style={{ flex: 1, padding: '8px 10px', border: '1px solid #e8e8e8', outline: 'none', fontSize: '0.78rem', fontFamily: 'inherit' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#111'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                />
              </div>
            </div>

            {/* Variations / Stock */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <label style={{ ...labelStyle, margin: 0 }}>Sizes & Stock Levels *</label>
                <button type="button" onClick={addVariation} style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'none', border: '1px solid #ddd', padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit', color: '#555' }}>
                  + Add Size
                </button>
              </div>

              <div style={{ border: '1px solid #e8e8e8' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: 0, backgroundColor: '#fafafa', borderBottom: '1px solid #eaeaea', padding: '10px 14px' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999' }}>Size</span>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999' }}>Stock Qty</span>
                  <span />
                </div>
                {form.variations.map((v, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: 0, borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                    <input value={v.size} onChange={e => setVariation(idx, 'size', e.target.value)} placeholder="M"
                      style={{ border: 'none', borderRight: '1px solid #f0f0f0', padding: '12px 14px', outline: 'none', fontSize: '0.88rem', fontFamily: 'inherit', width: '100%' }} />
                    <input type="number" min={0} value={v.stock} onChange={e => setVariation(idx, 'stock', e.target.value)}
                      style={{ border: 'none', borderRight: '1px solid #f0f0f0', padding: '12px 14px', outline: 'none', fontSize: '0.88rem', fontFamily: 'inherit', width: '100%' }} />
                    <button onClick={() => removeVariation(idx)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc', fontSize: '1.2rem', padding: '12px' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e74c3c'}
                      onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '20px 32px', borderTop: '1px solid #eaeaea', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '12px 28px', background: 'none', border: '1px solid #ddd', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#666' }}>
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.name.trim() || !form.price) { alert('Please fill in all required fields.'); return; }
              onSave(form);
            }}
            style={{ padding: '12px 32px', backgroundColor: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            {mode === 'add' ? 'Add Product' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────
function DeleteConfirm({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', fontWeight: 600 }}>Delete Product</p>
        <p style={{ color: '#666', fontSize: '0.88rem', marginBottom: '32px' }}>
          Are you sure you want to delete <strong>&quot;{name}&quot;</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={onCancel} style={{ padding: '12px 28px', background: 'none', border: '1px solid #ddd', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.8rem' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '12px 28px', backgroundColor: '#c0392b', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600 }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────
export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>(SEED);
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; product: Product | null } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const filtered = products.filter(p => {
    const matchCat = filterCat === 'All' || p.category === filterCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSave = (form: typeof EMPTY_FORM) => {
    if (modal?.mode === 'add') {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        variations: form.variations,
        image: '/product-tee.png',
      };
      setProducts(p => [...p, newProduct]);
      showToast(`✓ "${form.name}" added successfully`);
    } else if (modal?.product) {
      setProducts(p => p.map(pr => pr.id === modal.product!.id
        ? { ...pr, name: form.name, category: form.category, price: Number(form.price), variations: form.variations }
        : pr));
      showToast(`✓ "${form.name}" updated`);
    }
    setModal(null);
  };

  const handleDelete = (product: Product) => { setDeleteTarget(product); };
  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProducts(p => p.filter(pr => pr.id !== deleteTarget.id));
    showToast(`✓ "${deleteTarget.name}" deleted`);
    setDeleteTarget(null);
  };

  const NAV_ITEMS = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'Inventory', href: '/dashboard/inventory', active: true },
    { label: 'Orders', href: '#' },
    { label: 'Customers', href: '#' },
  ];

  const totalStock = products.reduce((s, p) => s + p.variations.reduce((a, v) => a + v.stock, 0), 0);
  const outOfStock = products.filter(p => computeStatus(p.variations) === 'OUT_OF_STOCK').length;
  const lowStock = products.filter(p => computeStatus(p.variations) === 'LOW_STOCK').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{ backgroundColor: '#111', color: '#fff', padding: '40px 28px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid #2a2a2a' }}>
          <Link href="/" style={{ display: 'block', color: '#888', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', marginBottom: '8px' }}>← Store</Link>
          <span style={{ color: '#fff', fontSize: '1rem', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase' }}>CR Admin</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_ITEMS.map(n => (
            <Link key={n.label} href={n.href} style={{
              color: n.active ? '#fff' : '#666', textDecoration: 'none',
              textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.08em',
              fontWeight: n.active ? 600 : 400, padding: '12px 16px',
              backgroundColor: n.active ? '#222' : 'transparent',
            }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', borderTop: '1px solid #222', paddingTop: '24px' }}>
          <a href="/api/auth/logout" style={{ color: '#555', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}>Log Out</a>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ padding: '48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px', fontWeight: 600 }}>Inventory Management</h1>
            <p style={{ color: '#999', fontSize: '0.8rem' }}>{products.length} products · {totalStock} units in stock</p>
          </div>
          <button onClick={() => setModal({ mode: 'add', product: null })} style={{
            backgroundColor: '#111', color: '#fff', padding: '14px 28px',
            border: 'none', cursor: 'pointer', textTransform: 'uppercase',
            letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'inherit',
          }}>
            + Add Product
          </button>
        </div>

        {/* KPI Summary Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Products', value: products.length, color: '#111' },
            { label: 'Low Stock Items', value: lowStock, color: '#c05c00' },
            { label: 'Out of Stock', value: outOfStock, color: '#c0392b' },
          ].map(kpi => (
            <div key={kpi.label} style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.73rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 300, color: kpi.color }}>{kpi.value}</span>
            </div>
          ))}
        </div>

        {/* Filters Row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center' }}>
          <input
            type="text" placeholder="Search products..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '12px 16px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
            onFocus={e => e.currentTarget.style.borderColor = '#111'}
            onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
          />
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            style={{ padding: '12px 16px', border: '1px solid #e0e0e0', outline: 'none', fontFamily: 'inherit', fontSize: '0.85rem', cursor: 'pointer', backgroundColor: '#fff' }}>
            <option>All</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eaeaea', backgroundColor: '#fafafa' }}>
                {['Product Name', 'Category', 'Price', 'Sizes / Stock', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.72rem', color: '#888' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: '0.85rem' }}>
                  No products found.
                  <button onClick={() => setModal({ mode: 'add', product: null })} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#111', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                    Add the first product →
                  </button>
                </td></tr>
              )}
              {filtered.map((product, idx) => {
                const status = computeStatus(product.variations);
                const totalQty = product.variations.reduce((s, v) => s + v.stock, 0);
                return (
                  <tr key={product.id} style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #f0f0f0' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}>
                    <td style={{ padding: '18px 20px', fontWeight: 600 }}>{product.name}</td>
                    <td style={{ padding: '18px 20px', color: '#888' }}>{product.category}</td>
                    <td style={{ padding: '18px 20px', color: '#555' }}>₹{product.price.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '18px 20px', color: '#888' }}>
                      {product.variations.length} sizes · {totalQty} units
                      {status === 'LOW_STOCK' && <span style={{ marginLeft: '8px', color: '#c05c00', fontSize: '0.72rem' }}>↓</span>}
                    </td>
                    <td style={{ padding: '18px 20px' }}><StatusBadge status={status} /></td>
                    <td style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <button
                          onClick={() => setModal({ mode: 'edit', product })}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111', fontWeight: 500, fontFamily: 'inherit', fontSize: '0.82rem', textDecoration: 'underline', padding: 0 }}>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', fontFamily: 'inherit', fontSize: '0.82rem', textDecoration: 'underline', padding: 0 }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '32px', right: '32px',
          backgroundColor: '#111', color: '#fff', padding: '16px 24px',
          fontSize: '0.82rem', zIndex: 2000, animation: 'fadeIn 0.2s ease',
          letterSpacing: '0.04em', boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}>
          {toast}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <ProductModal
          mode={modal.mode}
          initial={modal.product ? {
            name: modal.product.name,
            category: modal.product.category,
            price: String(modal.product.price),
            imageUrl: modal.product.image || '',
            variations: modal.product.variations,
          } : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <DeleteConfirm
          name={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
