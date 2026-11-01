import React, { useState } from 'react';
import { HN_AVATAR_URL, FAQS, HARI_CONTACT } from '../data/portfolioData';

interface BookWebsiteProps {
  onOpenCal: () => void;
}

export const BookWebsite: React.FC<BookWebsiteProps> = ({ onOpenCal }) => {
  const [projectType, setProjectType] = useState<string>('Small Business Marketing Site');
  const [timeline, setTimeline] = useState<string>('Standard (2–3 weeks)');
  const [budgetTier, setBudgetTier] = useState<string>('Growth ($1,200 – $2,800)');
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [currentSite, setCurrentSite] = useState('');
  const [projectLore, setProjectLore] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const scopeOptions = [
    {
      id: 'marketing',
      title: 'Small Business Marketing Site',
      description: 'High-converting landing pages, company profiles, and lead acquisition engines starting from $300.',
      tag: 'EST: 5–8 CUSTOM SECTIONS',
      badge: 'POPULAR',
      icon: 'storefront',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce / Online Store',
      description: 'Shopify headless or custom Next.js storefronts with Stripe checkout & automated inventory.',
      tag: 'EST: STRIPE / SHOPIFY ENGINE',
      icon: 'shopping_bag',
    },
    {
      id: 'booking',
      title: 'Booking & Service Appointments',
      description: 'Direct schedule synchronization, deposit prepayments, automated SMS/email reminders.',
      tag: 'EST: CALENDLY / CAL SYNC',
      icon: 'event_available',
    },
    {
      id: 'portfolio',
      title: 'Portfolio / Studio Showcase',
      description: 'High-impact interactive case studies, motion typography, and bespoke design assets.',
      tag: 'EST: IMMERSIVE MOTION',
      icon: 'view_in_ar',
    },
    {
      id: 'redesign',
      title: 'Website Redesign / Speed Overhaul',
      description: 'Migrate sluggish WordPress/Wix systems to blazing 99+ PageSpeed React & Next.js stacks.',
      tag: 'EST: REBUILD & SPEED',
      icon: 'speed',
      fullSpan: true,
    },
  ];

  const timelineOptions = [
    {
      id: 'rush',
      label: 'ASAP / Rush (1 week)',
      badge: 'PRIORITY_SPRINT',
    },
    {
      id: 'standard',
      label: 'Standard (2–3 weeks)',
      badge: 'RECOMMENDED',
    },
    {
      id: 'flexible',
      label: 'Flexible (Next Month)',
      badge: 'PLANNED',
    },
  ];

  const tierOptions = [
    {
      id: 'starter',
      tierCode: 'BASE_V1',
      title: 'Starter',
      price: '$300 – $1,200',
      description: 'Clean high-speed marketing site',
    },
    {
      id: 'growth',
      tierCode: 'OPTIMAL',
      title: 'Growth',
      price: '$1,200 – $2,800',
      description: 'Headless shop or booking funnel',
      isPopular: true,
    },
    {
      id: 'custom',
      tierCode: 'FLAGSHIP',
      title: 'Full Custom',
      price: '$3,500+',
      description: 'Enterprise / WebGL / bespoke app',
    },
    {
      id: 'retainer',
      tierCode: 'RETAINER',
      title: 'Monthly Care',
      price: '$99 / mo',
      description: 'Maintenance, updates & audits',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          contactName,
          contactHandle,
          currentSite,
          projectType,
          timeline,
          budgetTier,
          projectLore,
        }),
      });
      if (!response.ok) {
        let errorDetail = '';
        try {
          const data = await response.json();
          errorDetail = data?.error || data?.message || '';
        } catch {
          const text = await response.text().catch(() => '');
          errorDetail = text ? `Server response (${response.status}): ${text.slice(0, 150)}` : `Server response (${response.status})`;
        }
        throw new Error(errorDetail || 'The inquiry could not be sent.');
      }
      setIsSubmitted(true);
    } catch (err) {
      setSubmissionError(err instanceof Error ? err.message : 'The inquiry could not be sent.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full pb-16 lg:pb-8 transition-colors">
      {/* Top Banner Ticker */}
      <div
        className="w-full overflow-hidden py-2 shadow-md flex items-center select-none border-b transition-colors"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-contrast)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="animate-marquee font-mono-code text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm font-bold">bolt</span> INQUIRY_PROTOCOL_ACTIVE
          </span>
          <span className="px-2">•</span>
          <span className="px-4">Q2 PROJECT AVAILABILITY: [2 / 4 SLOTS OPEN]</span>
          <span className="px-2">•</span>
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm">schedule</span> GUARANTEED 24-HOUR PROPOSAL TURNAROUND
          </span>
          <span className="px-2">•</span>
          <span className="px-4">PRICING STARTS FROM JUST $300 • 100% CODE OWNERSHIP</span>
          <span className="px-2">•</span>
          <span className="flex items-center gap-1.5 px-4">
            <span className="material-symbols-outlined text-sm font-bold">bolt</span> INQUIRY_PROTOCOL_ACTIVE
          </span>
          <span className="px-2">•</span>
          <span className="px-4">Q2 PROJECT AVAILABILITY: [2 / 4 SLOTS OPEN]</span>
        </div>
      </div>

      {/* Main Wrapper */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-8">
        {/* Header Hero Block */}
        <div className="flex flex-col gap-4">
          {/* Fast Discovery Call Bar */}
          <button
            onClick={onOpenCal}
            className="inline-flex items-center justify-between w-full max-w-3xl p-3 px-4 text-white rounded-lg shadow-xl hover:translate-x-1 transition-transform group text-left border"
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--secondary-contrast)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '3px 3px 0px var(--primary)',
            }}
            type="button"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl" style={{ color: 'var(--primary)' }}>
                calendar_month
              </span>
              <span className="font-mono-code text-xs md:text-sm tracking-wider">
                Skip the form? Book a quick 15-min discovery call on Cal.com →
              </span>
            </div>
            <span
              className="font-mono-code text-[11px] px-3 py-1 rounded-full uppercase tracking-widest font-bold transition-colors"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                color: 'var(--primary)',
              }}
            >
              INSTANT_SYNC
            </span>
          </button>

          {/* Headline & Subtitle with Developer Photo */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="flex flex-col max-w-3xl">
              <div
                className="flex items-center gap-2 font-mono-code text-xs uppercase tracking-widest mb-2 font-bold"
                style={{ color: 'var(--primary)' }}
              >
                <span>[SYS_STEP_00]</span>
                <span>///</span>
                <span>TRANSMIT_CLIENT_BRIEF</span>
              </div>
              <h1 className="font-syne text-3xl sm:text-5xl lg:text-6xl uppercase text-white font-extrabold tracking-tight leading-none">
                LET’S BUILD YOUR BUSINESS WEBSITE <span className="inline-block hover:rotate-12 transition-transform cursor-pointer">🚀</span>
              </h1>
              <p className="font-grotesk text-sm md:text-base text-zinc-300 mt-3 leading-relaxed">
                Have a small business or company that needs a fast, modern website? Pick your scope below starting from <span className="font-bold text-white underline decoration-[var(--primary)] decoration-2">$300</span> or grab an instant 15-minute intro chat.
              </p>
            </div>

            {/* Developer Identity Card with Hari's Photo */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl border-2 shadow-lg shrink-0 transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--primary)',
                boxShadow: '4px 4px 0px var(--primary)',
              }}
            >
              {/* Hari's Avatar Portrait */}
              <div className="relative shrink-0">
                <img
                  src={HN_AVATAR_URL}
                  onError={(e) => {
                    e.currentTarget.src = '/hari-avatar.png';
                  }}
                  alt="Hari Bahadur Narzary"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-center border-2 shadow-md"
                  style={{ borderColor: 'var(--primary)' }}
                />
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-2 border-black"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-syne text-base sm:text-lg uppercase font-bold text-white leading-tight">
                    Hari Narzary
                  </span>
                  <span
                    className="font-mono-code text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      color: 'var(--primary)',
                      border: '1px solid var(--primary)',
                    }}
                  >
                    LEAD DEV
                  </span>
                </div>
                <span className="font-mono-code text-xs text-zinc-400 uppercase mt-0.5">
                  Direct Code Craft • Assam &amp; Global
                </span>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)' }}></span>
                  <span className="font-mono-code text-[11px] font-bold" style={{ color: 'var(--primary)' }}>
                    READY_TO_ONBOARD
                  </span>
                  <span className="text-zinc-500 text-[11px]">•</span>
                  <span className="font-mono-code text-[11px] text-zinc-400">14-DAY SPRINT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLUMNS: Project Configurator Form */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* STEP 01: Scope Selector */}
              <div
                className="p-5 md:p-6 rounded-xl shadow-xl border-2 flex flex-col gap-4 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div
                  className="flex items-center justify-between border-b pb-3"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2 py-0.5 font-mono-code text-xs font-bold rounded uppercase"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-contrast)',
                      }}
                    >
                      STEP_01
                    </span>
                    <h2 className="font-syne text-lg md:text-xl text-white uppercase font-bold">
                      What type of website does your business need?
                    </h2>
                  </div>
                  <span className="font-mono-code text-[11px] text-zinc-400">[SELECT_ONE]</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {scopeOptions.map((opt) => {
                    const isSelected = projectType === opt.title;
                    const spanClass = opt.fullSpan ? 'sm:col-span-2' : '';

                    return (
                      <div
                        key={opt.id}
                        onClick={() => setProjectType(opt.title)}
                        className={`${spanClass} cursor-pointer p-4 rounded-lg border-2 transition-all flex flex-col justify-between gap-3 relative select-none`}
                        style={{
                          backgroundColor: isSelected ? 'var(--bg-card-alt)' : 'var(--bg-card)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                          boxShadow: isSelected ? '4px 4px 0px var(--primary)' : 'none',
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className="w-9 h-9 rounded flex items-center justify-center"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.06)',
                              color: 'var(--primary)',
                            }}
                          >
                            <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {opt.badge && (
                              <span
                                className="px-2 py-0.5 font-mono-code text-[10px] uppercase font-bold rounded"
                                style={{
                                  backgroundColor: 'rgba(255,255,255,0.1)',
                                  color: 'var(--primary)',
                                }}
                              >
                                {opt.badge}
                              </span>
                            )}
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs"
                              style={{
                                backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                                color: isSelected ? 'var(--primary-contrast)' : 'transparent',
                                border: isSelected ? 'none' : '1px solid #52525b',
                              }}
                            >
                              ✓
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className={`font-mono-code text-xs md:text-sm uppercase font-bold ${
                            isSelected ? 'text-white' : 'text-zinc-200'
                          }`}>
                            {opt.title}
                          </h3>
                          <p className="font-grotesk text-xs text-zinc-400 mt-1">
                            {opt.description}
                          </p>
                        </div>

                        <div
                          className="font-mono-code text-[10px] tracking-wider uppercase font-bold"
                          style={{ color: 'var(--primary)' }}
                        >
                          {opt.tag}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 02 & STEP 03: Split Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* STEP 02: Timeline */}
                <div
                  className="p-5 md:p-6 rounded-xl shadow-xl border-2 flex flex-col gap-4"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div
                    className="flex items-center justify-between border-b pb-3"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 font-mono-code text-xs font-bold rounded uppercase"
                        style={{
                          backgroundColor: 'var(--secondary)',
                          color: 'var(--secondary-contrast)',
                        }}
                      >
                        STEP_02
                      </span>
                      <h3 className="font-syne text-base md:text-lg text-white uppercase font-bold">
                        Launch Timeline
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {timelineOptions.map((t) => {
                      const isSelected = timeline === t.label;

                      return (
                        <div
                          key={t.id}
                          onClick={() => setTimeline(t.label)}
                          className="cursor-pointer p-3 px-4 rounded-lg transition-all flex items-center justify-between select-none border"
                          style={{
                            backgroundColor: isSelected ? 'var(--secondary)' : 'var(--bg-card-alt)',
                            color: isSelected ? 'var(--secondary-contrast)' : '#e4e4e7',
                            borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                            boxShadow: isSelected ? '3px 3px 0px var(--primary)' : 'none',
                          }}
                        >
                          <span className="font-mono-code text-xs uppercase font-bold">
                            {t.label}
                          </span>
                          <span
                            className="text-[10px] px-2 py-0.5 font-mono-code rounded font-bold uppercase"
                            style={{
                              backgroundColor: isSelected ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.06)',
                              color: isSelected ? 'var(--primary)' : '#a1a1aa',
                            }}
                          >
                            {t.badge}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 03: Investment Tier */}
                <div
                  className="p-5 md:p-6 rounded-xl shadow-xl border-2 flex flex-col gap-4"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div
                    className="flex items-center justify-between border-b pb-3"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 font-mono-code text-xs font-bold rounded uppercase"
                        style={{
                          backgroundColor: 'var(--tertiary)',
                          color: '#000000',
                        }}
                      >
                        STEP_03
                      </span>
                      <h3 className="font-syne text-base md:text-lg text-white uppercase font-bold">
                        Investment Tier
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {tierOptions.map((tier) => {
                      const isSelected = budgetTier.includes(tier.title);

                      return (
                        <div
                          key={tier.id}
                          onClick={() => setBudgetTier(`${tier.title} (${tier.price})`)}
                          className="cursor-pointer p-3 rounded-lg border transition-all flex flex-col justify-between gap-2 select-none"
                          style={{
                            backgroundColor: isSelected ? 'var(--bg-card-alt)' : 'var(--bg-card)',
                            borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                            boxShadow: isSelected ? '3px 3px 0px var(--primary)' : 'none',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono-code text-[10px] text-zinc-400 uppercase">
                              {tier.tierCode}
                            </span>
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                              }}
                            ></span>
                          </div>
                          <div>
                            <div className="font-syne text-sm font-bold text-white leading-tight">
                              {tier.title}
                            </div>
                            <div
                              className="font-mono-code text-xs font-bold mt-0.5"
                              style={{ color: 'var(--primary)' }}
                            >
                              {tier.price}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 04: Client Details & Project Lore */}
              <div
                className="p-5 md:p-6 rounded-xl shadow-xl border-2 flex flex-col gap-5"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div
                  className="flex items-center justify-between border-b pb-3"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 font-mono-code text-xs font-bold rounded uppercase"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-contrast)',
                      }}
                    >
                      STEP_04
                    </span>
                    <h3 className="font-syne text-lg text-white uppercase font-bold">
                      Your Details &amp; Project Lore
                    </h3>
                  </div>
                  <span className="font-mono-code text-xs uppercase font-bold" style={{ color: 'var(--primary)' }}>
                    [TRANSMISSION_READY]
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-code text-xs uppercase text-zinc-400" htmlFor="biz_name">
                      Business / Brand Name *
                    </label>
                    <input
                      id="biz_name"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Artisan Cafe / Apex Studio"
                      className="w-full text-white p-3 rounded-lg font-grotesk text-sm border focus:outline-none shadow-inner"
                      style={{
                        backgroundColor: 'var(--bg-card-alt)',
                        borderColor: 'var(--border-subtle)',
                      }}
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-code text-xs uppercase text-zinc-400" htmlFor="contact_name">
                      Contact Person *
                    </label>
                    <input
                      id="contact_name"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full text-white p-3 rounded-lg font-grotesk text-sm border focus:outline-none shadow-inner"
                      style={{
                        backgroundColor: 'var(--bg-card-alt)',
                        borderColor: 'var(--border-subtle)',
                      }}
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-code text-xs uppercase text-zinc-400" htmlFor="contact_handle">
                      Email / WhatsApp *
                    </label>
                    <input
                      id="contact_handle"
                      required
                      value={contactHandle}
                      onChange={(e) => setContactHandle(e.target.value)}
                      placeholder="sarah@example.com / +1 (555) 000-0000"
                      className="w-full text-white p-3 rounded-lg font-grotesk text-sm border focus:outline-none shadow-inner"
                      style={{
                        backgroundColor: 'var(--bg-card-alt)',
                        borderColor: 'var(--border-subtle)',
                      }}
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-code text-xs uppercase text-zinc-400" htmlFor="current_site">
                      Current Website URL (If Any)
                    </label>
                    <input
                      id="current_site"
                      value={currentSite}
                      onChange={(e) => setCurrentSite(e.target.value)}
                      placeholder="https://mycurrentsite.com"
                      className="w-full text-white p-3 rounded-lg font-grotesk text-sm border focus:outline-none shadow-inner"
                      style={{
                        backgroundColor: 'var(--bg-card-alt)',
                        borderColor: 'var(--border-subtle)',
                      }}
                      type="url"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-mono-code text-xs uppercase text-zinc-400" htmlFor="project_lore">
                      Project Lore &amp; Main Objectives *
                    </label>
                    <span className="font-mono-code text-[11px]" style={{ color: 'var(--primary)' }}>
                      Markdown Ready
                    </span>
                  </div>
                  <textarea
                    id="project_lore"
                    required
                    rows={4}
                    value={projectLore}
                    onChange={(e) => setProjectLore(e.target.value)}
                    placeholder="Tell me what’s broken with the current setup, key competitors you admire, or specific feature requirements..."
                    className="w-full text-white p-3.5 rounded-lg font-grotesk text-sm border focus:outline-none shadow-inner resize-y"
                    style={{
                      backgroundColor: 'var(--bg-card-alt)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  ></textarea>
                </div>

                {/* Selected Summary Pill */}
                <div
                  className="p-3 rounded border font-mono-code text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-2"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div>
                    <span className="text-zinc-500">SCOPE:</span>{' '}
                    <span className="font-bold" style={{ color: 'var(--primary)' }}>{projectType}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">TIMELINE:</span>{' '}
                    <span className="font-bold" style={{ color: 'var(--secondary)' }}>{timeline}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">TIER:</span>{' '}
                    <span className="text-white font-bold">{budgetTier}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    disabled={isSubmitting || isSubmitted}
                    className="w-full py-4 px-6 font-mono-code text-sm font-bold uppercase tracking-wider rounded-lg hover:translate-y-[-2px] active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-contrast)',
                      boxShadow: '5px 5px 0px var(--secondary)',
                    }}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-xl animate-spin">sync</span>
                        <span>ENCRYPTING &amp; DISPATCHING BRIEF...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        <span>BRIEF DISPATCHED SUCCESSFULLY ✓</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT INQUIRY &amp; GET FREE AUDIT</span>
                        <span className="material-symbols-outlined font-bold text-xl">bolt</span>
                      </>
                    )}
                  </button>

                  {submissionError && (
                    <div
                      className="p-4 border-2 text-sm font-grotesk"
                      style={{
                        color: '#fecaca',
                        backgroundColor: 'rgba(127, 29, 29, 0.35)',
                        borderColor: '#ef4444',
                      }}
                      role="alert"
                    >
                      {submissionError} Please use the direct email option below.
                    </div>
                  )}

                  {/* Submission Success Toast */}
                  {isSubmitted && (() => {
                    const emailSubject = encodeURIComponent(`🚀 Website Inquiry: ${businessName || 'New Client'} (${projectType})`);
                    const emailBody = encodeURIComponent(
`Hi Hari,

Here are the details for my website project:

• Client / Contact: ${contactName || 'N/A'} (${contactHandle || 'N/A'})
• Business / Brand: ${businessName || 'N/A'}
• Current Website: ${currentSite || 'None'}
• Scope: ${projectType}
• Timeline: ${timeline}
• Budget Tier: ${budgetTier}

Project Requirements & Lore:
${projectLore || 'Looking forward to discussing the project.'}

--
Sent from your portfolio booking portal`
                    );
                    const mailtoUrl = `mailto:${HARI_CONTACT.email}?subject=${emailSubject}&body=${emailBody}`;
                    const whatsappUrl = `https://wa.me/919365287317?text=${encodeURIComponent(`Hi Hari, I just submitted an inquiry for ${businessName || 'my website'} (${projectType}). Looking forward to your review!`)}`;

                    return (
                      <div
                        className="p-5 text-white rounded-xl border-2 flex flex-col gap-3.5 animate-in fade-in slide-in-from-top-2"
                        style={{
                          backgroundColor: 'var(--secondary)',
                          borderColor: 'var(--primary)',
                          boxShadow: '4px 4px 0px var(--primary)',
                        }}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--primary)' }}>
                              task_alt
                            </span>
                            <span className="font-syne text-lg uppercase font-bold text-white">TRANSMISSION CONFIRMED!</span>
                          </div>
                          <span
                            className="px-2.5 py-0.5 rounded font-mono-code text-[11px] font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: 'rgba(0,0,0,0.4)',
                              color: 'var(--primary)',
                              border: '1px solid var(--primary)',
                            }}
                          >
                            DISPATCHED TO INBOX ✓
                          </span>
                        </div>

                        <p className="font-grotesk text-sm text-zinc-100 leading-relaxed">
                          Thank you, {contactName || 'Client'}. Your brief for <strong className="text-white">{businessName || 'your business'}</strong> has been registered directly for Hari Bahadur Narzary. Expect a personalized video audit and quote breakdown within 24 hours at <strong style={{ color: 'var(--primary)' }}>{contactHandle}</strong>.
                        </p>

                        {/* Direct Line Confirmation */}
                        <div
                          className="p-3 rounded-lg border flex items-center gap-2 font-mono-code text-xs"
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            borderColor: 'var(--primary)',
                          }}
                        >
                          <span className="material-symbols-outlined text-base" style={{ color: 'var(--primary)' }}>
                            mark_email_read
                          </span>
                          <span>
                            Direct developer line: <strong className="text-white underline">{HARI_CONTACT.email}</strong>
                          </span>
                        </div>

                        {/* Direct 1-Click Action Buttons (Zero Blank Pages) */}
                        <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
                          <span className="font-mono-code text-[11px] text-zinc-300 font-bold uppercase tracking-wider">
                            ⚡ Instant Direct Communication Options:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(HARI_CONTACT.email);
                                setCopiedEmail(true);
                                setTimeout(() => setCopiedEmail(false), 3000);
                              }}
                              className="px-3.5 py-2.5 rounded font-mono-code text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] border text-center shadow-md cursor-pointer"
                              style={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--primary-contrast)',
                                borderColor: 'var(--primary)',
                              }}
                            >
                              <span className="material-symbols-outlined text-sm font-bold">
                                {copiedEmail ? 'check' : 'content_copy'}
                              </span>
                              <span>{copiedEmail ? 'COPIED TO CLIPBOARD! ✓' : "Copy Hari's Email"}</span>
                            </button>

                            <a
                              href={mailtoUrl}
                              className="px-3.5 py-2.5 rounded font-mono-code text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all hover:bg-white/10 border text-center text-white"
                              style={{
                                borderColor: 'rgba(255,255,255,0.2)',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                              }}
                            >
                              <span className="material-symbols-outlined text-sm">mail</span>
                              <span>Send via Mail App</span>
                            </a>

                            <a
                              href={whatsappUrl}
                              className="col-span-1 sm:col-span-2 px-3.5 py-2 rounded font-mono-code text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-center"
                            >
                              <span className="material-symbols-outlined text-sm">chat</span>
                              <span>Chat with Hari on WhatsApp (+91 93652 87317)</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Trust Assurances */}
                  <div
                    className="p-3 rounded-lg border flex flex-wrap items-center justify-center md:justify-between gap-2 text-zinc-400 font-mono-code text-xs"
                    style={{
                      backgroundColor: 'var(--bg-card-alt)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <span className="flex items-center gap-1.5" style={{ color: 'var(--primary)' }}>
                      <span className="material-symbols-outlined text-sm">verified</span> Fixed price guarantee from $300
                    </span>
                    <span className="hidden md:inline text-zinc-600">•</span>
                    <span className="flex items-center gap-1.5" style={{ color: 'var(--secondary)' }}>
                      <span className="material-symbols-outlined text-sm">person_check</span> Direct communication with Hari
                    </span>
                    <span className="hidden md:inline text-zinc-600">•</span>
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="material-symbols-outlined text-sm">schedule</span> 24h response time guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT 4 COLUMNS: Developer Identity, Channels, FAQs */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Developer Card */}
            <div
              className="p-6 rounded-xl shadow-xl border-2 flex flex-col gap-4 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={HN_AVATAR_URL}
                    onError={(e) => {
                      e.currentTarget.src = '/hari-avatar.png';
                    }}
                    alt="Hari Bahadur Narzary"
                    className="w-16 h-16 rounded-full object-cover object-center border-2 shadow-md"
                    style={{ borderColor: 'var(--primary)' }}
                  />
                  <span
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--primary)',
                      boxShadow: '0 0 0 2px var(--bg-card-alt)',
                    }}
                  ></span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-syne text-xl uppercase font-bold text-white leading-tight">Hari Narzary</h3>
                  <span className="font-mono-code text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--primary)' }}>
                    // PRINCIPAL_ARCHITECT
                  </span>
                  <span className="font-grotesk text-xs text-zinc-300 mt-1">
                    Full-stack web engineer crafting high-velocity commerce &amp; apps.
                  </span>
                </div>
              </div>

              {/* Working Logistics */}
              <div
                className="p-3 rounded-lg border flex flex-col gap-1.5 font-mono-code text-xs text-zinc-400"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="uppercase">BASE_LOCATION:</span>
                  <span className="text-zinc-200">Assam, India (Global Remote)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="uppercase">TIMEZONES:</span>
                  <span style={{ color: 'var(--primary)' }}>IST &amp; EST Friendly</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="uppercase">TYPICAL RESPONSE:</span>
                  <span className="text-white">&lt; 3 Hours</span>
                </div>
              </div>

              {/* Direct Channels */}
              <div
                className="flex flex-col gap-2 pt-2 border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
                  DIRECT_CHANNELS
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    className="p-3 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all border group text-zinc-300 hover:text-white"
                    style={{
                      backgroundColor: 'var(--bg-card-alt)',
                      borderColor: 'var(--border-subtle)',
                    }}
                    href={HARI_CONTACT.github}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={`GitHub: ${HARI_CONTACT.githubHandle}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.boxShadow = '2px 2px 0px var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-mono-code text-[10px] uppercase font-bold">GitHub</span>
                  </a>

                  <a
                    className="p-3 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all border group text-zinc-300 hover:text-white"
                    style={{
                      backgroundColor: 'var(--bg-card-alt)',
                      borderColor: 'var(--border-subtle)',
                    }}
                    href={HARI_CONTACT.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={`LinkedIn: ${HARI_CONTACT.linkedinHandle}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--secondary)';
                      e.currentTarget.style.boxShadow = '2px 2px 0px var(--secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="font-mono-code text-[10px] uppercase font-bold">LinkedIn</span>
                  </a>

                  <a
                    className="p-3 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all border group text-zinc-300 hover:text-white"
                    style={{
                      backgroundColor: 'var(--bg-card-alt)',
                      borderColor: 'var(--border-subtle)',
                    }}
                    href={`mailto:${HARI_CONTACT.email}?subject=Website%20Inquiry%20via%20Portfolio`}
                    title={`Email: ${HARI_CONTACT.email}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.boxShadow = '2px 2px 0px var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-mono-code text-[10px] uppercase font-bold">Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Client FAQ Accordion */}
            <div
              className="p-6 rounded-xl shadow-xl border-2 flex flex-col gap-4"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div
                className="flex items-center justify-between border-b pb-3"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <h3 className="font-syne text-lg uppercase font-bold text-white">Client FAQ</h3>
                <span className="font-mono-code text-xs uppercase font-bold" style={{ color: 'var(--primary)' }}>
                  [TRANSPARENCY_MODE]
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="rounded-lg border overflow-hidden transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-card-alt)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left group"
                        type="button"
                      >
                        <span
                          className="font-mono-code text-xs uppercase font-bold text-white transition-colors"
                          style={{ color: isOpen ? 'var(--primary)' : undefined }}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`material-symbols-outlined text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          style={{ color: isOpen ? 'var(--primary)' : '#a1a1aa' }}
                        >
                          expand_more
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          className="p-3.5 pt-0 text-zinc-300 font-grotesk text-xs leading-relaxed border-t mt-1"
                          style={{ borderColor: 'var(--border-subtle)' }}
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Code Architecture Telemetry Widget */}
            <div
              className="p-4 rounded-xl border shadow-inner flex flex-col gap-2 font-mono-code text-xs"
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between text-zinc-400">
                <span>&gt; SPRINT_ENGINE: v3.2.0</span>
                <span className="font-bold" style={{ color: 'var(--primary)' }}>ALL_CHECKS_PASSED</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold" style={{ color: 'var(--secondary)' }}>LCP_TARGET:</span>
                <span className="text-white">&lt; 0.9s</span>
                <span className="text-zinc-600">|</span>
                <span className="font-bold" style={{ color: 'var(--primary)' }}>STARTS:</span>
                <span className="text-white font-bold">$300</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
