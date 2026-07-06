import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import RouteResetErrorBoundary from './components/RouteResetErrorBoundary.jsx';

/** Renders the app for a given URL at build time (see scripts/prerender.mjs). */
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <RouteResetErrorBoundary>
          <App />
        </RouteResetErrorBoundary>
      </StaticRouter>
    </StrictMode>,
  );
}
