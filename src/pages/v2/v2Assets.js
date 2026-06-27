/** Drop files into public/v2/… — paths update automatically on reload. */
const B = `${import.meta.env.BASE_URL}v2/`;

export const V2_ASSETS = {
  heroDemo: `${import.meta.env.BASE_URL}demo/Light_prod_demo_june_2026.mp4`,
  heroDemoRaw: `${import.meta.env.BASE_URL}demo/Demo_hero_June2026_New.mp4_OG.mp4`,

  useCases: {
    clientHandoff: `${B}use-cases/Client handoff.mp4`,
    productWalkthrough: `${B}use-cases/Product walkthrough.mp4`,
    bugSupportRepro: `${B}use-cases/Bug or support repro.mp4`,
  },

  privacy: {
    localFlow: `${B}privacy/local-flow.svg`,
  },
};
