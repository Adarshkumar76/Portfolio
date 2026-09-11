"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Github, Linkedin, Terminal, ChevronDown } from "lucide-react";
import FloatingTechSphere from "../canvas/FloatingTechSphere";
import { getActiveResumeUrl } from "@/lib/supabaseClient";

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState("/Resume.pdf");
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    "Full Stack Engineer",
    "Shopify & WooCommerce Specialist",
    "Full Stack & MERN Architect",
    "Real-time Systems Developer",
  ];

  useEffect(() => {
    getActiveResumeUrl().then((url) => {
      if (url) setResumeUrl(url);
    });

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/25 via-indigo-500/20 to-cyan-400/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bio & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Availability Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-purple-200 tracking-wide">
              Full Stack Engineer &amp; E-Commerce Architect
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Transforming Ideas Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
              High-Velocity
            </span>{" "}
            Digital Products.
          </h1>

          {/* Subtitle / Dynamic Typewriter role */}
          <div className="flex items-center space-x-2 text-lg sm:text-2xl font-semibold text-gray-300">
            <span className="text-purple-400">{"//"}</span>
            <span>Specializing in:</span>
            <span className="text-cyan-300 transition-all duration-500 border-b border-cyan-400/40 pb-0.5">
              {roles[roleIndex]}
            </span>
          </div>

          {/* Description (ATS Friendly) */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
            I build scalable web applications, robust microservices with <strong className="text-gray-200">Node.js &amp; TypeScript</strong>, and high-conversion <strong className="text-gray-200">Shopify &amp; WooCommerce</strong> custom plugins and webhook pipelines. Passionate about real-time systems, modern UI/UX, and cloud performance.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-600/30 hover:shadow-cyan-400/40 transform hover:-translate-y-0.5 transition duration-300"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-gray-200 bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-purple-500/40 transition duration-300"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Download Resume</span>
            </a>

            <div className="flex items-center space-x-2 ml-2">
              <a
                href="https://github.com/Adarshkumar76"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/10 transition"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/adarshkusingh"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-600/10 transition"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                15+
              </div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">Shipped Projects</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                Enterprise
              </div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">Shopify &amp; Woo</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                100%
              </div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">Cloud Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Floating Tech Sphere */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full relative flex items-center justify-center">
            <FloatingTechSphere />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-60">
        <span className="text-[10px] uppercase tracking-widest text-purple-300 mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
}
