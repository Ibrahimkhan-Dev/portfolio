import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "Neon Dashboard",
    description: "A futuristic analytics dashboard focusing on data visualization and real-time updates.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "D3.js", "Tailwind"],
    links: { demo: "#", github: "#" }
  },
  {
    id: 2,
    title: "3D Product Configurator",
    description: "Interactive e-commerce tool allowing users to customize products in real-time 3D.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    tags: ["Three.js", "React Fiber", "Zustand"],
    links: { demo: "#", github: "#" }
  },
  {
    id: 3,
    title: "Crypto Portfolio",
    description: "Secure and minimal cryptocurrency tracker with live market data integration.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Web3", "CoinGecko API"],
    links: { demo: "#", github: "#" }
  },
  {
    id: 4,
    title: "AI Chat Interface",
    description: "Clean and responsive chat UI for large language models with streaming responses.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    tags: ["TypeScript", "OpenAI API", "Vercel SDK"],
    links: { demo: "#", github: "#" }
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-between items-end"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors">
            View all projects <ArrowRight size={16} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="group overflow-hidden bg-card border-white/5 hover:border-primary/50 transition-all duration-500 h-full">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40 backdrop-blur-sm">
                    <a href={project.links.demo} className="p-3 bg-primary rounded-full text-black hover:scale-110 transition-transform">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.links.github} className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 text-white/80 hover:text-primary hover:bg-white/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="flex items-center justify-center gap-2 text-primary font-medium">
            View all projects <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
