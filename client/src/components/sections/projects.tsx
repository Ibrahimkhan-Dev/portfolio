import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Layers, Maximize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export const projects = [
  {
    id: "erp-system",
    title: "ERP System Enhancement",
    shortDesc: "Lead backend developer for enterprise Warehouse Management and Logistics modules.",
    description: "As the lead backend developer, I was responsible for designing, developing, and enhancing core modules of an enterprise-level ERP system, including Warehouse Management, Inventory Control, Logistics, and Sales Processing. I implemented RESTful APIs using .NET Core to ensure seamless integration across B2B and B2C platforms, and optimized complex SQL Server queries and stored procedures to enhance performance and reduce system latency.",
    tech: [".NET Core", "SQL Server", "REST API", "Selenium", "Git", "Jira"],
    icon: <Layers className="text-primary" size={40} />,
    role: "Backend .NET Developer",
    company: "Sanwa Systems",
    duration: "2023–Present"
  },
  {
    id: "home-automation",
    title: "Home Automation System",
    shortDesc: "IoT system integrating hardware sensors with a Python-powered backend logic.",
    description: "Developed a smart home automation system that integrated IoT devices to provide real-time control and monitoring of appliances such as lights, thermostats, security cameras, and motion sensors. I designed and implemented the backend logic to manage device communication, automation triggers, and user interactions. The system ensured secure and seamless connectivity between hardware components and the user interface.",
    tech: ["IoT", "C/C++", "Python", "Arduino", "ESP8266"],
    icon: <Layers className="text-primary" size={40} />,
    role: "Team Lead",
    company: "Abasyn University",
    duration: "2023"
  },
  {
    id: "selenium-bot",
    title: "Selenium Automation Bot",
    shortDesc: "Custom bot for streamlined browser tasks with robust exception handling.",
    description: "Developed a custom Selenium-based automation bot to streamline repetitive browser tasks such as form filling, data extraction, and submission across dynamic web platforms. The bot was designed with robust exception handling, dynamic wait conditions, and cross-browser compatibility to ensure smooth execution and error resilience. I also implemented unit tests to validate automation workflows.",
    tech: ["Python", "Selenium", "Automation", "Unit Testing"],
    icon: <Layers className="text-primary" size={40} />,
    role: "Python Developer",
    company: "Spacedome",
    duration: "2023"
  },
  {
    id: "private-cloud",
    title: "Private Cloud OpenStack",
    shortDesc: "Deployment of scalable private cloud infrastructure on Ubuntu servers.",
    description: "Designed and deployed a secure and scalable private cloud infrastructure using OpenStack on Ubuntu Linux servers. The project involved configuring compute, storage, and networking components to enable efficient resource allocation and virtualization. I also implemented access controls and network segmentation to ensure data security and system reliability.",
    tech: ["OpenStack", "Ubuntu Linux", "Shell Scripting", "Networking"],
    icon: <Layers className="text-primary" size={40} />,
    role: "Cloud Engineer Intern",
    company: "Abasyn University",
    duration: "2022"
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
              whileHover={{ scale: 1.02 }}
            >
              <Card className="group bg-card border-2 border-white/5 hover:border-primary transition-all duration-500 rounded-none p-10 relative overflow-hidden">
                <div className="mb-8 p-4 bg-white/5 inline-block group-hover:bg-primary/20 transition-colors">
                  {project.icon}
                </div>
                
                <h3 className="text-4xl font-black mb-4 group-hover:text-primary transition-colors uppercase italic tracking-tighter">{project.title}</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium line-clamp-2">{project.shortDesc}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 bg-white/5 text-white/50 border border-white/10">
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
