import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const certifications = [
  {
    title: "Python Programming",
    issuer: "Aptech",
    date: "2019",
    description: "Advanced proficiency in Python, covering scripting, data analysis, and backend development.",
    skills: ["Python", "Automation", "REST APIs", "Data Scraping", "Backend Logic"],
    type: "Programming",
    details: "Mastered core Python concepts including OOP, functional programming, and asynchronous tasks. Applied knowledge to build automation bots and integrated complex third-party APIs."
  },
  {
    title: "Cloud Infrastructure",
    issuer: "Pakistan Software Export Board (PSEB)",
    date: "2022",
    description: "Hands-on experience with AWS EC2, Linux administration, and Docker containerization.",
    skills: ["AWS", "Linux", "Docker", "CI/CD", "Cloud Security"],
    type: "Cloud",
    details: "Learned to manage cloud resources effectively. Configured AWS EC2 instances, implemented Docker containers for microservices, and established automated CI/CD pipelines."
  },
  {
    title: "The Data Science Course",
    issuer: "Udemy",
    date: "2025 (In Progress)",
    description: "Comprehensive bootcamp covering statistics, machine learning, and deep learning with real-world datasets.",
    skills: ["Machine Learning", "Statistics", "Data Viz", "NumPy/Pandas", "Scikit-learn"],
    type: "Data Science",
    details: "Currently mastering advanced statistical analysis and predictive modeling. Working with large-scale datasets to identify trends and build automated machine learning models."
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 bg-[#080808] border-y border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black font-display mb-4 uppercase italic">Credentials</h2>
          <div className="h-2 w-40 bg-primary mx-auto" />
          <p className="text-muted-foreground mt-6 text-xl uppercase tracking-tighter max-w-2xl mx-auto">
            Verified expertise in software engineering, cloud architecture, and data science.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-card border-2 border-white/5 hover:border-primary p-8 flex flex-col h-full relative group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Award size={80} className="text-primary" />
                  </div>
                  
                  <div className="mb-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                      <Award size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">{cert.type}</span>
                  </div>

                  <h3 className="text-3xl font-black uppercase italic mb-2 leading-none group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-primary font-bold uppercase text-xs mb-6 tracking-widest">{cert.issuer}</p>
                  
                  <p className="text-muted-foreground mb-8 flex-grow leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase">
                      <Calendar size={14} />
                      {cert.date}
                    </div>
                    <div className="p-2 bg-white/5 group-hover:bg-primary group-hover:text-black transition-all">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white max-w-2xl rounded-none">
                <DialogHeader>
                  <DialogTitle className="text-4xl font-black uppercase italic text-primary">{cert.title}</DialogTitle>
                  <p className="text-xl font-bold uppercase tracking-tight text-white/60">{cert.issuer} • {cert.date}</p>
                </DialogHeader>
                <div className="mt-8 space-y-6">
                  <div className="p-6 bg-white/5 border-l-4 border-primary italic">
                    <p className="text-xl text-white/80">{cert.details}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black uppercase italic border-b border-white/10 pb-2">Skills Validated</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {cert.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-3 text-lg font-medium text-white/80 bg-white/5 p-3">
                          <CheckCircle2 className="text-primary" size={20} />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6">
                    <button className="w-full h-16 bg-primary text-black font-black uppercase tracking-widest text-lg hover:scale-[1.02] transition-transform rounded-none">
                      Verify Certificate
                    </button>
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
