import { ReactElement } from "react";
import { renderRedirectPage } from "./RedirectPage";

export type PageDefinition = {
  output: string;
  render: () => ReactElement;
};

export const pages: PageDefinition[] = [
  { output: "index.html", render: renderRedirectPage },
];
