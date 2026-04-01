"use client";

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

export function Team() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-border-default/50" id="team">
      {/* Background decoration */}
      <div
        className="absolute top-1/4 left-0 w-[400px] h-[400px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
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

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.08} direction="up" once>
              <motion.div
                whileHover={prefersReducedMotion ? {} : {
                  y: -8,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                className="group relative"
                style={{
                  transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                  zIndex: index,
                }}
              >
                <div className="relative bg-bg-surface rounded-2xl p-8
                             border border-border-default/50 overflow-hidden
                             transition-all duration-500 ease-out
                             hover:border-accent/30 hover:bg-bg-surface-hover
                             glow-border corner-brackets">

                  {/* Pile effect - shadow layers behind */}
                  {index > 0 && (
                    <div
                      className="absolute inset-0 rounded-2xl bg-bg-surface border border-border-default/30"
                      style={{
                        transform: `translateY(${index * -4}px) translateX(${index * 2}px) rotate(${index * 0.5}deg)`,
                        zIndex: -1,
                      }}
                    />
                  )}
                  {index > 1 && (
                    <div
                      className="absolute inset-0 rounded-2xl bg-bg-surface border border-border-default/20"
                      style={{
                        transform: `translateY(${index * -8}px) translateX(${index * 4}px) rotate(${index * 0.5}deg)`,
                        zIndex: -2,
                      }}
                    />
                  )}

                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className="absolute top-2 left-2 w-4 h-px bg-accent/0 group-hover:bg-accent/50 transition-all duration-500" />
                    <div className="absolute top-2 left-2 w-px h-4 bg-accent/0 group-hover:bg-accent/50 transition-all duration-500" />
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {member.icon}
                  </div>

                  {/* Name */}
                  <h3 className="font-headline font-bold text-lg text-text-primary mb-1
                               transition-colors duration-300">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {member.description}
                  </p>

                  {/* Bottom line accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border-default to-transparent
                               group-hover:via-accent/30 transition-all duration-500" />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* More agents note */}
        <FadeIn delay={0.5} direction="up" once>
          <p className="text-center mt-12 text-sm text-text-muted font-mono">
            <span className="text-accent/60">+</span> and 4 more specialized agents
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
