-- ============================================
-- Add Sample Public Stories to Verso
-- ============================================

-- First, let's get your user ID (you'll need to replace this with your actual user ID)
-- You can find your user ID by running: SELECT uid, username FROM users;
-- Then replace 'YOUR_USER_ID_HERE' below with your actual UUID

-- Sample Story 1: The Last Library (Science Fiction)
INSERT INTO works (author_id, title, description, genre, content, visibility, status, word_count, reading_time_minutes, published_at)
VALUES (
  'YOUR_USER_ID_HERE',
  'The Last Library',
  'A hauntingly beautiful exploration of a world where stories have become extinct, and one librarian guards the final collection.',
  'Science Fiction',
  'The afternoon light filtered through the tall windows of the old library, casting long shadows across worn oak shelves. Sarah stood motionless, her fingers tracing the spine of a leather-bound volume that smelled of time and secrets.

"You found it," a voice whispered from the shadows.

She turned to see an elderly man emerge from behind a towering stack of books. His eyes, magnified behind thick spectacles, held the weight of countless stories. This was Mr. Whitmore, the librarian everyone said had forgotten more than most people would ever know.

"Is it real?" Sarah asked, her voice barely audible in the cathedral-like silence of the reading room.

Mr. Whitmore smiled, a gesture that transformed his weathered face into something almost boyish. "That depends on what you believe about the nature of reality. Books are real in the way that dreams are real—more true than truth itself."

The dust motes danced in the golden light as Sarah opened the book. The first page was blank. The second page held a single word: "Begin."

Her heart quickened. This was the moment she had been searching for—not the answer, but the invitation to write her own story.

"Every reader is a writer," Mr. Whitmore said, settling into a nearby armchair with a sigh that seemed to contain centuries. "The question is whether you''ll accept the invitation."

Sarah looked at the empty page before her, then at the infinity of books surrounding her. She understood then that the greatest library was not built from paper and binding, but from the stories we choose to tell ourselves.

She picked up a pen.',
  'public',
  'published',
  385,
  2,
  NOW()
);

-- Sample Story 2: Beneath the Surface (Literary Fiction)
INSERT INTO works (author_id, title, description, genre, content, visibility, status, word_count, reading_time_minutes, published_at)
VALUES (
  'YOUR_USER_ID_HERE',
  'Beneath the Surface',
  'Two strangers discover that the deepest conversations happen when we dare to be vulnerable.',
  'Literary',
  'The coffee shop conversations had become a ritual. Every Tuesday at three, Thomas and Elena would meet at the corner table, the one with the wobbly leg that nobody else wanted.

They weren''t lovers. They weren''t quite friends. They were something else entirely—two souls who had discovered that beneath the surface of polite small talk lay an ocean of unspoken truths.

"Tell me something real," Elena said, stirring sugar into her espresso with deliberate slowness.

Thomas watched the liquid spiral, seeing in it the same patterns he saw in their conversations—circling, circling, never quite reaching the center. "I''m afraid," he said, "that I''ve spent my whole life performing a version of myself that isn''t quite true."

Elena nodded, understanding. "We all do that. The question is whether we''re brave enough to show someone the parts we keep hidden."

The cafe bustled around them—the hiss of the espresso machine, the clatter of cups, the murmur of other people''s lives. But at their table, time moved differently, as if the honesty between them had created a pocket universe where pretense couldn''t survive.

"What are you hiding?" Thomas asked.

Elena smiled, sad and knowing. "The same thing everyone hides. The fear that if people saw who I really am, they''d walk away."

"And if they didn''t?"

"Then," she said, meeting his eyes, "then maybe we''d finally stop performing and start living."

Outside, the city rushed past. But at the corner table, two people sat in the rare and precious space of genuine connection, discovering that beneath the surface of every human heart lies the same desperate hope: to be truly seen and still loved.',
  'public',
  'published',
  328,
  2,
  NOW()
);

-- Sample Story 3: Clockwork Hearts (Fantasy)
INSERT INTO works (author_id, title, description, genre, content, visibility, status, word_count, reading_time_minutes, published_at)
VALUES (
  'YOUR_USER_ID_HERE',
  'Clockwork Hearts',
  'In a steampunk city, a watchmaker creates a mechanical heart that may be her greatest triumph—or her deepest folly.',
  'Fantasy',
  'In the brass and copper city of Meridian, where steam-powered carriages rattled through cobblestone streets and clockwork birds sang mechanical songs from iron trees, there lived a watchmaker named Isabelle.

She had crafted thousands of timepieces—pocket watches that never lost a second, clocks that chimed in perfect harmony. But her greatest creation remained locked in her workshop, hidden from the world.

It was a heart. A clockwork heart.

"It''s impossible," her mentor had told her years ago. "Emotion cannot be engineered. Love cannot be calibrated."

But Isabelle had never been good at accepting impossible.

The heart sat on her workbench now, its intricate gears visible through panels of crystal. It ticked steadily, faithfully, powered by a spring wound tight with hope and desperation.

The door to her workshop opened. Viktor stood in the doorway, his own chest bearing the scar of the accident that had taken his heart three months ago. He lived now on borrowed time, a temporary mechanism keeping him alive while they searched for a solution.

"Is it ready?" he asked, his voice steady despite the fear in his eyes.

Isabelle picked up the clockwork heart, feeling its weight, its rhythm. "I don''t know if it will work," she admitted. "I don''t know if something built from metal and mathematics can feel."

Viktor crossed the room, standing close enough that she could hear the labored ticking of his temporary heart. "Perhaps," he said softly, "love isn''t about feeling everything perfectly. Perhaps it''s about choosing to keep ticking, even when you''re afraid you might stop."

She looked up at him, this man she had been building a heart for, and realized she had been building it from her own.

"Then let''s find out," she said, "if clockwork can love."

In the city of Meridian, where impossible things were manufactured daily, two hearts—one mechanical, one uncertain—prepared to beat as one.',
  'public',
  'published',
  356,
  2,
  NOW()
);

-- Verify the stories were added
SELECT id, title, author_id, visibility, word_count, created_at
FROM works
WHERE visibility = 'public'
ORDER BY created_at DESC;
