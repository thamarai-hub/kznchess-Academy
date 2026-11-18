// Injects the server-rendered markup into each built HTML page so search engines
// and social previews receive the full content without running JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const pages = [
  { file: 'dist/index.html', page: 'home' },
  { file: 'dist/donate/index.html', page: 'donate' },
];

for (const { file, page } of pages) {
  const full = path.join(root, file);
  const template = fs.readFileSync(full, 'utf8');
  const html = template.replace(/<div id="root"([^>]*)><\/div>/, (_m, attrs) => `<div id="root"${attrs}>${render(page)}</div>`);
  fs.writeFileSync(full, html);
  console.log(`Prerendered ${file}`);
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
