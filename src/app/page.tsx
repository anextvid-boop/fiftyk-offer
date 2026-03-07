"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SENSORY FEEDBACK SYSTEM ---
const useSensoryFeedback = () => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext only on client
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioCtx(ctx);
    return () => { ctx.close(); };
  }, []);

  const playTick = useCallback(() => {
    if (!audioCtx) return;
    if (navigator.vibrate) navigator.vibrate([10]); // Soft haptic tap

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime); // High glassy pitch
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }, [audioCtx]);

  const playSuccessSweep = useCallback(() => {
    if (!audioCtx) return;
    if (navigator.vibrate) navigator.vibrate([20, 30, 40]); // Swell haptic feedback

    // C maj 7 chord components (C, E, G, B)
    const frequencies = [261.63, 329.63, 392.00, 493.88];

    frequencies.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      // Staggered fade in/out for a "sweep" jazzy feel
      const startTime = audioCtx.currentTime + (i * 0.08);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.8);
    });
  }, [audioCtx]);

  const playKeystroke = useCallback(() => {
    if (!audioCtx) return;
    if (navigator.vibrate) navigator.vibrate([5]); // Very light buzz

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.03); // Quick low thud

    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  }, [audioCtx]);

  const playError = useCallback(() => {
    if (!audioCtx) return;
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]); // Stutter buzz

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2); // Downward pitch

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  }, [audioCtx]);

  const playOpeningSting = useCallback(() => {
    if (!audioCtx) return;
    if (navigator.vibrate) navigator.vibrate([20, 10, 50]); // Swoosh into hit

    // 1) Deep bass thud
    const bassOsc = audioCtx.createOscillator();
    const bassGain = audioCtx.createGain();
    bassOsc.type = "sine";
    bassOsc.frequency.setValueAtTime(40, audioCtx.currentTime);
    bassOsc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 1.5);
    bassGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    bassGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

    bassOsc.connect(bassGain);
    bassGain.connect(audioCtx.destination);
    bassOsc.start();
    bassOsc.stop(audioCtx.currentTime + 1.5);

    // 2) Glassy swoosh up
    const swooshOsc = audioCtx.createOscillator();
    const swooshGain = audioCtx.createGain();
    swooshOsc.type = "sine";
    swooshOsc.frequency.setValueAtTime(100, audioCtx.currentTime);
    swooshOsc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.5);
    swooshGain.gain.setValueAtTime(0, audioCtx.currentTime);
    swooshGain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.1);
    swooshGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    swooshOsc.connect(swooshGain);
    swooshGain.connect(audioCtx.destination);
    swooshOsc.start();
    swooshOsc.stop(audioCtx.currentTime + 0.8);
  }, [audioCtx]);

  return { playTick, playSuccessSweep, playKeystroke, playError, playOpeningSting };
};

const BASE_PATH = "/fiftyk-offer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
} as any;

const letterVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(12px)", scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      delay: 0.6 + (i * 0.1),
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1]
    }
  })
} as any;

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
  const { playTick, playKeystroke } = useSensoryFeedback();

  return (
    <div className="border-b border-[#d4af37]/15">
      <button
        type="button"
        onClick={() => { playTick(); setExpanded(!expanded); }}
        className="w-full py-5 flex justify-between items-center uppercase tracking-[0.15em] text-sm md:text-base outline-none transition-all hover:text-[#d4af37] font-light active:scale-[0.99] active:brightness-90 origin-center"
      >
        <span className={`transition-colors duration-300 ${expanded ? "text-[#d4af37]" : "text-white/50"}`}>{label}</span>
        <span className={`text-xl font-thin transition-all duration-300 ${expanded ? "text-[#d4af37] rotate-45" : "text-[#d4af37]/40"}`}>+</span>
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
                fields.map((fieldLabel, idx) => {
                  // Sanitize fieldLabel for email/form name (e.g. "Who are you?" -> "Who_are_you")
                  const inputName = fieldLabel.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
                  return (
                    <textarea
                      key={idx}
                      name={inputName}
                      placeholder={fieldLabel}
                      rows={2}
                      onFocus={playKeystroke}
                      onChange={(e) => {
                        if (e.target.value.length % 5 === 0) playKeystroke(); // Occasional tactile click when typing
                      }}
                      className="w-full bg-transparent border-b border-white/8 py-4 text-white tracking-wider outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/15 font-light text-base resize-none"
                    />
                  );
                })
              ) : (
                <textarea
                  name={name}
                  placeholder="Write here..."
                  rows={3}
                  onFocus={playKeystroke}
                  onChange={(e) => {
                    if (e.target.value.length % 5 === 0) playKeystroke();
                  }}
                  className="w-full bg-transparent py-4 text-white tracking-wide outline-none placeholder:text-white/15 font-light text-base resize-none border-b border-white/8 focus:border-[#d4af37]/50 transition-all"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExpandableFileField = ({ name, label, description }: { name: string; label: string; description: string }) => {
  const [expanded, setExpanded] = useState(false);
  const { playTick } = useSensoryFeedback();

  return (
    <div className="border-b border-[#d4af37]/15">
      <button
        type="button"
        onClick={() => { playTick(); setExpanded(!expanded); }}
        className="w-full py-5 flex justify-between items-center uppercase tracking-[0.15em] text-sm md:text-base outline-none transition-all hover:text-[#d4af37] font-light active:scale-[0.99] active:brightness-90 origin-center"
      >
        <span className={`transition-colors duration-300 ${expanded ? "text-[#d4af37]" : "text-white/50"}`}>{label}</span>
        <span className={`text-xl font-thin transition-all duration-300 ${expanded ? "text-[#d4af37] rotate-45" : "text-[#d4af37]/40"}`}>+</span>
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
              <p className="text-[#d4af37]/60 text-xs tracking-widest uppercase font-light mb-1">{description}</p>
              <input
                type="file"
                name={name}
                multiple
                accept="image/*"
                className="w-full bg-transparent border border-white/8 p-4 text-white tracking-wider outline-none focus:border-[#d4af37]/50 transition-all font-light text-sm
                file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-[#d4af37]/20 file:text-[#d4af37] hover:file:bg-[#d4af37]/30 file:transition-all file:cursor-pointer"
              />
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
  const { playSuccessSweep, playTick, playKeystroke, playError, playOpeningSting } = useSensoryFeedback();

  // Play opening sting on mount
  useEffect(() => {
    // A small timeout ensures the audio context has a higher chance of being active
    // depending on the browser's autoplay policies, but requires a user interaction usually.
    // However, if the user interacts immediately or if the browser allows it, it sets the tone.
    const timer = setTimeout(() => {
      playOpeningSting();
    }, 200);
    return () => clearTimeout(timer);
  }, [playOpeningSting]);

  const handleSubmit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    const targetUrl = e.currentTarget.getAttribute("href");
    if (form && targetUrl) {
      if (!form.checkValidity()) {
        playError();
        form.reportValidity();
        return;
      }
      playSuccessSweep();
      setIsSubmitting(true);
      const formData = new FormData(form);
      try {
        await fetch("https://formsubmit.co/ajax/anextvid@gmail.com", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
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
          0%, 100% { border-color: rgba(212,175,55,0.25); }
          50%       { border-color: rgba(212,175,55,0.5); }
        }
        @keyframes letter-glow {
          0%, 100% { color: rgba(212,175,55,0.6); text-shadow: none; }
          15%, 25% { color: #ffffff; text-shadow: 0 0 15px rgba(212,175,55,0.9), 0 0 5px rgba(255,255,255,0.5); }
          40%, 90% { color: rgba(212,175,55,0.6); text-shadow: none; }
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
        <div className="absolute top-[-25%] left-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-[35%] left-[35%] w-[30%] h-[30%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        {/* Fixed gold dust particles */}
        {DUST_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#d4af37]/30"
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

          {/* ── Landing Page Content ────────────────────────── */}
          {!showForm ? (
            <motion.div
              key="landing-stack"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto"
            >
              {/* Donation Card (Enhanced Visibility) */}
              <motion.a
                href="https://gofund.me/1bdc2d15c"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                onClick={() => playTick()}
                className="relative w-full max-w-xl bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center py-10 px-6 cursor-pointer group overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.08),0_0_0_1px_rgba(212,175,55,0.12)] active:scale-[0.98] active:brightness-90 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] origin-center transition-all duration-300"
              >
                {/* Hardware-accelerated glow pulse */}
                <div className="absolute inset-0 pointer-events-none shadow-[0_0_40px_rgba(212,175,55,0.1),0_0_0_1px_rgba(212,175,55,0.2)]" style={{ animation: "pulsate-opacity 7s ease-in-out infinite" }} />

                {/* Corner brackets - Larger for impact */}
                {[
                  "top-0 left-0 border-t border-l items-start justify-start",
                  "top-0 right-0 border-t border-r items-start justify-end",
                  "bottom-0 left-0 border-b border-l items-end justify-start",
                  "bottom-0 right-0 border-b border-r items-end justify-end",
                ].map((cls, i) => (
                  <div
                    key={i}
                    className={`absolute w-10 h-10 ${cls} border-[#d4af37]/40 flex p-[3px]`}
                  >
                    <div className="w-[4px] h-[4px] rounded-full bg-[#d4af37]/60" />
                  </div>
                ))}

                {/* Content - High Impact */}
                <div className="flex flex-col items-center gap-4 w-full text-center">
                  <p className="animate-text-shine tracking-[0.4em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-black drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] mb-1 leading-none">I NEED HELP</p>
                  <p className="text-[#d4af37]/90 tracking-[0.2em] text-xs sm:text-sm md:text-base uppercase font-black">SUPPORT THE MISSION</p>
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent my-1" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none group-hover:text-[#d4af37] transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                    MAKE A <br className="sm:hidden" /> DONATION
                  </h2>
                </div>
              </motion.a>

              {/* Purchase Card (Dominant - 70% weighting) */}
              <motion.div
                variants={itemVariants}
                onClick={() => { playTick(); setShowForm(true); }}
                className="relative w-full bg-black/70 backdrop-blur-2xl flex flex-col items-center justify-center py-20 px-10 sm:px-16 cursor-pointer group animate-card-entrance overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.07),0_0_0_1px_rgba(212,175,55,0.15)] active:scale-[0.98] active:brightness-90 hover:scale-[1.01] hover:shadow-[0_0_60px_rgba(212,175,55,0.12)] origin-center transition-all duration-300"
              >
                {/* Hardware-accelerated glow pulse */}
                <div className="absolute inset-0 pointer-events-none shadow-[0_0_80px_rgba(212,175,55,0.18),0_0_0_1px_rgba(212,175,55,0.30)]" style={{ animation: "pulsate-opacity 7s ease-in-out infinite" }} />
                {/* Shimmer sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent animate-[shimmer_6s_ease-in-out_infinite] skew-x-12" />
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
                    className={`absolute w-10 h-10 ${cls} border-[#d4af37]/25 transition-all duration-700 group-hover:border-[#d4af37]/70 group-hover:w-14 group-hover:h-14 flex p-[3px]`}
                  >
                    <div className="w-[3px] h-[3px] rounded-full bg-[#d4af37]/50 group-hover:bg-[#d4af37] transition-all" />
                  </div>
                ))}

                {/* Content */}
                <div className="flex flex-col items-center gap-10 w-full">
                  {/* Name & Context */}
                  <div className="flex flex-col items-center gap-6">
                    <motion.p
                      variants={itemVariants}
                      className="text-[#d4af37] tracking-[1.2em] text-xl sm:text-2xl md:text-3xl uppercase font-black mr-[-1.2em]"
                    >
                      Jahronimo
                    </motion.p>
                    <div className="flex flex-nowrap justify-center text-2xl sm:text-3xl md:text-5xl tracking-[0.1em] font-medium uppercase m-0 text-white/80">
                      {["f", "o", "r", " ", "s", "i", "z", "e", "a", "b", "l", "e", " ", "d", "o", "n", "a", "t", "i", "o", "n", "s"].map((letter, index) => (
                        <motion.span
                          key={index}
                          custom={index}
                          variants={letterVariants}
                          initial="hidden"
                          animate="visible"
                          style={{
                            animation: "letter-glow 4s ease-in-out infinite",
                            animationDelay: `${index * 0.05}s`
                          }}
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

                  {/* Main Offer Title */}
                  <div className="flex flex-col items-center gap-8">
                    <motion.h2
                      variants={itemVariants}
                      className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase m-0"
                    >
                      1 of 1&apos;s
                    </motion.h2>
                    <motion.h1
                      variants={itemVariants}
                      className="text-7xl sm:text-8xl md:text-[12rem] font-black tracking-tighter leading-none text-transparent bg-clip-text m-0
                        bg-[linear-gradient(110deg,#d4af37_0%,#fff3a6_30%,#c5a059_50%,#fceea7_70%,#b8860b_100%)]
                        bg-[length:200%_100%] animate-[shine:6s_linear_infinite]"
                    >
                      £50,000
                    </motion.h1>
                  </div>

                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

                  {/* Strategy & Footer */}
                  <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 w-full text-center mt-6">
                    <div className="relative">
                      <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-[-0.08em] leading-none m-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        no saying
                      </h2>
                      <div className="mt-2 flex items-center justify-center">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]/30" />
                        <p className="px-6 text-[#d4af37] tracking-[0.6em] text-xl md:text-3xl font-black uppercase">
                          I MAKE
                        </p>
                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]/30" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4 flex items-center gap-3">
                    <div className="w-4 h-[1px] bg-[#d4af37]/30" />
                    <motion.span
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.05, 1],
                        textShadow: [
                          "0 0 0px rgba(214, 175, 55, 0)",
                          "0 0 20px rgba(214, 175, 55, 0.6)",
                          "0 0 0px rgba(214, 175, 55, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-[#d4af37] tracking-[0.5em] text-xs uppercase font-bold mr-[-0.5em]"
                    >
                      press to enter
                    </motion.span>
                    <div className="w-4 h-[1px] bg-[#d4af37]/30" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* ── Form Card ────────────────────────────────────── */
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-xl mx-auto bg-black/70 backdrop-blur-2xl p-10 md:p-16 flex flex-col items-center shadow-[0_0_40px_rgba(212,175,55,0.07),0_0_0_1px_rgba(212,175,55,0.15)] overflow-hidden"
            >
              {/* Hardware-accelerated glow pulse */}
              <div className="absolute inset-0 pointer-events-none shadow-[0_0_80px_rgba(212,175,55,0.18),0_0_0_1px_rgba(212,175,55,0.30)]" style={{ animation: "pulsate-opacity 7s ease-in-out infinite" }} />
              {/* Shimmer sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent animate-[shimmer_7s_ease-in-out_infinite] skew-x-12" />
              </div>
              {/* Corner brackets */}
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-10 h-10 ${cls} border-[#d4af37]/30`} />
              ))}

              {/* Header */}
              <div className="w-full text-center mb-12">
                <h2 className="text-xl md:text-3xl tracking-[0.25em] font-black uppercase mb-3 mr-[-0.25em] text-transparent bg-clip-text bg-[linear-gradient(110deg,#d4af37_0%,#fff3a6_30%,#c5a059_50%,#fceea7_70%,#b8860b_100%)] bg-[length:200%_100%] animate-[shine_6s_linear_infinite] leading-tight">
                  THE PROJECT <br /> ACCESS
                </h2>
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto mb-3" />
                <div className="flex flex-col items-center gap-1 text-sm tracking-[0.4em] font-black uppercase text-[#d4af37]/80 mr-[-0.4em]">
                  <span>FILL ME IN</span>
                </div>
              </div>

              <form className="flex flex-col gap-8 w-full" encType="multipart/form-data">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New £50k Project Inquiry - jahronimo" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_autoresponder" value={`
THANK YOU

WAIT
NO SAYING I MAKE

Your inquiry has been received. 

Jahronimo
07538068550
jahronimo1@hotmail.com
                `.trim()} />
                {/* Requesting a copy to the user email provided in form */}
                <input type="hidden" name="_cc" value="anextvid@gmail.com" />
                <input type="hidden" name="_replyto" value="anextvid@gmail.com" />

                {/* Required fields */}
                {[
                  { name: "name", placeholder: "Your Name", type: "text", required: true },
                  { name: "email", placeholder: "Email Address", type: "email", required: true },
                  { name: "location", placeholder: "Where you're from", type: "text", required: true },
                  { name: "contact", placeholder: "How best to find you?", type: "text", required: true },
                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder.toUpperCase()}
                      required={field.required}
                      onFocus={playKeystroke}
                      onChange={(e) => {
                        if (e.target.value.length % 5 === 0) playKeystroke();
                      }}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg md:text-2xl text-white tracking-widest outline-none transition-all placeholder:text-white/12 font-light"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#d4af37] to-[#fff3a6] group-focus-within:w-full transition-all duration-700" />
                  </div>
                ))}

                {/* Expandable optional fields */}
                <div className="flex flex-col w-full mt-2 border-t border-white/8">
                  <ExpandableField name="your_type" label="Your Type" fields={["What's your type?", "Big or small?", "Pick a colour"]} />
                  <ExpandableField name="personal_life" label="Personal Life" fields={["Who are you?", "Personal Ambition", "Lifestyle Focus", "Values & Beliefs", "Current Challenges"]} />
                  <ExpandableField name="business_life" label="Business Life" fields={["What you do", "Why?", "Current Project", "Business Goal", "Vision"]} />
                  <ExpandableField name="social_links" label="Socials & Links" fields={["Primary Link", "Secondary Link", "Portfolio", "Recent Work", "Reference Link"]} />
                  <ExpandableField name="reference" label="Reference Points" fields={["How you found me?", "What else you want to say.", "Other"]} />
                  <ExpandableFileField name="photos" label="Attach Photos" description="Up to 5 photos. Anything you want to share." />
                </div>

                {/* Payment CTA */}
                <a
                  href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
                  onClick={handleSubmit}
                  className={`mt-8 group relative py-6 border border-[#d4af37]/30 bg-transparent text-white tracking-[0.45em] uppercase font-light text-sm hover:border-[#d4af37] transition-all duration-700 w-full flex justify-center items-center text-center overflow-hidden active:scale-[0.98] active:brightness-90 origin-center ${isSubmitting ? "opacity-30 pointer-events-none" : ""}`}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-0 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] skew-x-12" />
                  </div>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500 mr-[-0.45em] w-full text-center">
                    {isSubmitting ? "Processing & Redirecting..." : "Complete Payment"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#fff3a6] to-[#b8860b] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                </a>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
