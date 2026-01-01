-- Add comment_type column to comments table for Literary Marginalia feature
ALTER TABLE comments
ADD COLUMN IF NOT EXISTS comment_type TEXT DEFAULT 'reflection' CHECK (comment_type IN ('reflection', 'appreciation', 'question', 'critique'));

-- Add index for comment type queries
CREATE INDEX IF NOT EXISTS idx_comments_type ON comments(comment_type);

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'comments'
AND column_name = 'comment_type';
