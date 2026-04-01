"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";

const teamMembers = [
  {
    icon: "👤",
    name: "Dami O'",
    role: "Founder & Lead Engineer",
    description: "Edinburgh-based engineer. Builds in public, ships fast.",
  },
  {
    icon: "🦊",
    name: "Sule (Orchestrator)",
    role: "Coordinates the team",
    description: "Manages workflow, assigns tasks, keeps everything on track.",
  },
  {
    icon: "💻",
    name: "Frontend Dev",
    role: "UI & Component Specialist",
    description: "React, Next.js, animations. Makes interfaces feel alive.",
  },
  {
    icon: "⚙️",
    name: "Backend Dev",
    role: "API & Service Specialist",
    description: "Node, Python, Go, Rust. Whatever the job needs.",
  },
  {
    icon: "🔍",
    name: "QA Agent",
    role: "Browser Testing & Bug Reporting",
    description: "Catches what slips through. Writes it up clearly.",
  },
  {
    icon: "🏗️",
    name: "Architect",
    role: "System Design",
    description: "Thinks three steps ahead. Keeps systems coherent.",
  },
];

const VISIBLE = 3;
const OFFSET = 14;
const SCALE_FACTOR = 0.05;
const INTERVAL_MS = 3500;

function TeamCard({
  member,
  index,
  total,
}: {
  member: (typeof teamMembers)[0];
  index: number;
  total: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 w-full"
      style={{ zIndex: total - index }}
      animate={{
        top: index * OFFSET,
        scale: 1 - index * SCALE_FACTOR,
        opacity: index >= VISIBLE ? 0 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="relative w-full h-full rounded-2xl p-8 overflow-hidden
                     bg-bg-surface border border-border-default/50
                     transition-all duration-500
                     hover:border-accent/30 hover:bg-bg-surface-hover
                     glow-border"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
          <div className="absolute top-2 left-2 w-4 h-px bg-accent/30" />
          <div className="absolute top-2 left-2 w-px h-4 bg-accent/30" />
        </div>

        {/* Icon */}
        <div className="text-5xl mb-5">{member.icon}</div>

        {/* Name + Role */}
        <h3 className="font-headline font-bold text-xl text-text-primary mb-1">
          {member.name}
        </h3>
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
          {member.role}
        </p>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {member.description}
        </p>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
      </div>
    </motion.div>
  );
}

function TeamCardStack({
  current,
  onAdvance,
}: {
  current: number;
  onAdvance: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      onAdvance();
    }, INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prefersReducedMotion, onAdvance]);

  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-[200px]">
        <TeamCard member={teamMembers[0]} index={0} total={1} />
      </div>
    );
  }

  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    return (current + i) % teamMembers.length;
  });

  return (
    <div className="relative w-full h-[220px]">
      {visible.map((memberIdx, stackIdx) => (
        <TeamCard
          key={teamMembers[memberIdx].name}
          member={teamMembers[memberIdx]}
          index={VISIBLE - 1 - stackIdx}
          total={VISIBLE}
        />
      ))}
    </div>
  );
}

export function Team() {
  const [current, setCurrent] = useState(0);

  const handleAdvance = () => {
    setCurrent((c) => (c + 1) % teamMembers.length);
  };

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

        {/* Stacked card carousel */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-sm mx-auto">
            <TeamCardStack current={current} onAdvance={handleAdvance} />
          </div>
        </div>

        {/* Team member dots indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {teamMembers.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                background:
                  i === current
                    ? "var(--accent)"
                    : "var(--border-default)",
              }}
            />
          ))}
        </div>

        {/* More agents note */}
        <FadeIn delay={0.4} direction="up" once>
          <p className="text-center text-sm text-text-muted font-mono">
            <span className="text-accent/60">+</span> and more specialized agents
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
