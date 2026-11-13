import { photos } from '../data/site';
import { container, Icon, Img, SectionHeading } from './ui';

const reasons = [
  { icon: Icon.Rook, title: 'Experienced chess educators', text: 'Learn from titled players, FIDE-qualified trainers and national coaches who know how to teach young learners.' },
  { icon: Icon.Group, title: 'Individual and group learning', text: 'Choose one-to-one attention, the energy of a group class, or online lessons that fit around family life.' },
  { icon: Icon.Puzzle, title: 'Critical thinking and problem solving', text: 'Every game asks children to plan ahead, weigh up choices and find solutions for themselves.' },
  { icon: Icon.Heart, title: 'Confidence, patience and resilience', text: 'Children learn to stay calm under pressure, think before they act, and handle both winning and losing.' },
  { icon: Icon.Trophy, title: 'A path into competitive chess', text: 'For those who want it, there are opportunities to play in tournaments and develop as competitors.' },
  { icon: Icon.Spark, title: 'Inclusive and community-minded', text: 'Through Chess in the Community and Infinite Chess, we work to make chess open to every child.' },
];

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-white py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="why-title"
              kicker="Why families choose us"
              title="Where Every Move Builds Confidence"
              intro="Chess training for children that is as much about character as it is about checkmate."
            />
            <figure className="reveal relative mt-10 hidden lg:block">
              <Img photo={photos.playerPortrait} sizes="420px" className="aspect-[4/5] w-full rounded-[24px] object-cover object-top" />
              <div aria-hidden="true" className="checker absolute -right-4 -bottom-4 -z-10 h-28 w-28 text-navy/10" />
            </figure>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {reasons.map(({ icon: I, title, text }) => (
            <li key={title} className="reveal border-t border-line py-7">
              <I className="h-7 w-7 text-gold" />
              <h3 className="mt-4 text-[19px] font-bold tracking-tight text-navy">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
