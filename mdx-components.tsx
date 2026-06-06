import type { MDXComponents } from "mdx/types";

/**
 * Global MDX element styling. Centralizes "Prose" appearance so post bodies
 * match docs/style.md (serif body, H2 sections, hairline rules, muted meta).
 * Required by @next/mdx.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mt-0 mb-6 text-3xl font-bold" {...props} />,
    h2: (props) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold" {...props} />
    ),
    p: (props) => <p className="my-5" {...props} />,
    ul: (props) => <ul className="my-5 list-disc pl-6 space-y-2" {...props} />,
    ol: (props) => (
      <ol className="my-5 list-decimal pl-6 space-y-2" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-border pl-4 text-text-muted italic"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-0 border-t border-border" />,
    a: (props) => <a className="underline-offset-2" {...props} />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-base" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-border px-3 py-2 text-left font-semibold"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-border px-3 py-2 align-top" {...props} />
    ),
    code: (props) => (
      <code
        className="rounded bg-bg-subtle px-1.5 py-0.5 text-[0.9em]"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded bg-bg-subtle p-4 text-[0.9em]"
        {...props}
      />
    ),
    ...components,
  };
}
