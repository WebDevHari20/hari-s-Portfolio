import React, { useState, useRef, useEffect } from 'react';
import { HN_AVATAR_URL, TWIN_KNOWLEDGE_BASE } from '../data/portfolioData';
import { ChatMessage } from '../types';

interface AiDevTwinProps {
  onOpenCal: () => void;
  onOpenSpec: () => void;
}

export const AiDevTwin: React.FC<AiDevTwinProps> = ({ onOpenCal, onOpenSpec }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      timestamp: '10:42:01 AM',
      tag: 'SYS_INITIALIZED',
      text: "Hey! I’m Hari’s digital twin. Hari is likely in VS Code shipping client sites right now, but I can answer anything about his availability, pricing starting from $300, and how he helps small businesses launch websites. Pick a topic or type below!",
    },
    {
      id: 'msg-2',
      sender: 'user',
      timestamp: '10:42:19 AM',
      tag: 'CLIENT_PROSPECT',
      text: "What do you do, what else can you do, and when are you available?",
    },
    {
      id: 'msg-3',
      sender: 'ai',
      timestamp: '10:42:21 AM',
      tag: 'STRUCTURED_REPORT',
      isStructuredReport: true,
      structuredData: {
        sections: [
          {
            num: '1',
            title: 'WHAT HARI DOES',
            type: 'CORE_SPECIALIZATION',
            accent: 'primary',
            description:
              'Full-stack website development tailored for small businesses starting from $300: responsive marketing sites, e-commerce stores (Shopify/Next.js), appointment booking systems, and CMS-driven blogs. Fast, mobile-first, and SEO-optimized.',
            chips: [
              'Starts from $300',
              'Next.js 15 / React',
              'Tailwind CSS',
              'Shopify Headless',
              'Supabase / PostgreSQL',
              'Sanity / Strapi CMS',
            ],
          },
          {
            num: '2',
            title: 'WHAT ELSE HARI CAN DO',
            type: 'PERIPHERAL_CAPABILITIES',
            accent: 'secondary',
            description:
              'Speed optimization (boosting Google PageSpeed to 95+), custom API & payment integrations (Stripe, Razorpay, PayPal), domain/hosting setup, branding micro-design, local SEO rankings, and ongoing maintenance retainers.',
            listItems: [
              { icon: 'speed', text: '95+ Google Core Web Vitals Guarantee' },
              { icon: 'credit_card', text: 'Stripe & Multi-currency Payment Rails' },
              { icon: 'search', text: 'Structured Schema & Local Maps SEO' },
              { icon: 'dns', text: 'Zero-Downtime DNS & Cloudflare CDN Setup' },
            ],
          },
          {
            num: '3',
            title: 'CURRENT AVAILABILITY',
            type: 'READY_FOR_COMMISSION',
            accent: 'primary',
            description:
              'Currently booking for the upcoming cycle! Standard 2-week turnaround for business websites (with a 7-day rush sprint option).',
            callout: '⚡ Client slots are capped at 2 concurrently to protect high build velocity and daily Slack/WhatsApp access.',
          },
        ],
      },
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatStreamRef = useRef<HTMLDivElement>(null);
  const chatTerminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTo({
        top: chatStreamRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    if (textToSend) {
      chatTerminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      timestamp: getCurrentTime(),
      tag: 'CLIENT_PROSPECT',
      text: text,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.map((m) => ({
            sender: m.sender,
            text: m.text || '',
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botReply: ChatMessage = {
          id: 'msg-bot-' + Date.now(),
          sender: 'ai',
          timestamp: getCurrentTime(),
          tag: data.source === 'twin_ai' ? 'HARI_TWIN // LIVE' : 'HARI_TWIN // LOCAL FALLBACK',
          text: data.reply,
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error('API response was not ok');
      }
    } catch {
      // Robust client fallback with instant knowledge base
      const lower = text.toLowerCase();
      let matched = null;

      let fallbackText = '';
      if (
        lower.includes('maintenance') ||
        lower.includes('maintain') ||
        lower.includes('retainer') ||
        lower.includes('monthly') ||
        lower.includes('ownership') ||
        lower.includes('10k') ||
        lower.includes('renew')
      ) {
        fallbackText =
          'Regarding website maintenance, we offer two clear options:\n\n1. Dedicated Maintenance Care (~₹10k/month, which is around $99 or $100 in dollars): Hari personally handles security patches, speed audits, uptime monitoring, and on-demand content tweaks.\n\n2. Zero Maintenance Fee ($0 / 100% Ownership): If you do not need monthly maintenance, we give 100% full ownership to the customer/client. You can renew your hosting and website directly, and maintain your website completely on your own with zero ongoing fees.';
      } else if (lower.includes('gemini') || lower.includes('what ai') || lower.includes('what model') || lower.includes('who made you')) {
        fallbackText =
          "I am Hari Bahadur Narzary's official AI Developer Twin. I am trained on Hari's bespoke Next.js and Tailwind website builds, pricing from $300, and client onboarding workflows.";
      } else {
        for (const key in TWIN_KNOWLEDGE_BASE) {
          if (lower.includes(key) || key.includes(lower)) {
            matched = TWIN_KNOWLEDGE_BASE[key];
            break;
          }
        }
      }

      const botReply: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        sender: 'ai',
        timestamp: getCurrentTime(),
        tag: 'HARI_TWIN_DIRECT',
        text: fallbackText
          ? fallbackText
          : matched
          ? matched.content
          : `Regarding "${text}": Hari builds custom Next.js websites starting from $300 tailored for small businesses. Standard builds take 7-14 days with 100% code ownership. For an exact quote or to discuss your project, book a quick 15-minute intro call or submit your brief!`,
      };

      setMessages((prev) => [...prev, botReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetLog = () => {
    setMessages([
      {
        id: 'msg-reset',
        sender: 'system',
        timestamp: getCurrentTime(),
        text: 'SESSION LOG REFRESHED // BUFFER EMPTIED // 0x00',
      },
    ]);
    setTimeout(() => {
      handleSend('What do you actually do?');
    }, 300);
  };

  return (
    <div className="flex flex-col w-full pb-16 lg:pb-8 transition-colors">
      {/* Ticker Tape Header Bar */}
      <div
        className="w-full py-1.5 px-4 md:px-8 overflow-hidden select-none border-b transition-colors"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-contrast)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between font-mono-code text-xs uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="font-bold flex items-center gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: 'var(--primary-contrast)' }}
              ></span>
              SYS_NODE // 24_7_ASSISTANT
            </span>
            <span className="hidden md:inline">●</span>
            <span className="hidden md:inline">LATENCY: 18MS (EDGE_NODE)</span>
            <span className="hidden md:inline">●</span>
            <span className="hidden md:inline">KNOWLEDGE_CUTOFF: LIVE_2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">ENGINE: HARI_TWIN_AI_V2.5</span>
            <span
              className="px-1.5 py-0.5 font-bold text-[10px]"
              style={{
                backgroundColor: 'var(--primary-contrast)',
                color: 'var(--primary)',
              }}
            >
              PROD_ENV
            </span>
          </div>
        </div>
      </div>

      {/* Dashboard Workspace Container */}
      <div className="w-full px-4 md:px-8 py-6 md:py-8 flex flex-col xl:flex-row gap-6 max-w-[1720px] mx-auto">
        {/* LEFT COLUMN: Developer Dossier & Operational Capacity */}
        <div className="w-full xl:w-[460px] 2xl:w-[500px] shrink-0 flex flex-col gap-4">
          {/* Primary Profile Identity Module */}
          <div
            className="p-5 border-2 relative overflow-hidden transition-colors"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '4px 4px 0px var(--bg-card-alt)',
            }}
          >
            {/* Accent Corner Stamp */}
            <div
              className="absolute -top-3 -right-3 px-3 py-1 rotate-6 shadow-[2px_2px_0px_#000000] font-mono-code text-[11px] font-bold z-10"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--secondary-contrast)',
              }}
            >
              GENUINE_PROFILE // 0x484E
            </div>

            <div className="flex items-start gap-4">
              {/* Avatar Frame with Heavy Outline */}
              <div className="relative shrink-0">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 p-1 border transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: '3px 3px 0px var(--primary)',
                  }}
                >
                  <img
                    src={HN_AVATAR_URL}
                    onError={(e) => {
                      e.currentTarget.src = '/hari-avatar.png';
                    }}
                    alt="Hari Bahadur Narzary - Fullstack Web Engineer"
                    className="w-full h-full object-cover object-center filter contrast-105"
                  />
                </div>
                {/* Status Badge Ping */}
                <div
                  className="absolute -bottom-1 -right-1 px-2 py-0.5 flex items-center gap-1 border shadow-[2px_2px_0px_#000]"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: 'var(--primary)' }}
                  ></span>
                  <span
                    className="font-mono-code text-[9px] font-bold uppercase tracking-tight"
                    style={{ color: 'var(--primary)' }}
                  >
                    AI LIVE
                  </span>
                </div>
              </div>

              {/* Identity Meta */}
              <div className="flex flex-col min-w-0 justify-center">
                <span
                  className="font-mono-code text-xs tracking-widest uppercase"
                  style={{ color: 'var(--primary)' }}
                >
                  // ARCHITECT_CORE
                </span>
                <h1 className="font-syne text-xl md:text-2xl text-white uppercase tracking-tight font-bold leading-tight mt-1 truncate">
                  Hari Bahadur Narzary
                </h1>
                <p className="font-grotesk text-xs text-zinc-300 mt-2 leading-relaxed">
                  Full-stack website engineer specializing in high-converting small business platforms starting from $300.
                </p>
              </div>
            </div>

            {/* System Status Summary */}
            <p className="font-grotesk text-xs text-zinc-400 mt-4 leading-normal">
              Trained specifically on Hari&#39;s freelance pricing models starting at $300, weekly project availability, Next.js tech stack, and verified SMB launches.
            </p>
          </div>

          {/* Quick Ask Intent Launchpad */}
          <div
            className="p-5 border transition-colors"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '4px 4px 0px var(--bg-card-alt)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg" style={{ color: 'var(--primary)' }}>
                  bolt
                </span>
                <span className="font-mono-code text-xs uppercase text-white font-bold tracking-wider">
                  FAST PROMPT INJECTORS
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-zinc-400">[TAP TO DISPATCH]</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                { title: '1. WHAT DO YOU ACTUALLY DO?', prompt: 'What do you actually do?' },
                { title: '2. WHAT ELSE CAN YOU DO BESIDES CODING?', prompt: 'What else can you do besides coding?' },
                { title: '3. WHEN ARE YOU AVAILABLE TO START?', prompt: 'When are you available to start?' },
                { title: '4. HOW MUCH DOES A WEBSITE COST? (FROM $300)', prompt: 'How much does a small business website cost?' },
                { title: '5. MAINTENANCE & OWNERSHIP ($99/MO OR $0 OWNERSHIP)', prompt: 'What are the website maintenance and ownership options?' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="text-left p-2.5 text-zinc-200 transition-all flex items-center justify-between group shadow-[2px_2px_0px_#000000] border active:translate-x-0.5 active:translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                  }}
                  onClick={() => handleSend(item.prompt)}
                  type="button"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = '#e4e4e7';
                  }}
                >
                  <span className="font-mono-code text-xs tracking-wide">{item.title}</span>
                  <span
                    className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"
                    style={{ color: 'var(--primary)' }}
                  >
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Capacity Radar & Delivery Metrics */}
          <div
            className="p-5 border transition-colors"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '4px 4px 0px var(--bg-card-alt)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg" style={{ color: 'var(--secondary)' }}>
                  radar
                </span>
                <span className="font-mono-code text-xs uppercase text-white font-bold tracking-wider">
                  CAPACITY RADAR // SPRINT_SLA
                </span>
              </div>
              <span className="font-mono-code text-xs uppercase font-bold" style={{ color: 'var(--primary)' }}>
                Q2 OPEN
              </span>
            </div>

            <div className="space-y-2">
              <div
                className="p-2.5 flex items-center justify-between border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5" style={{ backgroundColor: 'var(--primary)' }}></span>
                  <span className="font-mono-code text-xs uppercase text-zinc-200">SPRINT ALLOCATION</span>
                </div>
                <span className="font-mono-code text-xs font-bold" style={{ color: 'var(--primary)' }}>
                  2 SLOTS REMAINING
                </span>
              </div>

              <div
                className="p-2.5 flex items-center justify-between border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5" style={{ backgroundColor: 'var(--secondary)' }}></span>
                  <span className="font-mono-code text-xs uppercase text-zinc-200">STANDARD BUSINESS BUILD</span>
                </div>
                <span className="font-mono-code text-xs font-bold" style={{ color: 'var(--secondary)' }}>
                  1–2 WEEKS DELIVERY
                </span>
              </div>

              <div
                className="p-2.5 flex items-center justify-between border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-zinc-500"></span>
                  <span className="font-mono-code text-xs uppercase text-zinc-200">DIRECT COMM SLA</span>
                </div>
                <span className="font-mono-code text-xs text-white font-bold">&lt; 24H GUARANTEE</span>
              </div>
            </div>

            {/* Velocity Visualizer */}
            <div
              className="mt-4 pt-3 px-3 py-2 border"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-mono-code text-[10px] text-zinc-400 tracking-wider uppercase">
                  Sprint Pipeline Load
                </span>
                <span className="font-mono-code text-[10px] font-bold" style={{ color: 'var(--primary)' }}>
                  82% COMMITTED
                </span>
              </div>
              <div className="w-full bg-black/50 h-2 relative overflow-hidden">
                <div
                  className="h-full w-[82%]"
                  style={{ backgroundColor: 'var(--primary)' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Verified Action Links & Specs Download */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onOpenSpec}
              className="p-3 text-white transition-all flex flex-col gap-1 border active:translate-x-0.5 active:translate-y-0.5 group text-left"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '3px 3px 0px var(--bg-card-alt)',
              }}
              type="button"
            >
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                  description
                </span>
                <span className="font-mono-code text-[10px] text-zinc-400 group-hover:text-white transition-colors">
                  PDF_V2.1
                </span>
              </div>
              <span className="font-mono-code text-xs uppercase font-bold text-white">PRICING &amp; SPEC</span>
              <span className="font-grotesk text-[11px] text-zinc-400">Fixed rates from $300</span>
            </button>

            <button
              onClick={onOpenCal}
              className="p-3 font-bold transition-all flex flex-col gap-1 active:translate-x-0.5 active:translate-y-0.5 text-left"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                boxShadow: '3px 3px 0px var(--secondary)',
              }}
              type="button"
            >
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-base" style={{ color: 'currentColor' }}>
                  calendar_today
                </span>
                <span className="font-mono-code text-[10px] tracking-widest uppercase font-bold">INSTANT</span>
              </div>
              <span className="font-mono-code text-xs uppercase font-bold tracking-tight">SCHEDULE 15-MIN CALL</span>
              <span className="font-grotesk text-[11px] opacity-80">Direct to Hari&#39;s calendar</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Cyberpunk Chat Terminal */}
        <div
          ref={chatTerminalRef}
          className="flex-1 flex flex-col border-2 overflow-hidden min-h-[620px] 2xl:min-h-[780px] transition-colors"
          style={{
            backgroundColor: 'var(--bg-card-alt)',
            borderColor: 'var(--border-subtle)',
            boxShadow: '6px 6px 0px rgba(0,0,0,0.7)',
          }}
        >
          {/* Terminal Header */}
          <div
            className="px-4 py-3 flex items-center justify-between shrink-0 select-none border-b transition-colors"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 shadow-[1px_1px_0px_#000]"></div>
                <div className="w-3 h-3 shadow-[1px_1px_0px_#000]" style={{ backgroundColor: 'var(--secondary)' }}></div>
                <div className="w-3 h-3 shadow-[1px_1px_0px_#000]" style={{ backgroundColor: 'var(--primary)' }}></div>
              </div>
              <span className="font-mono-code text-xs uppercase text-zinc-200 tracking-wider ml-2">
                TERMINAL_SESSION // HARI_TWIN_INTERACTION_FEED
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 border font-mono-code text-[10px] uppercase font-bold"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--primary)' }}
                ></span>
                TWIN_SYS // LIVE
              </span>
              <span className="hidden md:inline font-mono-code text-[11px] text-zinc-400">STREAM: ENCRYPTED</span>
              <button
                className="px-2.5 py-1 text-zinc-300 hover:text-white font-mono-code text-[10px] uppercase tracking-wider transition-colors shadow-[1px_1px_0px_#000] border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
                onClick={handleResetLog}
                type="button"
              >
                CLEAR LOG
              </button>
            </div>
          </div>

          {/* Chat History Canvas */}
          <div
            ref={chatStreamRef}
            className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px]"
          >
            {messages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div
                    key={msg.id}
                    className="p-2.5 border text-center font-mono-code text-xs text-zinc-400"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    {msg.text}
                  </div>
                );
              }

              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex items-start justify-end gap-3 ml-auto max-w-2xl">
                    <div className="flex flex-col items-end gap-1 w-full">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[10px] text-zinc-400">{msg.timestamp}</span>
                        <span
                          className="font-mono-code text-xs font-bold uppercase tracking-wider"
                          style={{ color: 'var(--secondary)' }}
                        >
                          CLIENT_PROSPECT
                        </span>
                      </div>
                      <div
                        className="text-white p-4 border"
                        style={{
                          backgroundColor: 'var(--secondary)',
                          color: 'var(--secondary-contrast)',
                          borderColor: 'var(--border-subtle)',
                          boxShadow: '4px 4px 0px var(--primary)',
                        }}
                      >
                        <p className="font-grotesk text-sm font-medium leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-8 h-8 shrink-0 font-mono-code text-xs font-bold flex items-center justify-center shadow-[2px_2px_0px_#000000]"
                      style={{
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--secondary-contrast)',
                      }}
                    >
                      YOU
                    </div>
                  </div>
                );
              }

              // AI Message
              if (msg.isStructuredReport && msg.structuredData) {
                return (
                  <div key={msg.id} className="flex items-start gap-3 max-w-4xl">
                    <div
                      className="w-8 h-8 shrink-0 font-mono-code text-xs font-bold flex items-center justify-center shadow-[2px_2px_0px_#000000]"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-contrast)',
                      }}
                    >
                      AI
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono-code text-xs font-bold uppercase tracking-wider"
                          style={{ color: 'var(--primary)' }}
                        >
                          HARI&#39;S AI TWIN
                        </span>
                        <span className="font-mono-code text-[10px] text-zinc-400">{msg.timestamp}</span>
                        <span
                          className="px-1.5 py-0.5 font-mono-code text-[9px] uppercase font-bold tracking-wider border"
                          style={{
                            backgroundColor: 'var(--bg-card-alt)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--primary)',
                          }}
                        >
                          {msg.tag || 'STRUCTURED_REPORT'}
                        </span>
                      </div>

                      {/* Structured Dossier Card */}
                      <div
                        className="p-4 md:p-6 text-zinc-100 border space-y-4 shadow-[5px_5px_0px_#000000]"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          borderColor: 'var(--border-subtle)',
                        }}
                      >
                        {msg.structuredData.sections.map((sec) => (
                          <div
                            key={sec.num}
                            className="p-4 border"
                            style={{
                              backgroundColor: 'var(--bg-card-alt)',
                              borderColor: 'var(--border-subtle)',
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2 h-2"
                                  style={{
                                    backgroundColor: sec.accent === 'primary' ? 'var(--primary)' : 'var(--secondary)',
                                  }}
                                ></span>
                                <h3
                                  className="font-mono-code text-xs uppercase font-bold tracking-wider"
                                  style={{
                                    color: sec.accent === 'primary' ? 'var(--primary)' : 'var(--secondary)',
                                  }}
                                >
                                  {sec.num}. {sec.title}
                                </h3>
                              </div>
                              <span className="font-mono-code text-[10px] text-zinc-400">[{sec.type}]</span>
                            </div>
                            <p className="font-grotesk text-sm text-zinc-300 leading-relaxed">
                              {sec.description}
                            </p>

                            {sec.chips && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {sec.chips.map((chip) => (
                                  <span
                                    key={chip}
                                    className="px-2 py-0.5 text-zinc-300 font-mono-code text-[11px] uppercase border"
                                    style={{
                                      backgroundColor: 'var(--bg-card)',
                                      borderColor: 'var(--border-subtle)',
                                    }}
                                  >
                                    {chip}
                                  </span>
                                ))}
                              </div>
                            )}

                            {sec.listItems && (
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 font-grotesk text-xs">
                                {sec.listItems.map((item, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)' }}>
                                      {item.icon}
                                    </span>
                                    <span>{item.text}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {sec.callout && (
                              <div className="mt-2 text-zinc-400 font-grotesk text-xs">
                                {sec.callout}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Interactive In-Chat CTA Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <button
                            onClick={onOpenCal}
                            className="px-4 py-2.5 font-mono-code text-xs font-bold uppercase tracking-wider transition-all active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                            style={{
                              backgroundColor: 'var(--primary)',
                              color: 'var(--primary-contrast)',
                              boxShadow: '3px 3px 0px var(--secondary)',
                            }}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-base">video_call</span>
                            <span>BOOK 15-MIN INTRO CALL (CAL.COM)</span>
                          </button>
                          <a
                            href="mailto:harinarzary22@gmail.com?subject=Website%20Inquiry%20via%20AI%20Assistant"
                            className="px-4 py-2.5 text-white font-mono-code text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000000] border transition-all active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                            style={{
                              backgroundColor: 'var(--bg-card-alt)',
                              borderColor: 'var(--border-subtle)',
                            }}
                          >
                            <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                              mail
                            </span>
                            <span>EMAIL HARI DIRECTLY</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Standard bot reply
              return (
                <div key={msg.id} className="flex items-start gap-3 max-w-3xl">
                  <div
                    className="w-8 h-8 shrink-0 font-mono-code text-xs font-bold flex items-center justify-center shadow-[2px_2px_0px_#000000]"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-contrast)',
                    }}
                  >
                    AI
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono-code text-xs font-bold uppercase tracking-wider"
                        style={{ color: 'var(--primary)' }}
                      >
                        HARI&#39;S AI TWIN
                      </span>
                      <span className="font-mono-code text-[10px] text-zinc-400">{msg.timestamp}</span>
                      {msg.tag && (
                        <span
                          className="px-1.5 py-0.5 text-zinc-300 font-mono-code text-[9px] uppercase border"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: 'var(--border-subtle)',
                          }}
                        >
                          {msg.tag}
                        </span>
                      )}
                    </div>
                    <div
                      className="p-4 text-zinc-200 border shadow-[4px_4px_0px_#000000]"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <p className="font-grotesk text-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3 max-w-3xl">
                <div
                  className="w-8 h-8 shrink-0 font-mono-code text-xs font-bold flex items-center justify-center shadow-[2px_2px_0px_#000000]"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-contrast)',
                  }}
                >
                  AI
                </div>
                <div
                  className="p-3 text-zinc-400 font-mono-code text-xs flex items-center gap-2 border"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: 'var(--primary)' }}
                  ></span>
                  <span>AI TWIN GENERATING RESPONSE...</span>
                </div>
              </div>
            )}
          </div>

          {/* Contextual Quick Action Tray */}
          <div
            className="px-4 py-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap border-t"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-wider shrink-0">
              SUGGESTIONS:
            </span>
            {[
              'Timeline breakdown?',
              'Pricing starting from $300?',
              'Maintenance & ownership options?',
              'WordPress to Next.js migration?',
              'Hosting & domains setup?',
            ].map((sug, idx) => (
              <button
                key={idx}
                className="px-3 py-1 text-zinc-300 hover:text-white font-mono-code text-[11px] uppercase transition-colors shrink-0 border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
                onClick={() => handleSend(sug)}
                type="button"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Cyberpunk Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 flex items-center gap-3 border-t"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="relative flex-1">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-mono-code text-sm font-bold"
                style={{ color: 'var(--primary)' }}
              >
                &gt;
              </div>
              <input
                className="w-full pl-8 pr-4 py-3 text-white font-grotesk text-sm placeholder:text-zinc-500 focus:outline-none border shadow-[2px_2px_0px_#000]"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about Hari's tech stack, design approach, pricing (from $300), or availability..."
                type="text"
                autoComplete="off"
              />
            </div>
            <button
              className="px-6 py-3 font-mono-code text-xs md:text-sm uppercase font-bold tracking-wider shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 shrink-0"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
              }}
              type="submit"
            >
              <span>SEND QUERY</span>
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
