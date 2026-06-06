# Tech Documentation — PhD Researcher Portal

Engineering reference for the site. Pairs with [`style.md`](./style.md), which is the source of truth for visual/editorial design. This doc covers stack, structure, content model, and how to run/build/deploy.

---

## 1. Stack

| Concern | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Runtime | React | 19.x |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | 4.x |
| Content | MDX via `@next/mdx`, files on disk | — |
| Frontmatter | `gray-matter` | — |
| Markdown plugins | `remark-gfm`, `rehype-slug`, `rehype-autolink-headings` | — |
| Read time | `reading-time` | — |
| Lint | ESLint 9 (flat config, `eslint-config-next`) | 9.x |
| Node | **v22 LTS required** (build tooling rejects older) | ≥ 20.9, use 22 |
| Package manager | npm | — |
| Hosting (recommended) | Vercel (static + RSC); any Node host works | — |

**Why this stack**: matches `style.md`'s "text-first, low-chrome" goal. Content is local MDX (git-versioned, no CMS, no DB), so writing a post = adding a file and opening a PR. Tailwind v4 design tokens map 1:1 to the style guide's CSS variables.

> **Node note**: This machine's default `node` (`/usr/local/bin/node`) is v20.2.0, which Next 16 tooling rejects. Use Node 22 (e.g. `nvm use 22`). If the shell's nvm lazy-loader misbehaves, invoke the binary directly: `~/.nvm/versions/node/v22.x/bin/node`.

---

## 2. Project Structure

```
phd/
├── docs/
│   ├── style.md            # Design source of truth
│   └── tech.md             # This file
├── content/                # ← all editable content lives here (MDX + data)
│   ├── posts/              # blog posts: one .mdx per post (frontmatter + body)
│   ├── publications.ts     # structured publication list (or .json)
│   └── site.ts             # site-wide config: name, tagline, nav, social links
├── public/                 # static assets (images, favicon, og image)
├── src/
│   ├── app/                # App Router routes
│   │   ├── layout.tsx      # root layout: <html lang="en">, fonts, header/sidebar/footer shell
│   │   ├── globals.css     # Tailwind import + @theme design tokens (see style.md §11)
│   │   ├── page.tsx        # Home = Research landing
│   │   ├── about/page.tsx
│   │   ├── publications/page.tsx
│   │   ├── contact/page.tsx
│   │   └── blog/
│   │       ├── page.tsx             # post list (paginated)
│   │       ├── page/[n]/page.tsx    # pagination (optional)
│   │       └── [slug]/page.tsx      # single post (renders MDX)
│   ├── components/         # Header, Nav, Sidebar, Footer, PostList, PostMeta, Prose…
│   └── lib/
│       ├── posts.ts        # read/parse MDX from content/posts (frontmatter, sorting, slugs)
│       └── mdx.ts          # MDX compile options (remark/rehype plugins)
├── mdx-components.tsx       # global MDX → styled element mapping (required by @next/mdx)
├── next.config.ts          # withMDX wrapper, pageExtensions includes md/mdx
├── postcss.config.mjs      # @tailwindcss/postcss
├── eslint.config.mjs
├── tsconfig.json           # paths: @/* → ./src/*
└── package.json
```

**Convention**: anything Tina edits regularly (posts, publications, bio, nav, social links) lives under `content/`. Code under `src/` should rarely change to publish.

---

## 3. Design Tokens (Tailwind v4)

Tailwind v4 is CSS-first: tokens live in `globals.css` under `@theme`, no `tailwind.config.js`. The values come straight from `style.md §11`.

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Neutrals */
  --color-bg:          #ffffff;
  --color-bg-subtle:   #f7f7f5;
  --color-text:        #1a1a1a;
  --color-text-muted:  #6b6b6b;
  --color-border:      #e6e6e6;

  /* Accent (locked: deep green) */
  --color-link:        #1f6f54;
  --color-link-hover:  #14503c;
  --color-accent-soft: #e8f0ec;

  /* Type (locked: serif) */
  --font-body:    Georgia, "Times New Roman", serif;
  --font-heading: Georgia, "Iowan Old Style", serif;

  /* Scale */
  --measure:       680px;   /* reading width */
  --container-max: 1080px;  /* outer container */
}
```

`@theme` keys become utilities automatically (e.g. `--color-link` → `text-link`, `bg-link`). Reading width and container max are applied as `max-w-[var(--measure)]` / `max-w-[var(--container-max)]` on the relevant wrappers. Base body size 18px / line-height 1.7 is set globally on `body`.

> v1 ships **light only**. The `prefers-color-scheme: dark` block from the default scaffold is removed; a dark theme can be layered later by overriding neutrals.

---

## 4. Content Model

### 4.1 Blog post (`content/posts/<slug>.mdx`)

```mdx
---
title: "Are productivity tools built for human–AI collaboration?"
date: "2026-05-25"
excerpt: "A short one-line summary used in lists and meta description."
tags: ["ai", "productivity"]
draft: false
---

Lead paragraph that states the point.

## A section

Body text, lists, tables — all GFM supported.

---

*Tina is a PhD candidate at … researching …*
```

- **Filename = slug** → URL `/blog/<slug>`.
- Frontmatter is parsed by `gray-matter`; `draft: true` hides a post from production lists.
- `reading-time` computes an estimate from the body for the post meta line.
- `date` is ISO `YYYY-MM-DD`; lists sort by it, newest first.

### 4.2 Publications (`content/publications.ts`)

```ts
export type Publication = {
  authors: string;     // "Tina A., Co B."
  title: string;
  venue: string;       // journal / conference
  year: number;
  url?: string;        // DOI or PDF
  type: "journal" | "conference" | "preprint";
};
export const publications: Publication[] = [ /* … */ ];
```

Rendered grouped by year (or type) on `/publications`, citation-style, no cards.

### 4.3 Site config (`content/site.ts`)

```ts
export const site = {
  name: "Tina · PhD Researcher",
  tagline: "Research on …",
  url: "https://example.com",
  nav: [
    { label: "Research", href: "/" },
    { label: "About", href: "/about" },
    { label: "Publications", href: "/publications" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  social: {
    email: "tina@example.com",
    orcid: "https://orcid.org/…",
    scholar: "https://scholar.google.com/…",
    linkedin: "https://linkedin.com/in/…",
    github: "https://github.com/…",
  },
};
```

Header, nav, sidebar bio, footer, and contact links all read from this one file.

---

## 5. MDX Pipeline

- `next.config.ts` wraps the app with `@next/mdx` and sets `pageExtensions` to include `md`/`mdx`.
- Remark/rehype plugins configured centrally:
  - `remark-gfm` — tables, strikethrough, task lists (needed for the comparison tables in `style.md §4`).
  - `rehype-slug` — heading IDs.
  - `rehype-autolink-headings` — anchor links on headings.
- `mdx-components.tsx` (repo root, required by `@next/mdx`) maps MDX elements to styled components so prose matches `style.md` (serif body, H2 sections, hairline `hr`, muted meta). This is where the "Prose" styling is centralized rather than relying on a plugin.

Posts are read at build time via `src/lib/posts.ts` (filesystem read + `gray-matter`), enabling `generateStaticParams` for `/blog/[slug]` so every post is statically generated.

---

## 6. Routing & Rendering

| Route | File | Rendering |
|---|---|---|
| `/` | `app/page.tsx` | Static (Research landing) |
| `/about` | `app/about/page.tsx` | Static |
| `/publications` | `app/publications/page.tsx` | Static (from data file) |
| `/blog` | `app/blog/page.tsx` | Static list (newest first, drafts excluded in prod) |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Static via `generateStaticParams` |
| `/contact` | `app/contact/page.tsx` | Static |

All pages are server components and statically rendered — no client JS needed for the core reading experience, consistent with the "low-chrome, text-first" goal. Per-page `metadata` (title, description, OpenGraph) is exported for SEO; a root `sitemap.ts` and `robots.ts` can be added under `app/`.

---

## 7. Layout Shell

`app/layout.tsx` renders the persistent frame from `style.md §5`:

```
<html lang="en">
  <body>
    <SkipLink />
    <Header />          {/* brand + tagline + Nav */}
    <div container>
      <main id="content">{children}</main>   {/* max-w 680px */}
      <Sidebar />        {/* recent posts + bio (+ selected pubs) */}
    </div>
    <Footer />
  </body>
</html>
```

- Desktop: `main` + `Sidebar` side by side within the ~1080px container. Mobile (<860px): sidebar drops below `main`.
- `Sidebar` recent-posts widget pulls the latest 5 from `lib/posts.ts`.

---

## 8. Commands

Run with Node 22. (If `node` resolves to v20 on this machine, prefix PATH with the v22 bin or use `nvm use 22`.)

```bash
npm run dev      # local dev server  → http://localhost:3000
npm run build    # production build (static export of pages where possible)
npm run start    # serve the production build
npm run lint     # eslint (flat config)
```

Type-check without emitting: `npx tsc --noEmit`.

---

## 9. Deployment

- **Recommended**: Vercel. Connect the repo; framework auto-detected as Next.js. Set the project Node version to 22 in Vercel settings. No env vars required for the static content model.
- **Any Node host**: `npm run build` then `npm run start` behind a reverse proxy. Node ≥ 20.9 (22 recommended).
- **Static-only host** (Netlify/Cloudflare Pages/S3): the site is content-static; if no server features are added it can be exported. Keep an eye on `@next/mdx` + image usage if you go fully static.

---

## 10. Adding Content (Tina's workflow)

1. **New blog post** → create `content/posts/my-title.mdx`, fill frontmatter, write body, set `draft: false`, commit/PR. URL is `/blog/my-title`.
2. **New publication** → add an entry to `content/publications.ts`.
3. **Edit bio / nav / social links** → edit `content/site.ts`.
4. **Edit a static page** (Research/About/Contact) → edit the corresponding `app/*/page.tsx` (or convert it to MDX if Tina prefers writing those in Markdown too).

No design/code changes are needed to publish — only `content/` edits.

---

## 11. Conventions & Guardrails

- **Design changes go through `style.md` first**, then tokens in `globals.css`. Don't hardcode hex values in components — use the `@theme` tokens.
- Keep components server-rendered unless interactivity is genuinely needed (`"use client"` only where required).
- One spelling convention site-wide (British or American) — pick one in `style.md §9`.
- Accessibility: keep the skip link, visible focus states, ≥4.5:1 contrast, and the reading-width cap (`style.md §10`).
- Images go in `public/`; use `next/image` with explicit dimensions.

---

## 12. Open Items (to confirm with Tina)

- Final site name, tagline, and real social/ORCID/Scholar handles.
- Whether static pages (Research/About/Contact) are authored as TSX or MDX.
- Spelling convention (British vs. American).
- Whether to add categories/tags archive pages now or later.
- Optional: self-hosted serif font (via `next/font`) to replace the Georgia stack.
- Optional: contact form (vs. mailto/links) and which provider.
```
