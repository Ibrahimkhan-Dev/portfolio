import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail } from "lucide-react";
import {
  BadgePowerOn,
  BadgeIdlePulse,
  TypingLine,
  RawToCompiledName,
  StaggerIn,
  CTAButton,
  GlowBreath,
  CodeEditorFloat,
  HERO_T,
  isIntroPlayed,
} from "@/components/ui/site-animations";

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-black"
    >
      <GlowBreath />

      <div className="container mx-auto px-4 sm:px-6 z-10 text-center">
        <BadgeIdlePulse className="mb-6">
          <BadgePowerOn className="inline-block">
            <div className="inline-block px-4 py-1 rounded-sm bg-primary text-black text-xs font-black uppercase tracking-widest">
              Software Developer
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

        <TypingLine
          text="From real-world problems to scalable systems, I build software where automation and reliability matter."
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-medium italic"
        />

        <CodeEditorFloat className="my-6 sm:my-8" />

        <StaggerIn className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <CTAButton
            href="#projects"
            className="px-6 py-3 sm:px-10 sm:py-4 bg-primary text-black font-black text-base sm:text-lg uppercase tracking-tighter border-b-4 border-orange-900"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Projects
          </CTAButton>

          <CTAButton
            href="#contact"
            className="px-6 py-3 sm:px-10 sm:py-4 border-2 border-primary text-primary font-black text-base sm:text-lg uppercase tracking-tighter hover:bg-primary hover:text-black transition-all"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            showArrow={false}
          >
            Get In Touch
          </CTAButton>
        </StaggerIn>

        <StaggerIn
          className="mt-12 sm:mt-16 flex justify-center items-center gap-8 text-muted-foreground"
          start={HERO_T.ctaStart + 2 * 0.06}
        >
          <a
            href="https://www.linkedin.com/in/muhammad-ibrahim-khan-8022a7375"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-primary transition-colors"
          >
            <Linkedin size={28} />
          </a>

          <a
            href="mailto:ibrahimkhanwork7@gmail.com"
            aria-label="Send email"
            className="hover:text-primary transition-colors"
          >
            <Mail size={28} />
          </a>
        </StaggerIn>
      </div>

      <motion.div
        initial={{ opacity: isIntroPlayed() ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={isIntroPlayed() ? { duration: 0 } : { delay: HERO_T.polishEnd, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={32} strokeWidth={3} />
        </motion.div>
      </motion.div>
    </section>
  );
}
