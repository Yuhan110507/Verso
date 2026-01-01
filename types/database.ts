// User-related types
export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  influences?: string[];
  writing_philosophy?: string;
  expertise_tags?: string[]; // For reader feedback expertise
  critique_credits: number;
  created_at: string;
  updated_at: string;
}

// Work/Manuscript types
export interface Work {
  id: string;
  author_id: string;
  title: string;
  description?: string;
  genre: string[];
  content?: string;
  status: "draft" | "beta" | "published";
  is_complete: boolean;
  word_count: number;
  reading_time_minutes: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  cover_image_url?: string;
  visibility: "private" | "beta_readers" | "public";
}

// Chapter types (for serialized content)
export interface Chapter {
  id: string;
  work_id: string;
  chapter_number: number;
  title: string;
  content: string;
  word_count: number;
  reading_time_minutes: number;
  author_notes?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

// Comment types
export interface Comment {
  id: string;
  work_id?: string;
  chapter_id?: string;
  user_id: string;
  content: string;
  paragraph_index?: number; // For inline comments
  is_inline: boolean;
  mode: "appreciation" | "critique";
  rating?: {
    plot?: number;
    characters?: number;
    prose?: number;
    pacing?: number;
  };
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// Highlight/Resonance types
export interface Highlight {
  id: string;
  work_id?: string;
  chapter_id?: string;
  user_id: string;
  start_index: number;
  end_index: number;
  resonance_type: "moved" | "thoughtful" | "beautiful" | "gripping" | "provoking";
  note?: string;
  created_at: string;
}

// Workshop Circle types
export interface WorkshopCircle {
  id: string;
  name: string;
  creator_id: string;
  description?: string;
  members: string[]; // user ids
  max_members: number;
  genre_focus?: string[];
  created_at: string;
}

export interface WorkshopSession {
  id: string;
  circle_id: string;
  work_id: string;
  author_id: string;
  deadline: string;
  status: "open" | "closed" | "completed";
  feedback_template?: object;
  created_at: string;
}

// Reading Circle types
export interface ReadingCircle {
  id: string;
  name: string;
  creator_id: string;
  members: string[]; // user ids
  genre_focus?: string[];
  commitment_pages_per_week: number;
  current_work_id?: string;
  created_at: string;
}

// Reading Lists/Library
export interface ReadingList {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  works: string[]; // work ids
  is_public: boolean;
  created_at: string;
}

// Tags system
export interface Tag {
  id: string;
  name: string;
  category: "genre" | "theme" | "content_warning" | "tone";
  description?: string;
  color?: string;
}

export interface WorkTag {
  work_id: string;
  tag_id: string;
}

// Draft history/Revision Timeline
export interface WorkDraft {
  id: string;
  work_id: string;
  version: number;
  content: string;
  word_count: number;
  author_note?: string;
  created_at: string;
}

// Feedback Currency
export interface FeedbackCurrency {
  id: string;
  user_id: string;
  credits: number;
  earned_from: string[]; // work ids where feedback was given
  spent_on: string[]; // work ids where credits were spent
  last_updated: string;
}

// Reader expertise tags
export interface ReaderExpertise {
  id: string;
  user_id: string;
  expertise: string[];
  verified: boolean;
}

// Analytics/Stats
export interface WorkStats {
  work_id: string;
  view_count: number;
  comment_count: number;
  highlight_count: number;
  resonance_distribution: Record<string, number>;
  avg_reading_time: number;
  last_viewed: string;
}

// Curated collections
export interface CuratedCollection {
  id: string;
  curator_id?: string; // null if system curated
  title: string;
  description: string;
  works: string[]; // work ids
  theme: string;
  is_featured: boolean;
  created_at: string;
}

// User activity/engagement
export interface UserActivity {
  id: string;
  user_id: string;
  activity_type:
    | "work_published"
    | "comment_added"
    | "work_shared"
    | "circle_joined"
    | "feedback_received";
  related_work_id?: string;
  created_at: string;
}
