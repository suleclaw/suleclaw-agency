"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";

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
  return (
    <section className="py-24 px-6 border-t border-border-default" id="how-we-work">
      <div className="max-w-3xl mx-auto">
        <FadeIn delay={0} direction="up" once>
          <div className="mb-12">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary leading-tight mb-4">
              Radically transparent.
              <br />
              <span className="text-text-secondary">Here&apos;s our process.</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Seven stages. No black boxes. You always know what&apos;s happening and why.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} direction="up" once>
          <Accordion className="space-y-2">
            {workflowStages.map((item) => (
              <AccordionItem
                key={item.stage}
                value={item.stage}
                className="bg-bg-surface border border-border-default rounded-lg px-4 
                         data-[state=open]:border-l-2 data-[state=open]:border-l-accent 
                         data-[state=open]:bg-bg-surface-hover
                         transition-all duration-300 ease-out"
              >
                <AccordionTrigger className="hover:no-underline hover:bg-transparent py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left w-full pr-4">
                    <span className="font-mono text-xs text-accent uppercase tracking-widest min-w-[100px]">
                      {item.stage}
                    </span>
                    <span className="font-headline font-bold text-lg text-text-primary">
                      {item.name}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-text-secondary leading-relaxed pl-0 sm:pl-[116px]">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
