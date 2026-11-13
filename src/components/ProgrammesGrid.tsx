import type { ComponentType, SVGProps } from 'react';
import { photos, programmeEnquiry, whatsappLink, type Photo } from '../data/site';
import { container, Icon, Img, SectionHeading } from './ui';

type Format = { title: string; text: string; icon: ComponentType<SVGProps<SVGSVGElement>>; detail: string };
type Programme = { title: string; text: string; photo: Photo; tag: string };

const formats: Format[] = [
  { title: 'Online Chess Classes', text: 'Live chess coaching that allows learners to develop their skills remotely.', icon: Icon.Monitor, detail: 'Learn from home' },
  { title: 'Group Chess Classes', text: 'Engaging, collaborative classes held at the academy, where students learn and practise together.', icon: Icon.Group, detail: 'At the academy' },
  { title: 'Private Chess Coaching', text: "Personalised individual lessons available at the academy or the student's premises.", icon: Icon.Person, detail: 'Academy or your home' },
];

const programmes: Programme[] = [
  { title: 'Chess in Schools', text: 'Chess education programmes designed to introduce chess and structured learning opportunities within schools.', photo: photos.schoolClass, tag: 'For schools' },
  { title: 'Chess in the Community', text: 'Community-focused initiatives that make chess learning more accessible and encourage participation.', photo: photos.communityDay, tag: 'In the community' },
  { title: 'Infinite Chess', text: "A specialised chess programme for children with autism, reflecting the academy's commitment to inclusive chess education.", photo: photos.inclusiveOutreach, tag: 'Inclusive programme' },
];

function EnquireLink({ programme }: { programme: string }) {
  return (
    <a
      href={whatsappLink(programmeEnquiry(programme))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Enquire about ${programme} on WhatsApp`}
      className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-[15px] font-semibold text-royal hover:text-navy"
    >
      <Icon.WhatsApp className="h-[18px] w-[18px] text-whatsapp" />
      <span className="underline decoration-gold/70 decoration-2 underline-offset-[5px]">Enquire About This Programme</span>
    </a>
  );
}

export default function ProgrammesGrid() {
  return (
    <section id="programmes" aria-labelledby="programmes-title" className="bg-mist py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="programmes-title"
          kicker="Our programmes"
          title="A Chess Learning Experience for Every Child"
          intro="Kids chess classes in Durban, private lessons in Umhlanga and online chess coaching, plus programmes that take chess into schools and communities across KwaZulu-Natal."
        />

        <h3 className="reveal mt-14 text-lg font-bold text-navy">Ways to learn</h3>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {formats.map(({ title, text, icon: I, detail }) => (
            <li key={title} className="reveal flex flex-col rounded-[22px] border border-line bg-white p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                  <I className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-mist px-3 py-1 text-[13px] font-medium text-slate">{detail}</span>
              </div>
              <h4 className="mt-6 text-xl font-bold tracking-tight text-navy">{title}</h4>
              <p className="mt-2.5 leading-relaxed text-slate">{text}</p>
              <EnquireLink programme={title} />
            </li>
          ))}
        </ul>

        <h3 className="reveal mt-16 text-lg font-bold text-navy">Programmes in schools and communities</h3>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {programmes.map((p) => (
            <li key={p.title} className="reveal flex flex-col overflow-hidden rounded-[22px] border border-line bg-white">
              <div className="relative">
                <Img photo={p.photo} sizes="(min-width: 768px) 380px, 100vw" className="aspect-[3/2] w-full object-cover" />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[13px] font-semibold text-navy">{p.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h4 className="text-xl font-bold tracking-tight text-navy">{p.title}</h4>
                <p className="mt-2.5 leading-relaxed text-slate">{p.text}</p>
                <EnquireLink programme={p.title} />
              </div>
            </li>
          ))}
        </ul>

        <div className="reveal mt-10 flex flex-col gap-5 rounded-[22px] bg-navy p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-navy">
              <Icon.Trophy className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Tournaments and chess camps</h3>
              <p className="mt-1 max-w-xl text-white/75">
                Alongside regular coaching, students can take part in tournaments and chess camps that build match experience and friendships.
              </p>
            </div>
          </div>
          <a
            href={whatsappLink(programmeEnquiry('tournaments and chess camps'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 font-semibold text-navy hover:bg-[#e2b648]"
          >
            Ask about upcoming events
          </a>
        </div>
      </div>
    </section>
  );
}
