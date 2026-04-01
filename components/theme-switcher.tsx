"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const themes = [
  {
    id: "industrial",
    label: "Industrial Noir",
    swatch: "#F59E0B",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" fill="#F59E0B" />
        <rect x="9" y="1" width="6" height="6" rx="1" fill="#F59E0B" opacity="0.4" />
        <rect x="1" y="9" width="6" height="6" rx="1" fill="#F59E0B" opacity="0.4" />
        <rect x="9" y="9" width="6" height="6" rx="1" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    id: "paper",
    label: "Paper & Ink",
    swatch: "#1A1A1A",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="2" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
        <line x1="4" y1="5" x2="12" y2="5" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="4" y1="8" x2="12" y2="8" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="4" y1="11" x2="8" y2="11" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    swatch: "#00FF41",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="1" stroke="#00FF41" strokeWidth="1.5" fill="none" />
        <polyline points="3.5,5.5 7,8 3.5,10.5" stroke="#00FF41" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="8.5" y1="10.5" x2="12.5" y2="10.5" stroke="#00FF41" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "neon",
    label: "Neon Midnight",
    swatch: "#00F5FF",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3.5" fill="#00F5FF" />
        <circle cx="8" cy="8" r="7" stroke="#FF0080" strokeWidth="1" opacity="0.6" />
        <line x1="8" y1="1" x2="8" y2="3" stroke="#00F5FF" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="8" y1="13" x2="8" y2="15" stroke="#00F5FF" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="1" y1="8" x2="3" y2="8" stroke="#00F5FF" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="13" y1="8" x2="15" y2="8" stroke="#00F5FF" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  if (!mounted) return null;

  const active = themes.find((t) => t.id === theme);

  return (
    <div ref={ref} className="relative">
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch theme"
        className={cn(
          "fixed right-4 top-1/2 -translate-y-1/2 z-40",
          "flex items-center justify-center w-10 h-10 rounded-full",
          "bg-bg-surface/90 backdrop-blur-md border border-border-default",
          "shadow-lg transition-all duration-200",
          "hover:border-border-strong hover:shadow-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        )}
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <span className="transition-transform duration-200" style={{ transform: open ? "rotate(30deg)" : "rotate(0deg)" }}>
          {active?.icon}
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "fixed right-4 top-1/2 -translate-y-1/2 z-50",
          "w-52 rounded-xl overflow-hidden",
          "bg-bg-surface/95 backdrop-blur-xl border border-border-default",
          "shadow-[var(--shadow-card-hover)]",
          "transition-all duration-200 origin-right",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
        style={{ marginTop: "calc(1.25rem + 24px)", boxShadow: "var(--shadow-card-hover)" }}
      >
        <div className="px-3 py-2 border-b border-border-default">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest font-mono">Theme</p>
        </div>
        <div className="p-1.5">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "text-sm font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                theme === t.id
                  ? "bg-accent text-text-inverse"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover"
              )}
            >
              <span
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{ background: theme === t.id ? "rgba(0,0,0,0.2)" : "var(--bg-subtle)" }}
              >
                {t.icon}
              </span>
              <span className="flex-1 text-left">{t.label}</span>
              {theme === t.id && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
