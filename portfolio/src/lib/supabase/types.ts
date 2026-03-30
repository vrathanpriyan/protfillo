export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ── Row types ──────────────────────────────────────────────
export interface ProfileRow {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface SkillRow {
  id: string;
  name: string;
  category: string;
  proficiency: number | null;
  icon_url: string | null;
  order_index: number;
}

export interface ExperienceRow {
  id: string;
  company: string;
  role: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  company_url: string | null;
  logo_url: string | null;
  order_index: number;
}

export interface CertificateRow {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

// ── Insert types ───────────────────────────────────────────
export type ProfileInsert = Omit<ProfileRow, "id" | "created_at" | "updated_at">;
export type ProjectInsert = Omit<ProjectRow, "id" | "created_at" | "updated_at">;
export type SkillInsert = Omit<SkillRow, "id">;
export type ExperienceInsert = Omit<ExperienceRow, "id">;
export type CertificateInsert = Omit<CertificateRow, "id" | "created_at">;
export type ContactMessageInsert = Omit<ContactMessageRow, "id" | "created_at" | "is_read">;

// ── Database interface for Supabase client ─────────────────
export interface Database {
  public: {
    Tables: {
      profile: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: Partial<ProfileInsert>;
      };
      projects: {
        Row: ProjectRow;
        Insert: ProjectInsert;
        Update: Partial<ProjectInsert>;
      };
      skills: {
        Row: SkillRow;
        Insert: SkillInsert;
        Update: Partial<SkillInsert>;
      };
      experiences: {
        Row: ExperienceRow;
        Insert: ExperienceInsert;
        Update: Partial<ExperienceInsert>;
      };
      certificates: {
        Row: CertificateRow;
        Insert: CertificateInsert;
        Update: Partial<CertificateInsert>;
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: ContactMessageInsert;
        Update: Partial<ContactMessageRow>;
      };
    };
  };
}

// ── Convenience aliases ────────────────────────────────────
export type Profile = ProfileRow;
export type Project = ProjectRow;
export type Skill = SkillRow;
export type Experience = ExperienceRow;
export type Certificate = CertificateRow;
export type ContactMessage = ContactMessageInsert;
