// src/types/portfolio.ts
export interface CertModule {
  id: string;
  title_de: string;
  title_en: string;
  short_de: string;
  short_en: string;
  date: string;
  issuer: string;
  thumbnail: string;
  pdf: string;
  type?: string;
}

export interface CertificateGroup {
  id: string;
  title_de: string;
  title_en: string;
  modules: CertModule[];
  issuer: string;
  description_de: string;
  description_en: string;
  thumbnail?: string; 
}

export interface Candidate {
  name: string;
  role: {
    de: string;
    en: string;
  };
  photo: string;
  youtube_about: string;
  skills: string[];
  contact: {
    linkedin: string;
    email: string;
    phone: string;
    whatsapp: string;
    github: string;
  };
  downloadables: {
    lebenslauf_pdf: string;
  };
}

export interface Project {
  id: string;
  title: string;
  short_description: {
    de: string;
    en: string;
  };
  tech_tags: string[];
  github_url: string;
  live_url: string;
  screenshot: string;
}

export interface PortfolioData {
  candidate: Candidate;
  certificate_groups: CertificateGroup[];
  standalone_certificates: CertModule[];
  projects: Project[];
}