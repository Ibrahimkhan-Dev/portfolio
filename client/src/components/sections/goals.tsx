import { motion } from "framer-motion";
import { Lightbulb, Rocket, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Goals() {
  return (
    <section id="goals" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Future Goals & Vision</h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Constantly pushing boundaries and exploring new technologies. Here is what I am focused on next.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Learning Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0 }}
          >
            <Card className="h-full bg-card/50 border-white/5 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Rocket size={24} />
                </div>
                <CardTitle className="text-xl font-bold">What I'm Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Rust for WebAssembly", "WebGPU Shaders", "AI Agent Architecture"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground/90 font-medium">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tools to Master */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full bg-card/50 border-white/5 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Target size={24} />
                </div>
                <CardTitle className="text-xl font-bold">Tools to Master</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Unreal Engine 5", "Blender Geometry Nodes", "TouchDesigner"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground/90 font-medium">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Ideas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 border-white/5 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Lightbulb size={24} />
                </div>
                <CardTitle className="text-xl font-bold">Project Ideas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Generative Art Platform", 
                  "3D Portfolio Builder SaaS", 
                  "Decentralized Social Graph"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <Zap size={16} className="text-yellow-400" />
                    <span className="text-foreground/90 font-medium">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
