import { createClient } from "@supabase/supabase-js";
import { Project } from "@/types/portfolio";
import { INITIAL_PROJECTS } from "./initialProjects";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("http") &&
  supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Fetch all projects. If Supabase is active, fetch from table 'projects'.
 * If paused, inactive, or not configured, seamlessly return INITIAL_PROJECTS fallback.
 */
export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("portfolio_projects_custom");
      if (local) {
        try {
          const parsed = JSON.parse(local);
          return [...parsed, ...INITIAL_PROJECTS];
        } catch {
          // ignore parsing error
        }
      }
    }
    return INITIAL_PROJECTS;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Supabase query returned no rows or paused, using bulletproof fallback:", error?.message);
      return INITIAL_PROJECTS;
    }

    // Map database snake_case to camelCase
    const mapped: Project[] = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      tagline: item.tagline || "",
      description: item.description || "",
      category: item.category || "Personal",
      tags: Array.isArray(item.tags) ? item.tags : (item.tags ? JSON.parse(item.tags) : []),
      image: item.image || "https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80",
      liveUrl: item.live_url || item.liveUrl,
      githubUrl: item.github_url || item.githubUrl,
      featured: Boolean(item.featured),
      createdAt: item.created_at || new Date().toISOString(),
    }));

    return mapped;
  } catch (err) {
    console.warn("Supabase error caught, serving fallback seamlessly:", err);
    return INITIAL_PROJECTS;
  }
}

/**
 * Add a new project
 */
export async function addProject(project: Omit<Project, "id" | "createdAt">): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    // Local storage fallback for instant testing before Supabase keys are pasted
    if (typeof window !== "undefined") {
      const newProj: Project = {
        ...project,
        id: `local-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const existing = localStorage.getItem("portfolio_projects_custom");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newProj);
      localStorage.setItem("portfolio_projects_custom", JSON.stringify(list));
      return { success: true };
    }
    return { success: false, error: "Supabase not configured and window undefined" };
  }

  try {
    const { error } = await supabase.from("projects").insert([
      {
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        category: project.category,
        tags: project.tags,
        image: project.image,
        live_url: project.liveUrl,
        github_url: project.githubUrl,
        featured: project.featured,
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to insert project" };
  }
}

/**
 * Delete a project by ID
 */
export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("portfolio_projects_custom");
      if (existing) {
        const list = JSON.parse(existing).filter((p: Project) => p.id !== id);
        localStorage.setItem("portfolio_projects_custom", JSON.stringify(list));
      }
      return { success: true };
    }
    return { success: false, error: "Supabase not configured" };
  }

  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete" };
  }
}

/**
 * Upload remote image to Supabase Storage bucket 'portfolio-assets'
 */
export async function uploadRemoteImage(file: File): Promise<{ url?: string; error?: string }> {
  if (!supabase) {
    return { error: "Supabase storage is not configured yet. You can paste an image URL directly!" };
  }

  try {
    const ext = file.name.split(".").pop();
    const fileName = `projects/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(fileName);
    return { url: data.publicUrl };
  } catch (err: any) {
    return { error: err.message || "Failed to upload file" };
  }
}

/**
 * Upload Resume PDF to Supabase Storage bucket 'portfolio-assets'
 */
export async function uploadResumePdf(file: File): Promise<{ url?: string; error?: string }> {
  if (!supabase) {
    return { error: "Supabase storage is not configured. Please paste your Google Drive / Cloudinary resume URL!" };
  }

  try {
    const fileName = `resume/Adarsh_Kumar_Singh_Resume.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(fileName, file, { cacheControl: "60", upsert: true });

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(fileName);
    return { url: data.publicUrl };
  } catch (err: any) {
    return { error: err.message || "Failed to upload resume" };
  }
}

/**
 * Get active Resume URL
 */
export async function getActiveResumeUrl(): Promise<string> {
  const fallback = process.env.NEXT_PUBLIC_RESUME_URL || "/Resume.pdf";
  if (!supabase) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_resume_url");
      if (saved) return saved;
    }
    return fallback;
  }

  try {
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "resume_url")
      .single();

    if (data && data.value) {
      return data.value;
    }
  } catch {
    // fallback
  }

  return fallback;
}

/**
 * Save active Resume URL
 */
export async function saveActiveResumeUrl(url: string): Promise<{ success: boolean; error?: string }> {
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_resume_url", url);
  }

  if (!supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("settings").upsert({
      key: "resume_url",
      value: url,
      updated_at: new Date().toISOString(),
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
