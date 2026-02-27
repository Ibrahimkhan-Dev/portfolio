import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-8xl font-black font-display uppercase italic text-primary">404</h1>
        <p className="text-2xl font-bold text-muted-foreground uppercase tracking-tighter">
          Page Not Found
        </p>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-3 bg-primary text-black px-8 py-4 font-black uppercase tracking-widest hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20} />
          Back Home
        </a>
      </div>
    </div>
  );
}
