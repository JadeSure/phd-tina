import type { Metadata } from "next";
import { site } from "@content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const { email, orcid, scholar, linkedin, github } = site.social;
  const links = [
    email ? { label: "Email", href: `mailto:${email}` } : null,
    orcid ? { label: "ORCID", href: orcid } : null,
    scholar ? { label: "Google Scholar", href: scholar } : null,
    linkedin ? { label: "LinkedIn", href: linkedin } : null,
    github ? { label: "GitHub", href: github } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article>
      <h1 className="mb-6 text-3xl font-bold">Contact</h1>
      <p className="my-5">
        The best way to reach me is by email, or via the links below.
      </p>

      {links.length > 0 ? (
        <ul className="my-5 space-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <span className="text-text-muted">{l.label}: </span>
              <a href={l.href}>{l.href.replace(/^mailto:/, "")}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-text-muted">
          Add your links in <code>content/site.ts</code>.
        </p>
      )}
    </article>
  );
}
