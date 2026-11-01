import React, { useRef, useEffect, useState } from 'react';

/* ═══════════════════════════════════════
   About Section
   ═══════════════════════════════════════ */

const SKILLS = [
  { category: 'LLMs & Frameworks', items: ['GPT-4 / Claude / Gemini', 'LangChain', 'LlamaIndex', 'Hugging Face', 'vLLM / TGI'] },
  { category: 'AI Agents & RAG', items: ['CrewAI', 'AutoGen', 'Vector DBs (Pinecone, Weaviate)', 'Retrieval-Augmented Generation', 'Tool-Use Agents'] },
  { category: 'ML & Data', items: ['PyTorch', 'Transformers', 'ONNX', 'Weights & Biases', 'Data Pipelines'] },
  { category: 'Engineering', items: ['Python', 'TypeScript', 'FastAPI', 'Docker', 'AWS / GCP', 'CI/CD'] },
];

const STATS = [
  { label: 'AI Projects Shipped', value: '15+' },
  { label: 'Models Fine-tuned', value: '10+' },
  { label: 'Lines of Python', value: '50K+' },
  { label: 'Cups of Chai', value: '∞' },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '120px 0 100px',
        position: 'relative',
      }}
    >
      <div className="container-main">
        {/* Section Header */}
        <div
          className={visible ? 'animate-fade-in-up' : ''}
          style={{ opacity: visible ? undefined : 0, marginBottom: 64 }}
        >
          <span className="section-label">// About</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginTop: 12,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Engineering the future with{' '}
            <span className="gradient-text">Generative AI</span>
          </h2>
        </div>

        {/* Bio + Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Bio */}
          <div
            className={visible ? 'animate-fade-in-up' : ''}
            style={{ opacity: visible ? undefined : 0, animationDelay: '0.15s' }}
          >
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: 20,
              }}
            >
              I'm <strong style={{ color: 'var(--text-primary)' }}>Hari Bahadur Narzary</strong>, a
              Generative AI Engineer from Assam, India. I design and build production-grade AI systems 
              — from RAG-powered knowledge bases and autonomous agent pipelines to fine-tuned LLMs 
              deployed at scale.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              My focus is on turning cutting-edge research into real-world products. I believe great AI 
              engineering sits at the intersection of deep ML understanding, robust software architecture, 
              and relentless pragmatism.
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`glass-card ${visible ? 'animate-fade-in-up' : ''}`}
                style={{
                  padding: 24,
                  textAlign: 'center',
                  opacity: visible ? undefined : 0,
                  animationDelay: `${0.2 + i * 0.1}s`,
                }}
              >
                <div
                  className="gradient-text"
                  style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 4 }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 20,
          }}
        >
          {SKILLS.map((group, gi) => (
            <div
              key={group.category}
              className={`glass-card ${visible ? 'animate-fade-in-up' : ''}`}
              style={{
                padding: 28,
                opacity: visible ? undefined : 0,
                animationDelay: `${0.3 + gi * 0.1}s`,
              }}
            >
              <h3
                className="font-mono"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {group.category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
