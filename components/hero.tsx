"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

const headlineWords = ["You're", "one", "person.", "You", "have", "a", "company's", "worth", "of", "work."];
const subheadlineWords = ["What", "if", "you", "had", "a", "team", "—", "built", "for", "how", "you", "actually", "work?"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.06,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.5,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-24 px-6 overflow-hidden">
      {/* Ambient amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FAFAFA] leading-[1.1] tracking-tight mb-8">
          {prefersReducedMotion ? (
            <span>{headlineWords.join(" ")}</span>
          ) : (
            <motion.span
              className="inline-flex flex-wrap justify-center gap-x-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {headlineWords.map((word, i) => (
                <motion.span key={i} variants={wordVariants} custom={i}>
                  {word}
                </motion.span>
              ))}
            </motion.span>
          )}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#A1A1AA] leading-relaxed max-w-xl mx-auto mb-12">
          {prefersReducedMotion ? (
            subheadlineWords.join(" ")
          ) : (
            <motion.span
              className="inline-flex flex-wrap justify-center gap-x-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {subheadlineWords.map((word, i) => (
                <motion.span key={i} variants={wordVariants} custom={i + headlineWords.length}>
                  {word}
                </motion.span>
              ))}
            </motion.span>
          )}
        </p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <Link
            href="#how-we-work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A0A0B] font-semibold text-base rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
          >
            See how we work
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-y-0.5 transition-transform"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#27272A]" />
    </section>
  );
}
