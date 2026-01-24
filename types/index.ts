// User Types
export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  bio?: string;
  avatar?: string;
  avatar_url?: string;
  display_name?: string;
  writingPhilosophy?: string;
  writing_philosophy?: string;
  influences?: string[];
  websiteUrl?: string;
  website_url?: string;
  roles: ('author' | 'reader' | 'moderator')[];
  favorite_genres?: string[];
  user_type?: 'reader' | 'writer' | 'both';
  onboarding_completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  created_at?: string;
  updated_at?: string;
}

export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  lineHeight: 'comfortable' | 'relaxed' | 'loose';
  backgroundColor: 'cream' | 'white' | 'dark';
  fontFamily: 'serif' | 'sans';
}

// Work Types
export interface Work {
  id: string;
  title: string;
  description: string;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  genre: string[];
  tags: string[];
  coverImage?: string;
  visibility: 'private' | 'draft' | 'public';
  metadata: {
    wordCount: number;
    estimatedReadingTime: number;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
  };
  settings: {
    allowComments: boolean;
    requireCommentLength?: number;
    allowHighlights: boolean;
  };
}

export interface Chapter {
  id: string;
  workId: string;
  title: string;
  content: string;
  order: number;
  authorNotes?: {
    before?: string;
    after?: string;
  };
  metadata: {
    wordCount: number;
    estimatedReadingTime: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

// Comment Types
export enum CommentType {
  PARAGRAPH = 'paragraph_comment',
  CHAPTER_END = 'end_chapter',
  PRIVATE = 'private_feedback'
}

export interface Comment {
  id: string;
  workId: string;
  chapterId: string;
  userId: string;
  authorId: string;
  type: CommentType;
  content: string;
  paragraphIndex?: number;
  isResolved: boolean;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  replies?: Comment[];
  helpful?: number;
}

// Appreciation Types
export enum AppreciationType {
  MOVED_ME = 'moved_me',
  MADE_ME_THINK = 'made_me_think',
  BEAUTIFUL_PROSE = 'beautiful_prose',
  GRIPPING = 'gripping',
  THOUGHT_PROVOKING = 'thought_provoking'
}

export interface Appreciation {
  id: string;
  workId: string;
  chapterId: string;
  userId: string;
  type: AppreciationType;
  timestamp: Date;
}

// Highlight Types
export interface Highlight {
  id: string;
  workId: string;
  chapterId: string;
  userId: string;
  paragraphIndex: number;
  text: string;
  color: string;
  createdAt: Date;
  comments?: Comment[];
}

// Reading List Types
export interface ReadingList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  workIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Draft Types
export interface Draft {
  id: string;
  authorId: string;
  title: string;
  content: string;
  lastSavedAt: Date;
  chapters?: Chapter[];
}
