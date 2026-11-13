// Injects the server-rendered markup into dist/index.html so search engines
// and social previews receive the full page content without running JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const template = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const html = template.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`);
fs.writeFileSync(path.join(root, 'dist/index.html'), html);
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('Prerendered dist/index.html');
