"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

interface TextAnimateProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  perWord?: boolean;
}

export function TextAnimate({
  text,
  className,
  delay = 0,
  wordDelay = 0.06,
  perWord = true,
}: TextAnimateProps) {
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(/(\s+)/);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: prefersReducedMotion ? 0 : delay,
        staggerChildren: prefersReducedMotion ? 0 : wordDelay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className || ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
    >
      {perWord
        ? words.map((word, i) => (
            <span
              key={i}
              className="inline-block"
              style={{ display: word.match(/^\s+$/) ? "inline" : "inline-block" }}
            >
              {word.match(/^\s+$/) ? (
                word
              ) : (
                <motion.span
                  className="inline-block"
                  variants={wordVariants}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              )}
            </span>
          ))
        : text.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={wordVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
    </motion.span>
  );
}
