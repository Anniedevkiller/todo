<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.MD — System Governance & Operational Protocol

## 1. Project Overview & Architecture

### Stack
- **Framework**: Next.js (latest, App Router)
- **Language**: TypeScript (Strict Mode, no `any`)
- **Styling**: Tailwind CSS
- **Linting & Formatting**: ESLint
- **Testing**: Vitest + React Testing Library

### Directory Structure & Conventions
```
src/
├── app/
│   ├── layout.tsx         # Root Server Component shell + metadata
│   ├── page.tsx           # Server Component entry point
│   └── globals.css        # Tailwind & root styles
├── components/            # UI components (Client components clearly marked)
│   ├── TodoApp.tsx        # Main interactive client wrapper
│   ├── TodoInput.tsx      # Task creation input
│   ├── TodoList.tsx       # List renderer
│   ├── TodoItem.tsx       # Single item with inline edit & toggle
│   └── TodoFilter.tsx     # Filter tabs & clear completed
├── hooks/
│   └── useTodos.ts        # Custom hook managing state & storage persistence
├── lib/
│   ├── storage.ts         # Storage adapter interface + LocalStorage implementation
│   └── types.ts           # Shared TypeScript interfaces & types
└── reducers/
    └── todoReducer.ts     # Pure typed reducer for todo actions
```

### Component Boundaries
- **Server Components**: Shell (`app/layout.tsx`, `app/page.tsx`). Responsible for metadata, semantic layout tags, and structural setup.
- **Client Components**: Interactive elements (`'use client'`). `TodoApp` and child components handle user input, state transitions, and DOM events.

### State Management
- **Reducer (`todoReducer.ts`)**: Pure state machine handling actions (`ADD`, `EDIT`, `TOGGLE`, `DELETE`, `TOGGLE_ALL`, `CLEAR_COMPLETED`, `SET_TODOS`).
- **Hook (`useTodos.ts`)**: Wraps `useReducer` and synchronizes state with `StorageAdapter`. Ensures hydration safety (loads from `localStorage` after mount to prevent SSR mismatch).

### Storage Adapter Boundary
- Interface `StorageAdapter`:
  ```ts
  export interface StorageAdapter {
    getItem<T>(key: string): T | null;
    setItem<T>(key: string, value: T): void;
    removeItem(key: string): void;
  }
  ```
- `localStorageAdapter`: Implementation of `StorageAdapter` wrapping `window.localStorage` with safety checks. Swappable for API/DB adapter without breaking application logic.

---

## 2. Coding Standards

- **TypeScript Strictness**: Strict mode enabled. Zero `any` types permitted. Explicit return types for functions and hooks.
- **Pure Functions**: Business logic, reducers, and helper functions must be side-effect-free and fully deterministic.
- **Component Design**: Small, single-responsibility components with strict prop interface definitions.
- **Naming Conventions**:
  - Components: `PascalCase.tsx` (e.g., `TodoItem.tsx`)
  - Hooks: `camelCase.ts` with `use` prefix (e.g., `useTodos.ts`)
  - Utilities / Reducers: `camelCase.ts` (e.g., `todoReducer.ts`, `storage.ts`)
  - Types: `PascalCase` interface/type names (e.g., `Todo`, `FilterStatus`)

---

## 3. Workflow Rules

1. **Plan Before Coding**: Outline tasks and obtain approval where necessary.
2. **One Task per Commit**: Each commit must represent a single logical unit of work.
3. **Conventional Commits**: Commit messages must adhere to `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`.
4. **Pre-Declaration Gate**: Before marking any task DONE, execute and pass:
   - Typecheck (`tsc --noEmit`)
   - Lint (`npm run lint`)
   - Unit/Integration Tests (`npm run test`)
   - Production Build (`npm run build`)
5. **Branching & Push Safety**: Never push to `main` without explicit user go-ahead.
6. **Dependencies**: Never add third-party NPM packages without prior user permission.

---

## 4. Definition of Done (DoD) per Task

A task is considered complete ONLY when:
1. Code meets all TS strict and design guidelines.
2. Unit or integration tests cover new/updated functionality.
3. Typecheck, lint, test suite, and `next build` pass with 0 errors.
4. Conventional commit made.
5. Task status in `agents.md` checklist updated to `[x]`.

---

## 5. Living Task Checklist

### Phase 1: Governance & Planning
- [x] Create `agents.md` defining architecture, coding standards, DoD, and checklist.

### Phase 2: Project Setup & Core Implementation
- [x] Task 2.1: Scaffold Next.js project with App Router, TS strict, Tailwind CSS, ESLint, Vitest, RTL.
- [x] Task 2.2: Define core domain types and Storage Adapter interface (`src/lib/types.ts`, `src/lib/storage.ts`).
- [x] Task 2.3: Implement pure `todoReducer` and comprehensive unit tests.
- [x] Task 2.4: Implement `useTodos` custom hook with SSR hydration safety & localStorage persistence.
- [x] Task 2.5: Build accessible, responsive UI components (`TodoInput`, `TodoList`, `TodoItem`, `TodoFilter`).
- [x] Task 2.6: Assemble `TodoApp` client root & layout server component with metadata.

### Phase 3: Testing & Quality Gate
- [x] Task 3.1: Add full integration tests for UI flows (add, inline edit, toggle, delete, filter, keyboard navigation).
- [x] Task 3.2: Run complete quality gate (typecheck, lint, tests, build) and resolve warnings/gaps.

### Phase 4: Version Control & Deployment
- [x] Task 4.1: Git setup, clean commit history, and GitHub remote push.
- [x] Task 4.2: Deploy to Vercel and verify live production deployment URL.
