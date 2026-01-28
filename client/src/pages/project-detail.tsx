import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Briefcase, Code2, CheckCircle2, Globe, Github } from "lucide-react";
import { projects } from "@/components/sections/projects";
import CustomCursor from "@/components/ui/custom-cursor";

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const project = projects.find(p => p.id === params?.id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <CustomCursor />
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <Link href="/">
          <a className="inline-flex items-center gap-3 bg-card border-2 border-white/5 p-4 uppercase font-black text-sm tracking-widest hover:border-primary transition-all group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back Home
          </a>
        </Link>
      </header>

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-20"
          >
            {/* Left Content */}
            <div className="space-y-12">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-primary text-black px-4 py-1 text-xs font-black uppercase tracking-widest inline-block mb-6"
                >
                  {project.role}
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black font-display uppercase italic leading-none mb-4">
                  {project.title}
                </h1>
                <div className="h-2 w-40 bg-primary mb-8" />
                <p className="text-2xl text-muted-foreground font-medium uppercase tracking-tighter leading-tight">
                  {project.shortDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-10">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Company</p>
                  <p className="text-xl font-black uppercase italic">{project.company}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Duration</p>
                  <p className="text-xl font-black uppercase italic">{project.duration}</p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-black uppercase italic mb-6">Overview</h3>
                <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black uppercase italic mb-6">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map(tag => (
                    <div key={tag} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 font-black uppercase tracking-widest text-sm">
                      <Code2 size={16} className="text-primary" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content / Mockup */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="aspect-video bg-card border-8 border-white/5 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.icon}
                </div>
              </motion.div>

              <div className="grid gap-6">
                <button className="h-20 bg-primary text-black font-black text-2xl uppercase tracking-tighter hover:scale-[1.02] transition-transform flex items-center justify-center gap-4">
                  Live Preview <Globe size={24} />
                </button>
                <button className="h-20 border-2 border-white/10 text-white font-black text-2xl uppercase tracking-tighter hover:bg-white/5 transition-all flex items-center justify-center gap-4">
                  Source Code <Github size={24} />
                </button>
              </div>
              
              <div className="bg-[#111] p-10 border-l-8 border-primary italic">
                <p className="text-xl font-medium text-white/80 leading-relaxed">
                  "This project pushed the boundaries of enterprise reliability, focusing on extreme optimization and clean architecture to handle massive data throughput."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
