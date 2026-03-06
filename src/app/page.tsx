"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_PATH = "/fiftyk-offer";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    transition: { duration: 0.6 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1
    }
  }
};

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch("https://formsubmit.co/ajax/anextvid@gmail.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
    } catch (error) {
      console.error(error);
    } finally {
      window.location.href = "https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00";
    }
  };

  return (
    <main className="block relative min-h-screen w-full bg-black text-[#f4f4f4] font-serif overflow-hidden group">
      {/* Background Image: Static, grayscale, gold-tinted, blurred */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-[2s] group-hover:scale-105"
        style={{
          backgroundImage: `url('${BASE_PATH}/collage-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) blur(12px) contrast(1.5) brightness(0.6)',
        }}
      ></div>

      {/* Gold overlay to tint the black and white image */}
      <div className="absolute inset-0 z-0 bg-[#cfb53b]/40 mix-blend-multiply pointer-events-none transition-opacity duration-[2s] group-hover:opacity-80"></div>

      {/* Subtle vignette/fade to black at the edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none opacity-80"></div>

      {/* Main Content Container - Centered Gold Box */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="landing"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowForm(true)}
              className="relative w-full max-w-xl mx-auto border border-[#cfb53b]/50 bg-black/70 backdrop-blur-xl p-12 md:p-20 shadow-[0_0_40px_rgba(207,181,59,0.1)] flex flex-col items-center justify-center space-y-12 transition-all duration-700 hover:border-[#cfb53b]/80 hover:bg-black/90 hover:shadow-[0_0_80px_rgba(207,181,59,0.25)] cursor-pointer"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cfb53b]/40 transition-colors duration-700 group-hover:border-[#cfb53b]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#cfb53b]/40 transition-colors duration-700 group-hover:border-[#cfb53b]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#cfb53b]/40 transition-colors duration-700 group-hover:border-[#cfb53b]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cfb53b]/40 transition-colors duration-700 group-hover:border-[#cfb53b]"></div>

              {/* jahronimo */}
              <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl tracking-[0.4em] font-light uppercase text-white/70 transition-colors duration-700 m-0">
                jahronimo
              </motion.h1>

              {/* £50,000 */}
              <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif italic text-[#cfb53b] drop-shadow-[0_0_20px_rgba(207,181,59,0.2)] transition-all duration-700 m-0">
                £50,000
              </motion.h2>

              {/* no saying. i make. */}
              <motion.div variants={itemVariants} className="space-y-6 pt-6 text-center m-0">
                <p className="text-lg md:text-xl tracking-[0.3em] font-light text-white/50 transition-colors duration-700 uppercase m-0">
                  no saying
                </p>
                <p className="text-xl md:text-3xl tracking-[0.3em] font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-700 uppercase m-0">
                  i make.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-xl mx-auto border border-[#cfb53b]/50 bg-black/70 backdrop-blur-xl p-12 md:p-16 shadow-[0_0_40px_rgba(207,181,59,0.1)] flex flex-col items-center justify-center transition-all duration-700"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cfb53b]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#cfb53b]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#cfb53b]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cfb53b]"></div>

              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl tracking-[0.3em] font-light uppercase text-white/90 mb-10 text-center">
                Project Access
              </motion.h2>

              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="flex flex-col space-y-8 w-full"
              >
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
                  disabled={isSubmitting}
                  className="mt-8 px-8 py-5 border border-[#cfb53b] bg-transparent text-[#cfb53b] tracking-[0.3em] uppercase font-light text-sm hover:bg-[#cfb53b] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 w-full flex justify-center items-center"
                >
                  {isSubmitting ? "REDIRECTING TO GATEWAY..." : "PROCEED TO PAYMENT"}
                </button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
