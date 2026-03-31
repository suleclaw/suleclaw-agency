"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";

const teamMembers = [
  {
    icon: "👤",
    name: "Damilola",
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

export function Team() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 border-t border-border-default" id="team">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} direction="up" once>
          <div className="text-center mb-16">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary leading-tight mb-4">
              The team behind SuleClaw
            </h2>
            <p className="text-lg text-text-secondary max-w-lg mx-auto">
              Humans and agents, working together. No silos, no hierarchy.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.08} direction="up" once>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="bg-bg-surface border border-border-default rounded-xl p-6 text-center
                         transition-all duration-300 ease-out
                         hover:border-border-strong hover:bg-bg-surface-hover
                         hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                         group"
              >
                {/* Icon */}
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {member.icon}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-base text-text-primary mb-1
                             transition-colors duration-300 group-hover:text-white">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
                  {member.role}
                </p>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
