import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import {
  BlessingEntry,
  INITIAL_BLESSINGS,
  ScreenId,
} from './data/weddingData';
import { TopBar } from './components/TopBar';
import { InvitationScreen } from './components/InvitationScreen';
import { StoryScreen } from './components/StoryScreen';
import { CeremoniesScreen } from './components/CeremoniesScreen';
import { HospitalityScreen } from './components/HospitalityScreen';
import { RsvpRecord, RsvpScreen } from './components/RsvpScreen';
import { LotusDivider, MonogramCrest } from './components/OrnamentalMotifs';

const STORAGE_SAVED_KEY = 'rajputana_saved_ceremonies_v1';
const STORAGE_RSVP_KEY = 'rajputana_rsvp_record_v1';
const STORAGE_BLESSINGS_KEY = 'rajputana_blessings_v1';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('invitation');
  const [focusedCeremonyId, setFocusedCeremonyId] = useState<string | null>(null);
  const [rsvpCeremonyPrefill, setRsvpCeremonyPrefill] = useState<string | null>(null);

  const [savedCeremonyIds, setSavedCeremonyIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_KEY);
      return raw ? JSON.parse(raw) : ['pheras-reception'];
    } catch {
      return ['pheras-reception'];
    }
  });

  const [savedRsvp, setSavedRsvp] = useState<RsvpRecord | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_RSVP_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [blessings, setBlessings] = useState<BlessingEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BLESSINGS_KEY);
      return raw ? JSON.parse(raw) : INITIAL_BLESSINGS;
    } catch {
      return INITIAL_BLESSINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedCeremonyIds));
    } catch {
      // ignore storage quota errors
    }
  }, [savedCeremonyIds]);

  const handleNavigate = (screen: ScreenId, ceremonyId?: string) => {
    setFocusedCeremonyId(ceremonyId ?? null);
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveCeremony = (id: string) => {
    setSavedCeremonyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRsvpForCeremony = (ceremonyId: string) => {
    setRsvpCeremonyPrefill(ceremonyId);
    setActiveScreen('rsvp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveRsvp = (record: RsvpRecord) => {
    setSavedRsvp(record);
    try {
      localStorage.setItem(STORAGE_RSVP_KEY, JSON.stringify(record));
    } catch {
      // ignore
    }
  };

  const handleAddBlessing = (guestName: string, city: string, message: string) => {
    const newEntry: BlessingEntry = {
      id: `b-${Date.now()}`,
      guestName,
      city,
      message,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setBlessings((prev) => {
      const next = [newEntry, ...prev];
      try {
        localStorage.setItem(STORAGE_BLESSINGS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#fdf9f1] text-[#1c1c17]">
        <TopBar activeScreen={activeScreen} onNavigate={(s) => handleNavigate(s)} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeScreen === 'invitation' && (
                <InvitationScreen
                  onNavigate={handleNavigate}
                  savedCount={savedCeremonyIds.length}
                />
              )}
              {activeScreen === 'story' && <StoryScreen onNavigate={handleNavigate} />}
              {activeScreen === 'ceremonies' && (
                <CeremoniesScreen
                  initialFocusId={focusedCeremonyId}
                  savedIds={savedCeremonyIds}
                  onToggleSave={handleToggleSaveCeremony}
                  onRsvpCeremony={handleRsvpForCeremony}
                  onNavigate={handleNavigate}
                />
              )}
              {activeScreen === 'hospitality' && (
                <HospitalityScreen onNavigate={handleNavigate} />
              )}
              {activeScreen === 'rsvp' && (
                <RsvpScreen
                  preselectedCeremonyId={rsvpCeremonyPrefill}
                  savedRsvp={savedRsvp}
                  onSaveRsvp={handleSaveRsvp}
                  blessings={blessings}
                  onAddBlessing={handleAddBlessing}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Quiet Royal Heritage Footer */}
        <footer className="bg-[#f7f3eb] border-t border-[#D4AF37]/40 py-12">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 text-center">
            <div className="flex justify-center mb-4">
              <MonogramCrest className="w-16 h-16" />
            </div>
            <p className="font-display text-2xl font-medium text-[#570013]">
              Aman &amp; Priya
            </p>
            <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold mt-1.5">
              December 11 – 13, 2026 · Udaipur, Rajasthan
            </p>

            <LotusDivider className="my-6" />

            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-ui text-xs uppercase tracking-[0.12em] font-semibold text-[#584141]"
            >
              <button
                type="button"
                onClick={() => handleNavigate('invitation')}
                className="hover:text-[#800020] cursor-pointer"
              >
                Invitation
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('story')}
                className="hover:text-[#800020] cursor-pointer"
              >
                Our Story
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('ceremonies')}
                className="hover:text-[#800020] cursor-pointer"
              >
                Ceremonies
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('hospitality')}
                className="hover:text-[#800020] cursor-pointer"
              >
                Hospitality
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('rsvp')}
                className="hover:text-[#800020] cursor-pointer"
              >
                RSVP
              </button>
            </nav>

            <p className="font-serif-body text-sm text-[#584141] mt-6">
              Hospitality Concierge · concierge@amanpriya2026.in · Rathore &amp; Singhania Families
            </p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
