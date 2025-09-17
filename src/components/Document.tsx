import { ReactNode } from "react";

export type DocumentProps = {
  title: string;
  bodyClassName?: string;
  children: ReactNode;
  headExtras?: ReactNode;
  bodyEnd?: ReactNode;
};

const tailwindScriptSrc = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
const faviconUrl = "https://shelf.io/wp-content/uploads/2019/04/favicon.png";

export function Document({
  title,
  bodyClassName,
  children,
  headExtras,
  bodyEnd,
}: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src={tailwindScriptSrc}></script>
        <style type="text/tailwindcss">
          {`@theme { --color-brand-DEFAULT: #6366f1; }`}
        </style>
        <link rel="shortcut icon" href={faviconUrl} />
        <title>{title}</title>
        {headExtras}
      </head>
      <body className={bodyClassName}>{children}{bodyEnd}</body>
    </html>
  );
}

export default Document;
