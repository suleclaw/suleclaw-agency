"use client";

import Link from "next/link";

export function ContactNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-base/90 backdrop-blur-xl border-b border-border-default/50">
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
      </div>
    </nav>
  );
}
