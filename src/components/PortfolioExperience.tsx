import { PortfolioData } from "../types";
import { Briefcase, Calendar } from "lucide-react";

interface PortfolioExperienceProps {
  data: PortfolioData;
}

export default function PortfolioExperience({ data }: PortfolioExperienceProps) {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-16 bg-[#161616] border-t border-border/40 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="space-y-3 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            04 / Trajectory
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
            Professional <span className="text-primary">Journey</span>
          </h2>
          <p className="text-xs text-muted-foreground font-light max-w-md mx-auto">
            A chronological timeline of roles, team partnerships, and key technology deliverables.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-border/60 pl-6 md:pl-8 space-y-10 ml-2 md:ml-4 select-none">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Glowing Indicator Node */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 bg-[#141414] border border-border group-hover:border-primary rounded-full flex items-center justify-center transition-colors duration-300">
                <div className="w-1.5 h-1.5 bg-muted-foreground/60 group-hover:bg-primary rounded-full transition-colors duration-300" />
              </div>

              {/* Card Container */}
              <div className="bg-[#1a1a1a] border border-border hover:border-primary/30 rounded-lg p-6 space-y-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground font-sans flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {exp.role}
                    </h3>
                    <div className="text-xs font-mono text-primary font-semibold">{exp.company}</div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Main description */}
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {exp.description}
                </p>

                {/* Experience tools tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black/40 text-muted-foreground border border-border/60 font-mono text-[9px] px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
