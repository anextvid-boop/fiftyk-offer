"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <a
      href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
      target="_blank"
      rel="noopener noreferrer"
      className="block relative min-h-screen w-full bg-[#050505] text-[#f4f4f4] font-serif overflow-hidden cursor-pointer group"
    >
      {/* Subtle background ambient glow for the premium turquoise/gold aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 transition-opacity duration-700 group-hover:opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#00e5ff] rounded-full blur-[150px] mix-blend-screen opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[#cfb53b] rounded-full blur-[200px] mix-blend-screen opacity-30"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-16 text-center px-6 mx-auto min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* jahronimo */}
          <h1 className="text-3xl md:text-5xl tracking-[0.4em] font-light uppercase text-white/80 group-hover:text-white transition-colors duration-500">
            jahronimo
          </h1>

          {/* £50,000 */}
          <h2 className="text-6xl md:text-9xl font-serif italic text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-500">
            £50,000
          </h2>

          {/* no saying. i make. */}
          <div className="space-y-6 pt-10">
            <p className="text-xl md:text-3xl tracking-widest font-light text-white/60 group-hover:text-white/80 transition-colors duration-500 uppercase">
              no saying
            </p>
            <p className="text-2xl md:text-4xl tracking-widest font-bold text-[#cfb53b] group-hover:text-[#e4c94b] drop-shadow-[0_0_20px_rgba(207,181,59,0.2)] transition-all duration-500 uppercase">
              i make.
            </p>
          </div>
        </motion.div>
      </div>
    </a>
  );
}
