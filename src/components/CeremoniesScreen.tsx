import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Bookmark, Check, Clock, MapPin, X } from 'lucide-react';
import { CEREMONIES, CeremonyItem, ScreenId, WEDDING_IMAGES } from '../data/weddingData';
import {
  DiyaPip,
  FiligreeCorners,
  LotusDivider,
  ResilientImage,
} from './OrnamentalMotifs';

interface CeremoniesScreenProps {
  initialFocusId?: string | null;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onRsvpCeremony: (ceremonyId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

type DayFilter = 'all' | 'day1' | 'day2' | 'day3';

const DAY_TABS: { id: DayFilter; label: string }[] = [
  { id: 'all', label: 'All Celebrations' },
  { id: 'day1', label: 'Day I · Dec 11' },
  { id: 'day2', label: 'Day II · Dec 12' },
  { id: 'day3', label: 'Day III · Dec 13' },
];

export function CeremoniesScreen({
  initialFocusId,
  savedIds,
  onToggleSave,
  onRsvpCeremony,
}: CeremoniesScreenProps) {
  const [dayFilter, setDayFilter] = useState<DayFilter>('all');
  const [selectedCeremony, setSelectedCeremony] = useState<CeremonyItem | null>(null);

  const bannerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });

  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  useEffect(() => {
    if (initialFocusId) {
      const found = CEREMONIES.find((c) => c.id === initialFocusId);
      if (found) {
        setSelectedCeremony(found);
      }
    }
  }, [initialFocusId]);

  const filteredCeremonies =
    dayFilter === 'all' ? CEREMONIES : CEREMONIES.filter((c) => c.dayKey === dayFilter);

  return (
    <div className="pb-20">
      {/* Parallax Pavilion Banner */}
      <section
        ref={bannerRef}
        className="relative h-[320px] sm:h-[380px] overflow-hidden border-b border-[#D4AF37]/40 flex items-center justify-center"
      >
        <motion.div style={{ y: bannerY }} className="absolute inset-0 will-change-transform">
          <ResilientImage
            src={WEDDING_IMAGES.sacredMandap}
            alt="Sacred four-pillar floral mandap inside sandstone durbar hall"
            fallbackTitle="Sheesh Mahal Mandap"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0808]/65 via-[#4A0404]/55 to-[#2A0808]/80" />
        </motion.div>

        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center">
          <p className="font-ui text-xs uppercase tracking-[0.16em] text-[#F3E5AB] font-semibold">
            December 11 – 13, 2026 · Udaipur
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FDF9F1] mt-3">
            Ceremonial Pavilions &amp; Itinerary
          </h1>
          <p className="font-serif-body text-lg sm:text-xl text-[#F3E5AB]/90 max-w-2xl mx-auto mt-3">
            Four distinct royal venues connected across palace terraces, island waters, and the
            sacred Sheesh Mahal mandap.
          </p>
        </div>
      </section>

      {/* Filter Controls Bar */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-8 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-6">
          <div
            role="tablist"
            aria-label="Filter ceremonies by wedding day"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f1ede6] border border-[#D4AF37]/35 rounded-[4px]"
          >
            {DAY_TABS.map((tab) => {
              const active = dayFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setDayFilter(tab.id)}
                  className={`relative px-4 py-2 font-ui text-xs uppercase tracking-[0.1em] font-semibold rounded-[3px] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    active ? 'text-[#fdf9f1]' : 'text-[#584141] hover:text-[#570013]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="day-filter-pill"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-[#800020] rounded-[3px] border border-[#D4AF37]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <p className="font-ui text-xs uppercase tracking-[0.12em] text-[#735C00] font-semibold">
            Saved to Itinerary: <span className="tabular-nums text-[#800020]">{savedIds.length}</span> /{' '}
            {CEREMONIES.length}
          </p>
        </div>
      </section>

      {/* Gold Bead-Chain Vertical Ceremony Timeline */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-8 py-6">
        <div className="relative pl-6 md:pl-10">
          <div
            aria-hidden="true"
            className="absolute left-[11px] md:left-[15px] top-6 bottom-6 w-1 gold-bead-line"
          />

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredCeremonies.map((ceremony, index) => {
                const isSaved = savedIds.includes(ceremony.id);
                return (
                  <motion.article
                    key={ceremony.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="relative filigree-card rounded-[4px] overflow-hidden transition-all duration-200"
                  >
                    <span className="absolute -left-[25px] md:-left-[37px] top-9">
                      <DiyaPip active={isSaved} />
                    </span>
                    <FiligreeCorners />

                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[280px] overflow-hidden bg-[#4A0404]">
                        <ResilientImage
                          src={ceremony.image}
                          alt={ceremony.imageAlt}
                          fallbackTitle={ceremony.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-ui text-xs uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                            <span>{ceremony.dayLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{ceremony.dateText}</span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-[#800020]">
                              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                              {ceremony.timeText}
                            </span>
                          </div>

                          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#570013] mt-2.5">
                            {ceremony.title}
                          </h2>

                          <p className="font-serif-body text-lg text-[#2A0808] mt-3 leading-relaxed">
                            {ceremony.description}
                          </p>

                          <div className="mt-4 pt-4 border-t border-[#D4AF37]/25 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-ui text-[10px] uppercase tracking-[0.14em] text-[#735C00] font-bold block">
                                Pavilion Venue
                              </span>
                              <span className="font-serif-body text-base text-[#1c1c17] inline-flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-3.5 h-3.5 text-[#800020] shrink-0" aria-hidden="true" />
                                {ceremony.venue}
                              </span>
                            </div>
                            <div>
                              <span className="font-ui text-[10px] uppercase tracking-[0.14em] text-[#735C00] font-bold block">
                                Suggested Attire
                              </span>
                              <span className="font-serif-body text-base text-[#1c1c17] mt-0.5 block">
                                {ceremony.attire}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedCeremony(ceremony)}
                            className="btn-royal-gilded px-5 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold whitespace-nowrap cursor-pointer"
                          >
                            View Pavilion Details
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleSave(ceremony.id)}
                            className={`px-4 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.1em] font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                              isSaved
                                ? 'bg-[#800020]/10 border-[#800020] text-[#570013]'
                                : 'bg-[#fdf9f1] border-[#AA771C]/60 text-[#584141] hover:border-[#800020] hover:text-[#570013]'
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#800020]" aria-hidden="true" />
                                Saved to Itinerary
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                                Save to Itinerary
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Pavilion Detail Modal */}
      <AnimatePresence>
        {selectedCeremony && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A0808]/70 backdrop-blur-xs"
            onClick={() => setSelectedCeremony(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="pavilion-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fdf9f1] border border-[#D4AF37] rounded-[4px] shadow-raised-tier p-6 sm:p-8"
            >
              <FiligreeCorners />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
                    {selectedCeremony.dayLabel} · {selectedCeremony.dateText} · {selectedCeremony.timeText}
                  </p>
                  <h2
                    id="pavilion-modal-title"
                    className="font-display text-2xl sm:text-3xl font-semibold text-[#570013] mt-1.5"
                  >
                    {selectedCeremony.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCeremony(null)}
                  aria-label="Close pavilion details"
                  className="w-9 h-9 rounded-[4px] border border-[#D4AF37]/60 flex items-center justify-center text-[#570013] hover:bg-[#FFF8E7] cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 aspect-[16/9] w-full jharokha-arch-sm overflow-hidden border border-[#D4AF37]/60 bg-[#4A0404]">
                <ResilientImage
                  src={selectedCeremony.image}
                  alt={selectedCeremony.imageAlt}
                  fallbackTitle={selectedCeremony.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-serif-body text-lg text-[#2A0808] leading-relaxed mt-5">
                {selectedCeremony.description}
              </p>

              <LotusDivider className="my-5" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-ui text-xs uppercase tracking-[0.12em] text-[#735C00] font-bold">
                    Ceremonial Highlights
                  </h3>
                  <ul className="mt-2 space-y-1.5 font-serif-body text-base text-[#2A0808]">
                    {selectedCeremony.rituals.map((ritual) => (
                      <li key={ritual} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] mt-2 shrink-0" aria-hidden="true" />
                        <span>{ritual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#FFF8E7] border border-[#D4AF37]/40 rounded-[4px] p-4">
                    <p className="font-ui text-[10px] uppercase tracking-[0.14em] text-[#735C00] font-bold">
                      Culinary Promenade
                    </p>
                    <p className="font-serif-body text-base text-[#2A0808] mt-1">
                      {selectedCeremony.culinary}
                    </p>
                  </div>
                  <div className="bg-[#FFF8E7] border border-[#D4AF37]/40 rounded-[4px] p-4">
                    <p className="font-ui text-[10px] uppercase tracking-[0.14em] text-[#735C00] font-bold">
                      Musical Accompaniment
                    </p>
                    <p className="font-serif-body text-base text-[#2A0808] mt-1">
                      {selectedCeremony.music}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#D4AF37]/30">
                <button
                  type="button"
                  onClick={() => setSelectedCeremony(null)}
                  className="btn-palace-outline px-5 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedCeremony.id;
                    setSelectedCeremony(null);
                    onRsvpCeremony(id);
                  }}
                  className="btn-royal-gilded px-6 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold cursor-pointer"
                >
                  RSVP for This Ceremony
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
