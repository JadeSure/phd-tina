import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Pin the workspace root to this project so Next doesn't infer it from a
  // stray parent lockfile. process.cwd() is the project root on Vercel and
  // locally (where `next` is run from here).
  turbopack: {
    root: process.cwd(),
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack requires serializable options: reference plugins by name,
    // not imported functions. Next resolves these from node_modules.
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [
      ["rehype-slug"],
      ["rehype-autolink-headings", { behavior: "wrap" }],
    ],
  },
});

export default withMDX(nextConfig);
