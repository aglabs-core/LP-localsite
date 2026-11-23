# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm 10.34.9 (`packageManager` in `package.json`)
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

The LocalSite landing page lives in `artifacts/ag-labs` and has its own npm lockfile.
The GitHub workflow verifies this package and the full workspace on pull requests and pushes to `main`.
To reproduce the landing-page check with Node.js 24:

```sh
cd artifacts/ag-labs
npm ci
npm exec --no -- tsc --noEmit
npm run build
```

The build generates `dist/index.html` and `dist/portfolio/index.html`.

### Workspace setup

Use Node.js 24 and pnpm 10.34.9. The workspace lockfile is independent from the
landing page's npm lockfile; keep both in sync when changing its dependencies.
The prototype sandbox shares the Vite 6 / React plugin 4 / Node types 22 toolchain
with the published landing page so plugins resolve the same Vite types.

```sh
npm install --global pnpm@10.34.9
pnpm install --frozen-lockfile
PORT=5174 BASE_PATH=/ pnpm run build
```

`PORT` and `BASE_PATH` configure the prototype sandbox build; this command does not
start its server or connect to a database. The root build checks types in all
packages (including the landing page), then compiles the landing page, sandbox and
API server. It does not push schemas or start the API. Cloudflare still deploys
`artifacts/ag-labs` using its own npm lockfile.

### Workspace commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
