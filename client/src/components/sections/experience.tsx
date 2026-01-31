import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, MapPin, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-32 bg-[#080808] relative border-y border-white/5"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black font-display mb-4 text-white uppercase italic">
            Career Path
          </h2>
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
                  {/* Top Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      {/* Title */}
                      <h3 className="text-3xl font-black text-white group-hover:text-primary transition-colors uppercase">
                        {exp.title}
                      </h3>

                      {/* Company + Location */}
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-2 uppercase tracking-tight">
                        {/* Company */}
                        <div className="flex items-center gap-2 text-primary font-bold text-xl">
                          <Briefcase size={20} />
                          <span>{exp.company}</span>
                        </div>

                        {/* Location */}
                        {exp.location && (
                          <div className="flex items-center gap-2 text-white/70 font-black text-base">
                            <MapPin size={18} className="text-primary" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm font-black text-black bg-primary px-4 py-2 uppercase">
                      <Calendar size={18} />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Skills / Tech badges */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    {(exp.tech ?? []).map((t) => (
                      <span
                        key={t}
                        className="text-xs font-black px-4 py-2 bg-white/5 text-white/70 border border-white/10 uppercase tracking-widest group-hover:border-primary/50 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </DialogTrigger>

              {/* Dialog (Details on click) */}
              <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white max-w-3xl rounded-none">
                <DialogHeader>
                  <DialogTitle className="text-4xl font-black uppercase italic text-primary">
                    {exp.title}
                  </DialogTitle>

                  {/* Company + Location + Duration */}
                  <p className="text-xl font-bold uppercase tracking-tight text-white/60 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="flex items-center gap-2">
                      <Briefcase size={18} className="text-primary" />
                      <span>{exp.company}</span>
                    </span>

                    {exp.location && (
                      <span className="flex items-center gap-2 text-white/50">
                        <MapPin size={18} className="text-primary" />
                        <span>{exp.location}</span>
                      </span>
                    )}

                    <span className="text-white/30">|</span>

                    <span className="flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      <span>{exp.duration}</span>
                    </span>
                  </p>
                </DialogHeader>

                <div className="mt-8 space-y-6">
                  {/* Description only in dialog */}
                  <p className="text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-4">
                    "{exp.description}"
                  </p>

                  {/* Contributions */}
                  {(exp.contributions ?? []).length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-2xl font-black uppercase italic border-b border-white/10 pb-2">
                        Key Contributions
                      </h4>

                      <ul className="space-y-3">
                        {(exp.contributions ?? []).map((detail, i) => (
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
                  )}

                  {/* Live Projects Links (Only if exist) */}
                  {(exp.links ?? []).length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-2xl font-black uppercase italic border-b border-white/10 pb-2">
                        Live Projects
                      </h4>

                      <div className="flex flex-col gap-3">
                        {exp.links!.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-primary font-bold underline underline-offset-4 hover:text-white transition-colors text-lg"
                          >
                            <ExternalLink size={18} />
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech badges inside dialog */}
                  {(exp.tech ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-4">
                      {(exp.tech ?? []).map((t) => (
                        <span
                          key={t}
                          className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-widest"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
