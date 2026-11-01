import React, { useState, useRef, useEffect } from 'react';

/* ═══════════════════════════════════════
   AI Chat Demo Section
   ═══════════════════════════════════════ */

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const SUGGESTED_PROMPTS = [
  'What AI projects has Hari built?',
  'What is your tech stack?',
  'Tell me about your RAG experience',
  'Are you available for freelance work?',
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

function renderInlineText(str: string) {
  const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          style={{
            background: 'rgba(124, 92, 252, 0.12)',
            color: 'var(--accent-primary)',
            padding: '2px 5px',
            borderRadius: 4,
            fontSize: '0.85em',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function FormattedMessage({ text }: { text: string }) {
  const processed = text
    .replace(/\r\n/g, '\n')
    .replace(/([^\n])\s*([*•-])\s+(\*\*)/g, '$1\n$2 $3')
    .replace(/([^\n])\s*(\d+\.)\s+(\*\*)/g, '$1\n$2 $3');

  const lines = processed.split('\n');
  const blocks: Array<
    | { type: 'p'; text: string }
    | { type: 'header'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
  > = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const bulletMatch = trimmed.match(/^[*•-]\s+(.*)$/);
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    const headerMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);

    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
    } else if (numberedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(numberedMatch[2]);
    } else if (headerMatch) {
      flushList();
      blocks.push({ type: 'header', text: headerMatch[2] });
    } else {
      flushList();
      blocks.push({ type: 'p', text: trimmed });
    }
  });

  flushList();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {blocks.map((block, idx) => {
        if (block.type === 'ul') {
          return (
            <ul
              key={idx}
              style={{
                margin: '4px 0 6px 0',
                paddingLeft: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                listStyleType: 'disc',
              }}
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} style={{ lineHeight: 1.55 }}>
                  {renderInlineText(item)}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'ol') {
          return (
            <ol
              key={idx}
              style={{
                margin: '4px 0 6px 0',
                paddingLeft: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                listStyleType: 'decimal',
              }}
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} style={{ lineHeight: 1.55 }}>
                  {renderInlineText(item)}
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === 'header') {
          return (
            <div
              key={idx}
              style={{
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                marginTop: 4,
              }}
            >
              {renderInlineText(block.text)}
            </div>
          );
        }
        return (
          <p key={idx} style={{ margin: 0, lineHeight: 1.6 }}>
            {renderInlineText(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export function AiChat() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hey! I'm Hari's AI assistant. Ask me anything about his Gen AI engineering experience, projects, or availability. 🚀",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, sender: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({ sender: m.sender, text: m.text }));
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });
      const data = await resp.json();
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "I couldn't process that. Try asking about Hari's projects or skills!",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          sender: 'ai',
          text: "Oops, something went wrong. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <section
      id="ai-chat"
      ref={sectionRef}
      style={{ padding: '100px 0', position: 'relative' }}
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
        {/* Section Header */}
        <div
          className={visible ? 'animate-fade-in-up' : ''}
          style={{ opacity: visible ? undefined : 0, marginBottom: 48, textAlign: 'center' }}
        >
          <span className="section-label">// AI Chat</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginTop: 12,
              letterSpacing: '-0.02em',
            }}
          >
            Talk to my <span className="gradient-text">AI Twin</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: '1rem' }}>
            Powered by Gemini — ask about my experience, stack, or anything AI.
          </p>
        </div>

        {/* Chat Window */}
        <div
          className={`glass-card ${visible ? 'animate-fade-in-up' : ''}`}
          style={{
            maxWidth: 720,
            margin: '0 auto',
            overflow: 'hidden',
            opacity: visible ? undefined : 0,
            animationDelay: '0.2s',
          }}
          onMouseEnter={() => {}} // prevent hover lift on this card
        >
          {/* Header bar */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--bg-card)',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent-secondary)',
                boxShadow: '0 0 6px var(--accent-secondary)',
              }}
            />
            <span className="font-mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              hari_ai_twin v2.0
            </span>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            style={{
              height: 380,
              overflowY: 'auto',
              padding: '20px 20px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              background: 'var(--bg-secondary)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
                className="animate-fade-in"
              >
                <div className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                  {msg.sender === 'user' ? (
                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                  ) : (
                    <FormattedMessage text={msg.text} />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className="chat-bubble-ai" style={{ display: 'flex', gap: 4, padding: '14px 20px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', animation: 'pulse-glow 1s ease-in-out infinite' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', animation: 'pulse-glow 1s ease-in-out 0.2s infinite' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', animation: 'pulse-glow 1s ease-in-out 0.4s infinite' }} />
                </div>
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 1 && (
            <div
              style={{
                padding: '12px 20px',
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  style={{
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 500,
                    background: 'rgba(124, 92, 252, 0.08)',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(124, 92, 252, 0.2)',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(124, 92, 252, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(124, 92, 252, 0.08)';
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              gap: 12,
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-card)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Hari's AI experience..."
              className="input-field"
              style={{ flex: 1 }}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: input.trim() ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={input.trim() ? 'white' : 'var(--text-muted)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
