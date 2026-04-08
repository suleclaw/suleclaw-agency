"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";

const headlineWords = ["You're", "one", "person.", "You", "have", "a", "company's", "worth", "of", "work."];
const subheadlineWords = ["What", "if", "you", "had", "a", "team", "built", "for", "how", "you", "actually", "work?"];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

export function HeroContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <EyebrowLabel prefersReducedMotion={prefersReducedMotion} />
      <Headline prefersReducedMotion={prefersReducedMotion} />
      <Subheadline prefersReducedMotion={prefersReducedMotion} />
      <CTAButton prefersReducedMotion={prefersReducedMotion} />
      <ScrollIndicator prefersReducedMotion={prefersReducedMotion} />
    </>
  );
}

export { headlineWords, subheadlineWords, wordVariants, containerVariants };

function EyebrowLabel({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
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
  );
}

function Headline({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
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
            <motion.span key={i} variants={wordVariants} custom={i} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.span>
      )}
    </h1>
  );
}

function Subheadline({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <motion.p
      className="text-xl sm:text-2xl md:text-3xl text-text-secondary leading-relaxed
                 max-w-2xl mx-auto mb-14"
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
  );
}

function CTAButton({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-24 sm:mt-28 md:mt-36"
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
          <CTAShimmer />
          <span className="relative z-10">See how we work</span>
          <ScrollArrow />
        </Link>
      </Magnetic>
    </motion.div>
  );
}

function CTAShimmer() {
  return (
    <span className="absolute inset-0 rounded-xl overflow-hidden">
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                       transition-transform duration-1000 ease-out
                       bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </span>
  );
}

function ScrollArrow() {
  return (
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
  );
}

function ScrollIndicator({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
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
  );
}
