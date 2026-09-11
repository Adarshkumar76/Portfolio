"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Sparkles, Building2, User, Star } from "lucide-react";
import { Project } from "@/types/portfolio";

interface Props {
  project: Project;
}

export default function ProjectTiltCard({ project }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const isCompany = project.category === "Company";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.5s ease-out",
      }}
      className="group relative rounded-3xl p-[1.5px] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(112,66,248,0.25)] flex flex-col h-full"
    >
      {/* Dynamic Glowing Border */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition duration-500 blur-sm pointer-events-none ${
          isCompany
            ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"
            : "bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400"
        }`}
      />

      {/* Card Body */}
      <div className="relative z-10 w-full h-full rounded-[22px] bg-[#090526]/90 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden">
        {/* Subtle Glare overlay on mouse move */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[22px] mix-blend-overlay opacity-30 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8), transparent 60%)`,
            }}
          />
        )}

        <div>
          {/* Top image thumbnail */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-purple-950/40 border border-white/10">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <Sparkles className="w-8 h-8 text-purple-400 opacity-50" />
              </div>
            )}

            {/* Category Badge overlay */}
            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-md ${
                  isCompany
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                    : "bg-purple-600/30 text-purple-200 border border-purple-400/40"
                }`}
              >
                {isCompany ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
                <span>{project.category}</span>
              </span>
            </div>

            {project.featured && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>Featured</span>
                </span>
              </div>
            )}
          </div>

          {/* Project Title & Tagline */}
          <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-cyan-300 transition duration-300">
            {project.title}
          </h3>

          <p className="text-xs font-semibold text-purple-300 mt-1 mb-3">
            {project.tagline}
          </p>

          <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 5).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-white/[0.04] text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] text-gray-400 bg-white/5">
                +{project.tags.length - 5}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition"
                  title="Source Code"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition"
                  title="Live Demo / Details"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>

            {project.stats?.commits && (
              <span className="text-[11px] text-gray-400 font-mono">
                {project.stats.commits}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
