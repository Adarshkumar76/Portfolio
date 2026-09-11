"use client";

import React from "react";
import { Code, Cpu, Layers, Rocket, ShieldCheck, Zap } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: "Full Stack Architecture",
      desc: "Architecting end-to-end applications from database indexing (PostgreSQL, MongoDB) to reactive Next.js & React client interfaces.",
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "E-Commerce Plugin Ecosystems",
      desc: "Deep hands-on experience authoring custom Shopify Apps (App Bridge, Webhooks) and WooCommerce extensions to streamline operations.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-pink-400" />,
      title: "Distributed Microservices & APIs",
      desc: "Building high-throughput, low-latency microservices with Node.js and TypeScript for real-time telemetry, sockets, and APIs.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Security & ATS Standards",
      desc: "Rigorous standards for HMAC webhook verification, JWT auth, environment isolation, and production-grade CI/CD automation.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
            <Rocket className="w-3.5 h-3.5" />
            <span>Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">My Journey</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-base sm:text-lg">
            A developer who bridges creative product thinking with resilient, production-hardened full-stack engineering.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Narrative Card */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#0b0728]/60 border border-purple-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-purple-500/40 transition duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Who I Am</span>
            </h3>

            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a dedicated <strong className="text-white">Full Stack Developer</strong> with a strong foundation in modern web frameworks, distributed architectures, and e-commerce engineering.
              </p>
              <p>
                Over the past several years, I have engineered enterprise-grade solutions ranging from <strong className="text-cyan-300">custom Shopify &amp; WooCommerce extensions</strong> for international stores to real-time collaborative applications, AI search engines, and low-latency microservices with <strong className="text-purple-300">Node.js and TypeScript</strong>.
              </p>
              <p>
                My focus is on writing maintainable, self-documenting code, designing intuitive UI/UX with micro-interactions, and ensuring rock-solid scalability in containerized <strong className="text-white">Docker and Linux</strong> environments.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Location</span>
                <span className="text-sm font-medium text-white">India (Available Worldwide)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Primary Stack</span>
                <span className="text-sm font-medium text-cyan-300">MERN, Next.js, TypeScript</span>
              </div>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <div className="p-3 rounded-xl bg-white/5 w-fit mb-4">{item.icon}</div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
