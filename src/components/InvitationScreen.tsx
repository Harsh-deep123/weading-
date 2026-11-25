import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { CEREMONIES, ScreenId, WEDDING_IMAGES } from '../data/weddingData';
import {
  FiligreeCorners,
  LotusDivider,
  MonogramCrest,
  ResilientImage,
} from './OrnamentalMotifs';

interface InvitationScreenProps {
  onNavigate: (screen: ScreenId, ceremonyId?: string) => void;
  savedCount: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date('2026-12-12T16:30:00+05:30').getTime();

function computeTimeRemaining(): TimeRemaining {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function InvitationScreen({ onNavigate, savedCount }: InvitationScreenProps) {
  const [countdown, setCountdown] = useState<TimeRemaining>(() => computeTimeRemaining());
  const heroRef = useRef<HTMLDivElement | null>(null);
  const archSectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: archProgress } = useScroll({
    target: archSectionRef,
    offset: ['start end', 'end start'],
  });

  // Compositor-only parallax transforms
  const bgY = useTransform(heroProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(heroProgress, [0, 1], [1.03, 1.12]);
  const diyaLayerY = useTransform(heroProgress, [0, 1], ['0%', '-12%']);
  const cardY = useTransform(heroProgress, [0, 1], ['0%', '10%']);
  const cardOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.25]);

  const jharokhaImageY = useTransform(archProgress, [0, 1], ['-8%', '8%']);
  const jharokhaTextY = useTransform(archProgress, [0, 1], ['6%', '-6%']);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(computeTimeRemaining());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Parallax Royal Durbar Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[78vh] lg:min-h-[84vh] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/40"
      >
        {/* Parallax Backdrop Layer */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <ResilientImage
            src={WEDDING_IMAGES.palaceCourtyard}
            alt="Udaipur royal palace courtyard illuminated by brass diyas at dusk"
            fallbackTitle="City Palace Courtyard, Udaipur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0808]/65 via-[#4A0404]/50 to-[#2A0808]/85" />
        </motion.div>

        {/* Subtle Diya Ambient Glow Layer */}
        <motion.div
          style={{ y: diyaLayerY }}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_38%,rgba(243,229,171,0.18),transparent_58%)]" />
        </motion.div>

        {/* Foreground Royal Invitation Proclamation Card */}
        <motion.div
          style={{ y: cardY, opacity: cardOpacity }}
          className="relative z-10 w-full max-w-[820px] mx-5 md:mx-8 my-12 md:my-16 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#fdf9f1]/95 backdrop-blur-sm px-6 py-10 sm:px-12 sm:py-14 rounded-[4px] border border-[#D4AF37]/80 shadow-raised-tier text-center"
          >
            <div className="absolute inset-2 border border-[#D4AF37]/35 pointer-events-none rounded-[2px]" />
            <FiligreeCorners />

            <div className="flex justify-center mb-5">
              <MonogramCrest className="w-20 h-20" />
            </div>

            <p className="font-ui text-xs uppercase tracking-[0.16em] text-[#735C00] font-semibold">
              With the Blessings of the Rathore &amp; Singhania Families
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] font-semibold text-[#570013] leading-[1.15] tracking-[0.03em] mt-4">
              Aman <span className="italic font-normal text-[#AA771C]">&amp;</span> Priya
            </h1>

            <p className="font-serif-body text-lg sm:text-xl text-[#2A0808] max-w-xl mx-auto mt-4 leading-relaxed">
              Request the honour of your gracious presence at the celebration of their sacred union
              amidst the sandstone courtyards of Udaipur.
            </p>

            <LotusDivider className="my-6" />

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-ui text-xs uppercase tracking-[0.12em] text-[#584141] font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#800020]" aria-hidden="true" />
                December 11 – 13, 2026
              </span>
              <span aria-hidden="true" className="text-[#D4AF37]">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#800020]" aria-hidden="true" />
                City Palace &amp; Lake Pichola, Udaipur
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('rsvp')}
                className="btn-royal-gilded px-7 py-3.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              >
                Confirm Your Presence
              </button>
              <button
                type="button"
                onClick={() => onNavigate('ceremonies')}
                className="btn-palace-outline px-7 py-3.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-2 cursor-pointer"
              >
                Explore Ceremonies
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 4-Column Royal Countdown Strip directly below hero */}
      <section aria-label="Wedding Countdown" className="bg-[#f7f3eb] border-b border-[#D4AF37]/30">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-[#FFF8E7] border border-[#D4AF37]/40 rounded-[4px] px-4 py-5 text-center shadow-diya"
              >
                <div className="font-display text-3xl sm:text-4xl font-semibold text-[#570013] tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-[#735C00] font-semibold mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Editorial Arch Split: The Royal Union */}
      <section
        ref={archSectionRef}
        className="max-w-[1200px] mx-auto px-5 md:px-8 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Jharokha Framed Couple Portrait with Parallax Drift */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[3/4] jharokha-arch overflow-hidden border-2 border-[#D4AF37]/75 shadow-raised-tier bg-[#4A0404]">
              <motion.div
                style={{ y: jharokhaImageY }}
                className="w-full h-[116%] -mt-[8%] will-change-transform"
              >
                <ResilientImage
                  src={WEDDING_IMAGES.coupleJharokha}
                  alt="Aman and Priya standing beneath a sandstone jharokha arch at sunset"
                  fallbackTitle="Aman & Priya"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-2 jharokha-arch border border-[#F3E5AB]/50 pointer-events-none" />
            </div>
          </div>

          {/* Editorial Proclamation & Direct Screen Entry */}
          <motion.div
            style={{ y: jharokhaTextY }}
            className="lg:col-span-7 space-y-6 will-change-transform"
          >
            <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
              Udaipur · Three Days of Royal Celebration
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#570013] leading-tight">
              A Celebration Woven in Silk, Sandstone, and Sacred Fire
            </h2>
            <p className="font-serif-body text-lg sm:text-xl text-[#2A0808] leading-relaxed">
              From sunlit afternoon henna in the Zenana Mahal to candlelit royal barges across Lake
              Pichola and the midnight vows beneath the Sheesh Mahal mandap, every pavilion has
              been thoughtfully curated to welcome family and lifelong friends.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('story')}
                className="filigree-card relative p-5 rounded-[4px] text-left transition-all duration-200 cursor-pointer group"
              >
                <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                  Chronicle
                </p>
                <h3 className="font-display text-xl font-medium text-[#570013] mt-1 group-hover:text-[#800020]">
                  Read Our Story
                </h3>
                <p className="font-serif-body text-base text-[#584141] mt-1">
                  Jaipur tea tables to winter promises under the Udaipur stars.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('hospitality')}
                className="filigree-card relative p-5 rounded-[4px] text-left transition-all duration-200 cursor-pointer group"
              >
                <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                  Palace Concierge
                </p>
                <h3 className="font-display text-xl font-medium text-[#570013] mt-1 group-hover:text-[#800020]">
                  Stays &amp; Attire Guide
                </h3>
                <p className="font-serif-body text-base text-[#584141] mt-1">
                  Airport transfers, lakeside suites, and ceremonial colour palettes.
                </p>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ceremonial Pavilions Preview Strip */}
      <section className="bg-[#f7f3eb] border-t border-[#D4AF37]/30 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
                The Wedding Folio
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#570013] mt-2">
                Four Ceremonial Pavilions
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {savedCount > 0 && (
                <span className="font-ui text-xs uppercase tracking-[0.1em] text-[#800020] font-semibold">
                  {savedCount} Saved to Your Itinerary
                </span>
              )}
              <button
                type="button"
                onClick={() => onNavigate('ceremonies')}
                className="font-ui text-xs uppercase tracking-[0.12em] font-semibold text-[#570013] hover:text-[#800020] inline-flex items-center gap-1.5 border-b border-[#D4AF37] pb-1 cursor-pointer whitespace-nowrap"
              >
                Full Schedule
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CEREMONIES.map((ceremony, idx) => (
              <motion.button
                key={ceremony.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onNavigate('ceremonies', ceremony.id)}
                className="filigree-card relative rounded-[4px] overflow-hidden text-left flex flex-col transition-all duration-200 cursor-pointer group"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#4A0404]">
                  <ResilientImage
                    src={ceremony.image}
                    alt={ceremony.imageAlt}
                    fallbackTitle={ceremony.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                      {ceremony.dayLabel} · {ceremony.timeText}
                    </p>
                    <h3 className="font-display text-xl font-medium text-[#570013] mt-1.5 group-hover:text-[#800020]">
                      {ceremony.title}
                    </h3>
                    <p className="font-serif-body text-base text-[#584141] mt-2 leading-snug">
                      {ceremony.venue}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-ui text-[11px] uppercase tracking-[0.12em] font-semibold text-[#800020]">
                    Open Pavilion
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
