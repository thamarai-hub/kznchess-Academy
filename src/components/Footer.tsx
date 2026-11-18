import { academy, DONATE_PATH, fullAddress, logo, navItems, sectionHref, whatsappLink, type Page } from '../data/site';
import { container, Icon } from './ui';

const learning = ['Online Chess Classes', 'Group Chess Classes', 'Private Chess Coaching', 'Chess in Schools', 'Chess in the Community', 'Infinite Chess'];

export default function Footer({ page = 'home' }: { page?: Page }) {
  const href = (id: string) => sectionHref(page, id);
  const year = new Date().getFullYear();
  const link = 'inline-flex min-h-9 items-center text-white/75 hover:text-white';
  const social = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold';
  return (
    <footer className="bg-navy-deep pt-16 pb-28 text-white sm:pb-12">
      <div className={container}>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] lg:gap-10">
          <div>
            <a href={page === 'home' ? '#home' : '/'} className="inline-block rounded-2xl bg-white p-3" aria-label={page === 'home' ? 'KZN Chess Academy, back to top' : 'KZN Chess Academy home'}>
              <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} loading="lazy" className="h-14 w-auto" />
            </a>
            <p className="mt-6 max-w-xs leading-relaxed text-white/70">
              A licensed FIDE Tier-2 Academy founded in 2015, offering chess classes and coaching for children and schools in
              Durban and across KwaZulu-Natal.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-gold">Explore</h2>
            <ul className="mt-4 space-y-1">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={href(n.id)} className={link}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href={href('faq')} className={link}>FAQs</a>
              </li>
              <li>
                <a href={DONATE_PATH} className={link} aria-current={page === 'donate' ? 'page' : undefined}>Donate</a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-gold">Programmes</h2>
            <ul className="mt-4 space-y-1">
              {learning.map((p) => (
                <li key={p}>
                  <a href={href('programmes')} className={link}>{p}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gold">Contact</h2>
            <address className="mt-4 space-y-3 text-white/75 not-italic">
              <p className="leading-relaxed">{fullAddress}</p>
              <p><a href={academy.phoneHref} className="hover:text-white">{academy.phoneDisplay}</a></p>
              <p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp {academy.whatsappDisplay}</a></p>
              <p><a href={`mailto:${academy.email}`} className="break-all hover:text-white">{academy.email}</a></p>
            </address>
            <div className="mt-6 flex gap-3">
              <a href={academy.facebook} target="_blank" rel="noopener noreferrer" className={social}>
                <span className="sr-only">KZN Chess Academy on Facebook</span>
                <Icon.Facebook className="h-5 w-5" />
              </a>
              <a href={academy.instagram} target="_blank" rel="noopener noreferrer" className={social}>
                <span className="sr-only">KZN Chess Academy on Instagram</span>
                <Icon.Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-sm text-white/60">
          <p suppressHydrationWarning>© {year} KZN Chess Academy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
