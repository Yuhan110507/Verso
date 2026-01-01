# Verso Architecture

## System Overview

Verso is a full-stack Next.js application with the following layers:

```
┌─────────────────────────────────────────────┐
│         Frontend (React/TypeScript)         │
│  Pages, Components, State Management        │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│    API Routes (Server-Side Logic)           │
│  (To be implemented for custom logic)       │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│    Supabase (Backend & Database)            │
│ PostgreSQL + Auth + Real-time Subscriptions │
└─────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management

### Backend
- **Supabase**: PostgreSQL database with auth
- **PostgREST**: Auto-generated REST API
- **Supabase Auth**: User authentication (JWT)
- **Row Level Security**: Built-in authorization

## Project Layers

### 1. Pages (app/)
Entry points for each feature/section:
- **Authentication**: `/auth/signup`, `/auth/login`
- **Writing**: `/write`
- **Reading**: `/work/[id]`
- **Discovery**: `/discover`
- **Community**: `/workshops`, `/reading-circles`
- **Profiles**: `/author/[id]`, `/dashboard`

### 2. Components (components/)
Reusable UI components:
- **RichTextEditor**: Main writing interface
- **ReadingView**: Main reading interface
- Additional components to be created as needed

### 3. State Management (lib/stores/)
Zustand stores for client-side state:
- **authStore**: User authentication state
- **editorStore**: Writing editor state
- Additional stores as needed

### 4. Services (lib/)
- **supabase.ts**: Supabase client initialization
- **utils.ts**: Utility functions
- **database.types.ts**: Type definitions from Supabase

### 5. Types (types/)
- **database.ts**: TypeScript interfaces matching database schema

## Data Flow

### Reading a Work (Example)

```
User clicks work →
  ↓
[app/work/[id]/page.tsx]
  ↓
Fetch from Supabase (works table) →
  ↓
[lib/supabase.ts] handles API call →
  ↓
Display in [components/Reader/ReadingView.tsx] →
  ↓
User comments/reacts →
  ↓
Insert into comments/highlights table →
  ↓
Real-time update displayed
```

### Writing a Work (Example)

```
User opens editor →
  ↓
[app/write/page.tsx]
  ↓
[useEditorStore] tracks content in memory →
  ↓
Every 2 seconds: auto-save triggered →
  ↓
[lib/supabase.ts] inserts/updates works table →
  ↓
[work_drafts] table gets new version →
  ↓
Confirmation shown to user
```

## Authentication Flow

```
Sign Up:
User info → [app/auth/signup/page.tsx]
  → Supabase Auth (creates user)
  → Insert profile to [users] table
  → JWT token stored in browser
  → Redirect to dashboard

Login:
Credentials → [app/auth/login/page.tsx]
  → Supabase Auth (validates)
  → JWT token stored in browser
  → Redirect to dashboard

Protected Routes:
Check JWT → [useAuthStore]
  → Get user session via Supabase
  → Allow/redirect based on auth status
```

## Database Relations

```
users (1) ──────────┬────── (N) works
                    ├────── (N) comments
                    ├────── (N) highlights
                    ├────── (N) workshop_circles
                    └────── (N) reading_circles

works  (1) ──────────┬────── (N) chapters
                    ├────── (N) comments
                    ├────── (N) highlights
                    ├────── (N) work_drafts
                    └────── (N) work_tags

chapters (1) ────── (N) comments
chapters (1) ────── (N) highlights

tags   (N) ──────── (N) works (via work_tags)

workshop_circles  (1) ────── (N) members (array)
reading_circles   (1) ────── (N) members (array)
reading_lists     (1) ────── (N) works (array)
```

## State Management Strategy

### Client State (Zustand)
- User authentication info
- Editor content and metadata
- UI state (modals, sidebars)

### Server State (Supabase)
- All persistent data (works, comments, etc.)
- User profiles
- Relationships and permissions

### Real-time State
- Implement via Supabase subscriptions (future)
- Multiple users reading same work
- Live comment updates

## API Routes (Future)

When custom logic is needed, add to `app/api/`:

```
app/api/
├── auth/
│   ├── profile        # GET user profile
│   └── update         # PUT update profile
├── works/
│   ├── route.ts       # GET all/CREATE
│   ├── [id]/route.ts  # GET/UPDATE/DELETE single
│   └── [id]/publish   # POST publish
├── comments/
│   ├── route.ts       # GET/POST
│   └── [id]/route.ts  # PUT/DELETE
├── analytics/
│   └── route.ts       # GET engagement data
└── search/
    └── route.ts       # POST search query
```

## Performance Considerations

### Frontend Optimization
- Code splitting with dynamic imports
- Image optimization with next/image
- Lazy loading of components
- Memoization for expensive components

### Backend Optimization
- Database indexes on frequently queried columns
- Pagination for large result sets
- Caching strategies (HTTP headers)
- Query optimization

### Real-time Features
- Use Supabase subscriptions instead of polling
- Debounce auto-save to reduce writes
- Cache user profiles after first fetch

## Security Model

### Authentication
- JWT tokens via Supabase Auth
- Secure password hashing (bcrypt)
- Session management in browser storage

### Authorization
- Row Level Security (RLS) on all tables
- Users can only modify their own content
- Public/private visibility flags
- Beta reader lists for selective access

### Data Protection
- Parameterized queries (via Supabase client)
- Input validation on forms
- XSS prevention (React escaping + sanitization)
- CSRF tokens on state-changing operations

## Scalability Strategy

### Current Architecture
- Single Next.js instance
- Supabase handles database scaling
- Good for 100-10K users

### Future Scaling
- Implement caching layer (Redis)
- Add CDN for static content
- Separate read/write databases
- Implement search engine (Algolia)
- Add message queue (Bull/RabbitMQ) for background jobs

## Monitoring & Logging

To implement:
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Database query logging
- User activity analytics
- API rate limiting

## Testing Strategy

To implement:
- Unit tests for utilities (Jest)
- Component tests (React Testing Library)
- E2E tests (Cypress/Playwright)
- Database tests with test fixtures

## Deployment Architecture

### Development
- Local Next.js dev server
- Supabase local development database

### Production (Vercel)
- Next.js deployed to Vercel
- Supabase managed database
- Environment variables in Vercel dashboard
- Automatic deployments from GitHub

## File Size & Performance Targets

- Initial page load: < 3 seconds
- Editor load: < 1 second
- Work reading: < 2 seconds
- First Contentful Paint (FCP): < 1.2 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds

## Future Architecture Improvements

1. **Offline Support**: Service workers for offline writing
2. **Real-time Collaboration**: WebSockets for group editing
3. **Content Recommendations**: ML-based suggestion engine
4. **Image Storage**: S3/R2 for cover images
5. **Full-text Search**: PostgreSQL FTS or Elasticsearch
6. **Webhooks**: For external integrations
7. **API Gateway**: Rate limiting and monitoring
8. **Background Jobs**: Cron jobs for notifications/cleanup

---

This architecture is designed to be:
- **Scalable**: From MVP to thousands of users
- **Maintainable**: Clear separation of concerns
- **Secure**: Multi-layer authorization
- **Performant**: Optimized for web reading/writing experiences
- **Extensible**: Easy to add new features
