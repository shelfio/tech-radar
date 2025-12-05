export function renderRedirectPage() {
  const target = "https://shelf-engineering-portal.vercel.app/";

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <title>Redirecting…</title>
        <link rel="canonical" href={target} />
        <script
          // Use JS fallback so bots and browsers without meta refresh still navigate.
          dangerouslySetInnerHTML={{ __html: `window.location.replace('${target}');` }}
        />
      </head>
      <body>
        <p>Redirecting to <a href={target}>Shelf Engineering Portal</a>…</p>
      </body>
    </html>
  );
}
