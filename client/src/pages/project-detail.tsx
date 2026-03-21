import React, { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Code2, Globe, Github, Layers, ChevronLeft, ChevronRight, ExternalLink, X, Images } from "lucide-react";
import { projects } from "@/data/portfolio";
import CustomCursor from "@/components/ui/custom-cursor";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* DESIGN: accent bar before title — revert by replacing this div with the plain h3 below */}
      <div className="flex items-center gap-3">
        <span className="block w-1 h-6 sm:h-7 bg-primary shrink-0" />
        <h3 className="text-2xl sm:text-3xl font-black uppercase italic">{title}</h3>
      </div>
      {/* REVERT TO: <h3 className="text-2xl sm:text-3xl font-black uppercase italic">{title}</h3> */}
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

  const [galleryModal, setGalleryModal] = useState<{ title: string; items: string[] } | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(false);

  const openGallery = (title: string, items: string[]) => {
    setGalleryIndex(0);
    setMediaLoading(true);
    setGalleryModal({ title, items });
  };
  const closeGallery = () => setGalleryModal(null);
  const galleryPrev = () => { setMediaLoading(true); setGalleryIndex((i) => (i === 0 ? (galleryModal?.items.length ?? 1) - 1 : i - 1)); };
  const galleryNext = () => { setMediaLoading(true); setGalleryIndex((i) => (i === (galleryModal?.items.length ?? 1) - 1 ? 0 : i + 1)); };

  useEffect(() => {
    if (!galleryModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") galleryPrev();
      if (e.key === "ArrowRight") galleryNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [galleryModal, galleryIndex]);

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
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-20 gap-y-8 md:gap-y-10 w-full md:grid-rows-[auto_auto_auto_auto_auto] md:items-start"
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
                <div className="flex flex-wrap gap-y-4 gap-x-6 sm:gap-x-10 lg:gap-x-16">
                  {project.company && (
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">
                        {project.category ? "Institution" : "Company"}
                      </p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.company}</p>
                    </div>
                  )}
                  {project.supervisor && (
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">Supervisor</p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.supervisor}</p>
                    </div>
                  )}
                  {project.team && (
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">Team</p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.team}</p>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">Duration</p>
                      <p className="text-base sm:text-xl font-black uppercase italic">{project.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Row 1 right: project media slider (all images in one slider, like certifications) */}
            <div className="min-w-0 w-full md:row-start-1 md:col-start-2 flex flex-col">
              <h3 className="text-lg font-black uppercase italic mb-3">
                {project.id === "home-automation" ? "App & Hardware Visuals" : "Diagrams / visuals"}
              </h3>
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

            {/* Row 3: Full-width Overview — DESIGN CHANGE: was left-col only (row-start-3 col-start-1) */}
            {/* REVERT: move <Section title="Overview"> back into row-4 left column, change this to md:row-start-3 md:col-span-2 → remove */}
            <div className="min-w-0 w-full md:row-start-3 md:col-span-2">
              <Section title="Overview">
                <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                  {project.description}
                </p>
              </Section>
            </div>

            {/* Row 4 left: remaining content sections */}
            <div className="min-w-0 w-full md:row-start-4 md:col-start-1 space-y-8 md:space-y-10">
              {project.context && (
                <Section title="Context">
                  <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium text-justify">
                    {project.context}
                  </p>
                </Section>
              )}

              {project.purpose && (
                <Section title="Purpose">
                  <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium text-justify">
                    {project.purpose}
                  </p>
                </Section>
              )}

              {project.whatChanged && (
                <Section title="What I Built">
                  <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium text-justify">
                    {project.whatChanged}
                  </p>
                </Section>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <Section title="Highlights">
                  <ul className="space-y-0 text-muted-foreground font-medium text-base sm:text-lg">
                    {project.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 border-b border-white/5 py-3 last:border-b-0">
                        <span className="text-primary font-black shrink-0 text-xs sm:text-sm tracking-widest mt-1 w-6 text-right">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>

            {/* Row 4 right: secondary content sections */}
            <div className="min-w-0 w-full md:row-start-4 md:col-start-2 space-y-8 md:space-y-10">
              {project.proofNote && (
                <Section title="Note on visuals">
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium italic border-l-2 border-primary/50 pl-4 text-justify">
                    {project.proofNote}
                  </p>
                </Section>
              )}

              {project.evidence && project.evidence.length > 0 && (
                <Section title={project.ctaLabel ?? "Project Notes"}>
                  <ul className="space-y-0 text-muted-foreground font-medium text-base sm:text-lg">
                    {project.evidence.map((item, i) => {
                      const isLink = Boolean(item.url);
                      const hasGallery = Boolean(item.gallery && item.gallery.length > 0);
                      const isClickable = isLink || hasGallery;

                      const handleClick = () => {
                        if (hasGallery && item.gallery) {
                          openGallery(item.label, item.gallery);
                        } else if (isLink && item.url) {
                          const a = document.createElement("a");
                          a.href = item.url;
                          a.target = "_blank";
                          a.rel = "noopener noreferrer";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }
                      };

                      return (
                        <li
                          key={i}
                          onClick={isClickable ? handleClick : undefined}
                          className={[
                            "flex items-center gap-4 border-b border-white/5 py-3 last:border-b-0 transition-all",
                            isClickable
                              ? "cursor-pointer hover:bg-primary/5 hover:border-primary/30 hover:pl-1"
                              : "",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "font-black shrink-0 text-xs sm:text-sm tracking-widest w-6 text-right",
                              isClickable ? "text-primary animate-pulse" : "text-primary",
                            ].join(" ")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{item.label}</span>
                          {hasGallery && (
                            <Images size={14} className="ml-auto shrink-0 text-primary animate-pulse" />
                          )}
                          {isLink && !hasGallery && (
                            <ExternalLink size={14} className="ml-auto shrink-0 text-primary animate-pulse" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Section>
              )}

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

            {/* Row 5: Full-width Technologies belt — DESIGN CHANGE: was inside right column */}
            {/* REVERT: move <Section title="Technologies Used"> back into row-4 right column, remove this block */}
            <div className="min-w-0 w-full md:row-start-5 md:col-span-2 border-t border-white/5 pt-8 md:pt-10">
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
          </motion.div>
        </div>
      </main>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-5xl flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="block w-1 h-6 bg-primary shrink-0" />
                  <h2 className="text-xl sm:text-2xl font-black uppercase italic text-white">
                    {galleryModal.title}
                  </h2>
                  <span className="text-xs font-black text-primary tracking-widest uppercase ml-2">
                    {galleryIndex + 1} / {galleryModal.items.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeGallery}
                  className="p-2 border border-white/10 hover:border-primary hover:text-primary transition-all text-white"
                  aria-label="Close gallery"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Image / Video viewer */}
              <div className="relative aspect-video bg-card border-4 border-white/5 overflow-hidden">
                {/* Skeleton loader — visible while media is loading (images only, not videos) */}
                {mediaLoading && !/\.(mp4|webm|mov|ogg)$/i.test(galleryModal.items[galleryIndex]) && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-card">
                    <div className="w-10 h-10 border-2 border-white/10 border-t-primary rounded-full animate-spin" />
                    <p className="text-xs font-black uppercase tracking-widest text-white/30 animate-pulse">
                      Loading…
                    </p>
                  </div>
                )}

                {(() => {
                  const src = galleryModal.items[galleryIndex];
                  const safeSrc = encodeURI(src);
                  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src);
                  return isVideo ? (
                    <video
                      key={src}
                      src={safeSrc}
                      controls
                      onLoadedData={() => setMediaLoading(false)}
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <img
                      key={src}
                      src={safeSrc}
                      alt={`${galleryModal.title} – ${galleryIndex + 1}`}
                      onLoad={() => setMediaLoading(false)}
                      className={`w-full h-full object-contain bg-card transition-opacity duration-300 ${mediaLoading ? "opacity-0" : "opacity-100"}`}
                    />
                  );
                })()}

                {/* Prev / Next arrows */}
                {galleryModal.items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={galleryPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 hover:border-primary text-white transition-all"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={galleryNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 hover:border-primary text-white transition-all"
                      aria-label="Next"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              {galleryModal.items.length > 1 && (
                <div className="flex justify-center gap-2">
                  {galleryModal.items.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGalleryIndex(idx)}
                      className={[
                        "h-2 rounded-full transition-all",
                        idx === galleryIndex ? "bg-primary w-4" : "bg-white/20 hover:bg-white/40 w-2",
                      ].join(" ")}
                      aria-label={`Go to item ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Keyboard hint */}
              <p className="text-center text-xs text-white/30 font-medium tracking-widest uppercase">
                ← → to navigate &nbsp;·&nbsp; Esc to close &nbsp;·&nbsp; click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
