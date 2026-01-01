-- Add display_name column to users table for Discover page integration
-- This column is used to show author names in story listings

ALTER TABLE users
ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name = 'display_name';
