import Document from "@/components/Document";
import { techStackCategories } from "@/data/techStack";

const PLUS_PATH = "M8 4h2v4h4v2h-4v4H8v-4H4V8h4z";
const MINUS_PATH = "M4 8h10v2H4z";

function getIconUrl(icon: string) {
  if (icon.startsWith("http://") || icon.startsWith("https://")) {
    return icon;
  }
  const params = new URLSearchParams({
    domain: icon,
    sz: "128",
  });
  return `https://www.google.com/s2/favicons?${params.toString()}`;
}

export function renderTechStackPage() {
  return (
    <Document
      title="Shelf Tech Stack"
      bodyClassName="min-h-screen bg-slate-100 font-sans text-slate-900"
      headExtras={<link rel="stylesheet" href="index.css" />}
    >
      <div className="fixed left-5 top-5 z-[1000]">
        <a
          href="../"
          className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-indigo-500 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-indigo-600 hover:shadow-lg"
        >
          ← Back to Home
        </a>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4">
          <img src="../logo.svg" alt="Shelf" className="h-10 min-w-[100px]" />
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-slate-900">Shelf Tech Stack</h1>
            <p className="text-sm text-slate-500">
              Discover the tools and technologies used to build Shelf&apos;s innovative products and services.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-2 pt-8 sm:px-4 sm:pt-10">
        {techStackCategories.map((category) => (
          <details
            key={category.id}
            open
            className="relative overflow-visible rounded-3xl border border-white/70 bg-white text-slate-900 shadow-sm ring-1 ring-white/70"
          >
            <summary className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-3xl bg-white px-6 py-5 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
              <span className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center text-2xl">{category.icon}</span>
                <span className="space-y-1">
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{category.name}</h2>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {category.description}
                  </p>
                </span>
              </span>
              <span className="flex items-center text-slate-400">
                <span className="toggle-pill flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-white/60 transition">
                  <svg
                    className="toggle-icon toggle-icon-plus h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path fill="#394150" fillRule="evenodd" d={PLUS_PATH}></path>
                  </svg>
                  <svg
                    className="toggle-icon toggle-icon-minus hidden h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path fill="#394150" fillRule="evenodd" d={MINUS_PATH}></path>
                  </svg>
                </span>
              </span>
            </summary>

            <div className="space-y-3 border-t border-slate-200 bg-white px-6 pb-12 pt-4">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
                {category.tools.map((tool) => {
                  const iconUrl = getIconUrl(tool.icon);
                  return (
                    <article
                      key={`${category.id}:${tool.name}`}
                      className="tool-card group relative z-30 flex cursor-pointer items-center gap-3 rounded-xl bg-white/95 px-3 py-2 ring-1 ring-transparent transition-[transform,box-shadow,filter] duration-150 ease-out hover:z-40 hover:ring-indigo-100/60 active:ring-indigo-200/60"
                    >
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <img
                          src={iconUrl}
                          alt={tool.name}
                          loading="lazy"
                          className="h-10 w-10 rounded-lg object-contain"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">{tool.name}</h3>
                        <p
                          className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm"
                          title={tool.usage}
                        >
                          {tool.usage}
                        </p>
                      </span>
                      <span className="pointer-events-none absolute left-1/2 top-full z-40 hidden w-56 -translate-x-1/2 translate-y-3 rounded-xl border border-slate-900/40 bg-slate-900/80 px-3 py-2 text-center text-xs font-medium text-slate-100 shadow-xl backdrop-blur group-hover:block md:w-64">
                        {tool.usage}
                        <span
                          className="absolute left-1/2 top-0 h-3 w-6 -translate-x-1/2 -translate-y-full border-x border-t border-slate-900/40 bg-slate-900/80 backdrop-blur"
                          style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
                        ></span>
                      </span>
                    </article>
                  );
                })}
              </div>
            </div>
          </details>
        ))}
      </main>
    </Document>
  );
}
