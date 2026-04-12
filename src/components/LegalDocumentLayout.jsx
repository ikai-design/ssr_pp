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
      document.title = 'Simple Screen Recorder | Chrome screen recorder with zoom & local export';
    };
  }, [title]);

  return (
    <div className="legal-layout">
      <header className="legal-header">
        <div className="container legal-header-inner">
          <Link to="/" className="logo">
            <Video size={20} className="logo-icon" aria-hidden />
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
        </div>
      </footer>
    </div>
  );
}
