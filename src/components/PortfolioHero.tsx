import { Github, Linkedin, Twitter, Mail, ArrowDown, MapPin, Send } from "lucide-react";
import { PortfolioData } from "../types";

interface PortfolioHeroProps {
  data: PortfolioData;
}

export default function PortfolioHero({ data }: PortfolioHeroProps) {
  const getSocialIcon = (key: string) => {
    switch (key) {
      case "github":
        return <Github className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      case "telegram":
        return <Send className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden select-none">

      {/* Hero Content Area */}
      <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-12 pb-16 md:pb-24 pt-32 flex flex-col items-start justify-end">
        {/* Status Tag */}
        <div
          className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4 opacity-0 animate-fade-up pointer-events-auto"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] font-mono text-primary font-medium uppercase tracking-widest">
            Available for Select Projects
          </span>
        </div>

        {/* Dynamic Name with premium interactive styling */}
        <div className="relative group/name mb-3 md:mb-5">
          <h1
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] uppercase opacity-0 animate-fade-up select-none flex flex-wrap gap-x-4"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="relative inline-block transition-transform duration-300 group-hover/name:translate-x-1 bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
              {data.name.split(" ")[0]}
            </span>{" "}
            <span className="relative inline-block text-primary drop-shadow-[0_0_12px_rgba(34,197,94,0.4)] transition-all duration-300 group-hover/name:scale-105 group-hover/name:-translate-y-1">
              {data.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          {/* Cyberpunk stylish expanding underline */}
          <div
            className="h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent w-20 group-hover/name:w-44 transition-all duration-500 ease-out mt-1 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* Dynamic Role / Subheading */}
        <p
          className="text-foreground/90 text-[clamp(1.125rem,2vw,1.75rem)] font-light mb-3 md:mb-5 opacity-0 animate-fade-up tracking-tight"
          style={{ animationDelay: "0.4s" }}
        >
          {data.role}
        </p>

        {/* Location badge */}
        <div
          className="flex items-center gap-1.5 text-muted-foreground/80 text-xs font-mono mb-4 md:mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>{data.location}</span>
        </div>

        {/* Description / Catchphrase */}
        <p
          className="text-muted-foreground text-[clamp(0.875rem,1.35vw,1.15rem)] font-light mb-6 md:mb-8 opacity-0 animate-fade-up leading-relaxed max-w-xl"
          style={{ animationDelay: "0.6s" }}
        >
          {data.bio}
        </p>

        {/* Social and CTA section */}
        <div
          className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-up pointer-events-auto"
          style={{ animationDelay: "0.75s" }}
        >
          <a href="#projects">
            <button className="bg-primary text-primary-foreground font-bold font-mono uppercase text-xs tracking-wider px-6 py-3.5 md:px-8 md:py-4 rounded-sm cursor-pointer hover:scale-105 active:scale-95 hover:brightness-110 transition-all">
              View Work
            </button>
          </a>
          <a href="#contact">
            <button className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold font-mono uppercase text-xs tracking-wider px-6 py-3.5 md:px-8 md:py-4 rounded-sm cursor-pointer hover:scale-105 active:scale-95 transition-all">
              Contact Me
            </button>
          </a>

          {/* Social icons */}
          <div className="flex gap-3 ml-2">
            {Object.entries(data.socials).map(([key, url]) => {
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url.startsWith("http") ? url : `mailto:${url}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1e1e1e]/60 border border-border rounded-full hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-200"
                  title={key}
                >
                  {getSocialIcon(key)}
                </a>
              );
            })}
          </div>
        </div>

        {/* Trust stats or details */}
        <div
          className="flex gap-8 mt-10 md:mt-14 border-t border-border/40 pt-6 w-full opacity-0 animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          {data.stats.map((stat, sIdx) => (
            <div key={sIdx} className="font-mono">
              <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-widest mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-muted-foreground/60 text-[10px] tracking-widest uppercase font-mono animate-bounce">
        <span>Scroll</span>
        <ArrowDown className="w-3 h-3 text-primary" />
      </div>
    </section>
  );
}
