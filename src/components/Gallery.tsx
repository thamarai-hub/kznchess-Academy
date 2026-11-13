import { useCallback, useEffect, useRef, useState } from 'react';
import { academy, galleryPhotos } from '../data/site';
import { container, Icon, Img, SectionHeading } from './ui';

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastIndex = useRef<number | null>(null);
  const touchX = useRef<number | null>(null);
  const total = galleryPhotos.length;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + total) % total)), [total]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % total)), [total]);

  const isOpen = index !== null;
  if (index !== null) lastIndex.current = index;

  // Move focus into the viewer on open and back to the photo on close.
  useEffect(() => {
    if (isOpen) closeBtn.current?.focus();
    else if (lastIndex.current !== null) triggers.current[lastIndex.current]?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Tab' && dialog.current) {
        // Keep keyboard focus inside the viewer.
        const f = Array.from(dialog.current.querySelectorAll<HTMLElement>('button')).filter((b) => b.offsetParent !== null);
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close, prev, next]);

  const current = index !== null ? galleryPhotos[index] : null;
  const roundBtn = 'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20';

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-white py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="gallery-title"
          kicker="Academy gallery"
          title="Moments That Make Every Move Count"
          intro="Classes, tournaments, school visits and community days. Select any photo to view it larger."
        />

        <ul className="mt-12 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          {galleryPhotos.map((photo, i) => (
            <li
              key={photo.src}
              className={`reveal ${i === 0 ? 'col-span-2 row-span-2' : ''} ${
                // Keeps the three-column tablet grid free of a ragged last row.
                i === galleryPhotos.length - 1 ? 'md:max-lg:hidden' : ''
              }`}
            >
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-mist"
                aria-label={`View photo ${i + 1} of ${total}: ${photo.caption ?? photo.alt}`}
              >
                <Img
                  photo={photo}
                  sizes={i === 0 ? '(min-width: 1024px) 600px, 100vw' : '(min-width: 1024px) 300px, 50vw'}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-navy/5 ring-inset" />
              </button>
            </li>
          ))}
        </ul>

        <p className="reveal mt-8 text-[15px] text-slate">
          See more on{' '}
          <a className="font-semibold text-royal underline decoration-gold decoration-2 underline-offset-4 hover:text-navy" href={academy.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>{' '}
          and{' '}
          <a className="font-semibold text-royal underline decoration-gold decoration-2 underline-offset-4 hover:text-navy" href={academy.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          .
        </p>
      </div>

      {current && index !== null && (
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer, photo ${index + 1} of ${total}`}
          className="fixed inset-0 z-[70] flex flex-col bg-navy-deep/95 backdrop-blur-sm"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm font-medium text-white/75" aria-live="polite">
              {index + 1} / {total}
            </p>
            <button ref={closeBtn} type="button" onClick={close} className={roundBtn}>
              <span className="sr-only">Close photo viewer</span>
              <Icon.Close />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 sm:px-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <button type="button" onClick={prev} className={`${roundBtn} shrink-0 max-sm:hidden`}>
              <span className="sr-only">Previous photo</span>
              <Icon.ChevronLeft />
            </button>
            <figure className="flex max-h-full min-w-0 flex-col items-center">
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="max-h-[calc(100dvh-12rem)] w-auto max-w-full rounded-xl object-contain"
              />
              {current.caption && <figcaption className="mt-4 max-w-xl text-center text-[15px] text-white/85">{current.caption}</figcaption>}
            </figure>
            <button type="button" onClick={next} className={`${roundBtn} shrink-0 max-sm:hidden`}>
              <span className="sr-only">Next photo</span>
              <Icon.ChevronRight />
            </button>
          </div>

          {/* Bottom controls on phones, within easy thumb reach */}
          <div className="flex justify-center gap-4 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:hidden">
            <button type="button" onClick={prev} className={roundBtn}>
              <span className="sr-only">Previous photo</span>
              <Icon.ChevronLeft />
            </button>
            <button type="button" onClick={next} className={roundBtn}>
              <span className="sr-only">Next photo</span>
              <Icon.ChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
