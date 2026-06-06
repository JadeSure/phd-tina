import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      <PostList posts={posts} />
    </section>
  );
}
