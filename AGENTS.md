# Agent Development Guide

## Setup & Commands

```bash
npm install                  # Install dependencies
npm run dev                  # Dev server (http://localhost:8080)
npm run build                # Production build
npm run lint                 # Run ESLint
```

No test framework currently configured.

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Radix UI + Tailwind CSS
- **Routing**: React Router v6
- **State**: TanStack Query (React Query), Context API (Auth)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS with custom theme support

## Architecture

- `src/pages/`: Page components (route endpoints)
- `src/components/`: Reusable UI components
- `src/contexts/`: Auth and state management contexts
- `src/hooks/`: Custom React hooks
- `src/services/`: API/business logic
- `src/lib/`: Utilities and configurations
- `src/types/`: TypeScript type definitions
- Path alias `@/` maps to `src/`

## Code Style

- Use TypeScript with relaxed strictness (no implicit any checks)
- Functional components with hooks
- shadcn/ui component patterns for UI
- Tailwind utility classes for styling
- ESLint configured with React hooks rules
