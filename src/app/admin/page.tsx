"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Building2,
  User,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Project } from "@/types/portfolio";
import {
  getProjects,
  addProject,
  deleteProject,
  uploadRemoteImage,
  uploadResumePdf,
  getActiveResumeUrl,
  saveActiveResumeUrl,
  isSupabaseConfigured,
} from "@/lib/supabaseClient";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Resume state
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeStatus, setResumeStatus] = useState<string | null>(null);

  // New Project Form state
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"Company" | "Personal" | "SaaS" | "AI">("Personal");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  const [savingProject, setSavingProject] = useState(false);
  const [projectStatus, setProjectStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // PIN authentication for static/serverless deployment
  const checkAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "123";
    if (pinInput && pinInput.trim() === correctPin.trim()) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid Admin PIN. Access denied.");
    }
  };

  const refreshProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshProjects();
      getActiveResumeUrl().then((url) => setResumeUrl(url));
    }
  }, [isAuthenticated]);

  // Handle Project Creation
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProject(true);
    setProjectStatus(null);

    try {
      let finalImageUrl = image;

      // If user selected an image file, upload to fast remote storage first
      if (imageFile) {
        const uploadRes = await uploadRemoteImage(imageFile);
        if (uploadRes.url) {
          finalImageUrl = uploadRes.url;
        } else if (uploadRes.error && !finalImageUrl) {
          // If upload fails, use a fallback unsplash image
          finalImageUrl = "https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80";
        }
      }

      if (!finalImageUrl) {
        finalImageUrl = "https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80";
      }

      const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await addProject({
        title,
        tagline,
        description,
        category,
        tags: tagList.length > 0 ? tagList : ["Full Stack", "TypeScript"],
        image: finalImageUrl,
        liveUrl: liveUrl || undefined,
        githubUrl: githubUrl || undefined,
        featured,
      });

      if (res.success) {
        setProjectStatus({
          type: "success",
          message: "Project successfully added and live on the portfolio!",
        });
        // Reset form
        setTitle("");
        setTagline("");
        setDescription("");
        setTags("");
        setImage("");
        setImageFile(null);
        setLiveUrl("");
        setGithubUrl("");
        setFeatured(false);
        refreshProjects();
      } else {
        setProjectStatus({
          type: "error",
          message: res.error || "Failed to publish project",
        });
      }
    } catch (err: any) {
      setProjectStatus({
        type: "error",
        message: err.message || "An unexpected error occurred",
      });
    } finally {
      setSavingProject(false);
    }
  };

  // Handle Project Delete
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    const res = await deleteProject(id);
    if (res.success) {
      refreshProjects();
    } else {
      alert("Failed to delete project: " + res.error);
    }
  };

  // Handle Resume Update
  const handleSaveResumeUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingResume(true);
    setResumeStatus(null);

    try {
      let activeUrl = resumeUrl;
      if (resumeFile) {
        const uploadRes = await uploadResumePdf(resumeFile);
        if (uploadRes.url) {
          activeUrl = uploadRes.url;
          setResumeUrl(activeUrl);
        }
      }

      const res = await saveActiveResumeUrl(activeUrl);
      if (res.success) {
        setResumeStatus("Resume updated successfully! Active across all download links.");
      } else {
        setResumeStatus("Saved locally. Supabase: " + (res.error || "local fallback used."));
      }
    } finally {
      setUploadingResume(false);
    }
  };

  // PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#090526]/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl relative">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-cyan-300 border border-purple-500/30 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Portal Access</h1>
            <p className="text-xs text-gray-400 mt-1">
              Enter your master PIN to manage projects and resume
            </p>
          </div>

          <form onSubmit={checkAuth} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Master Security PIN"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
              />
              {authError && (
                <p className="text-xs text-pink-400 mt-2 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-600/30 transition flex items-center justify-center space-x-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-cyan-300 transition">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs text-gray-400 hover:text-cyan-300 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">Admin CMS</span>
          </h1>
        </div>

        {/* Database Status Pill */}
        <div className="flex items-center space-x-3">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
              isSupabaseConfigured
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-amber-500/10 border-amber-500/30 text-amber-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isSupabaseConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span>
              {isSupabaseConfigured
                ? "Supabase Connected"
                : "Resilience Mode (Ready for Supabase Keys)"}
            </span>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-white/5 border border-white/10"
          >
            Lock Panel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Add Project Form (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#090526]/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center space-x-2 mb-6">
            <Plus className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Append New Project</h2>
          </div>

          {projectStatus && (
            <div
              className={`p-4 rounded-xl mb-6 text-sm flex items-center space-x-2 ${
                projectStatus.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  : "bg-pink-500/10 border border-pink-500/30 text-pink-300"
              }`}
            >
              {projectStatus.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{projectStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AI Workflow Generator"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Category Tag *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090526] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                >
                  <option value="Company">Company (Client / Employment)</option>
                  <option value="Personal">Personal (Full-Stack / Side Project)</option>
                  <option value="SaaS">SaaS (Commercial Platform)</option>
                  <option value="AI">AI / Machine Learning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Tagline / One-Liner *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="High-velocity automation engine with real-time queues"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Detailed Description *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the problem solved, architecture choices, database design, and key outcomes..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Tech Stack Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Shopify API, Node.js, Webhooks, Docker, Redis"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* Remote Image or File Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Image URL (CDN / Remote)
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Or Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600/30 file:text-purple-200 hover:file:bg-purple-600/50"
                />
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/Adarshkumar76/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Live Demo / Case Study URL
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://my-app.vercel.app"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="featured" className="text-xs font-medium text-gray-300 cursor-pointer">
                Highlight as Featured on Homepage
              </label>
            </div>

            <button
              type="submit"
              disabled={savingProject}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-600/30 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{savingProject ? "Publishing Project..." : "Publish Project"}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Resume Manager & Quick Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Dynamic Resume Management Card */}
          <div className="p-8 rounded-3xl bg-[#090526]/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Dynamic Resume Manager</h2>
            </div>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Update your resume URL or upload a new PDF anytime. Changes reflect instantly across all download buttons on the portfolio without code redeployment.
            </p>

            {resumeStatus && (
              <div className="p-3 rounded-xl mb-4 bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200">
                {resumeStatus}
              </div>
            )}

            <form onSubmit={handleSaveResumeUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Active Resume Link
                </label>
                <input
                  type="text"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://drive.google.com/... or /Resume.pdf"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Or Upload New PDF Resume
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={uploadingResume}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-600 hover:bg-purple-500 transition shadow-md"
                >
                  {uploadingResume ? "Updating..." : "Update Resume"}
                </button>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 border border-white/10 transition"
                  title="Test Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </form>
          </div>

          {/* Existing Projects Quick Manager */}
          <div className="p-8 rounded-3xl bg-[#090526]/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Existing Projects ({projects.length})</h2>
              </div>
              <button
                onClick={refreshProjects}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                title="Refresh List"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingProjects ? "animate-spin" : ""}`} />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={proj.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-purple-950 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{proj.title}</h4>
                      <span className="text-[10px] text-cyan-300">{proj.category}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-pink-400 hover:bg-pink-500/10 transition"
                    title="Remove Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
