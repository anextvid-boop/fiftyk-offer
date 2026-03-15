"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const DUST_PARTICLES = [
    { top: 10, left: 12, size: 2, dur: 9, delay: 0 },
    { top: 30, left: 78, size: 3, dur: 11, delay: 1.3 },
    { top: 65, left: 20, size: 1.5, dur: 7, delay: 0.6 },
    { top: 20, left: 88, size: 2.5, dur: 10, delay: 2.1 },
    { top: 82, left: 50, size: 2, dur: 12, delay: 0.9 },
    { top: 50, left: 40, size: 1, dur: 6, delay: 3.2 },
    { top: 7, left: 55, size: 3, dur: 13, delay: 1.6 },
    { top: 92, left: 28, size: 2, dur: 8, delay: 4.1 },
    { top: 60, left: 85, size: 1.5, dur: 9, delay: 2.6 },
    { top: 78, left: 7, size: 2.5, dur: 7, delay: 0.3 },
    { top: 40, left: 95, size: 2, dur: 8.5, delay: 1.1 },
    { top: 15, left: 62, size: 1, dur: 10, delay: 3.6 },
];

export default function ThankYou() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <main className="relative min-h-screen w-full bg-[#020202] text-white font-sans overflow-hidden flex flex-col items-center justify-center px-6 py-20">

            {/* Global keyframes */}
            <style jsx global>{`
        @keyframes float {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.3; }
          100% { transform: translateY(-120px) translateX(15px); opacity: 0; }
        }
        @keyframes shine {
          0%   { background-position-x: 200%; }
          100% { background-position-x: -200%; }
        }
        @keyframes pulsate-opacity {
          0%, 100% { opacity: 0; }
          50%       { opacity: 1; }
        }
        @keyframes borderpulse {
          0%, 100% { border-color: rgba(212,175,55,0.20); }
          50%       { border-color: rgba(212,175,55,0.55); }
        }
      `}</style>

            {/* Background orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)]" />

                {/* Gold dust */}
                {DUST_PARTICLES.map((p, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-[#d4af37]/30"
                        style={{
                            top: `${p.top}%`,
                            left: `${p.left}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animation: `float ${p.dur}s ease-in-out infinite`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-lg bg-black/60 backdrop-blur-2xl flex flex-col items-center text-center py-16 px-10 sm:px-16 shadow-[0_0_60px_rgba(212,175,55,0.12),0_0_0_1px_rgba(212,175,55,0.20)] overflow-hidden"
                style={{ animation: "borderpulse 7s ease-in-out infinite" }}
            >
                {/* Pulsating glow */}
                <div
                    className="absolute inset-0 pointer-events-none shadow-[0_0_80px_rgba(212,175,55,0.15),0_0_0_1px_rgba(212,175,55,0.25)]"
                    style={{ animation: "pulsate-opacity 7s ease-in-out infinite" }}
                />

                {/* Corner brackets */}
                {[
                    "top-0 left-0 border-t border-l",
                    "top-0 right-0 border-t border-r",
                    "bottom-0 left-0 border-b border-l",
                    "bottom-0 right-0 border-b border-r",
                ].map((cls, i) => (
                    <div key={i} className={`absolute w-10 h-10 ${cls} border-[#d4af37]/30`} />
                ))}

                {/* Content */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-[#d4af37] tracking-[0.6em] text-xs uppercase font-semibold mb-8 mr-[-0.6em]"
                >
                    Jahronimo · 1 of 1
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[clamp(3rem,12vw,7rem)] font-black tracking-tighter leading-none text-transparent bg-clip-text mb-6
            bg-[linear-gradient(110deg,#d4af37_0%,#fff3a6_30%,#c5a059_50%,#fceea7_70%,#b8860b_100%)]
            bg-[length:200%_100%] animate-[shine_6s_linear_infinite]"
                >
                    Thank You.
                </motion.h1>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mb-8"
                />

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="flex flex-col gap-3 text-white/60 text-sm leading-relaxed tracking-wide mb-12"
                >
                    <p>You&apos;re in.</p>
                    <p>I&apos;ve received your details.</p>
                    <p className="text-white/40">I&apos;ll start researching, and be in touch.</p>
                    <p className="text-[#d4af37]/60 pt-2">No saying what it becomes yet.</p>
                    <p className="text-white/40 text-xs">That&apos;s part of it.</p>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent mb-10" />

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="flex flex-col gap-2 text-white/40 text-xs tracking-widest uppercase mb-10"
                >
                    <p>Questions — reach out directly</p>
                    <a
                        href="mailto:jahronimo1@hotmail.com"
                        className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors duration-200"
                    >
                        jahronimo1@hotmail.com
                    </a>
                    <a
                        href="https://wa.me/447538068550"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors duration-200"
                    >
                        07538 068 550
                    </a>
                </motion.div>

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                >
                    <Link
                        href="/"
                        className="text-white/20 hover:text-white/50 tracking-[0.3em] text-[10px] uppercase font-semibold transition-all duration-200"
                    >
                        ← return
                    </Link>
                </motion.div>
            </motion.div>
        </main>
    );
}
