import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Check,
  Briefcase,
  Layers,
  User,
  Wrench,
  ChevronDown,
  ChevronUp,
  Sliders,
  Copy,
} from "lucide-react";
import { PortfolioData, Project, Skill, Experience } from "../types";
import { defaultPortfolioData } from "../data";

interface PortfolioEditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  onReset: () => void;
}

export default function PortfolioEditor({ data, onChange, onReset }: PortfolioEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "projects" | "skills" | "experience">("info");
  const [isCopied, setIsCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // local state mirrors
  const [localData, setLocalData] = useState<PortfolioData>(data);

  // Sync state when props change (like reset)
  const handleSyncFromProps = () => {
    setLocalData(data);
  };

  const handleUpdateField = (field: keyof PortfolioData, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange(updated);
  };

  const handleUpdateSocial = (socialKey: keyof typeof data.socials, value: string) => {
    const updated = {
      ...localData,
      socials: {
        ...localData.socials,
        [socialKey]: value,
      },
    };
    setLocalData(updated);
    onChange(updated);
  };

  const handleUpdateStat = (index: number, key: "label" | "value", value: string) => {
    const updatedStats = [...localData.stats];
    updatedStats[index] = { ...updatedStats[index], [key]: value };
    handleUpdateField("stats", updatedStats);
  };

  // Projects list management
  const handleUpdateProject = (index: number, key: keyof Project, value: any) => {
    const updatedProjects = [...localData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [key]: value };
    handleUpdateField("projects", updatedProjects);
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Short catchphrase or description.",
      longDescription: "Detailed breakdown of the project goals, tech choices, and architecture.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "TypeScript"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    };
    handleUpdateField("projects", [newProject, ...localData.projects]);
  };

  const handleDeleteProject = (id: string) => {
    const filtered = localData.projects.filter((p) => p.id !== id);
    handleUpdateField("projects", filtered);
  };

  // Skills list management
  const handleUpdateSkill = (index: number, key: keyof Skill, value: any) => {
    const updatedSkills = [...localData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [key]: value };
    handleUpdateField("skills", updatedSkills);
  };

  const handleAddSkill = () => {
    const newSkill: Skill = {
      name: "New Skill",
      category: "Frontend",
      level: 80,
    };
    handleUpdateField("skills", [...localData.skills, newSkill]);
  };

  const handleDeleteSkill = (index: number) => {
    const filtered = localData.skills.filter((_, i) => i !== index);
    handleUpdateField("skills", filtered);
  };

  // Experience management
  const handleUpdateExperience = (index: number, key: keyof Experience, value: any) => {
    const updatedExp = [...localData.experience];
    updatedExp[index] = { ...updatedExp[index], [key]: value };
    handleUpdateField("experience", updatedExp);
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: "Software Engineer",
      company: "Innovate Corp",
      duration: "2024 - Present",
      description: "Designed enterprise-grade features and improved scalability of frontend apps.",
      tags: ["React", "Tailwind"],
    };
    handleUpdateField("experience", [newExp, ...localData.experience]);
  };

  const handleDeleteExperience = (id: string) => {
    const filtered = localData.experience.filter((e) => e.id !== id);
    handleUpdateField("experience", filtered);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(localData, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTriggerReset = () => {
    if (window.confirm("Are you sure you want to reset all portfolio fields to default showcase values?")) {
      onReset();
      setLocalData(defaultPortfolioData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <>
      {/* Floating control trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-xs uppercase tracking-widest font-mono"
        id="open-editor-btn"
      >
        <Sliders className="w-4 h-4" />
        Edit Portfolio
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
          >
            {/* Modal Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-xl bg-[#141414] border-l border-border h-full flex flex-col shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-primary animate-pulse" />
                  <div>
                    <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase font-mono">
                      Portfolio Customizer
                    </h2>
                    <p className="text-[10px] text-muted-foreground">
                      Changes persist immediately in your preview session!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[#2a2a2a] rounded transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs list */}
              <div className="flex border-b border-border bg-[#181818] text-xs font-mono select-none">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                    activeTab === "info"
                      ? "border-primary text-primary bg-[#1f1f1f]"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                    activeTab === "projects"
                      ? "border-primary text-primary bg-[#1f1f1f]"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Work
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                    activeTab === "skills"
                      ? "border-primary text-primary bg-[#1f1f1f]"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Skills
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                    activeTab === "experience"
                      ? "border-primary text-primary bg-[#1f1f1f]"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  History
                </button>
              </div>

              {/* Editable Form Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === "info" && (
                  <div className="space-y-4 font-sans">
                    <h3 className="text-xs uppercase tracking-wider font-mono text-primary font-semibold">
                      Basic Credentials
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={localData.name}
                          onChange={(e) => handleUpdateField("name", e.target.value)}
                          className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={localData.location}
                          onChange={(e) => handleUpdateField("location", e.target.value)}
                          className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                        Professional Role
                      </label>
                      <input
                        type="text"
                        value={localData.role}
                        onChange={(e) => handleUpdateField("role", e.target.value)}
                        className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                        Intro tagline (Hero Section)
                      </label>
                      <textarea
                        value={localData.bio}
                        onChange={(e) => handleUpdateField("bio", e.target.value)}
                        rows={2}
                        className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                        Detailed About Me
                      </label>
                      <textarea
                        value={localData.detailedBio}
                        onChange={(e) => handleUpdateField("detailedBio", e.target.value)}
                        rows={4}
                        className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all resize-none leading-relaxed"
                      />
                    </div>

                    <h3 className="text-xs uppercase tracking-wider font-mono text-primary font-semibold pt-2">
                      Social & Reach
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                          GitHub Link
                        </label>
                        <input
                          type="text"
                          value={localData.socials.github || ""}
                          onChange={(e) => handleUpdateSocial("github", e.target.value)}
                          placeholder="https://github.com"
                          className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                          LinkedIn Link
                        </label>
                        <input
                          type="text"
                          value={localData.socials.linkedin || ""}
                          onChange={(e) => handleUpdateSocial("linkedin", e.target.value)}
                          placeholder="https://linkedin.com"
                          className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                          Twitter Link
                        </label>
                        <input
                          type="text"
                          value={localData.socials.twitter || ""}
                          onChange={(e) => handleUpdateSocial("twitter", e.target.value)}
                          placeholder="https://twitter.com"
                          className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={localData.socials.email || ""}
                          onChange={(e) => handleUpdateSocial("email", e.target.value)}
                          placeholder="hello@example.com"
                          className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-muted-foreground uppercase font-mono mb-1">
                          Telegram Link / Username
                        </label>
                        <input
                          type="text"
                          value={localData.socials.telegram || ""}
                          onChange={(e) => handleUpdateSocial("telegram", e.target.value)}
                          placeholder="https://t.me/username"
                          className="w-full bg-[#1e1e1e] border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                    </div>

                    <h3 className="text-xs uppercase tracking-wider font-mono text-primary font-semibold pt-2">
                      Highlights Stats
                    </h3>
                    <div className="space-y-3">
                      {localData.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="grid grid-cols-2 gap-3 items-center">
                          <div>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => handleUpdateStat(sIdx, "label", e.target.value)}
                              placeholder="Stat Label"
                              className="w-full bg-[#1e1e1e] border border-border rounded px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => handleUpdateStat(sIdx, "value", e.target.value)}
                              placeholder="Value (e.g. 10+)"
                              className="w-full bg-[#1e1e1e] border border-border rounded px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-mono"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs uppercase tracking-wider font-mono text-primary font-semibold">
                        Manage Projects
                      </h3>
                      <button
                        onClick={handleAddProject}
                        className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Project
                      </button>
                    </div>

                    <div className="space-y-4">
                      {localData.projects.map((proj, pIdx) => (
                        <div
                          key={proj.id}
                          className="bg-[#181818] border border-border rounded-lg p-4 relative space-y-3 group"
                        >
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono select-none cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!proj.featured}
                                onChange={(e) => handleUpdateProject(pIdx, "featured", e.target.checked)}
                                className="rounded bg-black border-border text-primary focus:ring-0"
                              />
                              Featured
                            </label>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="pr-16">
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => handleUpdateProject(pIdx, "title", e.target.value)}
                              className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-sm font-semibold text-foreground w-full py-0.5"
                              placeholder="Project Title"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-1">
                              Brief description
                            </label>
                            <input
                              type="text"
                              value={proj.description}
                              onChange={(e) => handleUpdateProject(pIdx, "description", e.target.value)}
                              className="w-full bg-[#202020] border border-border rounded px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-1">
                              Detailed Description
                            </label>
                            <textarea
                              value={proj.longDescription || ""}
                              onChange={(e) => handleUpdateProject(pIdx, "longDescription", e.target.value)}
                              rows={2}
                              className="w-full bg-[#202020] border border-border rounded px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary transition-all resize-none"
                              placeholder="Explain details of the project..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                Image Link
                              </label>
                              <input
                                type="text"
                                value={proj.image}
                                onChange={(e) => handleUpdateProject(pIdx, "image", e.target.value)}
                                className="w-full bg-[#202020] border border-border rounded px-2 py-0.5 text-[10px] text-foreground font-mono focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                Technologies (comma-separated)
                              </label>
                              <input
                                type="text"
                                value={proj.tags.join(", ")}
                                onChange={(e) =>
                                  handleUpdateProject(
                                    pIdx,
                                    "tags",
                                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                                  )
                                }
                                className="w-full bg-[#202020] border border-border rounded px-2 py-0.5 text-[10px] text-foreground font-mono focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                Demo Link
                              </label>
                              <input
                                type="text"
                                value={proj.demoUrl || ""}
                                onChange={(e) => handleUpdateProject(pIdx, "demoUrl", e.target.value)}
                                className="w-full bg-[#202020] border border-border rounded px-2 py-0.5 text-[10px] text-foreground font-mono focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                GitHub Code Link
                              </label>
                              <input
                                type="text"
                                value={proj.githubUrl || ""}
                                onChange={(e) => handleUpdateProject(pIdx, "githubUrl", e.target.value)}
                                className="w-full bg-[#202020] border border-border rounded px-2 py-0.5 text-[10px] text-foreground font-mono focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs uppercase tracking-wider font-mono text-primary font-semibold">
                        Expertise & Skills
                      </h3>
                      <button
                        onClick={handleAddSkill}
                        className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Skill
                      </button>
                    </div>

                    <div className="space-y-3">
                      {localData.skills.map((sk, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-3 bg-[#181818] border border-border p-3 rounded-lg text-xs"
                        >
                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              value={sk.name}
                              onChange={(e) => handleUpdateSkill(sIdx, "name", e.target.value)}
                              className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-foreground font-semibold py-0.5 w-full"
                            />
                          </div>

                          <div className="w-28">
                            <select
                              value={sk.category}
                              onChange={(e) => handleUpdateSkill(sIdx, "category", e.target.value)}
                              className="bg-[#202020] border border-border rounded px-1.5 py-0.5 text-[10px] text-foreground w-full focus:outline-none focus:border-primary"
                            >
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="Design">Design</option>
                              <option value="Tools">Tools</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="w-20 flex items-center gap-1.5">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={sk.level}
                              onChange={(e) => handleUpdateSkill(sIdx, "level", parseInt(e.target.value))}
                              className="accent-primary w-12"
                            />
                            <span className="font-mono text-[10px] text-muted-foreground w-6 text-right">
                              {sk.level}%
                            </span>
                          </div>

                          <button
                            onClick={() => handleDeleteSkill(sIdx)}
                            className="p-1 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs uppercase tracking-wider font-mono text-primary font-semibold">
                        Career Experience
                      </h3>
                      <button
                        onClick={handleAddExperience}
                        className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Experience
                      </button>
                    </div>

                    <div className="space-y-4">
                      {localData.experience.map((exp, eIdx) => (
                        <div
                          key={exp.id}
                          className="bg-[#181818] border border-border rounded-lg p-4 relative space-y-3"
                        >
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="absolute top-4 right-4 p-1 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="grid grid-cols-2 gap-3 pr-10">
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                Role / Title
                              </label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleUpdateExperience(eIdx, "role", e.target.value)}
                                className="w-full bg-[#202020] border border-border rounded px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                Company
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleUpdateExperience(eIdx, "company", e.target.value)}
                                className="w-full bg-[#202020] border border-border rounded px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary font-semibold"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                Timeline Duration
                              </label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleUpdateExperience(eIdx, "duration", e.target.value)}
                                className="w-full bg-[#202020] border border-border rounded px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-0.5">
                                Tech Tags (comma-separated)
                              </label>
                              <input
                                type="text"
                                value={exp.tags.join(", ")}
                                onChange={(e) =>
                                  handleUpdateExperience(
                                    eIdx,
                                    "tags",
                                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                                  )
                                }
                                className="w-full bg-[#202020] border border-border rounded px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-muted-foreground uppercase font-mono mb-1">
                              Role description / outcomes
                            </label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => handleUpdateExperience(eIdx, "description", e.target.value)}
                              rows={2}
                              className="w-full bg-[#202020] border border-border rounded px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary transition-all resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Footer */}
              <div className="border-t border-border p-4 bg-[#1a1a1a] flex gap-3 select-none">
                <button
                  onClick={handleCopyJSON}
                  className="flex-1 py-3 text-xs font-mono font-bold tracking-wide uppercase text-foreground bg-[#252525] border border-border rounded-md hover:bg-[#303030] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isCopied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? "JSON Copied!" : "Copy JSON Schema"}
                </button>
                <button
                  onClick={handleTriggerReset}
                  className="px-4 py-3 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-red-500/10 rounded-md border border-transparent hover:border-red-500/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Reset portfolio to default sample"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Defaults
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
