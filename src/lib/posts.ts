import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  excerpt: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

const isProd = process.env.NODE_ENV === "production";

function readAllFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
}

export function getAllPosts(): PostMeta[] {
  return readAllFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        excerpt: String(data.excerpt ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        draft: Boolean(data.draft ?? false),
        readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      } satisfies PostMeta;
    })
    .filter((p) => (isProd ? !p.draft : true))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getRecentPosts(limit = 5): PostMeta[] {
  return getAllPosts().slice(0, limit);
}
