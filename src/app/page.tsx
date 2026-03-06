"use client";

import { motion } from "framer-motion";

const BASE_PATH = "/fiftyk-offer";

export default function Home() {
  return (
    <a
      href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
      target="_blank"
      rel="noopener noreferrer"
      className="block relative min-h-screen w-full bg-black text-[#f4f4f4] font-serif overflow-hidden cursor-pointer group"
    >
      {/* Background Image: Static, grayscale, gold-tinted, blurred */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-1000 group-hover:scale-105"
        style={{
          backgroundImage: `url('${BASE_PATH}/collage-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) blur(12px) contrast(1.5) brightness(0.6)',
        }}
      ></div>

      {/* Gold overlay to tint the black and white image */}
      <div className="absolute inset-0 z-0 bg-[#cfb53b]/40 mix-blend-multiply pointer-events-none"></div>

      {/* Subtle vignette/fade to black at the edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none opacity-80"></div>

      {/* Main Content Container - Centered Gold Box */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full max-w-xl mx-auto border border-[#cfb53b]/50 bg-black/70 backdrop-blur-xl p-12 md:p-20 shadow-[0_0_40px_rgba(207,181,59,0.1)] flex flex-col items-center justify-center space-y-12 transition-all duration-500 group-hover:border-[#cfb53b]/80 group-hover:bg-black/80 group-hover:shadow-[0_0_60px_rgba(207,181,59,0.2)]"
        >
          {/* Corner Accents - Top Left */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>

          {/* jahronimo */}
          <h1 className="text-2xl md:text-3xl tracking-[0.4em] font-light uppercase text-white/70 group-hover:text-white transition-colors duration-500 m-0">
            jahronimo
          </h1>

          {/* £50,000 */}
          <h2 className="text-5xl md:text-7xl font-serif italic text-[#cfb53b] drop-shadow-[0_0_20px_rgba(207,181,59,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(207,181,59,0.5)] transition-all duration-500 m-0">
            £50,000
          </h2>

          {/* no saying. i make. */}
          <div className="space-y-6 pt-6 text-center m-0">
            <p className="text-lg md:text-xl tracking-[0.3em] font-light text-white/50 group-hover:text-white/80 transition-colors duration-500 uppercase m-0">
              no saying
            </p>
            <p className="text-xl md:text-3xl tracking-[0.3em] font-bold text-white group-hover:text-[#cfb53b] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-500 uppercase m-0">
              i make.
            </p>
          </div>
        </motion.div>
      </div>
    </a>
  );
}
