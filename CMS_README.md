# Hotel Sherpa Soul - CMS Operations & Architecture

This document outlines the CMS storage architecture, environment configuration, database schema, and migration workflows.

## Architecture Overview

1. **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`).
2. **Object Storage**: Vercel Blob (`@vercel/blob`).
3. **API Pattern**: Classic Vercel Node runtime (`export default async function handler(req, res)`).
4. **Authentication**: JWT stored in an `HttpOnly`, `SameSite=Lax` cookie verified against a bcrypt password hash.
5. **Frontend State**: `CMSContext.jsx` with server-first synchronization, serialized queue processing, optimistic UI updates, and conflict preservation.

## Environment Variables

Ensure the following environment variables are configured in your Vercel project settings:

| Variable | Purpose | Example / Notes |
|---|---|---|
| `DATABASE_URL` | Neon PostgreSQL pooled connection string. | `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require` |
| `CMS_SESSION_SECRET` | Secret key used to sign and verify admin session JWTs. | Random 64+ char high-entropy string |
| `CMS_ADMIN_PASSWORD_HASH` | Bcrypt hash of the master admin password. | Generate via `bcrypt.hashSync("your-password", 10)` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access token for asset uploads. | Automatically provisioned when linking Vercel Blob store |

## Database Setup

Execute `database/schema.sql` against your Neon PostgreSQL database before running the CMS:

```sql
\i database/schema.sql
```

## Local Development

Because the API endpoints rely on Vercel Node Serverless functions, run the local environment using:

```bash
vercel dev
```

> Do not use `npm run dev` alone to test CMS API interactions, as Vite alone does not execute `/api` serverless handlers.

## API Contracts

### `GET /api/cms`
- **Authentication**: Required (`CMS_SESSION` cookie).
- **Returns**: `{ data: object, updatedAt: string }`

### `PUT /api/cms`
- **Authentication**: Required (`CMS_SESSION` cookie).
- **Body**: `{ data: object, updatedAt: string, uploadRefs: Array<{ uploadId: string, blobUrl: string }> }`
- **Response**:
  - `200 OK`: `{ data: object, updatedAt: string }`
  - `409 Conflict`: `{ conflict: true, data: object, updatedAt: string }`

### `POST /api/cms-login`
- **Body**: `{ password: string }`
- **Response**: `200 OK` + `Set-Cookie: CMS_SESSION=...; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800`

### `POST /api/cms-logout`
- **Response**: `200 OK` + Clears `CMS_SESSION` cookie.

### `POST /api/cms-upload-token`
- Generates client-upload tokens via `@vercel/blob/client`'s `handleUpload`.

### `POST /api/cms-upload-complete`
- Validates blob parameters and transitions status from `pending` to `ready`.

## Data Migration

Run the migration script to transfer legacy JSON data into Neon and Vercel Blob:

```bash
# 1. Dry run (default, zero side effects)
node scripts/migrate_cms_to_db.cjs --input ./cms-data/cms-backup.json

# 2. Apply migration (creates backup, uploads assets, updates DB)
node scripts/migrate_cms_to_db.cjs --input ./cms-data/cms-backup.json --apply
```
