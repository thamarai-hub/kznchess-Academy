import { photos, type Photo } from '../data/site';
import { container, Icon, Img, SectionHeading } from './ui';

const highlights = [
  { icon: Icon.Medal, title: 'Champions at every level', text: 'Provincial, national and continental champions have come through the academy.' },
  { icon: Icon.Trophy, title: 'International youth competition', text: 'World Youth, Commonwealth and African Youth Chess Championships, at home and abroad.' },
  { icon: Icon.Rook, title: 'Titled players', text: 'From FIDE Master to the local title of Junior Master.' },
];

function Tile({ photo, className = '', imgClass = '' }: { photo: Photo; className?: string; imgClass?: string }) {
  return (
    <figure className={`reveal relative overflow-hidden rounded-[20px] bg-navy-deep ${className}`}>
      <Img photo={photo} sizes="(min-width: 1024px) 600px, 100vw" className={`h-full w-full object-cover ${imgClass}`} />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/50 to-transparent px-4 pt-10 pb-3.5 text-[13px] leading-snug font-medium text-white sm:text-sm">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div aria-hidden="true" className="checker absolute top-0 right-0 h-48 w-48 text-gold/[0.07] sm:h-72 sm:w-72" />
      <div className={`${container} relative`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading id="achievements-title" kicker="Student achievements" title="Nurturing Champions, On and Beyond the Board" tone="dark" />
            <div className="reveal mt-6 space-y-4 text-[17px] leading-relaxed text-white/80">
              <p>
                KZN Chess Academy has produced provincial, national and continental champions. Our students have
                participated in prestigious competitions including the World Youth, Commonwealth and African Youth
                Chess Championships, in South Africa and abroad.
              </p>
              <p>
                The academy has developed talented chess players, including players holding titles ranging from FIDE
                Master to local Junior Master.
              </p>
            </div>

            <ul className="mt-10 space-y-3">
              {highlights.map(({ icon: I, title, text }) => (
                <li key={title} className="reveal flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-navy">
                    <I className="h-[22px] w-[22px]" />
                  </span>
                  <span>
                    <span className="block font-bold text-white">{title}</span>
                    <span className="mt-0.5 block text-[15px] text-white/70">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7 lg:self-start">
            <Tile photo={photos.teamTrophy} className="col-span-2 aspect-[16/10]" imgClass="object-[50%_30%]" />
            <Tile photo={photos.teamOnTour} className="aspect-square" />
            <Tile photo={photos.tournamentOutdoor} className="aspect-square" />
            <Tile photo={photos.teamJuniors} className="col-span-2 aspect-[16/8] sm:col-span-1 sm:aspect-[4/3]" />
            <Tile photo={photos.prizeGiving} className="col-span-2 aspect-[16/8] sm:col-span-1 sm:aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  );
}
