import { photos } from '../data/site';
import { container, Img } from './ui';

export default function MissionVision() {
  return (
    <section id="mission" aria-labelledby="mission-title" className="bg-white py-20 sm:py-28">
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="mission-title" className="reveal flex items-center gap-2.5 text-sm font-semibold text-gold-ink">
              <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rotate-45 bg-gold" />
              Our mission
            </h2>
            <p className="reveal mt-5 text-[1.9rem] leading-[1.2] font-extrabold tracking-[-0.02em] text-navy text-balance sm:text-[2.6rem]">
              To develop young minds using chess as an educational tool and as a means of developing social and life skills.
            </p>

            <div className="reveal mt-14 border-l-[3px] border-gold pl-6 sm:pl-8">
              <h3 className="text-sm font-semibold text-gold-ink">Our vision</h3>
              <p className="mt-3 text-xl leading-snug font-bold tracking-tight text-navy sm:text-2xl">
                To create a future where chess is accessible to every child and recognised as a valuable part of
                education and personal development.
              </p>
              <div className="mt-5 max-w-[38rem] space-y-4 text-[17px] leading-relaxed text-slate">
                <p>
                  We envision a strong chess culture in schools and communities across KwaZulu-Natal and beyond, where
                  young minds are inspired to think critically and reach their full potential.
                </p>
                <p>
                  Our ambition is to establish KZN Chess Academy as a leading centre for chess education in Africa,
                  nurturing future champions and creating opportunities for young people to succeed on and beyond the
                  chessboard.
                </p>
              </div>
            </div>
          </div>

          <figure className="reveal relative lg:col-span-5 lg:pt-4">
            <Img photo={photos.schoolsHuddle} sizes="(min-width: 1024px) 460px, 100vw" className="aspect-[4/3] w-full rounded-[24px] object-cover object-[50%_40%] lg:aspect-[4/5]" />
            <figcaption className="mt-3 text-sm text-slate">{photos.schoolsHuddle.caption}</figcaption>
            <div aria-hidden="true" className="checker absolute -top-4 -right-4 -z-10 hidden h-28 w-28 text-gold/50 lg:block" />
          </figure>
        </div>
      </div>
    </section>
  );
}
