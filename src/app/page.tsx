"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_PATH = "/fiftyk-offer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Fixed gold dust positions to prevent hydration mismatch
const DUST_PARTICLES = [
  { top: 12, left: 8, size: 2, dur: 8, delay: 0 },
  { top: 34, left: 72, size: 3, dur: 10, delay: 1.2 },
  { top: 67, left: 15, size: 1.5, dur: 7, delay: 0.5 },
  { top: 22, left: 91, size: 2.5, dur: 9, delay: 2 },
  { top: 80, left: 55, size: 2, dur: 11, delay: 0.8 },
  { top: 45, left: 38, size: 1, dur: 6, delay: 3 },
  { top: 5, left: 50, size: 3, dur: 12, delay: 1.5 },
  { top: 90, left: 25, size: 2, dur: 8, delay: 4 },
  { top: 58, left: 82, size: 1.5, dur: 9, delay: 2.5 },
  { top: 75, left: 5, size: 2.5, dur: 7, delay: 0.2 },
  { top: 18, left: 63, size: 1, dur: 10, delay: 3.5 },
  { top: 50, left: 97, size: 2, dur: 8.5, delay: 1 },
  { top: 95, left: 70, size: 3, dur: 11, delay: 2.2 },
  { top: 30, left: 20, size: 1.5, dur: 7.5, delay: 4.5 },
  { top: 62, left: 48, size: 2, dur: 9.5, delay: 0.7 },
];

const ExpandableField = ({ name, label, fields }: { name: string; label: string; fields?: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-[#cfb53b]/15">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full py-5 flex justify-between items-center uppercase tracking-[0.15em] text-sm md:text-base outline-none transition-all hover:text-[#cfb53b] font-light"
      >
        <span className={`transition-colors duration-300 ${expanded ? "text-[#cfb53b]" : "text-white/50"}`}>{label}</span>
        <span className={`text-xl font-thin transition-all duration-300 ${expanded ? "text-[#cfb53b] rotate-45" : "text-[#cfb53b]/40"}`}>+</span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 pb-6">
              {fields ? (
                fields.map((fieldLabel, idx) => (
                  <input
                    key={idx}
                    type="text"
                    name={`${name}_${idx}`}
                    placeholder={fieldLabel}
                    className="w-full bg-transparent border-b border-white/8 py-4 text-white tracking-wider outline-none focus:border-[#cfb53b]/50 transition-all placeholder:text-white/15 font-light text-base"
                  />
                ))
              ) : (
                <textarea
                  name={name}
                  placeholder="Write here..."
                  rows={3}
                  className="w-full bg-transparent py-4 text-white tracking-wide outline-none placeholder:text-white/15 font-light text-base resize-none border-b border-white/8 focus:border-[#cfb53b]/50 transition-all"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    const targetUrl = e.currentTarget.getAttribute("href");
    if (form && targetUrl) {
      if (!form.checkValidity()) { form.reportValidity(); return; }
      setIsSubmitting(true);
      const formData = new FormData(form);
      try {
        fetch("https://formsubmit.co/ajax/anextvid@gmail.com", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
          keepalive: true,
        });
        await new Promise((r) => setTimeout(r, 800));
        window.location.href = targetUrl;
      } catch {
        window.location.href = targetUrl;
      }
    }
  };

  return (
    <main className="block relative min-h-screen w-full bg-[#020202] text-white font-sans overflow-hidden">

      {/* Global Keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0%   { transform: translateX(-160%) skewX(-18deg); }
          100% { transform: translateX(160%) skewX(-18deg); }
        }
        @keyframes shine {
          0%   { background-position-x: 200%; }
          100% { background-position-x: -200%; }
        }
        @keyframes pulsate-opacity {
          0%, 100% { opacity: 0; }
          50%       { opacity: 1; }
        }
        @keyframes float {
          0%   { transform: translateY(0px) translateX(0px) translateZ(0); opacity: 0; }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.3; }
          100% { transform: translateY(-120px) translateX(15px) translateZ(0); opacity: 0; }
        }
        @keyframes borderpulse {
          0%, 100% { border-color: rgba(207,181,59,0.25); }
          50%       { border-color: rgba(207,181,59,0.5); }
        }
      `}</style>

      {/* ── Background ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Collage texture – deeply dimmed */}
        <div
          className="absolute inset-0 opacity-[0.06] grayscale"
          style={{
            backgroundImage: `url('${BASE_PATH}/collage-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Ambient gold orbs - hardware accelerated via radial background */}
        <div className="absolute top-[-25%] left-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(207,181,59,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(207,181,59,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-[35%] left-[35%] w-[30%] h-[30%] bg-[radial-gradient(circle_at_center,rgba(207,181,59,0.05)_0%,transparent_70%)]" />
        {/* Fixed gold dust particles */}
        {DUST_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#cfb53b]/30"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              willChange: "transform, opacity",
              animation: `float ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <AnimatePresence mode="wait">

          {/* ── Landing Card ──────────────────────────────────── */}
          {!showForm ? (
            <motion.div
              key="landing"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowForm(true)}
              className="relative w-full max-w-2xl mx-auto bg-black/70 backdrop-blur-2xl flex flex-col items-center justify-center py-20 px-10 sm:px-16 cursor-pointer group overflow-hidden shadow-[0_0_40px_rgba(207,181,59,0.07),0_0_0_1px_rgba(207,181,59,0.15)]"
            >
              {/* Hardware-accelerated glow pulse */}
              <div className="absolute inset-0 pointer-events-none shadow-[0_0_80px_rgba(207,181,59,0.18),0_0_0_1px_rgba(207,181,59,0.30)]" style={{ animation: "pulsate-opacity 7s ease-in-out infinite" }} />
              {/* Shimmer sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cfb53b]/10 to-transparent animate-[shimmer_6s_ease-in-out_infinite] skew-x-12" />
              </div>

              {/* Corner brackets */}
              {[
                "top-0 left-0 border-t border-l items-start justify-start",
                "top-0 right-0 border-t border-r items-start justify-end",
                "bottom-0 left-0 border-b border-l items-end justify-start",
                "bottom-0 right-0 border-b border-r items-end justify-end",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-10 h-10 ${cls} border-[#cfb53b]/25 transition-all duration-700 group-hover:border-[#cfb53b]/70 group-hover:w-14 group-hover:h-14 flex p-[3px]`}
                >
                  <div className="w-[3px] h-[3px] rounded-full bg-[#cfb53b]/50 group-hover:bg-[#cfb53b] transition-all" />
                </div>
              ))}

              {/* Content */}
              <div className="flex flex-col items-center gap-10 w-full">

                {/* Name */}
                <motion.p
                  variants={itemVariants}
                  className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.5em] font-light uppercase text-[#cfb53b]/60 m-0 mr-[-0.5em] transition-all duration-700 group-hover:text-[#cfb53b]"
                >
                  jahronimo
                </motion.p>

                {/* Divider */}
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#cfb53b]/40 to-transparent" />

                {/* £50,000 */}
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-transparent bg-clip-text m-0
                    bg-[linear-gradient(110deg,#bf953f_0%,#fcf6ba_30%,#b38728_50%,#fbf5b7_70%,#aa771c_100%)]
                    bg-[length:200%_100%] animate-[shine_6s_linear_infinite]"
                >
                  £50,000
                </motion.h1>

                {/* Divider */}
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#cfb53b]/40 to-transparent" />

                {/* Sub text — centred block with period compensation */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-0 w-full text-center">
                  <p className="text-sm md:text-lg tracking-[0.5em] font-light text-[#cfb53b]/50 uppercase m-0 mr-[-0.5em] leading-none mb-4">
                    no saying..
                  </p>
                  <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-black text-white uppercase m-0 leading-none mr-[-0.05em]">
                    i make.
                  </p>
                </motion.div>

                {/* CTA */}
                <motion.div variants={itemVariants} className="pt-4 flex items-center gap-3">
                  <div className="w-4 h-[1px] bg-[#cfb53b]/30" />
                  <span className="text-[#cfb53b]/60 tracking-[0.5em] text-[10px] uppercase font-light mr-[-0.5em]">
                    Access Project
                  </span>
                  <div className="w-4 h-[1px] bg-[#cfb53b]/30" />
                </motion.div>

              </div>
            </motion.div>

          ) : (
            /* ── Form Card ────────────────────────────────────── */
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-xl mx-auto bg-black/70 backdrop-blur-2xl p-10 md:p-16 flex flex-col items-center shadow-[0_0_40px_rgba(207,181,59,0.07),0_0_0_1px_rgba(207,181,59,0.15)]"
            >
              {/* Hardware-accelerated glow pulse */}
              <div className="absolute inset-0 pointer-events-none shadow-[0_0_80px_rgba(207,181,59,0.18),0_0_0_1px_rgba(207,181,59,0.30)]" style={{ animation: "pulsate-opacity 7s ease-in-out infinite" }} />
              {/* Corner brackets */}
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-10 h-10 ${cls} border-[#cfb53b]/30`} />
              ))}

              {/* Header */}
              <div className="w-full text-center mb-12">
                <h2 className="text-2xl md:text-4xl tracking-[0.25em] font-black uppercase text-white mb-3 mr-[-0.25em]">
                  Project Access
                </h2>
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#cfb53b]/40 to-transparent mx-auto mb-3" />
                <p className="text-[10px] tracking-[0.5em] font-light uppercase text-[#cfb53b]/50 mr-[-0.5em]">
                  Fill in what you wish
                </p>
              </div>

              <form className="flex flex-col gap-8 w-full">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New £50k Project Inquiry" />

                {/* Required fields */}
                {[
                  { name: "name", placeholder: "Your Name", type: "text", required: true },
                  { name: "email", placeholder: "Email Address", type: "email", required: true },
                  { name: "location", placeholder: "Where you're from", type: "text", required: true },
                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder.toUpperCase()}
                      required={field.required}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg md:text-2xl text-white tracking-widest outline-none transition-all placeholder:text-white/12 font-light"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#cfb53b] to-[#fcf6ba] group-focus-within:w-full transition-all duration-700" />
                  </div>
                ))}

                {/* Expandable optional fields */}
                <div className="flex flex-col w-full mt-2 border-t border-white/8">
                  <ExpandableField name="personal_life" label="Personal Life" fields={["Who are you?", "Personal Ambition", "Lifestyle Focus"]} />
                  <ExpandableField name="business_life" label="Business Life" fields={["Current Project", "Business Goal", "Vision"]} />
                  <ExpandableField name="social_links" label="Socials & Links" fields={["Primary Link", "Secondary Link", "Portfolio"]} />
                  <ExpandableField name="other_area" label="Other Interests" fields={["Creative Focus", "Technical Area", "Other"]} />
                  <ExpandableField name="reference" label="Reference Points" fields={["How you found me", "Key Influences", "Similar Work"]} />
                </div>

                {/* Payment CTA */}
                <a
                  href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
                  onClick={handleSubmit}
                  className={`mt-8 group relative py-6 border border-[#cfb53b]/30 bg-transparent text-white tracking-[0.45em] uppercase font-light text-sm hover:border-[#cfb53b] transition-all duration-700 w-full flex justify-center items-center text-center overflow-hidden ${isSubmitting ? "opacity-30 pointer-events-none" : ""}`}
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500 mr-[-0.45em] w-full text-center">
                    {isSubmitting ? "Redirecting…" : "Proceed to Payment"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                </a>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
