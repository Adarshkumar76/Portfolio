"use client";

import React, { useState } from "react";
import { Code2, Server, ShoppingBag, Database, Wrench } from "lucide-react";

interface SkillItem {
  name: string;
  highlight?: boolean;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const categories: SkillCategory[] = [
    {
      id: "frontend",
      name: "Frontend & UI",
      icon: <Code2 className="w-4 h-4" />,
      skills: [
        { name: "Next.js 14/15", highlight: true },
        { name: "React.js", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "JavaScript (ES6+)", highlight: true },
        { name: "TailwindCSS" },
        { name: "Redux Toolkit" },
        { name: "HTML5 & CSS3" },
        { name: "Framer Motion" },
        { name: "Responsive Design" },
      ],
    },
    {
      id: "backend",
      name: "Backend & Systems",
      icon: <Server className="w-4 h-4" />,
      skills: [
        { name: "Node.js", highlight: true },
        { name: "Express.js", highlight: true },
        { name: "RESTful APIs", highlight: true },
        { name: "WebSockets / Socket.io" },
        { name: "GraphQL" },
        { name: "JWT Auth & Security", highlight: true },
        { name: "Microservices Architecture" },
        { name: "Event-Driven Queues" },
      ],
    },
    {
      id: "ecommerce",
      name: "E-Commerce & Plugins",
      icon: <ShoppingBag className="w-4 h-4" />,
      skills: [
        { name: "Shopify App Bridge", highlight: true },
        { name: "Shopify Webhooks", highlight: true },
        { name: "Liquid Templating", highlight: true },
        { name: "WooCommerce Plugins", highlight: true },
        { name: "PHP Hooks & Filters" },
        { name: "Payment Gateways (Stripe/UPI)", highlight: true },
        { name: "Checkout Funnels" },
        { name: "Inventory Sync APIs" },
      ],
    },
    {
      id: "devops",
      name: "Databases & DevOps",
      icon: <Database className="w-4 h-4" />,
      skills: [
        { name: "PostgreSQL", highlight: true },
        { name: "MongoDB", highlight: true },
        { name: "Supabase / Cloud DB", highlight: true },
        { name: "Redis Caching" },
        { name: "Docker & Containers", highlight: true },
        { name: "Linux / Bash Shell" },
        { name: "Nginx Reverse Proxy" },
        { name: "Git & GitHub CI/CD", highlight: true },
      ],
    },
  ];

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Skills &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Toolbox</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-base sm:text-lg">
            Core technologies leveraged daily across enterprise client plugins, SaaS products, and full-stack web applications.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "all"
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-600/30"
                : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            All Disciplines
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-600/30"
                  : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-7 rounded-3xl bg-[#0a0624]/70 border border-purple-500/20 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition duration-300"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-cyan-300 border border-purple-500/30">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">{cat.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition duration-200 ${
                      skill.highlight
                        ? "bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-cyan-500/40 text-cyan-200 shadow-sm shadow-cyan-500/20 hover:border-cyan-400"
                        : "bg-white/[0.03] border border-white/10 text-gray-300 hover:border-purple-500/40 hover:text-white"
                    }`}
                  >
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
