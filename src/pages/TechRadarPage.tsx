import Document from "@/components/Document";

export function renderTechRadarPage() {
  return (
    <Document
      title="Shelf Tech Radar"
      bodyClassName="min-h-screen bg-slate-50 font-sans text-slate-900"
      headExtras={
        <>
          <script src="https://d3js.org/d3.v7.min.js" defer></script>
          <script src="./index.js" defer></script>
        </>
      }
    >
      <div className="fixed left-5 top-5 z-50">
        <a
          href="../"
          className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-slate-200 motion-safe:transition motion-reduce:transform-none hover:-translate-y-0.5 hover:text-indigo-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          ← Back to Home
        </a>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-6">
          <img src="../logo.svg" alt="Shelf" className="h-10 w-auto" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">
              Shelf Tech Radar
            </h1>
            <p className="mt-1 text-sm text-slate-600 md:text-base">
              Explore our technology adoption timeline and strategic decisions across different categories.
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-14 pb-20 pt-10 md:pt-12">
        <div className="px-6">
          <svg id="radar" className="block" role="img" aria-labelledby="tech-radar-title"></svg>
        </div>
        <span id="tech-radar-title" className="sr-only">
          Shelf Tech Radar
        </span>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight">What is the Tech Radar?</h2>
            <p className="text-sm leading-6 text-slate-600">
              The Shelf Tech Radar is a list of technologies, complemented by an assessment result, called <em>ring assignment</em>. We use four rings with the following semantics:
            </p>
            <ul className="space-y-4 text-sm leading-6 text-slate-600">
              <li>
                <strong>ADOPT</strong> &mdash; Technologies we have high confidence in to serve our purpose, also in large scale. Technologies with a usage culture in our Shelf production environment, low risk and recommended to be widely used.
              </li>
              <li>
                <strong>TRIAL</strong> &mdash; Technologies that we have seen work with success in project work to solve a real problem; first serious usage experience that confirm benefits and can uncover limitations. TRIAL technologies are slightly more risky; some engineers in our organization walked this path and will share knowledge and experiences.
              </li>
              <li>
                <strong>ASSESS</strong> &mdash; Technologies that are promising and have clear potential value-add for us; technologies worth to invest some research and prototyping efforts in to see if it has impact. ASSESS technologies have higher risks; they are often brand new and highly unproven in our organisation. You will find some engineers that have knowledge in the technology and promote it, you may even find teams that have started a prototyping effort.
              </li>
              <li>
                <strong>HOLD</strong> &mdash; Technologies not recommended to be used for new projects. Technologies that we think are not (yet) worth to (further) invest in. HOLD technologies should not be used for new projects, but usually can be continued for existing projects.
              </li>
            </ul>
          </section>

          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Our Technology Categories</h2>
              <ul className="space-y-3 text-sm leading-6 text-slate-600">
                <li>
                  <strong>AI/ML</strong> &mdash; Artificial Intelligence and Machine Learning technologies and platforms.
                </li>
                <li>
                  <strong>Infrastructure</strong> &mdash; Cloud services and infrastructure technologies.
                </li>
                <li>
                  <strong>Data</strong> &mdash; Databases, storage solutions, and data processing technologies.
                </li>
                <li>
                  <strong>Frameworks &amp; Libraries</strong> &mdash; Software frameworks, libraries, and development tools.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">What is the purpose?</h2>
              <p className="text-sm leading-6 text-slate-600">
                The Tech Radar is a tool to inspire and support Engineering teams at Shelf to pick the best technologies for new projects; it provides a platform to share knowledge and experience in technologies, to reflect on technology decisions and continuously evolve our technology landscape. Based on the
                <a
                  href="https://www.thoughtworks.com/radar"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  pioneering work of ThoughtWorks
                </a>
                , our Tech Radar sets out the changes in technologies that are interesting in software development &mdash; changes that we think our engineering teams should pay attention to and use in their projects.
              </p>
            </div>
          </section>
        </div>
      </main>
    </Document>
  );
}
