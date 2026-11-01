import React from 'react';

/* ═══════════════════════════════════════
   Footer
   ═══════════════════════════════════════ */
export function Footer() {
  return (
    <footer
      style={{
        padding: '40px 24px',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
      }}
    >
      <div className="container-main">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 800,
              color: 'white',
            }}
          >
            H
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            hari.dev
          </span>
        </div>

        <p
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            marginBottom: 8,
          }}
        >
          Designed & built by Hari Bahadur Narzary
        </p>

        <p
          className="font-mono"
          style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            opacity: 0.6,
          }}
        >
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
