import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Globe, Github, Layers } from "lucide-react";
import { projects } from "@/data/portfolio";
import CustomCursor from "@/components/ui/custom-cursor";

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const [, setLocation] = useLocation();
  const project = projects.find((p) => p.id === params?.id);

  if (!project) {
    return (
      <div className="bg-background min-h-screen text-foreground flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-black uppercase italic text-primary">404</h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">Project not found</p>
          <button
            type="button"
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-3 bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase tracking-widest hover:scale-105 transition-transform text-sm sm:text-base"
          >
            <ArrowLeft size={20} />
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const openIfExists = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <CustomCursor />

      <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6">
        <button
          type="button"
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 sm:gap-3 bg-card border-2 border-white/5 p-3 sm:p-4 uppercase font-black text-xs sm:text-sm tracking-widest hover:border-primary transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back Home
        </button>
      </header>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20"
          >
            <div className="space-y-8 sm:space-y-12">
              <div>
                {project.role && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-primary text-black px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest inline-block mb-4 sm:mb-6"
                  >
                    {project.role}
                  </motion.div>
                )}

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-display uppercase italic leading-none mb-4">
                  {project.title}
                </h1>

                <div className="h-2 w-32 sm:w-40 bg-primary mb-6 sm:mb-8" />

                <p className="text-lg sm:text-2xl text-muted-foreground font-medium uppercase tracking-tighter leading-tight">
                  {project.shortDesc}
                </p>
              </div>

              {(project.company || project.duration) && (
                <div className="grid grid-cols-2 gap-4 sm:gap-8 border-y border-white/5 py-6 sm:py-10">
                  {project.company && (
                    <div>
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1 sm:mb-2">
                        Company
                      </p>
                      <p className="text-base sm:text-xl font-black uppercase italic">
                        {project.company}
                      </p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1 sm:mb-2">
                        Duration
                      </p>
                      <p className="text-base sm:text-xl font-black uppercase italic">
                        {project.duration}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase italic mb-4 sm:mb-6">
                  Overview
                </h3>
                <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase italic mb-4 sm:mb-6">
                  Technologies Used
                </h3>
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
              </div>
            </div>

            <div className="space-y-6 sm:space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="aspect-video bg-card border-4 sm:border-8 border-white/5 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.icon ?? <Layers className="text-primary w-16 h-16 sm:w-20 sm:h-20" />}
                </div>
              </motion.div>

              <div className="grid gap-4 sm:gap-6">
                <button
                  type="button"
                  disabled={!project.liveUrl}
                  onClick={() => openIfExists(project.liveUrl)}
                  className="h-14 sm:h-20 bg-primary text-black font-black text-lg sm:text-2xl uppercase tracking-tighter hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Live Preview <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  type="button"
                  disabled={!project.sourceUrl}
                  onClick={() => openIfExists(project.sourceUrl)}
                  className="h-14 sm:h-20 border-2 border-white/10 text-white font-black text-lg sm:text-2xl uppercase tracking-tighter hover:bg-white/5 transition-all flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  Source Code <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
