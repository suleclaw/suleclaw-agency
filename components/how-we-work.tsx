"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="py-24 px-6 border-t border-[#27272A]" id="how-we-work">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAFAFA] leading-tight">
            Radically transparent.
            <br />
            <span className="text-[#A1A1AA]">Here&apos;s our process.</span>
          </h2>
          <p className="mt-4 text-lg text-[#A1A1AA]">
            Seven stages. No black boxes. You always know what&apos;s happening and why.
          </p>
        </div>

        <Accordion className="space-y-2">
          {workflowStages.map((item) => (
            <AccordionItem
              key={item.stage}
              value={item.stage}
              className="bg-[#111113] border border-[#27272A] rounded-lg px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#F59E0B] data-[state=open]:bg-[#18181B]"
            >
              <AccordionTrigger className="hover:no-underline hover:bg-transparent py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left w-full pr-4">
                  <span className="font-mono text-xs text-[#F59E0B] uppercase tracking-widest min-w-[100px]">
                    {item.stage}
                  </span>
                  <span className="font-headline font-bold text-lg text-[#FAFAFA]">
                    {item.name}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm text-[#A1A1AA] leading-relaxed pl-0 sm:pl-[116px]">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
