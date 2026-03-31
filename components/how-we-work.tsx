"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";
import { motion, useReducedMotion } from "framer-motion";

const workflowStages = [
  {
    stage: "THINK",
    name: "Understand & Clarify",
    description:
      "We start by deeply understanding your problem, your constraints, and your goals. No assumptions — just questions.",
  },
  {
    stage: "PLAN-CEO",
    name: "Strategic Planning",
    description:
      "The orchestrator agent breaks down the work into phases, priorities, and dependencies. Clear milestones, no ambiguity.",
  },
  {
    stage: "PLAN-ENG",
    name: "Technical Design",
    description:
      "The engineer agent writes the technical spec — file structure, APIs, components, and approach. Code review before code.",
  },
  {
    stage: "BUILD",
    name: "Parallel Execution",
    description:
      "Frontend, backend, and QA agents work simultaneously. Each agent owns their domain but shares context constantly.",
  },
  {
    stage: "REVIEW",
    name: "Human-in-the-Loop",
    description:
      "You review key decisions and deliverables. Dami checks architecture, agent outputs, and overall coherence.",
  },
  {
    stage: "QA",
    name: "Automated + Manual Testing",
    description:
      "Browser testing, edge cases, performance checks. Bugs get caught before they reach you.",
  },
  {
    stage: "SHIP",
    name: "Deploy & Iterate",
    description:
      "Production-ready code, deployed. You're looped in at every step, not just the finish line.",
  },
];

export function HowWeWork() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-border-default/50" id="how-we-work">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <FadeIn delay={0} direction="up" once>
            <span className="text-xs font-mono text-accent uppercase tracking-widest mb-4 block">
              Process
            </span>
          </FadeIn>
          <FadeIn delay={0.1} direction="up" once>
            <h2 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight mb-6">
              Radically transparent.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="up" once>
            <p className="text-xl text-text-secondary">
              Here&apos;s our process. Seven stages. No black boxes. You always know what&apos;s happening and why.
            </p>
          </FadeIn>
        </div>

        {/* Accordion */}
        <FadeIn delay={0.3} direction="up" once>
          <Accordion className="space-y-3" defaultValue={["THINK"]}>
            {workflowStages.map((item, index) => (
              <motion.div
                key={item.stage}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.4 + index * 0.05,
                  duration: 0.5,
                }}
              >
                <AccordionItem
                  value={item.stage}
                  className="relative bg-bg-surface rounded-xl overflow-hidden
                           border border-border-default/50
                           transition-all duration-300 ease-out
                           data-[state=open]:border-l-2 data-[state=open]:border-l-accent
                           data-[state=open]:bg-bg-surface-hover
                           data-[state=open]:shadow-[0_0_40px_rgba(245,158,11,0.05)]"
                >
                  <AccordionTrigger className="hover:no-underline hover:bg-transparent px-6 py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-left w-full pr-4">
                      <span className="inline-flex items-center gap-2">
                        <span className="font-mono text-xs text-accent uppercase tracking-widest min-w-[100px]">
                          {item.stage}
                        </span>
                        <span className="hidden sm:inline text-text-muted">—</span>
                      </span>
                      <span className="font-headline font-bold text-lg text-text-primary">
                        {item.name}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pl-0 sm:pl-[116px]">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </AccordionContent>

                  {/* Expand indicator */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
                               border border-border-default flex items-center justify-center
                               data-[state=open]:border-accent data-[state=open]:bg-accent/10
                               transition-all duration-300">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="text-text-muted data-[state=open]:text-accent transition-colors duration-300"
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
