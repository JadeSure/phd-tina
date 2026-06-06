/**
 * Site-wide configuration. Edit this file to change the brand name, tagline,
 * navigation, bio, and social links — no component changes needed.
 */
export const site = {
  name: "Tina Wang",
  shortName: "Tina Wang",
  tagline: "AI governance, public sector innovation, and real-world AI deployment.",
  url: "https://example.com",

  // Short bio shown in the sidebar.
  bio: "PhD candidate at the University of Technology Sydney, working with government and industry partners on how governance systems help accountable officials make defensible decisions about AI deployment.",

  nav: [
    { label: "Research", href: "/" },
    { label: "About", href: "/about" },
    { label: "Publications", href: "/publications" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  social: {
    email: "",
    orcid: "",
    scholar: "",
    linkedin: "",
    github: "",
  },
};

export type Site = typeof site;
