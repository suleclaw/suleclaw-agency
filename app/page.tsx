import { Nav } from "@/components/nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { WhatWeBuild } from "@/components/what-we-build";
import { HowWeWork } from "@/components/how-we-work";
import { About } from "@/components/about";
import { Team } from "@/components/team";
import { CurrentlyBuilding } from "@/components/currently-building";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <ThemeSwitcher />
      <main>
        <Hero />
        <HowItWorks />
        <WhatWeBuild />
        <HowWeWork />
        <About />
        <Team />
        <CurrentlyBuilding />
      </main>
      <Footer />
    </>
  );
}
