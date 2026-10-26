import { LANDING_FAQ_ITEMS } from '../content/landingFaq';

const META_DESCRIPTION =
  'Free Chrome screen recorder with auto zoom on clicks, webcam overlay, crop and trim. Export MP4 up to 4K on your device — no account, no watermark, no uploads.';

/** Keep in sync with the extension's manifest version and the CWS listing. */
const SOFTWARE_VERSION = '2.6.2';
const DATE_MODIFIED = '2026-10-26';

const FEATURE_LIST = [
  'Record a Chrome tab, app window or full screen',
  'Auto zoom on clicks, editable on a timeline',
  'Pause and resume while recording',
  'Webcam overlay recorded as a separate, editable track',
  'Microphone plus tab or system audio',
  'Crop and aspect-ratio presets (16:9, 9:16, 1:1, 4:3, 3:4)',
  'Backgrounds and browser frames',
  'Trim, undo and redo',
  'MP4 export from 720p up to 4K, processed locally',
  'On-device recordings library',
];

function isLikelyChromeStoreUrl(url) {
  return (
    typeof url === 'string' &&
    url.includes('chromewebstore.google.com/detail/') &&
    !url.endsWith('/...')
  );
}

/**
 * JSON-LD @graph for the marketing homepage (injected client-side when public origin is set).
 */
export function buildLandingJsonLd({
  siteOrigin,
  storeUrl,
  publisherName,
  streetAddress,
  addressLocality,
  addressCountry,
  faqItems = LANDING_FAQ_ITEMS,
}) {
  const base = siteOrigin.replace(/\/$/, '');
  const websiteId = `${base}/#website`;
  const orgId = `${base}/#organization`;
  const authorId = `${base}/#author`;

  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${base}/`,
      name: 'Simple Screen Recorder',
      description: META_DESCRIPTION,
      inLanguage: 'en-US',
      publisher: { '@id': orgId },
    },
    {
      '@type': 'Organization',
      '@id': orgId,
      name: publisherName,
      url: `${base}/`,
      address: {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality,
        addressCountry,
      },
    },
    {
      '@type': 'Person',
      '@id': authorId,
      name: 'Eugene Voroniuk',
      jobTitle: 'Product designer',
      worksFor: { '@id': orgId },
      sameAs: ['https://www.linkedin.com/in/eugene-voroniuk/', 'https://dev.to/eugene_vo'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Simple Screen Recorder',
      alternateName: 'Simple Screen Recorder for Chrome',
      description: META_DESCRIPTION,
      applicationCategory: 'MultimediaApplication',
      applicationSubCategory: 'Screen recorder',
      operatingSystem: 'Windows, macOS, Linux, ChromeOS (Chrome 116+)',
      softwareRequirements: 'Requires Chrome 116+. Manifest V3.',
      softwareVersion: SOFTWARE_VERSION,
      dateModified: DATE_MODIFIED,
      featureList: FEATURE_LIST,
      image: `${base}/og-image.png`,
      author: { '@id': authorId },
      publisher: { '@id': orgId },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      ...(isLikelyChromeStoreUrl(storeUrl)
        ? { url: storeUrl, installUrl: storeUrl }
        : { url: `${base}/` }),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    },
  ];

  return { '@context': 'https://schema.org', '@graph': graph };
}
