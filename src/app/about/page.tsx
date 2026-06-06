import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tina Wang is a PhD candidate at the University of Technology Sydney researching AI governance in the Australian Government and health sector.",
  openGraph: {
    title: "About · Tina Wang",
    description:
      "PhD candidate at UTS researching how governance systems help accountable officials make defensible AI deployment decisions.",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article>
      <h1 className="mb-8 text-4xl font-bold">About</h1>

      <p className="my-5">
        Hi, I&apos;m Tina Wang. I work at the intersection of AI governance,
        public sector innovation, and real-world AI deployment.
      </p>

      <p className="my-5">
        Over the past decade, I have worked across data analytics, digital
        transformation, platform delivery, and policy implementation within the
        Australian Government and health sector.
      </p>

      <p className="my-5">
        Through this work, I repeatedly encountered the same challenge:
        organisations often know how to identify AI risks, and they know how to
        document controls — yet decision makers still struggle to determine
        whether an AI system <em>should</em> be deployed. This observation became
        the foundation of my PhD research.
      </p>

      <p className="my-5">
        Today, I am a PhD candidate at the{" "}
        <strong>University of Technology Sydney</strong>, working with government
        and industry partners to explore how governance systems can help
        accountable officials make defensible decisions about AI deployment.
      </p>

      <h2 className="mt-12 mb-4 text-2xl font-bold">My research focuses on</h2>
      <ul className="my-5 list-disc space-y-2 pl-6">
        <li>AI Governance Infrastructure</li>
        <li>Human–AI Decision Making</li>
        <li>Risk-Based AI Governance</li>
        <li>Adaptive Governance for Autonomous AI Systems</li>
        <li>Public Sector AI</li>
      </ul>

      <p className="my-5">
        What interests me most is not whether AI can perform a task. It is
        whether organisations can confidently <em>govern</em> that capability. As
        AI systems become increasingly autonomous, the challenge is no longer
        building AI — it is helping humans make informed decisions about when,
        where, and how AI should be used.
      </p>

      <h2 className="mt-12 mb-4 text-2xl font-bold">Beyond research</h2>
      <p className="my-5">
        I contribute to AI innovation initiatives across government, including AI
        adoption, capability discovery, governance design, and experimentation
        programs. I am particularly interested in practical governance approaches
        that can bridge the gap between policy, risk management, and operational
        deployment.
      </p>

      <p className="my-5">
        When I am not working on AI governance, I enjoy exploring emerging
        technologies, connecting ideas across disciplines, and helping
        organisations discover capabilities that already exist but remain hidden.
      </p>

      <h2 className="mt-12 mb-4 text-2xl font-bold">Why this research matters</h2>
      <p className="my-5">
        Most AI governance frameworks focus on identifying risks. Few focus on
        supporting decisions. My research explores a simple but important
        question:
      </p>
      <blockquote className="my-6 border-l-2 border-border pl-4 text-text-muted italic">
        How can governance systems help accountable officials make confident
        deployment decisions?
      </blockquote>
    </article>
  );
}
