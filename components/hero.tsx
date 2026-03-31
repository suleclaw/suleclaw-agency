"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";

const headlineWords = ["You're", "one", "person.", "You", "have", "a", "company's", "worth", "of", "work."];
const subheadlineWords = ["What", "if", "you", "had", "a", "team", "—", "built", "for", "how", "you", "actually", "work?"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: -40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.06,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-24 px-6 overflow-hidden">
      {/* Enhanced ambient amber glow - more prominent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 35%, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.04) 40%, transparent 70%)",
        }}
      />
      
      {/* Secondary accent glow - top right */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />
      
      {/* Secondary accent glow - bottom left */}
      <div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Main Headline */}
        <h1 
          className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1] tracking-tight mb-8"
          style={{ perspective: "1000px" }}
        >
          {prefersReducedMotion ? (
            <span className="inline-flex flex-wrap justify-center gap-x-3">{headlineWords.join(" ")}</span>
          ) : (
            <motion.span
              className="inline-flex flex-wrap justify-center gap-x-3"
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
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          )}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed max-w-xl mx-auto mb-14">
          {prefersReducedMotion ? (
            <span className="inline-flex flex-wrap justify-center gap-x-2">{subheadlineWords.join(" ")}</span>
          ) : (
            <motion.span
              className="inline-flex flex-wrap justify-center gap-x-2"
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
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          )}
        </p>

        {/* CTA Button - Magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.0, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <Magnetic strength={0.2} className="inline-block">
            <Link
              href="#how-we-work"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 
                         bg-accent hover:bg-accent-hover text-text-inverse font-semibold text-base 
                         rounded-lg transition-all duration-200 
                         hover:scale-[1.03] active:scale-[0.98]
                         shadow-[0_0_30px_rgba(245,158,11,0.25)]
                         hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
              style={{
                boxShadow: "0 0 30px rgba(245,158,11,0.25)",
              }}
            >
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 rounded-lg overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </span>
              <span className="relative z-10">See how we work</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative z-10 group-hover:translate-y-0.5 transition-transform duration-200"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      {/* Divider with gradient fade */}
      <div className="absolute bottom-0 left-0 right-0">
        <div 
          className="h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #27272A 20%, #27272A 80%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
