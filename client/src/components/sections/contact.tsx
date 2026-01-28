import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <footer id="contact" className="bg-[#050505] pt-40 pb-20 relative border-t-8 border-primary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black font-display mb-10 uppercase italic leading-none">
              Let's <br /> <span className="text-primary">Connect</span>
            </h2>
            <p className="text-muted-foreground text-2xl max-w-lg mb-12 font-medium leading-tight uppercase tracking-tighter">
              "Got a website idea, need backend support, or want to automate something?"
            </p>

            <div className="space-y-10">
              <a href="mailto:ibrahimkhanwork7@gmail.com" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <Mail size={32} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Email</p>
                  <p className="text-2xl font-black text-white group-hover:text-primary transition-colors">ibrahimkhanwork7@gmail.com</p>
                </div>
              </a>
              
              <a href="https://linkedin.com/in/muhammad-ibrahim-khan-a97372354" target="_blank" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <Linkedin size={32} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">LinkedIn</p>
                  <p className="text-2xl font-black text-white group-hover:text-primary transition-colors">muhammad-ibrahim-khan</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-primary">
                  <Phone size={32} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Phone</p>
                  <p className="text-2xl font-black text-white">+92-3345019225</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card p-10 md:p-16 border-2 border-white/5"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-primary">Name</label>
                  <Input placeholder="Enter Name" className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none h-12 focus:border-primary text-xl font-bold p-0" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-primary">Email</label>
                  <Input placeholder="Enter Email" className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none h-12 focus:border-primary text-xl font-bold p-0" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-primary">Message</label>
                <Textarea placeholder="What's on your mind?" className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none min-h-[150px] focus:border-primary text-xl font-bold p-0 resize-none" />
              </div>
              <Button className="w-full h-20 bg-primary text-black font-black text-2xl uppercase tracking-tighter hover:scale-[1.02] transition-transform rounded-none flex gap-4">
                Send Transmission <Send size={24} />
              </Button>
            </form>
          </motion.div>
        </div>

        <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">© 2026 MUHAMMAD IBRAHIM KHAN</p>
          <div className="flex gap-10">
            <a href="#" className="text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
