import { motion } from "framer-motion";
import { ArrowRight, Layers, Maximize2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { projects } from "@/data/portfolio";
import { Reveal } from "@/components/ui/site-animations";

export default function Projects() {
  const [, setLocation] = useLocation();

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal
          className="mb-12 sm:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display mb-4 uppercase">
              Projects
            </h2>
            <div className="h-2 w-32 sm:w-40 bg-primary" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-stretch">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1} className="h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer h-full"
                role="link"
                tabIndex={0}
                onClick={() => setLocation(`/project/${project.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLocation(`/project/${project.id}`);
                  }
                }}
              >
                <Card className="group bg-card border-2 border-white/5 hover:border-primary transition-all duration-500 rounded-none p-6 sm:p-10 relative overflow-hidden h-full flex flex-col">
                  <div className="mb-6 sm:mb-8 overflow-hidden border border-white/10 bg-card flex items-center justify-center h-48 sm:h-56">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                      />
                    ) : (
                      <div className="p-4 inline-block">
                        {project.icon ?? <Layers className="text-primary" size={32} />}
                      </div>
                    )}
                  </div>

                  {project.category && (
                    <div className="mb-3 text-[10px] font-black tracking-[0.2em] uppercase text-primary">
                      {project.category}
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4 group-hover:text-primary transition-colors uppercase italic tracking-tighter">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed font-medium line-clamp-2 flex-grow">
                    {project.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                    {(project.tech?.slice(0, 3) ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-black tracking-[0.2em] uppercase px-2 sm:px-3 py-1 bg-white/5 text-white/50 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs sm:text-sm group-hover:translate-x-2 transition-transform">
                    View Case Study <ArrowRight size={16} />
                  </div>

                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    <Maximize2 className="text-primary/30" size={60} />
                  </div>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
