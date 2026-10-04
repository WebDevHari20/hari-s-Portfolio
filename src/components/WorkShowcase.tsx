import React, { useState } from 'react';
import { ActiveTab, CaseStudy, VibeTheme } from '../types';
import { CASE_STUDIES, TESTIMONIALS, HN_AVATAR_URL } from '../data/portfolioData';
import { THEMES } from '../themes';
import { BespokeProcessFlow } from './BespokeProcessFlow';

interface WorkShowcaseProps {
  setActiveTab: (tab: ActiveTab) => void;
  vibeTheme: VibeTheme;
  setVibeTheme: (theme: VibeTheme) => void;
  onOpenCal: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({
  setActiveTab,
  vibeTheme,
  setVibeTheme,
  onOpenCal,
  onSelectCaseStudy,
}) => {
  // Mini terminal state for interactive teaser
  const [miniChatInput, setMiniChatInput] = useState('');
  const [portraitGrade, setPortraitGrade] = useState<'cyber' | 'studio'>('cyber');
  const [miniMessages, setMiniMessages] = useState<Array<{ sender: string; text: string; isBot: boolean }>>([
    {
      sender: 'SYSTEM',
      text: 'AI twin online. Ready for queries on client web builds, pricing, or tech stacks.',
      isBot: true,
    },
    {
      sender: 'TWIN',
      text: 'Hey! Hari is currently writing code for Q2 client projects. What kind of business do you run and what are you looking to build?',
      isBot: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleMiniSend = async (customText?: string) => {
    const textToSend = customText || miniChatInput.trim();
    if (!textToSend) return;

    // Append user message
    const newMessages = [...miniMessages, { sender: 'YOU', text: textToSend, isBot: false }];
    setMiniMessages(newMessages);
    if (!customText) setMiniChatInput('');

    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.map((m) => ({
            sender: m.isBot ? 'ai' : 'user',
            text: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMiniMessages((prev) => [...prev, { sender: 'TWIN (AI)', text: data.reply, isBot: true }]);
      } else {
        throw new Error('API offline');
      }
    } catch {
      let reply = "Great question! Hari delivers fixed-scope websites starting from just $300 in 7-14 days. Every build is 100% custom-coded in Next.js/Tailwind for maximum SEO speed and direct conversion gains.";
      const lower = textToSend.toLowerCase();

      if (
        lower.includes("maintenance") ||
        lower.includes("maintain") ||
        lower.includes("retainer") ||
        lower.includes("monthly") ||
        lower.includes("ownership") ||
        lower.includes("10k") ||
        lower.includes("renew")
      ) {
        reply = "For maintenance, you have two choices: 1) Monthly Care at ~₹10k/mo ($99 or $100 in dollars) for full security, speed audits, and updates. 2) Zero Maintenance Fee ($0): If you don't need maintenance, 100% full ownership goes to you so you can renew hosting and maintain the website on your own.";
      } else if (lower.includes("cost") || lower.includes("price") || lower.includes("quote")) {
        reply = "Websites start from just $300! A starter marketing site (1-5 sections, sub-second load, local SEO) is $300 – $1,200. Growth setups with e-commerce or booking funnels range between $1,200 – $2,800. Zero hourly surprises.";
      } else if (lower.includes("wordpress") || lower.includes("custom code")) {
        reply = "Custom Next.js code loads in 0.4s vs 4s+ on bloated WordPress themes with 30 plugins. This directly doubles conversion rates and saves you hundreds in security maintenance every month.";
      } else if (lower.includes("turnaround") || lower.includes("timeline") || lower.includes("time")) {
        reply = "Standard client delivery is 10 to 14 calendar days from kickoff to live deployment on Vercel/Cloudflare (with a 7-day rush sprint option).";
      } else if (lower.includes("gemini") || lower.includes("what ai") || lower.includes("who are you")) {
        reply = "I am Hari's AI Developer Twin, trained directly on Hari Bahadur Narzary's website builds, pricing from $300, and full-stack tech architecture.";
      }

      setMiniMessages((prev) => [...prev, { sender: 'TWIN', text: reply, isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const themeList = Object.values(THEMES);

  return (
    <div className="flex flex-col w-full transition-colors duration-200">
      {/* Ticker Tape / Ambient Telemetry Strip */}
      <div
        className="w-full overflow-hidden py-1.5 transition-colors duration-200"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-contrast)',
          boxShadow: '0 4px 0px var(--bg-card-alt)',
        }}
      >
        <div className="animate-marquee font-mono-code text-xs font-bold tracking-widest uppercase">
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm font-bold">bolt</span> CLIENT SITES PRINTING REVENUE 24/7
          </span>
          <span className="px-2">/// NO SLOW TEMPLATES ///</span>
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm">terminal</span> 100% HAND-CRAFTED REACT &amp; NEXT.JS
          </span>
          <span className="px-2">/// LIGHTHOUSE: 99+ GUARANTEE ///</span>
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm">speed</span> ZERO CORPORATE BLOAT
          </span>
          <span className="px-2">/// SERVING SMBs WORLDWIDE ///</span>
          {/* Loop repeat */}
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm font-bold">bolt</span> CLIENT SITES PRINTING REVENUE 24/7
          </span>
          <span className="px-2">/// NO SLOW TEMPLATES ///</span>
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm">terminal</span> 100% HAND-CRAFTED REACT &amp; NEXT.JS
          </span>
          <span className="px-2">/// LIGHTHOUSE: 99+ GUARANTEE ///</span>
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm">speed</span> ZERO CORPORATE BLOAT
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="relative w-full px-4 md:px-8 py-10 md:py-16 overflow-hidden transition-colors"
        style={{ backgroundColor: 'var(--bg-main)' }}
      >
        {/* Cyber Ambient Backing Glows */}
        <div
          className="absolute -top-24 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: 'var(--primary)', opacity: 0.15 }}
        ></div>
        <div
          className="absolute top-1/2 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: 'var(--secondary)', opacity: 0.2 }}
        ></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 relative z-10">
          {/* Top Pills & Aesthetic Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="px-3 py-1 rounded-full flex items-center gap-1.5 text-zinc-200 border transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '2px 2px 0px var(--bg-card-alt)',
                }}
              >
                <span className="font-mono-code text-xs" style={{ color: 'var(--primary)' }}>📍</span>
                <span className="font-mono-code text-[11px] tracking-wider uppercase">Remote / Worldwide</span>
              </div>
              <div
                className="px-3 py-1 rounded-full flex items-center gap-1.5 text-zinc-200 border transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '2px 2px 0px var(--bg-card-alt)',
                }}
              >
                <span className="font-mono-code text-xs" style={{ color: 'var(--primary)' }}>⚡</span>
                <span className="font-mono-code text-[11px] tracking-wider uppercase">2-Week Avg Delivery</span>
              </div>
              <div
                className="px-3 py-1 rounded-full flex items-center gap-1.5 text-zinc-200 border transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '2px 2px 0px var(--bg-card-alt)',
                }}
              >
                <span className="font-mono-code text-xs" style={{ color: 'var(--tertiary)' }}>🔥</span>
                <span className="font-mono-code text-[11px] tracking-wider uppercase">100% Custom Code (React / Next.js / Tailwind)</span>
              </div>
              <div
                className="px-3 py-1 rounded-full flex items-center gap-1.5 text-zinc-200 border transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--primary)',
                  boxShadow: '2px 2px 0px var(--primary)',
                }}
              >
                <span className="font-mono-code text-xs" style={{ color: 'var(--primary)' }}>⚡</span>
                <span className="font-mono-code text-[11px] tracking-wider uppercase font-bold" style={{ color: 'var(--primary)' }}>
                  Starts at $300
                </span>
              </div>
            </div>

            {/* Interactive Aesthetic Mode Switcher */}
            <div
              className="flex flex-wrap items-center gap-1 p-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '3px 3px 0px rgba(0,0,0,0.5)',
              }}
            >
              <span className="font-mono-code text-[10px] px-2 text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                THEME VIBE:
              </span>
              {themeList.map((t) => {
                const isActive = vibeTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setVibeTheme(t.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-code text-[10px] uppercase tracking-wider transition-all"
                    style={
                      isActive
                        ? {
                            backgroundColor: t.primary,
                            color: t.primaryContrast,
                            fontWeight: 'bold',
                            boxShadow: `2px 2px 0px ${t.secondary}`,
                          }
                        : {
                            color: '#a1a1aa',
                            backgroundColor: 'transparent',
                          }
                    }
                    type="button"
                  >
                    <span
                      className="w-2 h-2 rounded-full border border-black/40"
                      style={{ backgroundColor: t.primary }}
                    ></span>
                    <span>{t.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Brutalist Headline Grid with Hero Portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-lg border transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '2px 2px 0px var(--bg-card-alt)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: 'var(--primary)' }}
                ></span>
                <span
                  className="font-mono-code text-xs uppercase tracking-widest font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  PROPOSITION // HYPER_CONVERTING_CODE
                </span>
              </div>
              <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.95]">
                CRAFTING WEBSITES THAT ACTUALLY{' '}
                <span
                  className="underline decoration-wavy decoration-4 transition-colors"
                  style={{
                    color: 'var(--primary)',
                    textDecorationColor: 'var(--secondary)',
                  }}
                >
                  PRINT REVENUE
                </span>{' '}
                ⚡️
              </h1>
              <p className="font-grotesk text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Hey, I’m <span className="text-white font-semibold">Hari Bahadur Narzary</span>. I build high-performance, ultra-fast, and bespoke websites for small businesses and brands that want to stand out online without corporate fluff, bloated page builders, or hidden retainer fees. Starting from just <span className="font-bold text-white underline decoration-[var(--primary)] decoration-2">$300</span>.
              </p>
            </div>

            {/* Hero Picture & Developer Showcase Frame */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div
                className="relative rounded-2xl border-2 overflow-hidden w-full max-w-md group transition-all"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--primary)',
                  boxShadow: '8px 8px 0px var(--secondary)',
                }}
              >
                {/* Decorative Zine Angle Badge */}
                <div
                  className="absolute top-3.5 right-3.5 px-3 py-1 font-mono-code text-[11px] font-bold uppercase rounded shadow-[2px_2px_0px_#000000] rotate-3 z-20 pointer-events-none"
                  style={{
                    backgroundColor: 'var(--tertiary)',
                    color: '#000000',
                  }}
                >
                  ZERO_WORDPRESS_CRUFT
                </div>

                {/* Top Corner Telemetry Badge & Grade Switcher */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-20">
                  <div
                    className="px-2.5 py-1 rounded font-mono-code text-[10px] uppercase font-bold flex items-center gap-1.5 border backdrop-blur-md pointer-events-none"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--primary)',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: 'var(--primary)' }}
                    ></span>
                    <span>DEV_ONLINE</span>
                  </div>

                  <button
                    onClick={() => setPortraitGrade((prev) => (prev === 'cyber' ? 'studio' : 'cyber'))}
                    className="px-2 py-0.5 rounded font-mono-code text-[9px] uppercase font-bold border backdrop-blur-md transition-all active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: portraitGrade === 'cyber' ? 'var(--secondary)' : 'rgba(0,0,0,0.7)',
                      borderColor: 'var(--primary)',
                      color: '#ffffff',
                    }}
                    title="Toggle Photo Grade (Cyber / Studio)"
                    type="button"
                  >
                    {portraitGrade === 'cyber' ? 'CYBER_GRADE' : 'STUDIO_GRADE'}
                  </button>
                </div>

                {/* Main Hero Photo Container with High-End Cyber Styling */}
                <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-black/80 group/photo">
                  {/* HUD Corner Framing Reticles */}
                  <span className="absolute top-2 left-2 font-mono text-[11px] font-bold pointer-events-none z-10" style={{ color: 'var(--primary)' }}>⌜</span>
                  <span className="absolute top-2 right-2 font-mono text-[11px] font-bold pointer-events-none z-10" style={{ color: 'var(--primary)' }}>⌝</span>
                  <span className="absolute bottom-2 left-2 font-mono text-[11px] font-bold pointer-events-none z-10" style={{ color: 'var(--primary)' }}>⌞</span>
                  <span className="absolute bottom-2 right-2 font-mono text-[11px] font-bold pointer-events-none z-10" style={{ color: 'var(--primary)' }}>⌟</span>

                  {/* Optical Telemetry Watermark */}
                  <div className="absolute top-3 left-3 font-mono-code text-[10px] uppercase tracking-wider opacity-85 text-white z-10 pointer-events-none flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: 'var(--primary)' }}></span>
                    <span>[LEAD DEV: HARI // BANGALORE &amp; ASSAM]</span>
                  </div>

                  <img
                    src={HN_AVATAR_URL}
                    onError={(e) => {
                      // Fallback to local asset if network fails
                      e.currentTarget.src = '/hari-avatar.png';
                    }}
                    alt="Hari Bahadur Narzary - Web Dev Architect & Full-Stack Engineer"
                    className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
                      portraitGrade === 'cyber'
                        ? 'filter contrast-110 brightness-100 saturate-105'
                        : 'filter contrast-105 brightness-100'
                    }`}
                  />

                  {/* Ambient Cyber Color Overlay */}
                  {portraitGrade === 'cyber' && (
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-25"
                      style={{
                        background: 'radial-gradient(circle at 80% 20%, var(--primary) 0%, transparent 60%)',
                      }}
                    ></div>
                  )}

                  {/* Subtle Gradient vignette */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to top, var(--bg-card) 0%, transparent 65%)',
                    }}
                  ></div>

                  {/* Floating Live Spec Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono-code pointer-events-none">
                    <span
                      className="px-2.5 py-1 rounded font-bold uppercase border backdrop-blur-md"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)',
                        boxShadow: '1px 1px 0px #000000',
                      }}
                    >
                      STARTS FROM $300
                    </span>
                    <span
                      className="px-2.5 py-1 rounded text-white border backdrop-blur-md font-bold"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        borderColor: 'var(--border-subtle)',
                        boxShadow: '1px 1px 0px #000000',
                      }}
                    >
                      ⚡ 2-WEEK SPRINT
                    </span>
                  </div>
                </div>

                {/* Developer Info Footer */}
                <div
                  className="p-4 border-t flex items-center justify-between gap-3 transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono-code text-[10px] text-zinc-400 uppercase tracking-widest">
                      DIRECT CODE CRAFT // GUWAHATI • GLOBAL
                    </span>
                    <span className="font-syne text-lg text-white font-bold truncate">
                      Hari Bahadur Narzary
                    </span>
                    <span className="font-mono-code text-xs font-bold" style={{ color: 'var(--primary)' }}>
                      NEXT.JS • TAILWIND • SHOPIFY
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTab('twin')}
                    className="px-3.5 py-2 rounded font-mono-code text-xs font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 active:translate-x-0.5 active:translate-y-0.5"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-contrast)',
                      boxShadow: '2px 2px 0px var(--secondary)',
                    }}
                    title="Chat with Hari's AI Twin"
                    type="button"
                  >
                    <span>TALK</span>
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenCal}
              className="inline-flex items-center gap-2 px-6 py-3.5 font-mono-code text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                boxShadow: '5px 5px 0px var(--secondary)',
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              <span>Book 15-Min Website Discovery</span>
            </button>
            <button
              onClick={() => setActiveTab('twin')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-mono-code text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg border-2 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--primary)',
                boxShadow: '5px 5px 0px var(--primary)',
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-lg" style={{ color: 'var(--primary)' }}>
                smart_toy
              </span>
              <span>Talk to AI Dev Twin 🤖</span>
            </button>
          </div>

          {/* High-Impact Metric Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Metric 1 */}
            <div
              className="p-5 rounded-xl border flex flex-col justify-between group hover:border-[var(--primary)] transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '4px 4px 0px var(--bg-card-alt)',
              }}
            >
              <div className="flex items-center justify-between pb-2">
                <span className="font-mono-code text-xs text-zinc-400 uppercase tracking-widest">// DEPLOYED_SITES</span>
                <span
                  className="px-2 py-0.5 rounded font-mono-code text-[10px] uppercase font-bold"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--primary)',
                  }}
                >
                  VERIFIED
                </span>
              </div>
              <div className="flex items-baseline gap-1 py-1">
                <span className="font-syne text-5xl font-extrabold text-white leading-none">35+</span>
                <span className="font-syne text-2xl font-bold" style={{ color: 'var(--primary)' }}>+</span>
              </div>
              <p className="font-grotesk text-xs text-zinc-400 mt-2">
                Small Businesses Launched &amp; Thriving with automated order/booking funnels.
              </p>
            </div>

            {/* Metric 2 */}
            <div
              className="p-5 rounded-xl border flex flex-col justify-between group hover:border-[var(--primary)] transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '4px 4px 0px var(--bg-card-alt)',
              }}
            >
              <div className="flex items-center justify-between pb-2">
                <span className="font-mono-code text-xs text-zinc-400 uppercase tracking-widest">// PERFORMANCE_AUDIT</span>
                <span className="material-symbols-outlined text-xl" style={{ color: 'var(--primary)' }}>
                  speed
                </span>
              </div>
              <div className="flex items-baseline gap-1 py-1">
                <span className="font-syne text-5xl font-extrabold leading-none" style={{ color: 'var(--primary)' }}>
                  99
                </span>
                <span className="font-syne text-xl text-zinc-400">/100</span>
              </div>
              <p className="font-grotesk text-xs text-zinc-400 mt-2">
                Google Lighthouse Score average across Mobile &amp; Desktop viewport audits.
              </p>
            </div>

            {/* Metric 3 */}
            <div
              className="p-5 rounded-xl border flex flex-col justify-between group hover:border-[var(--secondary)] transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '4px 4px 0px var(--bg-card-alt)',
              }}
            >
              <div className="flex items-center justify-between pb-2">
                <span className="font-mono-code text-xs text-zinc-400 uppercase tracking-widest">// REVENUE_LEVERAGE</span>
                <span
                  className="px-2 py-0.5 rounded font-mono-code text-[10px] uppercase font-bold"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--secondary)',
                  }}
                >
                  GROWTH
                </span>
              </div>
              <div className="flex items-baseline gap-1 py-1">
                <span className="font-syne text-5xl font-extrabold leading-none" style={{ color: 'var(--secondary)' }}>
                  3.4x
                </span>
                <span className="font-syne text-xl font-bold leading-none" style={{ color: 'var(--secondary)' }}>
                  AVG
                </span>
              </div>
              <p className="font-grotesk text-xs text-zinc-400 mt-2">
                Client conversion rate increase recorded within the first 60 days of launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Visual Flow Chart: Bespoke High-Performance Process */}
      <BespokeProcessFlow
        onOpenCal={onOpenCal}
        onOpenBrief={() => setActiveTab('book')}
      />

      {/* Section Break Caution Graphic */}
      <div
        className="w-full border-y py-3 px-4 md:px-8 flex items-center justify-between overflow-hidden shadow-inner select-none transition-colors"
        style={{
          backgroundColor: 'var(--bg-card-alt)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-3 text-zinc-400 font-mono-code text-xs uppercase tracking-widest opacity-80">
          <span>// CURATED_CASE_STUDIES</span>
          <span>•</span>
          <span>PRODUCTION_CODE_ONLY</span>
          <span>•</span>
          <span>STARTS_FROM_$300</span>
        </div>
        <span className="font-mono-code text-xs uppercase hidden md:inline font-bold" style={{ color: 'var(--primary)' }}>
          QUERY_RESULT: 4 DEPLOYMENTS SHOWN
        </span>
      </div>

      {/* Showcase Portfolio Section */}
      <section
        className="w-full px-4 md:px-8 py-12 md:py-16 transition-colors"
        style={{ backgroundColor: 'var(--bg-card-alt)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-mono-code text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                  // FEATURED_BUILDS
                </span>
                <span className="w-12 h-0.5" style={{ backgroundColor: 'var(--primary)' }}></span>
              </div>
              <h2 className="font-syne text-2xl md:text-4xl text-white uppercase font-bold tracking-tight">
                SMALL BUSINESS WORK THAT ACTUALLY WORKS.
              </h2>
            </div>
            <p className="font-grotesk text-xs md:text-sm text-zinc-400 max-w-md">
              Every project is built specifically to address friction in consumer ordering, booking, and visual credibility.
            </p>
          </div>

          {/* Bento Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {CASE_STUDIES.map((study, idx) => {
              const colSpan = (idx === 0 || idx === 3) ? 'lg:col-span-7' : 'lg:col-span-5';

              return (
                <div
                  key={study.id}
                  className={`${colSpan} rounded-xl p-5 border-2 flex flex-col justify-between group transition-all`}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: '6px 6px 0px var(--bg-card-alt)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '6px 6px 0px var(--secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = '6px 6px 0px var(--bg-card-alt)';
                  }}
                >
                  <div className="flex flex-col gap-4">
                    {/* Top Card Telemetry */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></span>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></span>
                        <span className="font-mono-code text-xs text-zinc-400 ml-1 uppercase">
                          {study.number} // {study.category}
                        </span>
                      </div>
                      <span
                        className="px-2.5 py-0.5 font-mono-code text-[10px] uppercase font-bold rounded shadow-[2px_2px_0px_#000000]"
                        style={
                          study.badgeType === 'primary'
                            ? { backgroundColor: 'var(--primary)', color: 'var(--primary-contrast)' }
                            : study.badgeType === 'secondary'
                            ? { backgroundColor: 'var(--secondary)', color: 'var(--secondary-contrast)' }
                            : { backgroundColor: 'var(--tertiary)', color: '#000000' }
                        }
                      >
                        {study.badge}
                      </span>
                    </div>

                    {/* Media Visual Preview */}
                    <div
                      onClick={() => onSelectCaseStudy(study)}
                      className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden bg-black/40 shadow-inner cursor-pointer"
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={study.image}
                        alt={study.altText}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {study.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono-code text-[11px] px-2 py-0.5 rounded uppercase border backdrop-blur-md"
                              style={{
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                borderColor: 'var(--border-subtle)',
                                color: 'var(--primary)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-col gap-1.5">
                      <h3
                        onClick={() => onSelectCaseStudy(study)}
                        className="font-syne text-xl md:text-2xl text-white uppercase font-bold tracking-tight cursor-pointer transition-colors"
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                      >
                        {study.title}
                      </h3>
                      <p className="font-grotesk text-sm text-zinc-300 leading-relaxed">
                        {study.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="pt-5 flex items-center justify-between border-t mt-4"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <span className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-widest">
                      DELIVERY: {study.deliveryTimeline}
                    </span>
                    <button
                      onClick={() => onSelectCaseStudy(study)}
                      className="inline-flex items-center gap-1 font-mono-code text-xs font-bold uppercase tracking-wider hover:underline"
                      style={{ color: 'var(--primary)' }}
                      type="button"
                    >
                      <span>{study.actionText}</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Client Proof / Real Testimonials */}
      <section
        className="w-full px-4 md:px-8 py-12 md:py-16 relative overflow-hidden transition-colors"
        style={{ backgroundColor: 'var(--bg-main)' }}
      >
        <div
          className="absolute -top-12 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'var(--primary)', opacity: 0.08 }}
        ></div>
        <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono-code text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                // DIRECT_TRANSPARENCY
              </span>
              <h2 className="font-syne text-2xl md:text-4xl text-white uppercase font-bold tracking-tight">
                WORD ON THE DIGITAL STREET.
              </h2>
            </div>
            <div
              className="px-3 py-1 rounded-full flex items-center gap-2 text-white border self-start md:self-auto"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '2px 2px 0px var(--bg-card-alt)',
              }}
            >
              <span className="font-mono-code text-xs font-bold" style={{ color: 'var(--primary)' }}>
                ★ 5.0 RATED
              </span>
              <span className="font-mono-code text-xs text-zinc-400 uppercase">// 35 VERIFIED REVIEWS</span>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border-2 flex flex-col justify-between relative group hover:-translate-y-1 transition-all"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '5px 5px 0px var(--bg-card-alt)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                <div
                  className="absolute -top-3 right-4 px-2 py-0.5 font-mono-code text-[10px] font-bold uppercase rounded shadow-[2px_2px_0px_#000000]"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-contrast)',
                  }}
                >
                  {t.tag}
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-0.5" style={{ color: 'var(--primary)' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-grotesk text-sm text-zinc-200 italic leading-relaxed">
                    {t.quote}
                  </p>
                </div>
                <div
                  className="pt-5 flex items-center gap-3 border-t mt-4"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono-code text-xs font-bold border"
                    style={{
                      backgroundColor: 'var(--bg-card-alt)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--primary)',
                      boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
                    }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-code text-xs text-white font-bold">{t.author}</span>
                    <span className="font-mono-code text-[11px] text-zinc-400">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Dev Twin Teaser / Instant Tech FAQ */}
      <section
        className="w-full px-4 md:px-8 py-12 md:py-16 transition-colors"
        style={{ backgroundColor: 'var(--bg-card-alt)' }}
      >
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl p-6 md:p-8 border-2 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
            boxShadow: '8px 8px 0px var(--bg-card-alt)',
          }}
        >
          <div
            className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-2xl pointer-events-none"
            style={{ backgroundColor: 'var(--primary)', opacity: 0.12 }}
          ></div>

          {/* Left Column: Bot Description */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded w-fit border"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--primary)' }}
              ></span>
              <span className="font-mono-code text-xs uppercase font-bold" style={{ color: 'var(--primary)' }}>
                ALWAYS ONLINE // 24/7 INSTANT QUOTES
              </span>
            </div>
            <h2 className="font-syne text-2xl md:text-4xl text-white uppercase font-bold tracking-tight leading-tight">
              HAVE QUESTIONS ABOUT YOUR SITE? TALK TO MY{' '}
              <span style={{ color: 'var(--primary)' }}>AI DEV TWIN</span>.
            </h2>
            <p className="font-grotesk text-sm md:text-base text-zinc-300">
              Trained on my exact tech stack, pricing models starting from $300, project timelines, and development philosophy. Ask it for instant ballpark quotes, tech recommendations, or availability right now.
            </p>

            {/* Suggested Prompt Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                className="px-3 py-1.5 rounded-lg font-mono-code text-xs text-white transition-all border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
                onClick={() => handleMiniSend('How much does a small business site cost?')}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary-contrast)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-alt)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                💰 &quot;How much does a site cost? (From $300)&quot;
              </button>
              <button
                className="px-3 py-1.5 rounded-lg font-mono-code text-xs text-white transition-all border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
                onClick={() => handleMiniSend('Why React/Next.js over standard WordPress?')}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary-contrast)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-alt)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                ⚡ &quot;Why custom code over WordPress?&quot;
              </button>
              <button
                className="px-3 py-1.5 rounded-lg font-mono-code text-xs text-white transition-all border"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
                onClick={() => handleMiniSend('What is your typical turnaround timeline?')}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary-contrast)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-alt)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                ⏱️ &quot;What is your typical turnaround?&quot;
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('twin')}
                className="inline-flex items-center gap-2 font-mono-code text-xs uppercase font-bold hover:underline"
                style={{ color: 'var(--primary)' }}
                type="button"
              >
                <span>OPEN FULL INTERACTIVE TERMINAL CONSOLE</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Box */}
          <div
            className="lg:col-span-5 rounded-xl p-4 border flex flex-col gap-3"
            style={{
              backgroundColor: 'var(--bg-card-alt)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.6)',
            }}
          >
            <div
              className="flex items-center justify-between pb-2 p-2 rounded border"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)' }}>
                  terminal
                </span>
                <span className="font-mono-code text-xs text-white uppercase font-bold">HARI_DEV_TWIN_V1.8</span>
              </div>
              <span className="font-mono-code text-[10px] uppercase font-bold" style={{ color: 'var(--primary)' }}>
                [LIVE]
              </span>
            </div>

            <div className="h-44 overflow-y-auto flex flex-col gap-2 pr-1 font-mono-code text-xs">
              {miniMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded text-zinc-200 ${
                    msg.isBot ? 'bg-black/40' : 'ml-auto max-w-[85%] text-white'
                  }`}
                  style={
                    !msg.isBot
                      ? {
                          backgroundColor: 'var(--secondary)',
                          color: 'var(--secondary-contrast)',
                        }
                      : undefined
                  }
                >
                  <span
                    className="font-bold"
                    style={{ color: msg.isBot ? 'var(--primary)' : 'currentColor' }}
                  >
                    {msg.sender}:
                  </span>{' '}
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="p-2 rounded bg-black/30 text-zinc-400 flex items-center gap-1.5 text-[11px]">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: 'var(--primary)' }}
                  ></span>
                  <span>TWIN COMPUTING ANSWER...</span>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleMiniSend();
              }}
              className="flex gap-2 pt-1"
            >
              <input
                className="flex-1 bg-black/40 text-white px-3 py-2 rounded text-xs font-mono-code focus:outline-none border placeholder:text-zinc-500"
                style={{ borderColor: 'var(--border-subtle)' }}
                value={miniChatInput}
                onChange={(e) => setMiniChatInput(e.target.value)}
                placeholder="Type question or prompt..."
                type="text"
              />
              <button
                className="px-4 py-2 font-mono-code text-xs uppercase font-bold rounded hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-contrast)',
                  boxShadow: '2px 2px 0px rgba(0,0,0,0.6)',
                }}
                type="submit"
              >
                ASK
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final High-Conversion Brutalist Discovery CTA */}
      <section
        className="w-full px-4 md:px-8 py-12 md:py-16 transition-colors"
        style={{ backgroundColor: 'var(--bg-main)' }}
      >
        <div
          className="max-w-7xl mx-auto border-2 rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--primary)',
            boxShadow: '8px 8px 0px var(--primary)',
          }}
        >
          {/* Graphic Corner Sticker */}
          <div
            className="absolute -top-4 -right-4 px-4 py-1 font-mono-code text-xs uppercase font-bold tracking-widest rounded shadow-[2px_2px_0px_#000000] rotate-6 hidden sm:block"
            style={{
              backgroundColor: 'var(--tertiary)',
              color: '#000000',
            }}
          >
            LIMITED_Q2_SLOTS
          </div>

          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="font-mono-code text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--primary)' }}>
              // READY_TO_UPGRADE?
            </span>
            <h2 className="font-syne text-2xl sm:text-4xl text-white uppercase font-bold tracking-tight leading-none">
              LET&#39;S BUILD A SITE THAT TURNS CASUAL VISITORS INTO PAYING CLIENTS.
            </h2>
            <p className="font-grotesk text-sm md:text-base text-zinc-300">
              No 20-page proposals, no awkward sales pressure. We talk for 15 minutes about your business goals, I inspect your current setup, and I propose a clear fixed price starting from $300 + guaranteed delivery date.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-white">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                  check_circle
                </span>
                <span className="font-mono-code text-xs uppercase">Fixed Price Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                  check_circle
                </span>
                <span className="font-mono-code text-xs uppercase">2-Week Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                  check_circle
                </span>
                <span className="font-mono-code text-xs uppercase">100% Code Ownership</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenCal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono-code text-xs md:text-sm uppercase font-bold tracking-wider rounded-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all text-center"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                boxShadow: '4px 4px 0px var(--secondary)',
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-lg">event_available</span>
              <span>Book 15-Min Discovery</span>
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-mono-code text-xs md:text-sm uppercase font-bold tracking-wider rounded-lg border hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all text-center"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-lg" style={{ color: 'var(--primary)' }}>
                chat
              </span>
              <span>Ask Questions First</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
