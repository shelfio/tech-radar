import Document from "@/components/Document";
import PageHeader from "@/components/PageHeader";

const cards = [
  {
    href: "tech-radar/",
    title: "Tech Radar",
    description:
      "Track how we adopt, trial, assess, and retire technologies.",
    icon: (
      <svg
        className="mx-auto size-14 md:size-16 text-indigo-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" opacity="0.25" />
        <path d="M12 3v3" />
        <path d="M21 12h-3" />
        <path d="M12 21v-3" />
        <path d="M9 12a3 3 0 0 1 3-3" />
        <path d="m12 12 4 4" />
      </svg>
    ),
  },
  {
    href: "tech-stack/",
    title: "Tech Stack",
    description:
      "See the frameworks, services, and tooling that ship our products.",
    icon: (
      <svg
        className="mx-auto size-14 md:size-16 text-sky-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="6" rx="2" opacity="0.25" />
        <rect x="3" y="14" width="18" height="6" rx="2" opacity="0.25" />
        <path d="M7 7h.01" />
        <path d="M11 7h.01" />
        <path d="M15 7h.01" />
        <path d="M7 17h.01" />
        <path d="M11 17h.01" />
        <path d="M15 17h.01" />
      </svg>
    ),
  },
  {
    href: "open-source/",
    title: "Open Source",
    description:
      "Discover how we collaborate with and support the open source world.",
    icon: (
      <svg
        className="mx-auto size-14 md:size-16 text-amber-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          opacity="0.25"
          d="M11.48 3.499a1.125 1.125 0 0 1 1.04 0l6.875 3.654a1.125 1.125 0 0 1 .605.994v7.706c0 .41-.224.788-.586.99l-6.875 3.9a1.125 1.125 0 0 1-1.069 0l-6.875-3.9a1.125 1.125 0 0 1-.586-.99V8.147c0-.412.23-.79.605-.994l6.875-3.654Z"
        />
        <path d="M12 7v10" />
        <path d="M7 9.5 12 12l5-2.5" />
      </svg>
    ),
  },
];

export function renderHomePage() {
  return (
    <Document
      title="Shelf Tech Radar & Tech Stack"
      bodyClassName="min-h-screen bg-gradient-to-tr from-rose-200 via-violet-200 to-sky-200 font-sans text-slate-900"
    >
      <PageHeader
        logoSrc="logo.svg"
        containerClassName="max-w-5xl px-6"
        rightSlot={
          <a
            href="https://shelf.io/careers/"
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Careers
          </a>
        }
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="md:mt-4">
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            Explore our technology landscape
          </h1>
          <p className="mt-2 text-slate-600">
            Navigate our tech radar, dive into the stack powering our products, or see how we contribute back to the community.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-900 motion-safe:transition motion-reduce:transform-none hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {card.icon}
              <div className="mt-3 text-base font-semibold line-clamp-2">{card.title}</div>
              <div className="mt-1 text-sm text-slate-600">{card.description}</div>
            </a>
          ))}
        </div>
      </div>
    </Document>
  );
}
