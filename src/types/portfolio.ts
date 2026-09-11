export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Company' | 'Personal' | 'SaaS' | 'AI' | 'Open Source';
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
  stats?: {
    stars?: number;
    forks?: number;
    commits?: string;
  };
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance';
  description: string[];
  skills: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    icon: string;
    level: string;
  }[];
}
