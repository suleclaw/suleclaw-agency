"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const themes = [
  {
    id: "industrial",
    label: "Industrial",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
        <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "paper",
    label: "Paper",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="3.5" y1="4.5" x2="10.5" y2="4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="3.5" y1="7" x2="10.5" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="3.5" y1="9.5" x2="7.5" y2="9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <polyline points="3,5 6,7 3,9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="7" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "neon",
    label: "Neon",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <circle cx="7" cy="7" r="3" fill="currentColor" />
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="7" y1="1" x2="7" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="7" y1="11" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="1" y1="7" x2="3" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="11" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 bg-bg-surface border border-border-default rounded-lg p-1">
        {themes.map((t) => (
          <div key={t.id} className="w-8 h-8 rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-bg-surface border border-border-default rounded-lg p-1">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
            theme === t.id
              ? "bg-accent text-text-inverse shadow-sm"
              : "text-text-muted hover:text-text-secondary hover:bg-bg-surface-hover"
          )}
          title={t.label}
        >
          {t.icon}
          <span className="hidden lg:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
