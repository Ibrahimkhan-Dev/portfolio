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

export default function Home() {
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);

    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem(SCROLL_KEY);
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