# Odyssey Fullstack Restaurant Operations Platform

Build a fullstack restaurant operations product with a monorepo setup. The platform comprises a Hono-based backend running on Cloudflare Workers, a Postgres DB managed via Drizzle, an OpenAPI specification that is compiled to a React Query client with Orval, and an Expo + React Native Web dashboard.

## User Review Required

> [!IMPORTANT]
> **Database Configuration & Setup**
> Since PostgreSQL is not currently installed or running on your local machine, we will include two database configuration paths:
> 1. **Primary (Postgres)**: A standard setup that connects to a Postgres instance. We will provide a `docker-compose.yml` so you can start a local Postgres database with one command (`docker compose up -d`).
> 2. **Fallback / Local SQLite**: To ensure you can test the application easily *without* running Docker/Postgres, we can write the database connection layer in `services/backend` to fall back to a local SQLite database file (`services/backend/odyssey.db`) if no `DATABASE_URL` is set in the environment. This ensures immediate local reviewability while maintaining the Postgres schemas.
> Please review this fallback path and let us know if you approve.

## Open Questions

> [!NOTE]
> **React Native Web and UI Styling**
> The design system should work across both mobile (React Native) and Web.
> - We will use standard React Native components (`View`, `Text`, `TouchableOpacity`, `StyleSheet`) styled using design tokens.
> - This satisfies React Native + Web cross-compatibility and avoids TailwindCSS dependency unless desired.
> - We will implement a dedicated UI library page showing all components, states (hover, focus, disabled, active), spacing, and color tokens.

---

## Proposed Changes

We will build a monorepo structured as follows:

```text
odyssey/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── docker-compose.yml
├── apps/
│   └── dashboard/
│       ├── package.json
│       ├── app.json
│       ├── metro.config.js
│       ├── app/                     # Expo Router screens
│       │   ├── _layout.tsx
│       │   ├── index.tsx            # Home
│       │   ├── orders.tsx           # Orders
│       │   ├── crm.tsx              # CRM / Customers
│       │   ├── menu.tsx             # Menu
│       │   ├── settings.tsx         # Settings
│       │   └── ui-library.tsx       # Design System presentation
│       └── src/
│           ├── components/          # Reusable UI primitives
│           └── providers/           # Query client & themes
├── services/
│   └── backend/
│       ├── package.json
│       ├── wrangler.toml
│       ├── src/
│       │   ├── index.ts             # Hono app & OpenAPI definition
│       │   ├── db/
│       │   │   ├── schema.ts        # Database schemas
│       │   │   └── client.ts        # Database connection & Fallback
│       │   └── seed.ts              # Seeding script
│       └── tests/                   # Backend API test suite
├── packages/
│   ├── shared/                      # Global theme and utilities
│   │   ├── package.json
│   │   └── src/
│   │       ├── theme.ts
│   │       └── index.ts
│   ├── types/                       # Shared type system / schemas
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       └── dto.ts
│   └── api-client/                  # Generated Orval client & hooks
│       ├── package.json
│       ├── orval.config.js
│       └── src/
│           └── index.ts
```

---

### Component Specifications

### 1. Root Configuration
We will set up `pnpm-workspace.yaml` and `turbo.json` to manage dependencies and build targets across all packages.

### 2. `packages/types` & `packages/shared`
- **Drizzle Schema**: We will define tables for `categories`, `menu_items`, `customers`, `orders`, `order_items`, and `settings` using `drizzle-orm/pg-core` (and SQLite mappings if the fallback is active).
- **Zod validation**: Generate schemas using `drizzle-zod` for inserting/selecting database records, and construct unified business logic types.
- **Design Tokens**: Centralized token file in `packages/shared/src/theme.ts` exporting:
  - Palette: Dark & Light themes (e.g. Slate, Emerald, Coral, Indigo)
  - Typography: Size, weight, and line-height scales
  - Spacing Scale: Base-4 scale (4px, 8px, 12px, 16px, 20px, 24px, 32px, etc.)
  - Radii, shadows, and status states (Success, Warning, Info, Error, Loading)

### 3. `services/backend`
- Built using **Hono** running on Cloudflare Workers.
- Uses `@hono/zod-openapi` to declare endpoints and validate payloads.
- Generates `openapi.json` automatically on startup or build.
- **Drizzle integration**: Writes and reads data from the database. Totals, prices, and availability are validated server-side.
- Endpoints:
  - `GET /api/kpis` (Home statistics)
  - `GET /api/menu`, `POST /api/menu`, `PUT /api/menu/:id`
  - `GET /api/orders`, `POST /api/orders`, `PUT /api/orders/:id/status` (checks valid state transitions: PENDING -> PREPARING -> READY -> COMPLETED)
  - `GET /api/customers`
  - `GET /api/settings`, `PUT /api/settings`

### 4. `packages/api-client`
- Runs **Orval** reading from `services/backend/openapi.json`.
- Outputs generated React Query hooks and type definitions.
- Generates types like `MenuItem`, `Order`, `Customer`, etc.

### 5. `apps/dashboard`
- **Expo Web** dashboard built using React Native + Expo Router.
- Uses Metro config adapted for a Turborepo to resolve symlinked monorepo packages.
- Custom primitives built using standard components styled with our design tokens, including:
  - Button (variants: primary, secondary, danger, outline; states: hover, focus, disabled, active)
  - Input, Dropdown select
  - Table (with sorting and columns), Card
  - Modals / Drawers for create/edit menu item and order details
  - Skeleton loaders and Toast feedback banner

---

## Verification Plan

### Automated Tests
- We will include backend routing and business logic tests using `vitest` under `services/backend`.
- Test commands:
  - `pnpm --filter backend test`
  - `pnpm typecheck`

### Manual Verification
- We will spin up the backend (`pnpm dev:backend`) and the dashboard (`pnpm dev:dashboard`).
- Open `http://localhost:8081` (Expo Web) and verify:
  1. **UI Library Screen**: Verify interactive states, tokens, typography, and primitives.
  2. **Orders Screen**: View orders, filter by status, open an order detail modal, and advance its status.
  3. **Menu Screen**: View items, change availability, and use a drawer/modal to edit prices or add items.
  4. **CRM Screen**: View customer list, see total spend and order counts, and inspect a customer's specific order history.
  5. **Home Screen**: Verify that live KPIs update when orders are added or changed.
