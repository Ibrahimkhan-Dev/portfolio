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

const SCROLL_KEY = "portfolio_scroll_y";
const SCROLL_TO_PROJECTS_KEY = "portfolio_scroll_to_projects";

export default function Home() {
  useEffect(() => {
    const scrollToProjects = sessionStorage.getItem(SCROLL_TO_PROJECTS_KEY);
    if (scrollToProjects) {
      sessionStorage.removeItem(SCROLL_TO_PROJECTS_KEY);
      const el = document.getElementById("projects");
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    } else {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved) {
        window.scrollTo(0, parseInt(saved, 10));
        sessionStorage.removeItem(SCROLL_KEY);
      }
    }

    return () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
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