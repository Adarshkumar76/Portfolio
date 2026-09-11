"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Plus, Sparkles, Building2, User, ArrowLeft } from "lucide-react";
import { Project } from "@/types/portfolio";
import { getProjects } from "@/lib/supabaseClient";
import ProjectTiltCard from "@/components/projects/ProjectTiltCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const query = search.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-cyan-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <Link
          href="/admin"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 shadow-md shadow-purple-600/30 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project (Admin)</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineering Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          All Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Projects</span>
        </h1>
        <p className="mt-3 text-gray-400 max-w-2xl text-base sm:text-lg">
          Filter and explore full-stack applications, enterprise client plugins, and distributed microservices.
        </p>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="p-4 rounded-2xl bg-[#090526]/80 border border-purple-500/20 backdrop-blur-xl mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, tag (e.g. Shopify, Go)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "Company", "Personal", "SaaS", "AI"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                category === cat
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-sm shadow-purple-600/30"
                  : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              {cat === "Company" && <Building2 className="w-3 h-3 inline mr-1" />}
              {cat === "Personal" && <User className="w-3 h-3 inline mr-1" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 rounded-3xl bg-white/[0.02] border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10">
          <p className="text-gray-400 text-base">No projects match your filter or search query.</p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-cyan-300 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProjectTiltCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
