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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 border-t border-[#27272A]" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAFAFA] leading-tight">
            How it works
          </h2>
          <p className="mt-4 text-lg text-[#A1A1AA] max-w-lg mx-auto">
            Three steps from idea to execution — no overhead, no bureaucracy.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: prefersReducedMotion ? 0 : i * 0.15,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="relative bg-[#111113] border border-[#27272A] rounded-xl p-8 card-hover group"
              >
                {/* Large background number */}
                <span
                  className="absolute top-4 left-6 font-headline font-bold text-6xl text-[#F59E0B]/10 select-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 mb-6 mt-8">
                  <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative z-10 font-semibold text-lg text-[#FAFAFA] mb-2">
                  {step.title}
                </h3>
                <p className="relative z-10 text-sm text-[#A1A1AA] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
