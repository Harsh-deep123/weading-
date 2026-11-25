import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Minus, Plus } from 'lucide-react';
import { BlessingEntry, CEREMONIES } from '../data/weddingData';
import { FiligreeCorners, LotusDivider, MonogramCrest } from './OrnamentalMotifs';

export interface RsvpRecord {
  fullName: string;
  email: string;
  attending: 'yes' | 'no';
  guestCount: number;
  ceremonies: string[];
  dietary: string;
  arrivalNote: string;
  blessing: string;
  submittedAt: string;
}

interface RsvpScreenProps {
  preselectedCeremonyId?: string | null;
  savedRsvp: RsvpRecord | null;
  onSaveRsvp: (record: RsvpRecord) => void;
  blessings: BlessingEntry[];
  onAddBlessing: (guestName: string, city: string, message: string) => void;
}

const DIETARY_OPTIONS = ['Royal Vegetarian', 'Jain', 'Vegan', 'Gluten-Free'];

export function RsvpScreen({
  preselectedCeremonyId,
  savedRsvp,
  onSaveRsvp,
  blessings,
  onAddBlessing,
}: RsvpScreenProps) {
  const [editing, setEditing] = useState(!savedRsvp);
  const [fullName, setFullName] = useState(savedRsvp?.fullName ?? '');
  const [email, setEmail] = useState(savedRsvp?.email ?? '');
  const [city, setCity] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>(savedRsvp?.attending ?? 'yes');
  const [guestCount, setGuestCount] = useState(savedRsvp?.guestCount ?? 2);
  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>(
    savedRsvp?.ceremonies ?? CEREMONIES.map((c) => c.id)
  );
  const [dietary, setDietary] = useState(savedRsvp?.dietary ?? DIETARY_OPTIONS[0]);
  const [arrivalNote, setArrivalNote] = useState(savedRsvp?.arrivalNote ?? '');
  const [blessing, setBlessing] = useState(savedRsvp?.blessing ?? '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedCeremonyId && !selectedCeremonies.includes(preselectedCeremonyId)) {
      setSelectedCeremonies((prev) => [...prev, preselectedCeremonyId]);
      setEditing(true);
    }
  }, [preselectedCeremonyId]);

  const toggleCeremony = (id: string) => {
    setSelectedCeremonies((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name or family title.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address for your digital palace pass.');
      return;
    }
    if (attending === 'yes' && selectedCeremonies.length === 0) {
      setErrorMsg('Please select at least one ceremonial pavilion you plan to attend.');
      return;
    }

    const record: RsvpRecord = {
      fullName: fullName.trim(),
      email: email.trim(),
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      ceremonies: attending === 'yes' ? selectedCeremonies : [],
      dietary,
      arrivalNote: arrivalNote.trim(),
      blessing: blessing.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    onSaveRsvp(record);

    if (blessing.trim()) {
      onAddBlessing(fullName.trim(), city.trim() || 'Wedding Guest', blessing.trim());
    }

    setEditing(false);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-[#f7f3eb] border-b border-[#D4AF37]/30 py-14 md:py-16">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 text-center">
          <p className="font-ui text-xs uppercase tracking-[0.16em] text-[#735C00] font-semibold">
            Kindly Respond by November 1, 2026
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#570013] mt-3">
            Royal RSVP &amp; Blessings Folio
          </h1>
          <p className="font-serif-body text-lg sm:text-xl text-[#584141] max-w-xl mx-auto mt-3">
            Confirm your attendance across our ceremonial pavilions and leave a blessing for Aman
            and Priya.
          </p>
          <LotusDivider className="mt-6" />
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Cols: RSVP Folio or Confirmed Seal Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!editing && savedRsvp ? (
                <motion.div
                  key="rsvp-confirmed"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-[#FFF8E7] border border-[#D4AF37] rounded-[4px] p-8 sm:p-10 shadow-raised-tier text-center"
                >
                  <div className="absolute inset-2 border border-[#D4AF37]/35 pointer-events-none rounded-[2px]" />
                  <FiligreeCorners />

                  <div className="flex justify-center mb-5">
                    <MonogramCrest className="w-20 h-20" />
                  </div>

                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
                    Royal Seal Recorded · {savedRsvp.submittedAt}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#570013] mt-2">
                    {savedRsvp.attending === 'yes'
                      ? 'We Await You in Udaipur'
                      : 'With Gratitude From Afar'}
                  </h2>
                  <p className="font-serif-body text-lg text-[#2A0808] max-w-md mx-auto mt-3">
                    {savedRsvp.attending === 'yes'
                      ? `Your celebration pass for ${savedRsvp.fullName} (${savedRsvp.guestCount} ${
                          savedRsvp.guestCount === 1 ? 'guest' : 'guests'
                        }) has been inscribed in the royal guest ledger.`
                      : `Thank you, ${savedRsvp.fullName}, for sending your warm wishes to the Rathore and Singhania families.`}
                  </p>

                  {savedRsvp.attending === 'yes' && (
                    <div className="mt-7 text-left bg-[#fdf9f1] border border-[#D4AF37]/40 rounded-[4px] p-5 space-y-3">
                      <div className="flex flex-wrap justify-between gap-2 text-sm border-b border-[#D4AF37]/25 pb-2.5">
                        <span className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold">
                          Selected Pavilions
                        </span>
                        <span className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#800020] font-bold">
                          Dietary: {savedRsvp.dietary}
                        </span>
                      </div>
                      <ul className="space-y-1.5 font-serif-body text-base text-[#2A0808]">
                        {CEREMONIES.filter((c) => savedRsvp.ceremonies.includes(c.id)).map((c) => (
                          <li key={c.id} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#800020] shrink-0" aria-hidden="true" />
                            <span>
                              {c.title} · <span className="text-[#584141]">{c.dateText}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="btn-palace-outline px-6 py-2.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold cursor-pointer"
                    >
                      Modify Response
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="rsvp-form"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="relative bg-[#FFF8E7] border border-[#D4AF37]/75 rounded-[4px] p-6 sm:p-10 shadow-diya space-y-6"
                >
                  <FiligreeCorners />

                  <div>
                    <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
                      Guest Ledger
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#570013] mt-1">
                      Confirm Your Attendance
                    </h2>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-[4px] bg-[#ffdad6] border border-[#ba1a1a]/40 text-[#93000a] font-ui text-xs font-semibold tracking-wide"
                    >
                      {errorMsg}
                    </div>
                  )}

                  {/* Attending Radio */}
                  <div>
                    <span className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-2.5">
                      Will You Grace Us With Your Presence?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { value: 'yes' as const, label: 'Joyfully Accepts' },
                        { value: 'no' as const, label: 'Regretfully Declines' },
                      ].map((opt) => {
                        const selected = attending === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setAttending(opt.value)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-[4px] border text-left transition-all duration-150 cursor-pointer ${
                              selected
                                ? 'bg-[#800020] border-[#D4AF37] text-[#fdf9f1]'
                                : 'bg-[#fdf9f1] border-[#AA771C]/50 text-[#2A0808] hover:border-[#800020]'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rotate-45 border flex items-center justify-center shrink-0 ${
                                selected
                                  ? 'border-[#D4AF37] bg-[#570013]'
                                  : 'border-[#AA771C] bg-[#fdf9f1]'
                              }`}
                            >
                              {selected && <span className="w-1.5 h-1.5 bg-[#F3E5AB]" />}
                            </span>
                            <span className="font-ui text-xs uppercase tracking-[0.1em] font-semibold">
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="rsvp-name"
                        className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-1.5"
                      >
                        Full Name / Family Name
                      </label>
                      <input
                        id="rsvp-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Arjun & Kavya Mehta"
                        className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#AA771C]/60 rounded-[4px] font-serif-body text-lg text-[#1c1c17] focus:outline-2 focus:outline-[#800020] focus:border-[#800020]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rsvp-email"
                        className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="rsvp-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="arjun@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#AA771C]/60 rounded-[4px] font-serif-body text-lg text-[#1c1c17] focus:outline-2 focus:outline-[#800020] focus:border-[#800020]"
                      />
                    </div>
                  </div>

                  {attending === 'yes' && (
                    <>
                      {/* Guest Count & City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <span className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-1.5">
                            Number of Guests
                          </span>
                          <div className="inline-flex items-center border border-[#AA771C]/60 bg-[#FAF6EE] rounded-[4px]">
                            <button
                              type="button"
                              onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                              aria-label="Decrease guest count"
                              className="w-11 h-11 flex items-center justify-center text-[#570013] hover:bg-[#f1ede6] cursor-pointer"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-display text-xl font-semibold text-[#570013] tabular-nums">
                              {guestCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setGuestCount((c) => Math.min(6, c + 1))}
                              aria-label="Increase guest count"
                              className="w-11 h-11 flex items-center justify-center text-[#570013] hover:bg-[#f1ede6] cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="rsvp-city"
                            className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-1.5"
                          >
                            Travelling From (City)
                          </label>
                          <input
                            id="rsvp-city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g., New Delhi"
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#AA771C]/60 rounded-[4px] font-serif-body text-lg text-[#1c1c17] focus:outline-2 focus:outline-[#800020] focus:border-[#800020]"
                          />
                        </div>
                      </div>

                      {/* Ornate Diamond Ceremony Checkboxes */}
                      <div>
                        <span className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-2.5">
                          Ceremonies Attending
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {CEREMONIES.map((ceremony) => {
                            const checked = selectedCeremonies.includes(ceremony.id);
                            return (
                              <button
                                key={ceremony.id}
                                type="button"
                                onClick={() => toggleCeremony(ceremony.id)}
                                className={`flex items-start gap-3 p-3.5 rounded-[4px] border text-left transition-all duration-150 cursor-pointer ${
                                  checked
                                    ? 'bg-[#fdf9f1] border-[#800020] shadow-diya'
                                    : 'bg-[#FAF6EE]/70 border-[#AA771C]/40 hover:border-[#AA771C]'
                                }`}
                              >
                                <span
                                  className={`mt-1 w-4 h-4 rotate-45 border flex items-center justify-center shrink-0 transition-colors ${
                                    checked
                                      ? 'bg-[#800020] border-[#D4AF37]'
                                      : 'bg-[#FAF6EE] border-[#AA771C]'
                                  }`}
                                >
                                  {checked && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                                </span>
                                <div>
                                  <span className="font-display text-base font-medium text-[#570013] block leading-snug">
                                    {ceremony.title}
                                  </span>
                                  <span className="font-ui text-[10px] uppercase tracking-[0.1em] text-[#735C00] font-semibold">
                                    {ceremony.dayLabel} · {ceremony.timeText}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dietary Preference & Flight Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="rsvp-dietary"
                            className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-1.5"
                          >
                            Dietary Preference
                          </label>
                          <select
                            id="rsvp-dietary"
                            value={dietary}
                            onChange={(e) => setDietary(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#AA771C]/60 rounded-[4px] font-serif-body text-lg text-[#1c1c17] focus:outline-2 focus:outline-[#800020]"
                          >
                            {DIETARY_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="rsvp-arrival"
                            className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-1.5"
                          >
                            Arrival Date / Flight Note (Optional)
                          </label>
                          <input
                            id="rsvp-arrival"
                            type="text"
                            value={arrivalNote}
                            onChange={(e) => setArrivalNote(e.target.value)}
                            placeholder="e.g., Dec 11 · AI 471 at 10:15 AM"
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#AA771C]/60 rounded-[4px] font-serif-body text-lg text-[#1c1c17] focus:outline-2 focus:outline-[#800020]"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Blessing */}
                  <div>
                    <label
                      htmlFor="rsvp-blessing"
                      className="font-ui text-[11px] uppercase tracking-[0.12em] text-[#735C00] font-bold block mb-1.5"
                    >
                      A Blessing or Note for Aman &amp; Priya (Optional)
                    </label>
                    <textarea
                      id="rsvp-blessing"
                      rows={3}
                      value={blessing}
                      onChange={(e) => setBlessing(e.target.value)}
                      placeholder="Share your warm wishes for the couple..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#AA771C]/60 rounded-[4px] font-serif-body text-lg text-[#1c1c17] focus:outline-2 focus:outline-[#800020]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-4">
                    {savedRsvp && (
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="btn-palace-outline px-5 py-3 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="btn-royal-gilded px-8 py-3.5 rounded-[4px] font-ui text-xs uppercase tracking-[0.12em] font-semibold cursor-pointer"
                    >
                      Submit Royal RSVP
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right 5 Cols: Family & Friends Blessings Wall */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#735C00] font-semibold">
                Wishes Inscribed
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#570013] mt-1">
                Blessings &amp; Warm Notes
              </h2>
            </div>

            <div className="space-y-4">
              {blessings.map((entry) => (
                <article
                  key={entry.id}
                  className="bg-[#FFF8E7] border border-[#D4AF37]/45 rounded-[4px] p-5 shadow-diya"
                >
                  <p className="font-serif-body italic text-lg text-[#2A0808] leading-relaxed">
                    “{entry.message}”
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between gap-2 font-ui text-[11px] uppercase tracking-[0.1em] text-[#735C00] font-semibold">
                    <span>{entry.guestName}</span>
                    <span>{entry.city}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
