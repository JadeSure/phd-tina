export type Publication = {
  authors: string;
  title: string;
  venue: string;
  year: number;
  url?: string;
  type: "journal" | "conference" | "preprint";
};

/** Replace with real publications. Rendered grouped by year on /publications. */
export const publications: Publication[] = [
  {
    authors: "Tina A., Co-author B.",
    title: "An example paper title goes here",
    venue: "Journal of Example Studies",
    year: 2026,
    url: "",
    type: "journal",
  },
  {
    authors: "Tina A.",
    title: "A second example, this time a preprint",
    venue: "arXiv",
    year: 2025,
    url: "",
    type: "preprint",
  },
];
