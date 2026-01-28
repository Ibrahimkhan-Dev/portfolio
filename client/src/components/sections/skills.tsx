import { motion } from "framer-motion";

const skills = {
  "Frontend": [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 98 },
    { name: "Three.js / WebGL", level: 85 },
    { name: "Framer Motion", level: 92 },
  ],
  "Backend": [
    { name: "Node.js", level: 88 },
    { name: "PostgreSQL", level: 80 },
    { name: "GraphQL", level: 75 },
    { name: "Python", level: 70 },
  ],
  "Design": [
    { name: "Figma", level: 90 },
    { name: "UI/UX Principles", level: 85 },
    { name: "3D Modeling (Blender)", level: 60 },
  ]
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Technical Skills</h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 text-primary border-b border-white/10 pb-2 inline-block">
                {category}
              </h3>
              
              <div className="space-y-6">
                {items.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(255,212,0,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
