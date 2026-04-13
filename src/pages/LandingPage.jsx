import { useState, useEffect, useId, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Video,
  MousePointer2,
  Scissors,
  Layers,
  HardDrive,
  FileVideo,
  ChevronDown,
  MonitorPlay,
  Wand2,
  Download,
  Keyboard,
  Check,
  X,
  Minus,
  Users,
  Briefcase,
  Headphones,
  Rocket,
  ArrowRight,
  Shield,
  Menu,
} from 'lucide-react';
import {
  CHROME_WEB_STORE_URL,
  PRIVACY_POLICY_URL,
  TERMS_URL,
  SUPPORT_MAILTO,
  SUPPORT_MAILTO_TITLE,
  SITE_HOME_URL,
  WORKFLOW_DEMO_VIDEO_URL,
} from '../config';
import { ScrollReveal } from '../components/ScrollReveal';
import { useCanonicalLink } from '../hooks/useCanonicalLink';
import '../App.css';

const EDITOR_HERO_SRC = `${import.meta.env.BASE_URL}chrome-editor-hero/editor-hero.html`;

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className="faq-item">
      <button
        type="button"
        id={triggerId}
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {question}
        <ChevronDown
          className="faq-icon"
          aria-hidden
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          size={20}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className={`faq-answer${isOpen ? ' animate-fade-up' : ''}`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

function HeroMockup() {
  return (
    <figure
      className="hero-preview animate-fade-up delay-100"
      aria-label="Simple Screen Recorder editor: preview with optional browser frame, timeline with trim and zoom blocks, and export controls (static snapshot from the extension UI)."
    >
      <div className="hero-preview-frame hero-preview-frame--plugin">
        <iframe
          className="hero-plugin-iframe"
          src={EDITOR_HERO_SRC}
          title="Simple Screen Recorder editor preview"
          loading="lazy"
        />
      </div>
    </figure>
  );
}

const HEADER_NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#workflow', label: 'How it works' },
  { href: '#comparison', label: 'Compare' },
  { href: '#faq', label: 'FAQ' },
];

export default function LandingPage() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const prevMobileNavOpen = useRef(false);

  useCanonicalLink(SITE_HOME_URL || undefined);

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
    const focusFirst = () => window.requestAnimationFrame(() => first.focus());

    focusFirst();

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
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (location.hash) {
        window.history.replaceState(null, '', '/');
      }
    }
  };

  return (
    <div className="app-wrapper">
      <header className={`app-header${mobileNavOpen ? ' mobile-nav-open' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="logo" tabIndex={headerNavTabIndex} onClick={handleLogoClick}>
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
            <a href={CHROME_WEB_STORE_URL} className="mobile-nav-cta" target="_blank" rel="noreferrer" onClick={closeMobileNav}>
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

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content animate-fade-up">
              <p className="hero-eyebrow">Made for Chrome · Local-first export</p>
              <h1 className="heading-1 hero-title">
                <span className="hero-title-line">Plan clearer demos with</span>
                <span className="hero-title-line">Simple Screen Recorder</span>
              </h1>
              <p className="subhead hero-subhead">
                On a tab, click to zoom in smoothly and pan with the cursor—after a few seconds idle, zoom eases back to
                full frame. Add browser-style frames and backgrounds in the editor, refine the timeline, then export WebM or
                MP4 locally—no upload for the default workflow.
              </p>
              <div className="hero-btns">
                <a href={CHROME_WEB_STORE_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
                  Add to Chrome
                  <ArrowRight className="btn-icon" size={18} aria-hidden />
                </a>
                <a href="#workflow" className="btn btn-secondary">
                  How it works
                  <ArrowRight className="btn-icon" size={18} aria-hidden />
                </a>
              </div>
            </div>

            <HeroMockup />
          </div>
        </section>

        <section className="social-line">
          <div className="container">
            <ScrollReveal>
              <p className="social-line-text">
                For product, support, and founders who need clearer screen demos—without a heavy desktop suite.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <h2 className="heading-2">What you get</h2>
                <p className="subhead section-lead">
                  Click-to-zoom storytelling, browser frames, a real timeline, and local export—not just a single raw capture.
                </p>
              </div>

              <div className="features-grid">
              <div className="feature-card">
                <MousePointer2 className="feature-icon" size={22} aria-hidden />
                <h3 className="feature-title">Smooth zoom-to-cursor</h3>
                <p className="feature-desc text-body">
                  On tab capture, click to zoom in and follow the cursor while zoomed; after a short idle period, zoom
                  returns to the full frame. Screen or window capture stays as picked—no page-level zoom cues.
                </p>
              </div>
              <div className="feature-card">
                <Video className="feature-icon" size={22} aria-hidden />
                <h3 className="feature-title">Clicks become zoom blocks</h3>
                <p className="feature-desc text-body">
                  Each recorded click spawns a zoom segment on the timeline with position and depth you can tweak—plus
                  auto-zoom depth presets when you want every click to match.
                </p>
              </div>
              <div className="feature-card">
                <Scissors className="feature-icon" size={22} aria-hidden />
                <h3 className="feature-title">Built-in editor</h3>
                <p className="feature-desc text-body">
                  Timeline with trim and zoom blocks, preview, undo/redo—polish before export.
                </p>
              </div>
              <div className="feature-card">
                <Layers className="feature-icon" size={22} aria-hidden />
                <h3 className="feature-title">Browser frames &amp; stage</h3>
                <p className="feature-desc text-body">
                  Optional window-style browser chrome (default or minimal), shadows and borders, gradients or solid
                  fills, custom image backgrounds, and aspect presets for Slack, docs, or social.
                </p>
              </div>
              <div className="feature-card">
                <HardDrive className="feature-icon" size={22} aria-hidden />
                <h3 className="feature-title">Local-first</h3>
                <p className="feature-desc text-body">
                  <FileVideo className="inline-icon" size={14} aria-hidden /> WebM in; MP4 out via bundled FFmpeg.wasm
                  where supported—on your device.
                </p>
              </div>
              <div className="feature-card">
                <Keyboard className="feature-icon" size={22} aria-hidden />
                <h3 className="feature-title">Pause &amp; shortcut</h3>
                <p className="feature-desc text-body">
                  Pause and resume while recording when you need a break. Stop quickly with Ctrl+Shift+E (Windows/Linux)
                  or ⌘+Shift+E (macOS).
                </p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="workflow" className="section section-alt">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <h2 className="heading-2">How it works</h2>
                <p className="subhead section-lead">Three steps from capture to download.</p>
              </div>

              <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">
                  <MonitorPlay size={22} aria-hidden />
                </div>
                <h3 className="heading-3">1. Start recording</h3>
                <p className="text-body">Choose tab capture or the system display picker, depending on mode.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">
                  <Wand2 size={22} aria-hidden />
                </div>
                <h3 className="heading-3">2. Record your flow</h3>
                <p className="text-body">
                  On a tab, clicks drive zoom and optional cursor overlay data for the editor; on screen/window, you get
                  the capture you picked. Pause and resume anytime if you need to step away.
                </p>
              </div>
              <div className="step-card">
                <div className="step-icon">
                  <Download size={22} aria-hidden />
                </div>
                <h3 className="heading-3">3. Polish &amp; export</h3>
                <p className="text-body">
                  Trim and tune zoom blocks, pick a browser frame and background, set quality and format, then download
                  locally from the editor tab.
                </p>
              </div>
            </div>
            </ScrollReveal>

            <ScrollReveal>
              <figure
                className="workflow-demo"
                aria-label="Video walkthrough of capture, editing, and export in Simple Screen Recorder."
              >
                <div className="workflow-demo-frame">
                  <video
                    className="workflow-demo-video"
                    src={WORKFLOW_DEMO_VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                  />
                </div>
                <figcaption className="workflow-demo-caption text-body">
                  Short walkthrough: record (pause if needed), frame and polish on the timeline, export locally.
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </section>

        <section id="comparison" className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-header section-header--hero-width">
                <h2 className="heading-2">Versus a basic recorder</h2>
                <p className="subhead section-lead">
                  Free in Chrome—with timeline polish and local export. Basic tools often stay free for simple capture only;
                  real editing and export are where paid tiers and limits usually show up.
                </p>
              </div>

              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <caption className="visually-hidden">
                    Comparison of features for a basic screen recorder versus Simple Screen Recorder
                  </caption>
                  <thead>
                    <tr className="comparison-table__head-row">
                      <th scope="col" className="comparison-th-feature comparison-header-feature">
                        Features
                      </th>
                      <th scope="col" className="comparison-th-basic comparison-col-muted">
                        <span className="comparison-col comparison-col-stack">
                          <span className="comparison-col-title">Basic recorder</span>
                          <span className="comparison-col-note">Pricing varies</span>
                        </span>
                      </th>
                      <th scope="col" className="comparison-th-brand comparison-col-brand">
                        <span className="comparison-col comparison-col-stack">
                          <span className="comparison-col-title comparison-col-title--brand">
                            Simple Screen Recorder
                          </span>
                          <span className="comparison-col-note comparison-col-note--free">Free</span>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" className="comparison-feature">
                        Zoom-to-cursor storytelling
                      </th>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Basic recorder</span>
                          <span className="comparison-side-label-note">Pricing varies</span>
                        </span>
                        <X className="icon-x" size={18} aria-hidden />
                      </td>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Simple Screen Recorder</span>
                          <span className="comparison-side-label-note comparison-side-label-note--free">Free</span>
                        </span>
                        <Check className="icon-check" size={18} aria-hidden />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="comparison-feature">
                        Timeline (trim / zoom blocks)
                      </th>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Basic recorder</span>
                          <span className="comparison-side-label-note">Pricing varies</span>
                        </span>
                        <X className="icon-x" size={18} aria-hidden />
                      </td>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Simple Screen Recorder</span>
                          <span className="comparison-side-label-note comparison-side-label-note--free">Free</span>
                        </span>
                        <Check className="icon-check" size={18} aria-hidden />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="comparison-feature">
                        Local MP4 without cloud for core path
                      </th>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Basic recorder</span>
                          <span className="comparison-side-label-note">Pricing varies</span>
                        </span>
                        <Minus className="icon-varies" size={18} aria-label="Varies" />
                      </td>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Simple Screen Recorder</span>
                          <span className="comparison-side-label-note comparison-side-label-note--free">Free</span>
                        </span>
                        <Check className="icon-check" size={18} aria-hidden />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="comparison-feature">
                        Backgrounds &amp; aspect presets
                      </th>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Basic recorder</span>
                          <span className="comparison-side-label-note">Pricing varies</span>
                        </span>
                        <X className="icon-x" size={18} aria-hidden />
                      </td>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Simple Screen Recorder</span>
                          <span className="comparison-side-label-note comparison-side-label-note--free">Free</span>
                        </span>
                        <Check className="icon-check" size={18} aria-hidden />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="comparison-feature">
                        Browser chrome / window frame
                      </th>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Basic recorder</span>
                          <span className="comparison-side-label-note">Pricing varies</span>
                        </span>
                        <X className="icon-x" size={18} aria-hidden />
                      </td>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Simple Screen Recorder</span>
                          <span className="comparison-side-label-note comparison-side-label-note--free">Free</span>
                        </span>
                        <Check className="icon-check" size={18} aria-hidden />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="comparison-feature">
                        Pause / resume while recording
                      </th>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Basic recorder</span>
                          <span className="comparison-side-label-note">Pricing varies</span>
                        </span>
                        <Minus className="icon-varies" size={18} aria-label="Varies" />
                      </td>
                      <td className="comparison-side">
                        <span className="comparison-side-label">
                          <span className="comparison-side-label-line">Simple Screen Recorder</span>
                          <span className="comparison-side-label-note comparison-side-label-note--free">Free</span>
                        </span>
                        <Check className="icon-check" size={18} aria-hidden />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="customers" className="section section-alt">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <h2 className="heading-2">Who it’s for</h2>
              </div>
              <div className="audience-grid">
              <div className="audience-card">
                <Briefcase size={22} className="audience-icon" aria-hidden />
                <h3 className="heading-3">Product &amp; GTM</h3>
                <p className="text-body">Demos, walkthroughs, internal updates.</p>
              </div>
              <div className="audience-card">
                <Headphones size={22} className="audience-icon" aria-hidden />
                <h3 className="heading-3">Support</h3>
                <p className="text-body">Repros and guided fixes customers can follow.</p>
              </div>
              <div className="audience-card">
                <Rocket size={22} className="audience-icon" aria-hidden />
                <h3 className="heading-3">Founders &amp; builders</h3>
                <p className="text-body">Async comms without a studio stack.</p>
              </div>
              <div className="audience-card">
                <Users size={22} className="audience-icon" aria-hidden />
                <h3 className="heading-3">Creators</h3>
                <p className="text-body">Browser capture with export options per channel.</p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="privacy" className="section trust-block">
          <div className="container trust-inner">
            <ScrollReveal>
              <Shield size={36} className="trust-icon" aria-hidden />
              <h2 className="heading-2 trust-title">Privacy</h2>
              <p className="text-body trust-copy">
                Recordings, optional custom background images, and exports are processed on your device in the default
                workflow. The extension uses standard Chrome permissions to capture content and a lightweight pointer tracker
                on pages you record—so zoom stays accurate. Host access is for recording eligible sites, not for ad-style
                browsing history collection.
              </p>
              <Link to={PRIVACY_POLICY_URL} className="trust-link">
                Privacy policy
                <ArrowRight size={16} aria-hidden />
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <h2 className="heading-2">FAQ</h2>
              </div>
              <div className="faq-container">
              <FAQItem
                question="Will this work on any website?"
                answer="Normal pages yes. Restricted Chrome URLs (e.g. chrome://) can’t be recorded, like other capture tools."
              />
              <FAQItem
                question="Tab vs screen recording—what’s different?"
                answer="Tab capture enables click-based zoom and optional cursor overlay in the editor. Window or full-screen capture does not include page-level click/mouse data, so those enhancements are for tab workflows."
              />
              <FAQItem
                question="How does zoom work on a tab recording?"
                answer="Click to zoom in smoothly; move the cursor to pan while zoomed. If you stop moving for a few seconds, zoom eases back to the full frame. Your clicks also become zoom segments on the timeline you can trim and tune before export."
              />
              <FAQItem
                question="What about audio—and can I mute while recording?"
                answer="Tab capture can include audio from the tab. Screen or window capture may not include system audio on every OS (for example, macOS often has no display audio in the recording). When audio is available, you can mute and unmute during capture from the controls."
              />
              <FAQItem
                question="Which Chrome version do I need?"
                answer="Chrome 116 or newer (Manifest V3 features the extension relies on)."
              />
              <FAQItem
                question="Why WebM?"
                answer="Chrome records WebM efficiently. MP4 is available in the editor via local FFmpeg.wasm conversion where supported."
              />
              <FAQItem
                question="Does it upload my video?"
                answer="Core export is local. Any future cloud features would be explicit and opt-in."
              />
              <FAQItem
                question="How do I stop recording quickly?"
                answer="Ctrl+Shift+E on Windows/Linux, or ⌘+Shift+E on macOS."
              />
              <FAQItem
                question="What permissions are needed?"
                answer="Standard capture permissions plus a small content script during recording for accurate zoom—not for advertising tracking."
              />
              <FAQItem
                question="Do I need a desktop video suite?"
                answer="No. Capture, timeline edits, and local export run in Chrome for everyday demos."
              />
            </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="cta-section" id="cta">
          <div className="container cta-inner">
            <ScrollReveal>
              <h2 className="heading-2 cta-title">Add it from the Chrome Web Store</h2>
              <p className="subhead cta-sub">Keep video on your machine by default for the core export path.</p>
              <a href={CHROME_WEB_STORE_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
                Add to Chrome
                <ArrowRight className="btn-icon" size={18} aria-hidden />
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <Link to="/" className="logo">
            <Video size={20} className="logo-icon" aria-hidden />
            <span className="logo-text">Simple Screen Recorder</span>
          </Link>
          <div className="footer-links">
            <a href={CHROME_WEB_STORE_URL} target="_blank" rel="noreferrer">
              Chrome Web Store
            </a>
            <a href={SUPPORT_MAILTO} title={SUPPORT_MAILTO_TITLE}>
              Contact
            </a>
            <Link to={PRIVACY_POLICY_URL}>Privacy</Link>
            <Link to={TERMS_URL}>Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
