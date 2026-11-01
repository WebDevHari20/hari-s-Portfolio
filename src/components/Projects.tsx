import React, { useRef, useState, useEffect } from 'react';

/* ═══════════════════════════════════════
   Projects Showcase
   ═══════════════════════════════════════ */

interface Project {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    title: 'RAG Knowledge Engine',
    tagline: 'Enterprise Document Intelligence',
    description:
      'End-to-end retrieval-augmented generation pipeline for enterprise document Q&A. Ingests PDFs, docs, and web pages into a vector database with hybrid search, semantic chunking, and re-ranking for 95%+ answer accuracy.',
    tags: ['LangChain', 'Pinecone', 'GPT-4', 'FastAPI', 'React'],
    icon: '🧠',
    github: '#',
  },
  {
    title: 'Multi-Agent Orchestrator',
    tagline: 'Autonomous Task Decomposition',
    description:
      'A production framework for orchestrating multiple AI agents that collaboratively break down, plan, and execute complex workflows — from code generation to research synthesis — with tool-use and memory.',
    tags: ['CrewAI', 'AutoGen', 'Python', 'Redis', 'Docker'],
    icon: '🤖',
    github: '#',
  },
  {
    title: 'LLM Fine-tuning Pipeline',
    tagline: 'Domain-Specific Model Training',
    description:
      'Scalable fine-tuning infrastructure for adapting open-source LLMs (Llama, Mistral) to specialized domains using LoRA/QLoRA, with automated evaluation, dataset curation, and one-click deployment.',
    tags: ['PyTorch', 'Hugging Face', 'LoRA', 'W&B', 'AWS'],
    icon: '⚡',
    github: '#',
  },
  {
    title: 'AI-Powered Code Reviewer',
    tagline: 'Automated PR Analysis',
    description:
      'GitHub integration that uses LLMs to provide intelligent code reviews — detecting bugs, suggesting optimizations, enforcing style, and generating inline comments on pull requests automatically.',
    tags: ['Gemini API', 'GitHub Actions', 'TypeScript', 'AST Parsing'],
    icon: '🔍',
    github: '#',
  },
  {
    title: 'Conversational AI Platform',
    tagline: 'Custom Chatbot Framework',
    description:
      'Full-stack platform for building, training, and deploying conversational AI assistants with custom knowledge bases, multi-turn memory, streaming responses, and analytics dashboards.',
    tags: ['Next.js', 'OpenAI', 'Supabase', 'Streaming', 'WebSocket'],
    icon: '💬',
    github: '#',
    link: '#',
  },
  {
    title: 'Semantic Search Engine',
    tagline: 'Neural Document Retrieval',
    description:
      'High-performance semantic search over million-doc corpora using sentence transformers, HNSW indexing, and a clean API. Sub-100ms P99 latency with BM25 + vector hybrid scoring.',
    tags: ['Sentence Transformers', 'Weaviate', 'FastAPI', 'ONNX'],
    icon: '🔎',
    github: '#',
  },
];

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

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: '100px 0', position: 'relative' }}
    >
      {/* Subtle divider gradient at top */}
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
        {/* Section Header */}
        <div
          className={visible ? 'animate-fade-in-up' : ''}
          style={{ opacity: visible ? undefined : 0, marginBottom: 56 }}
        >
          <span className="section-label">// Projects</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginTop: 12,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Things I've <span className="gradient-text">built</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 500, fontSize: '1rem' }}>
            A selection of AI/ML projects — from RAG pipelines to multi-agent systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: 24,
          }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`glass-card ${visible ? 'animate-fade-in-up' : ''}`}
              style={{
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                opacity: visible ? undefined : 0,
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              {/* Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 28,
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(124, 92, 252, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {project.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 2 }}>
                    {project.title}
                  </h3>
                  <span
                    className="font-mono"
                    style={{ fontSize: 12, color: 'var(--accent-secondary)', fontWeight: 500 }}
                  >
                    {project.tagline}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  flex: 1,
                  marginBottom: 20,
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: 11 }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 12 }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-secondary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
