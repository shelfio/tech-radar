import { ReactElement } from "react";
import { renderHomePage } from "./HomePage";
import { renderTechRadarPage } from "./TechRadarPage";
import { renderTechStackPage } from "./TechStackPage";
import { renderOpenSourcePage } from "./OpenSourcePage";

export type PageDefinition = {
  output: string;
  render: () => ReactElement;
};

export const pages: PageDefinition[] = [
  { output: "index.html", render: renderHomePage },
  { output: "tech-radar/index.html", render: renderTechRadarPage },
  { output: "tech-stack/index.html", render: renderTechStackPage },
  { output: "open-source/index.html", render: renderOpenSourcePage },
];
