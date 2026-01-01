# Verso - A Literary Community Platform

Verso is a sophisticated platform where writers craft their works and readers engage with thoughtful feedback. Built with Next.js, TypeScript, and Supabase, it's designed for serious literary engagement.

## Vision

Verso feels like walking into an intimate, well-curated independent bookshop meets a writer's private study meets a sophisticated literary salon. Professional but warm. Serious about craft but encouraging. Beautiful but never at the expense of functionality.

## Core Features Implemented

### 1. Writing Interface
- **Distraction-free editor** with clean, serif typography
- **Auto-save functionality** that preserves work every 2 seconds
- **Word count and reading time** tracked automatically
- **Draft management** with version history support
- **Chapter/section organization** for serialized works
- **Clean toolbar** for basic formatting (bold, italic, blockquotes)

### 2. Reading Experience
- **Elegant, centered text layout** optimized for readability
- **Progress indicator** styled as a bookmark ribbon
- **Left margin for annotations** (marginalia)
- **Author information and metadata** display
- **Responsive design** across devices

### 3. Community & Feedback
- **Resonance system** - readers can express: "Moved me", "Made me think", "Beautifully written", "Gripping", "Thought-provoking"
- **Comment system** with appreciation and critique modes
- **Inline commenting** capabilities for paragraph-level feedback
- **Workshop Circles** - small groups (4-8) for structured critique
- **Reading Circles** - groups around genres with commitment-based reading

### 4. Discovery & Curation
- **Genre-based browsing** with advanced filtering
- **Author profile pages** showcasing writing philosophy and works
- **Public work discovery** page with curated collections
- **Tag system** for genre, theme, content warnings, and tone

### 5. User Profiles & Statistics
- **Author profiles** with bio, influences, and writing philosophy
- **Dashboard** showing works, word counts, and engagement metrics
- **Critique credits system** for earning and spending feedback requests
- **Reader expertise tags** to weight feedback appropriately

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom Verso design system
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **State Management**: Zustand
- **UI Components**: Custom React components

## Color Palette

- **Background**: `#FAF0DC` (Warm Cream - aged book pages)
- **Text**: `#36454F` (Deep Charcoal)
- **Accents**: `#9CAF88` (Muted Sage), `#800020` (Deep Burgundy)
- **Gold**: `#C19A6B` (Warm gold for badges)
- **Sage Green**: `#5C7650` (Success/confirmations)
- **Dusty Rose**: `#DCA1A1` (Subtle alerts)

## Project Structure

```
verso/
├── app/                    # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/          # User dashboard
│   ├── discover/           # Discovery page
│   ├── write/              # Writing editor
│   ├── work/[id]/          # Work reading page
│   ├── author/[id]/        # Author profile
│   ├── workshops/          # Workshop circles
│   └── layout.tsx
├── components/             # Reusable React components
│   ├── Editor/
│   │   └── RichTextEditor.tsx
│   └── Reader/
│       └── ReadingView.tsx
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── database.types.ts   # Generated types
│   ├── database.sql        # Schema migrations
│   └── stores/             # Zustand stores
│       ├── authStore.ts
│       └── editorStore.ts
├── types/
│   └── database.ts         # TypeScript interfaces
├── styles/
│   └── globals.css         # Global styles & Tailwind
└── public/                 # Static assets
```

## Database Schema

### Tables
- **users** - Author profiles with expertise and credits
- **works** - Published and draft works with metadata
- **chapters** - For serialized/multi-chapter works
- **comments** - All user feedback (inline and threaded)
- **highlights** - Resonance reactions with selection info
- **workshop_circles** - Small critique groups
- **reading_circles** - Reading groups with commitment
- **tags** - Genre, theme, warning, tone tags
- **work_drafts** - Version history for each work
- **reading_lists** - Curated collections by users

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### 1. Install Dependencies
```bash
cd verso
npm install
```

### 2. Set Up Supabase
1. Create a new Supabase project
2. Copy your project URL and anon key
3. Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 3. Run Database Migrations
1. Go to Supabase SQL Editor
2. Copy the contents of `lib/database.sql`
3. Paste and execute all migrations
4. Enable RLS (Row Level Security) on all tables

### 4. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

## Key Features to Explore

### Writing a Work
1. Sign up or log in
2. Go to Dashboard → "Start New Work"
3. Write in the distraction-free editor
4. Auto-save preserves every change
5. Set visibility (private/beta/public) before publishing

### Reading & Feedback
1. Go to Discover to browse published works
2. Click a work to read with progress tracking
3. Use the resonance system to rate your experience
4. Leave inline or threaded comments

### Workshop Circles
1. Create or join a workshop circle
2. Submit work for structured feedback
3. Commit to reading and critiquing peer works
4. Earn critique credits for quality feedback

## Future Enhancements

- [ ] Palimpsest view (revision history visualization)
- [ ] Craft library (integrated writing resources)
- [ ] Advanced analytics dashboard
- [ ] Email delivery of new works to followers
- [ ] Anthology/collection creation
- [ ] Mobile app
- [ ] Export to PDF/ePUB/DOCX
- [ ] Offline editing mode
- [ ] Real-time collaborative editing (for groups)

## Design Philosophy

Verso is built on these principles:

1. **Craft-first**: Every feature supports serious writers and engaged readers
2. **Beautiful but functional**: Design enhances readability, never distracts
3. **Minimalist interface**: Clean, generous white space, clear typography
4. **Community-focused**: Feedback and engagement are central, not gamified
5. **Professional aesthetic**: Warm, literary, like a well-designed book

## Contributing

This is a personal project. For modifications, feel free to fork and adapt to your needs.

## License

All rights reserved - Verso Platform

---

Built with care for writers who care deeply about their craft.
