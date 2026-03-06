"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// High-end placeholder images for the collage aesthetic
const IMAGES = [
  "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?auto=format&fit=crop&q=80&w=800", // Dark Architecture
  "https://images.unsplash.com/photo-1529139574466-a303027c028b?auto=format&fit=crop&q=80&w=800", // Editorial Fashion
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", // Abstract Texture
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800", // Brutalist
  "https://images.unsplash.com/photo-1586528116311-ad8ed745efe3?auto=format&fit=crop&q=80&w=800", // Typographic Print
  "https://images.unsplash.com/photo-1541411438265-4cb4687110c2?auto=format&fit=crop&q=80&w=800", // B&W Minimal
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800", // Dark Landscape
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800", // Studio Space
];

// Helper to calculate random parallax rates based on index
const ParallaxImage = ({
  src,
  scrollYProgress,
  index,
  className,
}: {
  src: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  className: string;
}) => {
  // Variations for parallax direction and speed
  const yRange = index % 2 === 0 ? [100, -200] : [-50, 150];
  const rotRange = index % 3 === 0 ? [-2, 4] : [3, -3];

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const rotate = useTransform(scrollYProgress, [0, 1], rotRange);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <motion.div
      style={{ y, rotate, scale }}
      className={`absolute overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src={src}
        alt={`Collage Image ${index}`}
        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-110 opacity-70 hover:opacity-100 mix-blend-lighten grayscale hover:grayscale-0"
      />
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={containerRef}
      className="relative min-h-[400vh] w-full bg-[#030303] text-[#F3F3F3] selection:bg-white selection:text-black font-sans"
    >
      {/* Background Noise Texture (Subtle) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* --- COLLAGE IMAGES (SCATTERED ACROSS THE SCROLL) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen z-0 perspective-1000">
        <ParallaxImage src={IMAGES[0]} index={0} scrollYProgress={scrollYProgress} className="w-[30vw] h-[45vh] top-[5%] left-[5%] md:w-[22vw] md:h-[50vh] z-0" />
        <ParallaxImage src={IMAGES[1]} index={1} scrollYProgress={scrollYProgress} className="w-[40vw] h-[30vh] top-[15%] right-[5%] md:w-[25vw] md:h-[40vh] md:right-[10%] z-0" />
        <ParallaxImage src={IMAGES[2]} index={2} scrollYProgress={scrollYProgress} className="w-[50vw] h-[40vh] top-[40%] left-[-10%] md:w-[30vw] md:h-[55vh] md:left-[2%] z-0" />
        <ParallaxImage src={IMAGES[3]} index={3} scrollYProgress={scrollYProgress} className="w-[35vw] h-[50vh] top-[50%] right-[-5%] md:w-[20vw] md:h-[60vh] md:right-[5%] z-0" />
        <ParallaxImage src={IMAGES[4]} index={4} scrollYProgress={scrollYProgress} className="w-[45vw] h-[35vh] top-[75%] left-[15%] md:w-[28vw] md:h-[45vh] md:left-[30%] z-0" />
        <ParallaxImage src={IMAGES[5]} index={5} scrollYProgress={scrollYProgress} className="w-[30vw] h-[40vh] top-[85%] right-[15%] md:w-[24vw] md:h-[50vh] md:right-[20%] z-0" />
      </div>

      {/* --- CONTENT OVERLAYS --- */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full mx-auto px-6 max-w-[1400px]">

        {/* SECTION 1: HERO */}
        <section className="h-screen w-full flex flex-col justify-center items-start md:items-center py-24 mix-blend-difference">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="text-left md:text-center space-y-4 md:space-y-6"
          >
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] text-white">
              My names <br className="hidden md:block" />
              <span className="font-serif italic text-white/90">Jahronimo</span>
            </h1>
            <p className="text-3xl md:text-6xl lg:text-7xl font-light tracking-tight mt-12 text-white/80">
              I’m looking for £50k
            </p>
            <p className="text-2xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-4 opacity-90">
              To build you things.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: MYSTERY */}
        <section className="min-h-screen w-full flex flex-col justify-center items-end md:items-center text-right md:text-center mix-blend-exclusion relative">
          <ParallaxImage src={IMAGES[6]} index={6} scrollYProgress={scrollYProgress} className="w-[80vw] h-[40vh] md:w-[40vw] md:h-[50vh] top-1/4 left-1/2 -translate-x-1/2 z-[-1] opacity-40 mix-blend-screen pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.2 }}
            className="space-y-6 md:space-y-12"
          >
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif italic tracking-tighter leading-none">
              But, I don’t say what….
            </h2>
            <p className="text-2xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/70">
              it’s Part of the fun of it…
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: VALUE FIRST */}
        <section className="min-h-screen w-full flex flex-col justify-center items-start md:items-center text-left md:text-center mix-blend-difference">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.5 }}
            className="space-y-8"
          >
            <h3 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight max-w-4xl">
              Value first, but I’m not going <br className="hidden md:block" /> to say..
            </h3>
            <p className="text-3xl md:text-5xl font-light text-white/60 tracking-tight">
              and I need £50k for the project
            </p>
          </motion.div>
        </section>

        {/* SECTION 4: CTA BUTTON */}
        <section className="min-h-[70vh] w-full flex flex-col justify-center items-center pb-32">
          <ParallaxImage src={IMAGES[7]} index={7} scrollYProgress={scrollYProgress} className="w-[100vw] h-[60vh] bottom-0 left-0 z-[-1] opacity-30 mix-blend-overlay pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/0 blur-lg transition duration-1000 group-hover:duration-200 group-hover:from-white/40 group-hover:to-white/10 group-hover:blur-2xl rounded-full"></div>

            <a
              href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center px-12 py-6 bg-white text-black text-2xl md:text-4xl font-bold tracking-tight rounded-full hover:bg-[#f0f0f0] transition-colors duration-300 transform group-active:scale-95"
            >
              Start the Project — £50k
            </a>
          </motion.div>

          {/* Minimal footer branding */}
          <motion.div
            className="absolute bottom-10 text-white/30 text-sm tracking-widest uppercase font-sans"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            Jahronimo © {new Date().getFullYear()} — Experimental Offer
          </motion.div>
        </section>
      </div>
    </main>
  );
}
