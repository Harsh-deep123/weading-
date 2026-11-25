import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ScreenId } from '../data/weddingData';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const NAV_ITEMS: { id: Exclude<ScreenId, 'rsvp'>; label: string }[] = [
  { id: 'invitation', label: 'Invitation' },
  { id: 'story', label: 'Our Story' },
  { id: 'ceremonies', label: 'Ceremonies' },
  { id: 'hospitality', label: 'Hospitality' },
];

export function TopBar({ activeScreen, onNavigate }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (screen: ScreenId) => {
    setMobileOpen(false);
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdf9f1]/95 backdrop-blur-md border-b border-[#D4AF37]/35">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('invitation')}
          className="font-display text-xl md:text-2xl font-semibold tracking-wide text-[#570013] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020] cursor-pointer"
        >
          Aman &amp; Priya
        </button>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-2 font-ui text-xs uppercase tracking-[0.12em] font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020] ${
                  isActive ? 'text-[#800020]' : 'text-[#584141] hover:text-[#570013]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="top-nav-underline"
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D4AF37]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action (+ mobile menu trigger on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('rsvp')}
            className="btn-royal-gilded px-5 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            RSVP Now
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-[4px] border border-[#D4AF37]/50 text-[#570013] hover:bg-[#FFF8E7] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#D4AF37]/30 bg-[#FFF8E7] px-5 py-4 shadow-diya"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`w-full text-left px-3 py-3 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#800020] text-[#fdf9f1]'
                        : 'text-[#570013] hover:bg-[#f1ede6]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
