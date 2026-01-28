import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Education Column */}
          <div>
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-primary" size={32} />
                <h2 className="text-3xl font-bold font-display">Education</h2>
              </div>
            </motion.div>

            <div className="space-y-8">
              {[1, 2].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-colors group"
                >
                  <span className="text-sm text-primary font-medium">2015 - 2019</span>
                  <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">Bachelor of Computer Science</h3>
                  <p className="text-muted-foreground mt-2">University of Technology</p>
                  <p className="text-muted-foreground/60 text-sm mt-4">
                    Specialized in Software Engineering and Artificial Intelligence. Graduated with Honors.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div>
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-primary" size={32} />
                <h2 className="text-3xl font-bold font-display">Certifications</h2>
              </div>
            </motion.div>

            <div className="grid gap-6">
              {[
                { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
                { title: "Google UX Design Professional", issuer: "Coursera" },
                { title: "Meta Frontend Developer", issuer: "Meta" }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div>
                    <h4 className="font-bold group-hover:text-primary transition-colors">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Award className="text-white/10 group-hover:text-primary transition-colors" size={24} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
