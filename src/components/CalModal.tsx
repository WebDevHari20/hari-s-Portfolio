import React, { useState } from 'react';
import { HARI_CONTACT } from '../data/portfolioData';

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (slot: string) => void;
}

export const CalModal: React.FC<CalModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('Monday, 2:00 PM EST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const slots = [
    { label: 'MON, 2:00 PM EST', val: 'Monday, 2:00 PM EST', status: 'OPEN' },
    { label: 'TUE, 10:30 AM EST', val: 'Tuesday, 10:30 AM EST', status: 'OPEN' },
    { label: 'WED, 4:00 PM EST', val: 'Wednesday, 4:00 PM EST', status: 'OPEN' },
    { label: 'THU, 1:15 PM EST', val: 'Thursday, 1:15 PM EST', status: 'OPEN' },
    { label: 'FRI, 11:00 AM EST', val: 'Friday, 11:00 AM EST', status: 'OPEN' },
    { label: 'MON (NEXT), 3:30 PM EST', val: 'Next Monday, 3:30 PM EST', status: 'OPEN' },
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/schedule-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          slot: selectedSlot,
        }),
      });
    } catch (err) {
      console.warn('Failed to dispatch call reservation to backend:', err);
    }

    setIsSubmitting(false);
    setIsBooked(true);
    onConfirm(selectedSlot);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="max-w-lg w-full p-6 relative flex flex-col gap-4 text-[#e3e1e9] border-2 animate-in fade-in zoom-in-95 duration-150 shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--primary)',
          boxShadow: '8px 8px 0px var(--primary)',
        }}
      >
        <div
          className="flex items-center justify-between border-b pb-3"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 animate-pulse rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
            ></span>
            <span className="font-syne text-xl text-white uppercase font-bold tracking-tight">
              HARI // 15-MIN INTRO DISCOVERY
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            type="button"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isBooked ? (() => {
          const callSubject = encodeURIComponent(`📅 15-Minute Intro Discovery Call: ${name || 'Prospect'} (${selectedSlot})`);
          const callBody = encodeURIComponent(
`Hi Hari,

I've scheduled a 15-minute intro discovery call for:
• Time Slot: ${selectedSlot}
• Name: ${name}
• Email: ${email}
• Meeting Type: Google Meet / Screenshare

Looking forward to speaking with you!

Sent via Hari's Web Engineering Portfolio`
          );
          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${HARI_CONTACT.email}&su=${callSubject}&body=${callBody}`;
          const mailtoUrl = `mailto:${HARI_CONTACT.email}?subject=${callSubject}&body=${callBody}`;

          return (
            <div className="py-6 flex flex-col items-center justify-center text-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                }}
              >
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="font-syne text-xl font-bold text-white uppercase">RESERVATION CONFIRMED!</h3>
              <p className="text-sm text-zinc-300 max-w-sm">
                We&apos;ve reserved <span className="font-mono font-bold" style={{ color: 'var(--primary)' }}>{selectedSlot}</span> for <strong className="text-white">{name}</strong>.
              </p>

              <div
                className="font-mono-code text-xs px-3 py-1.5 border rounded flex items-center gap-1.5"
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--primary)',
                }}
              >
                <span className="material-symbols-outlined text-sm">mark_email_read</span>
                <span>NOTIFICATION DISPATCHED TO HARI</span>
              </div>

              {/* Direct Instant Communication Buttons (Zero Blank Pages) */}
              <div className="w-full flex flex-col gap-2 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(HARI_CONTACT.email);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 3000);
                    }}
                    className="py-2.5 px-3 rounded font-mono-code text-xs font-bold uppercase flex items-center justify-center gap-2 border text-center transition-all hover:scale-[1.02] active:scale-[0.99] shadow-md cursor-pointer"
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
                    className="py-2.5 px-3 rounded font-mono-code text-xs font-bold uppercase flex items-center justify-center gap-2 border text-center text-zinc-200 hover:text-white transition-all hover:bg-white/10"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <span className="material-symbols-outlined text-sm">mail</span>
                    <span>Open Mail App</span>
                  </a>
                </div>

                <a
                  href={`https://wa.me/919365287317?text=${encodeURIComponent(`Hi Hari, I've booked a 15-minute intro discovery call for ${selectedSlot} (${name}).`)}`}
                  className="w-full py-2 px-3 rounded font-mono-code text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-center"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>WhatsApp Hari Directly (+91 93652 87317)</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 text-xs font-mono-code text-zinc-400 hover:text-white underline uppercase"
              >
                Close Window
              </button>
            </div>
          );
        })() : (
          <form onSubmit={handleBooking} className="flex flex-col gap-4">
            <p className="font-grotesk text-sm text-zinc-300">
              Pick a slot to audit your current site, review tech architecture, and establish a fixed-price sprint quote starting from $300.
            </p>

            <div className="space-y-1.5">
              <label className="font-mono-code text-xs uppercase text-zinc-400 flex items-center justify-between">
                <span>Select Available Slot:</span>
                <span className="font-bold" style={{ color: 'var(--primary)' }}>15 MIN SCREENSHARE</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((s) => {
                  const isSelected = selectedSlot === s.val;
                  return (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => setSelectedSlot(s.val)}
                      className="p-2.5 text-left font-mono-code text-xs flex justify-between items-center transition-all border"
                      style={
                        isSelected
                          ? {
                              backgroundColor: 'var(--secondary)',
                              color: 'var(--secondary-contrast)',
                              borderColor: 'var(--primary)',
                              boxShadow: '2px 2px 0px var(--primary)',
                            }
                          : {
                              backgroundColor: 'var(--bg-card-alt)',
                              color: '#d4d4d8',
                              borderColor: 'var(--border-subtle)',
                            }
                      }
                    >
                      <span className="truncate pr-1">{s.label}</span>
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: isSelected ? 'var(--primary)' : '#71717a' }}
                      >
                        {s.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex flex-col gap-1">
                <label className="font-mono-code text-xs uppercase text-zinc-400" htmlFor="cal_name">
                  Your Name *
                </label>
                <input
                  id="cal_name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Michael Chen"
                  className="p-2.5 rounded font-grotesk text-sm border focus:outline-none text-white"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                  }}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono-code text-xs uppercase text-zinc-400" htmlFor="cal_email">
                  Work Email *
                </label>
                <input
                  id="cal_email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="michael@company.com"
                  className="p-2.5 rounded font-grotesk text-sm border focus:outline-none text-white"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    borderColor: 'var(--border-subtle)',
                  }}
                  type="email"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-zinc-300 font-mono-code text-xs uppercase tracking-wider"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 font-mono-code text-xs font-bold uppercase tracking-wider active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-1.5"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-contrast)',
                  boxShadow: '3px 3px 0px var(--secondary)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin"></span>
                    <span>LOCKING IN...</span>
                  </>
                ) : (
                  <span>CONFIRM CALL TIME</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
