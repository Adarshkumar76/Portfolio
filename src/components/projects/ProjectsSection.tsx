"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Building2, User, Filter } from "lucide-react";
import { Project } from "@/types/portfolio";
import { getProjects } from "@/lib/supabaseClient";
import ProjectTiltCard from "./ProjectTiltCard";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">Projects</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl text-sm sm:text-base">
              Engineered with modern full-stack architectures, real-time protocols, and enterprise e-commerce standards.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 transition self-start md:self-auto"
          >
            <span>View All Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {["All", "Company", "Personal", "SaaS", "AI"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-600/30"
                  : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              {cat === "Company" && <Building2 className="w-3 h-3 inline mr-1" />}
              {cat === "Personal" && <User className="w-3 h-3 inline mr-1" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-white/[0.02] border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 6).map((project) => (
              <ProjectTiltCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
