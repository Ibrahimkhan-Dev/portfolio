import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-[#050505]">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-10" />
        <img 
          src={heroBg} 
          alt="Abstract Background" 
          className="w-full h-full object-cover grayscale brightness-50"
        />
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1 rounded-sm bg-primary text-black text-xs font-black uppercase tracking-widest mb-6"
          >
            Software Developer
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-black font-display mb-6 leading-none uppercase">
            Muhammad <br />
            <span className="text-transparent stroke-orange-500 stroke-2 bg-clip-text bg-gradient-to-r from-primary to-orange-400">Ibrahim Khan</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium italic">
            "I build robust backend solutions that do more than just run, they scale, automate, and deliver."
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-10 py-4 bg-primary text-black font-black text-lg uppercase tracking-tighter hover:scale-105 transition-transform border-b-4 border-orange-900"
            >
              Explore Projects
            </a>
            <a 
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-10 py-4 border-2 border-primary text-primary font-black text-lg uppercase tracking-tighter hover:bg-primary hover:text-black transition-all"
            >
              Get In Touch
            </a>
          </div>

          <div className="mt-16 flex justify-center items-center gap-8 text-muted-foreground">
            <a href="https://linkedin.com/in/muhammad-ibrahim-khan-a97372354" target="_blank" className="hover:text-primary transition-colors"><Linkedin size={28} /></a>
            <a href="mailto:ibrahimkhanwork7@gmail.com" className="hover:text-primary transition-colors"><Mail size={28} /></a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
      >
        <ArrowDown size={32} strokeWidth={3} />
      </motion.div>
    </section>
  );
}
