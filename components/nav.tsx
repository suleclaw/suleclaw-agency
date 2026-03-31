"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";

const navLinks = [
  { href: "#how-we-work", label: "How We Work" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-base/80 backdrop-blur-xl border-b border-border-default"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-headline font-bold text-lg text-text-primary tracking-tight
                     hover:text-white transition-colors duration-200"
          >
            SuleClaw
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary 
                         transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent 
                               group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
            <Magnetic strength={0.15}>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-text-inverse 
                         font-semibold text-sm rounded-lg transition-all duration-200 
                         hover:scale-[1.02] active:scale-[0.98]
                         shadow-[0_0_20px_rgba(245,158,11,0.15)]
                         hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"
              >
                Contact Us
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary 
                     transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-lg pt-16 flex flex-col">
          <div className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-text-secondary hover:text-text-primary 
                         transition-colors duration-200 py-3 border-b border-border-default
                         hover:border-border-strong"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-6 px-5 py-3 bg-accent hover:bg-accent-hover text-text-inverse 
                       font-semibold text-sm rounded-lg text-center transition-all duration-200
                       shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
