import { Button } from "@/src/components/ui/button";
import { PortfolioData } from "../types";
import { Code2 } from "lucide-react";

interface PortfolioNavbarProps {
  data: PortfolioData;
}

export default function PortfolioNavbar({ data }: PortfolioNavbarProps) {
  const sections = [
    { label: "About", id: "#about" },
    { label: "Projects", id: "#projects" },
    { label: "Skills", id: "#skills" },
    { label: "Experience", id: "#experience" },
    { label: "Contact", id: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 lg:px-16 py-5 bg-black/40 backdrop-blur-md border-b border-border/40 select-none">
      {/* Left: Branding with premium micro-interactions */}
      <a
        href="#"
        className="group/brand text-foreground text-base md:text-lg font-bold tracking-tight transition-all flex items-center gap-2 font-mono uppercase"
      >
        <Code2 className="w-5 h-5 text-primary group-hover/brand:rotate-12 transition-transform duration-300" />
        <span className="relative">
          <span>{data.name.split(" ")[0]}</span>
          <span className="text-primary">.dev</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary group-hover/brand:w-full transition-all duration-300" />
        </span>
      </a>

      {/* Center: Nav links */}
      <div className="hidden md:flex gap-8 items-center">
        {sections.map((sec) => (
          <a
            key={sec.label}
            href={sec.id}
            className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-mono"
          >
            {sec.label}
          </a>
        ))}
      </div>

      {/* Right: Contact button */}
      <a href="#contact" className="hidden md:inline-flex">
        <Button
          variant="navCta"
          size="sm"
          className="rounded-lg uppercase text-[10px] tracking-widest px-5 py-2 font-mono"
        >
          Get In Touch
        </Button>
      </a>
    </nav>
  );
}
