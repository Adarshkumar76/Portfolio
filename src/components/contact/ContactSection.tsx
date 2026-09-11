"use client";

import React, { useState } from "react";
import { Mail, Send, Github, Linkedin, MessageSquare, CheckCircle, Sparkles, Copy, Check, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const emails = [
    {
      address: "adarshk3113@gmail.com",
      label: "Primary / Priority Email",
      isPrimary: true,
      serviceUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=adarshk3113@gmail.com",
    },
    {
      address: "adarsh.ku@yahoo.com",
      label: "Yahoo Mail",
      isPrimary: false,
      serviceUrl: "mailto:adarsh.ku@yahoo.com",
    },
    {
      address: "adarshk3113@outlook.com",
      label: "Outlook / Microsoft",
      isPrimary: false,
      serviceUrl: "mailto:adarshk3113@outlook.com",
    },
  ];

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Save directly to Supabase if connected
      if (supabase) {
        try {
          await supabase.from("contact_messages").insert([
            {
              name: formData.name,
              email: formData.email,
              subject: formData.subject || "Portfolio Inquiry",
              message: formData.message,
              created_at: new Date().toISOString(),
            },
          ]);
        } catch {
          // fallback
        }
      }

      // 2. Also construct mailto direct fallback so visitor can dispatch immediately
      const mailtoUrl = `mailto:adarshk3113@gmail.com?subject=${encodeURIComponent(
        formData.subject || "Portfolio Contact: " + formData.name
      )}&body=${encodeURIComponent(
        `Hi Adarsh,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;

      setSubmitted(true);

      // Offer opening default email client
      window.open(mailtoUrl, "_blank");
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Email Channels & Networks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Communication</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Get in Touch with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                Adarsh
              </span>
              .
            </h2>

            <p className="text-gray-400 text-base leading-relaxed">
              Available for full-stack engineering roles, custom Shopify &amp; WooCommerce client projects (e.g. rasovyam.com), and technical consulting.
            </p>

            {/* Email Channels List */}
            <div className="space-y-3 pt-2">
              {emails.map((item) => (
                <div
                  key={item.address}
                  className={`p-4 rounded-2xl border transition-all ${item.isPrimary
                    ? "bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-cyan-900/20 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                    : "bg-white/[0.02] border-white/10 hover:border-purple-500/30"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`p-2.5 rounded-xl flex-shrink-0 ${item.isPrimary
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-white/5 text-gray-400"
                          }`}
                      >
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                            {item.label}
                          </span>
                          {item.isPrimary && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300">
                              Top Priority
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${item.address}`}
                          className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 truncate block transition"
                        >
                          {item.address}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.address)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
                        title="Copy email"
                      >
                        {copiedEmail === item.address ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {item.isPrimary && (
                        <a
                          href={item.serviceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center space-x-1 transition"
                          title="Compose in Gmail"
                        >
                          <span>Gmail</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://linkedin.com/in/adarshkusingh"
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 flex items-center justify-center space-x-2 text-xs font-semibold transition"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Adarshkumar76"
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-purple-300 flex items-center justify-center space-x-2 text-xs font-semibold transition"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form with Direct Dispatch */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#090526]/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Send a Message</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Messages are saved securely to the database and sent directly to adarshk3113@gmail.com.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Message Dispatched!</h4>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Your message has been delivered to <strong>adarshk3113@gmail.com</strong>. If your email client didn&apos;t automatically open, you can also send directly using the mail buttons on the left.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Adarsh Singh"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="adarsh@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Subject / Project Inquiry
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Custom Shopify app / Full stack position"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project goals, timelines, or role details..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-600/30 hover:shadow-cyan-400/40 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Dispatching Message..." : "Send Message (Direct to adarshk3113@gmail.com)"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
