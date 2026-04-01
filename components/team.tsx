"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { CardStack } from "@/components/ui/card-stack";

const teamMembers = [
  {
    id: 0,
    icon: "👤",
    name: "Dami O'",
    designation: "Creator and Lead Engineer",
    content:
      "Edinburgh-based engineer and founder. Ships fast, builds in public, and coordinates the full agent stack.",
  },
  {
    id: 1,
    icon: "🦊",
    name: "Sule (Orchestrator)",
    designation: "Coordinates the team",
    content:
      "The glue of the team. Splits work across agents, tracks progress, enforces quality gates, and keeps every sprint on track.",
  },
  {
    id: 2,
    icon: "💻",
    name: "Frontend Dev",
    designation: "UI & Component Specialist",
    content:
      "Specialist in React, Next.js, and animation. Transforms designs into pixel-perfect, responsive interfaces with purposeful motion.",
  },
  {
    id: 3,
    icon: "⚙️",
    name: "Backend Dev",
    designation: "API & Service Specialist",
    content:
      "Builds robust APIs and infrastructure with Node, Python, Go, or Rust. Whatever the job needs, delivered cleanly and at scale.",
  },
  {
    id: 4,
    icon: "🔍",
    name: "QA Agent",
    designation: "Browser Testing & Bug Reporting",
    content:
      "Runs end-to-end browser tests, catches regressions, and reports bugs with clear steps to reproduce. Ships with confidence.",
  },
  {
    id: 5,
    icon: "🏗️",
    name: "Architect",
    designation: "System Design",
    content:
      "Thinks three steps ahead. Designs scalable systems, makes smart technology choices, and prevents technical debt before it starts.",
  },
];

// Map teamMembers to the CardStack card shape
const cards = teamMembers.map((m) => ({
  id: m.id,
  name: `${m.icon}  ${m.name}`,
  designation: m.designation,
  content: (
    <p className="text-base text-text-secondary leading-relaxed">{m.content}</p>
  ),
}));

export function Team() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="py-32 px-6 relative overflow-hidden border-t border-border-default/50"
      id="team"
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/4 left-0 w-[400px] h-[400px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <FadeIn delay={0} direction="up" once>
            <span className="text-xs font-mono text-accent uppercase tracking-widest mb-4 block">
              The Team
            </span>
          </FadeIn>
          <FadeIn delay={0.1} direction="up" once>
            <h2 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight mb-6">
              The team behind SuleClaw
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="up" once>
            <p className="text-lg text-text-secondary max-w-lg mx-auto">
              Humans and agents, working together. No silos, no hierarchy.
            </p>
          </FadeIn>
        </div>

        {/* Stacked card carousel — centered */}
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-sm mx-auto">
            <CardStack
              items={cards}
              offset={12}
              scaleFactor={0.06}
            />
          </div>

          {/* Team member dots indicator */}
          <div className="flex justify-center gap-2">
            {teamMembers.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="h-1.5 rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: i === activeIndex ? "24px" : "8px",
                  background:
                    i === activeIndex
                      ? "var(--accent)"
                      : "var(--border-default)",
                }}
                aria-label={`View ${teamMembers[i].name}`}
              />
            ))}
          </div>
        </div>

        {/* More agents note */}
        <FadeIn delay={0.4} direction="up" once>
          <p className="text-center text-sm text-text-muted font-mono mt-12">
            <span className="text-accent/60">+</span> and more specialized agents
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
