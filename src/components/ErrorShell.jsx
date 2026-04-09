import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowLeft, ArrowRight } from 'lucide-react';
import { CHROME_WEB_STORE_URL, SUPPORT_MAILTO } from '../config';
import '../App.css';
import '../legal.css';

const DEFAULT_TITLE = 'Simple Screen Recorder | Chrome screen recorder with zoom & local export';

export default function ErrorShell({ code, title, description, documentTitle }) {
  useEffect(() => {
    document.title = documentTitle;
    window.scrollTo(0, 0);
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [documentTitle]);

  return (
    <div className="error-page">
      <header className="legal-header">
        <div className="container legal-header-inner">
          <Link to="/" className="logo">
            <Video size={20} className="logo-icon" aria-hidden />
            <span className="logo-text">Simple Screen Recorder</span>
          </Link>
          <div className="legal-header-actions">
            <a href={SUPPORT_MAILTO} className="legal-header-link">
              Contact
            </a>
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

      <main className="error-main container">
        <p className="error-code" aria-hidden="true">
          {code}
        </p>
        <h1 className="error-title">{title}</h1>
        <p className="error-desc">{description}</p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary error-btn-home">
            <ArrowLeft size={18} className="error-btn-home-icon" aria-hidden />
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
