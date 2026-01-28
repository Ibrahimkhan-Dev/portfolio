import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const education = [
  {
    institution: "Abasyn University",
    degree: "Software Engineering & Cloud Tech",
    period: "2019 - 2023",
    desc: "Focus on backend systems, cloud infrastructure, and IoT automation."
  },
  {
    institution: "Kallar Kahar Science College",
    degree: "Pre-Engineering",
    period: "2017 - 2019",
    desc: "Intensive study of Mathematics and Physics."
  }
];

const certs = [
  { title: "Python Programming", issuer: "Aptech", year: "2019" },
  { title: "Cloud Infrastructure", issuer: "PSEB", year: "2022" },
  { title: "Data Science Bootcamp", issuer: "Udemy", year: "2025" }
];

export default function Education() {
  return (
    <section id="education" className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black font-display uppercase italic">Education</h2>
              <div className="h-2 w-40 bg-primary mt-4" />
            </motion.div>

            <div className="space-y-12">
              {education.map((item, idx) => (
                <div key={idx} className="relative pl-12 border-l-2 border-white/10 hover:border-primary transition-colors">
                  <div className="absolute left-[-11px] top-0 w-5 h-5 bg-primary" />
                  <span className="text-primary font-black uppercase tracking-widest text-xs">{item.period}</span>
                  <h3 className="text-3xl font-black uppercase mt-2 text-white italic">{item.institution}</h3>
                  <p className="text-xl font-bold text-white/60 mb-4 tracking-tighter uppercase">{item.degree}</p>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black font-display uppercase italic">Accolades</h2>
              <div className="h-2 w-40 bg-primary mt-4" />
            </motion.div>

            <div className="grid gap-6">
              {certs.map((cert, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="bg-card border-l-8 border-primary p-6 flex items-center justify-between group cursor-default"
                >
                  <div>
                    <h4 className="text-xl font-black uppercase text-white tracking-tighter group-hover:text-primary transition-colors">{cert.title}</h4>
                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest">{cert.issuer} • {cert.year}</p>
                  </div>
                  <Award className="text-primary opacity-20 group-hover:opacity-100 transition-opacity" size={32} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
