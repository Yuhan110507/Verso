-- Add missing columns to users table if they don't exist
ALTER TABLE users
ADD COLUMN IF NOT EXISTS influences TEXT[],
ADD COLUMN IF NOT EXISTS writing_philosophy TEXT,
ADD COLUMN IF NOT EXISTS expertise_tags TEXT[],
ADD COLUMN IF NOT EXISTS liked_genres TEXT[];

-- Verify the columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name IN ('influences', 'writing_philosophy', 'expertise_tags', 'liked_genres', 'roles');
