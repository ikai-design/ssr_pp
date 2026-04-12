import { useEffect } from 'react';

/** Sets or removes `<link rel="canonical">` for the active route (client-side SPA). */
export function useCanonicalLink(href) {
  useEffect(() => {
    if (!href) {
      const existing = document.querySelector('link[rel="canonical"]');
      if (existing) existing.remove();
      return;
    }
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = href;
  }, [href]);
}
