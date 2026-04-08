"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
  started: string;
}

export const projects: Project[] = [
  {
    name: "AI VR",
    description:
      "AI-powered phone receptionist for UK small businesses. Handles calls, books appointments, never misses a lead.",
    tech: ["AI", "Voice", "UK Business", "Calendars"],
    url: "https://ai-vr.vercel.app",
    started: "April 2026",
  },
  {
    name: "BuildWare",
    description:
      "AI website builder — describe your business, watch it build in real-time. From chat to launch in minutes.",
    tech: ["AI", "Next.js", "No-Code", "Web Builder"],
    url: "https://build-ware.vercel.app",
    started: "April 2026",
  },
  {
    name: "WQC",
    description:
      "Smart website quote calculator for agencies. Configurable pricing tiers, add-ons, and instant client quotes.",
    tech: ["Next.js", "Stripe", "Pricing", "Calculator"],
    url: "https://wqc.vercel.app",
    started: "March 2026",
  },
  {
    name: "SuleClaw Agency",
    description:
      "This site — an AI agent team that builds and ships products in public. The process is the proof.",
    tech: ["Next.js", "AI Agents", "Workflow", "Docs"],
    url: "https://suleclaw-agency.vercel.app",
    started: "March 2026",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};
export function SpotlightCard({ project, index }: { project: Project; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      variants={prefersReducedMotion ? {} : cardVariants}
      custom={index}
      className="group relative"
    >
      <Spotlight
        className="relative bg-bg-surface rounded-2xl overflow-hidden
                   border border-border-default/50 transition-all duration-500"
        color="rgba(245, 158, 11, 0.15)"
        panelClassName="rounded-2xl"
      >
        <CornerAccent />
        <div className="relative z-10 p-8">
          <CardHeader project={project} />
          <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg">
            {project.description}
          </p>
          <CardFooter project={project} />
        </div>
        <GlowBorder />
      </Spotlight>
    </motion.div>
  );
}

function CornerAccent() {
  return (
    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-accent/40 to-transparent" />
      <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-accent/40 to-transparent" />
    </div>
  );
}
function CardHeader({ project }: { project: Project }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="font-headline font-bold text-xl text-text-primary mb-1
                       transition-colors duration-300">
          {project.name}
        </h3>
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
          {project.started}
        </span>
      </div>
    </div>
  );
}

function CardFooter({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <TechBadges project={project} />
      <ViewLink project={project} />
    </div>
  );
}

function TechBadges({ project }: { project: Project }) {
  return (
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
  );
}
function ViewLink({ project }: { project: Project }) {
  return (
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
        <GitHubIcon />
      ) : (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200
                                group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      )}
    </Link>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234
               c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729
               1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604
               -2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176
               0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404
               2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221
               0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576
               C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function GlowBorder() {
  return (
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
  );
}
