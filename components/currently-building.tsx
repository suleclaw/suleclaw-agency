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
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.15,
        duration: 0.5,
      }}
      className="group relative"
    >
      <Spotlight
        className="relative bg-bg-surface border border-border-default rounded-xl p-6 
                   transition-all duration-300 ease-out
                   group-hover:border-border-strong group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                   group-hover:translate-y-[-2px]"
        color="rgba(245, 158, 11, 0.12)"
        panelClassName="rounded-xl"
      >
        {/* Glow border on hover */}
        <div 
          className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, transparent 50%, rgba(245,158,11,0.05) 100%)",
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <h3 className="font-semibold text-lg text-text-primary">{project.name}</h3>
          <span className="font-mono text-xs text-text-muted">{project.started}</span>
        </div>

        {/* Description */}
        <p className="relative z-10 text-sm text-text-secondary leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between">
          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs font-mono uppercase tracking-wide 
                         text-text-secondary border border-border-default rounded-md 
                         group-hover:border-border-strong group-hover:text-text-primary 
                         transition-all duration-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link */}
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium 
                     text-accent hover:text-accent-hover transition-colors duration-200 
                     group/link"
          >
            {project.url.includes("github.com") ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-200 group-hover/link:scale-110">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            ) : (
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            )}
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </Link>
        </div>
      </Spotlight>
    </motion.div>
  );
}

export function CurrentlyBuilding() {
  return (
    <section className="py-24 px-6 border-t border-border-default" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary leading-tight mb-4">
            What we&apos;re building right now
          </h2>
          <p className="text-lg text-text-secondary max-w-lg mx-auto">
            Live projects with real code. We ship in public.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <SpotlightCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
