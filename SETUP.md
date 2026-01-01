# Verso Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier available)
- A modern web browser

### 2. Installation

```bash
# Navigate to the verso directory
cd verso

# Install dependencies
npm install

# Or if you prefer yarn
yarn install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Copy your project credentials:
   - **Project URL**: Found in Settings → General → API Settings
   - **Anon Key**: Found in Settings → General → API Settings

3. Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Configure Database

1. In Supabase, navigate to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `lib/database.sql`
4. Click **Run** to execute all migrations
5. Wait for the migrations to complete

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## First Steps in Verso

### Create an Account
1. Go to `/auth/signup`
2. Enter your email, username, and display name
3. Create a password
4. You'll be redirected to your dashboard

### Write Your First Work
1. Go to Dashboard → "Start New Work"
2. Give it a title
3. Write in the distraction-free editor
4. Your work auto-saves every 2 seconds
5. Set visibility (private/beta/public) when ready

### Discover Works
1. Go to **Discover** page
2. Browse by genre or search
3. Click any work to read and leave feedback

### Join Communities
- **Workshop Circles**: Small groups for detailed critique
- **Reading Circles**: Groups that commit to reading together

## Project Structure

```
verso/
├── app/                      # Next.js App Router routes
│   ├── (auth)/
│   │   ├── login/           # User login page
│   │   └── signup/          # User registration page
│   ├── author/[id]/         # Author profile pages
│   ├── dashboard/           # User dashboard (works + stats)
│   ├── discover/            # Discovery/browse works
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── reading-circles/     # Reading circle management
│   ├── work/[id]/           # Work reading page
│   │   └── revisions/       # Revision history viewer
│   ├── workshops/           # Workshop circle management
│   ├── write/               # Writing editor
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   ├── Editor/
│   │   └── RichTextEditor.tsx      # Main writing editor
│   └── Reader/
│       └── ReadingView.tsx         # Main reading view
├── lib/
│   ├── supabase.ts                 # Supabase client initialization
│   ├── database.types.ts           # Supabase-generated types
│   ├── database.sql                # Database schema & migrations
│   ├── utils.ts                    # Utility functions
│   └── stores/
│       ├── authStore.ts            # Authentication state (Zustand)
│       └── editorStore.ts          # Editor state (Zustand)
├── types/
│   └── database.ts                 # TypeScript database interfaces
├── styles/
│   └── globals.css                 # Tailwind directives & custom styles
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Project overview
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## Database Schema Overview

### Core Tables

**users**
- Stores user profiles and credentials
- Fields: id, email, username, display_name, bio, avatar_url, expertise_tags, critique_credits

**works**
- Published and draft works
- Fields: id, author_id, title, content, status, visibility, word_count, genre

**chapters**
- For serialized works
- Fields: id, work_id, chapter_number, title, content, author_notes

**comments**
- Feedback on works
- Fields: id, work_id, user_id, content, is_inline, mode, helpful_count

**highlights**
- Resonance/appreciation reactions
- Fields: id, work_id, user_id, start_index, end_index, resonance_type

**workshop_circles**
- Critique groups
- Fields: id, name, creator_id, members, max_members, genre_focus

**reading_circles**
- Reading groups
- Fields: id, name, creator_id, members, commitment_pages_per_week

**tags**
- Genre, theme, content warning tags
- Fields: id, name, category, color

**work_drafts**
- Version history
- Fields: id, work_id, version, content, word_count, author_note

**reading_lists**
- Curated work collections
- Fields: id, user_id, title, works, is_public

## Key Features

### 1. Writing Experience
- **Distraction-free editor** with clean interface
- **Auto-save** every 2 seconds
- **Word count & reading time** auto-calculated
- **Version history** for tracking revisions
- **Markdown-style formatting** (bold, italic, blockquotes)

### 2. Reading Experience
- **Progress tracking** with visual bookmark ribbon
- **Comfortable typography** optimized for reading
- **Paragraph-level commenting** with marginalia
- **Resonance reactions** (Moved, Thoughtful, Beautiful, Gripping, Provoking)

### 3. Community Features
- **Workshop Circles**: 4-8 person critique groups
- **Reading Circles**: Commitment-based reading groups
- **Comment threads** for detailed feedback
- **Critique credits** system for fair contribution

### 4. Discovery
- **Genre browsing** with advanced filters
- **Author profiles** with writing philosophy
- **Curated collections**
- **Search functionality**

## Environment Variables

Required variables in `.env.local`:

```env
# Supabase Configuration (required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional - for future features
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Install new package
npm install package-name
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set environment variables in Vercel dashboard
5. Click Deploy

### Deploy Elsewhere

The application can be deployed to any Node.js hosting provider:
- Heroku
- Railway
- Render
- Netlify (with serverless functions)
- DigitalOcean App Platform

## Troubleshooting

### Database Connection Issues
- Check that Supabase URL and key are correct in `.env.local`
- Verify database migrations ran successfully
- Check Supabase SQL Editor for any errors

### Authentication Not Working
- Clear browser cache and cookies
- Check Supabase Auth settings
- Verify JWT secret is configured

### Auto-save Not Working
- Open browser console (F12) to check for errors
- Verify Supabase network connectivity
- Check browser local storage permissions

### Styling Issues
- Rebuild Tailwind: `npm run build`
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

## Performance Tips

1. **Optimize images**: Use next/image for responsive images
2. **Code splitting**: Dynamic imports for large components
3. **Database queries**: Add indexes to frequently queried columns
4. **Caching**: Implement HTTP caching for static content
5. **CDN**: Use Vercel's CDN or CloudFlare for global distribution

## Security Considerations

1. **Row Level Security (RLS)**: Enabled on all Supabase tables
2. **Authentication**: JWT tokens via Supabase Auth
3. **Environment variables**: Never commit `.env.local`
4. **SQL injection**: Using parameterized queries via Supabase client
5. **XSS prevention**: React's built-in escaping + sanitize user content

## Next Steps

1. Customize styling to match your brand
2. Add user authentication features (2FA, SSO)
3. Implement email notifications
4. Add analytics tracking
5. Create admin dashboard
6. Build mobile app with React Native
7. Add real-time collaboration features
8. Implement advanced search with Algolia

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com/docs

## License

This project is proprietary. All rights reserved.

---

Happy writing! Build something beautiful on Verso.
