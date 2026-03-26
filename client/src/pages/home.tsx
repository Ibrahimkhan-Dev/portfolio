import { useEffect } from "react";
import CustomCursor from "@/components/ui/custom-cursor";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Credentials from "@/components/sections/credentials";
import Contact from "@/components/sections/contact";
import { BackgroundFX, TerminalBoot } from "@/components/ui/site-animations";

const SCROLL_TO_PROJECTS_KEY = "portfolio_scroll_to_projects";
const SCROLL_TO_SECTION_KEY = "portfolio_scroll_to_section";

export default function Home() {
  useEffect(() => {
    const sectionId =
      sessionStorage.getItem(SCROLL_TO_SECTION_KEY) ||
      (sessionStorage.getItem(SCROLL_TO_PROJECTS_KEY) ? "projects" : null);

    sessionStorage.removeItem(SCROLL_TO_SECTION_KEY);
    sessionStorage.removeItem(SCROLL_TO_PROJECTS_KEY);

    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <TerminalBoot />

      <CustomCursor />
      <BackgroundFX />
      <Navbar />

      <main>
        <Hero />
        <Experience />
        <Projects />
        <Credentials />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}