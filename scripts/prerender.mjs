/**
 * Post-build prerender: renders SPA routes to static HTML inside dist/ so bots
 * and no-JS clients get full page content (comparison pages in public/ are
 * already static; this covers the routes served by the React app).
 *
 * Runs after `vite build` (see the "build" script in package.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');

const ROOT_MARKER = '<div id="root"></div>';

const ROUTES = [
  { url: '/', outFile: 'index.html' },
  { url: '/privacy', outFile: 'privacy/index.html' },
  { url: '/terms', outFile: 'terms/index.html' },
];

const template = fs.readFileSync(templatePath, 'utf8');
if (!template.includes(ROOT_MARKER)) {
  throw new Error(`prerender: ${ROOT_MARKER} not found in dist/index.html — did the build output change?`);
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
  const { buildLandingJsonLd } = await vite.ssrLoadModule('/src/seo/landingJsonLd.js');
  const { V2_FAQ_ITEMS } = await vite.ssrLoadModule('/src/content/v2Faq.js');
  const config = await vite.ssrLoadModule('/src/config.js');

  // Same origin the deployed site uses (CNAME); env can override for previews.
  const siteOrigin = (process.env.VITE_SITE_ORIGIN || 'https://simple-screen-recorder.com').replace(/\/$/, '');

  // Entity graph + FAQPage for the homepage <head>. Uses id="landing-json-ld"
  // so the client-side effect in LandingPageV2 reuses this node instead of
  // appending a duplicate.
  const landingJsonLd = JSON.stringify(
    buildLandingJsonLd({
      siteOrigin,
      storeUrl: config.CHROME_WEB_STORE_URL,
      publisherName: config.LEGAL_ENTITY_PLACEHOLDER,
      ...config.ORGANIZATION_POSTAL,
      faqItems: V2_FAQ_ITEMS,
    }),
  );
  const homeHeadExtras = [
    `<link rel="canonical" href="${siteOrigin}/" />`,
    `<script type="application/ld+json" id="landing-json-ld">${landingJsonLd}</script>`,
  ].join('\n    ');

  for (const { url, outFile } of ROUTES) {
    const appHtml = render(url);
    if (!appHtml || appHtml.length < 500) {
      throw new Error(`prerender: suspiciously small output for ${url} (${appHtml.length} bytes)`);
    }
    let html = template.replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`);
    if (url === '/') {
      html = html.replace('</head>', `    ${homeHeadExtras}\n  </head>`);
    }
    const outPath = path.join(distDir, outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`prerendered ${url} -> dist/${outFile} (${(html.length / 1024).toFixed(1)} KB)`);
  }
} finally {
  await vite.close();
}
