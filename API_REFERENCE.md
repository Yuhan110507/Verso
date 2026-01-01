# Verso API Reference

This document outlines the API routes and data operations in Verso.

## Base URL
Development: `http://localhost:3000`
Production: `https://verso.yourdomain.com`

## Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## API Routes (To Be Implemented)

### Authentication

#### POST /api/auth/signup
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "username": "myusername",
  "displayName": "My Name"
}
```

**Response:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "username": "myusername",
  "displayName": "My Name",
  "token": "jwt_token"
}
```

#### POST /api/auth/login
Authenticate user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": { ... }
}
```

#### GET /api/auth/profile
Get current user profile. (Requires auth)

**Response:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "username": "myusername",
  "displayName": "My Name",
  "bio": "...",
  "avatarUrl": "...",
  "critiquCredits": 5,
  "expertiseTags": ["dialogue", "worldbuilding"],
  "influences": ["Author 1", "Author 2"],
  "writingPhilosophy": "..."
}
```

#### PUT /api/auth/profile
Update user profile. (Requires auth)

**Request:**
```json
{
  "displayName": "New Name",
  "bio": "New bio",
  "avatarUrl": "...",
  "influences": [...],
  "writingPhilosophy": "..."
}
```

---

### Works

#### GET /api/works
List all public works with pagination.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 24, max: 100)
- `genre` (filter by genre)
- `status` (published/draft/beta)
- `sort` (newest/popular/trending)

**Response:**
```json
{
  "total": 150,
  "page": 1,
  "limit": 24,
  "works": [
    {
      "id": "work-uuid",
      "title": "Work Title",
      "description": "...",
      "authorId": "author-uuid",
      "author": { "displayName": "..." },
      "genre": ["Fiction", "Romance"],
      "wordCount": 5000,
      "readingTime": 20,
      "status": "published",
      "visibility": "public",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/works
Create a new work. (Requires auth)

**Request:**
```json
{
  "title": "New Work",
  "description": "Short description",
  "genre": ["Fiction"],
  "content": "...",
  "visibility": "private"
}
```

**Response:**
```json
{
  "id": "work-uuid",
  "title": "New Work",
  "authorId": "user-uuid",
  "status": "draft",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### GET /api/works/:id
Get a specific work.

**Response:**
```json
{
  "id": "work-uuid",
  "title": "Work Title",
  "content": "...",
  "author": { ... },
  "comments": [ ... ],
  "highlights": [ ... ],
  "stats": {
    "viewCount": 100,
    "commentCount": 5,
    "readingTimeAvg": 18
  }
}
```

#### PUT /api/works/:id
Update a work. (Requires auth + ownership)

#### DELETE /api/works/:id
Delete a work. (Requires auth + ownership)

#### POST /api/works/:id/publish
Publish a work. (Requires auth + ownership)

**Request:**
```json
{
  "visibility": "public",
  "genre": ["Fiction"]
}
```

---

### Chapters

#### GET /api/works/:workId/chapters
Get all chapters for a work.

#### POST /api/works/:workId/chapters
Create a new chapter. (Requires auth + work ownership)

**Request:**
```json
{
  "title": "Chapter 1",
  "content": "...",
  "chapterNumber": 1
}
```

#### PUT /api/chapters/:id
Update a chapter. (Requires auth + work ownership)

#### DELETE /api/chapters/:id
Delete a chapter. (Requires auth + work ownership)

---

### Comments

#### GET /api/works/:id/comments
Get all comments for a work.

**Query Parameters:**
- `sort` (newest/oldest/mostHelpful)
- `mode` (all/appreciation/critique)

**Response:**
```json
[
  {
    "id": "comment-uuid",
    "content": "Great work!",
    "userId": "user-uuid",
    "user": { "displayName": "..." },
    "mode": "appreciation",
    "helpfulCount": 3,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/works/:id/comments
Create a comment. (Requires auth)

**Request:**
```json
{
  "content": "Your comment here",
  "mode": "appreciation",
  "paragraphIndex": 5,
  "isInline": false
}
```

#### PUT /api/comments/:id
Update a comment. (Requires auth + authorship)

#### DELETE /api/comments/:id
Delete a comment. (Requires auth + authorship)

#### POST /api/comments/:id/helpful
Mark a comment as helpful. (Requires auth)

---

### Highlights/Resonance

#### GET /api/works/:id/highlights
Get all highlights for a work.

**Response:**
```json
[
  {
    "id": "highlight-uuid",
    "userId": "user-uuid",
    "user": { "displayName": "..." },
    "resonanceType": "beautiful",
    "startIndex": 100,
    "endIndex": 150,
    "note": "Optional note",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/works/:id/highlights
Create a highlight. (Requires auth)

**Request:**
```json
{
  "startIndex": 100,
  "endIndex": 150,
  "resonanceType": "beautiful",
  "note": "This passage moved me"
}
```

#### DELETE /api/highlights/:id
Delete a highlight. (Requires auth + authorship)

---

### Workshop Circles

#### GET /api/workshops
Get all workshop circles.

**Response:**
```json
[
  {
    "id": "circle-uuid",
    "name": "SciFi Workshop",
    "description": "...",
    "creatorId": "user-uuid",
    "members": [...],
    "maxMembers": 8,
    "genreFocus": ["Science Fiction"],
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/workshops
Create a workshop circle. (Requires auth)

**Request:**
```json
{
  "name": "New Workshop",
  "description": "...",
  "genreFocus": ["Fiction"],
  "maxMembers": 8
}
```

#### GET /api/workshops/:id
Get a specific workshop circle.

#### POST /api/workshops/:id/join
Join a workshop circle. (Requires auth)

#### POST /api/workshops/:id/leave
Leave a workshop circle. (Requires auth)

#### POST /api/workshops/:id/sessions
Create a new critique session. (Requires auth + leadership)

**Request:**
```json
{
  "workId": "work-uuid",
  "deadline": "2024-02-01T00:00:00Z",
  "feedbackTemplate": { ... }
}
```

---

### Reading Circles

#### GET /api/reading-circles
Get all reading circles.

#### POST /api/reading-circles
Create a reading circle. (Requires auth)

**Request:**
```json
{
  "name": "Classic Lit Club",
  "genreFocus": ["Classics"],
  "commitmentPagesPerWeek": 50
}
```

#### GET /api/reading-circles/:id
Get a specific reading circle.

#### POST /api/reading-circles/:id/join
Join a reading circle. (Requires auth)

#### POST /api/reading-circles/:id/leave
Leave a reading circle. (Requires auth)

---

### Authors

#### GET /api/authors/:id
Get an author's profile.

**Response:**
```json
{
  "id": "author-uuid",
  "displayName": "Author Name",
  "bio": "...",
  "avatarUrl": "...",
  "influences": [...],
  "writingPhilosophy": "...",
  "works": [ ... ],
  "stats": {
    "totalWorks": 5,
    "totalWords": 50000
  }
}
```

#### GET /api/authors/:id/works
Get all public works by an author.

---

### Reading Lists

#### GET /api/reading-lists/:id
Get a public reading list.

**Response:**
```json
{
  "id": "list-uuid",
  "title": "Favorite Sci-Fi",
  "description": "...",
  "curator": { ... },
  "works": [ ... ],
  "isPublic": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### POST /api/reading-lists
Create a reading list. (Requires auth)

#### PUT /api/reading-lists/:id
Update a reading list. (Requires auth + ownership)

#### DELETE /api/reading-lists/:id
Delete a reading list. (Requires auth + ownership)

---

### Search

#### GET /api/search
Advanced search.

**Query Parameters:**
- `q` (search query)
- `type` (works/authors/tags)
- `genre` (filter)
- `minWordCount` (filter)
- `maxWordCount` (filter)
- `sort` (relevance/newest/popular)

**Response:**
```json
{
  "results": [
    {
      "id": "...",
      "type": "work",
      "title": "...",
      "relevance": 0.95
    }
  ]
}
```

---

### Analytics (For Authors)

#### GET /api/works/:id/analytics
Get analytics for a work. (Requires auth + ownership)

**Response:**
```json
{
  "workId": "work-uuid",
  "viewCount": 250,
  "uniqueReaders": 180,
  "commentCount": 12,
  "highlightCount": 45,
  "resonanceBreakdown": {
    "moved": 15,
    "thoughtful": 12,
    "beautiful": 10,
    "gripping": 5,
    "provoking": 3
  },
  "avgReadingTime": 18,
  "completionRate": 0.75,
  "topComments": [ ... ]
}
```

#### GET /api/authors/:id/analytics
Get analytics for an author's works. (Requires auth + ownership)

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": "..."
  }
}
```

### Error Codes
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - User lacks permission
- `NOT_FOUND` - Resource doesn't exist
- `VALIDATION_ERROR` - Invalid request data
- `CONFLICT` - Resource already exists
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

---

## Rate Limiting

- Anonymous users: 100 requests/hour
- Authenticated users: 1000 requests/hour
- API endpoints: 10000 requests/hour

---

## Pagination

List endpoints support pagination:

```json
{
  "data": [ ... ],
  "pagination": {
    "total": 250,
    "page": 1,
    "limit": 25,
    "pages": 10
  }
}
```

---

## Data Access Control

### Public Data (No Auth Required)
- Published works with `visibility: "public"`
- Author profiles
- Public reading lists
- Public comments

### Private Data (Auth Required)
- Draft works
- User's own comments
- Private reading lists
- Personal statistics

### Protected Data (Ownership Required)
- Draft works can only be edited by author
- Comments can only be deleted by author
- Private lists can only be shared by creator

---

## Webhooks (Future)

Subscribe to events:
- `work.published`
- `work.commented`
- `comment.helpful`
- `circle.joined`
- `highlight.created`

---

## Rate Limits

Standard rate limits per endpoint:
- Read: 1000 req/hour
- Write: 100 req/hour
- Search: 200 req/hour

---

This API is designed to be RESTful, predictable, and easy to use. Webhooks and GraphQL support are planned for future versions.
