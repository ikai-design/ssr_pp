import { Link } from 'react-router-dom';
import LegalDocumentLayout from '../components/LegalDocumentLayout';
import {
  LEGAL_ENTITY_PLACEHOLDER,
  LEGAL_ADDRESS_PLACEHOLDER,
  LEGAL_KVK_NUMBER,
  LEGAL_JURISDICTION_PLACEHOLDER,
  LEGAL_EFFECTIVE_DATE,
  PRIVACY_POLICY_URL,
  SUPPORT_MAILTO,
  SUPPORT_MAILTO_TITLE,
  TERMS_PUBLIC_URL,
} from '../config';

export default function TermsOfService() {
  return (
    <LegalDocumentLayout
      title="Terms of Service"
      meta={`Effective date: ${LEGAL_EFFECTIVE_DATE} · Last updated: ${LEGAL_EFFECTIVE_DATE}`}
      canonicalHref={TERMS_PUBLIC_URL || undefined}
    >
      <section className="legal-section" aria-labelledby="t-accept">
        <h2 id="t-accept">1. Agreement to these terms</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern access to and use of the Simple Screen Recorder marketing
          website (the &quot;Site&quot;) and the Simple Screen Recorder browser extension made available through the
          Google Chrome Web Store (the &quot;Extension&quot;), collectively the &quot;Services,&quot; operated by{' '}
          {LEGAL_ENTITY_PLACEHOLDER} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
        </p>
        <p>
          By installing the Extension, browsing the Site, or otherwise using the Services, you agree to these Terms and our{' '}
          <Link to={PRIVACY_POLICY_URL}>Privacy Policy</Link>. If you do not agree, do not use the Services.
        </p>
        <p className="legal-note">
          <strong>Not legal advice.</strong> These Terms are a commercial template. Have them reviewed by counsel in
          your jurisdiction—particularly governing law, dispute resolution, and consumer rules.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-eligibility">
        <h2 id="t-eligibility">2. Eligibility and account</h2>
        <p>
          You represent that you have the legal capacity to enter into these Terms. If you use the Services on behalf of
          an organization, you represent that you have authority to bind that organization. The Services do not require
          an account for the core Extension workflow as currently described; optional account features, if introduced,
          will be subject to supplemental terms.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-license">
        <h2 id="t-license">3. License grant</h2>
        <p>
          Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable license to
          install and use the Extension in accordance with its documentation and the Chrome Web Store policies. You may
          access the Site for informational purposes. No other rights are granted by implication or estoppel.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-conduct">
        <h2 id="t-conduct">4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Services in violation of law, regulation, or third-party rights.</li>
          <li>Record individuals or sensitive content without obtaining legally required consent or authority.</li>
          <li>Reverse engineer, decompile, or attempt to extract source code from the Extension except where mandatory law
            permits.</li>
          <li>Interfere with or disrupt the Services, circumvent technical limits, or probe systems without authorization.</li>
          <li>Use the Services to transmit malware, conduct unlawful surveillance, or harass others.</li>
          <li>Remove or alter proprietary notices or misrepresent affiliation with us.</li>
        </ul>
      </section>

      <section className="legal-section" aria-labelledby="t-recording">
        <h2 id="t-recording">5. Recording, consent, and compliance</h2>
        <p>
          You are solely responsible for ensuring your recordings comply with workplace policies, contracts,
          confidentiality obligations, wiretapping / surveillance / biometric laws, and any rules applicable in the
          jurisdictions where you and your subjects are located. We do not monitor your recordings and do not provide
          legal guidance. If you are unsure whether a recording is lawful, do not proceed without professional advice.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-ip">
        <h2 id="t-ip">6. Intellectual property</h2>
        <p>
          The Services, including software, branding, and documentation, are owned by us or our licensors and protected
          by intellectual property laws. Except for the limited license above, no rights are granted. You retain all
          rights in content you create using the Extension, subject to third-party materials appearing in your captures.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-thirdparty">
        <h2 id="t-thirdparty">7. Third-party software and services</h2>
        <p>
          The Extension operates in Google Chrome and may rely on components such as FFmpeg.wasm for local transcoding.
          Those components are subject to their own licenses. Your use of Chrome and the Chrome Web Store is subject to
          Google&apos;s terms and policies. We are not responsible for third-party services.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-disclaimer">
        <h2 id="t-disclaimer">8. Disclaimers</h2>
        <p>
          THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY
          LAW, WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT that the Services will be uninterrupted,
          error-free, or free of harmful components, or that recordings will meet any quality or regulatory standard.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-liability">
        <h2 id="t-liability">9. Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE (OR OUR DIRECTORS, EMPLOYEES, OR SUPPLIERS) BE LIABLE
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS,
          DATA, GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO THE SERVICES, EVEN IF ADVISED OF THE
          POSSIBILITY. OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES WILL NOT EXCEED THE GREATER OF (A)
          THE AMOUNTS YOU PAID US FOR THE SERVICES DURING THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR (B) FIFTY U.S.
          DOLLARS (US$50), IF THE EXTENSION IS OFFERED WITHOUT A FEE.
        </p>
        <p>
          Some jurisdictions do not allow certain limitations; in those jurisdictions, our liability is limited to the
          maximum permitted by law.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-indemnity">
        <h2 id="t-indemnity">10. Indemnification</h2>
        <p>
          You will defend, indemnify, and hold harmless {LEGAL_ENTITY_PLACEHOLDER} and its affiliates from any claims,
          damages, losses, and expenses (including reasonable attorneys&apos; fees) arising out of your use of the
          Services, your recordings, your violation of these Terms, or your violation of third-party rights.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-suspension">
        <h2 id="t-suspension">11. Termination</h2>
        <p>
          You may stop using the Services at any time by uninstalling the Extension and ceasing use of the Site. We may
          suspend or terminate access if you materially breach these Terms, if required by law, or to protect other users.
          Provisions that by their nature should survive (including intellectual property, disclaimers, limitation of
          liability, indemnity, and dispute resolution) will survive termination.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-export">
        <h2 id="t-export">12. Export and sanctions</h2>
        <p>
          You represent that you are not located in, or ordinarily resident in, a country or region subject to comprehensive
          embargoes or sanctions where use of the Services would be prohibited, and that you are not a denied party. You
          comply with applicable export control laws.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-law">
        <h2 id="t-law">13. Governing law and disputes</h2>
        <p>
          These Terms are governed by the laws of {LEGAL_JURISDICTION_PLACEHOLDER}, without regard to conflict-of-law
          rules. You agree that exclusive venue for disputes will be in the courts located in that jurisdiction, subject
          to mandatory consumer protections that cannot be waived in your country of residence.
        </p>
        <p>
          If you are a consumer in the EEA, UK, or Switzerland, you may also have the right to initiate a dispute via an
          EU online dispute resolution platform or local consumer body where available.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-misc">
        <h2 id="t-misc">14. General provisions</h2>
        <p>
          <strong>Entire agreement.</strong> These Terms and the Privacy Policy are the entire agreement regarding the
          Services and supersede prior oral or written understandings on the same subject.
        </p>
        <p>
          <strong>Severability.</strong> If any provision is invalid, the remaining provisions remain in effect.
        </p>
        <p>
          <strong>No waiver.</strong> Failure to enforce a provision is not a waiver.
        </p>
        <p>
          <strong>Assignment.</strong> You may not assign these Terms without our consent. We may assign them in
          connection with a merger or sale of assets.
        </p>
        <p>
          <strong>Notices.</strong> We may provide notice via the Site, Extension update notes, or email if you supply
          one. Formal notices to us should be sent to {LEGAL_ADDRESS_PLACEHOLDER} or the contact method on the Site.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="t-contact">
        <h2 id="t-contact">15. Contact</h2>
        <p>
          Questions about these Terms:{' '}
          <a href={SUPPORT_MAILTO} title={SUPPORT_MAILTO_TITLE}>
            support contact on the Site
          </a>
          .
        </p>
        <p>
          <strong>Operator:</strong> {LEGAL_ENTITY_PLACEHOLDER}, {LEGAL_ADDRESS_PLACEHOLDER}.{' '}
          <strong>KVK:</strong> {LEGAL_KVK_NUMBER}.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
