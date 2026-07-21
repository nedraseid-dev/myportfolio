export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  telegram?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Design" | "Tools" | "Other";
  level: number; // 1 to 100
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  tags: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  bio: string;
  detailedBio: string;
  socials: SocialLinks;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  stats: {
    label: string;
    value: string;
  }[];
}
