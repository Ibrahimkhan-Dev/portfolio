import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  Calendar,
  CheckCircle2,
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
import { certifications } from "@/data/portfolio";

export default function Certifications() {
  const sortedCerts = [...certifications].sort(
    (a, b) => Number(b.year) - Number(a.year)
  );
  const latestYear = sortedCerts.find((c) => c.year)?.year;

  const sliderRef = React.useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;

    // Scroll roughly one "page" like Netflix (almost full container width)
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="certifications"
      className="py-16 sm:py-24 md:py-32 bg-[#080808] border-y border-white/5"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display mb-4 uppercase italic">
            Certifications
          </h2>
          <div className="h-2 w-32 sm:w-40 bg-primary mx-auto" />
          <p className="text-muted-foreground mt-4 sm:mt-6 text-base sm:text-xl uppercase tracking-tighter max-w-2xl mx-auto">
            Verified expertise in software engineering, cloud architecture, and
            data science.
          </p>
        </motion.div>

        {/* Netflix-style slider container */}
        <div className="relative">
          {/* Left Button */}
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

{/* Right Button */}
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

          {/* Edge fades (Netflix vibe) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10" />

          {/* Slider Row */}
          <div
            ref={sliderRef}
            className="flex gap-6 sm:gap-8 overflow-x-scroll scroll-smooth pb-2 pr-2
                       snap-x snap-mandatory
                       [scrollbar-width:none] [-ms-overflow-style:none]
                       [&::-webkit-scrollbar]:hidden"
          >
            {sortedCerts.map((cert, index) => (
              <Dialog key={cert.id ?? String(index)}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="bg-card border-2 border-white/5 hover:border-primary p-6 sm:p-8 flex flex-col relative group cursor-pointer snap-start
                               min-w-[280px] w-[280px] sm:min-w-[340px] sm:w-[340px] lg:min-w-[380px] lg:w-[380px]"
                  >
                    <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                      <Award size={60} className="sm:w-20 sm:h-20 text-primary" />
                    </div>

                    <div className="mb-4 sm:mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 flex items-center justify-center text-primary">
                        <Award size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary/60">
                        {cert.issuer ?? "Certificate"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black uppercase italic mb-2 leading-none group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-primary font-bold uppercase text-xs mb-4 sm:mb-6 tracking-widest">
                      {cert.issuer ?? ""}
                    </p>

                    <p className="text-muted-foreground mb-6 sm:mb-8 flex-grow leading-relaxed text-sm sm:text-base line-clamp-3">
                      {cert.description ?? ""}
                    </p>

                  <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-white/5">
  <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase">
    <Calendar size={14} />
    {cert.year ?? ""}
  </div>

  <div className="p-2 bg-white/5 group-hover:bg-primary group-hover:text-black transition-all">
    {cert.credentialUrl ? (
      <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
    ) : (
      <Award size={16} className="sm:w-[18px] sm:h-[18px]" />
    )}
  </div>
</div>
                  </motion.div>
                </DialogTrigger>

                <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white max-w-2xl rounded-none max-h-[85vh] overflow-y-auto">
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
                            <CheckCircle2
                              className="text-primary shrink-0"
                              size={18}
                            />
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
                          className="block w-full h-14 sm:h-16 bg-primary text-black font-black uppercase tracking-widest text-base sm:text-lg hover:scale-[1.02] transition-transform rounded-none flex items-center justify-center"
                        >
                          View Credential
                        </a>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}