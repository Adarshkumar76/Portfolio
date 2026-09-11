"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, ExternalLink } from "lucide-react";
import { getActiveResumeUrl } from "@/lib/supabaseClient";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>("/Resume.pdf");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    getActiveResumeUrl().then((url) => {
      if (url) setResumeUrl(url);
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#030014]/85 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:shadow-cyan-400/40 transition duration-300">
            <div className="w-full h-full bg-[#030014] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-lg">
                AS
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-wide text-base group-hover:text-cyan-300 transition">
              Adarsh Singh
            </span>
            <span className="text-[11px] text-purple-400 font-medium tracking-wider uppercase">
              Full Stack Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-cyan-300 bg-purple-500/20 shadow-sm shadow-purple-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
                {link.name === "Projects" && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                    Live
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Resume */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 shadow-md shadow-purple-600/30 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600/80 rounded-lg"
          >
            Resume
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#080424]/95 border border-purple-500/30 backdrop-blur-2xl shadow-2xl flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-600/20 hover:text-cyan-300 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
