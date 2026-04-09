import { Link } from 'react-router-dom';
import LegalDocumentLayout from '../components/LegalDocumentLayout';
import {
  LEGAL_ENTITY_PLACEHOLDER,
  LEGAL_ADDRESS_PLACEHOLDER,
  LEGAL_EFFECTIVE_DATE,
  TERMS_URL,
  SUPPORT_MAILTO,
} from '../config';

export default function PrivacyPolicy() {
  return (
    <LegalDocumentLayout
      title="Privacy Policy"
      meta={`Effective date: ${LEGAL_EFFECTIVE_DATE} · Last updated: ${LEGAL_EFFECTIVE_DATE}`}
    >
      <section className="legal-section" aria-labelledby="p-intro">
        <h2 id="p-intro">1. Introduction and scope</h2>
        <p>
          This Privacy Policy (&quot;Policy&quot;) describes how {LEGAL_ENTITY_PLACEHOLDER} (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and otherwise processes information in
          connection with (a) the marketing website for Simple Screen Recorder (the &quot;Site&quot;), and (b) the
          Simple Screen Recorder browser extension distributed through the Chrome Web Store (the
          &quot;Extension&quot;). Together, the Site and Extension are referred to as the &quot;Services.&quot;
        </p>
        <p>
          By using the Services, you acknowledge that you have read this Policy. If you do not agree, do not use the
          Services. Capitalized terms used in this Policy and not defined here have the meaning given in our{' '}
          <Link to={TERMS_URL}>Terms of Service</Link>.
        </p>
        <p className="legal-note">
          <strong>Not legal advice.</strong> This Policy is provided for transparency. It does not create rights for
          third parties and is not a substitute for professional advice. Laws vary by jurisdiction; consult qualified
          counsel for obligations specific to your situation.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-controller">
        <h2 id="p-controller">2. Data controller and contact</h2>
        <p>
          For purposes of applicable data protection law, the controller responsible for personal data processed in
          connection with the Services is:
        </p>
        <ul>
          <li>
            <strong>Legal entity:</strong> {LEGAL_ENTITY_PLACEHOLDER}
          </li>
          <li>
            <strong>Address:</strong> {LEGAL_ADDRESS_PLACEHOLDER}
          </li>
          <li>
            <strong>Email:</strong>{' '}
            <a href={SUPPORT_MAILTO}>support (see Site footer)</a>
          </li>
        </ul>
        <p>
          Before publication, ensure these details match the information you provide to the Chrome Web Store and any
          applicable regulatory filings.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-summary">
        <h2 id="p-summary">3. Plain-language summary (non-binding)</h2>
        <p>
          The Extension is designed so that <strong>screen recordings and exports are handled locally on your
          device</strong> for the core workflow. We do not operate a default cloud pipeline that receives your finished
          recordings merely because you used the Extension. Certain technical signals and limited metadata may still be
          processed (for example, through Chrome, update mechanisms, or support correspondence you initiate). The Site
          may process standard server and analytics data as described below.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-collect">
        <h2 id="p-collect">4. Categories of information we may process</h2>
        <p>Depending on how you interact with us, we may process:</p>
        <ul>
          <li>
            <strong>Extension and capture-related technical data.</strong> Information necessary to run the Extension in
            Chrome (for example, permission states, internal storage of preferences you set, error logs that remain on
            your device unless you choose to send them to us). Video, audio, and cursor trajectories recorded using the
            Extension are processed <strong>on-device</strong> during the default export path described in our product
            materials.
          </li>
          <li>
            <strong>Site usage and communications.</strong> If you email support, we process the content of your message
            and associated metadata (such as headers, timestamps). The Site may log technical data including IP address,
            user agent, referring URL, and pages viewed, consistent with our hosting or analytics configuration.
          </li>
          <li>
            <strong>Chrome Web Store / Google account data.</strong> Google may process information when you install or
            update the Extension. That processing is governed by Google&apos;s policies and your Google account
            settings. We do not control Google&apos;s processing.
          </li>
          <li>
            <strong>Optional features.</strong> If we introduce optional cloud or account-based features, we will describe
            what is collected and obtain consent or another lawful basis where required <strong>before</strong> those
            features process your content.
          </li>
        </ul>
      </section>

      <section className="legal-section" aria-labelledby="p-purposes">
        <h2 id="p-purposes">5. Purposes and legal bases (EEA/UK reference)</h2>
        <p>Where the EU or UK General Data Protection Regulation applies, we rely on one or more of the following:</p>
        <ul>
          <li>
            <strong>Performance of a contract</strong> or pre-contractual steps (responding to your inquiries).
          </li>
          <li>
            <strong>Legitimate interests</strong> (operating and securing the Site, improving the Extension, fraud
            prevention, enforcing our terms, and communicating administrative notices), balanced against your rights.
          </li>
          <li>
            <strong>Consent</strong>, where required for non-essential cookies, marketing, or voluntary analytics.
          </li>
          <li>
            <strong>Legal obligation</strong> (tax, compliance, court orders).
          </li>
        </ul>
      </section>

      <section className="legal-section" aria-labelledby="p-local">
        <h2 id="p-local">6. Local processing by the Extension</h2>
        <p>
          Simple Screen Recorder uses Chrome APIs to capture tab or screen content you expressly choose to record and
          to provide editing and export features. For the default workflow, encoding and export (including use of
          bundled components such as FFmpeg.wasm where available) occur in your browser environment. We do not receive
          a copy of your recording merely because you exported it locally.
        </p>
        <p>
          The Extension may inject limited scripts on pages you record for accuracy of zoom-to-cursor behavior. Those
          mechanisms are used for capture functionality, not for building an advertising profile of your browsing across
          sites.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-permissions">
        <h2 id="p-permissions">7. Chrome permissions and storage</h2>
        <p>
          The Extension requests only permissions reasonably necessary for its stated features (for example, active tab /
          desktop capture, storage of user preferences, and host access consistent with Chrome Web Store disclosures). If
          you revoke permissions, certain features will not function. You may uninstall the Extension at any time via
          Chrome&apos;s extension manager, which stops further processing by the Extension on your device.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-sharing">
        <h2 id="p-sharing">8. Disclosure to third parties</h2>
        <p>We may share information with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> who assist us (hosting, email delivery, security tooling), bound by
            confidentiality and processing terms.
          </li>
          <li>
            <strong>Authorities</strong> where required by law or to protect rights, safety, or property.
          </li>
          <li>
            <strong>Corporate transactions</strong> such as a merger, provided successors are bound by appropriate
            confidentiality and continuity obligations.
          </li>
        </ul>
        <p>We do not sell personal information as a conventional &quot;sale&quot; for monetary consideration.</p>
      </section>

      <section className="legal-section" aria-labelledby="p-retention">
        <h2 id="p-retention">9. Retention</h2>
        <p>
          We retain personal data only as long as necessary for the purposes described, unless a longer period is
          required by law. Support emails are retained according to operational needs and legal hold requirements.
          Server logs, if collected, are rotated on a schedule consistent with security monitoring. Extension recordings
          remain under your control on your device unless you transmit them elsewhere.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-security">
        <h2 id="p-security">10. Security</h2>
        <p>
          We implement reasonable administrative, technical, and organizational measures designed to protect information
          we process. No method of transmission or storage is completely secure; you use the Services at your own risk
          subject to our Terms.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-transfers">
        <h2 id="p-transfers">11. International transfers</h2>
        <p>
          If you access the Services from outside the country where we operate, your information may be transferred
          across borders. Where required, we implement appropriate safeguards (such as Standard Contractual Clauses).
          Contact us for more detail.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-rights">
        <h2 id="p-rights">12. Your privacy rights</h2>
        <p>
          Depending on your location, you may have the right to access, rectify, delete, restrict, or port personal data
          we hold, and to object to certain processing. You may also lodge a complaint with a supervisory authority. To
          exercise rights, contact us using the details above. We may verify your request as permitted by law.
        </p>
        <p>
          <strong>California.</strong> California residents may have additional rights under the CCPA/CPRA (including
          knowing, deleting, and opting out of certain sharing). We describe our practices in this Policy; submit
          requests via the contact channel on the Site.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-children">
        <h2 id="p-children">13. Children</h2>
        <p>
          The Services are not directed to children under 16 (or the age required in your jurisdiction). We do not
          knowingly collect personal information from children. If you believe we have received such information, contact
          us and we will take appropriate steps to delete it.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-cookies">
        <h2 id="p-cookies">14. Cookies and similar technologies (Site)</h2>
        <p>
          We may use strictly necessary cookies for Site operation. Where we use optional analytics or marketing cookies,
          we will seek consent if required by law. You can control cookies through your browser settings.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-changes">
        <h2 id="p-changes">15. Changes to this Policy</h2>
        <p>
          We may update this Policy from time to time. We will post the revised version with an updated effective date.
          If changes are material and legally required, we will provide additional notice. Continued use after the effective
          date constitutes acceptance unless applicable law requires express consent.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="p-contact">
        <h2 id="p-contact">16. How to contact us</h2>
        <p>
          Questions about this Policy: use the support contact published on the Site (
          <a href={SUPPORT_MAILTO}>email</a>
          ). Replace placeholders in your published configuration so users can reach a live address.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
