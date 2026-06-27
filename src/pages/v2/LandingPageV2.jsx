import { useState, useEffect, useId, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Video, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import {
  CHROME_WEB_STORE_URL,
  PRIVACY_POLICY_URL,
  TERMS_URL,
  TALLY_FEEDBACK_URL,
  SITE_HOME_URL,
  SITE_PUBLIC_ORIGIN,
  LEGAL_ENTITY_PLACEHOLDER,
  ORGANIZATION_POSTAL,
} from '../../config';
import { ScrollReveal } from '../../components/ScrollReveal';
import { useCanonicalLink } from '../../hooks/useCanonicalLink';
import { buildLandingJsonLd } from '../../seo/landingJsonLd';
import { HeroOverlay } from './HeroOverlay';
import { ContentRow } from './ContentRow';
import { V2_ASSETS } from './v2Assets';
import '../../App.css';
import './v2lp.css';
import {
  RecordAnimation,
  PolishAnimation,
  ExportAnimation,
  PrivacyAnimation,
} from './animations';

const V2_PATH = '/';

const HEADER_NAV_LINKS = [
  { href: '#use-cases', label: 'Use cases' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#faq', label: 'FAQ' },
];

const USE_CASES = [
  {
    title: 'Client handoff',
    body: 'Show a client where to update a website, CMS, or browser-based project.',
    mediaSrc: V2_ASSETS.useCases.clientHandoff,
    mediaType: 'video',
  },
  {
    title: 'Product walkthrough',
    body: 'Explain a new feature or core user flow without scheduling another call.',
    mediaSrc: V2_ASSETS.useCases.productWalkthrough,
    mediaType: 'video',
  },
  {
    title: 'Bug or support repro',
    body: 'Show the exact clicks and context behind an issue.',
    mediaSrc: V2_ASSETS.useCases.bugSupportRepro,
    mediaType: 'video',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    title: 'Record a Chrome tab',
    body: (
      <>
        Choose tab, window, or screen capture.
        <br />
        Chrome asks for permission — nothing uploads by default.
      </>
    ),
    Animation: RecordAnimation,
  },
  {
    title: 'Polish the walkthrough',
    body: 'Add a clean frame, background, trim points, and click-guided zooms.',
    Animation: PolishAnimation,
  },
  {
    title: 'Export MP4 directly to your device',
    body: 'Download the finished MP4 directly to your device.',
    Animation: ExportAnimation,
  },
];

const VALIDATION_FAQ_ITEMS = [
  {
    question: 'What can I record?',
    answer:
      'You can record a Chrome tab, browser window, or screen. Tab recording is best for browser walkthroughs with click-guided zooms.',
  },
  {
    question: 'Does it upload my video?',
    answer: 'No. The default export workflow keeps the recording on your device and saves the MP4 locally.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No account is required. Install the Chrome extension and record from Chrome.',
  },
  {
    question: 'Can I edit the recording before exporting?',
    answer: 'Yes. You can trim, add a browser frame and background, tune click-guided zooms, and export an MP4.',
  },
  {
    question: 'Which Chrome version do I need?',
    answer: 'Chrome 116 or newer.',
  },
];

function RealMedia({
  src,
  alt,
  type = 'video',
  aspectRatio = '16 / 10',
  className = '',
  playOnHover = false,
}) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);
  const shouldPlayOnHover = playOnHover && type === 'video';

  useEffect(() => {
    if (!src || failed || type !== 'video' || shouldPlayOnHover) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;
    const startVideo = () => {
      if (cancelled) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    };

    startVideo();
    video.addEventListener('canplay', startVideo, { once: true });

    return () => {
      cancelled = true;
      video.removeEventListener('canplay', startVideo);
    };
  }, [failed, shouldPlayOnHover, src, type]);

  if (!src || failed) return null;

  const playVideo = () => {
    if (!shouldPlayOnHover) return;
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  };

  const pauseVideo = () => {
    if (!shouldPlayOnHover) return;
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    if (video.readyState >= 1) {
      video.currentTime = 0;
    }
  };

  return (
    <div
      className={`v2-real-media${className ? ` ${className}` : ''}`}
      style={{ aspectRatio }}
      role={shouldPlayOnHover ? 'group' : undefined}
      tabIndex={shouldPlayOnHover ? 0 : undefined}
      onMouseEnter={shouldPlayOnHover ? playVideo : undefined}
      onMouseLeave={shouldPlayOnHover ? pauseVideo : undefined}
      onFocus={shouldPlayOnHover ? playVideo : undefined}
      onBlur={shouldPlayOnHover ? pauseVideo : undefined}
      aria-label={shouldPlayOnHover ? `${alt} video preview` : undefined}
    >
      {type === 'image' ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      ) : (
        <video
          ref={videoRef}
          src={src}
          aria-label={alt}
          autoPlay={!shouldPlayOnHover}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button
        type="button"
        id={triggerId}
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {question}
        <ChevronDown className="faq-icon" aria-hidden size={20} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function LandingPageV2() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const prevMobileNavOpen = useRef(false);

  useCanonicalLink(SITE_HOME_URL || undefined);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!SITE_PUBLIC_ORIGIN) return;
    const id = 'landing-json-ld';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      document.head.appendChild(el);
    }
    const data = buildLandingJsonLd({
      siteOrigin: SITE_PUBLIC_ORIGIN,
      storeUrl: CHROME_WEB_STORE_URL,
      publisherName: LEGAL_ENTITY_PLACEHOLDER,
      ...ORGANIZATION_POSTAL,
    });
    el.textContent = JSON.stringify(data);
    return () => {
      el?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const sel = 'a[href], button:not([disabled])';
    const fromPanel = panel ? [...panel.querySelectorAll(sel)] : [];
    const fromBackdrop = backdrop ? [backdrop] : [];
    const focusables = [...fromPanel, ...fromBackdrop];
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    window.requestAnimationFrame(() => first.focus());

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileNavOpen]);

  useEffect(() => {
    if (prevMobileNavOpen.current && !mobileNavOpen) {
      menuButtonRef.current?.focus();
    }
    prevMobileNavOpen.current = mobileNavOpen;
  }, [mobileNavOpen]);

  const closeMobileNav = () => setMobileNavOpen(false);
  const headerNavTabIndex = mobileNavOpen ? -1 : undefined;

  const handleLogoClick = (e) => {
    closeMobileNav();
    if (location.pathname === V2_PATH) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (location.hash) {
        window.history.replaceState(null, '', V2_PATH);
      }
    }
  };

  return (
    <div className="app-wrapper app-wrapper--v2">
      <header className={`app-header${mobileNavOpen ? ' mobile-nav-open' : ''}${scrolled ? ' app-header--scrolled' : ''}`}>
        <div className="container header-container">
          <Link to={V2_PATH} className="logo" tabIndex={headerNavTabIndex} onClick={handleLogoClick}>
            <Video size={20} className="logo-icon" aria-hidden />
            <span className="logo-text">Simple Screen Recorder</span>
          </Link>

          <nav className="header-nav" aria-label="Sections">
            {HEADER_NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} tabIndex={headerNavTabIndex}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a
              href={CHROME_WEB_STORE_URL}
              className="btn btn-primary btn-header-cta"
              target="_blank"
              rel="noreferrer"
              tabIndex={headerNavTabIndex}
              data-analytics-id="header-add-to-chrome"
            >
              Add to Chrome
              <ArrowRight className="btn-icon" size={16} aria-hidden />
            </a>
            <button
              type="button"
              ref={menuButtonRef}
              className="header-menu-toggle"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? (
                <>
                  <X size={22} aria-hidden />
                  <span className="visually-hidden">Close menu</span>
                </>
              ) : (
                <>
                  <Menu size={22} aria-hidden />
                  <span className="visually-hidden">Open menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          ref={panelRef}
          className={`mobile-nav-panel${mobileNavOpen ? ' mobile-nav-panel--open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          hidden={!mobileNavOpen}
        >
          <nav className="mobile-nav-links" aria-label="Sections">
            {HEADER_NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={closeMobileNav}>
                {label}
              </a>
            ))}
            <a
              href={CHROME_WEB_STORE_URL}
              className="mobile-nav-cta"
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileNav}
            >
              Add to Chrome
            </a>
          </nav>
        </div>
        {mobileNavOpen ? (
          <button
            type="button"
            ref={backdropRef}
            className="mobile-nav-backdrop"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
        ) : null}
      </header>

      <main id="main-content">
        <HeroOverlay />

        <section id="use-cases" className="v2-use-cases">
          <div className="container">
            <div className="v2-use-cases__layout">
              <ScrollReveal className="v2-use-cases__copy-panel">
                <div className="v2-section-header v2-use-cases__statement">
                  <p className="v2-section-label">Use cases</p>
                  <h2 className="heading-2">Built for browser-based work.</h2>
                  <p className="v2-body-text v2-use-cases__intro">
                    Clear walkthroughs for common browser workflows.
                  </p>
                </div>
                <div className="v2-use-cases__list">
                  {USE_CASES.map(({ title, body }, index) => {
                    const isActive = index === activeUseCaseIndex;
                    return (
                      <button
                        key={title}
                        type="button"
                        className={`v2-use-case-item${isActive ? ' v2-use-case-item--active' : ''}`}
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveUseCaseIndex(index)}
                        onFocus={() => setActiveUseCaseIndex(index)}
                        onClick={() => setActiveUseCaseIndex(index)}
                      >
                        <span className="v2-use-case-item__content">
                          <span className="v2-use-case-item__title">{title}</span>
                          <span className="v2-body-text v2-use-case-item__body">{body}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>
              <ScrollReveal delayMs={120} className="v2-use-cases__showcase">
                <div
                  key={activeUseCaseIndex}
                  className="v2-content-row__visual v2-use-cases__showcase-visual"
                >
                  <RealMedia
                    src={USE_CASES[activeUseCaseIndex].mediaSrc}
                    alt={`${USE_CASES[activeUseCaseIndex].title} walkthrough example`}
                    type={USE_CASES[activeUseCaseIndex].mediaType}
                    className="v2-content-row__media"
                    aspectRatio="16 / 10"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="v2-how-privacy">
          <div className="container">
            <ScrollReveal>
              <div className="v2-section-header">
                <p className="v2-section-label">How it works</p>
                <h2 className="heading-2">Record, polish, export — locally.</h2>
              </div>
            </ScrollReveal>
            <div className="v2-row-list">
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <ScrollReveal key={step.title} delayMs={index * 80}>
                  <ContentRow
                    title={step.title}
                    body={step.body}
                    bareVisual
                    visual={<step.Animation />}
                  />
                </ScrollReveal>
              ))}
              <ScrollReveal delayMs={320}>
                <ContentRow
                  id="privacy"
                  title="Your recordings stay on your device."
                  body="No account, no default upload, no cloud storage."
                  className="v2-content-row--privacy"
                  bareVisual
                  copyFooter={
                    <Link to={PRIVACY_POLICY_URL} className="v2-text-link">
                      Full privacy details
                    </Link>
                  }
                  visual={<PrivacyAnimation />}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="faq" className="v2-faq">
          <div className="container">
            <div className="v2-faq-layout">
              <ScrollReveal>
                <aside className="v2-faq-promo">
                  <p className="v2-section-label v2-faq-promo__label">FAQ</p>
                  <h2 className="v2-faq-promo__title">Common questions</h2>
                  <div className="v2-faq-promo__actions">
                    <a
                      href={CHROME_WEB_STORE_URL}
                      className="btn btn-primary v2-faq-promo__cta"
                      target="_blank"
                      rel="noreferrer"
                      data-analytics-id="faq-add-to-chrome"
                    >
                      Add to Chrome — free
                      <ArrowRight className="btn-icon" size={18} aria-hidden />
                    </a>
                  </div>
                </aside>
              </ScrollReveal>

              <div className="v2-faq-accordion">
                {VALIDATION_FAQ_ITEMS.map(({ question, answer }, index) => (
                  <ScrollReveal key={question} delayMs={index * 50}>
                    <FAQItem
                      question={question}
                      answer={answer}
                      isOpen={openFaqIndex === index}
                      onToggle={() => setOpenFaqIndex((current) => (current === index ? null : index))}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <Link to={V2_PATH} className="logo">
            <Video size={20} className="logo-icon" aria-hidden />
            <span className="logo-text">Simple Screen Recorder</span>
          </Link>
          <div className="footer-links">
            <a href={CHROME_WEB_STORE_URL} target="_blank" rel="noreferrer">
              Chrome Web Store
            </a>
            <a href={TALLY_FEEDBACK_URL} target="_blank" rel="noreferrer">
              Give feedback
            </a>
            <Link to={PRIVACY_POLICY_URL}>Privacy</Link>
            <Link to={TERMS_URL}>Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
