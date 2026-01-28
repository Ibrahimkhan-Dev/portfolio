import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "ERP System Enhancement",
    description: "Lead backend developer for enterprise Warehouse Management and Logistics modules.",
    tech: [".NET Core", "SQL Server", "REST API"],
    icon: <Layers className="text-primary" size={40} />
  },
  {
    id: 2,
    title: "Home Automation System",
    description: "IoT system integrating hardware sensors with a Python-powered backend logic.",
    tech: ["Python", "C++", "IoT"],
    icon: <Layers className="text-primary" size={40} />
  },
  {
    id: 3,
    title: "Selenium Automation Bot",
    description: "Custom bot for streamlined browser tasks with robust exception handling.",
    tech: ["Python", "Selenium", "Automation"],
    icon: <Layers className="text-primary" size={40} />
  },
  {
    id: 4,
    title: "Private Cloud OpenStack",
    description: "Deployment of scalable private cloud infrastructure on Ubuntu servers.",
    tech: ["OpenStack", "Linux", "Cloud"],
    icon: <Layers className="text-primary" size={40} />
  }
];

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
            <h2 className="text-5xl md:text-7xl font-black font-display mb-4 uppercase">Selected Works</h2>
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
            >
              <Card className="group bg-card border-2 border-white/5 hover:border-primary transition-all duration-500 rounded-none p-10">
                <div className="mb-8 p-4 bg-white/5 inline-block group-hover:bg-primary/20 transition-colors">
                  {project.icon}
                </div>
                
                <h3 className="text-4xl font-black mb-4 group-hover:text-primary transition-colors uppercase italic tracking-tighter">{project.title}</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map(tag => (
                    <span key={tag} className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 bg-white/5 text-white/50 border border-white/10 group-hover:border-primary/30">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <a href="#" className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                    Details <ArrowRight size={16} />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
