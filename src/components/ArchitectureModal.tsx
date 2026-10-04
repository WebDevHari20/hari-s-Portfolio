import React from 'react';
import { CaseStudy } from '../types';

interface ArchitectureModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onBookCall: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ caseStudy, onClose, onBookCall }) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative flex flex-col gap-6 text-[#e3e1e9] border-2 animate-in fade-in zoom-in-95 duration-150 shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--primary)',
          boxShadow: '8px 8px 0px var(--secondary)',
        }}
      >
        {/* Top Header */}
        <div
          className="flex items-center justify-between border-b pb-4"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-xs uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                {caseStudy.number} // ARCHITECTURAL_TELEMETRY
              </span>
              <span
                className="px-2 py-0.5 font-mono-code text-[10px] uppercase font-bold"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-contrast)',
                }}
              >
                {caseStudy.badge}
              </span>
            </div>
            <h2 className="font-syne text-2xl md:text-3xl text-white uppercase font-bold tracking-tight mt-1">
              {caseStudy.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2"
            type="button"
            aria-label="Close case study modal"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Media Preview & Core Stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div
            className="md:col-span-7 rounded-lg overflow-hidden border shadow-inner relative group"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <img
              src={caseStudy.image}
              alt={caseStudy.altText}
              className="w-full h-64 object-cover filter contrast-105"
            />
            <div className="absolute bottom-2 left-2 flex gap-1.5 flex-wrap">
              {caseStudy.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 font-mono-code text-[10px] uppercase border backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--primary)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Lighthouse Score Card */}
          <div
            className="md:col-span-5 p-4 border flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-card-alt)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span className="font-mono-code text-xs text-zinc-400 uppercase tracking-widest">
              // GOOGLE_LIGHTHOUSE_AUDIT
            </span>
            <div className="grid grid-cols-2 gap-3 py-2">
              <div
                className="flex flex-col items-center p-2 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="font-mono-code text-[11px] text-zinc-400">PERFORMANCE</span>
                <span className="font-syne text-2xl font-bold mt-1" style={{ color: 'var(--primary)' }}>
                  {caseStudy.details.lighthouse.performance}/100
                </span>
              </div>
              <div
                className="flex flex-col items-center p-2 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="font-mono-code text-[11px] text-zinc-400">SEO_SCORE</span>
                <span className="font-syne text-2xl font-bold mt-1" style={{ color: 'var(--primary)' }}>
                  {caseStudy.details.lighthouse.seo}/100
                </span>
              </div>
              <div
                className="flex flex-col items-center p-2 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="font-mono-code text-[11px] text-zinc-400">IMPACT_METRIC</span>
                <span className="font-syne text-2xl font-bold mt-1" style={{ color: 'var(--secondary)' }}>
                  {caseStudy.metrics}
                </span>
              </div>
              <div
                className="flex flex-col items-center p-2 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="font-mono-code text-[11px] text-zinc-400">SPRINT_TIME</span>
                <span className="font-syne text-2xl font-bold text-white mt-1">
                  {caseStudy.deliveryTimeline}
                </span>
              </div>
            </div>
            <span className="font-mono-code text-[10px] text-zinc-400">
              AUDITED ON REAL MOBILE VIEWPORTS VIA CHROME DEVTOOLS
            </span>
          </div>
        </div>

        {/* Narrative & Before/After */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono-code text-xs uppercase" style={{ color: 'var(--primary)' }}>
              // PROBLEM &amp; SOLUTION DEEP_DIVE
            </span>
            <p className="font-grotesk text-sm text-zinc-300 leading-relaxed">
              {caseStudy.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div
              className="p-4 border"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-1.5 text-red-400 font-mono-code text-xs uppercase font-bold mb-1.5">
                <span className="material-symbols-outlined text-sm">cancel</span>
                <span>BEFORE (CHALLENGE / BOTTLENECK)</span>
              </div>
              <p className="font-grotesk text-xs text-zinc-300">
                {caseStudy.details.challenge}
              </p>
            </div>
            <div
              className="p-4 border"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--primary)',
              }}
            >
              <div
                className="flex items-center gap-1.5 font-mono-code text-xs uppercase font-bold mb-1.5"
                style={{ color: 'var(--primary)' }}
              >
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>AFTER (HARI&apos;S CUSTOM ARCHITECTURE)</span>
              </div>
              <p className="font-grotesk text-xs text-zinc-200">
                {caseStudy.details.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Full Tech Stack Component Grid */}
        <div className="flex flex-col gap-2">
          <span className="font-mono-code text-xs uppercase text-zinc-400">
            // ARCHITECTURE_DEPENDENCIES
          </span>
          <div className="flex flex-wrap gap-2">
            {caseStudy.details.techStack.map((item: string) => (
              <span
                key={item}
                className="px-3 py-1 font-mono-code text-xs uppercase border text-zinc-200"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div
          className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: 'var(--primary)' }}
            ></span>
            <span className="font-mono-code text-xs text-zinc-400 uppercase">
              DELIVERABLE: 100% PRODUCTION-READY REPO
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-zinc-300 font-mono-code text-xs uppercase border"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              BACK TO WORK
            </button>
            <button
              onClick={onBookCall}
              className="flex-1 sm:flex-none px-5 py-2.5 font-mono-code text-xs font-bold uppercase active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                boxShadow: '3px 3px 0px var(--secondary)',
              }}
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>GET SIMILAR SITE (FROM $300)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
