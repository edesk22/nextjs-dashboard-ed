# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js App Router course starter project—a dashboard application with invoice and customer management features. The app uses PostgreSQL for data persistence and is built with a modern TypeScript/React stack.

## Commands

```bash
npm run dev          # Start dev server with Turbopack (runs on localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests (if configured)
```

## Architecture

### Key Tech Stack
- **Framework**: Next.js (latest) with App Router
- **Language**: TypeScript 5.7.3
- **Database**: PostgreSQL (via `postgres` npm package)
- **Styling**: Tailwind CSS 3.4.17 with @tailwindcss/forms
- **UI Icons**: @heroicons/react
- **Auth**: next-auth 5.0.0-beta (installed but not yet configured)
- **Validation**: Zod
- **Utilities**: clsx, use-debounce

### Directory Structure

```
app/
├── lib/
│   ├── definitions.ts      # Type definitions (User, Customer, Invoice, Revenue, etc.)
│   ├── data.ts             # Database queries and data fetching functions
│   ├── utils.ts            # Utility functions (e.g., formatCurrency)
│   └── placeholder-data.ts # Mock data for seeding/development
├── ui/
│   ├── global.css          # Global styles
│   ├── fonts.ts            # Font setup (Inter via next/font)
│   ├── button.tsx          # Reusable button component
│   ├── search.tsx          # Search input component
│   ├── skeletons.tsx       # Loading skeleton components
│   ├── login-form.tsx      # Login form UI
│   ├── acme-logo.tsx       # Logo component
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── nav-links.tsx   # Navigation links with active states
│   │   ├── sidenav.tsx     # Sidebar navigation wrapper
│   │   ├── cards.tsx       # Dashboard summary cards
│   │   ├── revenue-chart.tsx # Revenue chart visualization
│   │   └── latest-invoices.tsx # Latest invoices list
│   ├── invoices/           # Invoice page components
│   │   ├── table.tsx       # Invoices data table
│   │   ├── create-form.tsx # Create invoice form
│   │   ├── edit-form.tsx   # Edit invoice form
│   │   ├── buttons.tsx     # Action buttons (edit, delete, create)
│   │   ├── status.tsx      # Invoice status badge
│   │   ├── pagination.tsx  # Pagination controls
│   │   └── breadcrumbs.tsx # Breadcrumb navigation
│   └── customers/          # Customer page components
│       └── table.tsx       # Customers data table
├── dashboard/              # Dashboard layout and pages
│   ├── layout.tsx          # Dashboard wrapper layout
│   ├── page.tsx            # Dashboard home page
│   ├── invoices/
│   │   └── page.tsx        # Invoices page with search and pagination
│   ├── invoices/[id]/edit/
│   │   └── page.tsx        # Edit invoice page (dynamic route)
│   └── customers/
│       └── page.tsx        # Customers page with search
├── layout.tsx              # Root layout (HTML setup)
├── page.tsx                # Home page
├── seed/                   # Database seeding route
│   └── route.ts            # Seed endpoint
└── query/                  # Database query testing route
    └── route.ts            # Query endpoint
```

### Data Layer

**Database Connection**: `app/lib/data.ts` uses the `postgres` package to connect to PostgreSQL via `process.env.POSTGRES_URL`. SSL is required (`ssl: 'require'`).

**Data Fetching Pattern**: Server-side functions fetch from the database and are used directly in Server Components. Query functions include:
- `fetchRevenue()` - Monthly revenue totals
- `fetchLatestInvoices()` - 5 most recent invoices with customer details
- `fetchCardData()` - Summary stats (invoice count, customer count, paid/pending totals)
- `fetchFilteredInvoices()` - Paginated invoice search
- `fetchInvoicesPages()` - Total pages for invoice pagination
- `fetchInvoiceById()` - Single invoice for editing
- `fetchCustomers()` - All customers (for form selects)
- `fetchFilteredCustomers()` - Paginated customer search

**Type Definitions**: All major types are in `app/lib/definitions.ts` (User, Customer, Invoice, Revenue, InvoicesTable, CustomersTableType, etc.). Raw DB types are distinct from formatted types (e.g., `LatestInvoiceRaw` vs `LatestInvoice`).

### UI Components

- **Reusable**: button.tsx, search.tsx, skeletons.tsx are used across multiple pages
- **Page-specific**: Components in `invoices/` and `customers/` subdirectories are specific to those features
- **Dashboard cards**: Summary cards and charts on the main dashboard
- **Forms**: Create and edit forms with form validation (uses Zod)
- **Pagination**: Handled in both URL (searchParams) and UI components

### Styling

- **Tailwind Config**: Extended with custom grid columns (`grid-13`), custom blue shades, and shimmer animation keyframes
- **Global CSS**: Font imports and base styles in `app/ui/global.css`
- **Fonts**: Inter font from next/font/google imported in `app/ui/fonts.ts`
- **Dark Mode**: Not currently configured; available via Tailwind if needed

### Environment Variables

Required:
- `POSTGRES_URL` - PostgreSQL connection string with SSL

## Development Notes

- **Seed Data**: The `app/seed/route.ts` endpoint can populate the database with initial data
- **Placeholder Data**: `app/lib/placeholder-data.ts` contains mock data structures
- **Formatting**: Currency and date formatting utilities are in `app/lib/utils.ts`
- **Authentication**: next-auth is installed but not yet configured. Auth setup will likely go in `auth.config.ts` or `auth.ts` at the root
- **Forms**: Create/edit forms use React's form handling; validation will use Zod

## Path Aliases

The project uses `@/*` alias pointing to the root directory (configured in tsconfig.json), allowing clean imports like `import { Button } from '@/app/ui/button'`.
