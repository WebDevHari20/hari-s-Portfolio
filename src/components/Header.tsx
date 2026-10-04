import React, { useState } from 'react';
import { ActiveTab, DensityMode, VibeTheme } from '../types';
import { THEMES } from '../themes';
import { HN_LOGO_URL, HN_AVATAR_URL } from '../data/portfolioData';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  densityMode: DensityMode;
  setDensityMode: (mode: DensityMode) => void;
  vibeTheme: VibeTheme;
  setVibeTheme: (theme: VibeTheme) => void;
  onOpenCal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  densityMode,
  setDensityMode,
  vibeTheme,
  setVibeTheme,
  onOpenCal
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const themeList = Object.values(THEMES);
  const currentTheme = THEMES[vibeTheme] || THEMES['neo-acid'];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
      style={{
        backgroundColor: 'var(--bg-card-alt)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="h-16 md:h-20 w-full px-4 md:px-8 max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('work')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            type="button"
          >
            <img
              src={HN_LOGO_URL}
              alt="HN Dev Logo"
              className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-syne text-lg md:text-xl font-bold tracking-tight text-white uppercase leading-none">
                HARI NARZARY
              </span>
              <span
                className="font-mono-code text-[10px] md:text-xs tracking-widest leading-none mt-1 transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                // WEB_DEV_ARCHITECT
              </span>
            </div>
          </button>

          {/* Availability Pill */}
          <div
            className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border transition-colors"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--primary)' }}
            ></span>
            <span
              className="font-mono-code text-[10px] uppercase font-bold tracking-wider"
              style={{ color: 'var(--primary)' }}
            >
              FROM $300 • OPEN FOR CLIENTS
            </span>
          </div>
        </div>

        {/* Primary Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1 p-1.5 rounded-lg border transition-colors"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <button
            onClick={() => setActiveTab('work')}
            className={`px-4 py-2 font-mono-code text-xs uppercase tracking-wider rounded transition-all ${
              activeTab === 'work' ? 'font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            style={
              activeTab === 'work'
                ? {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-contrast)',
                    boxShadow: '2px 2px 0px var(--secondary)',
                  }
                : undefined
            }
            type="button"
          >
            Work &amp; Showcase
          </button>
          <button
            onClick={() => setActiveTab('twin')}
            className={`px-4 py-2 font-mono-code text-xs uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'twin' ? 'font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            style={
              activeTab === 'twin'
                ? {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-contrast)',
                    boxShadow: '2px 2px 0px var(--secondary)',
                  }
                : undefined
            }
            type="button"
          >
            <span>AI Dev Twin (Bot)</span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeTab === 'twin' ? 'currentColor' : 'var(--primary)' }}
            ></span>
          </button>
          <button
            onClick={() => setActiveTab('book')}
            className={`px-4 py-2 font-mono-code text-xs uppercase tracking-wider rounded transition-all ${
              activeTab === 'book' ? 'font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            style={
              activeTab === 'book'
                ? {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-contrast)',
                    boxShadow: '2px 2px 0px var(--secondary)',
                  }
                : undefined
            }
            type="button"
          >
            Contact &amp; Inquiry
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 md:gap-3 shrink-0 relative">
          {/* Theme Switcher Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg font-mono-code text-xs transition-all shadow-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: isThemeMenuOpen ? 'var(--primary)' : 'var(--border-subtle)',
                color: '#ffffff',
              }}
              title="Change Aesthetic Theme"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ color: 'var(--primary)' }}>
                palette
              </span>
              <span className="hidden sm:inline uppercase font-bold tracking-wider">
                {currentTheme.shortName}
              </span>
              <span
                className="w-3 h-3 rounded-full border border-black/50 shadow-inner"
                style={{ backgroundColor: currentTheme.primary }}
              ></span>
            </button>

            {isThemeMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-64 border-2 p-2 z-50 flex flex-col gap-1 rounded shadow-[6px_6px_0px_#000000] animate-in fade-in zoom-in-95 duration-100"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--primary)',
                }}
              >
                <div
                  className="px-2 py-1.5 border-b flex justify-between items-center text-[10px] font-mono-code text-zinc-400 uppercase"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span className="font-bold text-white tracking-wider">SELECT AESTHETIC</span>
                  <span style={{ color: 'var(--primary)' }} className="font-bold">
                    6 PRESETS
                  </span>
                </div>
                {themeList.map((t) => {
                  const isSelected = vibeTheme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setVibeTheme(t.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`p-2 flex items-center justify-between text-left font-mono-code text-xs uppercase rounded transition-all ${
                        isSelected
                          ? 'text-white border'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isSelected ? 'var(--bg-card-alt)' : 'transparent',
                        borderColor: isSelected ? 'var(--primary)' : 'transparent',
                      }}
                      type="button"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex gap-1 items-center">
                          <span
                            className="w-3 h-3 rounded-full border border-black/40"
                            style={{ backgroundColor: t.primary }}
                          ></span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/40"
                            style={{ backgroundColor: t.secondary }}
                          ></span>
                        </span>
                        <div className="flex flex-col">
                          <span className={isSelected ? 'font-bold' : ''} style={{ color: isSelected ? 'var(--primary)' : undefined }}>
                            {t.name}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="font-bold text-xs" style={{ color: 'var(--primary)' }}>
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Density Toggles */}
          <div
            className="hidden sm:flex items-center p-1 rounded-full border gap-1"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {(['DEV', 'NEO', 'MIN'] as DensityMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setDensityMode(mode)}
                className={`px-2.5 py-1 font-mono-code text-[10px] uppercase rounded-full transition-all ${
                  densityMode === mode
                    ? 'text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: densityMode === mode ? 'var(--border-subtle)' : 'transparent',
                }}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Quick Schedule CTA Button (Tablet+) */}
          <button
            onClick={onOpenCal}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 font-mono-code text-xs font-bold uppercase rounded active:translate-x-0.5 active:translate-y-0.5 transition-all"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-contrast)',
              boxShadow: '3px 3px 0px var(--secondary)',
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span>15-MIN CALL</span>
          </button>

          {/* Profile Avatar with Live Status */}
          <button
            onClick={() => setActiveTab('twin')}
            className="flex items-center gap-2 group focus:outline-none"
            title="Chat with Hari's AI Twin"
            type="button"
          >
            <div className="relative">
              <img
                src={HN_AVATAR_URL}
                onError={(e) => {
                  e.currentTarget.src = '/hari-avatar.png';
                }}
                alt="Hari Bahadur Narzary Profile"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover object-center border-2 shadow-[1px_1px_0px_#000000] transition-colors"
                style={{ borderColor: 'var(--primary)' }}
              />
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full transition-colors"
                style={{
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 0 0 2px var(--bg-card-alt)',
                }}
              ></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
