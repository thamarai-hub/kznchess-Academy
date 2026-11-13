# KZN Chess Academy website

Single-page, mobile-first website for KZN Chess Academy (https://kznchessacademy.org), built with React, TypeScript, Tailwind CSS v4 and Vite. The production build is prerendered, so search engines and social previews receive the full page as HTML.

## Run it

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # type-check, build and prerender into dist/
npm run preview   # serve the production build locally
```

Deploy the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, cPanel hosting, etc.) and point `kznchessacademy.org` at it.

## Where things live

| What | File |
| --- | --- |
| All academy details (phone, email, WhatsApp, address, socials, coaches, FAQs, photo captions) | `src/data/site.ts` |
| Brand colours and font | `src/index.css` (`@theme` block) |
| Page title, meta description, Open Graph, structured data | `index.html` |
| Sections | `src/components/*.tsx` (one component per section) |
| Images | `public/images/` |
| robots.txt and sitemap | `public/` |

Change academy details in `src/data/site.ts` only; every section reads from there. If you change the FAQs or contact details, update the matching JSON-LD in `index.html` too.

## Enquiry form

The form validates every field. `FORM_ENDPOINT` in `src/data/site.ts` controls delivery:

- **Empty (current setting):** after validation the visitor is shown a clear "ready to send, not yet delivered" message with two buttons that open WhatsApp or their email app with the enquiry already written. The site never claims the enquiry was submitted.
- **Set to a URL** (for example a Formspree form URL or a serverless function that accepts a JSON POST): the form posts to it and shows "Enquiry sent" only when the server responds successfully. If the request fails, the WhatsApp and email options appear instead.

## Photo asset map

| Uploaded file | Web asset (`public/images/`) | Used in |
| --- | --- | --- |
| IMG-20250720-WA0066.jpg | community-match-young-learner.webp | Hero, gallery |
| IMG-20170317-WA0005.jpg | school-chess-class.webp | About, Chess in Schools, gallery |
| IMG-20250720-WA0068.jpg | durban-community-chess-day.webp | Chess in the Community, gallery |
| Picture2.jpg | inclusive-chess-outreach.webp | Infinite Chess, gallery |
| IMG-20260210-WA0006.jpg | mzansi-2025-player-portrait.webp | Why choose us, gallery |
| FB_IMG_1767172929634.jpg | mzansi-2025-team-trophy.webp | Achievements, gallery, social share image (og-image.jpg) |
| IMG-20251217-WA0040.jpg | team-on-tour.webp | Achievements, gallery |
| 571803413_…_n.jpg | tournament-outdoor-round.webp | Achievements, gallery |
| FB_IMG_1767172907820.jpg | mzansi-2025-team-juniors.webp | Achievements, gallery |
| Picture4.jpg | international-prize-giving.webp | Achievements, gallery |
| FB_IMG_1755339869250.jpg | schools-team-huddle.webp | Mission and vision, gallery |
| FB_IMG_1767172956998.jpg | mzansi-2025-team-squad.webp | Gallery |
| IMG-20250(3).jpg | tournament-evening-round.webp | Gallery |
| Picture1.jpg | indoor-chess-event.webp | Gallery |
| IMG-20250723-WA0011.jpg | community-chess-session.webp | Gallery |
| IMG-20250806-WA0014.jpg | community-chess-games.webp | Gallery |
| images (4).jpg | woman-in-chess-awards.webp | Gallery |
| KZN Chess Academy Logo - Mustard.jpg | kzn-chess-academy-logo.webp, favicon.png | Header, footer, browser tab |

Not used, on purpose:

- **IMG_20260420_125538.jpg**: a championship entry form showing children's names, dates of birth and disability information. It must not be published.
- **IMG-20260129-WA0012.jpg** (Her Move Africa) and **TheGiftofChess (1).png**: partner logos, which the brief asked not to add without approval.
- **FB_IMG_1684784736846.jpg**: a conference photo whose context and people couldn't be identified.

## Before launch

1. **Coach photos.** Each coach card shows a monogram for now. Add portraits as `public/images/coach-<surname>.webp` and replace the monogram block in `src/components/CoachesSection.tsx`.
2. **Coach name spelling.** The onboarding form says "Minenhle Ngcongo"; the brief said "Minehle". The site uses the form's spelling.
3. **Email address.** The onboarding form reads `info@kznchessacdemy.org` (missing an "a"). The site uses `info@kznchessacademy.org`; confirm that inbox receives mail.
4. **Photo consent.** Confirm the academy has parental consent to publish photos of the children shown.
5. **Form delivery.** Optionally set `FORM_ENDPOINT` (see above).
6. **Class days and times.** Only the 09:00–18:00 window is shown; add a timetable if the academy wants one published.
7. **Logo resolution.** The supplied logo is 767 × 558 px. A vector (SVG) version would look sharper on high-resolution screens.
8. After deploying, submit `https://kznchessacademy.org/sitemap.xml` in Google Search Console and create or claim the academy's Google Business Profile with the same address and phone number.
