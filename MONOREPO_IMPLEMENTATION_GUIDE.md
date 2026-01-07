# Bismillah Ar-Rahman Ar-Raheem

# Bloggy-Beta Monorepo Implementation Guide

> **Purpose**: This document provides a comprehensive guide for converting the existing React (Vite) application into a monorepo structure with a Next.js backend API, ensuring all database interactions, sensitive API calls, and security-critical operations are moved server-side.

---

## Table of Contents

1. [Current Architecture Overview](#1-current-architecture-overview)
2. [Proposed Monorepo Structure](#2-proposed-monorepo-structure)
3. [Files Requiring Server-Side Migration](#3-files-requiring-server-side-migration)
4. [Next.js API Routes Structure](#4-nextjs-api-routes-structure)
5. [React App Modifications](#5-react-app-modifications)
6. [Shared Packages](#6-shared-packages)
7. [Environment Variables](#7-environment-variables)
8. [Implementation Checklist](#8-implementation-checklist)

---

## 1. Current Architecture Overview

### Current Stack
- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: TailwindCSS + Radix UI + shadcn/ui
- **Database**: GitHub Repository (JSON files via GitHub API)
- **State**: React Query + Context API

### Critical Security Issues (Current)
| Issue | Location | Risk Level |
|-------|----------|------------|
| GitHub Token exposed in client | `sdk-instance.ts`, `db-init.ts` | 🔴 **CRITICAL** |
| Direct GitHub API calls from browser | `sdk.ts` | 🔴 **CRITICAL** |
| SMTP credentials in client | `emailService.ts` | 🔴 **CRITICAL** |
| AI API keys in client | `ai-service.ts` | 🔴 **CRITICAL** |
| Paystack keys exposed | `.env.example` | 🟠 **HIGH** |
| Social media tokens exposed | `.env.example` | 🟠 **HIGH** |
| Sessions stored in memory (client) | `sdk.ts` | 🟠 **HIGH** |
| No password verification (subscriber) | `BlogSubscriberAuthContext.tsx` | 🟠 **HIGH** |

---

## 2. Proposed Monorepo Structure

```
bloggy-beta/
├── apps/
│   ├── web/                          # React Vite App (UI Only)
│   │   ├── src/
│   │   │   ├── components/           # All UI components (unchanged)
│   │   │   ├── contexts/             # Modified contexts (API calls only)
│   │   │   ├── hooks/                # Modified hooks (API calls only)
│   │   │   ├── pages/                # All pages (unchanged UI)
│   │   │   ├── styles/               # All styles (unchanged)
│   │   │   ├── lib/
│   │   │   │   ├── api-client.ts     # NEW: HTTP client for API calls
│   │   │   │   ├── utils.ts          # Keep utility functions
│   │   │   │   └── performance-cache.ts  # Keep client-side caching
│   │   │   └── types/                # Shared types (import from packages)
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── api/                          # Next.js API App (Backend Only)
│       ├── src/
│       │   ├── app/
│       │   │   └── api/              # All API routes
│       │   │       ├── auth/
│       │   │       ├── blogs/
│       │   │       ├── posts/
│       │   │       ├── subscribers/
│       │   │       ├── email/
│       │   │       ├── social/
│       │   │       ├── wallet/
│       │   │       ├── ai/
│       │   │       └── webhooks/
│       │   ├── lib/
│       │   │   ├── github-sdk.ts     # MOVED: Full SDK implementation
│       │   │   ├── db-service.ts     # MOVED: Database operations
│       │   │   ├── email-service.ts  # MOVED: Email service
│       │   │   ├── social-service.ts # MOVED: Social media service
│       │   │   ├── wallet-service.ts # MOVED: Wallet/payment service
│       │   │   ├── ai-service.ts     # MOVED: AI service
│       │   │   └── auth.ts           # MOVED: Authentication logic
│       │   └── middleware.ts         # Auth middleware, rate limiting
│       ├── package.json
│       └── next.config.js
│
├── packages/
│   └── shared/                       # Shared Types & Utilities
│       ├── src/
│       │   ├── types/                # All TypeScript types
│       │   │   ├── blog.ts
│       │   │   ├── user.ts
│       │   │   ├── post.ts
│       │   │   ├── wallet.ts
│       │   │   ├── email.ts
│       │   │   └── social.ts
│       │   └── utils/                # Shared utilities
│       │       ├── validation.ts
│       │       └── formatters.ts
│       └── package.json
│
├── package.json                      # Root package.json (workspaces)
├── turbo.json                        # Turborepo configuration
└── .env                              # Environment variables (server only)
```

---

## 3. Files Requiring Server-Side Migration

### 🔴 CRITICAL: Must Move to Next.js API

| Current File | New Location | Description |
|--------------|--------------|-------------|
| `src/lib/sdk.ts` | `apps/api/src/lib/github-sdk.ts` | Core GitHub SDK with all CRUD operations |
| `src/lib/sdk-instance.ts` | `apps/api/src/lib/db-service.ts` | SDK configuration and initialization |
| `src/lib/db-init.ts` | `apps/api/src/lib/db-init.ts` | Database initialization script |
| `src/lib/ai-service.ts` | `apps/api/src/lib/ai-service.ts` | AI content generation (Chutes/Gemini) |
| `src/services/emailService.ts` | `apps/api/src/lib/email-service.ts` | Email/SMTP operations |
| `src/services/socialMediaService.ts` | `apps/api/src/lib/social-service.ts` | Social media API integrations |
| `src/services/walletService.ts` | `apps/api/src/lib/wallet-service.ts` | Paystack/wallet operations |

### 🟠 MODIFY: Authentication Contexts

| Current File | Action | Notes |
|--------------|--------|-------|
| `src/contexts/AuthContext.tsx` | Modify | Replace SDK calls with API client calls |
| `src/contexts/BlogSubscriberAuthContext.tsx` | Modify | Replace SDK calls with API client calls |

### 🟠 MODIFY: Hooks

| Current File | Action | Notes |
|--------------|--------|-------|
| `src/hooks/use-blog-data.tsx` | Modify | Use API client instead of SDK |
| `src/hooks/use-enhanced-autosave.ts` | Modify | Call API endpoints for saving |
| `src/hooks/use-real-time-updates.ts` | Modify | Use WebSocket/SSE from API |

### 🟢 KEEP: UI Components & Pages

All files in `src/components/` and `src/pages/` remain in React app but will call the new API client instead of SDK directly.

---

## 4. Next.js API Routes Structure

### Authentication Routes

```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/verify-otp        # OTP verification
GET    /api/auth/session           # Get current session
POST   /api/auth/refresh           # Refresh token
```

### Blog Routes

```
GET    /api/blogs                  # List all blogs
GET    /api/blogs/:slug            # Get blog by slug
POST   /api/blogs                  # Create new blog
PUT    /api/blogs/:id              # Update blog
DELETE /api/blogs/:id              # Delete blog
GET    /api/blogs/:id/stats        # Get blog statistics
```

### Post Routes

```
GET    /api/posts                  # List posts (with filters)
GET    /api/posts/:slug            # Get post by slug
POST   /api/posts                  # Create post
PUT    /api/posts/:id              # Update post
DELETE /api/posts/:id              # Delete post
POST   /api/posts/:id/autosave     # Autosave post
GET    /api/blogs/:blogId/posts    # Get posts by blog
```

### Subscriber Routes

```
POST   /api/subscribers/register   # Subscriber registration
POST   /api/subscribers/login      # Subscriber login
POST   /api/subscribers/logout     # Subscriber logout
PUT    /api/subscribers/:id        # Update preferences
GET    /api/subscribers/:blogId    # List blog subscribers
```

### Email Routes

```
POST   /api/email/templates        # Create email template
GET    /api/email/templates/:blogId # Get templates
POST   /api/email/campaigns        # Create campaign
POST   /api/email/campaigns/:id/send # Send campaign
```

### Social Media Routes

```
POST   /api/social/connect         # Connect social account
GET    /api/social/accounts/:blogId # Get connected accounts
POST   /api/social/disconnect/:id  # Disconnect account
POST   /api/social/posts           # Create social post
POST   /api/social/posts/:id/publish # Publish post
```

### Wallet Routes

```
GET    /api/wallet/:userId         # Get wallet
POST   /api/wallet/fund            # Initialize Paystack payment
POST   /api/wallet/verify          # Verify payment callback
GET    /api/wallet/:id/transactions # Get transactions
```

### AI Routes

```
POST   /api/ai/generate            # Generate content
POST   /api/ai/generate-post       # Generate full blog post
POST   /api/ai/improve-seo         # Improve SEO
POST   /api/ai/social-posts        # Generate social posts
```

### Webhook Routes

```
POST   /api/webhooks/paystack      # Paystack webhook handler
```

### Collection Routes (CRUD)

```
GET    /api/collections/:name      # Get collection data
POST   /api/collections/:name      # Insert item
PUT    /api/collections/:name/:id  # Update item
DELETE /api/collections/:name/:id  # Delete item
```

---

## 5. React App Modifications

### New API Client (`apps/web/src/lib/api-client.ts`)

```typescript
// Create a centralized API client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class APIClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) { /* ... */ }
  async register(data: RegisterData) { /* ... */ }
  async logout() { /* ... */ }

  // Blog methods
  async getBlogs() { /* ... */ }
  async getBlog(slug: string) { /* ... */ }
  async createBlog(data: CreateBlogData) { /* ... */ }

  // Post methods
  async getPosts(blogId: string) { /* ... */ }
  async getPost(slug: string) { /* ... */ }
  async createPost(data: CreatePostData) { /* ... */ }
  async updatePost(id: string, data: UpdatePostData) { /* ... */ }

  // ... other methods
}

export const api = new APIClient();
```

### Modified AuthContext Example

```typescript
// BEFORE (direct SDK call - INSECURE)
const result = await sdk.login(email, password);

// AFTER (API call - SECURE)
const result = await api.login(email, password);
```

---

## 6. Shared Packages

### Types Package (`packages/shared/src/types/`)

Move all type definitions to shared package:

```typescript
// packages/shared/src/types/blog.ts
export interface Blog {
  id: string;
  uid: string;
  title: string;
  slug: string;
  ownerId: string;
  description?: string;
  theme: string;
  status: 'active' | 'inactive';
  customization?: BlogCustomization;
  monetization?: BlogMonetization;
  createdAt: string;
  updatedAt?: string;
}

// ... other types
```

---

## 7. Environment Variables

### Next.js API (`.env.local` - SERVER ONLY)

```env
# GitHub SDK (NEVER expose to client)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your_username
GITHUB_REPO=your_repo
GITHUB_BRANCH=main

# SMTP (Server-side only)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_NAME=Your Blog Platform
SMTP_FROM_EMAIL=noreply@yourdomain.com

# Paystack (Secret key - server only)
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxx
PAYSTACK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# AI Services (Server-side only)
CHUTES_API_TOKEN=your_chutes_token
GEMINI_API_KEY=your_gemini_key

# Social Media (Server-side only)
FACEBOOK_ACCESS_TOKEN=your_token
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TELEGRAM_BOT_TOKEN=your_token

# JWT for session management
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d

# API Configuration
API_RATE_LIMIT=100
API_RATE_WINDOW=60000
```

### React App (`.env` - PUBLIC ONLY)

```env
# Only public, non-sensitive values
VITE_API_URL=https://api.yourdomain.com
VITE_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxx
VITE_APP_NAME=Your Blog Platform
```

---

## 8. Implementation Checklist

### Phase 1: Setup Monorepo Structure

- [ ] Initialize monorepo with npm/pnpm workspaces or Turborepo
- [ ] Create `apps/web` directory and move React app
- [ ] Create `apps/api` directory with Next.js app
- [ ] Create `packages/shared` for types
- [ ] Configure workspace dependencies

### Phase 2: Create Next.js API

- [ ] Set up Next.js with App Router
- [ ] Migrate `sdk.ts` to `github-sdk.ts` (server-side)
- [ ] Migrate `sdk-instance.ts` configuration
- [ ] Migrate `db-init.ts` database initialization
- [ ] Create all API routes (auth, blogs, posts, etc.)
- [ ] Implement JWT-based authentication
- [ ] Add rate limiting middleware
- [ ] Add input validation (Zod)
- [ ] Add error handling middleware

### Phase 3: Migrate Services

- [ ] Migrate `emailService.ts` → API routes
- [ ] Migrate `socialMediaService.ts` → API routes
- [ ] Migrate `walletService.ts` → API routes
- [ ] Migrate `ai-service.ts` → API routes
- [ ] Set up Paystack webhook handler

### Phase 4: Modify React App

- [ ] Create `api-client.ts` HTTP client
- [ ] Update `AuthContext.tsx` to use API client
- [ ] Update `BlogSubscriberAuthContext.tsx` to use API client
- [ ] Update all hooks to use API client
- [ ] Update pages/components using SDK directly
- [ ] Remove SDK files from React app
- [ ] Update environment variables

### Phase 5: Testing & Deployment

- [ ] Test all API endpoints
- [ ] Test React app with API
- [ ] Set up CORS properly
- [ ] Configure production deployment
- [ ] Set up CI/CD pipeline

---

## Summary

This monorepo restructuring ensures:

1. ✅ **All sensitive credentials** are server-side only
2. ✅ **All database operations** go through secure API
3. ✅ **All third-party API calls** are proxied through backend
4. ✅ **Proper authentication** with JWT tokens
5. ✅ **Rate limiting** and input validation
6. ✅ **Clean separation** of concerns

The React app becomes a pure UI layer that only communicates with the Next.js API, which handles all sensitive operations securely.

---

*Bismillah Ar-Rahman Ar-Raheem. La hawla wala quwwata illa billah.*
