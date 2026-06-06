# PhD Researcher Portal — Design Style Guide

> **Site**: Tina · PhD Researcher Portal (working title)
> **Reference**: https://barryli.phd/ (minimalist academic WordPress.com site)
> **Purpose**: A single, authoritative description of the visual + editorial design language for this site, so every page stays consistent as the site grows.
> **Status**: Verified against a screenshot of the live barryli.phd. Decisions locked for this build: **deep-green accent (links only)**, **geometric sans-serif typography (Poppins)**, **left sidebar with a vertical hairline divider**, **English (en) throughout**, **local MDX content**.
>
> **Correction note**: An earlier draft of this doc guessed *serif body* and a *right* sidebar (the live CSS couldn't be sampled programmatically). The screenshot shows the opposite — a **geometric sans-serif with heavy, tight headings** and a **left sidebar**. The sections below reflect the verified design.

---

## 1. Design Positioning

One line: **minimalist · text-first · academic restraint.**

Core principles:

- **Content first, zero decoration** — no hero images, no carousels, no flashy motion. The first screen is already real content; the reader's attention stays on the words.
- **Single readable column + persistent sidebar** — the classic scholarly blog layout. Body text in one column at a comfortable reading width; a sidebar carries recent posts and a short bio.
- **Researcher identity** — the site presents Tina as a serious researcher: publications, research overview, writing. The layout is uniform across all content so everything reads as "publishable and citable."
- **Credible, calm, quotable** — typography serves readability and citation, not visual impact.

Design keywords: `clean` · `editorial` · `scholarly` · `whitespace` · `low-chrome` · `legible`.

---

## 2. Information Architecture (Site Map)

```
Tina · PhD Researcher Portal   (site root /)
│
├── Research (Home)     → /            (landing page = research overview, NOT a post feed)
├── About               → /about
├── Publications        → /publications
├── Blog                → /blog        (article list, paginated /blog/page/N)
├── Contact             → /contact
│
├── Single Post         → /blog/[slug]
│
└── (optional) Category → /blog/category/[slug]   (add only when there are enough posts)
```

**IA rules**

- **Primary nav is a flat, short, horizontal list** — no dropdowns. Recommended order: `Research` · `About` · `Publications` · `Blog` · `Contact`. (The reference site flattens pages *and* categories into one bar; keep it flat, but we lead with Research/About/Publications because that's a researcher portal's core.)
- **Home = Research.** The landing page is a research overview (summary + key papers + why-it-matters), not a reverse-chronological post stream.
- **Every page carries the same sidebar** (recent posts + short bio) for visual continuity. On a portal with few posts, the sidebar may show "Selected publications" instead of/alongside recent posts.
- A post appears both in the `Blog` stream and (optionally) in its category archive; list styling is identical in both.

---

## 3. Color

A **high-contrast, near-black-and-white neutral system + one restrained accent**. This is the locked palette for the build.

```css
:root {
  /* Neutrals */
  --color-bg:          #ffffff;  /* page / content background */
  --color-bg-subtle:   #f7f7f5;  /* optional sidebar / alt blocks */
  --color-text:        #1a1a1a;  /* primary body text (near-black) */
  --color-text-muted:  #6b6b6b;  /* dates, meta, captions */
  --color-border:      #e6e6e6;  /* hairline rules, separators */

  /* Accent — single restrained link/brand color (LOCKED: deep green) */
  --color-link:        #1f6f54;  /* deep green */
  --color-link-hover:  #14503c;  /* darker on hover */
  --color-accent-soft: #e8f0ec;  /* faint green tint for current-nav / focus bg */
}
```

Usage rules:

- Background pure white, body near-black. **No multi-color UI.** Almost the entire color budget goes to links/accent.
- Meta (dates, bylines, footer) uses `--color-text-muted`.
- Separators / card edges use a 1px hairline (`--color-border`).
- Accent is used **only** for: body/prose links, link hover, recent-post links, and focus rings. **The brand wordmark and primary nav are near-black, not accent.** Avoid filled accent buttons except for a single primary CTA (e.g., Contact).
- **Dark mode**: not required for v1. Tokens are structured so a dark theme can be layered later by overriding the neutrals.
- **Contrast**: body text vs. background and link vs. background must be ≥ 4.5:1. (`#1f6f54` on white ≈ 4.8:1 ✓.)

---

## 4. Typography

Style: **geometric sans-serif with heavy, tight headings** — the verified look of the reference. Body is the same sans at a comfortable reading size; headings are bold (700) with tight line-height and slightly negative tracking, giving the strong, modern wordmark feel seen on the live site.

```css
:root {
  /* LOCKED: geometric sans (Poppins via next/font), heavy headings */
  --font-body:    var(--font-sans), "Segoe UI", system-ui, sans-serif;
  --font-heading: var(--font-sans), "Segoe UI", system-ui, sans-serif;
  /* --font-sans is provided by next/font (Poppins). Montserrat/Inter are
     acceptable substitutes — keep a geometric grotesk character. */

  --fs-base:  18px;    /* body baseline */
  --lh-base:  1.7;     /* generous body line-height */
  --measure:  760px;   /* max reading width (~70–80 characters per line) */
  /* Headings: font-weight 700, line-height ~1.15, letter-spacing -0.01em */
}
```

Type scale:

| Role | Size | Weight | Notes |
|---|---|---|---|
| Site title (sidebar brand) | 30–34px | 700 | Brand name, **near-black** (not accent), links to Home |
| Post title (H1, single) | 34–40px | 700 | Single-post main heading, heavy + tight |
| Section heading (H2) | 24–30px | 700 | Heavily used to structure long posts; large and bold |
| Subheading (H3) | 18–20px | 600 | Sidebar titles etc. |
| Body (p) | 18px | 400 | line-height 1.7 |
| Meta / date | 14–15px | 400 | muted gray |
| Sidebar widget title | 14–16px | 600 | rendered lowercase for deliberate low-key feel ("recent posts") |

Typographic details (from the reference, worth keeping):

- Long posts are sliced with `H2` sections, separated by a horizontal rule (`---`).
- Lead sentences are often **bold** to state the point of a section.
- Comparison **tables** ("old vs. new", "before/after") are used freely; status emoji (🔴 ✅) are acceptable inline markers.
- Each post ends with an **italic author bio signature** (e.g., *"Tina is a PhD candidate at … researching …"*).
- Ordered/unordered **lists** are used frequently to break down arguments.

---

## 5. Layout System

A **left sidebar + main content** layout, separated by a **vertical hairline divider** — the verified structure of the reference. There is no separate top header; the brand, tagline, nav, recent posts, and bio all live stacked in the left sidebar.

```
┌──────────────┬───────────────────────────────┐
│  SIDEBAR      │                                │
│  · Brand (H1) │   MAIN (single-column body /   │
│  · Tagline    │   article list)                │
│  · Nav (vert) │   reading width ~760px         │
│  · recent     │                                │
│    posts      │   Big bold sans headings       │
│  · short bio  │                                │
│  · © footer   │                                │
└──────────────┴───────────────────────────────┘
         ▲ 1px vertical divider (border-right)
```

- Outer container max width `~1200px`, centered.
- Desktop: **left sidebar (~300px)** + main, with `border-right` hairline on the sidebar. Mobile: sidebar stacks **above** the main content (responsive single column). Breakpoint `lg` (~1024px).
- A `Skip to content` link sits first in the DOM for accessibility, targeting the main region.
- Spacing on an 8px base scale: `8 / 16 / 24 / 40 / 64`. Be generous with whitespace between blocks.
- The sidebar carries everything (brand → tagline → vertical nav → recent posts → bio → tiny copyright); main holds only the page content.

---

## 6. Component Inventory

| Component | Description | Used on |
|---|---|---|
| **Left Sidebar** | The whole left column: brand (H1, near-black, links Home) + tagline + vertical nav + recent posts + bio + tiny copyright. Separated from main by a `border-right` hairline. | All pages |
| **Primary Nav** | Flat **vertical** list inside the sidebar, no dropdowns; near-black, accent on hover/current | All pages |
| **Recent Posts Widget** | Lowercase "recent posts" title; latest ~5 as a plain link list (no excerpts, no thumbnails) | Sidebar |
| **Bio Widget** | "Tina" + one short identity paragraph (PhD candidate + field) | Sidebar |
| **Publications Widget** *(optional)* | "selected publications" — a few linked titles | Sidebar / Publications page |
| **Post List Item** | Post title (H2 link) + date + excerpt/first paragraph | Blog list, category archive |
| **Single Post** | H1 → date → body (H2 sections + `---` + tables) → italic bio sign-off | Post page |
| **Archive Header** | `Category: {name}` + one-line category description | Category pages |
| **Pagination** | `Next Page →` / `← Previous`; URLs like `/blog/page/2` | List + archive pages |
| **Contact Block** | Short prompt + primary links (email / LinkedIn / ORCID / GitHub) | Contact page |
| **Footer** | Minimal `© {year} Tina Wang` line at the bottom of the sidebar | All pages |
| **Skip Link** | Top-of-DOM accessibility jump link | All pages |

Visual baseline for all components: **low-chrome** — no card shadows, no heavy borders; separation comes from whitespace and hairlines. List items separated by a light hairline or pure spacing. Border radius `0` (squared), shadow `none`.

---

## 7. Brand Assets

- **Site name**: `Tina Wang` (text wordmark, near-black, bold, top of the left sidebar).
- **Tagline**: `AI governance, public sector innovation, and real-world AI deployment.`
- **Logo**: text-only wordmark is on-style; no image logo needed.
- **Locale**: `en` throughout (English-only site). Spelling: **British/Australian** (organisation, behaviour) per Tina's background.
- **Key outbound links**: email, ORCID, Google Scholar, LinkedIn, GitHub — set real handles in `content/site.ts`.

---

## 8. Page Templates

### 8.1 Home / Research (`/`)
Research landing page, **not** a post feed. Structure: short research-overview paragraph → **key papers / projects list** (title + one-line summary each) → optional video/figure embed → "Why this research matters" closing section.

### 8.2 About (`/about`)
Single text page: welcome line → identity + research directions (bulleted) → background → purpose of the site. Text-only, no images required.

### 8.3 Publications (`/publications`)
Grouped list (e.g., by year or type: journal / conference / preprint). Each entry: authors → title (linked to DOI/PDF) → venue, year. Plain, citation-friendly, no cards.

### 8.4 Blog (`/blog`)
Full reverse-chronological article stream. Each item = H2 title + date + excerpt. `Next Page` at the bottom.

### 8.5 Single Post (`/blog/[slug]`)
Per §4 details: H1 → date → H2-sectioned body → italic bio sign-off.

### 8.6 Contact (`/contact`)
Short prompt + primary CTA links (email, LinkedIn, ORCID). A form is optional and can be a "coming soon" placeholder initially.

---

## 9. Voice & Tone

A core part of the style — keep it consistent:

- **Researcher voice**: analytical, restrained, evidence-based. Comfortable with both academic framing and concrete detail.
- **Structured argument**: a hook opening → H2 sections → numbered points → comparison tables → a closing conclusion or open question.
- **Bylines**: every post ends with an italic one-line bio + links to related code/papers.
- **Honest boundaries**: state limitations explicitly ("this does not claim …", "scope is …"); emphasize what is and isn't supported by the evidence.
- **English (en)** throughout. Choose one spelling convention (e.g., British or American) and apply it consistently site-wide.

---

## 10. Interaction & Accessibility

- `Skip to content` link first in the DOM.
- **Links are the only strong interactive element**: default accent color, darker on hover, visible focus ring (use `--color-accent-soft` or an outline).
- No modals, no floating layers, no scroll-jacking — interaction stays minimal.
- Embeds (e.g., YouTube) are responsive (16:9 wrapper), lazy-loaded.
- Maintain body contrast ≥ 4.5:1, keep the reading-width cap, and ensure visible hover/focus states.

---

## 11. Quick Token Reference

```css
:root {
  --color-bg:          #ffffff;
  --color-bg-subtle:   #f7f7f5;
  --color-text:        #1a1a1a;
  --color-text-muted:  #6b6b6b;
  --color-border:      #e6e6e6;
  --color-link:        #1f6f54;   /* deep green (locked) */
  --color-link-hover:  #14503c;
  --color-accent-soft: #e8f0ec;

  --font-body:    var(--font-sans), "Segoe UI", system-ui, sans-serif;
  --font-heading: var(--font-sans), "Segoe UI", system-ui, sans-serif;

  --fs-base:       18px;
  --lh-base:       1.7;
  --measure:       760px;    /* content reading width */
  --sidebar:       300px;    /* left sidebar width */
  --container-max: 1200px;   /* outer container */
  --space-unit:    8px;      /* 8/16/24/40/64 scale */
  --radius:        0;        /* squared, low-chrome */
  --shadow:        none;
}
```

One-line principles:

1. Text first, generous whitespace, zero decoration.
2. Near-black-and-white neutrals + one restrained green accent (links only; brand & nav near-black).
3. **Left sidebar** (brand + vertical nav + recent posts + bio) divided from main by a hairline; single readable column for content.
4. **Geometric sans, heavy/tight headings.** Long posts: H2 sections, `---` dividers, comparison tables.
5. Researcher voice — honest, structured, quotable.

---

*Verified against a screenshot of the live barryli.phd. Locked for this build: geometric sans (Poppins), left sidebar + hairline divider, deep-green accent on links only. Identity/content reflect Tina Wang (UTS, AI governance).*
