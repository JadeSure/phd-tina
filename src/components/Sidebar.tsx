import Link from "next/link";
import { site } from "@content/site";
import { getRecentPosts } from "@/lib/posts";

export function Sidebar() {
  const recent = getRecentPosts(5);

  return (
    <aside className="w-full shrink-0 px-6 py-12 lg:w-[var(--sidebar)] lg:border-r lg:border-border lg:px-10 lg:py-16">
      {/* Brand */}
      <Link
        href="/"
        className="block text-text no-underline hover:text-text hover:no-underline"
      >
        <span className="font-heading text-[2rem] font-bold leading-[1.1] tracking-tight">
          {site.name}
        </span>
      </Link>
      <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
        {site.tagline}
      </p>

      {/* Primary nav — vertical list */}
      <nav aria-label="Primary" className="mt-10">
        <ul className="space-y-2.5">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-medium text-text hover:text-link"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Recent posts */}
      {recent.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-3 text-sm font-medium lowercase tracking-wide text-text-muted">
            recent posts
          </h2>
          <ul className="space-y-2">
            {recent.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-[15px] text-link hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bio */}
      <section className="mt-12">
        <h2 className="mb-3 text-sm font-semibold text-text-muted">
          {site.shortName}
        </h2>
        <p className="text-[15px] leading-relaxed text-text-muted">
          {site.bio}
        </p>
      </section>

      <p className="mt-12 text-xs text-text-muted">
        © {new Date().getFullYear()} {site.shortName}
      </p>
    </aside>
  );
}
