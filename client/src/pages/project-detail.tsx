import React, { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Globe, Github, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import CustomCursor from "@/components/ui/custom-cursor";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-2xl sm:text-3xl font-black uppercase italic">{title}</h3>
      {children}
    </div>
  );
}

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const [, setLocation] = useLocation();
  const project = projects.find((p) => p.id === params?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.id]);

  if (!project) {
    return (
      <div className="bg-background min-h-screen text-foreground flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-black uppercase italic text-primary">404</h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">Project not found</p>
          <button
            type="button"
          onClick={() => {
            sessionStorage.setItem("portfolio_scroll_to_projects", "1");
            setLocation("/");
          }}
          className="inline-flex items-center gap-3 bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase tracking-widest hover:scale-105 transition-transform text-sm sm:text-base"
        >
            <ArrowLeft size={20} />
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const hasLiveOrSource = Boolean(project.liveUrl || project.sourceUrl);
  const openIfExists = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const mediaSlides = project.gallery?.length
    ? project.gallery
    : project.image
      ? [project.image]
      : [];
  const sliderRef = React.useRef<HTMLDivElement | null>(null);
  const scrollMedia = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const AUTO_SLIDE_INTERVAL_MS = 5000;
  useEffect(() => {
    if (mediaSlides.length <= 1) return;
    const el = sliderRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const { scrollLeft, clientWidth, scrollWidth } = el;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: clientWidth, behavior: "smooth" });
      }
    }, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [mediaSlides.length]);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <CustomCursor />

      <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6">
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem("portfolio_scroll_to_projects", "1");
            setLocation("/");
          }}
          className="inline-flex items-center gap-2 sm:gap-3 bg-card border-2 border-white/5 p-3 sm:p-4 uppercase font-black text-xs sm:text-sm tracking-widest hover:border-primary transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back Home
        </button>
      </header>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-20 gap-y-4 md:gap-y-6 w-full md:grid-rows-[auto_auto_auto_auto_auto_auto] md:items-start"
          >
            {/* Row 1 left: title block */}
            <div className="min-w-0 w-full md:row-start-1 md:col-start-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {project.category && (
                  <div className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">
                    {project.category}
                  </div>
                )}
                {project.role && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className="bg-primary text-black px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest inline-block"
                  >
                    {project.role}
                  </motion.div>
                )}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-display uppercase italic leading-tight mb-4">
                  {project.title}
                </h1>
                <div className="h-2 w-32 sm:w-40 bg-primary mb-4 sm:mb-6" />
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium uppercase tracking-tighter leading-snug">
                  {project.shortDesc}
                </p>
              </div>
            </div>

            {/* Row 2: full-width metadata - Institution, Supervisor, Team, Duration in one line */}
            {(project.company || project.duration || project.team || project.supervisor) && (
              <div className="min-w-0 w-full md:row-start-2 md:col-span-2 border-y border-white/5 py-4 sm:py-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {project.company && (
                    <div>
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">
                        {project.category ? "Institution" : "Company"}
                      </p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.company}</p>
                    </div>
                  )}
                  {project.supervisor && (
                    <div>
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">Supervisor</p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.supervisor}</p>
                    </div>
                  )}
                  {project.team && (
                    <div>
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">Team</p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.team}</p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">Duration</p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Row 1 right: project media slider (all images in one slider, like certifications) */}
            <div className="min-w-0 w-full md:row-start-1 md:col-start-2 flex flex-col">
              <h3 className="text-lg font-black uppercase italic mb-3">Diagrams / visuals</h3>
              <div className="relative flex-1 min-h-0">
                {mediaSlides.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => scrollMedia("left")}
                      aria-label="Previous image"
                      className="hidden md:flex items-center justify-center absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 h-14 w-10 bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollMedia("right")}
                      aria-label="Next image"
                      className="hidden md:flex items-center justify-center absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 h-14 w-10 bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
                    <div
                      ref={sliderRef}
                      className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-2"
                    >
                      {mediaSlides.map((src, i) => (
                        <a
                          key={i}
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-full min-w-full snap-start block aspect-video bg-card border-4 sm:border-8 border-white/5 overflow-hidden hover:border-primary transition-colors"
                        >
                          <img
                            src={src}
                            alt={`${project.title} – visual ${i + 1}`}
                            className="w-full h-full object-contain bg-card"
                          />
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                    className="aspect-video bg-card border-4 sm:border-8 border-white/5 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {project.icon ?? <Layers className="text-primary w-16 h-16 sm:w-20 sm:h-20" />}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Row 4: Overview (left) | Note on visuals (right) - aligned */}
            <div className="min-w-0 w-full md:row-start-4 md:col-start-1">
              <Section title="Overview">
                <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                  {project.description}
                </p>
              </Section>
            </div>
            <div className="min-w-0 w-full md:row-start-4 md:col-start-2">
              {project.proofNote && (
                <Section title="Note on visuals">
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium italic border-l-2 border-primary/50 pl-4 text-justify">
                    {project.proofNote}
                  </p>
                </Section>
              )}
            </div>

            {/* Row 5: Purpose (left) | Technologies used (right) - aligned */}
            <div className="min-w-0 w-full md:row-start-5 md:col-start-1">
              {project.purpose && (
                <Section title="Purpose">
                  <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium text-justify">
                    {project.purpose}
                  </p>
                </Section>
              )}
            </div>
            <div className="min-w-0 w-full md:col-start-2 md:row-start-5">
              <Section title="Technologies Used">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.tech.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 font-black uppercase tracking-widest text-xs sm:text-sm"
                    >
                      <Code2 size={14} className="text-primary shrink-0" />
                      {tag}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Row 6: Highlights (left) | buttons (right) */}
            <div className="min-w-0 w-full md:row-start-6 md:col-start-1">
              {project.highlights && project.highlights.length > 0 && (
                <Section title="Highlights">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground font-medium text-base sm:text-lg text-justify">
                    {project.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>
            <div className="min-w-0 w-full md:row-start-6 md:col-start-2">
              {hasLiveOrSource && (
                <div className="grid gap-4 sm:gap-6">
                  {project.liveUrl && (
                    <button
                      type="button"
                      onClick={() => openIfExists(project.liveUrl)}
                      className="h-14 sm:h-20 bg-primary text-black font-black text-lg sm:text-2xl uppercase tracking-tighter hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 sm:gap-4"
                    >
                      Live Preview <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}
                  {project.sourceUrl && (
                    <button
                      type="button"
                      onClick={() => openIfExists(project.sourceUrl)}
                      className="h-14 sm:h-20 border-2 border-white/10 text-white font-black text-lg sm:text-2xl uppercase tracking-tighter hover:bg-white/5 transition-all flex items-center justify-center gap-3 sm:gap-4"
                    >
                      Source Code <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
