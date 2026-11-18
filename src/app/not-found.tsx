import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#08050e',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '560px',
        padding: '3.5rem 2.5rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '0.4rem 1rem',
          background: 'rgba(223, 254, 0, 0.1)',
          color: '#DFFE00',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: '700',
          letterSpacing: '1px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(223, 254, 0, 0.3)'
        }}>
          • 404 — RESIDENCE NOT FOUND •
        </div>
        
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          lineHeight: '1.2',
          margin: '0 0 1rem 0',
          letterSpacing: '-0.5px'
        }}>
          THE ARENA <span style={{ color: '#DFFE00' }}>PIMPRI</span>
        </h1>
        
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          marginBottom: '2.5rem'
        }}>
          The exclusive residence or page you requested is not available. Explore the official sports township inventory or connect with our sales directors.
        </p>

        <div style={{
          display: 'flex',
          gap: '0.85rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/"
            style={{
              background: '#DFFE00',
              color: '#000',
              padding: '0.85rem 1.6rem',
              borderRadius: '30px',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🏠 Return Home
          </Link>

          <a
            href="https://wa.me/917744009295?text=Hi,%20I%20am%20inquiring%20about%20The%20Arena%20Pimpri%20residences."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: '#fff',
              padding: '0.85rem 1.6rem',
              borderRadius: '30px',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            💬 WhatsApp Sales
          </a>

          <Link
            href="/explore"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '0.85rem 1.6rem',
              borderRadius: '30px',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            🧭 Explore Inventory
          </Link>
        </div>

        <div style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.4)'
        }}>
          MahaRERA: PR1261012602774 • Finolex Chowk, Pimpri, Pune
        </div>
      </div>
    </div>
  );
}
