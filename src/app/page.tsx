"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SENSORY FEEDBACK SYSTEM ---
const useSensoryFeedback = () => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext only on client
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// Fixed diamond sparkle positions
const SPARKLE_POSITIONS = [
  { top: 8, left: 11, size: 18, dur: 3.5, delay: 0 },
  { top: 55, left: 91, size: 12, dur: 4.5, delay: 1.3 },
  { top: 82, left: 22, size: 16, dur: 5, delay: 0.7 },
  { top: 18, left: 78, size: 10, dur: 4, delay: 2.5 },
  { top: 65, left: 48, size: 20, dur: 6, delay: 1.8 },
  { top: 35, left: 4, size: 14, dur: 4.8, delay: 3.2 },
  { top: 92, left: 58, size: 11, dur: 3.8, delay: 0.4 },
];

// Four-point diamond sparkle — 2 crossed rays + radial glow core
const DiamondSparkle = ({
  size = 16,
  delay = 0,
  dur = 4,
  style = {} as React.CSSProperties,
}: {
  size?: number;
  delay?: number;
  dur?: number;
  style?: React.CSSProperties;
}) => (
  <div
    className="pointer-events-none absolute"
    style={{
      width: size,
      height: size,
      animation: `sparkle ${dur}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      ...style,
    }}
  >
    {/* Vertical ray */}
    <div className="absolute" style={{ left: '50%', top: 0, bottom: 0, width: 1, transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)' }} />
    {/* Horizontal ray */}
    <div className="absolute" style={{ top: '50%', left: 0, right: 0, height: 1, transform: 'translateY(-50%)', background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)' }} />
    {/* Diagonal ray 1 */}
    <div className="absolute" style={{ top: '50%', left: '50%', width: size * 0.6, height: 1, transformOrigin: 'left center', transform: 'translateY(-50%) translateX(-50%) rotate(45deg)', background: 'linear-gradient(to right, transparent 0%, rgba(252,246,186,0.6) 50%, transparent 100%)' }} />
    {/* Diagonal ray 2 */}
    <div className="absolute" style={{ top: '50%', left: '50%', width: size * 0.6, height: 1, transformOrigin: 'left center', transform: 'translateY(-50%) translateX(-50%) rotate(-45deg)', background: 'linear-gradient(to right, transparent 0%, rgba(252,246,186,0.6) 50%, transparent 100%)' }} />
    {/* Glow core */}
    <div className="absolute rounded-full" style={{ top: '50%', left: '50%', width: size * 0.45, height: size * 0.45, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(252,246,186,0.85) 40%, transparent 80%)' }} />
  </div>
);

const ExpandableField = ({ name, label, fields, onTick, onKeystroke }: { name: string; label: string; fields?: string[]; onTick: () => void; onKeystroke: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-[#d4af37]/15">
      <button
        type="button"
        onClick={() => { onTick(); setExpanded(!expanded); }}
        className="w-full py-5 flex justify-between items-center uppercase tracking-[0.15em] text-sm md:text-base outline-none transition-all hover:text-[#d4af37] font-light active:scale-[0.99] active:brightness-90 origin-center"
      >
        <span className={`transition-colors duration-300 ${expanded ? "text-[#d4af37]" : "text-white/95"}`}>{label}</span>
        <span className={`text-xl font-thin transition-all duration-300 ${expanded ? "text-[#d4af37] rotate-45" : "text-[#d4af37]/60"}`}>+</span>
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
                      onFocus={onKeystroke}
                      onChange={(e) => {
                        if (e.target.value.length % 5 === 0) onKeystroke();
                      }}
                      className="w-full bg-transparent border-b border-white/30 py-4 text-white tracking-wider outline-none focus:border-[#d4af37]/70 transition-all placeholder:text-white/60 font-light text-base resize-none"
                    />
                  );
                })
              ) : (
                <textarea
                  name={name}
                  placeholder="Write here..."
                  rows={3}
                  onFocus={onKeystroke}
                  onChange={(e) => {
                    if (e.target.value.length % 5 === 0) onKeystroke();
                  }}
                  className="w-full bg-transparent py-4 text-white tracking-wide outline-none placeholder:text-white/35 font-light text-base resize-none border-b border-white/8 focus:border-[#d4af37]/50 transition-all"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExpandableSection = ({ label, children, onTick, defaultOpen = false }: { label: string; children: React.ReactNode; onTick: () => void; defaultOpen?: boolean }) => {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <div className="border-b border-[#d4af37]/15">
      <button
        type="button"
        onClick={() => { onTick(); setExpanded(!expanded); }}
        className="w-full py-5 flex justify-between items-center uppercase tracking-[0.15em] text-sm md:text-base outline-none transition-all hover:text-[#d4af37] font-light active:scale-[0.99] active:brightness-90 origin-center"
      >
        <span className={`transition-colors duration-300 ${expanded ? "text-[#d4af37]" : "text-white/95"}`}>{label}</span>
        <span className={`text-xl font-thin transition-all duration-300 ${expanded ? "text-[#d4af37] rotate-45" : "text-[#d4af37]/60"}`}>+</span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6 pb-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExpandableFileField = ({ name, label, description, onTick }: { name: string; label: string; description: string; onTick: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-[#d4af37]/15">
      <button
        type="button"
        onClick={() => { onTick(); setExpanded(!expanded); }}
        className="w-full py-5 flex justify-between items-center uppercase tracking-[0.15em] text-sm md:text-base outline-none transition-all hover:text-[#d4af37] font-light active:scale-[0.99] active:brightness-90 origin-center"
      >
        <span className={`transition-colors duration-300 ${expanded ? "text-[#d4af37]" : "text-white/95"}`}>{label}</span>
        <span className={`text-xl font-thin transition-all duration-300 ${expanded ? "text-[#d4af37] rotate-45" : "text-[#d4af37]/60"}`}>+</span>
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

const SHUFFLE_ICONS = [
  <svg key="obj1" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>, // Heart
  <svg key="obj2" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>, // Bolt
  <svg key="obj3" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 1L3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4z" /></svg>, // Shield
  <svg key="obj4" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M21 16.5l-8-5V3.5c0-.8-.7-1.5-1.5-1.5S10 2.7 10 3.5V11l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L11 19v-5.5l8 2.5v-2z" /></svg>, // Plane
  <svg key="obj5" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M20 18H4l-2-5h20l-2 5zM12 4v11m-3-1l3-1 3 1V4H9v10z" /></svg>, // Boat
  <svg key="obj6" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M11 20l1-5h-3l-1 5h3zm2-5l1-5h-3l-1 5h3zm2-5l1-5H13L12 10zM12 2L8 10h8L12 2z" /></svg>, // Tree
  <svg key="obj7" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>, // Star 5
  <svg key="obj8" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2L8 12h3v4H8l4 6 4-6h-3v-4h3L12 2z" /></svg>, // Pine Tree
  <svg key="obj9" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2z" /></svg>, // Rocket
  <svg key="obj10" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M18 2H6v2H2v7c0 2.21 1.79 4 4 4h2c.4 1.63 1.51 3.01 3 3.7V20H9v2h6v-2h-2v-1.3c1.49-.69 2.6-2.07 3-3.7h2c2.21 0 4-1.79 4-4V4h-4V2z" /></svg>, // Trophy
  <svg key="obj11" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>, // Cloud
  <svg key="obj12" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg>, // Starburst 8
  <svg key="obj13" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M21 7l-3.3 2.5a5.5 5.5 0 0 0-10.4 0L4 7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2l1 3h10l1-3h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" /></svg>, // Shark
  <svg key="obj14" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.4 6.4 9 1.7 4.3C.6 6.7 1 9.7 3 11.7c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.4-.4.4-1.1 0-1.5z" /></svg>, // Wrench
  <svg key="obj15" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>, // Key
  <svg key="obj16" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M5 16l3-8 4 5 4-5 3 8H5zm14 2H5v2h14v-2z" /></svg>, // Crown
  <svg key="obj17" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M7 15h3c0 1.1-.9 2-2 2s-2-.9-2-2zm12-3c0 1.1-.9 2-2 2s-2-.9-2-2V3h4v9zm-10 1V3h4v11h-4zm-2-1V3h4v10H7z" /></svg>, // Anchor
  <svg key="obj18" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12.45 4L11 3H4v18h2v-7h5l1.45 1H20V4z" /></svg>, // Flag
  <svg key="obj19" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2L3.5 10l8.5 12 8.5-12L12 2z" /></svg>, // Diamond
  <svg key="obj20" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>, // Bell
  <svg key="obj21" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2a9 9 0 0 0-9 9v7.5a2.5 2.5 0 0 0 5 0V11a4 4 0 0 1 8 0v7.5a2.5 2.5 0 0 0 5 0V11a9 9 0 0 0-9-9z" /></svg>, // Ghost
  <svg key="obj22" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2c-3.3 0-6 2.7-6 6v2l-3-1v2l3 2v2l-4 4v2h2l4-4h2v4h2v-4h2l4 4h2v-2l-4-4v-2l3-2v-2l-3 1V8c0-3.3-2.7-6-6-6z" /></svg>, // Alien
  <svg key="obj23" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 21c-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8 1.1 0 2.1.2 3 .6-2.5 1.5-4 4.3-4 7.4 0 3.1 1.5 5.9 4 7.4-.9.4-1.9.6-3 .6z" /></svg>, // Moon
  <svg key="obj24" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /></svg>, // Picture Frame
  <svg key="obj25" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" /></svg>, // Camera
  <svg key="obj26" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3z" /></svg>, // Mug
  <svg key="obj27" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2c4.32 0 7.94 3.01 8.82 7H13v11c0 1.1.9 2 2 2h2v2h-2c-2.21 0-4-1.79-4-4V9H3.18C4.06 5.01 7.68 2 12 2z" /></svg>, // Umbrella
  <svg key="obj28" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M6 15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1s-1 .4-1 1v10c0 .6.4 1 1 1z M12 2h-1v16h1v-16z M18 10h-1v11h1v-11z" /></svg>, // Abstract Bars
  <svg key="obj29" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM17 7H7v10h10V7zm-2 8H9V9h6v6z" /></svg>, // Nested Square Frame
  <svg key="obj30" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M7 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1z M17 12l1 2 2 1-2 1-1 2-1-2-2-1 2-1z M12 7l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" /></svg>, // Star Cluster
  <svg key="obj31" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>, // Music Note
  <svg key="obj32" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2l2.4 7.2h7.6l-6.2 4.4 2.4 7.2-6.2-4.4-6.2 4.4 2.4-7.2-6.2-4.4h7.6z" /></svg>, // Sharp 5-point Star
  <svg key="obj33" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M22 17h-2V7h2v10zM18 17h-2V7h2v10zM14 17h-2V7h2v10zM10 17H8V7h2v10zM6 17H4V7h2v10zM2 17H0V7h2v10z" /></svg>, // Barcode Style
  <svg key="obj34" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>, // Info Circle
  <svg key="obj35" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-.9.18-1.75.48-2.54l-2.6-1.53C2.32 9.17 2 10.55 2 12c0 5.18 3.95 9.45 9 9.95v-3.03c-3.39-.49-6-3.39-6-6.92z" /></svg>, // Tech Brackets
  <svg key="obj36" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M21 15.01L18 12c.6-.6 1-1.45 1-2.39 0-1.92-1.55-3.47-3.47-3.47w.01c-.94 0-1.79.4-2.39 1l-3-3.01L11 3.27l9 9.03-9 9.03.86.84 3-3.01c.6.6 1.45 1 2.39 1 1.92 0 3.47-1.55 3.47-3.47 0-.94-.4-1.79-1-2.39L21 15.01z" /></svg>, // Scissors
  <svg key="obj37" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" /></svg>, // Lightbulb
  <svg key="obj38" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 2l4 4-4 4-4-4 4-4zm0 14l4 4-4 4-4-4 4-4zm10-10l-4 4 4 4 4-4-4-4zM2 6l4 4-4 4-4-4 4-4z" /></svg>, // Diamond Cluster
  <svg key="obj39" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M4 6h16v12H4V6zm2 2v8h12V8H6zm3 2h6v4H9v-4z" /></svg>, // Polaroid Style Frame
  <svg key="obj40" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 0L14.5 9.5H24L16.5 15.5L19 25L12 19L5 25L7.5 15.5L0 9.5H9.5L12 0Z" /></svg>, // Grand Star
];

const SpeedShuffler = () => {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [showBorder, setShowBorder] = useState(true);
  const [glitchScale, setGlitchScale] = useState(1);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [glitchRotate, setGlitchRotate] = useState(0);
  const [glitchSpeed, setGlitchSpeed] = useState(60);

  // Massive variety of silhouette-style containers
  const containerShapes = [
    "rounded-xl", "rounded-none", "rounded-full",
    "rounded-tr-[4rem]", "rounded-bl-[4rem]",
    "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
    "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
    "rounded-[100%_0_100%_0]", "rounded-[0_100%_0_100%]",
    "rounded-[10%_90%_10%_90%/90%_10%_90%_10%]",
    "rounded-[50%_0_50%_0]", "rounded-[0_50%_0_50%]",
    "rounded-[30%_30%_100%_30%]", "rounded-[100%_30%_30%_30%]",
    "rounded-b-[60px] rounded-t-[5px]", "rounded-t-[60px] rounded-b-[5px]",
    "rounded-[100%_0_0_0]", "rounded-[0_100%_0_0]", "rounded-[0_0_100%_0]", "rounded-[0_0_0_100%]",
    "rounded-[70%_30%_30%_70%/50%_50%_50%_50%]",
    "rounded-[20px_0_20px_0]", "rounded-[0_20px_0_20px]",
    "rounded-[60%_40%_30%_70%/100%_20%_80%_0]", "rounded-[0_80%_20%_100%/70%_30%_40%_60%]",
    "rounded-[15%_85%_15%_85%/85%_15%_85%_15%]", // Extreme Ornate
  ];

  const rotations = [0, 45, 90, 135, 180, 225, 270, 315];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const shuffle = () => {
      setIndex1(prev => (prev + 1) % SHUFFLE_ICONS.length);
      
      // Moderate Size Pulse (0.9 to 1.1)
      const nextScale = 0.9 + Math.random() * 0.2;
      setGlitchScale(nextScale);
      
      // Subtle Jitter
      setGlitchOffset({ 
        x: (Math.random() - 0.5) * 8, 
        y: (Math.random() - 0.5) * 8 
      });

      // Rotation Glitch
      setGlitchRotate((Math.random() - 0.5) * 12);

      // Versatile Variable Speed (wider organic rhythm)
      const nextSpeed = 60 + Math.random() * 120;
      setGlitchSpeed(nextSpeed);
      
      timeoutId = setTimeout(shuffle, nextSpeed);
    };

    shuffle();
    const timer2 = setInterval(() => setIndex2(prev => (prev + 1) % SHUFFLE_ICONS.length), 110);
    const timer3 = setInterval(() => setIndex3(prev => (prev + 1) % SHUFFLE_ICONS.length), 180);
    const borderTimer = setInterval(() => setShowBorder(Math.random() > 0.35), 200);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timer2);
      clearInterval(timer3);
      clearInterval(borderTimer);
    };
  }, []);

  const rotation = rotations[index1 % rotations.length];
  const shapeIdx = index1 % containerShapes.length;

  return (
    <div className="flex justify-center mb-10 relative z-20 scale-110 sm:scale-125 py-2">
      <div 
        className="relative w-20 h-20 transition-all duration-[40ms] ease-out"
        style={{ 
          transform: `scale(${glitchScale}) translate(${glitchOffset.x}px, ${glitchOffset.y}px) rotate(${glitchRotate}deg)` 
        }}
      >
        {/* Deep Glow backdrop */}
        <div 
          className="absolute inset-[-40%] bg-[#d4af37]/30 blur-3xl animate-pulse z-0" 
          // eslint-disable-next-line react-hooks/purity
          style={{ opacity: 0.2 + (Math.random() * 0.4) }}
        />
        
        {/* Layer 2: Ghostly Background Icon (Borderless, slower) */}
        <div className="absolute inset-0 flex items-center justify-center text-[#d4af37]/15 scale-150 rotate-12 blur-[1px]">
          {SHUFFLE_ICONS[index2]}
        </div>

        {/* Layer 3: Rapid Fragment Layer (Offset, flickering) */}
        <div className="absolute inset-0 flex items-center justify-center text-[#d4af37]/10 -translate-y-2 -translate-x-1 scale-90">
          {SHUFFLE_ICONS[index3]}
        </div>

        {/* Main Morphing Container */}
        <div
          className={`relative w-full h-full flex items-center justify-center bg-black/90 p-4 shadow-[0_0_50px_rgba(212,175,55,0.3)] overflow-hidden transition-all duration-100 ${containerShapes[shapeIdx]} ${showBorder ? 'border-[1.5px] border-[#d4af37]' : 'border-transparent'}`}
          style={{ 
            animation: 'flicker 0.1s infinite',
            transform: `rotate(${rotation}deg)`
          }}
        >
          {/* Dual Scanning lines */}
          <div className="absolute inset-0 w-full h-[1.5px] bg-[#d4af37]/60 animate-[scan_1.5s_linear_infinite]" style={{ top: '50%' }} />
          <div className="absolute inset-0 w-full h-[1px] bg-[#d4af37]/30 animate-[scan_2s_linear_infinite_reverse]" style={{ top: '50%' }} />

          {/* Data Overlay */}
          <div className="absolute top-1 left-2 text-[6px] font-mono text-[#d4af37]/60 leading-none">
            {/* eslint-disable-next-line react-hooks/purity */}
            {Math.random() > 0.5 ? "ERROR_A7" : `0x${Math.floor(glitchSpeed)}`}
          </div>
          <div className="absolute bottom-1 right-2 text-[6px] font-mono text-[#d4af37]/60 leading-none">
             REF:{Math.floor(glitchScale * 100)}%
          </div>

          <div 
            className="w-full h-full text-[#d4af37] drop-shadow-[2px_0_0_rgba(255,0,0,0.3)] drop-shadow-[-2px_0_0_rgba(0,255,255,0.3)] filter contrast-125"
            style={{ 
              transform: `rotate(${-rotation}deg) scale(${1.2 - glitchScale * 0.2})`, // Inverse scaling for secondary effect
              filter: `drop-shadow(0 0 ${10 * glitchScale}px rgba(212,175,55,0.8))`
            }}
          >
            {SHUFFLE_ICONS[index1]}
          </div>

          {/* Corner markers (flicker with border) */}
          {showBorder && (
            <>
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#d4af37]/80" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#d4af37]/80" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#d4af37]/80" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#d4af37]/80" />
            </>
          )}

          {/* Status Indicator */}
          <div className="absolute inset-x-0 bottom-[-20%] flex justify-center pointer-events-none">
            <span className="text-[8px] tracking-[0.4em] font-black text-[#d4af37] animate-[flicker_0.5s_infinite]">
               STATUS: READY_
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryAccordion = ({ sections }: { sections: { title: string; content: React.ReactNode }[] }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openIdx !== null && containerRef.current) {
      const activeItem = containerRef.current.children[openIdx] as HTMLElement;
      if (activeItem) {
        const timer = setTimeout(() => {
          const offset = 100;
          const elementPosition = activeItem.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 150); // Slight delay to allow animation to start
        return () => clearTimeout(timer);
      }
    }
  }, [openIdx]);

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto pb-10">
      {sections.map((section, i) => (
        <div key={i} className="border-b border-[#d4af37]/15">
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full py-4 flex justify-between items-center text-left outline-none group"
          >
            <span className={`text-sm uppercase tracking-[0.35em] font-bold transition-colors duration-200 ${openIdx === i ? "text-[#d4af37]" : "text-white/70 group-hover:text-white"}`}>
              {section.title}
            </span>
            <span className={`text-lg font-thin transition-all duration-300 flex-shrink-0 ml-4 ${openIdx === i ? "text-[#d4af37] rotate-45" : "text-[#d4af37]/35"}`}>+</span>
          </button>
          {openIdx === i && (
            <div className="pb-6 pr-2">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const IS_SITE_LOCKED = false;

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showOfferDetails, setShowOfferDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const { playSuccessSweep, playTick, playKeystroke, playError, playOpeningSting } = useSensoryFeedback();
  const detailsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Play opening sting on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      playOpeningSting();
    }, 200);
    return () => clearTimeout(timer);
  }, [playOpeningSting]);

  // Scroll to top whenever form is opened
  useEffect(() => {
    if (showForm) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showForm]);

  // Scroll to gallery when opened
  useEffect(() => {
    if (showGallery && galleryRef.current) {
      const timer = setTimeout(() => {
        const element = galleryRef.current;
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showGallery]);

  // Scroll to offer details when expanded
  useEffect(() => {
    if (showOfferDetails && detailsRef.current) {
      // We use a slightly longer delay to ensure the DOM has updated and the animation has started
      const timer = setTimeout(() => {
        const element = detailsRef.current;
        if (element) {
          // Calculate precise position for mobile browsers
          const offset = 100; // Increased offset for better framing
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showOfferDetails]);

  const handleSubmit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFormError(null);
    const form = e.currentTarget.closest("form");
    const targetUrl = e.currentTarget.getAttribute("href");
    if (form && targetUrl) {
      // Manually check required contact fields so we can show a clear message
      const data = new FormData(form);
      const missing: string[] = [];
      if (!String(data.get("name") ?? "").trim()) missing.push("Name");
      if (!String(data.get("email") ?? "").trim()) missing.push("Email");
      if (!String(data.get("location") ?? "").trim()) missing.push("Where you're from");
      if (!String(data.get("contact") ?? "").trim()) missing.push("Best way to reach you");

      if (missing.length > 0) {
        playError();
        setFormError(`Please fill in: ${missing.join(" · ")}`);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
      }

      playSuccessSweep();
      setIsSubmitting(true);
      const formData = new FormData(form);
      try {
        await fetch("https://formsubmit.co/ajax/jahronimo1@hotmail.com", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        window.location.href = targetUrl;
      } catch {
        // Still redirect to payment even if email fails — reset submitting state on hard failure
        setIsSubmitting(false);
        window.location.href = targetUrl;
      }
    }
  };

  if (IS_SITE_LOCKED) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-[#d4af37] selection:text-black">
        {/* Subtle background noise/grid effect */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group max-w-md w-full"
        >
           {/* Outer glow aura */}
           <div className="absolute inset-[-20px] bg-[#d4af37]/5 blur-[60px] rounded-full" />
           
           <div className="relative bg-black/80 border border-[#d4af37]/20 p-12 backdrop-blur-xl shadow-[0_0_100px_rgba(0,0,0,1)]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#d4af37]/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#d4af37]/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d4af37]/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4af37]/40" />

              <div className="mb-10 flex justify-center">
                 <div className="relative w-24 h-[1px] bg-[#d4af37]/10">
                    <motion.div 
                      animate={{ x: [-48, 48] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-1/2 w-8 h-full bg-[#d4af37]/60" 
                    />
                 </div>
              </div>
              
              <h1 className="text-[#d4af37] text-2xl font-black tracking-[0.3em] mb-2 uppercase leading-none">
                System Locked
              </h1>
              
              <div className="flex items-center justify-center gap-3 my-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/20" />
              </div>
              
              <p className="text-[#d4af37]/50 text-xs tracking-[0.4em] uppercase font-light">
                Locked for now.
              </p>
              
              <div className="mt-16 pt-8 border-t border-[#d4af37]/5">
                <div className="text-[7px] text-[#d4af37]/30 uppercase tracking-[0.5em] leading-relaxed">
                  Terminal ID: ALPHA-9 // STATUS: STANDBY<br/>
                  JAHRONIMO_CORE_ENCRYPTION_ACTIVE
                </div>
              </div>
           </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="block relative min-h-screen w-full bg-[#020202] text-white font-sans overflow-x-hidden">

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
          15%, 25% { color: #ffffff; text-shadow: 0 0 20px rgba(212,175,55,1), 0 0 8px rgba(255,255,255,0.7); }
          40%, 90% { color: rgba(212,175,55,0.6); text-shadow: none; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          45%, 55% { opacity: 1; transform: scale(1) rotate(45deg); }
        }
        @keyframes sparkle-slow {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          40%, 60% { opacity: 0.85; transform: scale(1) rotate(45deg); }
        }
        @keyframes gold-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(212,175,55,0.12), 0 0 0 1px rgba(212,175,55,0.18); }
          50%       { box-shadow: 0 0 80px rgba(212,175,55,0.28), 0 0 0 1px rgba(212,175,55,0.45); }
        }
        @keyframes diamond-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes diamond-glint {
          0%, 85%, 100% { opacity: 0; transform: scaleX(0); }
          90%, 95%      { opacity: 1; transform: scaleX(1); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50%      { opacity: 0.8; filter: brightness(1.3); }
        }
        @keyframes scan {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(120%); }
        }
        @keyframes glow-pulse-gold {
          0%, 100% { filter: drop-shadow(0 0 5px #d4af37) brightness(1); }
          50%      { filter: drop-shadow(0 0 15px #d4af37) brightness(1.2); }
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
        {/* Ambient gold orbs — richer and more premium */}
        <div className="absolute top-[-25%] left-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(185,148,60,0.14)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(185,148,60,0.14)_0%,transparent_70%)]" />
        <div className="absolute top-[35%] left-[35%] w-[30%] h-[30%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.09)_0%,transparent_70%)]" />
        {/* Secondary orbs for depth */}
        <div className="absolute top-[60%] left-[-5%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(170,119,28,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-[-10%] right-[10%] w-[35%] h-[35%] bg-[radial-gradient(circle_at_center,rgba(252,246,186,0.05)_0%,transparent_70%)]" />
        {/* Fixed gold dust particles */}
        {DUST_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              willChange: "transform, opacity",
              animation: `float ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              background: 'radial-gradient(circle, rgba(252,246,186,0.7) 0%, rgba(185,148,60,0.35) 60%, transparent 100%)',
            }}
          />
        ))}
        {/* Diamond sparkles in background */}
        {SPARKLE_POSITIONS.map((s, i) => (
          <DiamondSparkle
            key={i}
            size={s.size}
            dur={s.dur}
            delay={s.delay}
            style={{ top: `${s.top}%`, left: `${s.left}%` }}
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


              {/* Donation Card (Enhanced Visibility) */}
              <motion.a
                href="https://gofund.me/1b96ee5b4"
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

              {/* ── Expand Info Button ─────── */}
              <motion.button
                variants={itemVariants}
                onClick={() => { playTick(); setShowGallery(true); }}
                className="relative w-full flex items-center justify-center gap-4 px-8 py-5 text-[#d4af37] tracking-[0.4em] text-sm uppercase font-bold transition-all duration-300 group"
                style={{
                  border: "1px solid rgba(212,175,55,0.7)",
                  background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.2) 50%, rgba(212,175,55,0.08) 100%)",
                  boxShadow: "0 0 24px rgba(212,175,55,0.18), inset 0 0 0 1px rgba(212,175,55,0.1)"
                }}
              >
                <span className="w-8 h-[1px] bg-[#d4af37]/60 transition-all" />
                expand info
                <span className="w-8 h-[1px] bg-[#d4af37]/60 transition-all" />
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="relative w-full bg-[linear-gradient(135deg,rgba(0,0,0,0.85)_0%,rgba(212,175,55,0.07)_50%,rgba(0,0,0,0.85)_100%)] backdrop-blur-2xl flex flex-col items-center justify-center py-12 px-10 sm:px-16 cursor-pointer group animate-card-entrance overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.12),0_0_0_1px_rgba(212,175,55,0.25)] active:brightness-95 hover:shadow-[0_0_80px_rgba(212,175,55,0.2)] origin-center transition-all duration-300"
                onClick={() => { playTick(); setShowOfferDetails(!showOfferDetails); }}
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
                  <div className="flex flex-col items-center gap-3 w-full px-2">
                    <motion.p
                      variants={itemVariants}
                      className="text-[#d4af37] tracking-[0.8em] sm:tracking-[1em] text-[clamp(1rem,4vw,2rem)] uppercase font-black mr-[-0.8em] sm:mr-[-1em]"
                    >
                      Jahronimo
                    </motion.p>
                    <motion.p
                      variants={itemVariants}
                      className="text-white/70 tracking-[0.15em] text-[clamp(0.8rem,3vw,1.4rem)] uppercase font-semibold whitespace-nowrap"
                    >
                      1 of 1 art project
                    </motion.p>
                    <div className="w-full text-center overflow-hidden">
                      <div className="inline-flex justify-center text-[clamp(0.85rem,4vw,3rem)] tracking-[0.1em] font-semibold uppercase m-0 text-white/90 whitespace-nowrap">
                        {["s", "u", "p", "p", "o", "r", "t", " ", "c", "o", "m", "m", "i", "s", "s", "i", "o", "n", "s"].map((letter, index) => (
                          <motion.span
                            key={index}
                            custom={index}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex-shrink-0"
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
                  </div>

                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

                  {/* Main Offer Title */}
                  <div className="flex flex-col items-center gap-4 px-4">
                    <div className="relative inline-block">
                      {/* Diamond sparkles around the amount */}
                      <DiamondSparkle size={22} dur={3.2} delay={0} style={{ top: '-18px', left: '-12px' }} />
                      <DiamondSparkle size={14} dur={4.1} delay={1.6} style={{ top: '-10px', right: '-8px' }} />
                      <DiamondSparkle size={18} dur={5} delay={0.9} style={{ bottom: '-14px', left: '15%' }} />
                      <DiamondSparkle size={12} dur={3.8} delay={2.4} style={{ bottom: '-8px', right: '12%' }} />
                      <motion.h1
                        variants={itemVariants}
                        className="text-[clamp(3.5rem,14vw,9.5rem)] font-black tracking-tighter leading-none text-transparent bg-clip-text m-0 whitespace-nowrap
                          bg-[linear-gradient(110deg,#AA771C_0%,#FCF6BA_18%,#B38728_35%,#FFF9DC_52%,#C9A84C_65%,#FCF6BA_80%,#8B6914_100%)]
                          bg-[length:300%_100%] animate-[shine_4s_linear_infinite]"
                      >
                        £50,000
                      </motion.h1>
                    </div>
                  </div>

                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

                  {/* Strategy & Footer */}
                  <motion.div variants={itemVariants} className="flex flex-col items-center gap-5 w-full text-center mt-4 px-2">
                    <div className="relative w-full flex flex-col items-center gap-4">
                      <h2 className="text-[clamp(2.5rem,11vw,7.5rem)] font-black text-white uppercase tracking-[-0.08em] leading-none m-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap">
                        no saying
                      </h2>
                      <div className="flex items-center justify-center w-full max-w-lg">
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#d4af37]/30" />
                        <p className="px-2 sm:px-4 text-[#d4af37] tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] text-[clamp(1.8rem,7vw,5rem)] font-black uppercase whitespace-nowrap overflow-visible">
                          I MAKE.
                        </p>
                        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#d4af37]/30" />
                      </div>
                      <motion.div variants={itemVariants} className="relative flex flex-col items-center">
                        {/* Diamond shimmer text */}
                        <span
                          className="text-transparent bg-clip-text tracking-[0.25em] text-[clamp(1.2rem,5vw,3.5rem)] uppercase font-black whitespace-nowrap select-none"
                          style={{
                            backgroundImage: [
                              "linear-gradient(105deg,",
                              "#6B6B6B 0%,",
                              "#C8C8C8 15%,",
                              "#F0F0F0 22%,",
                              "#ffffff 28%,",
                              "rgba(255,255,255,0.95) 32%,",
                              "#E8E0FF 36%,",     /* blue-white facet */
                              "#fff 40%,",
                              "#FCF6BA 45%,",     /* gold flash */
                              "#fff 50%,",
                              "#D0D8FF 55%,",     /* lavender facet */
                              "#B0B0B0 65%,",
                              "#E8E8E8 78%,",
                              "#fff 84%,",
                              "#888 90%,",
                              "#C8C8C8 100%",
                              ")",
                            ].join(""),
                            backgroundSize: "400% 100%",
                            animation: "diamond-shimmer 4s linear infinite",
                          }}
                        >
                          unique 1 of 1&apos;s
                        </span>
                        {/* Glint line that flashes beneath */}
                        <div
                          className="mt-1 h-[1px] w-full"
                          style={{
                            backgroundImage: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(252,246,186,0.9) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)",
                            animation: "diamond-glint 4s ease-in-out infinite",
                          }}
                        />
                      </motion.div>
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
                      {showOfferDetails ? "press to hide" : "press to expand"}
                    </motion.span>
                    <div className="w-4 h-[1px] bg-[#d4af37]/30" />
                  </motion.div>

                  <AnimatePresence>
                    {showOfferDetails && (
                      <motion.div
                        ref={detailsRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full mt-10 overflow-hidden scroll-mt-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col items-center gap-6 py-8 border-t border-[#d4af37]/20">
                          <div className="flex flex-col gap-3 text-white/90 text-sm md:text-base font-normal leading-relaxed tracking-wide text-center">
                            <p>I&apos;m offering type of art commissions.</p>
                            <p>Something unique. Non-replicable. Secret. Specific.</p>
                            <p>Sometimes Physical + creative experimentation.</p>
                            <p className="text-white/50">&nbsp;</p>
                            <p>takes many shapes. Created specifically for you.<br />based on the details you fill me in on.</p>
                            <p className="text-white/50">&nbsp;</p>
                            <p>This is a sizable amount, but imagine.</p>
                            <p className="text-[#d4af37]/80">
                              Time, equipment,<br />
                              computer, I&apos;m looking at 10,000<br />
                              3d software and programs add up quickly,<br />
                              custom fabrics,<br />
                              Epoxy resin,<br />
                              gold flakes,<br />
                              high end 3d printer,<br />
                              other materials<br />
                              sublimation printer,<br />
                              paints,<br />
                              maybe some outsourcing,<br />
                              other types of materials..<br />
                              ummmmm, who knows what…
                            </p>
                            <p className="text-white/50">&nbsp;</p>
                            <p>Adds up fast + living costs food.<br />Other costs.&nbsp; Some people spend<br />This amount is on a logo.</p>
                            <p className="text-white/50">&nbsp;</p>
                            <p>I have multiple skill sets also,<br />just want to do something to say thanks.</p>
                            <p className="text-white/50">&nbsp;</p>
                            <p>I can&apos;t really justify or say anything...<br />But you can see the quality<br />of some of my other work<br />from over the years.</p>
                            <p className="text-white/50">&nbsp;</p>
                            <p>if you are considering contributing,<br />just for consideration,<br />I want to say thanks.</p>
                            <p className="text-white/50">&nbsp;</p>
                            <p>This is supportive and fun, different..<br />A bit wacky.. but for big asks, I need to have big ideas.</p>
                            <p className="text-[#d4af37]/70">How this may look depends on how you fill me in.</p>
                            <p className="text-[#d4af37]/70 font-semibold">Don&apos;t overthink filling me in.</p>
                          </div>
                          <button
                            onClick={() => { playTick(); setShowForm(true); }}
                            className="mt-6 px-10 py-4 border border-[#d4af37] text-[#d4af37] tracking-[0.4em] text-xs uppercase font-black hover:bg-[#d4af37] hover:text-black transition-all duration-300"
                          >
                            continue to access
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              <SpeedShuffler />
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
              <div className="w-full text-center mb-12 relative">
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => { playTick(); setShowForm(false); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[#d4af37]/40 hover:text-[#d4af37] tracking-[0.2em] text-[10px] uppercase font-semibold transition-all duration-200 group"
                >
                  <span className="w-5 h-5 border border-[#d4af37]/20 group-hover:border-[#d4af37]/60 flex items-center justify-center transition-all text-xs font-thin">‹</span>
                  <span className="hidden sm:inline">back</span>
                </button>
                <h2 className="text-xl md:text-3xl tracking-[0.25em] font-black uppercase mb-3 mr-[-0.25em] text-transparent bg-clip-text bg-[linear-gradient(110deg,#d4af37_0%,#fff3a6_30%,#c5a059_50%,#fceea7_70%,#b8860b_100%)] bg-[length:200%_100%] animate-[shine_6s_linear_infinite] leading-tight">
                  THE PROJECT <br /> ACCESS
                </h2>
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto mb-3" />

              </div>

              {/* Intro text — Concise instruction to avoid repetition */}
              <div className="flex flex-col gap-1 text-[#d4af37] text-sm tracking-widest uppercase font-bold text-center mb-10">
                <p>fill me in details..</p>
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
                {/* Send to both emails — primary delivery + CC */}
                <input type="hidden" name="_cc" value="anextvid@gmail.com,jahronimo1@hotmail.com" />
                <input type="hidden" name="_replyto" value="jahronimo1@hotmail.com" />

                {/* Details Section — open by default, required fields must be filled */}
                <ExpandableSection label="details" onTick={playTick} defaultOpen={true}>
                  {[
                    { name: "name", placeholder: "Name", type: "text", required: true },
                    { name: "email", placeholder: "Email Address", type: "email", required: true },
                    { name: "phone", placeholder: "Phone Number (optional)", type: "tel", required: false },
                    { name: "location", placeholder: "Where You're From", type: "text", required: true },
                    { name: "contact", placeholder: "Best Way to Reach You? (WhatsApp / Call / Email / DM)", type: "text", required: true },
                    { name: "social", placeholder: "Instagram or Social Handle (optional)", type: "text", required: false },
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
                        className="w-full bg-transparent border-b border-white/40 py-4 text-lg md:text-2xl text-white tracking-widest outline-none transition-all placeholder:text-white/70 font-light"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#d4af37] to-[#fff3a6] group-focus-within:w-full transition-all duration-700" />
                    </div>
                  ))}
                </ExpandableSection>

                {/* Expandable optional fields */}
                <div className="flex flex-col w-full mt-2 border-t border-white/8">
                  <ExpandableField name="your_type" label="Your Type" onTick={playTick} onKeystroke={playKeystroke} fields={["Type of Piece (Statues, paintings, digital, or something else?)", "New or old aesthetic?", "What's your vibe or style?", "Soft & smooth or sharp & strong?", "Big or small? (scale of the piece)", "Indoor or outdoor?", "Pick a colour or palette", "A mood or feeling you want it to carry", "Anything you don't want"]} />
                  <ExpandableField name="personal_life" label="Personal Life" onTick={playTick} onKeystroke={playKeystroke} fields={["Who are you?", "Personal Ambition", "Lifestyle Focus", "Values & Beliefs", "Current Challenges"]} />
                  <ExpandableField name="business_life" label="Business Life" onTick={playTick} onKeystroke={playKeystroke} fields={["What you do", "Why?", "Current Project", "Business Goal", "Vision"]} />
                  <ExpandableField name="social_links" label="Socials & Links" onTick={playTick} onKeystroke={playKeystroke} fields={["Primary Link", "Secondary Link", "Portfolio", "Recent Work", "Reference Link"]} />
                  <ExpandableField name="reference" label="Reference Points" onTick={playTick} onKeystroke={playKeystroke} fields={["How you found me?", "What else you want to say", "Other"]} />
                  <ExpandableFileField name="photos" label="Attach Photos" description="Photos (up to 5 images)" onTick={playTick} />
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 px-5 py-4 border border-red-500/30 bg-red-950/30 text-red-300 text-xs tracking-widest uppercase font-semibold text-center leading-relaxed"
                    >
                      {formError}
                    </motion.div>
                  )}
                </AnimatePresence>

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

      {/* ── Work Gallery Modal ─────────────────────────────── */}
      {showGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) setShowGallery(false); }}
        >
          {/* Gold-framed container */}
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#070707] border border-[#d4af37]/40 overflow-hidden flex flex-col shadow-[0_0_80px_rgba(212,175,55,0.18),inset_0_0_0_1px_rgba(212,175,55,0.08)]">

            {/* Corner accents */}
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 ${cls} border-[#d4af37] z-10`} />
            ))}

            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#d4af37]/20 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-5 h-[1px] bg-[#d4af37]/50" />
                <p className="text-[#d4af37] tracking-[0.4em] text-[10px] sm:text-xs uppercase font-semibold">Something Special</p>
              </div>
              <p className="text-white/20 tracking-[0.2em] text-[9px] uppercase hidden sm:block">Jahronimo · 1 of 1 Art Project</p>
              {/* Exit button */}
              <button
                onClick={() => setShowGallery(false)}
                className="flex items-center gap-2 text-[#d4af37]/50 hover:text-[#d4af37] tracking-[0.3em] text-[10px] uppercase font-semibold transition-all duration-200 group"
              >
                <span>close</span>
                <span className="w-6 h-6 border border-[#d4af37]/30 group-hover:border-[#d4af37]/80 flex items-center justify-center transition-all text-xs font-thin">✕</span>
              </button>
            </div>

            {/* Scrollable content area */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-10">

              {/* ── Accordion Text Content ─────────────────── */}
              {(() => {
                const sections = [
                  {
                    title: "The £50k",
                    content: (
                      <div className="flex flex-col gap-3 text-white/90 text-base font-normal leading-relaxed tracking-wide">
                        <p>I need £50k</p>
                        <p>for living expenses</p>
                        <p>equipment stuff..</p>
                        <p className="text-white/50">&nbsp;</p>
                        <p className="text-[#d4af37] font-semibold">And to have fun&hellip;</p>
                        <p>By fun i mean..</p>
                        <p className="text-white/50">&nbsp;</p>
                        <p className="text-white font-bold tracking-tight">No say.</p>
                        <p className="text-white font-bold tracking-tight">I make.</p>
                        <p className="text-white/50">&nbsp;</p>
                        <p className="text-white/40 text-sm">No description..</p>
                        <p className="text-white/40 text-sm">No set deliverables..</p>
                        <p className="text-white/40 text-sm">Not saying...</p>
                        <p className="text-white/50">&nbsp;</p>
                        <p className="text-white/60">and £50k project...</p>
                        <p className="text-[#d4af37]/80 font-semibold">Assume doing interesting stuff...!</p>
                      </div>
                    ),
                  },
                  {
                    title: "Something Special",
                    content: (
                      <div className="flex flex-col gap-3 text-white/90 text-base font-normal leading-relaxed tracking-wide">
                        <p>Hey, something special lined up&hellip;</p>
                        <p>Need support.</p>
                        <p className="text-white font-bold tracking-tight">1 of 1 project.</p>
                      </div>
                    ),
                  },
                  {
                    title: "The Artist",
                    content: (
                      <div className="flex flex-col gap-3 text-white/90 text-base font-normal leading-relaxed tracking-wide">
                        <p>My name is <strong className="text-white font-semibold">Jahronimo.</strong></p>
                        <p>I&apos;ve been doing mixed media art most of my life&hellip;</p>
                        <p>From a kid experimenting with:</p>
                        <div className="flex flex-col gap-1 pl-4 border-l border-[#d4af37]/20 font-medium italic">
                          <p>Types of paints, inks,</p>
                          <p>Mixing buttons,</p>
                          <p>Glues,</p>
                          <p>Paper mache&hellip;</p>
                          <p>Traditional drawing,</p>
                          <p>Graffiti.</p>
                          <p>All sorts&hellip;</p>
                        </div>
                        <p>Then on with:</p>
                        <div className="flex flex-col gap-1 pl-4 border-l border-[#d4af37]/20 font-medium">
                          <p><strong className="text-white/70">A++ Art Foundation</strong> (Mixed Media)</p>
                          <p>Then Game Design,</p>
                          <p>3D Animation,</p>
                          <p>Some 2D animation,</p>
                          <p>3D Modelling,</p>
                          <p>3D Environment artist stuff,</p>
                          <p>Realtime Architectural visualisation,</p>
                          <p>Music videos,</p>
                          <p>Types of video production,</p>
                          <p>Mix media with textiles,</p>
                          <p>Photography,</p>
                          <p>Advertising style,</p>
                          <p>Personal brand stuff,</p>
                          <p>Branding,</p>
                          <p>General Content creation.</p>
                          <p>Many forms of Art&hellip;</p>
                          <p className="opacity-50 text-[10px] mt-2">I can list more&hellip;</p>
                        </div>
                        <p>Blending these skills into <strong className="text-white/80 font-semibold">unique combinations</strong> is what defines my work.</p>
                        <p>Right now, I am dedicated to bringing this project to life. While some help has come, I need support to continue. I hope you&apos;re onboard for this journey.</p>
                      </div>
                    ),
                  },


                  {
                    title: "Support the Project",
                    content: (
                      <div className="flex flex-col gap-3 text-white/90 text-base font-normal leading-relaxed tracking-wide">
                        <p>If you want to support:</p>
                        <p>Donations are appreciated.</p>
                        <p>For large contributions,</p>
                        <p><strong className="text-white/80 font-semibold">One-of-One art commissions.</strong></p>
                        <div className="flex flex-col gap-1 pl-4 border-l border-[#d4af37]/20">
                          <p>Unique,</p>
                          <p>could be big, small,</p>
                          <p>colour, shape, meaning,</p>
                          <p>style, anything&hellip;</p>
                        </div>
                        <p>Created specifically for you.</p>
                        <p className="text-white/80 font-semibold pt-1">Part of the <strong className="text-[#d4af37]/80">&pound;50,000</strong></p>
                        <p className="text-white/80 font-semibold">One-of-One Project.</p>
                      </div>
                    ),
                  },
                  {
                    title: "The Steps",
                    content: (
                      <div className="flex flex-col text-white/90 text-base font-normal leading-relaxed tracking-wide">
                        {/* Step 1 */}
                        <div className="flex flex-col gap-2 mb-5">
                          <p className="text-[#d4af37]/70 tracking-widest text-xs uppercase font-semibold">01</p>
                          <p><strong className="text-white font-semibold">Press the button.</strong></p>
                          <p>There is a donate page.</p>
                          <p className="text-white/50 italic">1 of 1.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col gap-2 mb-5">
                          <p className="text-[#d4af37]/70 tracking-widest text-xs uppercase font-semibold">02</p>
                          <p><strong className="text-white font-semibold">Fill me in.</strong></p>
                          <p>Fill out your details.</p>
                          <p>There is a range &mdash; <strong className="text-white/80 font-semibold">this is an important start point.</strong></p>
                          <p>Contact information.</p>
                          <p>And whatever you&apos;re thinking.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col gap-2 mb-5">
                          <p className="text-[#d4af37]/70 tracking-widest text-xs uppercase font-semibold">03</p>
                          <p><strong className="text-white font-semibold">I&apos;ll start researching&hellip;</strong></p>
                          <p className="text-white/80 font-medium">Important.</p>
                          <p>More before anything happens.</p>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-col gap-2 mb-5">
                          <p className="text-[#d4af37]/70 tracking-widest text-xs uppercase font-semibold">04</p>
                          <p><strong className="text-white font-semibold">We figure out what it becomes.</strong></p>
                          <p>Could be something big, something small.</p>
                          <p>Pick colours and things within the range of details.</p>
                          <p>I need creative freedom within the bounds of how you fill me in.</p>
                          <p>Also, where my research goes.</p>
                          <p>In person. Sent to you.</p>
                          <p>Don&apos;t mind.</p>
                          <p className="text-white/50 italic">All sorts.</p>
                        </div>
                        {/* Contact */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                          <p>If you have concerns or questions &mdash;</p>
                          <p className="text-white/80 font-medium">jahronimo1@hotmail.com</p>
                          <p className="text-white/80 font-medium">07538 068 550</p>
                        </div>
                      </div>
                    ),
                  },
                ];


                return (
                  <GalleryAccordion sections={sections} />
                );
              })()}

              {/* ── Images ─────────────────────────────────────── */}
              {(() => {
                const GALLERY = [
                  `${BASE_PATH}/main_collage.jpg`,
                  `${BASE_PATH}/newwork_a.jpg`,
                  `${BASE_PATH}/newwork_b.jpg`,
                  `${BASE_PATH}/newwork1.jpg`,
                  `${BASE_PATH}/newwork2.jpg`,
                  `${BASE_PATH}/newwork3.jpg`,
                  `${BASE_PATH}/newwork4.jpg`,
                  `${BASE_PATH}/newwork5.jpg`,
                  `${BASE_PATH}/newwork6.jpg`,
                  `${BASE_PATH}/newwork7.jpg`,
                  `${BASE_PATH}/newwork8.jpg`,
                  `${BASE_PATH}/newwork9.jpg`,
                  `${BASE_PATH}/newwork10.jpg`,
                  `${BASE_PATH}/newwork_questionmark.jpg`,
                ];

                const openLight = (i: number) => setLightboxIdx(i);
                const closeLight = () => setLightboxIdx(null);
                const prev = () => setLightboxIdx(i => i !== null ? (i - 1 + GALLERY.length) % GALLERY.length : 0);
                const next = () => setLightboxIdx(i => i !== null ? (i + 1) % GALLERY.length : 0);

                return (
                  <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/20" />
                      <p className="text-[#d4af37]/50 tracking-[0.4em] text-[9px] uppercase">Work So Far</p>
                      <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/20" />
                    </div>

                    <div className="flex flex-col">
                      {GALLERY.map((src, i) => (
                        <div
                          key={i}
                          className={i === 0 ? "mb-2" : "mt-4"}
                        >
                          <div
                            className="w-full border border-[#d4af37]/15 overflow-hidden cursor-zoom-in relative group"
                            onClick={() => openLight(i)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Work sample ${i + 1}`}
                              className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/80 tracking-widest text-xs uppercase border border-white/30 px-4 py-2 backdrop-blur-sm">
                                press to enlarge
                              </span>
                            </div>
                          </div>
                          {i === 0 && (
                            <div className="flex flex-col items-center gap-6 py-24">
                              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent" />
                              <p className="text-[#d4af37]/30 tracking-[0.5em] text-[9px] uppercase">more work</p>
                              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Footer rule */}
                    <div className="flex flex-col items-center justify-center gap-6 mt-16 mb-16">
                      <div className="flex w-full items-center gap-4">
                        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/20" />
                        <p className="text-[#d4af37]/30 tracking-[0.4em] text-[9px] uppercase">End of Preview</p>
                        <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/20" />
                      </div>
                      
                      {/* Enormous Question Mark */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="mt-8 mb-4 relative"
                      >
                        <div className="absolute inset-0 bg-[#d4af37]/20 blur-3xl rounded-full scale-150 animate-pulse" />
                        <h2 className="text-[#d4af37] text-[120px] md:text-[180px] font-black leading-none opacity-90 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                          ?
                        </h2>
                      </motion.div>
                    </div>

                    {/* ── Lightbox ─────────────────────────────── */}
                    <AnimatePresence>
                      {lightboxIdx !== null && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
                          onClick={closeLight}
                          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                          onTouchEnd={(e) => {
                            const diff = touchStartX - e.changedTouches[0].clientX;
                            if (Math.abs(diff) > 50) {
                              if (diff > 0) {
                                next();
                              } else {
                                prev();
                              }
                            }
                          }}
                        >
                          {/* X close */}
                          <button
                            onClick={(e) => { e.stopPropagation(); closeLight(); }}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/60 transition-all duration-200 text-xl"
                          >
                            ✕
                          </button>

                          {/* Counter */}
                          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 tracking-widest text-xs">
                            {lightboxIdx + 1} / {GALLERY.length}
                          </p>

                          {/* Prev */}
                          <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-2 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/60 hover:text-white border border-white/15 hover:border-white/50 transition-all duration-200 text-lg"
                          >
                            ‹
                          </button>

                          {/* Image */}
                          <motion.div
                            key={lightboxIdx}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-[88vw] max-h-[88vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={GALLERY[lightboxIdx]}
                              alt={`Work sample ${lightboxIdx + 1}`}
                              className="max-w-full max-h-[88vh] object-contain border border-[#d4af37]/20"
                            />
                          </motion.div>

                          {/* Next */}
                          <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-2 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/60 hover:text-white border border-white/15 hover:border-white/50 transition-all duration-200 text-lg"
                          >
                            ›
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ── WhatsApp Floating Button ────────────────────────────── */}
      <a
        href="https://wa.me/447538068550?text=Hey%20Jahronimo%2C%20I%20came%20across%20your%20%C2%A350k%20project%20and%20wanted%20to%20reach%20out."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playTick()}
        className="fixed bottom-6 right-6 z-[100] group flex items-center gap-3"
        aria-label="Message on WhatsApp"
      >
        {/* Tooltip */}
        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white/60 tracking-[0.2em] text-[10px] uppercase font-semibold whitespace-nowrap translate-x-2 group-hover:translate-x-0">
          message me
        </span>

        {/* Button */}
        <div className="relative w-12 h-12 flex items-center justify-center bg-black/80 backdrop-blur-md border border-[#d4af37]/30 group-hover:border-[#d4af37]/80 shadow-[0_0_20px_rgba(212,175,55,0.12)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-all duration-300">
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 border border-[#d4af37]/15 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          {/* WhatsApp icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-[#d4af37]/70 group-hover:fill-[#d4af37] transition-colors duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.531 5.856L.057 23.492a.5.5 0 0 0 .614.614l5.737-1.503A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.941 9.941 0 0 1-5.093-1.396l-.364-.216-3.773.989.999-3.671-.236-.38A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        </div>
      </a>
    </main>
  );
}

