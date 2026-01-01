-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  influences TEXT[],
  writing_philosophy TEXT,
  expertise_tags TEXT[],
  critique_credits INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create works table
CREATE TABLE IF NOT EXISTS works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT[],
  content TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'beta', 'published')),
  is_complete BOOLEAN DEFAULT FALSE,
  word_count INTEGER DEFAULT 0,
  reading_time_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  cover_image_url TEXT,
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'beta_readers', 'public'))
);

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  word_count INTEGER DEFAULT 0,
  reading_time_minutes INTEGER DEFAULT 0,
  author_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID REFERENCES works(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  paragraph_index INTEGER,
  is_inline BOOLEAN DEFAULT FALSE,
  mode TEXT DEFAULT 'appreciation' CHECK (mode IN ('appreciation', 'critique')),
  rating JSONB,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create highlights table
CREATE TABLE IF NOT EXISTS highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID REFERENCES works(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_index INTEGER NOT NULL,
  end_index INTEGER NOT NULL,
  resonance_type TEXT NOT NULL CHECK (resonance_type IN ('moved', 'thoughtful', 'beautiful', 'gripping', 'provoking')),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workshop_circles table
CREATE TABLE IF NOT EXISTS workshop_circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  members UUID[],
  max_members INTEGER DEFAULT 8,
  genre_focus TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('genre', 'theme', 'content_warning', 'tone')),
  description TEXT,
  color TEXT
);

-- Create work_tags junction table
CREATE TABLE IF NOT EXISTS work_tags (
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (work_id, tag_id)
);

-- Create work_drafts table
CREATE TABLE IF NOT EXISTS work_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  word_count INTEGER DEFAULT 0,
  author_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reading_lists table
CREATE TABLE IF NOT EXISTS reading_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  works UUID[],
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reading_circles table
CREATE TABLE IF NOT EXISTS reading_circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  members UUID[],
  genre_focus TEXT[],
  commitment_pages_per_week INTEGER,
  current_work_id UUID REFERENCES works(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_works_author_id ON works(author_id);
CREATE INDEX idx_works_status ON works(status);
CREATE INDEX idx_chapters_work_id ON chapters(work_id);
CREATE INDEX idx_comments_work_id ON comments(work_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_highlights_work_id ON highlights(work_id);
CREATE INDEX idx_highlights_user_id ON highlights(user_id);
CREATE INDEX idx_work_drafts_work_id ON work_drafts(work_id);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_lists ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view public profiles
CREATE POLICY "Users are viewable by everyone"
ON users FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE USING (auth.uid() = id);

-- Works are viewable based on visibility
CREATE POLICY "Works are viewable if public"
ON works FOR SELECT USING (visibility = 'public' OR author_id = auth.uid());

-- Users can create works
CREATE POLICY "Users can create works"
ON works FOR INSERT WITH CHECK (author_id = auth.uid());

-- Authors can update their works
CREATE POLICY "Authors can update their works"
ON works FOR UPDATE USING (author_id = auth.uid());

-- Comments are viewable on public works
CREATE POLICY "Comments viewable on public works"
ON comments FOR SELECT USING (
  EXISTS (SELECT 1 FROM works w WHERE w.id = comments.work_id AND w.visibility = 'public')
  OR auth.uid() = comments.user_id
);

-- Users can create comments
CREATE POLICY "Users can create comments"
ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Highlights follow work visibility
CREATE POLICY "Highlights viewable on public works"
ON highlights FOR SELECT USING (
  EXISTS (SELECT 1 FROM works w WHERE w.id = highlights.work_id AND w.visibility = 'public')
  OR auth.uid() = highlights.user_id
);

-- Users can create highlights
CREATE POLICY "Users can create highlights"
ON highlights FOR INSERT WITH CHECK (auth.uid() = user_id);
