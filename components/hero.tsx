"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroContent } from "@/components/hero-content";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AtmosphericBackground />
      <FloatingGeometricAccents prefersReducedMotion={prefersReducedMotion} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <HeroContent />
      </div>
      <BottomDivider />
    </section>
  );
}

function AtmosphericBackground() {
  return (
    <div className="absolute inset-0 bg-bg-base">
      <div
        className="atmosphere-glow absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 40%, transparent 70%)",
        }}
      />
      <div
        className="atmosphere-glow absolute bottom-1/4 right-1/4 w-[400px] h-[400px]"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="atmosphere-glow absolute top-1/3 left-1/4 w-[300px] h-[300px]"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="noise-overlay opacity-[0.025]" />
    </div>
  );
}

function FloatingGeometricAccents({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <>
      <motion.div
        className="absolute top-32 right-[15%] w-16 h-16 border border-border-default/50 rotate-45"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[10%] w-8 h-8 border border-accent/30 rotate-12"
        animate={prefersReducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 right-[8%] w-4 h-4 bg-accent/20 rounded-full"
        animate={prefersReducedMotion ? {} : { y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function BottomDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="section-divider" />
    </div>
  );
}
