"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-[#f4f4f4] font-serif flex flex-col justify-center items-center overflow-hidden">

      {/* Subtle background ambient glow for the premium turquoise/gold aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#00e5ff] rounded-full blur-[150px] mix-blend-screen opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[#cfb53b] rounded-full blur-[200px] mix-blend-screen opacity-30"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-20 text-center px-6 max-w-4xl mx-auto h-screen">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* jahronimo */}
          <h1 className="text-4xl md:text-6xl tracking-[0.3em] font-light uppercase text-white/90">
            jahronimo
          </h1>

          {/* £50,000 */}
          <h2 className="text-6xl md:text-9xl font-serif italic text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            £50,000
          </h2>

          {/* no saying. i make. */}
          <div className="space-y-4 pt-10">
            <p className="text-2xl md:text-4xl tracking-widest font-light text-white/70 uppercase">
              no saying
            </p>
            <p className="text-3xl md:text-5xl tracking-widest font-bold text-[#cfb53b] uppercase">
              i make.
            </p>
          </div>
        </motion.div>

        {/* Minimal Premium CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="pt-20"
        >
          <a
            href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-16 py-6 border border-[#cfb53b]/30 bg-black/50 backdrop-blur-md rounded-sm overflow-hidden transition-all duration-500 hover:border-[#cfb53b]"
          >
            {/* Hover sheen effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#cfb53b]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

            <span className="relative text-[#cfb53b] text-sm md:text-base tracking-[0.4em] uppercase font-light group-hover:text-white transition-colors duration-300">
              Access Project
            </span>
          </a>
        </motion.div>
      </div>

    </main>
  );
}
