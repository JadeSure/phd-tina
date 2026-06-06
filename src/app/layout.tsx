import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { site } from "@content/site";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.shortName}`,
  },
  description: site.tagline,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    url: site.url,
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.tagline,
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: site.url,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  description: site.bio,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Technology Sydney",
  },
  knowsAbout: [
    "AI Governance",
    "Public Sector AI",
    "Human-AI Decision Making",
    "Risk-Based AI Governance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-bg focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <MobileHeader />

        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col lg:flex-row">
          {/* Left sidebar — hidden on mobile, shown on desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <main
            id="content"
            className="min-w-0 flex-1 px-6 py-12 lg:px-14 lg:py-16"
          >
            <div className="max-w-[var(--measure)]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
