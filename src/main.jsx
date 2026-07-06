import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './pages/v2/animations/animations.css';
import App from './App.jsx';
import RouteResetErrorBoundary from './components/RouteResetErrorBoundary.jsx';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <RouteResetErrorBoundary>
        <App />
      </RouteResetErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);

// Prerendered routes (scripts/prerender.mjs) ship markup inside #root — hydrate
// it to avoid a flash. Other routes can still receive prerendered markup via the
// GitHub Pages 404.html fallback (a copy of index.html), where the markup won't
// match the route — wipe it and client-render instead of hydrating a mismatch.
const PRERENDERED_PATHS = new Set(['/', '/privacy', '/privacy/', '/terms', '/terms/']);

if (container.hasChildNodes() && PRERENDERED_PATHS.has(window.location.pathname)) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
