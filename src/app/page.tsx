import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col space-y-8">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ExperienceTimeline />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
