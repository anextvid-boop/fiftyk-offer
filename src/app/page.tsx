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

const ExpandableField = ({ name, label }: { name: string, label: string }) => {
  const [expanded, setExpanded] = useState(false);
  const placeholderText = name === "links" ? "e.g., https://your-website.com" : "Type here...";
  return (
    <div className="border-b border-[#cfb53b]/40">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full py-6 flex justify-between items-center text-white uppercase tracking-[0.2em] text-base md:text-xl outline-none transition-all hover:text-[#cfb53b] font-light"
      >
        <span className={expanded ? "text-[#cfb53b]" : "text-white/70"}>{label}</span>
        <span className="text-2xl font-light text-[#cfb53b]/60">{expanded ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <textarea
              name={name}
              placeholder={placeholderText}
              rows={4}
              className="w-full bg-white/5 p-6 text-white tracking-wide outline-none placeholder:text-white/10 text-lg md:text-xl font-sans resize-none mt-2 mb-8 border border-[#cfb53b]/20"
            ></textarea>
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
    // We stop the native click navigation initially to control the flow
    e.preventDefault();

    const form = e.currentTarget.closest('form');
    const targetUrl = e.currentTarget.getAttribute('href');

    if (form && targetUrl) {
      if (!form.checkValidity()) {
        form.reportValidity(); // Show native browser validation popups
        return;
      }

      setIsSubmitting(true);
      const formData = new FormData(form);

      try {
        // Run fetch in parallel
        const fetchPromise = fetch("https://formsubmit.co/ajax/anextvid@gmail.com", {
          method: "POST",
          headers: {
            'Accept': 'application/json'
          },
          body: formData,
          keepalive: true
        });

        // Use a small delay for UI presence and ensure the fetch has a head start
        // This solves the 'glitchy' feeling of an instant navigation that kills JS contexts
        await new Promise(resolve => setTimeout(resolve, 800));

        // Finalize navigation
        window.location.href = targetUrl;
      } catch (error) {
        console.error(error);
        window.location.href = targetUrl; // Fallback redirect anyway
      }
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
              <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl tracking-[0.4em] font-light uppercase text-white/70 transition-colors duration-700 m-0">
                jahronimo
              </motion.h1>

              {/* £50,000 */}
              <motion.h2 variants={itemVariants} className="text-7xl md:text-9xl font-serif italic text-[#cfb53b] drop-shadow-[0_0_20px_rgba(207,181,59,0.2)] transition-all duration-700 m-0 leading-none">
                £50,000
              </motion.h2>

              {/* no saying. i make. */}
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-10 pt-6 text-center m-0">
                <p className="text-xl md:text-3xl tracking-[0.3em] font-light text-white/50 transition-colors duration-700 uppercase m-0 leading-none">
                  no saying
                </p>
                <p className="text-4xl md:text-7xl tracking-[0.3em] font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-700 uppercase m-0 leading-none">
                  i make.
                </p>

                <div className="pt-20">
                  <div className="text-[#cfb53b] tracking-[0.4em] text-sm md:text-xl font-sans uppercase border-b border-[#cfb53b]/40 pb-4 hover:text-white hover:border-white transition-all duration-500">
                    Access Project
                  </div>
                </div>
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

              <motion.div variants={itemVariants} className="w-full text-center mb-14">
                <h2 className="text-4xl md:text-5xl tracking-[0.3em] font-light uppercase text-white/95 mb-4 font-serif">
                  Project Access
                </h2>
                <p className="text-sm md:text-lg tracking-[0.2em] font-light uppercase text-white/40">
                  Fill in what you wish
                </p>
              </motion.div>

              <motion.form
                variants={itemVariants}
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
                  className="w-full bg-transparent border-b border-[#cfb53b]/40 py-5 text-white tracking-widest outline-none focus:border-[#cfb53b] transition-all placeholder:text-white/20 text-lg md:text-2xl font-sans"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  required
                  className="w-full bg-transparent border-b border-[#cfb53b]/40 py-5 mb-8 text-white tracking-widest outline-none focus:border-[#cfb53b] transition-all placeholder:text-white/20 text-lg md:text-2xl font-sans"
                />

                <div className="flex flex-col w-full border-t border-[#cfb53b]/40 mt-4">
                  <ExpandableField name="personal_life" label="Personal Life" />
                  <ExpandableField name="business_life" label="Business Life" />
                  <ExpandableField name="links" label="Links" />
                  <ExpandableField name="points_of_reference" label="Points of Reference" />
                </div>

                <a
                  href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
                  onClick={handleSubmit}
                  className={`mt-14 px-10 py-7 border border-[#cfb53b] bg-transparent text-[#cfb53b] tracking-[0.4em] uppercase font-light text-lg md:text-xl hover:bg-[#cfb53b] hover:text-black transition-all duration-500 w-full flex justify-center items-center text-center ${isSubmitting ? 'opacity-30 pointer-events-none' : ''}`}
                >
                  {isSubmitting ? "REDIRECTING..." : "PROCEED TO PAYMENT"}
                </a>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
