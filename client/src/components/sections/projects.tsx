import { motion } from "framer-motion";
import { ArrowRight, Layers, Maximize2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black font-display mb-4 uppercase">
              Selected Works
            </h2>
            <div className="h-2 w-40 bg-primary" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="group bg-card border-2 border-white/5 hover:border-primary transition-all duration-500 rounded-none p-10 relative overflow-hidden">
                <div className="mb-8 p-4 bg-white/5 inline-block group-hover:bg-primary/20 transition-colors">
                  {/* icon still comes from data for now */}
                  {project.icon ?? (
                    <Layers className="text-primary" size={40} />
                  )}
                </div>

                <h3 className="text-4xl font-black mb-4 group-hover:text-primary transition-colors uppercase italic tracking-tighter">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium line-clamp-2">
                  {project.shortDesc}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 bg-white/5 text-white/50 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <Link href={`/project/${project.id}`}>
                    <a className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                      View Case Study <ArrowRight size={16} />
                    </a>
                  </Link>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="text-primary/30" size={60} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
