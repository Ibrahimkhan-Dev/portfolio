import { motion } from "framer-motion";
import {
  GraduationCap,
  CheckCircle2,
  Award,
  ExternalLink,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { education, certifications } from "@/data/portfolio";
import { Reveal } from "@/components/ui/site-animations";

export default function Credentials() {
  const sortedCerts = [...certifications].sort(
    (a, b) => Number(b.year) - Number(a.year),
  );

  const sliderRef = React.useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = Math.max(340, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="credentials"
      className="py-12 sm:py-16 md:py-20 bg-[#080808] border-y border-white/5 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display mb-4 text-white uppercase italic">
            Credentials
          </h2>
          <div className="h-2 w-32 sm:w-40 bg-primary" />
        </Reveal>

        {/* ── Education ── */}
        <Reveal className="mb-4 sm:mb-6">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-primary/60">
            Education
          </span>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-12 mb-16 sm:mb-24 items-stretch">
          {education.map((item, idx) => (
            <Reveal key={item.id ?? String(idx)} delay={idx * 0.1} className="h-full">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-card border-2 border-white/5 p-6 sm:p-10 hover:border-primary transition-all group relative overflow-hidden cursor-pointer h-full flex flex-col">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <GraduationCap size={120} className="sm:w-[150px] sm:h-[150px]" />
                    </div>

                    <span className="text-primary font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs">
                      {item.period}
                    </span>

                    <h3 className="text-2xl sm:text-4xl font-black uppercase mt-3 sm:mt-4 text-white italic group-hover:text-primary transition-colors leading-none">
                      {item.institution}
                    </h3>

                    <p className="text-xl sm:text-2xl font-bold text-white/60 my-4 sm:my-6 tracking-tighter uppercase leading-none">
                      {item.degree}
                    </p>

                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                  </div>
                </DialogTrigger>

                <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white max-w-2xl rounded-none max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-4xl font-black uppercase italic text-primary">
                      {item.institution}
                    </DialogTitle>
                    <DialogDescription className="text-base sm:text-xl font-bold uppercase tracking-tight text-white/60">
                      {item.degree} | {item.period}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
                    <div className="p-4 sm:p-6 bg-white/5 border-l-4 border-primary italic">
                      <p className="text-base sm:text-xl text-white/80">{item.desc}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-xl sm:text-2xl font-black uppercase italic border-b border-white/10 pb-2">
                        Academic Highlights
                      </h4>
                      <ul className="space-y-3">
                        {(item.details ?? []).map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm sm:text-lg font-medium text-white/80"
                          >
                            <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={18} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>

        {/* ── Certifications ── */}
        <Reveal className="mb-4 sm:mb-6">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-primary/60">
            Certifications
          </span>
        </Reveal>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCards("left")}
            aria-label="Previous certifications"
            className="hidden md:flex items-center justify-center absolute -left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-20
                       h-16 w-12 bg-black/60 hover:bg-black/80 border border-white/10
                       text-white transition-all"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            type="button"
            onClick={() => scrollByCards("right")}
            aria-label="Next certifications"
            className="hidden md:flex items-center justify-center absolute -right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-20
                       h-16 w-12 bg-black/60 hover:bg-black/80 border border-white/10
                       text-white transition-all"
          >
            <ChevronRight size={26} />
          </button>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10" />

          <div
            ref={sliderRef}
            className="flex gap-6 sm:gap-8 overflow-x-scroll scroll-smooth pb-2 pr-2
                       snap-x snap-mandatory"
          >
            {sortedCerts.map((cert, index) => (
              <Reveal
                key={cert.id ?? String(index)}
                delay={index * 0.05}
                className="min-w-[280px] w-[280px] sm:min-w-[420px] sm:w-[420px] lg:min-w-[480px] lg:w-[480px] snap-start shrink-0"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="bg-card border-2 border-white/5 hover:border-primary p-5 sm:p-6 flex flex-col relative group cursor-pointer h-full"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
                        <Award size={48} className="text-primary" />
                      </div>

                      <div className="mb-3 flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Award size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 truncate">
                          {cert.issuer ?? "Certificate"}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black uppercase italic mb-1.5 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {cert.title}
                      </h3>

                      <p className="text-muted-foreground mb-3 sm:mb-4 flex-grow leading-snug text-xs sm:text-sm line-clamp-2">
                        {cert.description ?? ""}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase">
                          <Calendar size={14} />
                          {cert.year ?? ""}
                        </div>

                        <div className="p-1.5 bg-white/5 group-hover:bg-primary group-hover:text-black transition-all">
                          {cert.credentialUrl ? (
                            <ExternalLink size={16} />
                          ) : (
                            <Award size={16} />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </DialogTrigger>

                  <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white max-w-4xl rounded-none max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl sm:text-4xl font-black uppercase italic text-primary">
                        {cert.title}
                      </DialogTitle>
                      <DialogDescription className="text-base sm:text-xl font-bold uppercase tracking-tight text-white/60">
                        {(cert.issuer ?? "Certificate") +
                          (cert.year ? ` \u2022 ${cert.year}` : "")}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
                      <div className="p-4 sm:p-6 bg-white/5 border-l-4 border-primary italic">
                        <p className="text-base sm:text-xl text-white/80">
                          {cert.description ?? ""}
                        </p>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-xl sm:text-2xl font-black uppercase italic border-b border-white/10 pb-2">
                          Skills Validated
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {(cert.skills ?? []).map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center gap-3 text-sm sm:text-lg font-medium text-white/80 bg-white/5 p-2.5 sm:p-3"
                            >
                              <CheckCircle2 className="text-primary shrink-0" size={18} />
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>

                      {cert.credentialUrl && (
                        <div className="pt-4 sm:pt-6">
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-14 sm:h-16 bg-primary text-black font-black uppercase tracking-widest text-base sm:text-lg hover:scale-[1.02] transition-transform rounded-none flex items-center justify-center"
                          >
                            View Credential
                          </a>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
