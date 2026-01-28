import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const experiences = [
  {
    id: 1,
    role: "Backend .NET Developer",
    company: "Sanwa Systems",
    period: "2023 - Present",
    description: "Designed and enhanced core modules of an enterprise-level ERP system. Implemented RESTful APIs using .NET Core and optimized complex SQL Server queries.",
    tech: [".NET Core", ".NET MVC", "SQL Server", "Selenium", "Git"],
    details: [
      "Designed and developed Warehouse Management, Inventory Control, and Logistics modules.",
      "Optimized SQL Server stored procedures, reducing system latency by 40%.",
      "Collaborated in Agile sprints using Jira and Git for version control.",
      "Automated testing workflows using Selenium to ensure high system reliability."
    ]
  },
  {
    id: 2,
    role: "Backend Python Developer",
    company: "Spacedome – NASTP",
    period: "2023",
    description: "Built microservices and RESTful APIs using Django and Flask. Automated testing using Selenium and improved backend reliability.",
    tech: ["Python", "Django", "Flask", "Selenium", "Postman"],
    details: [
      "Developed high-performance microservices for real-time data processing.",
      "Integrated backend systems with Flutter mobile applications.",
      "Conducted extensive bug fixing and code reviews for production systems.",
      "Improved API response times through strategic database indexing."
    ]
  },
  {
    id: 3,
    role: "Cloud Engineer Intern",
    company: "Abasyn University",
    period: "2022",
    description: "Designed and deployed a secure and scalable private cloud infrastructure using OpenStack on Ubuntu Linux servers.",
    tech: ["OpenStack", "Ubuntu", "Shell Scripting", "Networking"],
    details: [
      "Configured compute, storage, and networking components in OpenStack environment.",
      "Implemented security protocols and network segmentation for data integrity.",
      "Automated server setup using shell scripts on Ubuntu Linux.",
      "Created technical documentation for research and scalability purposes."
    ]
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
            <Dialog key={exp.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card border-l-8 border-primary p-8 md:p-12 hover:bg-[#111] transition-all cursor-pointer"
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
              </DialogTrigger>
              <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white max-w-3xl rounded-none">
                <DialogHeader>
                  <DialogTitle className="text-4xl font-black uppercase italic text-primary">{exp.role}</DialogTitle>
                  <p className="text-xl font-bold uppercase tracking-tight text-white/60">{exp.company} | {exp.period}</p>
                </DialogHeader>
                <div className="mt-8 space-y-6">
                  <p className="text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-4">
                    "{exp.description}"
                  </p>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black uppercase italic border-b border-white/10 pb-2">Key Contributions</h4>
                    <ul className="space-y-3">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg font-medium text-white/80">
                          <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={20} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {exp.tech.map(t => (
                      <span key={t} className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
