"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ARENA][GLOBAL_ERROR]', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        margin: 0,
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
          maxWidth: '550px',
          padding: '3rem 2rem',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>⚡</div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#DFFE00', fontWeight: '700' }}>
            The Arena Pimpri
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            A temporary connection reset occurred. Click below to reload the luxury residence portal.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => reset()}
              style={{
                background: '#DFFE00',
                color: '#000',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.88rem'
              }}
            >
              🔄 Reload
            </button>
            <a
              href="https://wa.me/917744009295?text=Hi,%20I%20am%20inquiring%20about%20The%20Arena%20Pimpri%20residences."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#fff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                fontWeight: '700',
                textDecoration: 'none',
                fontSize: '0.88rem'
              }}
            >
              💬 WhatsApp Desk
            </a>
            <Link
              href="/"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '0.88rem'
              }}
            >
              🏠 Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
