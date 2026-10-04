/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CaseStudy, DensityMode, VibeTheme } from './types';
import { THEMES, applyThemeToDom } from './themes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { WorkShowcase } from './components/WorkShowcase';
import { AiDevTwin } from './components/AiDevTwin';
import { BookWebsite } from './components/BookWebsite';
import { CalModal } from './components/CalModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SpecModal } from './components/SpecModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('work');
  const [vibeTheme, setVibeTheme] = useState<VibeTheme>('neo-acid');
  const [densityMode, setDensityMode] = useState<DensityMode>('DEV');
  
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    applyThemeToDom(vibeTheme);
  }, [vibeTheme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleSetTheme = (newTheme: VibeTheme) => {
    setVibeTheme(newTheme);
    const themeObj = THEMES[newTheme];
    if (themeObj) {
      showToast(`THEME ACTIVATED: ${themeObj.name.toUpperCase()}`);
    }
  };

  const handleSetDensity = (newDensity: DensityMode) => {
    setDensityMode(newDensity);
    showToast(`LAYOUT DENSITY: ${newDensity}`);
  };

  const handleConfirmCalSlot = (slot: string) => {
    showToast(`DISCOVERY CALL RESERVED FOR: ${slot}`);
  };

  return (
    <div
      className="min-h-screen text-[#e3e1e9] flex flex-col justify-between selection:bg-[var(--primary)] selection:text-[var(--primary-contrast)] transition-colors duration-300"
      data-density={densityMode}
      style={{ backgroundColor: 'var(--bg-main)' }}
    >
      {/* Top Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        densityMode={densityMode}
        setDensityMode={handleSetDensity}
        vibeTheme={vibeTheme}
        setVibeTheme={handleSetTheme}
        onOpenCal={() => setIsCalOpen(true)}
      />

      {/* Main Content View with padding for fixed header */}
      <main className="w-full pt-16 md:pt-20 flex-1 flex flex-col">
        {activeTab === 'work' && (
          <WorkShowcase
            setActiveTab={setActiveTab}
            vibeTheme={vibeTheme}
            setVibeTheme={handleSetTheme}
            onOpenCal={() => setIsCalOpen(true)}
            onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
          />
        )}

        {activeTab === 'twin' && (
          <AiDevTwin
            onOpenCal={() => setIsCalOpen(true)}
            onOpenSpec={() => setIsSpecOpen(true)}
          />
        )}

        {activeTab === 'book' && (
          <BookWebsite
            onOpenCal={() => setIsCalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Tab Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Global Modals */}
      <CalModal
        isOpen={isCalOpen}
        onClose={() => setIsCalOpen(false)}
        onConfirm={handleConfirmCalSlot}
      />

      <ArchitectureModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onBookCall={() => {
          setSelectedCaseStudy(null);
          setIsCalOpen(true);
        }}
      />

      <SpecModal
        isOpen={isSpecOpen}
        onClose={() => setIsSpecOpen(false)}
        onBookCall={() => {
          setIsSpecOpen(false);
          setIsCalOpen(true);
        }}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-[#1a1b21] text-white px-5 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 border-2"
          style={{
            borderColor: 'var(--primary)',
            boxShadow: '4px 4px 0px var(--primary)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
            check_circle
          </span>
          <span className="font-mono-code text-xs uppercase tracking-wider font-bold">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}
