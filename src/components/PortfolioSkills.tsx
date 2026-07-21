import { useState } from "react";
import { PortfolioData, Skill } from "../types";
import { Cpu, Eye, Code, Wrench, Shield } from "lucide-react";

interface PortfolioSkillsProps {
  data: PortfolioData;
}

export default function PortfolioSkills({ data }: PortfolioSkillsProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend" | "Design" | "Tools">("All");

  const categories: ("All" | "Frontend" | "Backend" | "Design" | "Tools")[] = [
    "All",
    "Frontend",
    "Backend",
    "Design",
    "Tools",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? data.skills
      : data.skills.filter((sk) => sk.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code className="w-4 h-4 text-primary" />;
      case "Backend":
        return <Cpu className="w-4 h-4 text-primary" />;
      case "Design":
        return <Eye className="w-4 h-4 text-primary" />;
      case "Tools":
        return <Wrench className="w-4 h-4 text-primary" />;
      default:
        return <Shield className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-16 bg-[#121212] border-t border-border/40 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            03 / Specializations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
            Technical <span className="text-primary">Capabilities</span>
          </h2>
          <p className="text-xs text-muted-foreground font-light max-w-md">
            Interactive breakdown of systems, languages, frameworks, and deployment workflows. Select category tabs to filter.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 select-none border-b border-border/40 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono rounded transition-colors flex items-center gap-2 cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary/10 border border-primary/30 text-primary font-semibold"
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-[#1a1a1a]"
              }`}
            >
              {cat !== "All" && getCategoryIcon(cat)}
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="space-y-2 group">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-foreground font-sans group-hover:text-primary transition-colors flex items-center gap-2">
                  <span className="p-1 bg-[#1a1a1a] border border-border/60 rounded">
                    {getCategoryIcon(skill.category)}
                  </span>
                  {skill.name}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">{skill.level}%</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-[#1a1a1a] border border-border/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full group-hover:brightness-110 transition-all duration-500 ease-out shadow-lg shadow-primary/20"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary Panel */}
        <div className="p-6 bg-[#181818] border border-border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mt-12">
          <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-border/40 pb-4 md:pb-0 md:pr-4">
            <h4 className="text-xs uppercase font-mono text-primary font-semibold">Continuous Growth</h4>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Always expanding my repertoire with emerging tools, standards, and cloud native architectures.
            </p>
          </div>
          <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-border/40 pb-4 md:pb-0 md:pr-4">
            <h4 className="text-xs uppercase font-mono text-primary font-semibold">Security Minded</h4>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Applying secure coding principles, OAuth specifications, and modular dependency hygiene to every project.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs uppercase font-mono text-primary font-semibold">Creative Vision</h4>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Perfecting pixel fidelity, spacing rhythms, dynamic color choices, and fluid, intuitive gestures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
