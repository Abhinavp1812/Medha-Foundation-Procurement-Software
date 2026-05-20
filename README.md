# Medha Procurement

A procurement platform for the Medha Foundation. Admins post buying requirements
(RFQs), vendors submit quotations, and admins compare bids side-by-side and award
the best one.

Built with **Next.js 16**, **React 19**, **Prisma**, **PostgreSQL**, and
**Auth.js v5** (Credentials provider, email + password).

---

## Roles

| Role   | Can do                                                              |
| ------ | ------------------------------------------------------------------- |
| ADMIN  | Create requirements, view all quotes, compare vendors, award a bid  |
| VENDOR | Sign up, browse open requirements, submit & update quotations       |

Vendors self-register (open signup). Admins are created via the seed script.

---

## Getting started

### 1. Prerequisites

- Node.js 18.18+ (you have a recent version — good)
- A PostgreSQL database (local, or hosted e.g. Neon / Supabase / Railway)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env`:

- `DATABASE_URL` — your Postgres connection string
- `AUTH_SECRET` — generate one with `npx auth secret` (or `openssl rand -base64 32`)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` — your first admin login

### 4. Create the database tables

```bash
npx prisma db push
```

(Generates the Prisma client and pushes the schema to your database.)

### 5. Seed the admin account

```bash
npm run db:seed
```

This prints the admin email/password. **Change the password after first login**
(a "change password" screen is a good next feature to add).

### 6. Run

```bash
npm run dev
```

Open http://localhost:3000

- Landing page: `/`
- Sign in: `/signin`  → routed to `/admin` or `/vendor` by role
- Vendor signup: `/signup`

---

## How it works

- **Auth** — `src/auth.ts` configures Auth.js with a Credentials provider.
  Passwords are hashed with bcrypt. The user's role is carried in the JWT and
  exposed on the session (`session.user.role`).
- **Route protection** — `src/middleware.ts` guards `/admin/*` and `/vendor/*`
  and bounces users to the correct dashboard based on role.
- **Data** — `prisma/schema.prisma` defines `User`, `Rfq`, and `Quote`.
- **Server actions** — `src/lib/actions.ts` holds signup, RFQ creation, quote
  submission, and awarding. Validated with Zod (`src/lib/validations.ts`).

---

## Project structure

```
prisma/schema.prisma          Database schema
scripts/seed.mjs              Creates the first admin
src/auth.ts                   Auth.js config
src/middleware.ts             Role-based route guards
src/lib/prisma.ts             Prisma client singleton
src/lib/validations.ts        Zod schemas
src/lib/actions.ts            Server actions
src/app/page.tsx              Landing page
src/app/signin, /signup       Auth pages
src/app/redirect              Post-login role dispatcher
src/app/admin/*               Admin dashboard, new RFQ, comparison view
src/app/vendor/*              Vendor dashboard, RFQ detail, my quotes
src/components/*              Forms, dashboard shell, buttons
```

---

## Ideas for next steps

- File uploads for attachments (currently a URL field) via S3 / UploadThing
- Email notifications when a new RFQ is posted or a quote is awarded
- A "change password" and "forgot password" flow
- Admin ability to close an RFQ manually
- Spend analytics dashboard (like the Zoho charts) once you have real data
