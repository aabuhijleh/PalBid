# PalBid

A streamlined bidding platform connecting buyers and sellers in Palestine, enabling transparent and efficient transactions.

## Prerequisites

- Node.js >= 18
- [pnpm](https://pnpm.io) >= 8

## Project Structure

This is a monorepo built with [Turborepo](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces) containing the following apps and packages:

### Apps

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: a [Hono](https://hono.dev/) server with a [PostgreSQL](https://www.postgresql.org/) database and [Prisma](https://www.prisma.io/) as the ORM

### Packages

- `@repo/eslint-config`: [ESLint](https://eslint.org/) configurations
- `@repo/typescript-config`: Shared `tsconfig.json`s used throughout the monorepo

## Getting Started

1. Install dependencies:

   ```sh
    pnpm install
   ```

2. Set up environment variables:

   ```sh
    # In apps/web
    cp .env.example .env

    # In apps/api
    cp .env.example .env
   ```

3. Set up the database:

   ```sh
    # Run migrations
    # You may need to cd to `apps/api` first
    pnpm db:migrate:dev

    # Push database changes
    pnpm db:push

    # Seed the database (optional)
    pnpm db:seed
   ```

4. Start the development server:

   ```sh
    pnpm dev
   ```

## Useful Commands

```sh
pnpm build      # Build all apps and packages for production
pnpm dev        # Start all apps in development mode
pnpm lint       # Lint all apps and packages
pnpm format     # Format all apps and packages
pnpm typecheck  # Run type checking
```
