"use client";

import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function About() {
  return (
    <section className="py-24 px-6 border-t border-border-default">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <FadeIn delay={0} direction="left" once>
            <div>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary leading-tight mb-6">
                Why SuleClaw exists
              </h2>
              <div className="space-y-5 text-base text-text-secondary leading-relaxed">
                <p>
                  I&apos;m Damilola — an engineer based in Edinburgh who got tired of
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
              <div className="mt-8 flex items-center gap-2.5 text-text-muted">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs uppercase tracking-wide">
                  Edinburgh, UK
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Decorative side */}
          <FadeIn delay={0.15} direction="right" once>
            <div className="hidden lg:flex items-center justify-center">
              {/* CSS geometric pattern */}
              <div
                className="relative w-72 h-72"
                aria-hidden="true"
              >
                {/* Grid lines */}
                <svg
                  width="288"
                  height="288"
                  viewBox="0 0 288 288"
                  fill="none"
                  className="absolute inset-0"
                >
                  {/* Vertical lines */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 48}
                      y1="0"
                      x2={i * 48}
                      y2="288"
                      stroke="#27272A"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Horizontal lines */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 48}
                      x2="288"
                      y2={i * 48}
                      stroke="#27272A"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Center accent circles */}
                  <circle
                    cx="144"
                    cy="144"
                    r="72"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    strokeOpacity="0.15"
                  />
                  <circle
                    cx="144"
                    cy="144"
                    r="48"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeOpacity="0.25"
                  />
                  <circle
                    cx="144"
                    cy="144"
                    r="24"
                    fill="#F59E0B"
                    fillOpacity="0.08"
                  />
                  {/* Corner accents */}
                  <rect x="0" y="0" width="48" height="48" fill="#F59E0B" fillOpacity="0.05" />
                  <rect x="240" y="240" width="48" height="48" fill="#F59E0B" fillOpacity="0.05" />
                  {/* Accent lines */}
                  <line x1="0" y1="0" x2="48" y2="48" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.2" />
                  <line x1="288" y1="0" x2="240" y2="48" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.2" />
                </svg>

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-headline font-bold text-5xl text-accent/15 select-none pointer-events-none">
                    SC
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
