import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { Page } from './data/site';

export function render(page: Page = 'home'): string {
  return renderToString(
    <StrictMode>
      <App page={page} />
    </StrictMode>,
  );
}
