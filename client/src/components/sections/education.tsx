import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section
      id="education"
      className="py-32 bg-background border-t border-white/5"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black font-display uppercase italic">
            Academic Foundation
          </h2>
          <div className="h-2 w-40 bg-primary mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {education.map((item, idx) => (
            <Dialog key={item.id ?? String(idx)}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card border-2 border-white/5 p-10 hover:border-primary transition-all group relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <GraduationCap size={150} />
                  </div>

                  <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                    {item.period}
                  </span>

                  <h3 className="text-4xl font-black uppercase mt-4 text-white italic group-hover:text-primary transition-colors leading-none">
                    {item.institution}
                  </h3>

                  <p className="text-2xl font-bold text-white/60 my-6 tracking-tighter uppercase leading-none">
                    {item.degree}
                  </p>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white max-w-2xl rounded-none">
                <DialogHeader>
                  <DialogTitle className="text-4xl font-black uppercase italic text-primary">
                    {item.institution}
                  </DialogTitle>
                  <p className="text-xl font-bold uppercase tracking-tight text-white/60">
                    {item.degree} | {item.period}
                  </p>
                </DialogHeader>

                <div className="mt-8 space-y-6">
                  <div className="p-6 bg-white/5 border-l-4 border-primary italic">
                    <p className="text-xl text-white/80">{item.desc}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-2xl font-black uppercase italic border-b border-white/10 pb-2">
                      Academic Highlights
                    </h4>

                    <ul className="space-y-3">
                      {(item.details ?? []).map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-lg font-medium text-white/80"
                        >
                          <CheckCircle2
                            className="text-primary mt-1 flex-shrink-0"
                            size={20}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
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
