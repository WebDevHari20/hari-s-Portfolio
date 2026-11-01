import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════
   Hero Section — Animated Neural Network
   ═══════════════════════════════════════ */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initNodes = () => {
      const count = Math.min(60, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.15;
            ctx.strokeStyle = `rgba(124, 92, 252, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(124, 92, 252, 0.6)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initNodes();
    draw();

    window.addEventListener('resize', () => {
      resize();
      initNodes();
    });

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated Neural Net Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Radial glow behind text */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
        className="animate-pulse-glow"
      />

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 800,
          padding: '0 24px',
        }}
      >
        {/* Status badge */}
        <div
          className="animate-fade-in-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0, 229, 195, 0.08)',
            border: '1px solid rgba(0, 229, 195, 0.2)',
            marginBottom: 32,
            animationDelay: '0.1s',
            opacity: 0,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent-secondary)',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--accent-secondary)',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent-secondary)' }}>
            Open to opportunities
          </span>
        </div>

        {/* Name */}
        <h1
          className="animate-fade-in-up"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: '-0.03em',
            animationDelay: '0.2s',
            opacity: 0,
          }}
        >
          Hari Bahadur{' '}
          <span className="gradient-text">Narzary</span>
        </h1>

        {/* Title */}
        <p
          className="animate-fade-in-up font-mono"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            marginBottom: 16,
            animationDelay: '0.35s',
            opacity: 0,
          }}
        >
          Generative AI Engineer
        </p>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up"
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'var(--text-muted)',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.7,
            animationDelay: '0.5s',
            opacity: 0,
          }}
        >
          Building intelligent systems with LLMs, RAG pipelines, multi-agent architectures,
          and production-grade ML workflows.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up"
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            animationDelay: '0.65s',
            opacity: 0,
          }}
        >
          <button
            className="glow-btn"
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
            View Projects
          </button>
          <button
            className="ghost-btn"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
            Get in Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-fade-in"
          style={{
            position: 'absolute',
            bottom: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            animationDelay: '1.2s',
            opacity: 0,
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 32,
              background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
