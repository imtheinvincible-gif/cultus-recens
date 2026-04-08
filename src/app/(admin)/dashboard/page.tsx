"use client";
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Link from 'next/link';

const CHART_DATA = [
  { month: 'Oct', revenue: 42000 },
  { month: 'Nov', revenue: 68000 },
  { month: 'Dec', revenue: 95000 },
  { month: 'Jan', revenue: 71000 },
  { month: 'Feb', revenue: 88000 },
  { month: 'Mar', revenue: 119000 },
  { month: 'Apr', revenue: 142500 },
];

const NAV = [
  { label: 'Overview', href: '/dashboard', active: true },
  { label: 'Inventory CRUD', href: '/dashboard/inventory', active: false },
  { label: 'Order Management', href: '#', active: false },
  { label: 'Customers', href: '#', active: false },
];

export default function AdminSalesDashboard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{ backgroundColor: '#111', color: '#fff', padding: '40px 28px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '1rem', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid #333' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#fff', display: 'block', marginBottom: '4px' }}>← Store</Link>
          <span style={{ color: '#888', fontSize: '0.72rem', letterSpacing: '0.12em' }}>CR Admin Panel</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NAV.map(n => (
            <Link key={n.label} href={n.href} style={{
              color: n.active ? '#fff' : '#666',
              textTransform: 'uppercase', fontSize: '0.78rem', textDecoration: 'none',
              letterSpacing: '0.08em', fontWeight: n.active ? 600 : 400,
              padding: '12px 16px', backgroundColor: n.active ? '#222' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid #333' }}>
          <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.08em', fontFamily: 'inherit' }}>
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ padding: '48px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontWeight: 600 }}>Sales Dashboard</h1>
            <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '6px' }}>April 2026 · MTD Performance</p>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#666', border: '1px solid #e0e0e0', padding: '10px 20px', backgroundColor: '#fff' }}>
            Administrator
          </div>
        </header>

        {/* KPI Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Total Revenue (MTD)', value: '₹1,42,500', delta: '+14.5% from last month', up: true },
            { label: 'Daily Active Users', value: '1,804', delta: '+3.2% from yesterday', up: true },
            { label: 'Conversion Rate', value: '3.8%', delta: '-0.2% from last week', up: false },
          ].map(kpi => (
            <div key={kpi.label} style={{ backgroundColor: '#fff', padding: '28px', border: '1px solid #eaeaea' }}>
              <p style={{ color: '#999', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>{kpi.label}</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 300, margin: '0 0 10px' }}>{kpi.value}</h2>
              <p style={{ color: kpi.up ? '#27ae60' : '#e74c3c', fontSize: '0.78rem', margin: 0, fontWeight: 500 }}>
                {kpi.up ? '↑' : '↓'} {kpi.delta}
              </p>
            </div>
          ))}
        </section>

        {/* Chart + Alerts Row */}
        <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>

          {/* Real Recharts Line Chart — FIX #6 */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '32px' }}>
            <h3 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '28px', fontWeight: 600 }}>
              Monthly Revenue Trend (₹)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#999', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#999', fontFamily: 'Inter' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ border: '1px solid #eaeaea', borderRadius: 0, fontFamily: 'Inter', fontSize: 12 }}
                />
                <Line
                  type="monotone" dataKey="revenue"
                  stroke="#111" strokeWidth={2}
                  dot={{ fill: '#111', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#111' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Low Stock Alerts */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '28px', fontWeight: 600 }}>
              ⚠ Low Stock Alerts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { name: 'Oversized Tee (Onyx) / M', count: 4 },
                { name: 'Cargo Pant / Size 32', count: 1 },
                { name: 'Structured Shacket / M', count: 0 },
              ].map(item => (
                <li key={item.name} style={{ fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ color: '#444' }}>{item.name}</span>
                  <span style={{
                    fontWeight: 600, fontSize: '0.75rem', padding: '4px 10px',
                    backgroundColor: item.count === 0 ? '#fef2f2' : '#fffbeb',
                    color: item.count === 0 ? '#e74c3c' : '#d97706',
                    letterSpacing: '0.05em',
                  }}>
                    {item.count === 0 ? 'OUT OF STOCK' : `${item.count} left`}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/dashboard/inventory" style={{
              marginTop: 'auto', paddingTop: '24px', fontSize: '0.78rem', color: '#111',
              textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em',
              fontWeight: 500, borderTop: '1px solid #f0f0f0', display: 'block',
            }}>
              Manage Inventory →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
