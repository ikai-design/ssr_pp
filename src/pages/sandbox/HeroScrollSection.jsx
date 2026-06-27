import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const HERO_DEMO_SRC = `${import.meta.env.BASE_URL}Hero_demo.mp4`;

function smoothstep(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function useHeroScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMq = () => setReducedMotion(mq.matches);
    applyMq();
    mq.addEventListener('change', applyMq);
    return () => mq.removeEventListener('change', applyMq);
  }, []);

  const update = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    const rect = el.getBoundingClientRect();
    const runway = el.offsetHeight - window.innerHeight;
    if (runway <= 0) {
      setProgress(1);
      return;
    }

    const scrolled = Math.min(runway, Math.max(0, -rect.top));
    setProgress(scrolled / runway);
  }, [sectionRef]);

  useEffect(() => {
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  useEffect(() => {
    if (reducedMotion) setProgress(1);
  }, [reducedMotion]);

  return { progress, reducedMotion };
}

export function HeroScrollSection({ children }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const { progress, reducedMotion } = useHeroScrollProgress(sectionRef);

  const reveal = smoothstep(progress);
  const videoOpacity = 1 - smoothstep(progress / 0.85);
  const contentReady = reveal > 0.35;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    if (videoOpacity > 0.05) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [videoOpacity, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`hero-scroll-section${reducedMotion ? ' hero-scroll-section--static' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-scroll-runway">
        <div className="hero-scroll-sticky">
          <div
            className="hero-scroll-bg"
            style={{ opacity: reducedMotion ? 0.35 : videoOpacity }}
            aria-hidden={videoOpacity < 0.1}
          >
            <video
              ref={videoRef}
              className="hero-scroll-bg-video"
              src={HERO_DEMO_SRC}
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Simple Screen Recorder product demo"
            />
            <div className="hero-scroll-bg-scrim" />
          </div>

          {!reducedMotion && reveal < 0.2 ? (
            <p className="hero-scroll-hint" aria-hidden="true">
              <ChevronDown size={18} />
              Scroll
            </p>
          ) : null}

          <div
            className={`hero-scroll-content${contentReady ? ' hero-scroll-content--interactive' : ''}`}
            style={
              reducedMotion
                ? undefined
                : {
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 48}px)`,
                  }
            }
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
