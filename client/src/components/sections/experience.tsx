import {
  Briefcase,
  Calendar,
  CheckCircle2,
  MapPin,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { experiences } from "@/data/portfolio";
import { Reveal } from "@/components/ui/site-animations";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-12 sm:py-16 md:py-20 bg-[#080808] relative border-y border-white/5"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal y={0} className="mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display mb-4 text-white uppercase italic">
            Work Experience
          </h2>
          <div className="h-2 w-32 sm:w-40 bg-primary" />
        </Reveal>

        <div className="grid gap-6 sm:gap-8">
          {experiences.map((exp, index) => (
            <Reveal key={exp.id} delay={index * 0.1}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group bg-card border-l-4 sm:border-l-8 border-primary p-5 sm:p-8 md:p-12 hover:bg-[#111] transition-all cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-primary transition-colors uppercase">
                          {exp.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-2 mt-2 uppercase tracking-tight">
                          <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-xl">
                            <Briefcase size={18} className="shrink-0" />
                            <span>{exp.company}</span>
                          </div>

                          {exp.location && (
                            <div className="flex items-center gap-2 text-white/70 font-black text-sm sm:text-base">
                              <MapPin size={16} className="text-primary shrink-0" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-black bg-primary px-3 sm:px-4 py-2 uppercase self-start md:self-auto whitespace-nowrap">
                        <Calendar size={16} className="shrink-0" />
                        {exp.duration}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
                      {(exp.tech ?? []).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-white/70 border border-white/10 uppercase tracking-widest group-hover:border-primary/50 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </DialogTrigger>

                  <DialogContent className="bg-[#0b0b0b] border-2 border-primary/50 text-white w-[92vw] max-w-5xl rounded-none max-h-[85vh] overflow-y-auto">                  
                  <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-4xl font-black uppercase italic text-primary">
                      {exp.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-xl font-bold uppercase tracking-tight text-white/60 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2">
                      <span className="flex items-center gap-2">
                        <Briefcase size={16} className="text-primary shrink-0" />
                        <span>{exp.company}</span>
                      </span>

                      {exp.location && (
                        <span className="flex items-center gap-2 text-white/50">
                          <MapPin size={16} className="text-primary shrink-0" />
                          <span>{exp.location}</span>
                        </span>
                      )}

                      <span className="text-white/30">|</span>

                      <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary shrink-0" />
                        <span>{exp.duration}</span>
                      </span>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
                    <p className="text-base sm:text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-4 max-w-3xl">
                      "{exp.description}"
                    </p>

                    {exp.letterUrl && (
                      <a
                        href={exp.letterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-primary text-black font-black uppercase tracking-widest text-sm sm:text-base hover:opacity-90 transition"
                      >
                        <FileText size={18} />
                        View Internship Letter
                      </a>
                    )}

                    {(exp.contributions ?? []).length > 0 && (
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-xl sm:text-2xl font-black uppercase italic border-b border-white/10 pb-2">
                          Key Contributions
                        </h4>

                        <ul className="space-y-3">
                          {(exp.contributions ?? []).map((detail, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm sm:text-lg font-medium text-white/80"
                            >
                              <CheckCircle2
                                className="text-primary mt-1 flex-shrink-0"
                                size={18}
                              />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(exp.links ?? []).length > 0 && (
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-xl sm:text-2xl font-black uppercase italic border-b border-white/10 pb-2">
                          Live Projects
                        </h4>

                        <div className="flex flex-col gap-3">
                          {(exp.links ?? []).map((l) => (
                            <a
                              key={l.url}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary font-bold underline underline-offset-4 hover:text-white transition-colors text-base sm:text-lg break-all"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {(exp.tech ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
                        {(exp.tech ?? []).map((t) => (
                          <span
                            key={t}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] sm:text-xs font-black uppercase tracking-widest"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
