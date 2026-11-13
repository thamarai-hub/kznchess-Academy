import { photos, whatsappLink } from '../data/site';
import { btnOutline, btnPrimary, container, Icon, Img } from './ui';

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      {/* Soft wash behind the photo column on large screens */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] bg-mist lg:block" />

      <div className={`${container} relative grid items-center gap-10 pt-10 pb-14 sm:pt-14 lg:min-h-[640px] lg:grid-cols-12 lg:gap-8 lg:py-20`}>
        <div className="lg:col-span-6 lg:pr-4">
          <p className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold-soft/60 px-3.5 py-1.5 text-[13px] font-semibold text-gold-ink">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
            Established in 2015 <span aria-hidden="true" className="text-gold">|</span> FIDE Tier-2 Academy
          </p>

          <h1
            id="hero-title"
            className="hero-in hero-in-2 text-[2.6rem] leading-[1.04] font-extrabold tracking-[-0.03em] text-navy text-balance sm:text-[3.4rem] lg:text-[4rem]"
          >
            Developing Young Minds Through Chess
          </h1>

          <p className="hero-in hero-in-3 mt-6 max-w-[34rem] text-[17px] leading-relaxed text-slate sm:text-lg">
            From first moves to championship ambitions, KZN Chess Academy helps young learners develop confidence,
            critical thinking and a lifelong love for chess through expert coaching.
          </p>

          <div className="hero-in hero-in-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#programmes" className={btnPrimary}>
              Explore Our Programmes
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={btnOutline}>
              <Icon.WhatsApp className="h-5 w-5 text-whatsapp" />
              Enquire on WhatsApp
            </a>
          </div>

          <p className="hero-in hero-in-4 mt-8 text-sm text-slate">
            Chess classes in Umhlanga, Durban and across KwaZulu-Natal, with online coaching too.
          </p>
        </div>

        <div className="relative lg:col-span-6">
          {/* Gold checker corner: the site's signature motif */}
          <div aria-hidden="true" className="checker absolute -bottom-5 -left-5 hidden h-36 w-36 text-gold/70 sm:block" />
          <div aria-hidden="true" className="absolute -top-5 -right-5 hidden h-24 w-24 rounded-2xl border-2 border-navy/10 lg:block" />
          <figure className="hero-photo relative overflow-hidden rounded-[28px] bg-mist shadow-[0_30px_60px_-30px_rgba(16,43,78,0.45)]">
            <Img
              photo={photos.heroLearner}
              eager
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] w-full object-cover object-[50%_40%] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <figcaption className="bg-white px-4 py-3 text-sm text-ink sm:absolute sm:right-4 sm:bottom-4 sm:max-w-[17rem] sm:rounded-2xl sm:bg-white/92 sm:backdrop-blur">
              <span className="font-semibold text-navy">Every game is a lesson.</span>{' '}
              <span className="text-slate">{photos.heroLearner.caption}.</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
