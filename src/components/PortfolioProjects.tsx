import { useState } from "react";
import { PortfolioData, Project } from "../types";
import { ExternalLink, Github, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioProjectsProps {
  data: PortfolioData;
}

export default function PortfolioProjects({ data }: PortfolioProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get all unique tags from all projects
  const allTags = ["All", ...Array.from(new Set(data.projects.flatMap((p) => p.tags)))];

  const filteredProjects =
    selectedTag === "All"
      ? data.projects
      : data.projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-16 bg-[#161616] border-t border-border/40 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              02 / Showcase
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
              Selected <span className="text-primary">Creations</span>
            </h2>
            <p className="text-xs text-muted-foreground font-light max-w-md">
              A curated selection of software applications, interactive digital graphics, and full-stack utilities. Click any card to expand deep documentation.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 max-w-full select-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-[#202020] hover:bg-[#282828] text-muted-foreground hover:text-foreground border border-border/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={proj.id}
                className="group bg-[#1a1a1a] border border-border rounded-lg overflow-hidden flex flex-col hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Image panel */}
                <div className="relative h-48 overflow-hidden bg-black/40">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover visual actions overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                      title="Expand Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-[#2a2a2a] text-foreground rounded-full hover:scale-110 active:scale-95 transition-transform"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {proj.featured && (
                    <div className="absolute top-3 left-3 bg-primary/25 border border-primary/40 text-primary font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                      Featured
                    </div>
                  )}
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#222] text-muted-foreground border border-border/40 font-mono text-[9px] px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#1a1a1a] border border-dashed border-border rounded-xl">
            <p className="text-xs font-mono text-muted-foreground">No projects match the selected filter criteria.</p>
          </div>
        )}

        {/* Detail Modal Dialog */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full max-w-2xl bg-[#141414] border border-border rounded-xl overflow-hidden shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-[#202020] text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Hero visual */}
                <div className="h-64 relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                </div>

                {/* Metadata & Description */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground font-sans">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#202020] text-primary border border-primary/20 font-mono text-[9px] px-2.5 py-0.5 rounded uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 min-w-[120px]"
                      >
                        <button className="w-full bg-primary text-primary-foreground font-bold font-mono uppercase text-xs tracking-wider py-3 rounded-md hover:scale-[1.02] active:scale-95 hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                          <ExternalLink className="w-4 h-4" /> Live Web Demo
                        </button>
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 min-w-[120px]"
                      >
                        <button className="w-full bg-[#202020] hover:bg-[#282828] text-foreground border border-border font-bold font-mono uppercase text-xs tracking-wider py-3 rounded-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                          <Github className="w-4 h-4" /> Browse Source Code
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
