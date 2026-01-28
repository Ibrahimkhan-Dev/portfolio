import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "TechFlow Inc.",
    period: "2023 - Present",
    description: "Leading the frontend team in building scalable design systems and high-performance React applications.",
    tech: ["React", "TypeScript", "Next.js", "Tailwind"]
  },
  {
    id: 2,
    role: "Creative Developer",
    company: "Digital Studio X",
    period: "2021 - 2023",
    description: "Crafted award-winning marketing sites with 3D interactions and WebGL experiences.",
    tech: ["Three.js", "GSAP", "WebGL", "Vue.js"]
  },
  {
    id: 3,
    role: "UI Engineer",
    company: "StartUp Alpha",
    period: "2019 - 2021",
    description: "Developed key product features and improved user engagement through micro-interactions.",
    tech: ["React", "Redux", "Sass", "Framer Motion"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Work Experience</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(255,212,0,0.5)] ring-4 ring-background" />
              
              <div className="group bg-card/50 hover:bg-card border border-white/5 hover:border-primary/30 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-primary font-medium mt-1">
                      <Briefcase size={14} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full self-start md:self-auto">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map(t => (
                    <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
