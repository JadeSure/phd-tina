export default function HomePage() {
  return (
    <article>
      <h1 className="mb-8 text-4xl font-bold">Research</h1>

      <p className="my-5">
        My doctoral research examines how organisations can govern AI deployment
        decisions. Many AI governance frameworks are good at identifying risks
        and documenting controls — yet accountable officials still struggle to
        decide whether a given AI system <em>should</em> be deployed. My work
        focuses on the governance systems that help them make defensible,
        confident decisions.
      </p>

      <p className="my-5">
        I am a PhD candidate at the University of Technology Sydney, working with
        government and industry partners. My research spans five interrelated
        themes:
      </p>

      <ul className="my-5 list-disc space-y-3 pl-6">
        <li>
          <strong>AI Governance Infrastructure.</strong> The systems, roles, and
          artefacts that make AI decisions accountable and auditable.
        </li>
        <li>
          <strong>Human–AI Decision Making.</strong> How accountable officials
          reason about, and take responsibility for, AI-supported decisions.
        </li>
        <li>
          <strong>Risk-Based AI Governance.</strong> Moving from risk
          identification to risk-informed deployment decisions.
        </li>
        <li>
          <strong>Adaptive Governance for Autonomous AI Systems.</strong>{" "}
          Governance that keeps pace as systems become more autonomous.
        </li>
        <li>
          <strong>Public Sector AI.</strong> Practical governance that bridges
          policy, risk management, and operational deployment.
        </li>
      </ul>

      <hr className="my-12 border-0 border-t border-border" />

      <h2 className="mb-4 text-3xl font-bold">Why this research matters</h2>
      <p className="my-5">
        Most AI governance frameworks focus on identifying risks. Few focus on
        supporting decisions. As AI systems become increasingly autonomous, the
        challenge is no longer building AI — it is helping humans make informed
        decisions about when, where, and how AI should be used.
      </p>
      <blockquote className="my-6 border-l-2 border-border pl-4 text-text-muted italic">
        How can governance systems help accountable officials make confident
        deployment decisions?
      </blockquote>
    </article>
  );
}
