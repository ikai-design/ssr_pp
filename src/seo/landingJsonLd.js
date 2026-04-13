import { LANDING_FAQ_ITEMS } from '../content/landingFaq';

const META_DESCRIPTION =
  'Record a tab or screen in Chrome: click-to-zoom storytelling, browser-style frames, gradients or custom image backgrounds, timeline editing, pause/resume, and local WebM/MP4 export—no cloud upload for the default workflow.';

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
}) {
  const base = siteOrigin.replace(/\/$/, '');
  const websiteId = `${base}/#website`;
  const orgId = `${base}/#organization`;

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
      '@type': 'SoftwareApplication',
      name: 'Simple Screen Recorder',
      description: META_DESCRIPTION,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Chrome',
      browserRequirements: 'Requires Chrome 116+. Manifest V3.',
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
      mainEntity: LANDING_FAQ_ITEMS.map(({ question, answer }) => ({
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
