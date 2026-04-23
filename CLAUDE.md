# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 dashboard application built with the App Router, featuring authentication, PostgreSQL database, and Tailwind CSS. It's part of the Next.js Learn Course.

## Common Development Tasks

- **Development server**: `npm run dev` (uses Turbopack)
- **Build for production**: `npm run build`
- **Start production server**: `npm run start`
- **Lint code**: `npm run lint`
- **Seed database**: Run `curl http://localhost:3000/seed` or visit `/seed` in the browser while the dev server is running
- **Environment setup**: Environment variables are configured in `.env` (already populated for the course; uses Neon PostgreSQL)

## Architecture

### App Router Structure
- `app/` – All routes use the App Router
  - `app/page.tsx` – Landing page with login link
  - `app/login/` – Authentication page using NextAuth credentials provider
  - `app/dashboard/` – Protected routes requiring authentication
    - `(overview)/` – Dashboard home with revenue chart, latest invoices, and card data
    - `invoices/` – Invoice management (list, create, edit)
    - `customers/` – Customer list
  - `app/seed/route.ts` – Database seeding endpoint (creates tables and inserts sample data)

### Authentication & Middleware
- **NextAuth v5** with credentials provider (email/password)
- `auth.ts` – NextAuth configuration with PostgreSQL user lookup
- `auth.config.ts` – Authentication pages and callback configuration
- `middleware.ts` – Protects `/dashboard` routes; unauthenticated users redirected to `/login`
- Login state: Authenticated users accessing `/login` are redirected to `/dashboard`

### Data Layer
- **PostgreSQL** via `postgres` library (no ORM)
- `app/lib/data.ts` – All database queries (fetch revenue, invoices, customers, etc.)
- `app/lib/actions.ts` – Server actions for creating/updating/deleting invoices and authentication
- `app/lib/definitions.ts` – TypeScript type definitions for database entities
- Connection: Uses `POSTGRES_URL` environment variable with SSL required

### UI Components
- `app/ui/` – Reusable components (buttons, forms, tables, charts, navigation)
- **Tailwind CSS** with custom configuration (`tailwind.config.ts`)
- Custom fonts: `inter` and `lusitana` from `app/ui/fonts.ts`
- Skeleton loading states in `app/ui/skeletons.tsx`

### State & Validation
- **Zod** for form validation in server actions
- **React Server Components** for data fetching (no client‑side state management needed for dashboard data)
- **Server Actions** with progressive enhancement (forms use `useFormState`)

## Key Patterns

1. **Database queries** are directly written in SQL using tagged template literals (`sql`\`...\``).
2. **Authentication‑protected routes** rely on the middleware; no manual checks in components.
3. **Forms** use server actions with Zod validation and display field‑level errors.
4. **Loading states** are implemented via Suspense and skeleton components.
5. **Environment variables** are loaded from `.env` (already populated for the course).

## Notes
- The database schema is created automatically by the seed endpoint (uses `CREATE TABLE IF NOT EXISTS`).
- Invoice amounts are stored in cents and converted to dollars in the UI.
- The `POSTGRES_URL` must include `?ssl=require` (already configured in `.env`).