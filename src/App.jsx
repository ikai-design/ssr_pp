import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LandingPageSandbox from './pages/sandbox/LandingPageSandbox';
import LandingPageV2 from './pages/v2/LandingPageV2';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageV2 />} />
      <Route path="/v1" element={<LandingPage />} />
      <Route path="/sandbox" element={<LandingPageSandbox />} />
      <Route path="/v2" element={<LandingPageV2 />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/error" element={<ServerError />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
