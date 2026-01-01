export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          display_name: string;
          bio: string | null;
          avatar_url: string | null;
          influences: string[] | null;
          writing_philosophy: string | null;
          expertise_tags: string[] | null;
          critique_credits: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
          display_name: string;
          bio?: string | null;
          avatar_url?: string | null;
          influences?: string[] | null;
          writing_philosophy?: string | null;
          expertise_tags?: string[] | null;
          critique_credits?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          display_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          influences?: string[] | null;
          writing_philosophy?: string | null;
          expertise_tags?: string[] | null;
          critique_credits?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      works: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          description: string | null;
          genre: string[];
          content: string | null;
          status: "draft" | "beta" | "published";
          is_complete: boolean;
          word_count: number;
          reading_time_minutes: number;
          created_at: string;
          updated_at: string;
          published_at: string | null;
          cover_image_url: string | null;
          visibility: "private" | "beta_readers" | "public";
        };
        Insert: {
          id?: string;
          author_id: string;
          title: string;
          description?: string | null;
          genre: string[];
          content?: string | null;
          status?: "draft" | "beta" | "published";
          is_complete?: boolean;
          word_count?: number;
          reading_time_minutes?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          cover_image_url?: string | null;
          visibility?: "private" | "beta_readers" | "public";
        };
        Update: {
          id?: string;
          author_id?: string;
          title?: string;
          description?: string | null;
          genre?: string[];
          content?: string | null;
          status?: "draft" | "beta" | "published";
          is_complete?: boolean;
          word_count?: number;
          reading_time_minutes?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          cover_image_url?: string | null;
          visibility?: "private" | "beta_readers" | "public";
        };
      };
      chapters: {
        Row: {
          id: string;
          work_id: string;
          chapter_number: number;
          title: string;
          content: string;
          word_count: number;
          reading_time_minutes: number;
          author_notes: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          work_id: string;
          chapter_number: number;
          title: string;
          content: string;
          word_count?: number;
          reading_time_minutes?: number;
          author_notes?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          work_id?: string;
          chapter_number?: number;
          title?: string;
          content?: string;
          word_count?: number;
          reading_time_minutes?: number;
          author_notes?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          work_id: string | null;
          chapter_id: string | null;
          user_id: string;
          content: string;
          paragraph_index: number | null;
          is_inline: boolean;
          mode: "appreciation" | "critique";
          rating: Json | null;
          helpful_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          work_id?: string | null;
          chapter_id?: string | null;
          user_id: string;
          content: string;
          paragraph_index?: number | null;
          is_inline?: boolean;
          mode?: "appreciation" | "critique";
          rating?: Json | null;
          helpful_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          work_id?: string | null;
          chapter_id?: string | null;
          user_id?: string;
          content?: string;
          paragraph_index?: number | null;
          is_inline?: boolean;
          mode?: "appreciation" | "critique";
          rating?: Json | null;
          helpful_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      highlights: {
        Row: {
          id: string;
          work_id: string | null;
          chapter_id: string | null;
          user_id: string;
          start_index: number;
          end_index: number;
          resonance_type:
            | "moved"
            | "thoughtful"
            | "beautiful"
            | "gripping"
            | "provoking";
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          work_id?: string | null;
          chapter_id?: string | null;
          user_id: string;
          start_index: number;
          end_index: number;
          resonance_type:
            | "moved"
            | "thoughtful"
            | "beautiful"
            | "gripping"
            | "provoking";
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          work_id?: string | null;
          chapter_id?: string | null;
          user_id?: string;
          start_index?: number;
          end_index?: number;
          resonance_type?:
            | "moved"
            | "thoughtful"
            | "beautiful"
            | "gripping"
            | "provoking";
          note?: string | null;
          created_at?: string;
        };
      };
      workshop_circles: {
        Row: {
          id: string;
          name: string;
          creator_id: string;
          description: string | null;
          members: string[];
          max_members: number;
          genre_focus: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          creator_id: string;
          description?: string | null;
          members?: string[];
          max_members?: number;
          genre_focus?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          creator_id?: string;
          description?: string | null;
          members?: string[];
          max_members?: number;
          genre_focus?: string[] | null;
          created_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          category: "genre" | "theme" | "content_warning" | "tone";
          description: string | null;
          color: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category: "genre" | "theme" | "content_warning" | "tone";
          description?: string | null;
          color?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: "genre" | "theme" | "content_warning" | "tone";
          description?: string | null;
          color?: string | null;
        };
      };
      work_drafts: {
        Row: {
          id: string;
          work_id: string;
          version: number;
          content: string;
          word_count: number;
          author_note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          work_id: string;
          version: number;
          content: string;
          word_count?: number;
          author_note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          work_id?: string;
          version?: number;
          content?: string;
          word_count?: number;
          author_note?: string | null;
          created_at?: string;
        };
      };
      reading_lists: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          works: string[];
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          works?: string[];
          is_public?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          works?: string[];
          is_public?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
