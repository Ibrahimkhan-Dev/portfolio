import { useState } from "react";
import { Mail, Phone, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/ui/site-animations";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:ibrahimkhanwork7@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer id="contact" className="bg-[#050505] pt-14 sm:pt-20 md:pt-24 pb-10 sm:pb-14 relative border-t-8 border-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
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
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-card p-6 sm:p-10 md:p-16 border-2 border-white/5">
              <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-black uppercase tracking-widest text-primary">Name</label>
                    <Input id="contact-name" name="name" required placeholder="Enter Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none h-12 focus:border-primary text-lg sm:text-xl font-bold p-0" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-widest text-primary">Email</label>
                    <Input id="contact-email" name="email" type="email" required placeholder="Enter Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none h-12 focus:border-primary text-lg sm:text-xl font-bold p-0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-widest text-primary">Message</label>
                  <Textarea id="contact-message" name="message" required placeholder="What's on your mind?" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="bg-transparent border-b-2 border-x-0 border-t-0 border-white/10 rounded-none min-h-[120px] sm:min-h-[150px] focus:border-primary text-lg sm:text-xl font-bold p-0 resize-none" />
                </div>
                <Button type="submit" className="w-full h-16 sm:h-20 bg-primary text-black font-black text-lg sm:text-2xl uppercase tracking-tighter hover:scale-[1.02] transition-transform rounded-none flex gap-3 sm:gap-4">
                  Send Transmission <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </form>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 sm:mt-40 pt-8 sm:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30">&copy; {new Date().getFullYear()} MUHAMMAD IBRAHIM KHAN</p>
          <div className="flex gap-6 sm:gap-10">
            <a href="#" className="text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
