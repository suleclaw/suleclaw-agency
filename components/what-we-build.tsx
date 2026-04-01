"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";

const stacks = [
  {
    category: "Product Team",
    tagline: "Building a SaaS, web app, or digital product",
    agents: ["Orchestrator", "Frontend Dev", "Backend Dev", "QA Agent", "Architect"],
    icon: "🚀",
  },
  {
    category: "Store Team",
    tagline: "Running an Etsy, Shopify, or e-commerce store",
    agents: ["Store Manager", "Product Lister", "Customer Response", "Analytics Agent"],
    icon: "🛒",
  },
  {
    category: "Growth Team",
    tagline: "Generating and qualifying leads for your business",
    agents: ["Lead Gen Agent", "Email Writer", "CRM Agent", "Follow-up Agent"],
    icon: "📈",
  },
  {
    category: "Content Team",
    tagline: "Running your social media and content consistently",
    agents: ["Social Media Manager", "Content Writer", "Scheduler", "Analytics Agent"],
    icon: "✍️",
  },
];

export function WhatWeBuild() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-border-default/50">
      {/* Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn delay={0} direction="up" once>
            <span className="text-xs font-mono text-accent uppercase tracking-widest mb-4 block">
              What we build
            </span>
          </FadeIn>
          <FadeIn delay={0.1} direction="up" once>
            <h2 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight mb-6">
              Spinning up the right team<br />
              <span className="text-text-secondary">for what you need</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="up" once>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              We can spin up agents for anything. These are some examples of the stacks we put together.
            </p>
          </FadeIn>
        </div>

        {/* Stack cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {stacks.map((stack, i) => (
            <FadeIn key={stack.category} delay={i * 0.1} direction="up" once>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -6, transition: { duration: 0.3 } }}
                className="group relative flex flex-col bg-bg-surface rounded-2xl p-8 h-full
                           border border-border-default/50 overflow-hidden
                           transition-all duration-500
                           hover:border-accent/30 hover:bg-bg-surface-hover
                           glow-border"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                {/* Icon */}
                <div className="text-4xl mb-5">{stack.icon}</div>

                {/* Category */}
                <h3 className="font-headline font-bold text-lg text-text-primary mb-2">
                  {stack.category}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-text-muted mb-6 leading-relaxed">
                  {stack.tagline}
                </p>

                {/* Divider */}
                <div className="h-px bg-border-default mb-5" />

                {/* Agent list */}
                <div className="space-y-2">
                  {stack.agents.map((agent) => (
                    <div key={agent} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                      <span className="text-xs font-mono text-text-secondary">{agent}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-bg-surface to-transparent pointer-events-none" />
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom note */}
        <FadeIn delay={0.5} direction="up" once>
          <p className="text-center mt-10 text-sm text-text-muted">
            Don&apos;t see your need?{" "}
            <span className="text-text-secondary">
              Tell us what you&apos;re working on — we&apos;ll assemble the right team.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
