import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  CHROME_WEB_STORE_URL,
  PRIVACY_POLICY_URL,
  TERMS_URL,
  SUPPORT_EMAIL,
  SUPPORT_MAILTO,
  SUPPORT_MAILTO_TITLE,
} from '../config';
import { useCanonicalLink } from '../hooks/useCanonicalLink';
import '../App.css';
import '../legal.css';

export default function LegalDocumentLayout({ title, meta, canonicalHref, children }) {
  useCanonicalLink(canonicalHref || null);

  useEffect(() => {
    document.title = `${title} | Simple Screen Recorder`;
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Simple Screen Recorder | Chrome screen recorder with guided zoom & local export';
    };
  }, [title]);

  return (
    <div className="app-wrapper app-wrapper--v2 legal-layout">
      <header className="legal-header">
        <div className="container legal-header-inner">
          <Link to="/" className="logo">
            <svg width="20" height="20" viewBox="87 75 473 499" className="logo-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M297.149 75C435.041 75 560 186.705 560 324.5C560 462.295 435.041 574 297.149 574C159.257 574 87 462.295 87 324.5C87 186.705 159.257 75 297.149 75Z" fill="currentColor"/>
              <rect x="235" y="249" width="56" height="151" rx="28" fill="white"/>
              <rect x="355" y="249" width="56" height="151" rx="28" fill="white"/>
            </svg>
            <span className="logo-text">Simple Screen Recorder</span>
          </Link>
          <div className="legal-header-actions">
            <a
              href={CHROME_WEB_STORE_URL}
              className="btn btn-primary btn-header-cta"
              target="_blank"
              rel="noreferrer"
            >
              Add to Chrome
              <ArrowRight className="btn-icon" size={16} aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <main className="legal-main">
        <article className="legal-doc container">
          <header className="legal-doc-header">
            <h1 className="legal-doc-title">{title}</h1>
            {meta ? <p className="legal-doc-meta">{meta}</p> : null}
          </header>
          <div className="legal-prose">{children}</div>
        </article>
      </main>

      <footer className="legal-footer">
        <div className="container legal-footer-inner">
          <div className="legal-footer-row">
            <Link to="/" className="legal-footer-back">
              <ArrowLeft size={16} className="legal-footer-back-icon" aria-hidden />
              Back to home
            </Link>
            <div className="legal-footer-links">
              <a href={SUPPORT_MAILTO} title={SUPPORT_MAILTO_TITLE} aria-label={`Email ${SUPPORT_EMAIL}`}>
                Contact
              </a>
              <Link to={PRIVACY_POLICY_URL}>Privacy</Link>
              <Link to={TERMS_URL}>Terms</Link>
            </div>
          </div>
          <div className="footer-copyright" style={{ marginTop: '2rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', width: '100%', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <span>© 2026 Simple Screen Recorder. All rights reserved.</span>
            <span>Independent Craft Product.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
