// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Slide {
//   id: number;
//   badge: string;
//   title: string;
//   highlight: string;
//   desc: string;
//   btn: string;
//   img: string;
// }

// const slides: Slide[] = [
//   {
//     id: 1,
//     badge: "30 YEARS OF QUALITY",
//     title: "The Convenience",
//     highlight: "You Deserve",
//     desc: "Premium modular switches and accessories designed for the modern home. Safety meets style.",
//     btn: "Explore Products",
//     img: "https://placehold.co/800x800/transparent/333?text=Switch+Board+PNG",
//   },
//   {
//     id: 2,
//     badge: "UNPARALLELED STRENGTH",
//     title: "Leading With",
//     highlight: "Quality Pipes",
//     desc: "Durable PVC conduits and casing solutions that ensure your wiring stays protected for decades.",
//     btn: "View Catalog",
//     img: "https://placehold.co/600x800/transparent/333?text=PVC+Pipe+Stack+PNG",
//   },
//   {
//     id: 3,
//     badge: "SMART ILLUMINATION",
//     title: "Life Just Got",
//     highlight: "Brighter",
//     desc: "Energy-efficient LED solutions for indoor and outdoor spaces. Light up your world.",
//     btn: "Shop Lights",
//     img: "https://placehold.co/800x600/transparent/333?text=LED+Bulb+PNG",
//   },
// ];

// const HeroSlider: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative h-[500px] w-full overflow-hidden bg-white flex items-center justify-center border-b">
//       {/* Decorative Pixels */}
//       <div className="absolute top-10 left-10 w-4 h-4 bg-[#ff5100] opacity-60 animate-bounce" />
//       <div className="absolute bottom-20 right-20 w-8 h-8 bg-[#ff5100] opacity-40 animate-pulse" />
//       <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#ff5100] opacity-20" />

//       <AnimatePresence mode="wait">
//         {/* We use <any> to fix the TypeScript error you were seeing */}
//         <motion.div
//           key={currentIndex}
//           // @ts-ignore
//           className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 max-w-7xl mx-auto"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Text Section */}
//           <div className="flex-1 z-10 text-center md:text-left mt-10 md:mt-0">
//             <motion.span
//               // @ts-ignore
//               className="block text-sm font-bold text-gray-500 mb-2 tracking-wider"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               {slides[currentIndex].badge}
//             </motion.span>
            
//             <motion.h1
//               // @ts-ignore
//               className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-4 uppercase"
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               {slides[currentIndex].title} <br />
//               <span className="text-[#ff5100]">{slides[currentIndex].highlight}</span>
//             </motion.h1>

//             <motion.p
//               // @ts-ignore
//               className="text-gray-600 text-lg mb-6 max-w-md mx-auto md:mx-0"
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               {slides[currentIndex].desc}
//             </motion.p>

//             <motion.button
//               // @ts-ignore
//               className="px-8 py-3 bg-[#ff5100] text-white font-semibold rounded hover:bg-orange-700 transition-colors"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               {slides[currentIndex].btn}
//             </motion.button>
//           </div>

//           {/* Image Section */}
//           <div className="flex-1 h-[300px] md:h-[450px] w-full flex items-center justify-center relative">
//              <motion.img
//                 // @ts-ignore
//                 src={slides[currentIndex].img}
//                 alt="Product"
//                 className="w-full h-full object-contain drop-shadow-2xl"
//                 initial={{ x: 50, opacity: 0, scale: 0.9 }}
//                 animate={{ x: 0, opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.4, duration: 0.8 }}
//              />
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Dots Navigation */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentIndex === idx ? "bg-[#ff5100] scale-125" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroSlider;


"use client";

import React, { useEffect, useRef, useState } from "react";
import { LazyMotion, domMax, m, AnimatePresence } from "framer-motion";

type Slide = {
  id: number;
  badge: string;
  title: string;
  highlight: string;
  desc: string;
  btn: string;
  img: string;
};

const slides: Slide[] = [
  {
    id: 1,
    badge: "30 YEARS OF QUALITY",
    title: "The Convenience",
    highlight: "You Deserve",
    desc: "Premium modular switches designed with advanced safety, style, and long-lasting performance.",
    btn: "Explore Products",
    img: "https://placehold.co/800x800/transparent/333?text=Switch+Board",
  },
  {
    id: 2,
    badge: "ENGINEERED FOR STRENGTH",
    title: "Leading with",
    highlight: "Quality Pipes",
    desc: "High-grade PVC conduits and protective casing built for decades of reliability.",
    btn: "View Catalog",
    img: "https://placehold.co/700x850/transparent/333?text=PVC+Pipes",
  },
  {
    id: 3,
    badge: "SMART ILLUMINATION",
    title: "Light Up",
    highlight: "Your World",
    desc: "Energy-efficient LED lighting crafted for premium homes and modern spaces.",
    btn: "Shop Lights",
    img: "https://placehold.co/750x650/transparent/333?text=LED+Bulb",
  },
];

const TOTAL_PARTICLES = 18;

export default function HeroSliderPremium() {
  const [current, setCurrent] = useState(0);
  const [particles, setParticles] = useState<
    { top: number; left: number; dx: number; dy: number; dur: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate particles only on client
  useEffect(() => {
    const arr = Array.from({ length: TOTAL_PARTICLES }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      dx: (Math.random() - 0.5) * 20,
      dy: (Math.random() - 0.5) * 20,
      dur: 3 + Math.random() * 2,
    }));
    setParticles(arr);
  }, []);

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Pointer / parallax
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPointer({
        x: (e.clientX - cx) / (rect.width / 2),
        y: (e.clientY - cy) / (rect.height / 2),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <LazyMotion features={domMax}>
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] max-w-full mx-auto rounded-3xl overflow-hidden select-none"
      >
        {/* Backdrop */}
        <m.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,241,230,0.01))",
          }}
        />

        {/* Particles */}
        {particles.map((p, i) => (
          <m.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ top: `${p.top}%`, left: `${p.left}%`, background: "linear-gradient(90deg,#ff8a3d,#ff5100)" }}
            animate={{ x: [0, p.dx, 0], y: [0, p.dy, 0], opacity: [0.15, 1, 0.15], scale: [0.8, 1.4, 0.9] }}
            transition={{ duration: p.dur, repeat: Infinity, repeatType: "mirror" }}
          />
        ))}

        <AnimatePresence mode="wait">
          <m.div
            key={current}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-6 md:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Text */}
            <div className="flex-1 z-10 text-center md:text-left">
              <m.span
                className="inline-block mb-3 px-4 py-1 text-xs font-semibold tracking-wider rounded-full bg-white/4 text-[#ff5100]"
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {slides[current].badge}
              </m.span>

              <m.h2
                className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {slides[current].title} <br />
                <span className="text-[#ff5100]">{slides[current].highlight}</span>
              </m.h2>

              <m.p
                className="mt-4 max-w-full sm:max-w-lg text-slate-200 text-sm sm:text-base"
                initial={{ x: -25, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                {slides[current].desc}
              </m.p>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-4">
                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#ff8a3d] to-[#ff5100] text-white font-semibold shadow-xl"
                >
                  {slides[current].btn}
                </m.button>
                <m.a className="text-sm text-white/80">Learn more →</m.a>
              </div>
            </div>

            {/* Product card */}
            <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
              <m.div
                className="relative w-full max-w-[90%] sm:max-w-[480px] h-0 pb-[100%] rounded-2xl backdrop-blur-md border border-white/5 shadow-2xl overflow-hidden"
                style={{ perspective: 1200 }}
                animate={{
                  rotateY: pointer.x * 15,
                  rotateX: -pointer.y * 15,
                  translateX: pointer.x * 20,
                  translateY: pointer.y * 15,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
              >
                <m.div className="absolute inset-0 rounded-2xl pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                  <div style={{ position: "absolute", inset: -140, background: "radial-gradient(600px 200px at 20% 30%, rgba(255,136,61,0.06), transparent)" }} />
                </m.div>

                <m.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-xl"
                  initial={{ y: 30, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 110, damping: 18 }}
                >
                  <m.img src={slides[current].img} alt="product" className="w-full h-full object-contain" draggable={false} />
                </m.div>
              </m.div>
            </div>
          </m.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, idx) => (
            <m.button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                current === idx ? "w-12 bg-gradient-to-r from-[#ff8a3d] to-[#ff5100] shadow-[0_0_18px_rgba(255,81,0,0.18)]" : "w-3 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}
