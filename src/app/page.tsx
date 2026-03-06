"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_PATH = "/fiftyk-offer";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="block relative min-h-screen w-full bg-black text-[#f4f4f4] font-serif overflow-hidden group">
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
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={() => setShowForm(true)}
              className="relative w-full max-w-xl mx-auto border border-[#cfb53b]/50 bg-black/70 backdrop-blur-xl p-12 md:p-20 shadow-[0_0_40px_rgba(207,181,59,0.1)] flex flex-col items-center justify-center space-y-12 transition-all duration-500 hover:border-[#cfb53b]/80 hover:bg-black/80 hover:shadow-[0_0_60px_rgba(207,181,59,0.2)] cursor-pointer"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cfb53b]/40 transition-colors duration-500 group-hover:border-[#cfb53b]"></div>

              {/* jahronimo */}
              <h1 className="text-2xl md:text-3xl tracking-[0.4em] font-light uppercase text-white/70 transition-colors duration-500 m-0">
                jahronimo
              </h1>

              {/* £50,000 */}
              <h2 className="text-5xl md:text-7xl font-serif italic text-[#cfb53b] drop-shadow-[0_0_20px_rgba(207,181,59,0.2)] transition-all duration-500 m-0">
                £50,000
              </h2>

              {/* no saying. i make. */}
              <div className="space-y-6 pt-6 text-center m-0">
                <p className="text-lg md:text-xl tracking-[0.3em] font-light text-white/50 transition-colors duration-500 uppercase m-0">
                  no saying
                </p>
                <p className="text-xl md:text-3xl tracking-[0.3em] font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-500 uppercase m-0">
                  i make.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-xl mx-auto border border-[#cfb53b]/50 bg-black/70 backdrop-blur-xl p-12 md:p-16 shadow-[0_0_40px_rgba(207,181,59,0.1)] flex flex-col items-center justify-center transition-all duration-500"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cfb53b]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#cfb53b]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#cfb53b]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cfb53b]"></div>

              <h2 className="text-2xl md:text-3xl tracking-[0.3em] font-light uppercase text-white/90 mb-10 text-center">
                Project Access
              </h2>

              <form
                action="https://formsubmit.co/anextvid@gmail.com"
                method="POST"
                className="flex flex-col space-y-8 w-full"
              >
                {/* Redirects user to Stripe AFTER successful form submission */}
                <input type="hidden" name="_next" value="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00" />
                {/* Disables Captcha for a smoother experience */}
                <input type="hidden" name="_captcha" value="false" />
                {/* Sets an email subject so it stands out in inbox */}
                <input type="hidden" name="_subject" value="New £50k Project Inquiry" />

                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  required
                  className="w-full bg-transparent border-b border-[#cfb53b]/40 py-3 text-white tracking-widest outline-none focus:border-[#cfb53b] transition-colors placeholder:text-white/30 text-sm md:text-base font-sans"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  required
                  className="w-full bg-transparent border-b border-[#cfb53b]/40 py-3 text-white tracking-widest outline-none focus:border-[#cfb53b] transition-colors placeholder:text-white/30 text-sm md:text-base font-sans"
                />

                <textarea
                  name="details"
                  placeholder="DETAILS"
                  rows={3}
                  required
                  className="w-full bg-transparent border-b border-[#cfb53b]/40 py-3 text-white tracking-widest outline-none focus:border-[#cfb53b] transition-colors placeholder:text-white/30 text-sm md:text-base resize-none font-sans"
                ></textarea>

                <button
                  type="submit"
                  className="mt-8 px-8 py-5 border border-[#cfb53b] text-[#cfb53b] tracking-[0.3em] uppercase font-light text-sm hover:bg-[#cfb53b] hover:text-black transition-all duration-300 w-full"
                >
                  Proceed to Payment
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
