import React, { useState } from 'react';

export function MonogramCrest({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border border-[#D4AF37]/80 bg-[#FFF8E7]/90 shadow-diya ${className}`}
      aria-label="Aman and Priya Royal Monogram"
    >
      <div className="absolute inset-1 rounded-full border border-[#AA771C]/45 pointer-events-none" />
      <svg
        viewBox="0 0 80 80"
        className="w-full h-full p-2 text-[#800020]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M40 7 C43 13, 47 13, 50 7 C46 15, 42 17, 40 19 C38 17, 34 15, 30 7 C33 13, 37 13, 40 7 Z"
          fill="#D4AF37"
        />
        <circle cx="40" cy="42" r="24" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" />
        <path d="M28 70 Q40 64 52 70" stroke="#AA771C" strokeWidth="1" />
        <circle cx="40" cy="69" r="1.75" fill="#D4AF37" />
      </svg>
      <span className="absolute font-display text-lg sm:text-xl font-semibold tracking-wider text-[#570013]">
        A<span className="text-[#AA771C] italic text-base mx-0.5">&amp;</span>P
      </span>
    </div>
  );
}

export function LotusDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
      <svg viewBox="0 0 48 24" className="w-10 h-5 text-[#D4AF37]" fill="none">
        <path
          d="M24 3 C26 9, 30 13, 36 14 C30 16, 26 19, 24 22 C22 19, 18 16, 12 14 C18 13, 22 9, 24 3 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="#800020"
          fillOpacity="0.12"
        />
        <circle cx="24" cy="14" r="2" fill="#800020" />
        <circle cx="8" cy="14" r="1.2" fill="currentColor" />
        <circle cx="40" cy="14" r="1.2" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 max-w-[140px] bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
    </div>
  );
}

export function FiligreeCorners() {
  const cornerSvg = (rotateClass: string) => (
    <svg
      viewBox="0 0 24 24"
      className={`w-5 h-5 text-[#D4AF37]/80 pointer-events-none ${rotateClass}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 22 V6 C2 3.8 3.8 2 6 2 H22" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 18 V8 C6 6.9 6.9 6 8 6 H18" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" />
      <circle cx="6" cy="6" r="1.5" fill="#800020" />
    </svg>
  );

  return (
    <>
      <span className="absolute top-2.5 left-2.5 pointer-events-none">{cornerSvg('')}</span>
      <span className="absolute top-2.5 right-2.5 pointer-events-none">{cornerSvg('rotate-90')}</span>
      <span className="absolute bottom-2.5 right-2.5 pointer-events-none">{cornerSvg('rotate-180')}</span>
      <span className="absolute bottom-2.5 left-2.5 pointer-events-none">{cornerSvg('-rotate-90')}</span>
    </>
  );
}

export function DiyaPip({ active = false }: { active?: boolean }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center w-6 h-6 rounded-full border transition-colors duration-200 ${
        active
          ? 'bg-[#800020] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.5)]'
          : 'bg-[#FFF8E7] border-[#D4AF37]/80'
      }`}
      aria-hidden="true"
    >
      <span
        className={`w-2 h-2 rotate-45 transition-colors duration-200 ${
          active ? 'bg-[#F3E5AB]' : 'bg-[#800020]'
        }`}
      />
    </span>
  );
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'Royal Heritage Palace',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#570013] via-[#800020] to-[#4A0404] text-[#F3E5AB] p-6 text-center"
      >
        <svg viewBox="0 0 64 64" className="w-12 h-12 mb-3 text-[#D4AF37]" fill="none" aria-hidden="true">
          <path
            d="M12 52 V28 C12 18 22 12 32 8 C42 12 52 18 52 28 V52 Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="32" cy="30" r="6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <p className="font-display text-lg tracking-wide text-[#FDF9F1]">{fallbackTitle}</p>
        <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-[#F3E5AB]/80 mt-1">
          Udaipur · December 2026
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
