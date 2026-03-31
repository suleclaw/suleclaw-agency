"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Users, Rocket } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

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
    <section className="py-24 px-6 border-t border-border-default" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} direction="up" once>
          <div className="text-center mb-16">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary leading-tight mb-4">
              How it works
            </h2>
            <p className="text-lg text-text-secondary max-w-lg mx-auto">
              Three steps from idea to execution — no overhead, no bureaucracy.
            </p>
          </div>
        </FadeIn>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: prefersReducedMotion ? 0 : i * 0.15,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1] as const,
                }}
                className="relative bg-bg-surface border border-border-default rounded-xl p-8 
                         transition-all duration-300 ease-out
                         hover:border-border-strong hover:bg-bg-surface-hover
                         hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                         hover:translate-y-[-2px]
                         group"
              >
                {/* Large background number */}
                <span
                  className="absolute top-4 left-6 font-headline font-bold text-7xl text-accent/10 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 mb-6 mt-8">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center
                                transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-105">
                    <Icon className="w-7 h-7 text-accent transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative z-10 font-semibold text-lg text-text-primary mb-2
                             transition-colors duration-300 group-hover:text-white">
                  {step.title}
                </h3>
                <p className="relative z-10 text-sm text-text-secondary leading-relaxed
                            transition-colors duration-300">
                  {step.description}
                </p>

                {/* Bottom accent line on hover */}
                <div 
                  className="absolute bottom-0 left-8 right-8 h-0.5 bg-accent/0 group-hover:bg-accent/30 transition-all duration-300 rounded-full"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
