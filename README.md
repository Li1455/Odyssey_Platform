# Odyssey — Restaurant Operations Platform

A fullstack restaurant operations monorepo built with the exact stack specified: **pnpm workspaces + Turborepo**, **Expo + React Native Web**, **Hono on Cloudflare Workers**, **PostgreSQL + Drizzle ORM**, **drizzle-zod**, **OpenAPI generation**, **Orval-generated client hooks**, and **React Query**.

---

## Architecture

```
Drizzle schema → drizzle-zod → Hono/OpenAPI → openapi.json → Orval → generated React Query hooks → dashboard
```

```
odyssey/
├── apps/
│   └── dashboard/          # Expo + React Native Web dashboard
├── services/
│   └── backend/            # Hono + Cloudflare Workers API
├── packages/
│   ├── shared/             # Design tokens & theme
│   ├── types/              # Drizzle schemas + drizzle-zod types
│   └── api-client/         # Orval-generated hooks + Axios instance
├── turbo.json
├── pnpm-workspace.yaml
└── docker-compose.yml      # Optional Postgres setup
```

---

## Quick Start

### Prerequisites

- [pnpm](https://pnpm.io/) v9+
- [Node.js](https://nodejs.org/) v18+
- Docker (optional, for Postgres)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the backend

The backend auto-creates all database tables on first boot. No migration step needed.

By default, it uses **PGlite** (in-process PostgreSQL WASM) — no external database required.

```bash
pnpm dev:backend
# → API available at http://localhost:8787
# → OpenAPI spec at http://localhost:8787/openapi.json
```

#### Optional: Use real PostgreSQL via Docker

```bash
docker compose up -d
# Then set the environment variable:
# DATABASE_URL=postgres://odyssey:password123@localhost:5432/odyssey
```

### 3. Seed the database

```bash
pnpm --filter @odyssey/backend db:seed
```

This populates:
- 3 menu categories
- 7 menu items (one marked unavailable)
- 4 customers
- 4 orders in various pipeline stages (PENDING, PREPARING, READY, COMPLETED)
- Default operational settings

### 4. Start the dashboard

```bash
pnpm dev:dashboard
# → Dashboard at http://localhost:8081
```

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev:dashboard` | Start Expo Web dashboard |
| `pnpm dev:backend` | Start Hono backend via Wrangler |
| `pnpm gen:contract` | Generate OpenAPI spec then run Orval codegen |
| `pnpm test` | Run all tests across workspaces |
| `pnpm typecheck` | TypeScript check all packages |
| `pnpm lint` | Lint all packages |

### To regenerate the API client after backend changes:

```bash
# 1. Generate the OpenAPI spec from the backend routes
pnpm --filter @odyssey/backend gen:openapi

# 2. Run Orval to regenerate React Query hooks
pnpm gen:contract
```

---

## Dashboard Pages

| Page | URL | Description |
|---|---|---|
| **Home** | `/` | KPIs: total orders, revenue, pending, popular dishes; store open/close toggle |
| **Orders** | `/orders` | Full order pipeline with status filters, detail modal, status transitions, create order |
| **Menu** | `/menu` | Menu catalog by category, toggle availability, add/edit items and categories |
| **CRM** | `/crm` | Customer list with order count, spend ranking, and detailed profile modal |
| **Settings** | `/settings` | Prep time, auto-accept, service availability, opening hours |
| **UI Library** | `/ui-library` | Live design system: tokens, typography, spacing, all component states |

---

## Backend API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/kpis` | Dashboard metrics |
| `GET` | `/api/menu/categories` | List categories |
| `POST` | `/api/menu/categories` | Create category |
| `GET` | `/api/menu/items` | List menu items |
| `POST` | `/api/menu/items` | Create menu item |
| `PUT` | `/api/menu/items/:id` | Update menu item |
| `GET` | `/api/orders` | List orders (filterable by status, customerId) |
| `GET` | `/api/orders/:id` | Order detail with customer + line items |
| `POST` | `/api/orders` | Create order (validates availability, calculates total server-side) |
| `PUT` | `/api/orders/:id/status` | Update order status (enforces valid transitions) |
| `GET` | `/api/customers` | CRM customer list with aggregated order data |
| `GET` | `/api/settings` | Fetch restaurant settings |
| `PUT` | `/api/settings` | Update restaurant settings |
| `GET` | `/openapi.json` | Live OpenAPI specification |

### Order State Machine

```
PENDING → PREPARING → READY → COMPLETED
   ↓           ↓         ↓
CANCELLED  CANCELLED  CANCELLED
```
Only valid forward transitions are accepted. Completed orders cannot be cancelled.

---

## Architecture Decisions

### Type Safety Flow
All types originate in `packages/types/src/schema.ts` as Drizzle table definitions. `drizzle-zod` derives Zod schemas from them. Hono's `@hono/zod-openapi` uses those schemas to define and validate routes, producing an `openapi.json`. Orval reads that spec and generates fully-typed React Query hooks in `packages/api-client`. The dashboard **only imports from `@odyssey/api-client`** — no handwritten DTOs.

### Database Fallback
The backend uses PGlite (PostgreSQL WASM) when no `DATABASE_URL` is set. This means you can run the entire stack **without Docker or any external database**. Tables are auto-created on first request.

### Design System
All design tokens live in `packages/shared/src/theme.ts`. No token is hardcoded in components — everything references `theme.colors.*`, `theme.spacing.*`, etc. The UI Library page at `/ui-library` provides a live visual reference.

---

## Tradeoffs & Incomplete Areas

- **Auth**: No authentication layer — this is an internal ops tool scope
- **Pagination**: Order and customer lists are not paginated (acceptable for seed-data scale)
- **Native (iOS/Android)**: The dashboard is built for Expo Web. Layout is responsive and mobile-friendly, but native-specific polish (haptics, native navigation) was not prioritized
- **Real-time**: No WebSocket/SSE for live order updates — refresh is manual or driven by React Query's `refetchInterval`
- **Wrangler + PGlite**: PGlite in a Cloudflare Worker is limited (in-memory only, no persistence across instances). For production, a real Postgres or Cloudflare D1 would be used
