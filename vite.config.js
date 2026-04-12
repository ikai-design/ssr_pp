import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const origin = (env.VITE_SITE_ORIGIN || '').replace(/\/$/, '');

  return {
    plugins: [
      react(),
      {
        name: 'inject-og-absolute-urls',
        transformIndexHtml(html) {
          if (!origin) return html;
          const esc = origin.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
          const inject = `
    <meta property="og:url" content="${esc}/" />
    <meta property="og:image" content="${esc}/og-image.png" />
    <meta name="twitter:image" content="${esc}/og-image.png" />`;
          return html.replace('</head>', `${inject}\n  </head>`);
        },
      },
    ],
    build: {
      assetsInlineLimit: 0,
    },
  };
});
