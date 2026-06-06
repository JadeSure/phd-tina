import type { Metadata } from "next";
import { publications, type Publication } from "@content/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Academic publications by Tina Wang on AI governance, public sector AI deployment, and human–AI decision making.",
  openGraph: {
    title: "Publications · Tina Wang",
    description:
      "Journal articles, conference papers, and preprints on AI governance and public sector AI deployment.",
  },
  alternates: { canonical: "/publications" },
};

function groupByYear(items: Publication[]): [number, Publication[]][] {
  const map = new Map<number, Publication[]>();
  for (const p of items) {
    map.set(p.year, [...(map.get(p.year) ?? []), p]);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

export default function PublicationsPage() {
  const groups = groupByYear(publications);

  return (
    <article>
      <h1 className="mb-6 text-3xl font-bold">Publications</h1>

      {groups.length === 0 && (
        <p className="text-text-muted">No publications listed yet.</p>
      )}

      {groups.map(([year, items]) => (
        <section key={year} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{year}</h2>
          <ul className="space-y-5">
            {items.map((p, i) => (
              <li key={`${year}-${i}`}>
                <span>{p.authors}. </span>
                {p.url ? (
                  <a href={p.url}>{p.title}</a>
                ) : (
                  <span className="font-semibold">{p.title}</span>
                )}
                <span className="text-text-muted">
                  . {p.venue}, {p.year}.
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
