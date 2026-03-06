"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// High-end placeholder images for the collage aesthetic
const IMAGES = [
  "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1529139574466-a303027c028b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1586528116311-ad8ed745efe3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541411438265-4cb4687110c2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create an array of 40 images for that "mad, infinite" background vibe
  const [collageImages, setCollageImages] = useState<any[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      src: IMAGES[i % IMAGES.length],
      left: Math.random() * 120 - 10 + "%",
      top: Math.random() * 400 + "%",
      width: Math.random() * 30 + 10 + "vw",
      rotation: Math.random() * 40 - 20,
      delay: Math.random() * 5,
      duration: Math.random() * 20 + 20,
      scaleStart: Math.random() * 0.5 + 0.8,
      blendMode: ["mix-blend-overlay", "mix-blend-exclusion", "mix-blend-lighten", "mix-blend-screen", "mix-blend-color-dodge"][i % 5],
      yParallax: (Math.random() - 0.5) * 1000,
    }));
    setCollageImages(arr);
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-[400vh] w-full bg-[#000] text-[#fff] font-sans overflow-hidden"
    >
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-50 mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* --- MAD INFINITE COLLAGE IMAGES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none h-full">
        {collageImages.map((img) => (
          <CollageImage
            key={img.id}
            img={img}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* --- CONTENT OVERLAYS --- */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full mx-auto px-6 max-w-[1400px]">

        {/* SECTION 1: HERO */}
        <section className="h-screen w-full flex flex-col justify-center items-start md:items-center py-24 mix-blend-exclusion pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "circOut" }}
            className="text-left md:text-center space-y-4 md:space-y-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[12rem] font-bold tracking-tighter leading-[0.8] text-white">
              My names <br className="hidden md:block" />
              <span className="font-serif italic text-white/90 font-light">Jahronimo</span>
            </h1>
            <p className="text-3xl md:text-6xl lg:text-7xl font-light tracking-tight mt-12 text-white/80">
              I’m looking for £50k
            </p>
            <p className="text-2xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-4 opacity-100">
              To build you things.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: MYSTERY */}
        <section className="h-screen w-full flex flex-col justify-center items-end md:items-center text-right md:text-center mix-blend-difference pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 100, skewX: 10 }}
            whileInView={{ opacity: 1, x: 0, skewX: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="space-y-6 md:space-y-12 backdrop-blur-sm"
          >
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter leading-none">
              But, I don’t say what….
            </h2>
            <p className="text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/80 uppercase">
              it’s Part of the fun of it…
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: VALUE FIRST */}
        <section className="h-screen w-full flex flex-col justify-center items-start md:items-center text-left md:text-center mix-blend-exclusion pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "anticipate" }}
            className="space-y-8 backdrop-invert bg-white/5 p-10 md:p-20 rounded-3xl"
          >
            <h3 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] max-w-5xl text-white">
              Value first, but I’m not going <br className="hidden md:block" /> to say..
            </h3>
            <p className="text-2xl md:text-6xl font-serif italic text-white/70 tracking-tight">
              and I need £50k for the project
            </p>
          </motion.div>
        </section>

        {/* SECTION 4: CTA BUTTON */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center relative">

          {/* Intense glitch background for final CTA */}
          <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-xl z-[-1]"></div>

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative group z-50 pointer-events-auto"
          >
            {/* Super Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-purple-500 to-white blur-2xl opacity-40 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 rounded-full animate-pulse"></div>

            <a
              href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center px-16 py-8 bg-white text-black text-3xl md:text-5xl font-black tracking-tighter rounded-full hover:bg-transparent hover:text-white border-4 border-transparent hover:border-white transition-all duration-300 transform group-active:scale-95 uppercase shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 mix-blend-difference text-white">Start the Project — £50k</span>
            </a>
          </motion.div>

          <footer className="absolute bottom-10 z-10 w-full text-center mix-blend-difference pointer-events-none">
            <motion.p
              className="text-white/40 text-xs md:text-sm tracking-[0.3em] uppercase font-sans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
            >
              Jahronimo © {new Date().getFullYear()} — Infinity Loop Output
            </motion.p>
          </footer>
        </section>
      </div>
    </main>
  );
}

// Complex parallax image component
function CollageImage({ img, scrollYProgress }: { img: any, scrollYProgress: MotionValue<number> }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, img.yParallax]);

  return (
    <motion.div
      style={{
        left: img.left,
        top: img.top,
        width: img.width,
        rotate: img.rotation,
        y: y,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.8, 1] }}
      transition={{
        duration: img.duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: img.delay
      }}
      className={`absolute ${img.blendMode} overflow-hidden pointer-events-none`}
    >
      <motion.img
        src={img.src}
        alt=""
        animate={{
          scale: [img.scaleStart, img.scaleStart * 1.5, img.scaleStart],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: img.duration * 1.5, repeat: Infinity, ease: "linear" }}
        className="w-full h-full object-cover filter grayscale contrast-150"
      />
    </motion.div>
  );
}
