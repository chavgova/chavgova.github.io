import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const root = path.resolve('dist');
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const origin = process.env.SITE_URL || 'https://chavgova.github.io';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const files = await walk(root);
const html = files.filter((file) => file.endsWith('.html'));
const errors = [];
let checked = 0;
for (const file of html) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const route = `${base}/${relative.replace(/index\.html$/, '')}`;
  const $ = load(await readFile(file, 'utf8'));
  const pageUrl = new URL(route, origin);
  if ($('h1').length !== 1) errors.push(`${relative}: expected exactly one h1`);
  if (!$('title').text() || !$('meta[name="description"]').attr('content')) errors.push(`${relative}: missing SEO metadata`);
  const references = [];
  $('[href], [src], [srcset]').each((_, element) => {
    for (const attr of ['href', 'src']) { const value = $(element).attr(attr); if (value) references.push(value); }
    const srcset = $(element).attr('srcset');
    if (srcset) references.push(...srcset.split(',').map((item) => item.trim().split(/\s+/)[0]));
  });
  for (const reference of references) {
    if (/^(mailto:|tel:|data:)/.test(reference)) continue;
    if (reference === '#') { errors.push(`${relative}: inert # link`); continue; }
    const url = new URL(reference, pageUrl);
    if (url.origin !== pageUrl.origin) continue;
    if (base && !url.pathname.startsWith(`${base}/`)) { errors.push(`${relative}: missing base prefix: ${reference}`); continue; }
    const clean = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\//, '');
    let target = path.resolve(root, clean);
    if (!target.startsWith(`${root}${path.sep}`) && target !== root) { errors.push(`${relative}: unsafe path: ${reference}`); continue; }
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const targetPage = load(await readFile(target, 'utf8'));
        const id = decodeURIComponent(url.hash.slice(1));
        if (!targetPage('[id]').toArray().some((element) => targetPage(element).attr('id') === id)) errors.push(`${relative}: missing fragment ${reference}`);
      }
      checked++;
    } catch { errors.push(`${relative}: missing target ${reference}`); }
  }
}
for (const required of ['index.html', 'projects/index.html', 'experience/index.html', 'about/index.html', '404.html', 'robots.txt', 'sitemap-index.xml']) {
  if (!files.includes(path.join(root, required))) errors.push(`Missing required output: ${required}`);
}
// Fonts and other CSS resources also need the deployment base prefix.
for (const file of files.filter((item) => item.endsWith('.css'))) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const css = await readFile(file, 'utf8');
  for (const match of css.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/g)) {
    const reference = match[2].trim();
    if (/^(data:|#)/.test(reference)) continue;
    const url = new URL(reference, new URL(`${base}/${relative}`, origin));
    if (url.origin !== new URL(origin).origin) continue;
    if (base && !url.pathname.startsWith(`${base}/`)) { errors.push(`${relative}: CSS resource missing base: ${reference}`); continue; }
    const target = path.resolve(root, decodeURIComponent(url.pathname.slice(base.length)).replace(/^\//, ''));
    if (!target.startsWith(`${root}${path.sep}`)) { errors.push(`${relative}: invalid CSS path: ${reference}`); continue; }
    try { await stat(target); checked++; } catch { errors.push(`${relative}: missing CSS resource ${reference}`); }
  }
}
if (files.some((file) => /legacy-site|archive-text|CV_masters_2024|\.zip$/.test(file))) errors.push('Archive material leaked into published output');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Link sanity check passed: ${html.length} pages, ${checked} local references, base ${base || '/'}.`);
