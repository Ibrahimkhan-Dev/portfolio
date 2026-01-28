import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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

export default function Education() {
  return (
    <section id="education" className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black font-display uppercase italic">Academic Foundation</h2>
          <div className="h-2 w-40 bg-primary mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {education.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border-2 border-white/5 p-10 hover:border-primary transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <GraduationCap size={150} />
              </div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">{item.period}</span>
              <h3 className="text-4xl font-black uppercase mt-4 text-white italic group-hover:text-primary transition-colors leading-none">{item.institution}</h3>
              <p className="text-2xl font-bold text-white/60 my-6 tracking-tighter uppercase leading-none">{item.degree}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
