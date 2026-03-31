"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

const projects = [
  {
    name: "Algos Mastery",
    description: "Local-first LeetCode study app with 83% test coverage. Built with React + Vercel.",
    tech: ["React", "TypeScript", "Vercel", "Testing"],
    url: "https://algos-mastery.vercel.app",
    started: "March 2026",
  },
  {
    name: "Local Notion",
    description: "Your notes, your server. A privacy-first Notion clone — your data stays on your machine.",
    tech: ["Next.js", "SQLite", "Node.js", "Privacy"],
    url: "https://github.com/oracleot/my-local-notion",
    started: "March 2026",
  },
];

function SpotlightCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.12,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      }}
      className="group relative"
    >
      <Spotlight
        className="relative bg-bg-surface rounded-2xl overflow-hidden
                   border border-border-default/50 transition-all duration-500"
        color="rgba(245, 158, 11, 0.15)"
        panelClassName="rounded-2xl"
      >
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-accent/40 to-transparent" />
          <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-accent/40 to-transparent" />
        </div>

        {/* Content padding */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-headline font-bold text-xl text-text-primary mb-1
                           transition-colors duration-300 group-hover:text-white">
                {project.name}
              </h3>
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                {project.started}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg">
            {project.description}
          </p>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wide
                           text-text-secondary bg-bg-subtle
                           border border-border-default rounded-md
                           group-hover:border-border-strong group-hover:text-text-primary
                           transition-all duration-200"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* View link */}
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-accent/10 border border-accent/20 text-accent
                       hover:bg-accent hover:text-text-inverse
                       transition-all duration-300 text-sm font-medium
                       group/link"
            >
              <span>View</span>
              {project.url.includes("github.com") ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              ) : (
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              )}
            </Link>
          </div>
        </div>

        {/* Glow border effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                     transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, transparent 50%, rgba(245,158,11,0.05) 100%)",
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />
      </Spotlight>
    </motion.div>
  );
}

export function CurrentlyBuilding() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-border-default/50" id="projects">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
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
            className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight mb-6"
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

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <SpotlightCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
