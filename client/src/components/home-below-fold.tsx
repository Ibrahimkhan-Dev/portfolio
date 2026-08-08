import Contact from "@/components/sections/contact";
import Credentials from "@/components/sections/credentials";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";

export default function HomeBelowFold() {
  return (
    <>
      <Experience />
      <Projects />
      <Credentials />
      <Skills />
      <Contact />
    </>
  );
}
