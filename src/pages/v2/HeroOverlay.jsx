import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CHROME_WEB_STORE_URL } from '../../config';
import { V2_ASSETS } from './v2Assets';

export function HeroOverlay() {
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  return (
    <section className="v2-hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title" className="v2-hero-title v2-display">
          Record polished screen walkthroughs in Chrome.
        </h1>

        <p className="v2-hero-subhead">
          Record a tab, add guided zooms, export MP4.
        </p>

        <div className="v2-hero-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
            data-analytics-id="hero-add-to-chrome"
          >
            Add to Chrome — free
            <ArrowRight className="btn-icon" size={18} aria-hidden />
          </a>
        </div>

        <p className="v2-hero-trust-line">No account · Local export · Stays on your device</p>

        <div className="v2-hero-preview">
          <p className="visually-hidden">
            The hero preview demonstrates the screen recorder features.
          </p>
          <div
            className={[
              'v2-hero-preview-frame',
              heroVideoReady ? 'v2-hero-preview-frame--ready' : 'v2-hero-preview-frame--loading',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-busy={!heroVideoReady}
          >
            <video
              className="v2-hero-preview-video v2-hero-preview-video--polished"
              src={V2_ASSETS.heroDemo}
              aria-label="Product demo video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setHeroVideoReady(true)}
              onLoadedData={() => setHeroVideoReady(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
