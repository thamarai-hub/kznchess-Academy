import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build prerenders the page (scripts/prerender.mjs), so hydrate when markup exists.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
