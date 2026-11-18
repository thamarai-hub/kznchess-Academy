import type { ReactNode, SVGProps } from 'react';
import type { Photo } from '../data/site';

export const container = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8';

export const btnBase =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] whitespace-nowrap font-semibold transition-colors duration-200 focus-visible:outline-offset-4';
export const btnPrimary = `${btnBase} bg-royal text-white hover:bg-royal-dark`;
export const btnGold = `${btnBase} bg-gold text-navy hover:bg-[#e2b648]`;
export const btnOutline = `${btnBase} border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-mist`;
export const btnOutlineLight = `${btnBase} border border-white/35 text-white hover:border-white/70 hover:bg-white/10`;
export const btnWhatsApp = `${btnBase} bg-whatsapp text-white hover:bg-[#187a41]`;

type HeadingProps = {
  id?: string;
  kicker?: string;
  title: string;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
};

export function SectionHeading({ id, kicker, title, intro, align = 'left', tone = 'light' }: HeadingProps) {
  const center = align === 'center';
  const dark = tone === 'dark';
  return (
    <div className={`reveal ${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      {kicker && (
        <p className={`mb-3 flex items-center gap-2.5 text-sm font-semibold ${center ? 'justify-center' : ''} ${dark ? 'text-gold' : 'text-gold-ink'}`}>
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rotate-45 bg-gold" />
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className={`text-[2rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-balance sm:text-[2.6rem] ${dark ? 'text-white' : 'text-navy'}`}
      >
        {title}
      </h2>
      {intro && (
        <div className={`mt-4 text-[17px] leading-relaxed ${dark ? 'text-white/75' : 'text-slate'}`}>{intro}</div>
      )}
    </div>
  );
}

export function Img({ photo, className = '', eager = false, sizes }: { photo: Photo; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      sizes={sizes}
      className={className}
    />
  );
}

type IconProps = SVGProps<SVGSVGElement>;
const base = (p: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...p,
});

export const Icon = {
  WhatsApp: (p: IconProps) => (
    <svg {...base(p)} viewBox="0 0 32 32" fill="currentColor" stroke="none">
      <path d="M16.04 3C8.86 3 3.02 8.82 3.02 15.98c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.75a13.04 13.04 0 0 0 6.33 1.62h.01c7.18 0 13.02-5.82 13.02-12.98C29.06 8.82 23.22 3 16.04 3Zm0 23.68h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.23-3.97 1.04 1.06-3.86-.26-.4a10.7 10.7 0 0 1-1.65-5.75c0-5.95 4.85-10.79 10.82-10.79 5.96 0 10.81 4.84 10.81 10.8 0 5.94-4.85 10.79-10.9 10.79Zm5.93-8.08c-.32-.16-1.92-.95-2.22-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.33-.16-1.38-.5-2.62-1.6a9.8 9.8 0 0 1-1.81-2.25c-.19-.32-.02-.5.14-.66.15-.14.33-.38.49-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.11 1.32 3.33.16.21 2.28 3.47 5.51 4.86.77.33 1.37.53 1.84.68.77.24 1.48.21 2.03.13.62-.09 1.92-.78 2.19-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  ),
  Phone: (p: IconProps) => (
    <svg {...base(p)}><path d="M5 4h3.5l1.6 4.2-2.1 1.4a11 11 0 0 0 6.4 6.4l1.4-2.1L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" /></svg>
  ),
  Mail: (p: IconProps) => (
    <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
  ),
  Pin: (p: IconProps) => (
    <svg {...base(p)}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
  ),
  Clock: (p: IconProps) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
  ),
  Monitor: (p: IconProps) => (
    <svg {...base(p)}><rect x="3" y="4.5" width="18" height="12" rx="2" /><path d="M9 20h6M12 16.5V20" /><path d="M8 8.5h2v2H8zM10 10.5h2v2h-2zM12 8.5h2v2h-2zM14 10.5h2v2h-2z" fill="currentColor" stroke="none" /></svg>
  ),
  Group: (p: IconProps) => (
    <svg {...base(p)}><circle cx="8" cy="8.5" r="2.6" /><circle cx="16" cy="8.5" r="2.6" /><path d="M3.5 18.5a4.5 4.5 0 0 1 9 0M11.5 18.5a4.5 4.5 0 0 1 9 0" /></svg>
  ),
  Person: (p: IconProps) => (
    <svg {...base(p)}><circle cx="12" cy="8" r="3.3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>
  ),
  Trophy: (p: IconProps) => (
    <svg {...base(p)}><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v3.5M8.5 20h7M10 16.5h4l.5 3.5h-5l.5-3.5Z" /></svg>
  ),
  Rook: (p: IconProps) => (
    <svg {...base(p)}><path d="M7 4h2v2h2V4h2v2h2V4h2v4l-2 2v6l2 2v2H7v-2l2-2v-6L7 8V4Z" /></svg>
  ),
  Shield: (p: IconProps) => (
    <svg {...base(p)}><path d="M12 3.5 5 6v5.5c0 4.4 3 7.8 7 9 4-1.2 7-4.6 7-9V6l-7-2.5Z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  Medal: (p: IconProps) => (
    <svg {...base(p)}><path d="m8 3 4 6 4-6" /><circle cx="12" cy="15" r="5.5" /><path d="m12 12.5.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2.8-1.6Z" /></svg>
  ),
  Calendar: (p: IconProps) => (
    <svg {...base(p)}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>
  ),
  Close: (p: IconProps) => (
    <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
  ),
  ChevronLeft: (p: IconProps) => (
    <svg {...base(p)}><path d="m15 5-7 7 7 7" /></svg>
  ),
  ChevronRight: (p: IconProps) => (
    <svg {...base(p)}><path d="m9 5 7 7-7 7" /></svg>
  ),
  Plus: (p: IconProps) => (
    <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
  ),
  Menu: (p: IconProps) => (
    <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  Facebook: (p: IconProps) => (
    <svg {...base(p)} fill="currentColor" stroke="none"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.6v3h2.6V21h3.3Z" /></svg>
  ),
  Instagram: (p: IconProps) => (
    <svg {...base(p)}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
  ),
  Heart: (p: IconProps) => (
    <svg {...base(p)}><path d="M12 20s-7.5-4.5-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.5 12 20 12 20Z" /></svg>
  ),
  Spark: (p: IconProps) => (
    <svg {...base(p)}><path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.6 2.6M15.4 15.4 18 18M6 18l2.6-2.6M15.4 8.6 18 6" /></svg>
  ),
  Bank: (p: IconProps) => (
    <svg {...base(p)}><path d="M3.5 9.5 12 4l8.5 5.5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3.5 20h17" /></svg>
  ),
  Box: (p: IconProps) => (
    <svg {...base(p)}><path d="m12 3.5 8 4v9l-8 4-8-4v-9l8-4Z" /><path d="m4 7.5 8 4 8-4M12 11.5v9" /></svg>
  ),
  Briefcase: (p: IconProps) => (
    <svg {...base(p)}><rect x="3.5" y="7.5" width="17" height="12" rx="2.5" /><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17M10.5 12.5v1.5h3v-1.5" /></svg>
  ),
  Copy: (p: IconProps) => (
    <svg {...base(p)}><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></svg>
  ),
  Check: (p: IconProps) => (
    <svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
  ),
  Puzzle: (p: IconProps) => (
    <svg {...base(p)}><path d="M9 4h3.5a1.8 1.8 0 1 1 3.5 0H19v4a1.8 1.8 0 1 0 0 3.5V15h-3a1.8 1.8 0 1 0-3.5 0H9v-3.5a1.8 1.8 0 1 1 0-3.5V4Z" /></svg>
  ),
};
