-- ============================================
-- VERSO - CLEAN DATABASE MIGRATION
-- Safely handles existing tables and policies
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- DROP EXISTING POLICIES (if they exist)
-- ============================================

-- Users policies
DROP POLICY IF EXISTS "Users are viewable by everyone" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Works policies
DROP POLICY IF EXISTS "Public works are viewable by everyone" ON works;
DROP POLICY IF EXISTS "Users can create works" ON works;
DROP POLICY IF EXISTS "Authors can update their works" ON works;
DROP POLICY IF EXISTS "Authors can delete their works" ON works;

-- Comments policies
DROP POLICY IF EXISTS "Comments viewable on accessible works" ON comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can update own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

-- Highlights policies
DROP POLICY IF EXISTS "Highlights viewable by owner and on public works" ON highlights;
DROP POLICY IF EXISTS "Users can create highlights" ON highlights;
DROP POLICY IF EXISTS "Users can delete own highlights" ON highlights;

-- Bookmarks policies
DROP POLICY IF EXISTS "Users can view own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can create bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON bookmarks;

-- Appreciations policies
DROP POLICY IF EXISTS "Appreciations are viewable by everyone" ON appreciations;
DROP POLICY IF EXISTS "Users can create appreciations" ON appreciations;
DROP POLICY IF EXISTS "Users can delete own appreciations" ON appreciations;

-- Follows policies
DROP POLICY IF EXISTS "Follows are viewable by everyone" ON follows;
DROP POLICY IF EXISTS "Users can create follows" ON follows;
DROP POLICY IF EXISTS "Users can delete own follows" ON follows;

-- Groups policies
DROP POLICY IF EXISTS "Groups are viewable by everyone" ON groups;
DROP POLICY IF EXISTS "Users can create groups" ON groups;
DROP POLICY IF EXISTS "Creators can update their groups" ON groups;

-- Group members policies
DROP POLICY IF EXISTS "Group members are viewable by everyone" ON group_members;
DROP POLICY IF EXISTS "Users can join groups" ON group_members;
DROP POLICY IF EXISTS "Users can leave groups" ON group_members;

-- Group messages policies
DROP POLICY IF EXISTS "Group members can view messages" ON group_messages;
DROP POLICY IF EXISTS "Group members can send messages" ON group_messages;

-- User settings policies
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;

-- ============================================
-- CREATE TABLES (IF NOT EXISTS)
-- ============================================

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  uid UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  roles TEXT[] DEFAULT ARRAY['reader'],
  influences TEXT[],
  writing_philosophy TEXT,
  expertise_tags TEXT[],
  liked_genres TEXT[],
  date_joined DATE DEFAULT CURRENT_DATE,
  birthday DATE,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WORKS TABLE
CREATE TABLE IF NOT EXISTS works (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT,
  content TEXT NOT NULL,
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'public')),
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  word_count INTEGER DEFAULT 0,
  reading_time_minutes INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  content TEXT NOT NULL,
  paragraph_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HIGHLIGHTS TABLE
CREATE TABLE IF NOT EXISTS highlights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  highlighted_text TEXT NOT NULL,
  start_index INTEGER NOT NULL,
  end_index INTEGER NOT NULL,
  type TEXT DEFAULT 'public' CHECK (type IN ('public', 'private')),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, work_id)
);

-- APPRECIATIONS TABLE
CREATE TABLE IF NOT EXISTS appreciations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, work_id)
);

-- FOLLOWS TABLE
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- GROUPS TABLE
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  genre_focus TEXT,
  member_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GROUP MEMBERS TABLE
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- GROUP MESSAGES TABLE
CREATE TABLE IF NOT EXISTS group_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USER SETTINGS TABLE
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(uid) ON DELETE CASCADE,
  profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'followers', 'private')),
  show_email BOOLEAN DEFAULT FALSE,
  show_birthday BOOLEAN DEFAULT FALSE,
  show_reading_activity BOOLEAN DEFAULT TRUE,
  show_highlights BOOLEAN DEFAULT TRUE,
  show_comments BOOLEAN DEFAULT TRUE,
  allow_messages BOOLEAN DEFAULT TRUE,
  allow_follows BOOLEAN DEFAULT TRUE,
  searchable BOOLEAN DEFAULT TRUE,
  data_sharing BOOLEAN DEFAULT FALSE,
  analytics_tracking BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES (IF NOT EXISTS)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_works_author_id ON works(author_id);
CREATE INDEX IF NOT EXISTS idx_works_visibility ON works(visibility);
CREATE INDEX IF NOT EXISTS idx_works_genre ON works(genre);
CREATE INDEX IF NOT EXISTS idx_works_published_at ON works(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_work_id ON comments(work_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_highlights_work_id ON highlights(work_id);
CREATE INDEX IF NOT EXISTS idx_highlights_user_id ON highlights(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_appreciations_work_id ON appreciations(work_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_messages_group_id ON group_messages(group_id);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE appreciations ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- USERS POLICIES
CREATE POLICY "Users are viewable by everyone"
ON users FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
ON users FOR UPDATE USING (auth.uid() = uid);

CREATE POLICY "Users can insert own profile"
ON users FOR INSERT WITH CHECK (auth.uid() = uid);

-- WORKS POLICIES
CREATE POLICY "Public works are viewable by everyone"
ON works FOR SELECT USING (visibility = 'public' OR author_id = auth.uid());

CREATE POLICY "Users can create works"
ON works FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their works"
ON works FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their works"
ON works FOR DELETE USING (auth.uid() = author_id);

-- COMMENTS POLICIES
CREATE POLICY "Comments viewable on accessible works"
ON comments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM works w
    WHERE w.id = comments.work_id
    AND (w.visibility = 'public' OR w.author_id = auth.uid())
  )
);

CREATE POLICY "Authenticated users can create comments"
ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
ON comments FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
ON comments FOR DELETE USING (auth.uid() = user_id);

-- HIGHLIGHTS POLICIES
CREATE POLICY "Highlights viewable by owner and on public works"
ON highlights FOR SELECT USING (
  auth.uid() = user_id OR
  (type = 'public' AND EXISTS (
    SELECT 1 FROM works w
    WHERE w.id = highlights.work_id
    AND w.visibility = 'public'
  ))
);

CREATE POLICY "Users can create highlights"
ON highlights FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own highlights"
ON highlights FOR DELETE USING (auth.uid() = user_id);

-- BOOKMARKS POLICIES
CREATE POLICY "Users can view own bookmarks"
ON bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookmarks"
ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- APPRECIATIONS POLICIES
CREATE POLICY "Appreciations are viewable by everyone"
ON appreciations FOR SELECT USING (true);

CREATE POLICY "Users can create appreciations"
ON appreciations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own appreciations"
ON appreciations FOR DELETE USING (auth.uid() = user_id);

-- FOLLOWS POLICIES
CREATE POLICY "Follows are viewable by everyone"
ON follows FOR SELECT USING (true);

CREATE POLICY "Users can create follows"
ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete own follows"
ON follows FOR DELETE USING (auth.uid() = follower_id);

-- GROUPS POLICIES
CREATE POLICY "Groups are viewable by everyone"
ON groups FOR SELECT USING (true);

CREATE POLICY "Users can create groups"
ON groups FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their groups"
ON groups FOR UPDATE USING (auth.uid() = creator_id);

-- GROUP MEMBERS POLICIES
CREATE POLICY "Group members are viewable by everyone"
ON group_members FOR SELECT USING (true);

CREATE POLICY "Users can join groups"
ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups"
ON group_members FOR DELETE USING (auth.uid() = user_id);

-- GROUP MESSAGES POLICIES
CREATE POLICY "Group members can view messages"
ON group_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM group_members gm
    WHERE gm.group_id = group_messages.group_id
    AND gm.user_id = auth.uid()
  )
);

CREATE POLICY "Group members can send messages"
ON group_messages FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM group_members gm
    WHERE gm.group_id = group_messages.group_id
    AND gm.user_id = auth.uid()
  )
);

-- USER SETTINGS POLICIES
CREATE POLICY "Users can view own settings"
ON user_settings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
ON user_settings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_works_updated_at ON works;
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_works_updated_at BEFORE UPDATE ON works
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
