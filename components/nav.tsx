"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeSwitcher } from "@/components/theme-switcher";

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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-bg-base/90 backdrop-blur-xl border-b border-border-default/50"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-headline font-bold text-xl tracking-tight text-text-primary
                     hover:text-accent transition-colors duration-300 relative group"
          >
            <span className="relative">
              Sule
              <span className="text-accent">Claw</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ThemeSwitcher />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary
                         transition-colors duration-200 relative group py-2"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 -skew-x-3 bg-accent/0 group-hover:bg-accent/10 transition-all duration-300 rounded-md" />
              </Link>
            ))}
            <Magnetic strength={0.12}>
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-text-inverse
                         font-semibold text-sm rounded-lg transition-all duration-300
                         hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]
                         hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact Us
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary
                     transition-colors duration-200 relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn(
                "h-0.5 bg-current transition-all duration-300 origin-left",
                mobileOpen ? "rotate-45 translate-y-[3px]" : ""
              )} />
              <span className={cn(
                "h-0.5 bg-current transition-all duration-300",
                mobileOpen ? "opacity-0 scale-x-0" : ""
              )} />
              <span className={cn(
                "h-0.5 bg-current transition-all duration-300 origin-left",
                mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""
              )} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg-base/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-6 p-8">
          <ThemeSwitcher />
          <div className="w-px h-6 bg-border-default" />
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-3xl font-headline font-bold text-text-secondary hover:text-text-primary
                       transition-colors duration-300 py-2"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)"
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-8 px-8 py-4 bg-accent hover:bg-accent-hover text-text-inverse
                     font-semibold text-base rounded-lg transition-all duration-300
                     shadow-[0_0_40px_rgba(245,158,11,0.3)]"
            style={{
              transitionDelay: mobileOpen ? "240ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)"
            }}
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
