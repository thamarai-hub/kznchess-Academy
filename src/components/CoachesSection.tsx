import { coaches } from '../data/site';
import { container, SectionHeading } from './ui';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('');

export default function CoachesSection() {
  return (
    <section id="coaches" aria-labelledby="coaches-title" className="bg-mist py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="coaches-title"
          kicker="Our coaches"
          title="Learn From Experienced Chess Professionals"
          intro="Our coaching team brings together national and international titled players, FIDE-qualified trainers and provincial champions."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map((c) => (
            <li key={c.name} className="reveal flex overflow-hidden rounded-[22px] border border-line bg-white sm:flex-col">
              {/* Coach photographs have not been supplied yet; a monogram tile stands in.
                  To add a photo, replace this block with <img src="/images/coach-<name>.webp" ... />. */}
              <div className="relative flex w-28 shrink-0 items-center justify-center overflow-hidden bg-navy sm:aspect-[5/4] sm:w-auto">
                <div aria-hidden="true" className="checker absolute inset-0 text-white/[0.04]" />
                <span aria-hidden="true" className="relative text-4xl font-extrabold sm:text-6xl tracking-tight text-gold">
                  {initials(c.name)}
                </span>
                {c.titleAbbr && (
                  <span className="absolute top-3 left-3 rounded-md bg-gold sm:top-4 sm:left-4 px-2 py-0.5 text-[13px] font-bold text-navy" title={c.title}>
                    {c.titleAbbr}
                  </span>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                {c.title && <p className="text-sm font-semibold text-gold-ink">{c.title}</p>}
                <h3 className="mt-1 text-xl font-bold tracking-tight text-navy">{c.name}</h3>
                {c.role && <p className="mt-1 font-medium text-royal">{c.role}</p>}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.credentials.map((cr) => (
                    <li key={cr} className="rounded-full border border-line bg-mist px-3 py-1 text-[13px] font-medium text-ink">
                      {cr}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
