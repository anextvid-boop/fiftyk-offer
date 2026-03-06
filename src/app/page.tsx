"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_PATH = "/fiftyk-offer";

// Solid, stable transition logic
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const ExpandableField = ({ name, label, fields }: { name: string, label: string, fields?: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-[#cfb53b]/20">
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
            <div className="flex flex-col gap-4 mb-8">
              {fields ? (
                fields.map((fieldLabel, idx) => (
                  <div key={idx} className="relative group">
                    <input
                      type="text"
                      name={`${name}_${idx}`}
                      placeholder={fieldLabel.toUpperCase()}
                      className="w-full bg-white/5 border border-white/10 p-5 text-white tracking-widest outline-none focus:border-[#cfb53b]/60 transition-all placeholder:text-white/10 font-sans"
                    />
                  </div>
                ))
              ) : (
                <textarea
                  name={name}
                  placeholder="Type here..."
                  rows={4}
                  className="w-full bg-white/5 p-6 text-white tracking-wide outline-none placeholder:text-white/10 text-lg md:text-xl font-sans resize-none border border-[#cfb53b]/20"
                ></textarea>
              )}
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
      {/* Ultra-Premium Gold Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#020202]">
        <div
          className="absolute inset-0 z-0 opacity-10 grayscale brightness-30"
          style={{
            backgroundImage: `url('${BASE_PATH}/collage-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Floating Gold Dust */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#cfb53b]/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        {/* Ambient Gold Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#cfb53b]/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#cfb53b]/10 blur-[180px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-[#cfb53b]/5 blur-[200px] rounded-full" />
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        @keyframes shine {
          to { background-position-x: -200%; }
        }
        @keyframes pulsate {
          0% { box-shadow: 0 0 50px rgba(207,181,59,0.1); }
          50% { box-shadow: 0 0 100px rgba(207,181,59,0.2); }
          100% { box-shadow: 0 0 50px rgba(207,181,59,0.1); }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
      `}</style>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="landing"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowForm(true)}
              className="relative w-full max-w-4xl mx-auto border border-[#cfb53b]/30 bg-black/80 backdrop-blur-xl p-8 sm:p-12 md:p-20 flex flex-col items-center justify-center space-y-12 cursor-pointer group overflow-hidden animate-[pulsate_6s_infinite_ease-in-out] rounded-[2px]"
            >
              {/* Premium Shimmer Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cfb53b]/15 to-transparent -translate-x-full animate-[shimmer_4s_infinite] skew-x-12" />
              </div>
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/20 transition-all duration-700 group-hover:border-[#cfb53b] group-hover:w-16 group-hover:h-16"></div>

              {/* jahronimo */}
              <motion.h1
                variants={itemVariants}
                className="text-xl md:text-2xl tracking-[1.2em] font-light uppercase text-[#cfb53b]/60 transition-all duration-700 group-hover:text-[#cfb53b] m-0 mr-[-1.2em]"
              >
                jahronimo
              </motion.h1>

              {/* £50,000 - High-Fidelity Gold Shine */}
              <motion.div variants={itemVariants} className="relative py-2 w-full flex justify-center">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(110deg,#bf953f,25%,#fcf6ba,45%,#b38728,55%,#fbf5b7,75%,#aa771c)] bg-[length:200%_100%] animate-[shine_5s_linear_infinite] m-0 drop-shadow-[0_0_20px_rgba(207,181,59,0.4)] mr-[-0.01em]">
                  £50,000
                </h2>
              </motion.div>

              {/* no saying. i make. */}
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6 text-center m-0 w-full">
                <p className="text-lg md:text-xl tracking-[0.5em] font-light text-[#cfb53b]/40 uppercase m-0 mr-[-0.5em]">
                  no saying
                </p>
                <p className="text-4xl md:text-7xl tracking-[0.1em] font-black text-white uppercase m-0 leading-tight mr-[-0.1em]">
                  i make.
                </p>

                <div className="pt-12 w-full flex justify-center">
                  <div className="relative inline-block border-b border-[#cfb53b]/40 pb-2">
                    <span className="text-[#cfb53b] tracking-[0.6em] text-xs md:text-sm font-bold uppercase mr-[-0.6em]">
                      Access Project
                    </span>
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
              className="relative w-full max-w-2xl mx-auto border border-white/10 bg-black p-12 md:p-20 shadow-2xl flex flex-col items-center justify-center transition-all duration-300"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#cfb53b]/60"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#cfb53b]/60"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#cfb53b]/60"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#cfb53b]/60"></div>

              <motion.div variants={itemVariants} className="w-full text-center mb-16">
                <h2 className="text-4xl md:text-6xl tracking-[0.3em] font-black uppercase text-white mb-4 mr-[-0.3em]">
                  Project Access
                </h2>
                <p className="text-sm md:text-lg tracking-[0.5em] font-light uppercase text-[#cfb53b]/60 mr-[-0.5em]">
                  FILL IN WHAT YOU WISH
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

                <div className="relative group">
                  <input
                    type="text"
                    name="location"
                    placeholder="WHERE YOU'RE FROM"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-6 text-2xl md:text-3xl text-white tracking-widest outline-none focus:border-[#cfb53b] transition-all placeholder:text-white/10 font-sans"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cfb53b] group-focus-within:w-full transition-all duration-700" />
                </div>

                <div className="flex flex-col w-full border-t border-white/10 mt-8">
                  <ExpandableField
                    name="personal_life"
                    label="Personal Life Details"
                    fields={["Who are you?", "Personal Ambition", "Lifestyle Focus"]}
                  />
                  <ExpandableField
                    name="business_life"
                    label="Business Life Details"
                    fields={["Current Project", "Business Goal", "Strategic Vision"]}
                  />
                  <ExpandableField
                    name="social_links"
                    label="Socials / Work Links"
                    fields={["Primary Link", "Secondary Link", "Portfolio / Evidence"]}
                  />
                  <ExpandableField
                    name="other_area"
                    label="Other Interests"
                    fields={["Technical Focus", "Creative Area", "Miscellaneous"]}
                  />
                  <ExpandableField
                    name="reference_points"
                    label="Reference Points"
                    fields={["How you found me", "Similar Projects", "Key Influences"]}
                  />
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
