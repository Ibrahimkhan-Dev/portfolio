import { motion } from "framer-motion";
import { Mail, Phone, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <footer id="contact" className="bg-[#050505] pt-20 sm:pt-32 md:pt-40 pb-12 sm:pb-20 relative border-t-8 border-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-display mb-6 sm:mb-10 uppercase italic leading-none">
              Let's <br /> <span className="text-primary">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-2xl max-w-lg mb-8 sm:mb-12 font-medium leading-tight uppercase tracking-tighter">
              "Got a website idea, need backend support, or want to automate something?"
            </p>

            <div className="space-y-6 sm:space-y-10">
              <a href="mailto:ibrahimkhanwork7@gmail.com" className="flex items-center gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Email</p>
                  <p className="text-base sm:text-2xl font-black text-white group-hover:text-primary transition-colors truncate">ibrahimkhanwork7@gmail.com</p>
                </div>
              </a>
              
              <a href="https://linkedin.com/in/muhammad-ibrahim-khan-8022a7375" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                  <Linkedin className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">LinkedIn</p>
                  <p className="text-base sm:text-2xl font-black text-white group-hover:text-primary transition-colors truncate">muhammad-ibrahim-khan</p>
                </div>
              </a>

              <a href="tel:+923345019225" className="flex items-center gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Phone</p>
                  <p className="text-base sm:text-2xl font-black text-white group-hover:text-primary transition-colors">+92-3345019225</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card p-6 sm:p-10 md:p-16 border-2 border-white/5"
          >
            <form className="space-y-6 sm:space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-black uppercase tracking-widest text-primary">Name</label>
                  <Input id="contact-name" name="name" placeholder="Enter Name" className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none h-12 focus:border-primary text-lg sm:text-xl font-bold p-0" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-widest text-primary">Email</label>
                  <Input id="contact-email" name="email" type="email" placeholder="Enter Email" className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none h-12 focus:border-primary text-lg sm:text-xl font-bold p-0" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-widest text-primary">Message</label>
                <Textarea id="contact-message" name="message" placeholder="What's on your mind?" className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none min-h-[120px] sm:min-h-[150px] focus:border-primary text-lg sm:text-xl font-bold p-0 resize-none" />
              </div>
              <Button className="w-full h-16 sm:h-20 bg-primary text-black font-black text-lg sm:text-2xl uppercase tracking-tighter hover:scale-[1.02] transition-transform rounded-none flex gap-3 sm:gap-4">
                Send Transmission <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </form>
          </motion.div>
        </div>

        <div className="mt-20 sm:mt-40 pt-8 sm:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30">&copy; {new Date().getFullYear()} MUHAMMAD IBRAHIM KHAN</p>
          <div className="flex gap-6 sm:gap-10">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Privacy</span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
