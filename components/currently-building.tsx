"use client";

import { motion, useReducedMotion } from "motion/react";
import { SpotlightCard, projects } from "@/components/ui/spotlight-card";

export function CurrentlyBuilding() {
  return (
    <section
      className="py-32 px-6 relative overflow-hidden border-t border-border-default/50"
      id="projects"
    >
      <BackgroundDecoration />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader />
      </div>
      <CardCarousel />
    </section>
  );
}

function BackgroundDecoration() {
  return (
    <div
      className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20"
      style={{
        background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
  );
}

function SectionHeader() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="max-w-2xl mb-16">
      <motion.span
        className="text-xs font-mono text-accent uppercase tracking-widest mb-4 block"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Portfolio
      </motion.span>
      <motion.h2
        className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary
                   leading-tight mb-6"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        What we&apos;re building<br />
        <span className="text-text-secondary">right now</span>
      </motion.h2>
      <motion.p
        className="text-lg text-text-secondary"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Live projects with real code. We ship in public.
      </motion.p>
    </div>
  );
}

function CardCarousel() {
  return (
    <div className="relative z-10">
      <div
        className="flex gap-6 overflow-x-auto pb-4 px-6 snap-x snap-mandatory
                   [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"
      >
        <LeftSpacer />
        {projects.map((project, i) => (
          <div key={project.name} className="snap-center shrink-0 w-[360px]">
            <SpotlightCard project={project} index={i} />
          </div>
        ))}
        <div className="shrink-0 w-6" />
      </div>
    </div>
  );
}

function LeftSpacer() {
  return (
    <div className="shrink-0 w-[calc((100vw-1280px)/2-24px)] max-w-[1fr] hidden xl:block" />
  );
}
