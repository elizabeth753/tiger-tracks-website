# Tiger Tracks — Deployment Guide

## Prerequisites

- Node.js 18+ installed locally
- A Vercel account (https://vercel.com)
- A Notion integration with access to the blog database
- Git repository connected to Vercel

## Local Development

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env.local

# Start dev server
npm run dev
```

The site will be available at `http://localhost:3000`.

## Environment Variables

| Variable | Scope | Description |
|---|---|---|
| `NOTION_API_KEY` | Server | Notion integration token (secret) |
| `NOTION_DATABASE_ID` | Server | Notion database ID for blog posts |
| `NEXT_PUBLIC_FORMSPREE_ID` | Client | Formspree form ID for the contact form |
| `NEXT_PUBLIC_CALENDLY_URL` | Client | Calendly scheduling link |

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep all other variables server-only.

## Vercel Setup

### 1. Connect Repository

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New Project**.
3. Import the Git repository containing this site.
4. Vercel will auto-detect the Next.js framework.

### 2. Configure Environment Variables

1. Go to **Project Settings > Environment Variables**.
2. Add each variable from the table above.
3. Set `NOTION_API_KEY` for **Production** and **Preview** environments.
4. Set `NEXT_PUBLIC_*` variables for all environments.

### 3. Deploy

1. Push to the `main` branch (or click **Deploy** in the Vercel dashboard).
2. Vercel runs `next build` automatically.
3. Preview deployments are created for every pull request.

## Custom Domain Setup (tigertracks.ai)

1. Go to **Project Settings > Domains** in Vercel.
2. Add `tigertracks.ai`.
3. Vercel will provide DNS records — update your domain registrar:
   - **A record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com` (for `www` subdomain)
4. Add `www.tigertracks.ai` as well — the `vercel.json` redirect sends www traffic to the apex domain.
5. Vercel provisions an SSL certificate automatically.

## Build & Output

- **Framework**: Next.js (SSR/ISR on Vercel)
- **Build command**: `next build`
- **Output**: Vercel serverless functions + static assets (automatic)

## Troubleshooting

- **Build fails**: Check that all required env vars are set in the Vercel dashboard.
- **Images not loading**: Verify `images.unoptimized` is `false` in `next.config.ts`.
- **Blog not updating**: Confirm the Notion integration has access to the database and `NOTION_API_KEY` / `NOTION_DATABASE_ID` are correct.
