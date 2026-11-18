import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import type { Page } from './data/site';
import './index.css';

const root = document.getElementById('root')!;
// Each HTML entry declares which page it is: <div id="root" data-page="donate">.
const page: Page = root.dataset.page === 'donate' ? 'donate' : 'home';
const app = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
);

// The production build prerenders each page (scripts/prerender.mjs), so hydrate when markup exists.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
