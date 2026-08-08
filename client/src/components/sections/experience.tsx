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
import { experiences } from "@/data/experiences";
import { Reveal } from "@/components/ui/site-animations";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-y border-white/5 bg-[#080808] py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal y={0} className="mb-12 sm:mb-20">
          <h2 className="mb-4 font-display text-4xl font-black uppercase italic text-white sm:text-5xl md:text-7xl">
            Work Experience
          </h2>

          <div className="h-2 w-32 bg-primary sm:w-40" />
        </Reveal>

        <div className="grid gap-6 sm:gap-8">
          {experiences.map((exp, index) => (
            <Reveal key={exp.id} delay={index * 0.1}>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group w-full cursor-pointer border-0 border-l-4 border-primary bg-card p-5 text-left transition-all hover:bg-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:border-l-8 sm:p-8 md:p-12"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <h3 className="text-2xl font-black uppercase text-white transition-colors group-hover:text-primary sm:text-3xl">
                          {exp.title}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 uppercase tracking-tight sm:gap-x-8">
                          <div className="flex items-center gap-2 text-base font-bold text-primary sm:text-xl">
                            <Briefcase
                              size={18}
                              className="shrink-0"
                              aria-hidden="true"
                            />

                            <span>{exp.company}</span>
                          </div>

                          {exp.location && (
                            <div className="flex items-center gap-2 text-sm font-black text-white/70 sm:text-base">
                              <MapPin
                                size={16}
                                className="shrink-0 text-primary"
                                aria-hidden="true"
                              />

                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start whitespace-nowrap bg-primary px-3 py-2 text-xs font-black uppercase text-black sm:px-4 sm:text-sm md:self-auto">
                        <Calendar
                          size={16}
                          className="shrink-0"
                          aria-hidden="true"
                        />

                        {exp.duration}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                      {(exp.tech ?? []).map((technology) => (
                        <span
                          key={technology}
                          className="border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/70 transition-colors group-hover:border-primary/50 sm:px-4 sm:py-2 sm:text-xs"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-h-[85vh] w-[92vw] max-w-5xl overflow-y-auto rounded-none border-2 border-primary/50 bg-[#0b0b0b] text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic text-primary sm:text-4xl">
                      {exp.title}
                    </DialogTitle>

                    <DialogDescription className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-bold uppercase tracking-tight text-white/60 sm:gap-x-4 sm:text-xl">
                      <span className="flex items-center gap-2">
                        <Briefcase
                          size={16}
                          className="shrink-0 text-primary"
                          aria-hidden="true"
                        />

                        <span>{exp.company}</span>
                      </span>

                      {exp.location && (
                        <span className="flex items-center gap-2 text-white/50">
                          <MapPin
                            size={16}
                            className="shrink-0 text-primary"
                            aria-hidden="true"
                          />

                          <span>{exp.location}</span>
                        </span>
                      )}

                      <span className="text-white/30" aria-hidden="true">
                        |
                      </span>

                      <span className="flex items-center gap-2">
                        <Calendar
                          size={16}
                          className="shrink-0 text-primary"
                          aria-hidden="true"
                        />

                        <span>{exp.duration}</span>
                      </span>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                    <p className="max-w-3xl border-l-4 border-primary pl-4 text-base font-medium italic leading-relaxed text-muted-foreground sm:text-xl">
                      “{exp.description}”
                    </p>

                    {exp.letterUrl && (
                      <a
                        href={exp.letterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary px-4 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-6 sm:text-base"
                      >
                        <FileText size={18} aria-hidden="true" />
                        View Internship Letter
                      </a>
                    )}

                    {(exp.contributions ?? []).length > 0 && (
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="border-b border-white/10 pb-2 text-xl font-black uppercase italic sm:text-2xl">
                          Key Contributions
                        </h4>

                        <ul className="space-y-3">
                          {(exp.contributions ?? []).map(
                            (contribution, contributionIndex) => (
                              <li
                                key={contributionIndex}
                                className="flex items-start gap-3 text-sm font-medium text-white/80 sm:text-lg"
                              >
                                <CheckCircle2
                                  className="mt-1 shrink-0 text-primary"
                                  size={18}
                                  aria-hidden="true"
                                />

                                <span>{contribution}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {(exp.links ?? []).length > 0 && (
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="border-b border-white/10 pb-2 text-xl font-black uppercase italic sm:text-2xl">
                          Live Projects
                        </h4>

                        <div className="flex flex-col gap-3">
                          {(exp.links ?? []).map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-base font-bold text-primary underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-lg"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {(exp.tech ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 sm:gap-3">
                        {(exp.tech ?? []).map((technology) => (
                          <span
                            key={technology}
                            className="border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary sm:px-4 sm:py-2 sm:text-xs"
                          >
                            {technology}
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