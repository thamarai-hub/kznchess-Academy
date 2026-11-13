import { photos } from '../data/site';
import { container, Img, SectionHeading } from './ui';

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-20 sm:py-28">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="reveal order-2 lg:order-1 lg:col-span-6">
          <figure className="relative">
            <Img photo={photos.schoolClass} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[16/10] w-full rounded-[24px] object-cover" />
            <figcaption className="mt-3 text-sm text-slate">{photos.schoolClass.caption}</figcaption>
            <div className="absolute -top-4 -right-3 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_18px_40px_-22px_rgba(16,43,78,0.45)] ring-1 ring-line sm:block">
              <p className="text-3xl font-extrabold tracking-tight text-navy">2015</p>
              <p className="text-[13px] font-medium text-slate">Founded in KwaZulu-Natal</p>
            </div>
          </figure>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <SectionHeading id="about-title" kicker="Welcome to KZN Chess Academy" title="More Than Chess. A Foundation for Life." />
          <div className="reveal mt-6 space-y-5 text-[17px] leading-relaxed text-slate">
            <p>
              KZN Chess Academy is a licensed FIDE Tier-2 Academy founded in 2015 by National Master Erick Takawira.
              Based in KwaZulu-Natal, we provide expert chess education for children and schools, helping young people
              develop skills that extend far beyond the chessboard.
            </p>
            <p>
              Our training combines individual attention, engaging group sessions and opportunities to participate in
              tournaments, camps and community initiatives.
            </p>
          </div>
          <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#mission" className="inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-gold decoration-2 underline-offset-[6px] hover:text-navy">
              Read our mission and vision
            </a>
            <a href="#coaches" className="inline-flex min-h-11 items-center font-semibold text-navy hover:text-royal">
              Meet the coaches
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
