import fs from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import { pages } from "@/pages";

const projectRoot = process.cwd();

async function ensureDir(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function buildPage(outputPath: string, render: () => ReactElement) {
  const absolutePath = path.join(projectRoot, outputPath);
  await ensureDir(absolutePath);
  const markup = renderToStaticMarkup(render());
  const html = `<!DOCTYPE html>${markup}`;
  await fs.writeFile(absolutePath, html, "utf8");
  console.log(`✓ ${outputPath}`);
}

async function run() {
  for (const page of pages) {
    await buildPage(page.output, page.render);
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
