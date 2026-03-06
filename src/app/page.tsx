"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Local path reference using basePath to fix the blank page issue
const BASE_PATH = "/fiftyk-offer";

// The local images provided from the chat
const LOCAL_IMAGES = [
  "img2.JPG", "img3.JPG", "img4.JPG", "img5.JPG",
  "img6.JPG", "img8.JPG", "img10.JPG", "img11.JPG",
  "img12.JPG", "img14.JPG", "img15.JPG", "img16.JPG",
  "img17.JPG", "img18.JPG", "img19.JPG", "img20.JPG", "img21.JPG"
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create an array of 50 images for that "mad, infinite" background vibe
  const [collageImages, setCollageImages] = useState<any[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      src: `${BASE_PATH}/${LOCAL_IMAGES[i % LOCAL_IMAGES.length]}`,
      // Extreme randomness for layout
      left: Math.random() * 150 - 25 + "%",
      top: Math.random() * 450 - 50 + "%",
      width: Math.random() * 40 + 15 + "vw",
      rotation: Math.random() * 90 - 45,
      delay: Math.random() * 5,
      duration: Math.random() * 25 + 15,
      scaleStart: Math.random() * 0.8 + 0.5,
      // Aggressive luxury blend modes
      blendMode: ["mix-blend-overlay", "mix-blend-exclusion", "mix-blend-difference", "mix-blend-hard-light", "mix-blend-screen"][i % 5],
      yParallax: (Math.random() - 0.5) * 1500,
    }));
    setCollageImages(arr);
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-[400vh] w-full bg-[#030303] text-[#fff] font-sans overflow-hidden"
    >
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-50 mix-blend-overlay"
        style={{ backgroundImage: `url("${BASE_PATH}/noise.svg")` }}></div>

      {/* --- MAD INFINITE COLLAGE IMAGES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none h-full w-full">
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
        <section className="h-screen w-full flex flex-col justify-center items-start md:items-center py-24 mix-blend-exclusion pointer-events-none perspective-[2000px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 30, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
            transition={{ duration: 2.5, ease: "circOut" }}
            className="text-left md:text-center space-y-4 md:space-y-6"
          >
            <h1 className="text-[5rem] md:text-8xl lg:text-[14rem] font-bold tracking-tighter leading-[0.8] text-white">
              My names <br className="hidden md:block" />
              <span className="font-serif italic text-white/90 font-light">Jahronimo</span>
            </h1>
            <p className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight mt-12 text-white/80">
              I’m looking for £50k
            </p>
            <p className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mt-4 opacity-100 text-[#ff3333]">
              To build you things.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: MYSTERY */}
        <section className="h-screen w-full flex flex-col justify-center items-end md:items-center text-right md:text-center mix-blend-difference pointer-events-none perspective-[1000px]">
          <motion.div
            initial={{ opacity: 0, x: 200, rotateX: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            className="space-y-6 md:space-y-12 backdrop-blur-sm"
          >
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif italic tracking-tighter leading-none">
              But, I don’t say what….
            </h2>
            <p className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase opacity-70">
              it’s Part of the fun of it…
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: VALUE FIRST */}
        <section className="h-screen w-full flex flex-col justify-center items-start md:items-center text-left md:text-center mix-blend-exclusion pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 2, ease: "anticipate" }}
            className="space-y-8 backdrop-invert bg-white/10 p-10 md:p-20 rounded-[4rem] border border-white/20"
          >
            <h3 className="text-5xl md:text-8xl lg:text-[11rem] font-bold tracking-tighter leading-[0.85] max-w-7xl text-white">
              Value first, <br className="hidden md:block" /> but I’m not going <br className="hidden md:block" /> to say..
            </h3>
            <p className="text-3xl md:text-6xl lg:text-8xl font-serif italic text-[#33ffaa] tracking-tight">
              and I need £50k for the project
            </p>
          </motion.div>
        </section>

        {/* SECTION 4: CTA BUTTON */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center relative">

          {/* Intense glitch background for final CTA */}
          <div className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-3xl z-[-1]"></div>

          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="relative group z-50 pointer-events-auto"
          >
            {/* Super Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 via-purple-500 to-yellow-500 blur-3xl opacity-60 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 animate-pulse rounded-[5rem]"></div>

            <a
              href="https://buy.stripe.com/5kQ00iepe6YDghffFKdjO00"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center px-12 py-10 md:px-24 md:py-16 bg-white text-black text-4xl md:text-6xl font-black tracking-tighter hover:bg-black hover:text-white border-8 border-transparent hover:border-white transition-all duration-500 transform group-hover:scale-105 group-active:scale-95 shadow-2xl rounded-sm"
              style={{ borderRadius: "50% 20% / 10% 40%" }}
            >
              <span className="relative z-10 leading-none">START THE PROJECT <br /><span className="text-3xl md:text-5xl font-serif italic opacity-70">£50k</span></span>
            </a>
          </motion.div>

          <footer className="absolute bottom-10 z-10 w-full text-center mix-blend-exclusion pointer-events-none">
            <motion.p
              className="text-white/60 text-xs md:text-sm tracking-[0.4em] uppercase font-sans font-bold"
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

// Intense parallax image component
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
      animate={{ opacity: [0, 1, 0.4, 0.9] }}
      transition={{
        duration: img.duration,
        repeat: Infinity,
        repeatType: "mirror",
        delay: img.delay
      }}
      className={`absolute ${img.blendMode} overflow-hidden pointer-events-none drop-shadow-2xl`}
    >
      <motion.img
        src={img.src}
        alt=""
        animate={{
          scale: [img.scaleStart, img.scaleStart * 1.8, img.scaleStart],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: img.duration * 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full object-cover filter contrast-[1.2] saturate-[1.5] brightness-90"
      />
    </motion.div>
  );
}
