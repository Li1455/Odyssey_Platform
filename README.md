Odyssey Restaurant Operations
A full-stack monorepo application for real-time restaurant operations management, built with a Cloudflare Workers backend and an Expo (React Native / Web) dashboard.

Architecture & Monorepo Structure
This project uses pnpm workspaces and Turborepo to manage services and applications:

Plaintext
Odyssey_assignment/
├── apps/
│   └── dashboard/         # Expo Router frontend (React Native / Web)
├── services/
│   └── backend/           # Cloudflare Workers API (Hono + Zod-OpenAPI)
├── package.json
└── turbo.json
Tech Stack
Frontend: Expo SDK, Expo Router, React Native for Web, TanStack Query, TypeScript

Backend: Cloudflare Workers, Hono, Zod-OpenAPI

Tooling & Monorepo: Turborepo, pnpm workspaces, Vitest, Orval

Getting Started
Prerequisites
Ensure you have the following installed on your system:

Node.js (v18 or higher recommended)

pnpm (npm install -g pnpm)

Installation
Clone the repository and install dependencies across the monorepo:

Bash
pnpm install
Running the Application Locally
To test and run the full stack locally, you need to run both the backend service and the frontend dashboard concurrently in separate terminal windows.

1. Start the Backend Service
Start the local Cloudflare Worker via Wrangler:

Bash
pnpm dev:backend
The API will be available at [http://127.0.0.1:8787](http://127.0.0.1:8787).

2. Start the Frontend Dashboard
Start the Expo web dashboard:

Bash
pnpm dev:dashboard
Press w in your terminal or open http://localhost:8081 in your browser.

Testing & Validation
Run Automated Tests:

Bash
pnpm test
Run Backend Tests:

Bash
pnpm --filter backend test
Generate API Contracts & Clients:

Bash
pnpm gen:contract
