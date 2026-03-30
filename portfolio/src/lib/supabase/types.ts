export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["profile"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profile"]["Insert"]>;
      };
      projects: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency: number | null;
          icon_url: string | null;
          order_index: number;
        };
        Insert: Omit<Database["public"]["Tables"]["skills"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["skills"]["Insert"]>;
      };
      experiences: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["experiences"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["experiences"]["Insert"]>;
      };
      certificates: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["certificates"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["certificates"]["Insert"]>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["contact_messages"]["Row"], "id" | "created_at" | "is_read">;
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]>;
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];
export type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Insert"];
export type ContactMessageRow = Database["public"]["Tables"]["contact_messages"]["Row"];
