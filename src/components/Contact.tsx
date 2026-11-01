import React, { useState, useRef, useEffect } from 'react';

/* ═══════════════════════════════════════
   Contact Section
   ═══════════════════════════════════════ */

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/WebDevHari20',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/hari-narzary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:harinarzary22@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/harinarzary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef);

  const [form, setForm] = useState({
    contactName: '',
    contactHandle: '',
    projectLore: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contactName.trim() || !form.contactHandle.trim()) return;

    setStatus('sending');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: form.contactName,
          contactHandle: form.contactHandle,
          projectLore: form.projectLore,
          projectType: 'Gen AI Collaboration',
        }),
      });
      if (resp.ok) {
        setStatus('success');
        setForm({ contactName: '', contactHandle: '', projectLore: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '100px 0 80px', position: 'relative' }}
    >
      {/* Top divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 1,
          background: 'var(--accent-gradient)',
          opacity: 0.4,
        }}
      />

      <div className="container-main">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Left — Info */}
          <div
            className={visible ? 'animate-fade-in-up' : ''}
            style={{ opacity: visible ? undefined : 0 }}
          >
            <span className="section-label">// Contact</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginTop: 12,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: 20,
              }}
            >
              Let's build something{' '}
              <span className="gradient-text">intelligent</span>
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              Whether you have a Gen AI project idea, need help with LLM integration, or just want
              to chat about the latest in AI — I'd love to hear from you.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    padding: '8px 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {social.icon}
                  </div>
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            className={`glass-card ${visible ? 'animate-fade-in-up' : ''}`}
            style={{
              padding: 32,
              opacity: visible ? undefined : 0,
              animationDelay: '0.2s',
            }}
            onMouseEnter={() => {}} // prevent hover transform
          >
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              Send a message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    marginBottom: 6,
                    display: 'block',
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    marginBottom: 6,
                    display: 'block',
                  }}
                >
                  Email / Contact *
                </label>
                <input
                  type="text"
                  value={form.contactHandle}
                  onChange={(e) => setForm({ ...form, contactHandle: e.target.value })}
                  placeholder="you@example.com"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    marginBottom: 6,
                    display: 'block',
                  }}
                >
                  Message
                </label>
                <textarea
                  value={form.projectLore}
                  onChange={(e) => setForm({ ...form, projectLore: e.target.value })}
                  placeholder="Tell me about your project or idea..."
                  className="input-field"
                  rows={4}
                  style={{ resize: 'vertical', minHeight: 100 }}
                />
              </div>

              <button
                type="submit"
                className="glow-btn"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 8,
                  opacity: status === 'sending' ? 0.6 : 1,
                }}
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'success' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {status === 'error' && (
                <p style={{ fontSize: 13, color: '#ff6b6b', textAlign: 'center' }}>
                  Something went wrong. Please try again or email directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
