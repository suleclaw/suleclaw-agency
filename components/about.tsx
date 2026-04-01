"use client";

import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { motion, useReducedMotion } from "framer-motion";

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-border-default/50">
      {/* Background decorations */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side - asymmetric layout */}
          <FadeIn delay={0} direction="left" once>
            <div className="relative">
              {/* Decorative element */}
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />

              <span className="text-xs font-mono text-accent uppercase tracking-widest mb-6 block">
                About
              </span>

              <h2 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight mb-8">
                Why SuleClaw<br />
                <span className="text-text-secondary">exists</span>
              </h2>

              <div className="space-y-6 text-base text-text-secondary leading-relaxed">
                <p>
                  I&apos;m Dami O&apos; — an engineer based in Edinburgh who got tired of
                  building the same things over and over. Every solo founder has the
                  same problem: too many hats, too few hours.
                </p>
                <p>
                  SuleClaw started as an experiment: what if I built a team of AI agents
                  that worked the way I think? Not generic assistants, but a coordinated
                  stack — orchestrator, engineer, designer, QA — each specialized,
                  all communicating.
                </p>
                <p>
                  The result is faster shipping, cleaner code, and a process that actually
                  makes sense. I use it myself, and now I&apos;m opening it up.
                </p>
              </div>

              {/* Location */}
              <div className="mt-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider block">
                    Based in
                  </span>
                  <span className="font-headline font-semibold text-text-primary">
                    Edinburgh, UK
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Decorative side */}
          <FadeIn delay={0.15} direction="right" once>
            <div className="hidden lg:flex items-center justify-center">
              {/* CSS geometric pattern - more sophisticated */}
              <div
                className="relative w-80 h-80"
                aria-hidden="true"
              >
                {/* Outer ring */}
                <motion.svg
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  fill="none"
                  className="absolute inset-0"
                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    stroke="#27272A"
                    strokeWidth="1"
                    strokeDasharray="8 8"
                  />
                </motion.svg>

                {/* Inner rings */}
                <svg
                  width="280"
                  height="280"
                  viewBox="0 0 280 280"
                  fill="none"
                  className="absolute inset-5"
                >
                  <circle
                    cx="140"
                    cy="140"
                    r="120"
                    stroke="#27272A"
                    strokeWidth="1"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r="90"
                    stroke="#27272A"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r="60"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeOpacity="0.3"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r="30"
                    fill="#F59E0B"
                    fillOpacity="0.08"
                  />
                </svg>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l border-t border-accent/20" />
                <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-accent/20" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-l border-b border-accent/20" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-accent/20" />

                {/* Diagonal lines */}
                <svg
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  fill="none"
                  className="absolute inset-0"
                >
                  <line x1="0" y1="0" x2="80" y2="80" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.2" />
                  <line x1="320" y1="0" x2="240" y2="80" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.2" />
                  <line x1="0" y1="320" x2="80" y2="240" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.2" />
                  <line x1="320" y1="320" x2="240" y2="240" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.2" />
                </svg>

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-headline font-bold text-6xl text-accent/20 select-none pointer-events-none">
                    SC
                  </span>
                </div>

                {/* Floating dots */}
                <motion.div
                  className="absolute top-8 right-12 w-2 h-2 rounded-full bg-accent/40"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-12 left-8 w-1.5 h-1.5 rounded-full bg-accent/30"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
