import { PortfolioData } from "../types";
import { Sparkles, Terminal, Code } from "lucide-react";

interface PortfolioAboutProps {
  data: PortfolioData;
}

export default function PortfolioAbout({ data }: PortfolioAboutProps) {
  const pillars = [
    {
      icon: <Terminal className="w-6 h-6 text-primary" />,
      title: "Clean Code Architect",
      desc: "Committed to robust type-safety, modular design, and writing production code that is clear, scalable, and easy to maintain.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Visual Storyteller",
      desc: "Marrying performance-first web development with fluid layouts, interactive canvas systems, and micro-animations.",
    },
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "Full-Stack Native",
      desc: "Experienced with frontend client applications, persistent databases, state engines, security layers, and cloud infrastructure.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-16 bg-[#121212] border-t border-border/40 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Short text header */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            01 / Professional Story
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
            Bridging Logic <br />
            <span className="text-primary">& Elegant Forms</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded" />
          <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed pt-2">
            {data.detailedBio}
          </p>
        </div>

        {/* Right column: Pillars Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#161616] border border-border rounded-lg flex flex-col md:flex-row gap-4 items-start hover:border-primary/40 hover:translate-y-[-2px] transition-all duration-300"
            >
              <div className="p-3 bg-[#1e1e1e] border border-border rounded-lg shrink-0">
                {pillar.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground font-mono">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
