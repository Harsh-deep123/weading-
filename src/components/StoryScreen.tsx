import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ScreenId, STORY_CHAPTERS, WEDDING_IMAGES } from '../data/weddingData';
import {
  DiyaPip,
  FiligreeCorners,
  LotusDivider,
  ResilientImage,
} from './OrnamentalMotifs';

interface StoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function StoryScreen({ onNavigate }: StoryScreenProps) {
  const [activeChapterId, setActiveChapterId] = useState(STORY_CHAPTERS[0].id);
  const activeChapter =
    STORY_CHAPTERS.find((c) => c.id === activeChapterId) ?? STORY_CHAPTERS[0];

  const spreadRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: spreadRef,
    offset: ['start end', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], ['-6%', '8%']);
  const quoteY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <div className="pb-20">
      {/* Screen Header */}
      <section className="bg-[#f7f3eb] border-b border-[#D4AF37]/30 py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 text-center">
          <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
            The Royal Chronicle
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#570013] mt-3">
            From Jaipur Courtyards to Sacred Vows
          </h1>
          <p className="font-serif-body text-lg sm:text-xl text-[#584141] max-w-2xl mx-auto mt-4 leading-relaxed">
            Four winters, countless handwritten notes, and two families united in timeless grace.
          </p>
          <LotusDivider className="mt-7" />
        </div>
      </section>

      {/* Parallax Portrait & Drop-Cap Editorial Narrative */}
      <section ref={spreadRef} className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[3/4] jharokha-arch overflow-hidden border-2 border-[#D4AF37]/80 shadow-raised-tier bg-[#4A0404]">
              <motion.div
                style={{ y: portraitY }}
                className="w-full h-[116%] -mt-[8%] will-change-transform"
              >
                <ResilientImage
                  src={WEDDING_IMAGES.coupleJharokha}
                  alt="Aman and Priya framed beneath a carved sandstone jharokha overlooking Lake Pichola"
                  fallbackTitle="Aman & Priya · Udaipur"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-2 jharokha-arch border border-[#F3E5AB]/55 pointer-events-none" />
            </div>
          </div>

          <motion.div
            style={{ y: quoteY }}
            className="lg:col-span-7 space-y-6 will-change-transform"
          >
            <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
              Prologue · Autumn 2022 – Winter 2026
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#570013]">
              Two Traditions, One Shared Hearth
            </h2>
            <p className="font-serif-body text-lg sm:text-[20px] text-[#2A0808] leading-[1.7] first-letter:text-5xl first-letter:font-display first-letter:font-semibold first-letter:text-[#800020] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              Raised between the sandstone havelis of Jaipur and the classical music sabhas of
              Mumbai, Aman and Priya first crossed paths while restoring an eighteenth-century
              courtyard pavilion. What sparked over architectural sketches and cardamom tea grew
              into a companionship anchored by family heritage, quiet humour, and mutual reverence
              for craft.
            </p>

            {/* Two Houses Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="relative bg-[#FFF8E7] border border-[#D4AF37]/45 rounded-[4px] p-5 shadow-diya">
                <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                  The Groom’s House
                </p>
                <h3 className="font-display text-xl font-medium text-[#570013] mt-1">
                  House of Rathore
                </h3>
                <p className="font-serif-body text-base text-[#584141] mt-1.5 leading-snug">
                  Son of Maharajkumar Vikram &amp; Gayatri Rathore of Civil Lines, Jaipur.
                </p>
              </div>
              <div className="relative bg-[#FFF8E7] border border-[#D4AF37]/45 rounded-[4px] p-5 shadow-diya">
                <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                  The Bride’s House
                </p>
                <h3 className="font-display text-xl font-medium text-[#570013] mt-1">
                  House of Singhania
                </h3>
                <p className="font-serif-body text-base text-[#584141] mt-1.5 leading-snug">
                  Daughter of Devansh &amp; Meera Singhania of Malabar Hill, Mumbai.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Bead-Chain Chapter Timeline */}
      <section className="bg-[#f7f3eb] border-y border-[#D4AF37]/30 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="mb-10">
            <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
              Chapters Along the Journey
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#570013] mt-2">
              Milestones in Gold &amp; Memory
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Bead-Chain Selector Column */}
            <div className="lg:col-span-5 relative pl-6">
              <div
                aria-hidden="true"
                className="absolute left-[11px] top-4 bottom-4 w-1 gold-bead-line"
              />
              <div className="space-y-4">
                {STORY_CHAPTERS.map((chapter) => {
                  const isSelected = chapter.id === activeChapter.id;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => setActiveChapterId(chapter.id)}
                      className={`relative w-full text-left pl-6 pr-5 py-4 rounded-[4px] border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFF8E7] border-[#D4AF37] shadow-diya'
                          : 'bg-[#fdf9f1]/70 border-[#D4AF37]/30 hover:bg-[#FFF8E7]/80 hover:border-[#D4AF37]/70'
                      }`}
                    >
                      <span className="absolute -left-[25px] top-1/2 -translate-y-1/2">
                        <DiyaPip active={isSelected} />
                      </span>
                      <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-semibold">
                        Chapter {chapter.numeral} · {chapter.year}
                      </p>
                      <h3 className="font-display text-xl font-medium text-[#570013] mt-1">
                        {chapter.title}
                      </h3>
                      <p className="font-serif-body text-sm text-[#584141] mt-0.5">
                        {chapter.location}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Chapter Archival Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeChapter.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-[#FFF8E7] border border-[#D4AF37]/75 rounded-[4px] p-8 sm:p-10 shadow-raised-tier"
                >
                  <div className="absolute inset-2 border border-[#D4AF37]/30 pointer-events-none rounded-[2px]" />
                  <FiligreeCorners />

                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
                    Chapter {activeChapter.numeral} · {activeChapter.year} · {activeChapter.location}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#570013] mt-3">
                    {activeChapter.title}
                  </h3>
                  <p className="font-serif-body text-lg sm:text-[19px] text-[#2A0808] leading-relaxed mt-5">
                    {activeChapter.excerpt}
                  </p>

                  <div className="my-7 h-px bg-gradient-to-r from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent" />

                  <blockquote className="font-display italic text-xl sm:text-2xl text-[#800020] leading-snug">
                    {activeChapter.pullQuote}
                  </blockquote>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onNavigate('ceremonies')}
                      className="btn-royal-gilded px-6 py-3 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold inline-flex items-center gap-2 cursor-pointer"
                    >
                      Explore Wedding Ceremonies
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
