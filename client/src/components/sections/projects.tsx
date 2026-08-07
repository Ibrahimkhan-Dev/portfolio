import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Maximize2,
} from "lucide-react";
import { Link } from "wouter";

import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/site-animations";
import { projects } from "@/data/portfolio";

const CLOUDINARY_HOST = "res.cloudinary.com";
const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

function isCloudinaryImage(source: string) {
  return (
    source.includes(CLOUDINARY_HOST) &&
    source.includes(CLOUDINARY_UPLOAD_SEGMENT)
  );
}

function getOptimizedProjectImageUrl(
  source: string,
  width: number,
) {
  if (!isCloudinaryImage(source)) {
    return source;
  }

  return source.replace(
    CLOUDINARY_UPLOAD_SEGMENT,
    `${CLOUDINARY_UPLOAD_SEGMENT}f_auto,q_auto:eco,c_limit,w_${width}/`,
  );
}

function getProjectImageSrcSet(source: string) {
  if (!isCloudinaryImage(source)) {
    return undefined;
  }

  return [
    `${getOptimizedProjectImageUrl(source, 480)} 480w`,
    `${getOptimizedProjectImageUrl(source, 800)} 800w`,
    `${getOptimizedProjectImageUrl(source, 1200)} 1200w`,
  ].join(", ");
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-background py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-24 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 font-display text-4xl font-black uppercase sm:text-5xl md:text-7xl">
              Projects
            </h2>

            <div
              aria-hidden="true"
              className="h-2 w-32 bg-primary sm:w-40"
            />
          </div>
        </Reveal>

        <div className="grid items-stretch gap-6 sm:gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 0.1}
              className="h-full"
            >
              <Link
                href={`/project/${project.id}`}
                aria-label={`View ${project.title} case study`}
                className="block h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="group relative flex h-full flex-col overflow-hidden rounded-none border-2 border-white/5 bg-card p-6 transition-all duration-500 hover:border-primary sm:p-10">
                    <div className="mb-6 flex h-48 items-center justify-center overflow-hidden border border-white/10 bg-card sm:mb-8 sm:h-56">
                      {project.image ? (
                        <img
                          src={getOptimizedProjectImageUrl(
                            project.image,
                            800,
                          )}
                          srcSet={getProjectImageSrcSet(
                            project.image,
                          )}
                          sizes={
                            isCloudinaryImage(project.image)
                              ? "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                              : undefined
                          }
                          alt={`${project.title} project preview`}
                          width={1200}
                          height={675}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="inline-block p-4">
                          {project.icon ?? (
                            <Layers
                              className="text-primary"
                              size={32}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {project.category && (
                      <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                        {project.category}
                      </div>
                    )}

                    <h3 className="mb-3 text-2xl font-black uppercase italic tracking-tighter transition-colors group-hover:text-primary sm:mb-4 sm:text-4xl">
                      {project.title}
                    </h3>

                    <p className="mb-6 line-clamp-2 grow text-base font-medium leading-relaxed text-muted-foreground sm:mb-8 sm:text-lg">
                      {project.shortDesc}
                    </p>

                    <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
                      {(project.tech?.slice(0, 3) ?? []).map(
                        (tag) => (
                          <span
                            key={tag}
                            className="border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 sm:px-3"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary transition-transform group-hover:translate-x-2 sm:text-sm">
                      View Case Study

                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                      />
                    </div>

                    <div
                      aria-hidden="true"
                      className="absolute right-0 top-0 hidden p-4 opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                    >
                      <Maximize2
                        className="text-primary/30"
                        size={60}
                      />
                    </div>
                  </Card>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}