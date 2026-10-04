import React from 'react';
import { ActiveTab } from '../types';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden backdrop-blur-xl border-t pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(0,0,0,0.5)] transition-colors"
      style={{
        backgroundColor: 'var(--bg-card-alt)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="grid grid-cols-3 h-16 px-2">
        <button
          onClick={() => setActiveTab('work')}
          className="flex flex-col items-center justify-center gap-1 transition-colors"
          style={{
            color: activeTab === 'work' ? 'var(--primary)' : '#a1a1aa',
            fontWeight: activeTab === 'work' ? 'bold' : 'normal',
          }}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">terminal</span>
          <span className="font-mono-code text-[11px] tracking-wider uppercase">Work</span>
        </button>

        <button
          onClick={() => setActiveTab('twin')}
          className="flex flex-col items-center justify-center gap-1 relative transition-colors"
          style={{
            color: activeTab === 'twin' ? 'var(--primary)' : '#a1a1aa',
            fontWeight: activeTab === 'twin' ? 'bold' : 'normal',
          }}
          type="button"
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            <span
              className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--primary)' }}
            ></span>
          </div>
          <span className="font-mono-code text-[11px] tracking-wider uppercase">AI Twin</span>
        </button>

        <button
          onClick={() => setActiveTab('book')}
          className="flex flex-col items-center justify-center gap-1 transition-colors"
          style={{
            color: activeTab === 'book' ? 'var(--primary)' : '#a1a1aa',
            fontWeight: activeTab === 'book' ? 'bold' : 'normal',
          }}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">send</span>
          <span className="font-mono-code text-[11px] tracking-wider uppercase">Book</span>
        </button>
      </div>
    </nav>
  );
};
