import { useEffect, useRef, useState } from 'react';
import { DONATE_PATH, logo, navItems, sectionHref, type Page } from '../data/site';
import { btnPrimary, container, Icon } from './ui';

export default function Header({ page = 'home' }: { page?: Page }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(page === 'home' ? 'home' : '');
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav item for the section currently in view (home page only).
  useEffect(() => {
    if (page !== 'home' || !('IntersectionObserver' in window)) return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [page]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const onDonate = page === 'donate';
  const href = (id: string) => sectionHref(page, id);
  const donateBtn = `inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-offset-4 ${
    onDonate ? 'bg-gold text-navy' : 'border border-gold bg-white text-navy hover:bg-gold-soft'
  }`;

  const linkClass = (id: string) =>
    `relative px-1 py-2 text-[15px] font-medium transition-colors ${
      active === id ? 'text-navy' : 'text-slate hover:text-navy'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_var(--color-line),0_8px_24px_-18px_rgba(16,43,78,0.35)]' : 'shadow-[0_1px_0_var(--color-line)]'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className={`${container} flex h-[72px] items-center justify-between gap-4`}>
        <a href={onDonate ? '/' : '#home'} className="flex shrink-0 items-center" aria-label={onDonate ? 'KZN Chess Academy home' : 'KZN Chess Academy, back to top'}>
          <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-12 w-auto sm:h-14" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-7">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={href(item.id)} className={linkClass(item.id)} aria-current={active === item.id ? 'true' : undefined}>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gold transition-opacity ${
                      active === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={DONATE_PATH} className={donateBtn} aria-current={onDonate ? 'page' : undefined}>
            <Icon.Heart className="h-[18px] w-[18px] text-gold-ink max-sm:hidden" />
            Donate
          </a>
          <a href={href('contact')} className={`${btnPrimary} !min-h-11 !px-4 max-[359px]:!hidden sm:!px-5`}>
            Enquire<span className="max-sm:hidden"> Now</span>
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panel} hidden={!open} className="border-t border-line bg-white lg:hidden">
        <nav aria-label="Mobile" className={`${container} py-4`}>
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center justify-between border-b border-line text-[17px] font-medium ${
                    active === item.id ? 'text-navy' : 'text-slate'
                  }`}
                >
                  {item.label}
                  {active === item.id && <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a href={href('contact')} onClick={() => setOpen(false)} className={`${btnPrimary} w-full`}>
              Enquire Now
            </a>
            <a href={DONATE_PATH} onClick={() => setOpen(false)} className={`${donateBtn} !min-h-12 w-full`} aria-current={onDonate ? 'page' : undefined}>
              <Icon.Heart className="h-[18px] w-[18px] text-gold-ink" />
              Donate to the academy
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
