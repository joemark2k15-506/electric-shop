"use client";

import React from "react";
import { LazyMotion, domMax, m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // next/navigation hook - works in app router

  return (
    <LazyMotion features={domMax}>
      <AnimatePresence mode="wait" initial={false}>
        <m.main
          key={pathname}
          initial={{ opacity: 0, y: 6, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.995 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {children}
        </m.main>
      </AnimatePresence>
    </LazyMotion>
  );
}
