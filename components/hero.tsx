"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";

const headlineWords = ["You're", "one", "person.", "You", "have", "a", "company's", "worth", "of", "work."];
const subheadlineWords = ["What", "if", "you", "had", "a", "team", "built", "for", "how", "you", "actually", "work?"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.05,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 bg-bg-base">
        {/* Primary amber glow - top center */}
        <div
          className="atmosphere-glow absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 40%, transparent 70%)",
          }}
        />

        {/* Secondary glow - bottom right */}
        <div
          className="atmosphere-glow absolute bottom-1/4 right-1/4 w-[400px] h-[400px]"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Tertiary glow - top left corner */}
        <div
          className="atmosphere-glow absolute top-1/3 left-1/4 w-[300px] h-[300px]"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Noise grain overlay */}
        <div className="noise-overlay opacity-[0.025]" />
      </div>

      {/* Floating geometric accents */}
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                         bg-bg-surface border border-border-default text-xs font-mono
                         text-text-secondary uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            AI Agent Teams for Founders
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1
          className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary
                   leading-[1.05] tracking-tight mb-10"
          style={{ perspective: "1000px" }}
        >
          {prefersReducedMotion ? (
            <span className="inline-flex flex-wrap justify-center gap-x-4 gap-y-2">{headlineWords.join(" ")}</span>
          ) : (
            <motion.span
              className="inline-flex flex-wrap justify-center gap-x-4 gap-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  custom={i}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          )}
        </h1>

        {/* Sub-headline */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: 0.6 }}
        >
          {prefersReducedMotion ? (
            <span className="inline-flex flex-wrap justify-center gap-x-3">{subheadlineWords.join(" ")}</span>
          ) : (
            <motion.span
              className="inline-flex flex-wrap justify-center gap-x-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {subheadlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  custom={i + headlineWords.length}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          )}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10"
        >
          <Magnetic strength={0.25} className="inline-block">
            <Link
              href="#how-we-work"
              className="group relative inline-flex items-center gap-3 px-8 py-4
                         bg-accent hover:bg-accent-hover text-text-inverse font-semibold text-base
                         rounded-xl transition-all duration-300
                         shadow-[0_0_50px_rgba(245,158,11,0.25)]
                         hover:shadow-[0_0_70px_rgba(245,158,11,0.4)]
                         hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10">See how we work</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative z-10 group-hover:translate-y-1 transition-transform duration-300"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>

              {/* Shimmer effect */}
              <span className="absolute inset-0 rounded-xl overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                               transition-transform duration-1000 ease-out
                               bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </span>
            </Link>
          </Magnetic>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 2, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <motion.div
              className="w-5 h-8 rounded-full border border-border-default flex justify-center pt-1.5"
              animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-1 h-1.5 rounded-full bg-accent" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider" />
      </div>
    </section>
  );
}
