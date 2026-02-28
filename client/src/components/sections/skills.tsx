import { motion } from "framer-motion";
import { Terminal, Cloud, Settings, ShieldCheck } from "lucide-react";
import { skillCategories } from "@/data/portfolio";
import type React from "react";

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Terminal size={24} />,
  Frameworks: <Settings size={24} />,
  "Cloud & Dev": <Cloud size={24} />,
  Automation: <ShieldCheck size={24} />,
};

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-24 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display mb-4 uppercase italic">
            Tech Stack
          </h2>
          <div className="h-2 w-32 sm:w-40 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-card border-t-4 border-primary p-4 sm:p-8 hover:bg-[#111] transition-all"
            >
              <div className="text-primary mb-4 sm:mb-6 flex items-center justify-between">
                <span className="font-black uppercase tracking-widest text-[10px] sm:text-xs">
                  {cat.title}
                </span>
                {categoryIcons[cat.title] ?? null}
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-2 sm:px-3 py-1 bg-white/5 text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-tight"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
