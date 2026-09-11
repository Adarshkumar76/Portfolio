"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Lock, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-purple-500/20 bg-[#030014]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-white text-lg tracking-wide">
              Adarsh Kumar Singh
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
              Full Stack Developer
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Engineered with Next.js, Supabase, and 3D Cosmic Aesthetics.
          </p>
        </div>

        {/* Center Socials */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Adarshkumar76"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/adarshkusingh"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-600/20 transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <Link
            href="/admin"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
            title="Admin Dashboard"
          >
            <Lock className="w-4 h-4" />
          </Link>
        </div>

        {/* Right Action */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
