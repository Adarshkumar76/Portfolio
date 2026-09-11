"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from "lucide-react";
import { WORK_EXPERIENCE } from "@/lib/initialProjects";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">Experience</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-base sm:text-lg">
            Proven track record engineering custom plugins, scaling e-commerce platforms, and deploying distributed microservices.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 md:ml-32 space-y-12">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div key={exp.id} className="relative pl-8 sm:pl-12 group">
              {/* Timeline Icon Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#030014] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-400 transition shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 group-hover:bg-purple-400 transition" />
              </div>

              {/* Experience Card */}
              <div className="p-8 rounded-3xl bg-[#0b0728]/70 border border-purple-500/20 backdrop-blur-xl shadow-2xl hover:border-cyan-500/40 transition duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-base font-semibold text-purple-300 mt-1">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="inline-flex items-center space-x-1 bg-white/5 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 bg-white/5 px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Key Achievements Bullet points */}
                <div className="space-y-3 mb-6">
                  {exp.description.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-purple-200 border border-purple-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
