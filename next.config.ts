import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Pin the workspace root so Next doesn't pick up a stray parent lockfile.
  turbopack: {
    root: __dirname,
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
