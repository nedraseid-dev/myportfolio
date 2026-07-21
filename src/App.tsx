/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import PortfolioNavbar from "./components/PortfolioNavbar";
import PortfolioHero from "./components/PortfolioHero";
import PortfolioAbout from "./components/PortfolioAbout";
import PortfolioProjects from "./components/PortfolioProjects";
import PortfolioSkills from "./components/PortfolioSkills";
import PortfolioExperience from "./components/PortfolioExperience";
import PortfolioContact from "./components/PortfolioContact";
import { defaultPortfolioData } from "./data";
import { PortfolioData } from "./types";

const LOCAL_STORAGE_KEY = "sentinel_custom_portfolio_data";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setPortfolioData(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load portfolio data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Handler to update portfolio credentials
  const handleUpdatePortfolioData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save portfolio data to localStorage", e);
    }
  };

  // Handler to reset to showcase defaults
  const handleResetPortfolioData = () => {
    setPortfolioData(defaultPortfolioData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  if (!isLoaded) {
    return (
      <div className="bg-hero-bg min-h-screen flex items-center justify-center font-mono text-xs text-primary uppercase tracking-widest">
        <span>Initializing Workspace Environment...</span>
      </div>
    );
  }

  return (
    <div className="bg-hero-bg min-h-screen text-foreground font-sora selection:bg-primary selection:text-primary-foreground relative scroll-smooth">
      {/* Dynamic Floating Navbar */}
      <PortfolioNavbar data={portfolioData} />

      {/* Hero Visual Showcase Area */}
      <PortfolioHero data={portfolioData} />

      {/* Structured Modules & Sections */}
      <PortfolioAbout data={portfolioData} />
      <PortfolioProjects data={portfolioData} />
      <PortfolioSkills data={portfolioData} />
      <PortfolioExperience data={portfolioData} />
      <PortfolioContact data={portfolioData} />
    </div>
  );
}

