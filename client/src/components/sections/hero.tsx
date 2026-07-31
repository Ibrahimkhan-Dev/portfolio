import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import {
  BadgePowerOn,
  BadgeIdlePulse,
  RawToCompiledName,
  StaggerIn,
  CTAButton,
  GlowBreath,
  HERO_T,
  isIntroPlayed,
} from "@/components/ui/site-animations";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-0 pb-24 pt-20"
    >
      <GlowBreath />

      <div className="container z-10 mx-auto px-4 text-center sm:px-6">
        <BadgeIdlePulse className="mb-6">
          <BadgePowerOn className="inline-block">
            <div className="inline-block rounded-sm bg-primary px-4 py-1 text-xs font-black uppercase tracking-widest text-black">
              Enterprise Full-Stack Developer
            </div>
          </BadgePowerOn>
        </BadgeIdlePulse>

        <div className="mb-6">
          <RawToCompiledName
            first="Muhammad"
            last="Ibrahim Khan"
            classNameCompiled="text-4xl sm:text-6xl md:text-9xl font-black font-display"
          />
        </div>

        <motion.p
          initial={{
            opacity: isIntroPlayed() ? 1 : 0,
            y: isIntroPlayed() ? 0 : 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: HERO_T.compileEnd,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mx-auto mb-8 max-w-3xl text-base font-medium italic leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg md:text-xl"
        >
          I build and modernize secure, scalable enterprise platforms across
          healthcare, pharmaceutical traceability, ERP, automation, IoT, and
          cloud-connected environments using .NET, Angular, SQL Server, and
          Flutter.
        </motion.p>

        <StaggerIn className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <CTAButton
            href="#projects"
            className="border-b-4 border-orange-900 bg-primary px-6 py-3 text-base font-black uppercase tracking-tighter text-black sm:px-10 sm:py-4 sm:text-lg"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("projects");
            }}
          >
            View Case Studies
          </CTAButton>

          <a
            href="/Muhammad-Ibrahim-Khan-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Muhammad Ibrahim Khan's resume in a new tab"
            className="group inline-flex items-center justify-center gap-2 border-2 border-white/30 px-6 py-3 text-base font-black uppercase tracking-tighter text-white transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-10 sm:py-4 sm:text-lg"
          >
            <FileText
              size={20}
              strokeWidth={2.5}
              aria-hidden="true"
              className="shrink-0"
            />

            <span>View Resume</span>
          </a>

          <CTAButton
            href="#contact"
            className="border-2 border-primary px-6 py-3 text-base font-black uppercase tracking-tighter text-primary transition-all hover:bg-primary hover:text-black sm:px-10 sm:py-4 sm:text-lg"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contact");
            }}
            showArrow={false}
          >
            Contact Me
          </CTAButton>
        </StaggerIn>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to contact section"
        onClick={() => scrollToSection("contact")}
        initial={{
          opacity: isIntroPlayed() ? 1 : 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={
          isIntroPlayed()
            ? { duration: 0 }
            : {
                delay: HERO_T.polishEnd,
                duration: 0.5,
              }
        }
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer border-0 bg-transparent p-2 text-primary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <ArrowDown
            size={32}
            strokeWidth={3}
            aria-hidden="true"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}