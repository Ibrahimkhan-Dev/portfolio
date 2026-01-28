import { motion } from "framer-motion";
import { Terminal, Cpu, Cloud, Settings, ShieldCheck } from "lucide-react";

const skillCategories = [
  {
    name: "Languages",
    skills: ["Python", ".NET Core", "C#", "C++", "JavaScript", "SQL", "PHP"],
    icon: <Terminal size={24} />
  },
  {
    name: "Frameworks",
    skills: ["Django", "Flask", ".NET MVC", "React", "Bootstrap", "Entity Framework"],
    icon: <Settings size={24} />
  },
  {
    name: "Cloud & Dev",
    skills: ["AWS", "Azure", "Docker", "OpenStack", "CI/CD", "Git", "Linux"],
    icon: <Cloud size={24} />
  },
  {
    name: "Automation",
    skills: ["Selenium", "Unit Testing", "Jira", "Postman", "Agile", "Scrum"],
    icon: <ShieldCheck size={24} />
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black font-display mb-4 uppercase italic">Tech Stack</h2>
          <div className="h-2 w-40 bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-card border-t-4 border-primary p-8 hover:bg-[#111] transition-all"
            >
              <div className="text-primary mb-6 flex items-center justify-between">
                <span className="font-black uppercase tracking-widest text-xs">{cat.name}</span>
                {cat.icon}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <div key={skill} className="px-3 py-1 bg-white/5 text-white/80 text-xs font-bold uppercase tracking-tight">
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
