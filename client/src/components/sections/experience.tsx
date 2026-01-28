import { motion } from "framer-motion";
import { Briefcase, Calendar, Code2 } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Backend .NET Developer",
    company: "Sanwa Systems",
    period: "2023 - Present",
    description: "Designed and enhanced core modules of an enterprise-level ERP system. Implemented RESTful APIs using .NET Core and optimized complex SQL Server queries.",
    tech: [".NET Core", ".NET MVC", "SQL Server", "Selenium", "Git"]
  },
  {
    id: 2,
    role: "Backend Python Developer",
    company: "Spacedome – NASTP",
    period: "2023",
    description: "Built microservices and RESTful APIs using Django and Flask. Automated testing using Selenium and improved backend reliability.",
    tech: ["Python", "Django", "Flask", "Selenium", "Postman"]
  },
  {
    id: 3,
    role: "Cloud Engineer Intern",
    company: "Abasyn University",
    period: "2022",
    description: "Designed and deployed a secure and scalable private cloud infrastructure using OpenStack on Ubuntu Linux servers.",
    tech: ["OpenStack", "Ubuntu", "Shell Scripting", "Networking"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-[#080808] relative border-y border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black font-display mb-4 text-white uppercase italic">Career Path</h2>
          <div className="h-2 w-40 bg-primary" />
        </motion.div>

        <div className="grid gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border-l-8 border-primary p-8 md:p-12 hover:bg-[#111] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-3xl font-black text-white group-hover:text-primary transition-colors uppercase">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-primary font-bold text-xl mt-1 uppercase tracking-tight">
                    <Briefcase size={20} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-black bg-primary px-4 py-2 uppercase">
                  <Calendar size={18} />
                  {exp.period}
                </div>
              </div>
              
              <p className="text-muted-foreground text-xl mb-8 leading-relaxed font-medium">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {exp.tech.map(t => (
                  <span key={t} className="text-xs font-black px-4 py-2 bg-white/5 text-white/70 border border-white/10 uppercase tracking-widest group-hover:border-primary/50 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
