/**
 * Landing + legal on one deploy (typical for extensions)
 * -------------------------------------------------------
 * Privacy Policy and Terms of Service are different documents; both live on this site.
 * - In-app links use path-only routes below (`/privacy`, `/terms`).
 * - Chrome Web Store needs a public HTTPS Privacy Policy URL — use `PRIVACY_POLICY_PUBLIC_URL`
 *   once `VITE_SITE_ORIGIN` matches your live domain (e.g. https://ika.design). Same origin as
 *   this app avoids maintaining a separate “Chrome-only” legal host unless you choose to.
 * - Terms is optional for the Store listing but normal to host alongside Privacy.
 *
 * Set in `.env` / hosting env: `VITE_SITE_ORIGIN=https://your.domain` (no trailing slash).
 */
const siteOrigin =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_ORIGIN
    ? String(import.meta.env.VITE_SITE_ORIGIN).replace(/\/$/, '')
    : '';

/** Public site origin without trailing slash (empty in dev unless `VITE_SITE_ORIGIN` is set). */
export const SITE_PUBLIC_ORIGIN = siteOrigin;

/** Paste into Chrome Web Store “Privacy policy” when `VITE_SITE_ORIGIN` is set; otherwise empty. */
export const PRIVACY_POLICY_PUBLIC_URL = siteOrigin ? `${siteOrigin}/privacy` : '';

/** Optional: full Terms URL for store copy, support, or external links. */
export const TERMS_PUBLIC_URL = siteOrigin ? `${siteOrigin}/terms` : '';

/** Canonical homepage URL for `<link rel="canonical">` / sharing when `VITE_SITE_ORIGIN` is set. */
export const SITE_HOME_URL = siteOrigin ? `${siteOrigin}/` : '';

/** Product walkthrough clip under “How it works” (`public/demo/workflow-demo.mp4`). */
export const WORKFLOW_DEMO_VIDEO_URL = `${import.meta.env.BASE_URL}demo/workflow-demo.mp4`;

/** Set to your public listing URL when the extension is live in the Chrome Web Store. */
export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/...';

/** Post-install and general product feedback (Tally form). */
export const TALLY_FEEDBACK_URL = 'https://tally.so/r/GxBQy2';

/** SPA routes (React Router `<Link>`, same-origin navigation) */
export const PRIVACY_POLICY_URL = '/privacy';

export const TERMS_URL = '/terms';

/**
 * Contact uses mailto: — it does not open a new browser tab; it hands off to the OS mail app.
 * Embedded previews (e.g. some IDE browsers) often block mailto, so the link may appear to do nothing.
 */
function resolveSupportEmail() {
  const raw =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPPORT_EMAIL != null
      ? String(import.meta.env.VITE_SUPPORT_EMAIL).trim()
      : '';
  return raw.length > 0 ? raw : 'info@simple-screen-recorder.com';
}

/** Resolved support address (same as used in mailto links). */
export const SUPPORT_EMAIL = resolveSupportEmail();

export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Simple Screen Recorder — support')}`;

/** Hover / a11y hint for mailto links */
export const SUPPORT_MAILTO_TITLE =
  'Opens your email app to compose a message. If nothing happens, try Chrome or Safari outside the editor preview, or set a default mail app on your device.';

/** Substitute in legal pages (Privacy + Terms) */
export const LEGAL_ENTITY_PLACEHOLDER = 'ikai design';

export const LEGAL_ADDRESS_PLACEHOLDER = 'Pekelharingstraat 7-2, Amsterdam, Netherlands';

/** Structured address for JSON-LD / schema.org (keep aligned with legal copy). */
export const ORGANIZATION_POSTAL = {
  streetAddress: 'Pekelharingstraat 7-2',
  addressLocality: 'Amsterdam',
  addressCountry: 'NL',
};

/** Netherlands Chamber of Commerce (Kamer van Koophandel) — hoofdvestiging */
export const LEGAL_KVK_NUMBER = '94307393';

export const LEGAL_JURISDICTION_PLACEHOLDER = 'the Netherlands';

export const LEGAL_EFFECTIVE_DATE = '11 April 2026';
