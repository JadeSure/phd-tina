# phd-tina

Personal research portal for **Tina Wang**, PhD candidate at the University of
Technology Sydney — researching AI governance, public sector innovation, and
real-world AI deployment.

Minimalist, text-first, academic design modelled on
[barryli.phd](https://barryli.phd): a left sidebar (brand, navigation, recent
posts, bio) divided from a single-column reading area, geometric sans
typography, and a single restrained green accent.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **MDX** content via `@next/mdx` — blog posts are local files, no CMS
- **Poppins** via `next/font`

## Getting started

Requires **Node 22** (see `.nvmrc`).

```bash
nvm use 22
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the build
npm run lint     # eslint
```

## Project structure

```
content/            # editable content (no code changes needed to publish)
  site.ts           # site name, tagline, nav, bio, social links
  publications.ts   # publication list
  posts/*.mdx       # blog posts (frontmatter + body)
src/
  app/              # routes: / (Research), /about, /publications, /blog, /contact
  components/       # Sidebar, PostList
  lib/posts.ts      # reads + parses MDX posts
docs/
  style.md          # design system (source of truth)
  tech.md           # engineering reference
```

## Adding content

- **New post** → add `content/posts/<slug>.mdx` with frontmatter; URL is `/blog/<slug>`.
- **Publication** → add an entry to `content/publications.ts`.
- **Bio / nav / social links** → edit `content/site.ts`.

## Deploy

Recommended: **Vercel** (auto-detects Next.js; set Node version to 22). Any
Node host works via `npm run build && npm run start`.

See `docs/tech.md` for full details.
