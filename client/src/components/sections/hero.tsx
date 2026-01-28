import { motion } from "framer-motion";
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.png"; // Assuming generated image

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background z-10" />
        <img 
          src={heroBg} 
          alt="Abstract Background" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6 backdrop-blur-sm"
          >
            Available for freelance work
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Alex</span>
            <br />
            <span className="text-muted-foreground text-4xl md:text-6xl">Creative Developer.</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            I craft modern, interactive digital experiences with a focus on motion, aesthetics, and performance.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 rounded-full bg-primary text-background font-bold text-lg hover:bg-yellow-300 transition-colors shadow-[0_0_20px_rgba(255,212,0,0.3)]"
            >
              View Work
            </a>
            <a 
              href="#"
              className="px-8 py-4 rounded-full border border-white/10 hover:border-primary/50 hover:text-primary transition-all font-medium text-lg flex items-center gap-2"
            >
              <Download size={20} />
              Resume
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors"><Github size={24} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Mail size={24} /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:block relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
             {/* Decorative frames */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-[2rem] transform rotate-6 scale-95 z-0" />
            <div className="absolute inset-0 border-2 border-white/5 rounded-[2rem] transform -rotate-3 scale-105 z-0" />
            
            {/* Image container */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-card border border-white/10 p-4 rounded-xl shadow-xl z-20 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">5+</div>
                <div>
                  <p className="text-xs text-muted-foreground">Years of</p>
                  <p className="font-bold">Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}
