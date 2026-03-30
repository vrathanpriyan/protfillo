# Portfolio — Next.js + Supabase

Industry-level developer portfolio built with Next.js 15 App Router, TypeScript, Tailwind CSS, and Supabase.

## Stack

- **Framework**: Next.js 15 (App Router, ISR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + RLS)
- **Forms**: React Hook Form
- **Notifications**: Sonner

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Tables

| Table | Description |
|-------|-------------|
| `profile` | Personal info, bio, social links |
| `projects` | Portfolio projects with tech stack |
| `skills` | Skills grouped by category with proficiency |
| `experiences` | Work history timeline |
| `contact_messages` | Contact form submissions |

## Customization

Update your data directly in the Supabase dashboard at [supabase.com](https://supabase.com) — the site uses ISR and revalidates every hour.

## Deploy

```bash
# Vercel (recommended)
vercel deploy
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in your deployment environment.
