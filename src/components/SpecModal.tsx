import React from 'react';

interface SpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
}

export const SpecModal: React.FC<SpecModalProps> = ({ isOpen, onClose, onBookCall }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative flex flex-col gap-6 text-[#e3e1e9] border-2 animate-in fade-in zoom-in-95 duration-150 shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--primary)',
          boxShadow: '8px 8px 0px var(--primary)',
        }}
      >
        {/* Modal Top */}
        <div
          className="flex items-center justify-between border-b pb-4"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center font-bold font-mono shadow-[2px_2px_0px_#000000]"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
              }}
            >
              PDF
            </div>
            <div>
              <span className="font-mono-code text-xs uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                // OFFICIAL_SPEC_SHEET_V2.5
              </span>
              <h2 className="font-syne text-xl md:text-2xl text-white uppercase font-bold tracking-tight">
                Hari Narzary // Web Dev &amp; Architecture Specs
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2"
            type="button"
            aria-label="Close spec sheet"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Spec Overview Notice */}
        <div
          className="p-3 border-l-4 font-mono-code text-xs text-zinc-300 flex items-center justify-between flex-wrap gap-2"
          style={{
            backgroundColor: 'var(--bg-card-alt)',
            borderLeftColor: 'var(--primary)',
          }}
        >
          <span>VALID FOR: Q2 2025 – Q3 2025 SPRINTS</span>
          <span className="font-bold" style={{ color: 'var(--primary)' }}>100% FIXED-PRICE GUARANTEE</span>
        </div>

        {/* Pricing Tiers Table */}
        <div className="flex flex-col gap-3">
          <h3 className="font-syne text-lg uppercase text-white font-bold tracking-tight">
            1. Standard Sprint Pricing Models (Starts from $300)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="p-4 border flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div>
                <span className="font-mono-code text-xs uppercase font-bold" style={{ color: 'var(--primary)' }}>
                  STARTER LAUNCH
                </span>
                <div className="font-syne text-2xl font-bold text-white mt-1">$300 – $1,200</div>
                <p className="text-xs font-grotesk text-zinc-400 mt-2">
                  Best for local businesses, solo founders, and creators needing a fast, bespoke marketing presence.
                </p>
                <ul className="text-xs text-zinc-300 space-y-1.5 mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <li>✓ 1–5 custom designed sections</li>
                  <li>✓ Sub-second mobile loading</li>
                  <li>✓ Google Maps Local SEO Schema</li>
                  <li>✓ 7–10 day turnaround</li>
                </ul>
              </div>
            </div>

            <div
              className="p-4 border-2 flex flex-col justify-between relative shadow-lg"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--primary)',
                boxShadow: '4px 4px 0px var(--secondary)',
              }}
            >
              <span
                className="absolute -top-3 right-3 px-2 py-0.5 font-mono-code text-[10px] font-bold uppercase rounded shadow"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-contrast)',
                }}
              >
                MOST POPULAR
              </span>
              <div>
                <span className="font-mono-code text-xs uppercase font-bold" style={{ color: 'var(--primary)' }}>
                  GROWTH COMMERCE
                </span>
                <div className="font-syne text-2xl font-bold text-white mt-1">$1,200 – $2,800</div>
                <p className="text-xs font-grotesk text-zinc-400 mt-2">
                  Ideal for scaling brands needing Headless Shopify, Stripe checkout, or automated customer booking portals.
                </p>
                <ul className="text-xs text-zinc-300 space-y-1.5 mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <li>✓ Full store / booking catalog</li>
                  <li>✓ Headless cart or Cal.com sync</li>
                  <li>✓ Dynamic headless CMS (Sanity)</li>
                  <li>✓ 10–14 day turnaround</li>
                </ul>
              </div>
            </div>

            <div
              className="p-4 border flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div>
                <span className="font-mono-code text-xs uppercase font-bold" style={{ color: 'var(--secondary)' }}>
                  FLAGSHIP CUSTOM
                </span>
                <div className="font-syne text-2xl font-bold text-white mt-1">$3,500+</div>
                <p className="text-xs font-grotesk text-zinc-400 mt-2">
                  For complex web apps, high-end 3D WebGL portfolios, multi-role portals, and custom SaaS platforms.
                </p>
                <ul className="text-xs text-zinc-300 space-y-1.5 mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <li>✓ Bespoke shaders &amp; animations</li>
                  <li>✓ Full database &amp; authentication</li>
                  <li>✓ Custom API integrations</li>
                  <li>✓ 2–4 week milestone roadmap</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stack Specs */}
        <div className="flex flex-col gap-3">
          <h3 className="font-syne text-lg uppercase text-white font-bold tracking-tight">2. Core Architectural Standards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-grotesk">
            <div className="p-3 border" style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border-subtle)' }}>
              <span className="font-mono-code text-xs uppercase font-bold block mb-1" style={{ color: 'var(--primary)' }}>
                FRONTEND &amp; FRAMEWORK
              </span>
              <p className="text-zinc-300">Next.js 15 App Router, React 19, TypeScript, Tailwind CSS. Zero jQuery, zero bloated page builder scripts.</p>
            </div>
            <div className="p-3 border" style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border-subtle)' }}>
              <span className="font-mono-code text-xs uppercase font-bold block mb-1" style={{ color: 'var(--secondary)' }}>
                PERFORMANCE GUARANTEE
              </span>
              <p className="text-zinc-300">Targeting 95+ Core Web Vitals on mobile and desktop. Optimized AVIF/WebP image pipelines with Edge CDN caching.</p>
            </div>
            <div className="p-3 border" style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border-subtle)' }}>
              <span className="font-mono-code text-xs uppercase font-bold block mb-1" style={{ color: 'var(--primary)' }}>
                CODE OWNERSHIP
              </span>
              <p className="text-zinc-300">100% intellectual property rights and full Git repo ownership transferred upon deployment. Zero monthly lock-in fees.</p>
            </div>
            <div className="p-3 border" style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border-subtle)' }}>
              <span className="font-mono-code text-xs uppercase font-bold block mb-1" style={{ color: 'var(--tertiary)' }}>
                COMMUNICATION SLA
              </span>
              <p className="text-zinc-300">Direct dedicated Slack / WhatsApp channel with Hari. Guaranteed &lt; 24h response time during active sprint cycles.</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-2 text-zinc-200 font-mono-code text-xs uppercase flex items-center justify-center gap-1.5 border"
            style={{
              backgroundColor: 'var(--bg-card-alt)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>PRINT / SAVE AS PDF</span>
          </button>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-zinc-300 font-mono-code text-xs uppercase border"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 font-mono-code text-xs font-bold uppercase active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                boxShadow: '3px 3px 0px var(--secondary)',
              }}
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>BOOK 15-MIN DISCOVERY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
