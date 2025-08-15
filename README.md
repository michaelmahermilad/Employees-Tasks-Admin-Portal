# Secure TypeScript Backend with Auth (Express + Prisma + PostgreSQL)

This backend includes:
- JWT authentication (register/login)
- Employees and Tasks endpoints (protected)
- Endpoint `GET /api/employees-with-tasks` to fetch employees with task progress
- Prisma ORM with PostgreSQL
- Validation with Zod, security middleware (Helmet, CORS, rate-limit)

## Quick start

1. Copy `.env.example` to `.env` and fill the values (DATABASE_URL, JWT_SECRET).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

## Endpoints (all under /api)
- `POST /api/auth/register` { username, password }
- `POST /api/auth/login` { username, password } -> returns `{ token }`
- Protected routes require `Authorization: Bearer <token>` header:
  - `POST /api/employees`
  - `GET /api/employees/:id`
  - `GET /api/employees`
  - `GET /api/employees-with-tasks` (employees with progress)
  - `POST /api/tasks`
  - `GET /api/tasks/:id`
  - `DELETE /api/tasks/:id`
  - `GET /api/employees/:id/tasks`
  - `POST /api/tasks/:id/complete`

## Notes
- For production: rotate JWT_SECRET, use HTTPS, set NODE_ENV=production.
- Prisma uses parameterized queries, reducing SQL injection risk.
