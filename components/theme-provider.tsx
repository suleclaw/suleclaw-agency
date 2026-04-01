"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="paper"
      enableSystem={false}
      disableTransitionOnChange={false}
      themes={["industrial", "paper", "terminal", "neon"]}
    >
      {children}
    </NextThemesProvider>
  );
}
