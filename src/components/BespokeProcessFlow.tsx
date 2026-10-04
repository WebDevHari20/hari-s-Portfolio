import React, { useState, useEffect } from 'react';
import { HARI_CONTACT } from '../data/portfolioData';

interface BespokeProcessFlowProps {
  onOpenCal: () => void;
  onOpenBrief: () => void;
}

interface ProcessStage {
  id: string;
  stepNumber: string;
  title: string;
  shortTitle: string;
  days: string;
  icon: string;
  tagline: string;
  deliverables: string[];
  clientEffort: string;
  codeSnippet: string;
  metrics: string;
  telemetryStatus: string;
}

const STAGES: ProcessStage[] = [
  {
    id: 'stage-1',
    stepNumber: 'STAGE_01',
    title: 'Architecture & Technical Audit',
    shortTitle: 'DISCOVERY',
    days: 'DAYS 01–03',
    icon: 'radar',
    tagline: 'Deep-dive user flow mapping, Google Local Schema audit, and sub-second performance blueprint.',
    deliverables: [
      'Interactive Figma / Wireframe Blueprint',
      'Technical SEO & Google Local Maps Schema Plan',
      'Fixed-Price Milestone Agreement (from $300)',
      'Sub-Second Performance Milestone (<0.8s LCP)',
    ],
    clientEffort: '15–30 min intro kickoff call + brand asset collection. Zero coding required.',
    codeSnippet: `// Step 01: Architecture Config
export const siteConfig = {
  framework: 'Next.js 15 (App Router)',
  rendering: 'SSG + Edge Incremental Cache',
  performanceSpeed: '99/100 Lighthouse Mobile',
  fixedQuote: '$300 Base Guarantee',
};`,
    metrics: 'LCP BENCHMARK: < 0.6s • 0% WORDPRESS BLOAT',
    telemetryStatus: 'BLUEPRINT_LOCKED // SPEC_V2.5',
  },
  {
    id: 'stage-2',
    stepNumber: 'STAGE_02',
    title: 'Bespoke Headless Code Engine',
    shortTitle: 'HEADLESS BUILD',
    days: 'DAYS 04–08',
    icon: 'code_blocks',
    tagline: '100% custom-written Next.js & Tailwind CSS. Zero slow drag-and-drop page builders or plugin security holes.',
    deliverables: [
      'Production-Grade Next.js & TypeScript Repository',
      'Modular Tailwind CSS Design System',
      'Headless CMS (Sanity / Supabase) for easy team edits',
      'Mobile-First Responsive Layouts across 12 screen widths',
    ],
    clientEffort: 'Preview staging build in your browser with 1-click feedback comments.',
    codeSnippet: `// Step 02: Core Engine Component
export function HeroEngine({ brand }) {
  return (
    <section className="relative overflow-hidden bg-main">
      <TelemetryStrip status="HIGH_VELOCITY" />
      <ConversionHeadline text={brand.tagline} />
      <InstantBookingSync latency="18ms" />
    </section>
  );
}`,
    metrics: 'CLS: 0.00 • 100% SEMANTIC MARKUP',
    telemetryStatus: 'ENGINE_INITIALIZED // REPO_SYNCED',
  },
  {
    id: 'stage-3',
    stepNumber: 'STAGE_03',
    title: 'Conversion & Speed Maximizer',
    shortTitle: 'CONVERSION RAILS',
    days: 'DAYS 09–11',
    icon: 'bolt',
    tagline: 'Single-tap payment funnels (Stripe / Apple Pay), automated Cal.com scheduling, and instant lead capture.',
    deliverables: [
      'Stripe Elements / Multi-Currency Payment Rails',
      'Cal.com / Google Calendar Real-Time Scheduling',
      'Automated SMS & Direct Email Notification Webhooks',
      'Lossless WebP/AVIF Asset Optimization & Lazy-Loading',
    ],
    clientEffort: 'Test simulated checkout or booking flow with dummy test cards.',
    codeSnippet: `// Step 03: Fast Checkout & Lead Pipeline
export async function createCheckoutSession({ planId, client }) {
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'link'],
    mode: 'payment',
    success_url: '/thank-you?session_id={CHECKOUT_SESSION_ID}',
  });
  return stripeSession.url;
}`,
    metrics: '+180% CONVERSION LIFT • 0.4s TTFB',
    telemetryStatus: 'CONVERSION_TUNED // CHECKOUT_ACTIVE',
  },
  {
    id: 'stage-4',
    stepNumber: 'STAGE_04',
    title: 'Edge Hardening & Security SLA',
    shortTitle: 'EDGE SECURITY',
    days: 'DAYS 12–13',
    icon: 'security',
    tagline: 'Cloudflare enterprise CDN caching, automated SSL encryption, and multi-browser accessibility verification.',
    deliverables: [
      'Global Edge CDN Setup with Sub-10ms Routing',
      'Automated Free SSL / HTTPS Certificate Provisioning',
      'DDoS Mitigation & Security Response Headers (CSP/HSTS)',
      'Cross-Device Safari, Chrome, iOS & Android QA Suite',
    ],
    clientEffort: 'Final review on private staging link; provide one-click sign-off.',
    codeSnippet: `// Step 04: Edge Cache & Security Headers
export const runtime = 'edge';
export const revalidate = 86400; // 24-Hour Instant Stale-While-Revalidate

export const headers = {
  'Content-Security-Policy': "default-src 'self'",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
};`,
    metrics: '99.99% UPTIME SLA • DDoS SHIELD ACTIVE',
    telemetryStatus: 'HARDENED // STAGING_VERIFIED',
  },
  {
    id: 'stage-5',
    stepNumber: 'STAGE_05',
    title: 'Zero-Downtime Launch & IP Handover',
    shortTitle: 'LAUNCH & HANDOVER',
    days: 'DAY 14 // GO-LIVE',
    icon: 'rocket_launch',
    tagline: 'Seamless DNS cutover without losing a second of traffic. 100% source code repository transferred to you.',
    deliverables: [
      'Instant DNS Propagation to Live Custom Domain',
      '100% Full Codebase & Asset Ownership to Your GitHub',
      'Choice: Optional $99/mo Maintenance OR $0 Self-Management',
      'Comprehensive Video Walkthrough for Non-Technical Edits',
    ],
    clientEffort: 'Pop champagne! Your business is officially live and converting traffic 24/7.',
    codeSnippet: `// Step 05: 100% Client Ownership Handover
export const ownershipAgreement = {
  codeRepository: 'Full Admin Rights Given to Client',
  ipOwnership: '100% Transferred with Zero Vendor Lock-in',
  maintenanceOption1: '$99–$100/mo Hands-Off Care (~₹10k)',
  maintenanceOption2: '$0/mo Zero Maintenance - Renew on Own',
  status: 'PRODUCTION_LIVE_24_7',
};`,
    metrics: '100% IP TRANSFERRED • 99+ LIGHTHOUSE',
    telemetryStatus: 'LIVE_IN_PRODUCTION // MISSION_ACCOMPLISHED',
  },
];

export const BespokeProcessFlow: React.FC<BespokeProcessFlowProps> = ({
  onOpenCal,
  onOpenBrief,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const activeStage = STAGES[activeStageIndex];

  // Automated simulation timer
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <section
      className="w-full px-4 md:px-8 py-12 md:py-20 border-t transition-colors relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card-alt)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Background Ambience Gradient */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.06 }}
      ></div>
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--secondary)', opacity: 0.06 }}
      ></div>

      <div className="max-w-[1720px] mx-auto flex flex-col gap-10 relative z-10">
        {/* Section Header with Telemetry Controls */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span
                className="font-mono-code text-xs uppercase tracking-widest font-bold"
                style={{ color: 'var(--primary)' }}
              >
                // INTERACTIVE_ENGINEERING_ROADMAP
              </span>
              <span className="w-10 h-0.5" style={{ backgroundColor: 'var(--primary)' }}></span>
              <span className="font-mono-code text-[11px] text-zinc-400">
                [SVG_DATA_FLOW_v2.5]
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-4xl lg:text-5xl text-white uppercase font-extrabold tracking-tight leading-tight">
              THE BESPOKE HIGH-PERFORMANCE PROCESS.
            </h2>
            <p className="font-grotesk text-sm md:text-base text-zinc-300 leading-relaxed mt-1">
              No slow drag-and-drop themes. No opaque hourly invoices. Follow the interactive visual pipeline to see exactly how your business website goes from kickoff to printing revenue in 14 days.
            </p>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="px-4 py-2 rounded font-mono-code text-xs font-bold uppercase transition-all flex items-center gap-2 border active:translate-x-0.5 active:translate-y-0.5 shadow-md"
              style={{
                backgroundColor: isSimulating ? 'var(--primary)' : 'var(--bg-card)',
                color: isSimulating ? 'var(--primary-contrast)' : '#ffffff',
                borderColor: 'var(--primary)',
                boxShadow: isSimulating ? '3px 3px 0px var(--secondary)' : 'none',
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">
                {isSimulating ? 'pause_circle' : 'play_circle'}
              </span>
              <span>
                {isSimulating ? 'PAUSE PIPELINE SIMULATION' : 'RUN PIPELINE SIMULATION'}
              </span>
            </button>

            <button
              onClick={onOpenCal}
              className="px-4 py-2 rounded font-mono-code text-xs font-bold uppercase transition-all flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                boxShadow: '3px 3px 0px var(--secondary)',
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>BOOK 15-MIN CALL</span>
            </button>
          </div>
        </div>

        {/* SVG PIPELINE VISUAL FLOW CHART (DESKTOP & TABLET) */}
        <div
          className="w-full rounded-2xl border-2 p-6 md:p-8 flex flex-col gap-6 relative transition-colors shadow-2xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
            boxShadow: '8px 8px 0px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top Stage Indicators */}
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3 font-mono-code text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: 'var(--primary)' }}
              ></span>
              <span className="text-white font-bold uppercase">
                ACTIVE_NODE: {activeStage.stepNumber} // {activeStage.shortTitle}
              </span>
              <span className="hidden sm:inline text-zinc-500">•</span>
              <span className="hidden sm:inline" style={{ color: 'var(--secondary)' }}>
                {activeStage.days}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono-code text-zinc-400">
              <span className="material-symbols-outlined text-xs" style={{ color: 'var(--primary)' }}>
                touch_app
              </span>
              <span>TAP ANY NODE TO INSPECT TELEMETRY</span>
            </div>
          </div>

          {/* Interactive SVG Connector Canvas */}
          <div className="w-full relative py-4">
            <svg
              className="w-full h-24 hidden md:block select-none overflow-visible"
              viewBox="0 0 1000 90"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.8" />
                </linearGradient>

                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base Pipeline Channel Track */}
              <line
                x1="80"
                y1="45"
                x2="920"
                y2="45"
                stroke="var(--border-subtle)"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Active Pipeline Channel */}
              <line
                x1="80"
                y1="45"
                x2={80 + activeStageIndex * 210}
                y2="45"
                stroke="url(#pipeGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />

              {/* Flowing Accent Line */}
              <line
                x1="80"
                y1="45"
                x2="920"
                y2="45"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* 5 Connected Circuit Nodes on the SVG Track */}
              {STAGES.map((stg, idx) => {
                const cx = 80 + idx * 210;
                const isActive = activeStageIndex === idx;
                const isPassed = activeStageIndex > idx;

                return (
                  <g
                    key={stg.id}
                    onClick={() => setActiveStageIndex(idx)}
                    className="cursor-pointer group"
                  >
                    {/* Active Halo Indicator */}
                    {isActive && (
                      <circle
                        cx={cx}
                        cy="45"
                        r="24"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                    )}

                    {/* Outer Glow Halo */}
                    <circle
                      cx={cx}
                      cy="45"
                      r={isActive ? 22 : 16}
                      fill={isActive ? 'var(--primary)' : isPassed ? 'var(--secondary)' : 'var(--bg-card-alt)'}
                      stroke={isActive ? 'var(--primary)' : 'var(--border-subtle)'}
                      strokeWidth={isActive ? '3' : '2'}
                      filter={isActive ? 'url(#nodeGlow)' : undefined}
                      className="transition-all duration-300 group-hover:scale-110"
                    />

                    {/* Center Core Dot */}
                    <circle
                      cx={cx}
                      cy="45"
                      r={isActive ? 8 : 5}
                      fill={isActive ? 'var(--primary-contrast)' : '#ffffff'}
                      className="transition-all duration-300"
                    />

                    {/* Node Text Label in SVG */}
                    <text
                      x={cx}
                      y="82"
                      textAnchor="middle"
                      fill={isActive ? 'var(--primary)' : '#a1a1aa'}
                      fontFamily="monospace"
                      fontSize="11"
                      fontWeight={isActive ? 'bold' : 'normal'}
                      className="transition-colors uppercase tracking-wider"
                    >
                      {stg.stepNumber}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Stage Selector Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-2">
              {STAGES.map((stage, idx) => {
                const isSelected = activeStageIndex === idx;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStageIndex(idx)}
                    className="cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between gap-3 relative select-none"
                    style={{
                      backgroundColor: isSelected ? 'var(--bg-card-alt)' : 'var(--bg-card)',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                      boxShadow: isSelected ? '5px 5px 0px var(--primary)' : '2px 2px 0px var(--bg-card-alt)',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors"
                        style={{
                          backgroundColor: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                          color: isSelected ? 'var(--primary-contrast)' : 'var(--primary)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                        }}
                      >
                        <span className="material-symbols-outlined text-lg">{stage.icon}</span>
                      </div>
                      <span
                        className="font-mono-code text-[10px] px-2 py-0.5 rounded font-bold uppercase"
                        style={{
                          backgroundColor: isSelected ? 'var(--secondary)' : 'rgba(255,255,255,0.06)',
                          color: isSelected ? 'var(--secondary-contrast)' : '#a1a1aa',
                        }}
                      >
                        {stage.days}
                      </span>
                    </div>

                    <div>
                      <div className="font-mono-code text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                        {stage.stepNumber}
                      </div>
                      <h3
                        className="font-syne text-sm sm:text-base font-bold uppercase tracking-tight leading-snug mt-0.5"
                        style={{ color: isSelected ? '#ffffff' : '#e4e4e7' }}
                      >
                        {stage.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t text-[11px] font-mono-code" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span style={{ color: isSelected ? 'var(--primary)' : '#71717a' }}>
                        {isSelected ? '● ACTIVE TELEMETRY' : 'CLICK TO VIEW'}
                      </span>
                      <span
                        className="material-symbols-outlined text-sm transition-transform"
                        style={{
                          transform: isSelected ? 'translateX(2px)' : 'none',
                          color: isSelected ? 'var(--primary)' : '#71717a',
                        }}
                      >
                        arrow_forward
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DEEP-DIVE STAGE TELEMETRY INSPECTOR PANEL */}
          <div
            className="p-5 md:p-8 rounded-xl border-2 flex flex-col lg:flex-row gap-8 relative overflow-hidden transition-all"
            style={{
              backgroundColor: 'var(--bg-card-alt)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {/* Left Telemetry Column: Deliverables & Client Role */}
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded font-mono-code text-xs font-bold uppercase"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-contrast)',
                    }}
                  >
                    {activeStage.stepNumber}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded font-mono-code text-xs font-bold uppercase"
                    style={{
                      backgroundColor: 'var(--secondary)',
                      color: 'var(--secondary-contrast)',
                    }}
                  >
                    {activeStage.days}
                  </span>
                  <span className="font-mono-code text-xs text-zinc-400">
                    // {activeStage.telemetryStatus}
                  </span>
                </div>

                <h3 className="font-syne text-xl md:text-3xl text-white font-extrabold uppercase tracking-tight">
                  {activeStage.title}
                </h3>
                <p className="font-grotesk text-sm md:text-base text-zinc-300 leading-relaxed">
                  {activeStage.tagline}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-2 flex flex-col gap-2.5">
                  <span className="font-mono-code text-xs text-zinc-400 uppercase tracking-widest font-bold">
                    VERIFIED DELIVERABLES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStage.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border flex items-start gap-2.5 text-xs text-zinc-200 font-grotesk"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          borderColor: 'var(--border-subtle)',
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-base shrink-0 font-bold"
                          style={{ color: 'var(--primary)' }}
                        >
                          check_circle
                        </span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Responsibility Callout */}
                <div
                  className="p-3.5 rounded-lg border flex items-start gap-3 mt-1"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="material-symbols-outlined text-lg shrink-0" style={{ color: 'var(--secondary)' }}>
                    handshake
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono-code text-[11px] font-bold uppercase text-white tracking-wider">
                      CLIENT TIME COMMITMENT:
                    </span>
                    <span className="font-grotesk text-xs text-zinc-300 mt-0.5">
                      {activeStage.clientEffort}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Navigation & Action Triggers */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenCal}
                  className="px-5 py-3 rounded-lg font-mono-code text-xs md:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-contrast)',
                    boxShadow: '4px 4px 0px var(--secondary)',
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>BOOK 15-MIN KICKOFF CALL</span>
                </button>

                <button
                  onClick={onOpenBrief}
                  className="px-5 py-3 rounded-lg font-mono-code text-xs md:text-sm font-bold uppercase tracking-wider text-white border-2 transition-all flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                    assignment
                  </span>
                  <span>SUBMIT PROJECT BRIEF (FROM $300)</span>
                </button>
              </div>
            </div>

            {/* Right Telemetry Column: Live Code Engine & Architecture Verification */}
            <div className="w-full lg:w-[460px] 2xl:w-[500px] shrink-0 flex flex-col gap-4">
              <div
                className="rounded-xl border overflow-hidden shadow-xl"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {/* Code Terminal Header */}
                <div
                  className="px-4 py-2.5 flex items-center justify-between border-b"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></span>
                    <span className="font-mono-code text-xs text-zinc-300 ml-2 uppercase">
                      ARCH_{activeStage.stepNumber}.ts
                    </span>
                  </div>
                  <span className="font-mono-code text-[10px] text-zinc-400">
                    ENV: PRODUCTION
                  </span>
                </div>

                {/* Code Window */}
                <div className="p-4 font-mono-code text-xs text-zinc-200 overflow-x-auto leading-relaxed bg-black/60">
                  <pre>{activeStage.codeSnippet}</pre>
                </div>

                {/* Telemetry Metric Bar */}
                <div
                  className="p-3 border-t flex items-center justify-between font-mono-code text-xs"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span style={{ color: 'var(--primary)' }}>
                    {activeStage.metrics}
                  </span>
                  <span className="text-zinc-400 font-bold">100% VERIFIED</span>
                </div>
              </div>

              {/* Direct Notification & Contact Assurance */}
              <div
                className="p-4 rounded-xl border flex items-center justify-between gap-3 font-mono-code text-xs text-zinc-300"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                    mail
                  </span>
                  <span>Direct developer line: <strong className="text-white underline">{HARI_CONTACT.email}</strong></span>
                </div>
                <span className="font-bold text-[11px]" style={{ color: 'var(--primary)' }}>
                  &lt; 3H SLA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
