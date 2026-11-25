import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Plane, Ship, Car, ArrowRight } from 'lucide-react';
import { ATTIRE_GUIDES, ScreenId, WEDDING_IMAGES } from '../data/weddingData';
import { FiligreeCorners, LotusDivider, ResilientImage } from './OrnamentalMotifs';

interface HospitalityScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const PALACE_STAYS = [
  {
    name: 'Taj Lake Palace',
    wing: 'Lake Pichola Island Suites',
    distance: 'Private royal barge from Bansi Ghat Jetty · 6 min crossing',
    notes: 'Reserved block for immediate family & elders. Concierge check-in opens Dec 10 at 1:00 PM.',
  },
  {
    name: 'Shiv Niwas Palace',
    wing: 'City Palace Crescent Courtyard',
    distance: 'Adjacent to Zenana Mahal & Mor Chowk · Walking access',
    notes: 'Historic royal guest residence overlooking the Jagmandir water pavilion.',
  },
  {
    name: 'Fateh Prakash Palace',
    wing: 'Durbar Heritage Terrace',
    distance: 'Direct courtyard corridor to Tripolia Gate & Sheesh Mahal',
    notes: 'Dedicated bridal styling and safa-tying lounges located on the second terrace.',
  },
];

export function HospitalityScreen({ onNavigate }: HospitalityScreenProps) {
  const [selectedAttireId, setSelectedAttireId] = useState(ATTIRE_GUIDES[0].id);
  const activeGuide = ATTIRE_GUIDES.find((g) => g.id === selectedAttireId) ?? ATTIRE_GUIDES[0];

  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="pb-20">
      {/* Parallax Hospitality Header */}
      <section
        ref={heroRef}
        className="relative h-[300px] sm:h-[360px] overflow-hidden border-b border-[#D4AF37]/40 flex items-center justify-center"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
          <ResilientImage
            src={WEDDING_IMAGES.sangeetPavilion}
            alt="Udaipur palace courtyard pavilion prepared with lotus bowls and warm lanterns"
            fallbackTitle="Royal Hospitality · Udaipur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0808]/65 via-[#4A0404]/55 to-[#2A0808]/80" />
        </motion.div>

        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center">
          <p className="font-ui text-xs uppercase tracking-[0.16em] text-[#F3E5AB] font-semibold">
            Guest Concierge · Udaipur
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FDF9F1] mt-3">
            Palace Stays, Transfers &amp; Attire
          </h1>
          <p className="font-serif-body text-lg sm:text-xl text-[#F3E5AB]/90 max-w-2xl mx-auto mt-3">
            Every arrival, lakeside crossing, and wardrobe detail arranged so you can savour each
            ceremony effortlessly.
          </p>
        </div>
      </section>

      {/* Palace Residences & Transfers */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="mb-8">
          <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
            Royal Residences
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#570013] mt-2">
            Accommodations Around Lake Pichola
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PALACE_STAYS.map((stay) => (
            <div
              key={stay.name}
              className="relative filigree-card rounded-[4px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200"
            >
              <FiligreeCorners />
              <div>
                <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                  {stay.wing}
                </p>
                <h3 className="font-display text-2xl font-medium text-[#570013] mt-1.5">
                  {stay.name}
                </h3>
                <p className="font-serif-body text-base text-[#2A0808] mt-3 leading-relaxed">
                  {stay.notes}
                </p>
              </div>
              <p className="mt-5 pt-4 border-t border-[#D4AF37]/30 font-ui text-[11px] uppercase tracking-[0.08em] text-[#584141] font-semibold">
                {stay.distance}
              </p>
            </div>
          ))}
        </div>

        {/* Transfers Row */}
        <div className="mt-10 bg-[#f7f3eb] border border-[#D4AF37]/40 rounded-[4px] p-6 sm:p-8">
          <h3 className="font-display text-2xl font-medium text-[#570013] mb-5">
            Arrival &amp; Courtyard Transfers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <Plane className="w-5 h-5 text-[#800020] mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.1em] text-[#570013] font-bold">
                  Maharana Pratap Airport (UDR)
                </p>
                <p className="font-serif-body text-base text-[#584141] mt-1">
                  40 minutes by chauffeur-driven palace sedan. Share your flight number in the RSVP
                  folio for dedicated meet-and-greet.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Ship className="w-5 h-5 text-[#800020] mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.1em] text-[#570013] font-bold">
                  Bansi Ghat Royal Barge
                </p>
                <p className="font-serif-body text-base text-[#584141] mt-1">
                  Continuous electric lantern boats shuttle between City Palace jetty and
                  Jagmandir Island every 10 minutes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Car className="w-5 h-5 text-[#800020] mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.1em] text-[#570013] font-bold">
                  Heritage Vintage Buggies
                </p>
                <p className="font-serif-body text-base text-[#584141] mt-1">
                  Courtyard golf carts and vintage carriages operate within the City Palace walls
                  for elders and guests in heavy bridal wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LotusDivider className="my-4" />

      {/* Interactive Royal Attire Palette Guide */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-8 py-12">
        <div className="mb-8">
          <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
            Wardrobe Inspiration
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#570013] mt-2">
            Ceremonial Palette &amp; Dress Guide
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {ATTIRE_GUIDES.map((guide) => {
            const active = guide.id === activeGuide.id;
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedAttireId(guide.id)}
                className={`px-5 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.1em] font-semibold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#800020] text-[#fdf9f1] border-[#D4AF37] shadow-diya'
                    : 'bg-[#FFF8E7] text-[#570013] border-[#D4AF37]/45 hover:border-[#D4AF37]'
                }`}
              >
                {guide.ceremony}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGuide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FFF8E7] border border-[#D4AF37]/75 rounded-[4px] p-6 sm:p-10 shadow-diya"
          >
            <FiligreeCorners />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <p className="font-ui text-xs uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                  Suggested Palette
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#570013] mt-1.5">
                  {activeGuide.paletteName}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 mt-6">
                  {activeGuide.swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="flex items-center gap-3 p-2.5 rounded-[4px] bg-[#fdf9f1] border border-[#D4AF37]/35"
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-[#AA771C]/50 shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                        aria-hidden="true"
                      />
                      <span className="font-ui text-[11px] uppercase tracking-[0.08em] text-[#2A0808] font-semibold">
                        {swatch.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-5 rounded-[4px] bg-[#fdf9f1] border border-[#D4AF37]/35">
                    <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#800020] font-bold">
                      For Her
                    </p>
                    <p className="font-serif-body text-lg text-[#2A0808] mt-1.5 leading-relaxed">
                      {activeGuide.forHer}
                    </p>
                  </div>
                  <div className="p-5 rounded-[4px] bg-[#fdf9f1] border border-[#D4AF37]/35">
                    <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#800020] font-bold">
                      For Him
                    </p>
                    <p className="font-serif-body text-lg text-[#2A0808] mt-1.5 leading-relaxed">
                      {activeGuide.forHim}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="font-serif-body italic text-base text-[#584141]">
                    {activeGuide.note}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('rsvp')}
                    className="btn-royal-gilded px-5 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold inline-flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    Confirm Travel &amp; RSVP
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
