import CustomCursor from "@/components/ui/custom-cursor";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Education from "@/components/sections/education";
import Certifications from "@/components/sections/certifications";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
