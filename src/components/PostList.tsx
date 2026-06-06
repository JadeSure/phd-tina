import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-text-muted">No posts yet.</p>;
  }

  return (
    <div className="divide-y divide-border">
      {posts.map((p) => (
        <article key={p.slug} className="py-8 first:pt-0">
          <h2 className="text-2xl font-bold">
            <Link href={`/blog/${p.slug}`} className="hover:underline">
              {p.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {formatDate(p.date)} · {p.readingMinutes} min read
          </p>
          {p.excerpt && <p className="mt-3">{p.excerpt}</p>}
        </article>
      ))}
    </div>
  );
}

export { formatDate };
