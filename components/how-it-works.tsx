"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Users, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell us what you're building",
    description:
      "Share your idea, your workflow, your pain points. We listen first — deeply.",
  },
  {
    number: "02",
    icon: Users,
    title: "We assemble a team",
    description:
      "Our agent stack assigns specialized AI agents to your project — frontend, backend, QA, and more.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "You ship faster",
    description:
      "Parallel agent work means your project moves at startup speed without the startup headcount.",
  },
];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="how-it-works">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header - asymmetric layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight">
              How it works
            </h2>
          </motion.div>

          <motion.p
            className="text-lg text-text-secondary max-w-md lg:text-right"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Three steps from idea to execution — no overhead, no bureaucracy.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.2 + i * 0.15,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1] as const,
                }}
                className="relative group"
              >
                {/* Card background */}
                <div className="relative bg-bg-surface rounded-2xl p-8 lg:p-10
                             border border-border-default/50 overflow-hidden
                             transition-all duration-500 ease-out
                             hover:border-accent/30 hover:bg-bg-surface-hover
                             hover:shadow-[0_0_60px_rgba(245,158,11,0.08)]
                             glow-border">

                  {/* Large decorative number */}
                  <span className="deco-number absolute top-4 right-6">
                    {step.number}
                  </span>

                  {/* Icon container */}
                  <div className="relative z-10 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center
                                  border border-accent/20
                                  transition-all duration-300
                                  group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:scale-105">
                      <Icon className="w-8 h-8 text-accent transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-headline font-bold text-xl text-text-primary mb-3
                                 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent
                               group-hover:via-accent/40 transition-all duration-500" />
                </div>

                {/* Connector line between cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border-default z-20">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/50" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
