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
    <main className="block relative min-h-screen w-full bg-[#050505] text-white font-sans overflow-hidden">
      {/* Dynamic Background Collage */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-[-5%] z-0"
          style={{
            backgroundImage: `url('${BASE_PATH}/collage-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) blur(8px) brightness(0.3)',
          }}
        />
        {/* Subtle Floating Light Orbs */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#cfb53b]/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Main Content Container */}
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
              className="relative w-full max-w-2xl mx-auto border border-white/10 bg-black/40 backdrop-blur-3xl p-16 md:p-24 shadow-2xl flex flex-col items-center justify-center space-y-16 transition-all duration-700 hover:border-[#cfb53b]/40 hover:bg-black/60 cursor-pointer group"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>

              {/* jahronimo */}
              <motion.h1
                variants={itemVariants}
                className="text-2xl md:text-3xl tracking-[1em] font-extralight uppercase text-white/40 transition-all duration-1000 group-hover:text-white group-hover:tracking-[1.1em] m-0 pr-[-1em]"
              >
                jahronimo
              </motion.h1>

              {/* £50,000 */}
              <motion.div variants={itemVariants} className="relative py-4">
                <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter text-white transition-all duration-1000 m-0 group-hover:scale-105 group-hover:text-[#cfb53b]">
                  £50,000
                </h2>
                <div className="absolute -inset-4 bg-[#cfb53b]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </motion.div>

              {/* no saying. i make. */}
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-8 text-center m-0">
                <p className="text-xl md:text-2xl tracking-[0.4em] font-light text-white/30 transition-colors duration-700 uppercase m-0">
                  no saying
                </p>
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-5xl md:text-8xl tracking-[0.2em] font-black text-white uppercase m-0"
                  >
                    i make.
                  </motion.p>
                </div>

                <div className="pt-24 w-full">
                  <div className="relative inline-block group/btn">
                    <span className="text-[#cfb53b] tracking-[0.5em] text-sm md:text-lg font-medium uppercase transition-all duration-500 pb-2 border-b border-[#cfb53b]/20 group-hover/btn:border-[#cfb53b] group-hover/btn:text-white group-hover/btn:tracking-[0.6em]">
                      Access Project
                    </span>
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover/btn:w-full transition-all duration-700"
                    />
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
              className="relative w-full max-w-2xl mx-auto border border-white/10 bg-black/60 backdrop-blur-3xl p-12 md:p-20 shadow-2xl flex flex-col items-center justify-center transition-all duration-1000"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#cfb53b]/60"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#cfb53b]/60"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#cfb53b]/60"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#cfb53b]/60"></div>

              <motion.div variants={itemVariants} className="w-full text-center mb-16">
                <h2 className="text-4xl md:text-6xl tracking-[0.3em] font-black uppercase text-white mb-4">
                  Project Access
                </h2>
                <p className="text-sm md:text-lg tracking-[0.5em] font-light uppercase text-white/30">
                  CONFIRM DETAILS
                </p>
              </motion.div>

              <motion.form
                variants={itemVariants}
                className="flex flex-col space-y-12 w-full"
              >
                {/* Disables Captcha for a smoother experience */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New £50k Project Inquiry" />

                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    placeholder="NAME"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-6 text-2xl md:text-4xl text-white tracking-widest outline-none focus:border-[#cfb53b] transition-all placeholder:text-white/10 font-sans"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cfb53b] group-focus-within:w-full transition-all duration-700" />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-6 text-2xl md:text-4xl text-white tracking-widest outline-none focus:border-[#cfb53b] transition-all placeholder:text-white/10 font-sans"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cfb53b] group-focus-within:w-full transition-all duration-700" />
                </div>

                <div className="flex flex-col w-full border-t border-white/10 mt-8">
                  <ExpandableField name="personal_life" label="Personal Life" />
                  <ExpandableField name="business_life" label="Business Life" />
                  <ExpandableField name="links" label="Links" />
                  <ExpandableField name="points_of_reference" label="Points of Reference" />
                </div>

                <a
                  href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
                  onClick={handleSubmit}
                  className={`mt-20 group relative px-10 py-8 border border-white/20 bg-transparent text-white tracking-[0.5em] uppercase font-bold text-xl md:text-2xl hover:border-[#cfb53b] transition-all duration-700 w-full flex justify-center items-center text-center overflow-hidden ${isSubmitting ? 'opacity-30 pointer-events-none' : ''}`}
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                    {isSubmitting ? "REDIRECTING..." : "PROCEED TO PAYMENT"}
                  </span>
                  <div className="absolute inset-0 bg-[#cfb53b] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                </a>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
