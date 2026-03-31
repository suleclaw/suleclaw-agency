import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { CurrentlyBuilding } from "@/components/currently-building";
import { Team } from "@/components/team";
import { HowWeWork } from "@/components/how-we-work";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <CurrentlyBuilding />
        <Team />
        <HowWeWork />
        <About />
      </main>
      <Footer />
    </>
  );
}
