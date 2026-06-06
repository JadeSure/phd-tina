import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostSlugs } from "@/lib/posts";
import { formatDate } from "@/components/PostList";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  // Import the MDX body. Plugins (gfm, slug, autolink) run via next.config.ts.
  // Relative literal segment + .mdx extension lets webpack create the context.
  let MDXContent: React.ComponentType;
  try {
    const mod = await import(`../../../../content/posts/${slug}.mdx`);
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
      <p className="mb-8 text-sm text-text-muted">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </p>
      <MDXContent />
    </article>
  );
}
